/* eslint-disable react-hooks/rules-of-hooks */
import { IntMap, Vector2, StringMap } from './utils';
import {
  NoTransformVert,
  NoTransformFrag,
  FluidBaseVert,
  FluidBaseFrag,
  TexelSpaceVert,
  VelocityDivergenceFrag,
  AdvectFrag,
  PressureGradientSubstractFrag,
  ShaderBaseVert,
  PressureSolveFrag,
  ShaderBaseFrag,
  RenderParticlesVert,  
  RenderParticlesFrag,
  StepParticlesFrag,
  QuadTextureFrag,
  ColorParticleMotionVert,
  ColorParticleMotionFrag,
  GeomGLSL,
  UpdateDyeFrag,
  MouseDownFrag,
  MouseDyeFrag,
} from './Shaders';

const SimulationQuality = {
  UltraHigh: ['UltraHigh', 0],
  High: ['High', 1],
  Medium: ['Medium', 2],
  Low: ['Low', 3],
  UltraLow: ['UltraLow', 4],
};

const CONFIG = {
  antialiasing: 0,
  background: 16777215,
  borderless: false,
  depthBuffer: false,
  fps: 0,
  fullscreen: false,
  height: 0,
  orientation: '',
  resizable: true,
  stencilBuffer: false,
  title: 'WebGL Fluid Experiment',
  vsync: true,
  width: 0,
};

function FL() {
  let GL;
  let simulationQuality;

  const Preloader = {
    total: 0,
    loaded: 0,
    load: function () {
      if (this.total == 0) this.start();
    },
    start: function () {
      if (this.onComplete) this.onComplete();
    },
  };

  const ApplicationMain = {
    create: () => {
      ApplicationMain.preloader = Preloader;
      ApplicationMain.preloader.onComplete = ApplicationMain.start;
      ApplicationMain.preloader.load();
    },
    main: () => {},
    start: () => {
      ApplicationMain.app = new Main();
      ApplicationMain.app.create(CONFIG);
      ApplicationMain.app.exec();
    },
  };

  const GPUFluid = function (gl, width, height, cellSize, solverIterations) {
    if (solverIterations == null) solverIterations = 18;
    if (cellSize == null) cellSize = 8;
    this.pressureGradientSubstractShader = new PressureGradientSubstract();
    this.pressureSolveShader = new PressureSolve();
    this.divergenceShader = new Divergence();
    this.advectShader = new Advect();
    this.gl = gl;
    this.width = width;
    this.height = height;
    this.solverIterations = solverIterations;
    this.aspectRatio = width / height;
    this.cellSize = cellSize;
    this.advectShader.rdx.set(1 / cellSize);
    this.divergenceShader.halfrdx.set(0.5 * (1 / cellSize));
    this.pressureGradientSubstractShader.halfrdx.set(0.5 * (1 / cellSize));
    this.pressureSolveShader.alpha.set(-cellSize * cellSize); //C
    const texture_float_linear_supported = !!gl.getExtension('OES_texture_float_linear');
    gl.getExtension('OES_texture_float');
    this.textureQuad = GeometryTools.getCachedTextureQuad();
    const nearestFactory = TextureTools.createTextureFactory(gl.RGBA, gl.FLOAT, gl.NEAREST);
    this.velocityRenderTarget = new Render.RenderTarget2Phase(width, height, nearestFactory);
    this.pressureRenderTarget = new Render.RenderTarget2Phase(width, height, nearestFactory);
    this.divergenceRenderTarget = new Render.RenderTarget(width, height, nearestFactory);
    this.dyeRenderTarget = new Render.RenderTarget2Phase(
      width,
      height,
      TextureTools.createTextureFactory(gl.RGB, gl.FLOAT, texture_float_linear_supported ? gl.LINEAR : gl.NEAREST)
    );

    this.updateCoreShaderUniforms(this.advectShader);
    this.updateCoreShaderUniforms(this.divergenceShader);
    this.updateCoreShaderUniforms(this.pressureSolveShader);
    this.updateCoreShaderUniforms(this.pressureGradientSubstractShader);
  };

  GPUFluid.prototype = {
    step: function (dt) {
      this.gl.viewport(0, 0, this.width, this.height);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureQuad);
      this.advect(this.velocityRenderTarget, dt);
      if (this.applyForcesShader) {
        this.applyForcesShader.dt.set(dt);
        this.applyForcesShader.velocity.set(this.velocityRenderTarget.readFromTexture);
        this.renderShaderTo(this.applyForcesShader, this.velocityRenderTarget);
        this.velocityRenderTarget.swap();
      }
      this.divergenceShader.velocity.set(this.velocityRenderTarget.readFromTexture);
      this.renderShaderTo(this.divergenceShader, this.divergenceRenderTarget);
      this.solvePressure();
      this.pressureGradientSubstractShader.pressure.set(this.pressureRenderTarget.readFromTexture);
      this.pressureGradientSubstractShader.velocity.set(this.velocityRenderTarget.readFromTexture);
      this.renderShaderTo(this.pressureGradientSubstractShader, this.velocityRenderTarget);
      this.velocityRenderTarget.swap();
      if (this.updateDyeShader) {
        this.updateDyeShader.dt.set(dt);
        this.updateDyeShader.dye.set(this.dyeRenderTarget.readFromTexture);
        this.renderShaderTo(this.updateDyeShader, this.dyeRenderTarget);
        this.dyeRenderTarget.swap();
      }
      this.advect(this.dyeRenderTarget, dt);
    },
    resize: function (width, height) {
      this.velocityRenderTarget.resize(width, height);
      this.pressureRenderTarget.resize(width, height);
      this.divergenceRenderTarget.resize(width, height);
      this.dyeRenderTarget.resize(width, height);
      this.width = width;
      this.height = height;
    },
    clear: function () {
      this.velocityRenderTarget.clear(this.gl.COLOR_BUFFER_BIT);
      this.pressureRenderTarget.clear(this.gl.COLOR_BUFFER_BIT);
      this.dyeRenderTarget.clear(this.gl.COLOR_BUFFER_BIT);
    },
    simToClipSpaceX: function (simX) {
      return simX / (this.cellSize * this.aspectRatio);
    },
    simToClipSpaceY: function (simY) {
      return simY / this.cellSize;
    },
    advect: function (target, dt) {
      this.advectShader.dt.set(dt);
      this.advectShader.target.set(target.readFromTexture);
      this.advectShader.velocity.set(this.velocityRenderTarget.readFromTexture);
      this.renderShaderTo(this.advectShader, target);
      target.tmpFBO = target.writeFrameBufferObject;
      target.writeFrameBufferObject = target.readFrameBufferObject;
      target.readFrameBufferObject = target.tmpFBO;
      target.tmpTex = target.writeToTexture;
      target.writeToTexture = target.readFromTexture;
      target.readFromTexture = target.tmpTex;
    },
    applyForces: function (dt) {
      if (this.applyForcesShader == null) return;
      this.applyForcesShader.dt.set(dt);
      this.applyForcesShader.velocity.set(this.velocityRenderTarget.readFromTexture);
      this.renderShaderTo(this.applyForcesShader, this.velocityRenderTarget);
      this.velocityRenderTarget.swap();
    },
    solvePressure: function () {
      this.pressureSolveShader.divergence.set(this.divergenceRenderTarget.texture);
      this.pressureSolveShader.activate(true, true);
      let k1 = 0;
      let k = this.solverIterations;
      while (k1 < k) {
        k1++;
        this.pressureSolveShader.pressure.set(this.pressureRenderTarget.readFromTexture);
        this.pressureSolveShader.setUniforms();
        GL.bindFramebuffer(36160, this.pressureRenderTarget.writeFrameBufferObject);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.pressureRenderTarget.swap();
      }
      this.pressureSolveShader.deactivate();
    },
    updateDye: function (dt) {
      if (this.updateDyeShader == null) return;
      this.updateDyeShader.dt.set(dt);
      this.updateDyeShader.dye.set(this.dyeRenderTarget.readFromTexture);
      this.renderShaderTo(this.updateDyeShader, this.dyeRenderTarget);
      this.dyeRenderTarget.swap();
    },
    renderShaderTo: function (shader, target) {
      if (shader.active) {
        shader.setUniforms();
        shader.setAttributes();
        null;
      } else {
        if (!shader.ready) shader.create();
        GL.useProgram(shader.prog);
        shader.setUniforms();
        shader.setAttributes();
        shader.active = true;
      }
      target.activate();
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      shader.deactivate();
    },
    updateCoreShaderUniforms: function (shader) {
      if (shader == null) return;
      shader.aspectRatio.set(this.aspectRatio);
      shader.invresolution.data.x = 1 / this.width;
      shader.invresolution.data.y = 1 / this.height;
    },
    set_applyForcesShader: function (v) {
      this.applyForcesShader = v;
      this.applyForcesShader.dx.set_data(this.cellSize);
      this.updateCoreShaderUniforms(this.applyForcesShader);
      return this.applyForcesShader;
    },
    set_updateDyeShader: function (v) {
      this.updateDyeShader = v;
      this.updateDyeShader.dx.set_data(this.cellSize);
      this.updateCoreShaderUniforms(this.updateDyeShader);
      return this.updateDyeShader;
    },
  };

  const ShaderBase = function () {
    this.uniforms = [];
    this.attributes = [];
    this.createProperties();
  };
  ShaderBase.prototype = {
    createProperties: () => {},
    initFromSource: function (vertSource, fragSource) {
      if (Array.isArray(fragSource)) fragSource = fragSource.join('');

      const vertexShader = GL.createShader(35633);
      GL.shaderSource(vertexShader, vertSource);
      GL.compileShader(vertexShader);

      const fragmentShader = GL.createShader(35632);
      GL.shaderSource(fragmentShader, fragSource);
      GL.compileShader(fragmentShader);

      const shaderProgram = GL.createProgram();
      GL.attachShader(shaderProgram, vertexShader);
      GL.attachShader(shaderProgram, fragmentShader);
      GL.linkProgram(shaderProgram);

      let numUniforms = GL.getProgramParameter(shaderProgram, 35718);
      let uniformLocations = StringMap();
      while (numUniforms-- > 0) {
        const uInfo = GL.getActiveUniform(shaderProgram, numUniforms);
        const loc = GL.getUniformLocation(shaderProgram, uInfo.name);
        uniformLocations.set(uInfo.name, loc);
      }
      let numAttributes = GL.getProgramParameter(shaderProgram, 35721);
      let attributeLocations = StringMap();
      while (numAttributes-- > 0) {
        const aInfo = GL.getActiveAttrib(shaderProgram, numAttributes);
        const loc1 = GL.getAttribLocation(shaderProgram, aInfo.name);
        attributeLocations.set(aInfo.name, loc1);
      }
      this.vert = vertexShader;
      this.frag = fragmentShader;
      this.prog = shaderProgram;
      this.uniforms.length;
      const removeList = [];
      this.numTextures = 0;
      this.textures = [];
      let k1 = 0;
      let k11 = this.uniforms;
      while (k1 < k11.length) {
        const u = k11[k1];
        ++k1;
        const loc2 = uniformLocations.get(u.name);
        if (u instanceof Uniforms.UTexture) {
          const t = u;
          t.samplerIndex = this.numTextures++;
          this.textures[t.samplerIndex] = t;
        }

        if (loc2) u.location = loc2;
        else removeList.push(u);
      }

      while (removeList.length > 0) {
        const x = removeList.pop();
        this.uniforms = this.uniforms.filter((a) => a.name !== x.name);
      }

      let k2 = 0;
      let k12 = this.attributes;
      while (k2 < k12.length) {
        const a = k12[k2];
        ++k2;
        const loc3 = attributeLocations.get(a.name);
        if (loc3 == null) a.location = -1;
        else a.location = loc3;
      }
    },
    activate: function (initUniforms, initAttribs) {
      if (initAttribs == null) initAttribs = false;
      if (initUniforms == null) initUniforms = true;
      if (this.active) {
        if (initUniforms) this.setUniforms();
        if (initAttribs) this.setAttributes();
        return;
      }
      if (!this.ready) this.create();
      GL.useProgram(this.prog);
      if (initUniforms) this.setUniforms();
      if (initAttribs) this.setAttributes();
      this.active = true;
    },
    deactivate: function () {
      if (!this.active) return;
      this.active = false;
      this.disableAttributes();
    },
    setUniforms: function () {
      let k = 0;
      let k1 = this.uniforms;
      while (k < k1.length) {
        const u = k1[k];
        ++k;
        u.apply();
      }
    },
    setAttributes: function () {
      let offset = 0;
      let k1 = 0;
      let k = this.attributes.length;
      while (k1 < k) {
        const i = k1++;
        const att = this.attributes[i];
        const location = att.location;
        if (location != -1) {
          GL.enableVertexAttribArray(location);
          GL.vertexAttribPointer(location, att.itemCount, att.type, false, 0, offset);
        }
        offset += att.byteSize;
      }
    },
    disableAttributes: function () {
      let k1 = 0;
      let k = this.attributes.length;
      while (k1 < k) {
        let i = k1++;
        const idx = this.attributes[i].location;
        if (idx == -1) continue;
        GL.disableVertexAttribArray(idx);
      }
    },
  };

  const FluidBase = function () {
    const instance = new Uniforms.UFloat('aspectRatio', -1);
    this.aspectRatio = instance;
    this.uniforms.push(instance);
    const instance1 = new Uniforms.UVec2('invresolution', -1);
    this.invresolution = instance1;
    this.uniforms.push(instance1);
    const instance2 = FloatAttribute('vertexPosition', 0, 2);
    this.vertexPosition = instance2;
    this.attributes.push(instance2);
  };

  const PressureGradientSubstract = function () {
    ShaderBase.call(this);
  };
  PressureGradientSubstract.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(FluidBaseVert, [FluidBaseFrag, PressureGradientSubstractFrag]);
      this.ready = true;
    },
    createProperties: function () {
      FluidBase.call(this);
      const instance = new Uniforms.UTexture('pressure', -1, false);
      this.pressure = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UTexture('velocity', -1, false);
      this.velocity = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UFloat('halfrdx', -1);
      this.halfrdx = instance2;
      this.uniforms.push(instance2);
    },
  };

  const Advect = function () {
    ShaderBase.call(this);
  };
  Advect.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(FluidBaseVert, [FluidBaseFrag, AdvectFrag]);
      this.ready = true;
    },
    createProperties: function () {
      FluidBase.call(this);
      const instance = new Uniforms.UTexture('velocity', -1, false);
      this.velocity = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UTexture('target', -1, false);
      this.target = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UFloat('dt', -1);
      this.dt = instance2;
      this.uniforms.push(instance2);
      const instance3 = new Uniforms.UFloat('rdx', -1);
      this.rdx = instance3;
      this.uniforms.push(instance3);
    },
  };

  const Divergence = function () {
    ShaderBase.call(this);
  };
  Divergence.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(FluidBaseVert, [FluidBaseFrag, VelocityDivergenceFrag]);
      this.ready = true;
    },
    createProperties: function () {
      FluidBase.call(this);
      const instance = new Uniforms.UTexture('velocity', -1, false);
      this.velocity = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UFloat('halfrdx', -1);
      this.halfrdx = instance1;
      this.uniforms.push(instance1);
    },
  };

  const PressureSolve = function () {
    ShaderBase.call(this);
  };
  PressureSolve.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(FluidBaseVert, [FluidBaseFrag, PressureSolveFrag]);
      this.ready = true;
    },
    createProperties: function () {
      FluidBase.call(this);
      const instance = new Uniforms.UTexture('pressure', -1, false);
      this.pressure = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UTexture('divergence', -1, false);
      this.divergence = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UFloat('alpha', -1);
      this.alpha = instance2;
      this.uniforms.push(instance2);
    },
  };

  const GPUParticles = function (gl, count = 524288) {
    this.gl = gl;
    gl.getExtension('OES_texture_float');
    this.textureQuad = GeometryTools.getCachedTextureQuad();
    this.inititalConditionsShader = new InitialConditions();
    this.stepParticlesShader = new StepParticles();
    this.stepParticlesShader.dragCoefficient.set_data(1);
    this.stepParticlesShader.flowScale.data.x = 1;
    this.stepParticlesShader.flowScale.data.y = 1;
    this.setCount(count);
    this.renderShaderTo(this.inititalConditionsShader, this.particleData);
  };
  GPUParticles.prototype = {
    step: function (dt) {
      this.stepParticlesShader.dt.set_data(dt);
      this.stepParticlesShader.particleData.set_data(this.particleData.readFromTexture);
      this.renderShaderTo(this.stepParticlesShader, this.particleData);
    },
    reset: function () {
      this.renderShaderTo(this.inititalConditionsShader, this.particleData);
    },
    setCount: function (newCount) {
      const dataWidth = Math.ceil(Math.sqrt(newCount));
      const dataHeight = dataWidth;
      if (this.particleData) this.particleData.resize(dataWidth, dataHeight);
      else
        this.particleData = new Render.RenderTarget2Phase(dataWidth, dataHeight, TextureTools.floatTextureFactoryRGBA);

      if (this.particleUVs) this.gl.deleteBuffer(this.particleUVs);

      this.particleUVs = this.gl.createBuffer();
      const arrayUVs = [];
      let k = 0;
      while (k < dataWidth) {
        let i = k++;
        let k1 = 0;
        while (k1 < dataHeight) {
          const j = k1++;
          arrayUVs.push(i / dataWidth);
          arrayUVs.push(j / dataHeight);
        }
      }
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleUVs);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(arrayUVs), this.gl.STATIC_DRAW);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      return (this.count = newCount);
    },
    renderShaderTo: function (shader, target) {
      this.gl.viewport(0, 0, target.width, target.height);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, target.writeFrameBufferObject);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureQuad);
      if (shader.active) {
        shader.setUniforms();
        shader.setAttributes();
        null;
      } else {
        if (!shader.ready) shader.create();
        GL.useProgram(shader.prog);
        shader.setUniforms();
        shader.setAttributes();
        shader.active = true;
      }
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      shader.deactivate();
      target.tmpFBO = target.writeFrameBufferObject;
      target.writeFrameBufferObject = target.readFrameBufferObject;
      target.readFrameBufferObject = target.tmpFBO;
      target.tmpTex = target.writeToTexture;
      target.writeToTexture = target.readFromTexture;
      target.readFromTexture = target.tmpTex;
    },
    set_flowScaleX: function (v) {
      return (this.stepParticlesShader.flowScale.data.x = v);
    },
    set_flowScaleY: function (v) {
      return (this.stepParticlesShader.flowScale.data.y = v);
    },
  };

  const InitialConditions = function () {
    ShaderBase.call(this);
  };
  InitialConditions.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(NoTransformVert, NoTransformFrag);
      this.ready = true;
    },
    createProperties: function () {
      const instance = FloatAttribute('vertexPosition', 0, 2);
      this.vertexPosition = instance;
      this.attributes.push(instance);
    },
  };

  const StepParticles = function () {
    ShaderBase.call(this);
  };
  StepParticles.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(NoTransformVert, StepParticlesFrag);
      this.ready = true;
    },
    particleBase: function () {
      InitialConditions.prototype.createProperties.call(this);
      const instance = new Uniforms.UFloat('dt', -1);
      this.dt = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UTexture('particleData', -1, false);
      this.particleData = instance1;
      this.uniforms.push(instance1);
    },
    createProperties: function () {
      this.particleBase();
      const instance = new Uniforms.UFloat('dragCoefficient', -1);
      this.dragCoefficient = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UVec2('flowScale', -1);
      this.flowScale = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UTexture('flowVelocityField', -1, false);
      this.flowVelocityField = instance2;
      this.uniforms.push(instance2);
    },
  };

  const Event = function () {
    this.listeners = [];
    this.priorities = [];
    this.repeat = [];
  };
  Event.prototype = {
    add: function (listener, once, priority) {
      if (priority == null) priority = 0;
      if (once == null) once = false;
      let k1 = 0;
      let k = this.priorities.length;
      while (k1 < k) {
        let i = k1++;
        if (priority > this.priorities[i]) {
          this.listeners.splice(i, 0, listener);
          this.priorities.splice(i, 0, priority);
          this.repeat.splice(i, 0, !once);
          return;
        }
      }
      this.listeners.push(listener);
      this.priorities.push(priority);
      this.repeat.push(!once);
    },
    remove: function (listener) {
      let index = this.listeners.indexOf(listener);

      if (index > -1) {
        this.listeners.splice(index, 1);
        this.priorities.splice(index, 1);
        this.repeat.splice(index, 1);
      }
    },
  };

  const App = function () {
    App.__initialized = false;
    App.__instance = this;
    this.windows = [];
  };
  App.prototype = {
    addWindow: function (window) {
      this.windows.push(window);
      window.create(this);
    },
    create: function (config) {
      MouseEventManager.onMouseDown.add(this.onMouseDown.bind(this));
      MouseEventManager.onMouseMove.add(this.onMouseMove.bind(this));
      MouseEventManager.onMouseUp.add(this.onMouseUp.bind(this));
      TouchEventManager.onTouchStart.add(this.onTouchStart.bind(this));
      TouchEventManager.onTouchMove.add(this.onTouchMove.bind(this));
      TouchEventManager.onTouchEnd.add(this.onTouchEnd.bind(this));
      const $window = new Window(config);
      new Renderer($window);
      $window.width = config.width;
      $window.height = config.height;
      $window.element = config.element;
      this.addWindow($window);
    },
    exec: function () {
      Renderer.dispatch();
      window.requestAnimationFrame(this.exec.bind(this));
      return 0;
    },
    onKeyUp: () => {},
    onMouseDown: () => {},
    onMouseMove: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchMove: () => {},
    onTouchStart: () => {},
    render: () => {},
    update: () => {},
  };

  const Main = function () {
    this.qualityDirection = 0;
    this.renderFluidEnabled = true;
    this.renderParticlesEnabled = true;
    this.lastMouseClipSpace = Vector2();
    this.lastMouse = Vector2();
    this.mouseClipSpace = Vector2();
    this.mouse = Vector2();
    this.lastMousePointKnown = false;
    this.mousePointKnown = false;
    this.isMouseDown = false;
    this.screenBuffer = null;
    this.textureQuad = null;
    App.call(this);
    this.performanceMonitor = new PerformanceMonitor(35, null, 2000);
    this.set_simulationQuality(SimulationQuality.Medium);
    this.performanceMonitor.fpsTooLowCallback = this.lowerQualityRequired;
  };

  Main.prototype = {
    ...App.prototype,
    init: function (context) {
      const isIOSBrowser = '/(iPad|iPhone|iPod)/g'.match(window.navigator.userAgent);
      if (isIOSBrowser) {
        alert('iOS is not supported yet :(');
        window.location.href = 'mobile-app/index.html';
        return;
      }

      const gl = context;
      this.gl = gl;
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.disable(gl.DITHER);
      this.textureQuad = GeometryTools.createQuad(0, 0, 1, 1);

      const sWidth = Math.round(this.windows[0].width * this.offScreenScale);
      const sHeight = Math.round(this.windows[0].height * this.offScreenScale);
      const texture = TextureTools.createTextureFactory(gl.RGBA, gl.UNSIGNED_BYTE, gl.NEAREST);
      this.offScreenTarget = new Render.RenderTarget(sWidth, sHeight, texture);
      this.screenTextureShader = new ScreenTexture();
      this.renderParticlesShader = new ColorParticleMotion();
      this.updateDyeShader = new MouseDye();
      this.mouseForceShader = new MouseForce();
      this.updateDyeShader.mouseClipSpace.set_data(this.mouseClipSpace);
      this.updateDyeShader.lastMouseClipSpace.set_data(this.lastMouseClipSpace);
      this.mouseForceShader.mouseClipSpace.set_data(this.mouseClipSpace);
      this.mouseForceShader.lastMouseClipSpace.set_data(this.lastMouseClipSpace);
      const cellScale = 32;

      const width = Math.round(this.windows[0].width * this.fluidScale);
      const height = Math.round(this.windows[0].height * this.fluidScale);
      this.fluid = new GPUFluid(gl, width, height, cellScale, this.fluidIterations);
      this.fluid.set_updateDyeShader(this.updateDyeShader);
      this.fluid.set_applyForcesShader(this.mouseForceShader);
      this.particles = new GPUParticles(gl, this.particleCount);
      this.particles.set_flowScaleX(this.fluid.simToClipSpaceX(1));
      this.particles.set_flowScaleY(this.fluid.simToClipSpaceY(1));
      this.particles.stepParticlesShader.dragCoefficient.set_data(1);
      let clickCount = 0;
      MouseEventManager.onMouseUp.add(() => {
        clickCount++;
      });

      this.lastTime = Timer.stamp();
    },
    render: function () {
      this.time = Timer.stamp();
      const dt = this.time - this.lastTime;
      this.lastTime = this.time;
      if (dt > 0) this.performanceMonitor.recordFPS(1 / dt);
      if (this.lastMousePointKnown) {
        this.updateDyeShader.isMouseDown.set(this.isMouseDown);
        this.mouseForceShader.isMouseDown.set(this.isMouseDown);
      }
      this.fluid.step(dt);
      this.particles.stepParticlesShader.flowVelocityField.set_data(this.fluid.velocityRenderTarget.readFromTexture);

      if (this.renderParticlesEnabled) this.particles.step(dt);

      this.gl.viewport(0, 0, this.offScreenTarget.width, this.offScreenTarget.height);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.offScreenTarget.frameBufferObject);
      this.gl.clearColor(0, 0, 0, 1);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.SRC_ALPHA);
      this.gl.blendEquation(this.gl.FUNC_ADD);

      if (this.renderParticlesEnabled) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particles.particleUVs);
        this.renderParticlesShader.particleData.set_data(this.particles.particleData.readFromTexture);
        this.renderParticlesShader.activate(true, true);
        this.gl.drawArrays(this.gl.POINTS, 0, this.particles.count);
        this.renderParticlesShader.deactivate();
      }

      if (this.renderFluidEnabled) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureQuad);
        this.screenTextureShader.texture.set_data(this.fluid.dyeRenderTarget.readFromTexture);
        this.screenTextureShader.activate(true, true);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.screenTextureShader.deactivate();
      }

      this.gl.disable(this.gl.BLEND);
      this.gl.viewport(0, 0, this.windows[0].width, this.windows[0].height);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.screenBuffer);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureQuad);
      this.screenTextureShader.texture.set_data(this.offScreenTarget.texture);
      this.screenTextureShader.activate(true, true);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      this.screenTextureShader.deactivate();
      this.lastMouse.setTo(this.mouse.x, this.mouse.y);
      this.lastMouseClipSpace.setTo(
        (this.mouse.x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - this.mouse.y) / this.windows[0].height) * 2 - 1
      );
      this.lastMousePointKnown = this.mousePointKnown;
    },
    renderParticles: function () {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particles.particleUVs);
      this.renderParticlesShader.particleData.set_data(this.particles.particleData.readFromTexture);
      this.renderParticlesShader.activate(true, true);
      this.gl.drawArrays(this.gl.POINTS, 0, this.particles.count);
      this.renderParticlesShader.deactivate();
    },
    updateSimulationTextures: function () {
      let w = Math.round(this.windows[0].width * this.fluidScale);
      let h = Math.round(this.windows[0].height * this.fluidScale);

      if (w != this.fluid.width || h != this.fluid.height) this.fluid.resize(w, h);

      w = Math.round(this.windows[0].width * this.offScreenScale);
      h = Math.round(this.windows[0].height * this.offScreenScale);

      if (w != this.offScreenTarget.width || h != this.offScreenTarget.height) this.offScreenTarget.resize(w, h);

      if (this.particleCount != this.particles.count) this.particles.setCount(this.particleCount);
    },
    set_simulationQuality: function (quality) {
      simulationQuality = quality;
      switch (quality[1]) {
        case 0:
          this.particleCount = 1048576;
          this.fluidScale = 0.5;
          this.set_fluidIterations(30);
          this.offScreenScale = 1;
          break;
        case 1:
          this.particleCount = 1048576;
          this.fluidScale = 0.25;
          this.set_fluidIterations(20);
          this.offScreenScale = 1;
          break;
        case 2:
          this.particleCount = 262144;
          this.fluidScale = 0.25;
          this.set_fluidIterations(18);
          this.offScreenScale = 1;
          break;
        case 3:
          this.particleCount = 65536;
          this.fluidScale = 0.2;
          this.set_fluidIterations(14);
          this.offScreenScale = 1;
          break;
        case 4:
          this.particleCount = 16384;
          this.fluidScale = 0.166666666666666657;
          this.set_fluidIterations(12);
          this.offScreenScale = 0.5;
          break;
      }
      return quality;
    },
    set_fluidIterations: function (v) {
      this.fluidIterations = v;
      if (this.fluid) this.fluid.solverIterations = v;
      return v;
    },
    lowerQualityRequired: function (magnitude) {
      console.log(this);
      if (this.qualityDirection > 0) return;
      this.qualityDirection = -1;
      console.log(simulationQuality);
      let qualityIndex = simulationQuality[1];
      const maxIndex = Object.keys(SimulationQuality).length - 1;
      if (qualityIndex >= maxIndex) return;
      if (magnitude < 0.5) qualityIndex += 1;
      else qualityIndex += 2;
      if (qualityIndex > maxIndex) qualityIndex = maxIndex;
      const newQuality = Object.values(SimulationQuality)[qualityIndex];
      this.set_simulationQuality(newQuality);
      this.updateSimulationTextures();
    },
    reset: function () {
      this.particles.reset();
      this.fluid.clear();
    },
    windowToClipSpaceX: function (x) {
      return (x / this.windows[0].width) * 2 - 1;
    },
    windowToClipSpaceY: function (y) {
      return ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1;
    },
    onMouseDown: function (x, y, button) {
      this.isMouseDown = true;
    },
    onMouseUp: function (x, y, button) {
      this.isMouseDown = false;
    },
    onMouseMove: function (x, y, button) {
      this.mouse.setTo(x, y);
      this.mouseClipSpace.setTo(
        (x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1
      );
      this.mousePointKnown = true;
    },
    updateMouseCoord: function (x, y) {
      this.mouse.setTo(x, y);
      this.mouseClipSpace.setTo(
        (x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1
      );
      this.mousePointKnown = true;
    },
    updateLastMouse: function () {
      this.lastMouse.setTo(this.mouse.x, this.mouse.y);
      this.lastMouseClipSpace.setTo(
        (this.mouse.x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - this.mouse.y) / this.windows[0].height) * 2 - 1
      );
      this.lastMousePointKnown = this.mousePointKnown;
    },
    onTouchStart: function (x, y, id) {
      this.mouse.setTo(x, y);
      this.mouseClipSpace.setTo(
        (x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1
      );
      this.mousePointKnown = true;
      this.lastMouse.setTo(this.mouse.x, this.mouse.y);
      this.lastMouseClipSpace.setTo(
        (this.mouse.x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - this.mouse.y) / this.windows[0].height) * 2 - 1
      );
      this.lastMousePointKnown = this.mousePointKnown;
      this.isMouseDown = true;
    },
    onTouchEnd: function (x, y, id) {
      this.mouse.setTo(x, y);
      this.mouseClipSpace.setTo(
        (x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1
      );
      this.mousePointKnown = true;
      this.isMouseDown = false;
    },
    onTouchMove: function (x, y, id) {
      this.mouse.setTo(x, y);
      this.mouseClipSpace.setTo(
        (x / this.windows[0].width) * 2 - 1,
        ((this.windows[0].height - y) / this.windows[0].height) * 2 - 1
      );
      this.mousePointKnown = true;
    },
    onKeyUp: function (keyCode) {
      switch (keyCode) {
        case 114:
          this.reset();
          break;
        case 112:
          this.renderParticlesEnabled = !this.renderParticlesEnabled;
          break;
        case 100:
          this.renderFluidEnabled = !this.renderFluidEnabled;
          break;
        case 115:
          this.fluid.clear();
          break;
      }
    },
  };

  const ScreenTexture = function () {
    ShaderBase.call(this);
  };
  ScreenTexture.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(NoTransformVert, QuadTextureFrag);
      this.ready = true;
    },
    createProperties: function () {
      const instance = new Uniforms.UTexture('texture', -1, false);
      this.texture = instance;
      this.uniforms.push(instance);
      const instance1 = FloatAttribute('vertexPosition', 0, 2);
      this.vertexPosition = instance1;
      this.attributes.push(instance1);
    },
  };

  const ColorParticleMotion = function () {
    ShaderBase.call(this);
  };
  ColorParticleMotion.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(ColorParticleMotionVert, ColorParticleMotionFrag);
      this.ready = true;
    },
    createProperties: function () {
      const instance = new Uniforms.UTexture('particleData', -1, false);
      this.particleData = instance;
      this.uniforms.push(instance);
      const instance1 = FloatAttribute('particleUV', 0, 2);
      this.particleUV = instance1;
      this.attributes.push(instance1);
    },
  };

  const UpdateDye = function () {
    FluidBase.call(this);
    const instance = new Uniforms.UTexture('dye', -1, false);
    this.dye = instance;
    this.uniforms.push(instance);
    const instance1 = new Uniforms.UFloat('dt', -1);
    this.dt = instance1;
    this.uniforms.push(instance1);
    const instance2 = new Uniforms.UFloat('dx', -1);
    this.dx = instance2;
    this.uniforms.push(instance2);
  };

  const MouseDye = function () {
    ShaderBase.call(this);
  };
  MouseDye.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(TexelSpaceVert, [FluidBaseFrag, UpdateDyeFrag, GeomGLSL, MouseDyeFrag]);
      this.ready = true;
    },
    createProperties: function () {
      UpdateDye.call(this);
      const instance = new Uniforms.UBool('isMouseDown', -1);
      this.isMouseDown = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UVec2('mouseClipSpace', -1);
      this.mouseClipSpace = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UVec2('lastMouseClipSpace', -1);
      this.lastMouseClipSpace = instance2;
      this.uniforms.push(instance2);
    },
  };

  const ApplyForces = function () {
    FluidBase.call(this);
    const instance = new Uniforms.UTexture('velocity', -1, false);
    this.velocity = instance;
    this.uniforms.push(instance);
    const instance1 = new Uniforms.UFloat('dt', -1);
    this.dt = instance1;
    this.uniforms.push(instance1);
    const instance2 = new Uniforms.UFloat('dx', -1);
    this.dx = instance2;
    this.uniforms.push(instance2);
  };

  const MouseForce = function () {
    ShaderBase.call(this);
  };
  MouseForce.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(TexelSpaceVert, [FluidBaseFrag, GeomGLSL, MouseDownFrag]);
      this.ready = true;
    },
    createProperties: function () {
      ApplyForces.call(this);
      const instance = new Uniforms.UBool('isMouseDown', -1);
      this.isMouseDown = instance;
      this.uniforms.push(instance);
      const instance1 = new Uniforms.UVec2('mouseClipSpace', -1);
      this.mouseClipSpace = instance1;
      this.uniforms.push(instance1);
      const instance2 = new Uniforms.UVec2('lastMouseClipSpace', -1);
      this.lastMouseClipSpace = instance2;
      this.uniforms.push(instance2);
    },
  };

  const PerformanceMonitor = function (lowerBoundFPS, upperBoundFPS, thresholdTime_ms, fpsSampleSize) {
    if (fpsSampleSize == null) fpsSampleSize = 30;
    if (thresholdTime_ms == null) thresholdTime_ms = 3000;
    if (lowerBoundFPS == null) lowerBoundFPS = 30;
    this.upperBoundEnterTime = null;
    this.lowerBoundEnterTime = null;
    this.fpsTooHighCallback = null;
    this.fpsTooLowCallback = null;
    this.fpsIgnoreBounds = [5, 180];
    this.lowerBoundFPS = lowerBoundFPS;
    this.upperBoundFPS = upperBoundFPS;
    this.thresholdTime_ms = thresholdTime_ms;
    this.fpsSample = new RollingSample(fpsSampleSize);
  };
  PerformanceMonitor.prototype = {
    recordFrameTime: function (dt_seconds) {
      if (dt_seconds > 0) this.recordFPS(1 / dt_seconds);
    },
    recordFPS: function (fps) {
      if (fps < this.fpsIgnoreBounds[0] && fps > this.fpsIgnoreBounds[1]) return;
      this.fpsSample.add(fps);
      if (this.fpsSample.sampleCount < this.fpsSample.length) return;
      const now = Timer.stamp() * 1000;
      if (this.fpsSample.average < this.lowerBoundFPS) {
        if (this.lowerBoundEnterTime == null) this.lowerBoundEnterTime = now;
        if (now - this.lowerBoundEnterTime >= this.thresholdTime_ms && this.fpsTooLowCallback) {
          this.fpsTooLowCallback((this.lowerBoundFPS - this.fpsSample.average) / this.lowerBoundFPS);
          this.fpsSample.clear();
          this.lowerBoundEnterTime = null;
        }
      } else if (this.fpsSample.average > this.upperBoundFPS) {
        if (this.upperBoundEnterTime == null) this.upperBoundEnterTime = now;
        if (now - this.upperBoundEnterTime >= this.thresholdTime_ms && this.fpsTooHighCallback) {
          this.fpsTooHighCallback((this.fpsSample.average - this.upperBoundFPS) / this.upperBoundFPS);
          this.fpsSample.clear();
          this.upperBoundEnterTime = null;
        }
      } else {
        this.lowerBoundEnterTime = null;
        this.upperBoundEnterTime = null;
      }
    },
  };

  const RollingSample = function (length) {
    this.m2 = 0;
    this.pos = 0;
    this.sampleCount = 0;
    this.standardDeviation = 0;
    this.variance = 0;
    this.average = 0;
    this.samples = new Array(length);
  };
  RollingSample.prototype = {
    add: function (v) {
      let delta;
      if (this.sampleCount >= this.samples.length) {
        const bottomValue = this.samples[this.pos];
        delta = bottomValue - this.average;
        this.average -= delta / (this.sampleCount - 1);
        this.m2 -= delta * (bottomValue - this.average);
      } else {
        this.sampleCount++;
      }
      delta = v - this.average;
      this.average += delta / this.sampleCount;
      this.m2 += delta * (v - this.average);
      this.samples[this.pos] = v;
      this.pos++;
      this.pos %= this.samples.length;
      return this.pos;
    },
    clear: function () {
      let k1 = 0;
      let k = this.samples.length;
      while (k1 < k) {
        let i = k1++;
        this.samples[i] = 0;
      }
      this.average = 0;
      this.variance = 0;
      this.standardDeviation = 0;
      this.sampleCount = 0;
      this.m2 = 0;
    },
    get_variance: function () {
      return this.m2 / (this.sampleCount - 1);
    },
    get_length: function () {
      return this.samples.length;
    },
  };

  const GeometryTools = {
    createQuad: (originX = 0, originY = 0, width = 1, height = 1, drawMode = 5, usage = 35044) => {
      const quad = GL.createBuffer();
      let vertices = [];
      switch (drawMode) {
        case 5:
        case 4:
          vertices = [
            originX,
            originY + height,
            originX,
            originY,
            originX + width,
            originY + height,
            originX + width,
            originY,
          ];
          if (drawMode == 4) vertices = vertices.concat([originX + width, originY + height, originX, originY]);
          break;
        case 6:
          vertices = [
            originX,
            originY + height,
            originX,
            originY,
            originX + width,
            originY,
            originX + width,
            originY + height,
          ];
          break;
      }
      GL.bindBuffer(34962, quad);
      GL.bufferData(34962, new Float32Array(vertices), usage);
      GL.bindBuffer(34962, null);
      return quad;
    },
    getCachedTextureQuad: (drawMode) => {
      if (drawMode == null) drawMode = 5;
      let textureQuad = GeometryTools.textureQuadCache.get(drawMode);
      if (textureQuad == null || !GL.isBuffer(textureQuad)) {
        textureQuad = GeometryTools.createQuad(0, 0, 1, 1, drawMode);
        GeometryTools.textureQuadCache.set(drawMode, textureQuad);
      }
      return textureQuad;
    },
  };

  const TextureTools = {
    textureFactory: (width, height, channelType = 6408, dataType = 5121, filter = 9728) => {
      const texture = GL.createTexture();
      GL.bindTexture(3553, texture);
      GL.texParameteri(3553, 10241, filter);
      GL.texParameteri(3553, 10240, filter);
      GL.texParameteri(3553, 10242, 33071);
      GL.texParameteri(3553, 10243, 33071);
      GL.pixelStorei(3317, 4);
      GL.texImage2D(3553, 0, channelType, width, height, 0, channelType, dataType, null);
      GL.bindTexture(3553, null);
      return texture;
    },
    createTextureFactory:
      (channelType = 6408, dataType = 5121, filter = 9728) =>
      (width, height) =>
        TextureTools.textureFactory(width, height, channelType, dataType, filter),
    floatTextureFactoryRGB: (width, height) => TextureTools.textureFactory(width, height, 6407, 5126),
    floatTextureFactoryRGBA: (width, height) => TextureTools.textureFactory(width, height, 6408, 5126),
  };

  const Render = {};
  Render.RenderTarget = function (width, height, textureFactory) {
    this.width = width;
    this.height = height;
    this.textureFactory = textureFactory;
    if (Render.RenderTarget.textureQuad == null)
      Render.RenderTarget.textureQuad = GeometryTools.getCachedTextureQuad(5);
    this.frameBufferObject = GL.createFramebuffer();
    this.resize(width, height);
  };
  Render.RenderTarget.prototype = {
    resize: function (width, height) {
      const newTexture = this.textureFactory(width, height);
      GL.bindFramebuffer(36160, this.frameBufferObject);
      GL.framebufferTexture2D(36160, 36064, 3553, newTexture, 0);
      this.width = width;
      this.height = height;
      this.texture = newTexture;
      return this;
    },
    activate: function () {
      GL.bindFramebuffer(36160, this.frameBufferObject);
    },
    clear: function (mask) {
      if (mask == null) mask = 16384;
      GL.bindFramebuffer(36160, this.frameBufferObject);
      GL.clearColor(0, 0, 0, 1);
      GL.clear(mask);
    },
    dispose: function () {
      GL.deleteFramebuffer(this.frameBufferObject);
      GL.deleteTexture(this.texture);
    },
  };
  Render.RenderTarget2Phase = function (width, height, textureFactory) {
    this.width = width;
    this.height = height;
    this.textureFactory = textureFactory;
    if (Render.RenderTarget2Phase.textureQuad == null)
      Render.RenderTarget2Phase.textureQuad = GeometryTools.getCachedTextureQuad(5);
    this.writeFrameBufferObject = GL.createFramebuffer();
    this.readFrameBufferObject = GL.createFramebuffer();
    this.resize(width, height);
  };
  Render.RenderTarget2Phase.prototype = {
    resize: function (width, height) {
      const newWriteToTexture = this.textureFactory(width, height);
      const newReadFromTexture = this.textureFactory(width, height);
      GL.bindFramebuffer(36160, this.writeFrameBufferObject);
      GL.framebufferTexture2D(36160, 36064, 3553, newWriteToTexture, 0);
      GL.bindFramebuffer(36160, this.readFrameBufferObject);
      GL.framebufferTexture2D(36160, 36064, 3553, newReadFromTexture, 0);
      this.width = width;
      this.height = height;
      this.writeToTexture = newWriteToTexture;
      this.readFromTexture = newReadFromTexture;
      return this;
    },
    activate: function () {
      GL.bindFramebuffer(36160, this.writeFrameBufferObject);
    },
    swap: function () {
      this.tmpFBO = this.writeFrameBufferObject;
      this.writeFrameBufferObject = this.readFrameBufferObject;
      this.readFrameBufferObject = this.tmpFBO;
      this.tmpTex = this.writeToTexture;
      this.writeToTexture = this.readFromTexture;
      this.readFromTexture = this.tmpTex;
    },
  };

  const Shaders = {};
  Shaders.Resample = function () {
    ShaderBase.call(this);
  };
  Shaders.Resample.prototype = {
    ...ShaderBase.prototype,
    create: function () {
      this.initFromSource(ShaderBaseFrag);
      this.ready = true;
    },
    createProperties: function () {
      const instance = new Uniforms.UTexture('texture', -1, false);
      this.texture = instance;
      this.uniforms.push(instance);
      const instance1 = FloatAttribute('vertexPosition', 0, 2);
      this.vertexPosition = instance1;
      this.attributes.push(instance1);
    },
  };

  const Timer = function (time_ms) {
    let me = this;
    this.id = setInterval(me.run, time_ms);
  };
  Timer.stamp = () => new Date().getTime() / 1000;
  Timer.prototype = {
    stop: function () {
      if (this.id == null) return;
      clearInterval(this.id);
      this.id = null;
    },
  };

  const Renderer = function (w) {
    this.window = w;
    this.window.currentRenderer = this;
  };
  Renderer.dispatch = function () {
    let k = 0;
    let k1 = App.__instance.windows;
    while (k < k1.length) {
      const $window = k1[k];
      ++k;
      if ($window.currentRenderer) {
        const context = $window.currentRenderer.context;
        if (!App.__initialized) {
          App.__initialized = true;
          App.__instance.init(context);
        }
        App.__instance.render(context);
        const listeners = Renderer.onRender.listeners;
        const repeat = Renderer.onRender.repeat;
        let length = listeners.length;
        let i = 0;
        while (i < length) {
          listeners[i](context);
          if (!repeat[i]) {
            Renderer.onRender.remove(listeners[i]);
            length--;
          } else i++;
        }
      }
    }
  };
  Renderer.prototype = {
    create: function () {
      if (this.window.canvas) {
        const options = {
          alpha: true,
          antialias: this.window.config.antialiasing > 0,
          depth: this.window.config.depthBuffer,
          premultipliedAlpha: true,
          stencil: this.window.config.stencilBuffer,
          preserveDrawingBuffer: false,
        };

        GL = this.window.canvas.getContext('webgl', options);
        this.context = GL;
      }
      if (!Renderer.registered) Renderer.registered = true;
    },
  };

  const MouseEventManager = {
    events: ['mousedown', 'mouseup', 'mousemove'],
    eventInfo: {
      type: null,
      x: 0,
      y: 0,
      button: 0,
    },
    handleEvent: (event) => {
      const events = MouseEventManager.events;
      const info = MouseEventManager.eventInfo;
      info.type = events.indexOf(event.type);

      if (!events.includes(event.type)) return;

      if (MouseEventManager.window && MouseEventManager.window.element) {
        if (MouseEventManager.window.canvas) {
          const rect = MouseEventManager.window.canvas.getBoundingClientRect();
          info.x = (event.clientX - rect.left) * (MouseEventManager.window.width / rect.width);
          info.y = (event.clientY - rect.top) * (MouseEventManager.window.height / rect.height);
        } else if (MouseEventManager.window.div) {
          const rect1 = MouseEventManager.window.div.getBoundingClientRect();
          info.x = event.clientX - rect1.left;
          info.y = event.clientY - rect1.top;
        } else {
          const rect2 = MouseEventManager.window.element.getBoundingClientRect();
          info.x = (event.clientX - rect2.left) * (MouseEventManager.window.width / rect2.width);
          info.y = (event.clientY - rect2.top) * (MouseEventManager.window.height / rect2.height);
        }
      } else {
        info.x = event.clientX;
        info.y = event.clientY;
      }

      info.button = event.button;
      switch (info.type) {
        case 0:
          const listeners = MouseEventManager.onMouseDown.listeners;
          const repeat = MouseEventManager.onMouseDown.repeat;
          let length = listeners.length;
          let i = 0;
          while (i < length) {
            listeners[i](info.x, info.y, info.button);
            if (!repeat[i]) {
              MouseEventManager.onMouseDown.remove(listeners[i]);
              length--;
            } else i++;
          }
          break;
        case 1:
          const listeners1 = MouseEventManager.onMouseUp.listeners;
          const repeat1 = MouseEventManager.onMouseUp.repeat;
          let length1 = listeners1.length;
          let i1 = 0;
          while (i1 < length1) {
            listeners1[i1](info.x, info.y, info.button);
            if (!repeat1[i1]) {
              MouseEventManager.onMouseUp.remove(listeners1[i1]);
              length1--;
            } else {
              i1++;
            }
          }
          break;
        case 2:
          const listeners2 = MouseEventManager.onMouseMove.listeners;
          const repeat2 = MouseEventManager.onMouseMove.repeat;
          let length2 = listeners2.length;
          let i2 = 0;
          while (i2 < length2) {
            listeners2[i2](info.x, info.y, info.button);
            if (!repeat2[i2]) {
              MouseEventManager.onMouseMove.remove(listeners2[i2]);
              length2--;
            } else {
              i2++;
            }
          }
          break;
      }
    },
    registerWindow: (_window) => {
      MouseEventManager.events.forEach((e) => {
        _window.element.addEventListener(e, MouseEventManager.handleEvent, true);
      });

      MouseEventManager.window = _window;
      window.document.addEventListener('dragstart', (e) => {
        if (e.target.nodeName.toLowerCase() == 'img') {
          e.preventDefault();
          return false;
        }
        return true;
      });
    },
  };

  const TouchEventManager = {
    events: ['touchstart', 'touchmove', 'touchend'],
    eventInfo: {
      type: null,
      x: 0,
      y: 0,
      id: 0,
    },
    handleEvent: (event) => {
      event.preventDefault();
      const events = TouchEventManager.events;
      const touch = event.changedTouches[0];
      const info = TouchEventManager.eventInfo;
      info.id = touch.identifier;

      if (TouchEventManager.window && TouchEventManager.window.element) {
        const rect = TouchEventManager.window.element.getBoundingClientRect();
        info.x = (touch.pageX - rect.left) * (TouchEventManager.window.width / rect.width);
        info.y = (touch.pageY - rect.top) * (TouchEventManager.window.height / rect.height);
      } else {
        info.x = touch.pageX;
        info.y = touch.pageY;
      }

      switch (events[event.type]) {
        case 0:
          const listeners = TouchEventManager.onTouchStart.listeners;
          const repeat = TouchEventManager.onTouchStart.repeat;
          let length = listeners.length;
          let i = 0;
          while (i < length) {
            listeners[i](info.x, info.y, info.id);
            if (!repeat[i]) {
              TouchEventManager.onTouchStart.remove(listeners[i]);
              length--;
            } else i++;
          }
          break;
        case 1:
          const listeners1 = TouchEventManager.onTouchEnd.listeners;
          const repeat1 = TouchEventManager.onTouchEnd.repeat;
          let length1 = listeners1.length;
          let i1 = 0;
          while (i1 < length1) {
            listeners1[i1](info.x, info.y, info.id);
            if (!repeat1[i1]) {
              TouchEventManager.onTouchEnd.remove(listeners1[i1]);
              length1--;
            } else i1++;
          }
          break;
        case 2:
          const listeners2 = TouchEventManager.onTouchMove.listeners;
          const repeat2 = TouchEventManager.onTouchMove.repeat;
          let length2 = listeners2.length;
          let i2 = 0;
          while (i2 < length2) {
            listeners2[i2](info.x, info.y, info.id);
            if (!repeat2[i2]) {
              TouchEventManager.onTouchMove.remove(listeners2[i2]);
              length2--;
            } else i2++;
          }
          break;
      }
    },
    registerWindow: (window) => {
      TouchEventManager.events.forEach((e) => {
        window.element.addEventListener(e, TouchEventManager.handleEvent, true);
      });
      TouchEventManager.window = window;
    },
  };

  const Window = function (config) {
    this.config = config;
  };
  Window.prototype = {
    create: function () {
      this.setWidth = this.width;
      this.setHeight = this.height;

      if (this.element instanceof HTMLCanvasElement) this.canvas = this.element;
      else this.canvas = window.document.createElement('canvas');

      if (!this.width && !this.height) {
        if (this.element) {
          this.width = this.element.clientWidth;
          this.height = this.element.clientHeight;
        } else {
          this.width = window.innerWidth;
          this.height = window.innerHeight;
        }
        this.fullscreen = true;
      }
      if (this.canvas) {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
      }

      MouseEventManager.registerWindow(this);
      TouchEventManager.registerWindow(this);
      if (this.currentRenderer) this.currentRenderer.create();
    },
  };

  const FloatAttribute = (name, location, nFloats) => ({
    name,
    location,
    byteSize: nFloats * 4,
    itemCount: nFloats,
    type: 5126,
  });

  const Uniforms = {};
  Uniforms.Bool = function (name, index, data) {
    this.name = name;
    this.location = index;
    this.dirty = true;
    this.data = data;
    this.dirty = true;
  };
  Uniforms.Bool.prototype = {
    set: function (data) {
      this.dirty = true;
      this.dirty = true;
      return (this.data = data);
    },
    setDirty: function () {
      this.dirty = true;
    },
    set_data: function (data) {
      this.dirty = true;
      return (this.data = data);
    },
  };
  Uniforms.UBool = function (name, index, f) {
    if (f == null) f = false;
    Uniforms.Bool.call(this, name, index, f);
  };
  Uniforms.UBool.prototype = {
    ...Uniforms.Bool.prototype,
    apply: function () {
      GL.uniform1i(this.location, this.data ? 1 : 0);
      this.dirty = false;
    },
  };
  Uniforms.Float = function (name, index, data) {
    this.name = name;
    this.location = index;
    this.dirty = true;
    this.data = data;
    this.dirty = true;
  };
  Uniforms.Float.prototype = {
    set: function (data) {
      this.dirty = true;
      this.dirty = true;
      return (this.data = data);
    },
    setDirty: function () {
      this.dirty = true;
    },
    set_data: function (data) {
      this.dirty = true;
      return (this.data = data);
    },
  };
  Uniforms.UFloat = function (name, index, f) {
    if (f == null) f = 0.0;
    Uniforms.Float.call(this, name, index, f);
  };
  Uniforms.UFloat.prototype = {
    ...Uniforms.Float.prototype,
    apply: function () {
      GL.uniform1f(this.location, this.data);
      this.dirty = false;
    },
  };
  Uniforms.UTexture = function (name, index, cube = false) {
    this.cube = cube;
    this.type = cube ? 34067 : 3553;
    this.name = name;
    this.location = index;
    this.dirty = true;
    this.data = null;
    this.dirty = true;
  };
  Uniforms.UTexture.prototype = {
    apply: function () {
      if (this.data == null) return;
      const idx = 33984 + this.samplerIndex;
      if (Uniforms.UTexture.lastActiveTexture != idx) GL.activeTexture((Uniforms.UTexture.lastActiveTexture = idx));
      GL.uniform1i(this.location, this.samplerIndex);
      GL.bindTexture(this.type, this.data);
      this.dirty = false;
    },
    set: function (data) {
      this.dirty = true;
      this.dirty = true;
      return (this.data = data);
    },
    setDirty: function () {
      this.dirty = true;
    },
    set_data: function (data) {
      this.dirty = true;
      return (this.data = data);
    },
  };
  Uniforms.Vector2 = function (name, index, data) {
    this.name = name;
    this.location = index;
    this.dirty = true;
    this.data = data;
    this.dirty = true;
  };
  Uniforms.Vector2.prototype = {
    set: function (data) {
      this.dirty = true;
      this.dirty = true;
      return (this.data = data);
    },
    setDirty: function () {
      this.dirty = true;
    },
    set_data: function (data) {
      this.dirty = true;
      return (this.data = data);
    },
  };
  Uniforms.UVec2 = function (name, index, x, y) {
    if (y == null) y = 0;
    if (x == null) x = 0;
    Uniforms.Vector2.call(this, name, index, Vector2(x, y));
  };
  Uniforms.UVec2.prototype = {
    ...Uniforms.Vector2.prototype,
    apply: function () {
      GL.uniform2f(this.location, this.data.x, this.data.y);
      this.dirty = false;
    },
  };

  GeometryTools.textureQuadCache = IntMap();
  GeometryTools.clipSpaceQuadCache = IntMap();
  Shaders.Resample.instance = new Shaders.Resample();
  Renderer.onRender = new Event();
  MouseEventManager.onMouseDown = new Event();
  MouseEventManager.onMouseMove = new Event();
  MouseEventManager.onMouseUp = new Event();
  TouchEventManager.onTouchEnd = new Event();
  TouchEventManager.onTouchMove = new Event();
  TouchEventManager.onTouchStart = new Event();
  Uniforms.UTexture.lastActiveTexture = -1;
  ApplicationMain.main();

  return ApplicationMain;
}

export default function FluidApp(elementName, width = 0, height = 0, background) {
  const app = FL();
  let element = window.document.getElementById(elementName);
  let color = null;
  if (background) {
    background = background.replace('#', '');
    if (background.indexOf('0x') > -1) color = parseInt(background);
    else color = parseInt('0x' + background);
  }

  CONFIG.background = color;
  CONFIG.element = element;
  CONFIG.width = width;
  CONFIG.height = height;
  app.create();
}
