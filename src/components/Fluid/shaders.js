export const NoTransformVert = `
	attribute vec2 vertexPosition;
	varying vec2 texelCoord;

	void main() {
		texelCoord = vertexPosition;
		gl_Position = vec4(vertexPosition*2.0 - vec2(1.0, 1.0), 0.0, 1 );	
	}
`;

export const NoTransformFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif
	varying vec2 texelCoord;

	void main(){
		vec2 ip = vec2((texelCoord.x), (texelCoord.y)) * 2.0 - 1.0;
		vec2 iv = vec2(0, 0);
		gl_FragColor = vec4(ip, iv);
	}
`;

export const FluidBaseVert = `
	#ifdef GL_ES
		precision mediump float;
	#endif
	
	attribute vec2 vertexPosition;
	uniform float aspectRatio;
	varying vec2 texelCoord;
	varying vec2 p;
	
	void main() {
		texelCoord = vertexPosition;
		vec2 clipSpace = 2.0*texelCoord - 1.0;
		p = vec2(clipSpace.x * aspectRatio, clipSpace.y);
		gl_Position = vec4(clipSpace, 0.0, 1.0 );
	}
`;

export const FluidBaseFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	#define PRESSURE_BOUNDARY
	#define VELOCITY_BOUNDARY

	uniform vec2 invresolution;
	uniform float aspectRatio;

	vec2 clipToSimSpace(vec2 clipSpace){
		return  vec2(clipSpace.x * aspectRatio, clipSpace.y);
	}

	vec2 simToTexelSpace(vec2 simSpace){
		return vec2(simSpace.x / aspectRatio + 1.0 , simSpace.y + 1.0)*0.5;
	}

	float samplePressue(sampler2D pressure, vec2 coord){
		vec2 cellOffset = vec2(0.0, 0.0);

		#ifdef PRESSURE_BOUNDARY
		if(coord.x < 0.0)      cellOffset.x = 1.0;
		else if(coord.x > 1.0) cellOffset.x = -1.0;
		if(coord.y < 0.0)      cellOffset.y = 1.0;
		else if(coord.y > 1.0) cellOffset.y = -1.0;
		#endif

		return texture2D(pressure, coord + cellOffset * invresolution).x;
	}

	vec2 sampleVelocity(sampler2D velocity, vec2 coord){
		vec2 cellOffset = vec2(0.0, 0.0);
		vec2 multiplier = vec2(1.0, 1.0);

		#ifdef VELOCITY_BOUNDARY
		if(coord.x<0.0){
			cellOffset.x = 1.0;
			multiplier.x = -1.0;
		}else if(coord.x>1.0){
			cellOffset.x = -1.0;
			multiplier.x = -1.0;
		}
		if(coord.y<0.0){
			cellOffset.y = 1.0;
			multiplier.y = -1.0;
		}else if(coord.y>1.0){
			cellOffset.y = -1.0;
			multiplier.y = -1.0;
		}
		#endif

		return multiplier * texture2D(velocity, coord + cellOffset * invresolution).xy;
	}
`;

export const TexelSpaceVert = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	attribute vec2 vertexPosition;
	uniform float aspectRatio;
	varying vec2 texelCoord;
	varying vec2 p;

	void main() {
		texelCoord = vertexPosition;
		vec2 clipSpace = 2.0*texelCoord - 1.0;
		p = vec2(clipSpace.x * aspectRatio, clipSpace.y);
		gl_Position = vec4(clipSpace, 0.0, 1.0);	
	}
`;

export const VelocityDivergenceFrag = `
	uniform sampler2D velocity;
	uniform float halfrdx;
	varying vec2 texelCoord;

	void main(void){
		vec2 L = sampleVelocity(velocity, texelCoord - vec2(invresolution.x, 0));
		vec2 R = sampleVelocity(velocity, texelCoord + vec2(invresolution.x, 0));
		vec2 B = sampleVelocity(velocity, texelCoord - vec2(0, invresolution.y));
		vec2 T = sampleVelocity(velocity, texelCoord + vec2(0, invresolution.y));

		gl_FragColor = vec4( halfrdx * ((R.x - L.x) + (T.y - B.y)), 0, 0, 1);
	}
`;

export const AdvectFrag = `
	uniform sampler2D velocity;
	uniform sampler2D target;
	uniform float dt;
	uniform float rdx; 

	varying vec2 texelCoord;
	varying vec2 p;

	void main(void){
		vec2 tracedPos = p - dt * rdx * texture2D(velocity, texelCoord ).xy;
		tracedPos = simToTexelSpace(tracedPos)/invresolution; 
		
		vec4 st;
		st.xy = floor(tracedPos-.5)+.5; 
		st.zw = st.xy+1.;               
		vec2 t = tracedPos - st.xy;
		st*=invresolution.xyxy;
		
		vec4 tex11 = texture2D(target, st.xy );
		vec4 tex21 = texture2D(target, st.zy );
		vec4 tex12 = texture2D(target, st.xw );
		vec4 tex22 = texture2D(target, st.zw );

		gl_FragColor = mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);
	}
`;

export const PressureGradientSubstractFrag = `
	uniform sampler2D pressure;
	uniform sampler2D velocity;
	uniform float halfrdx;

	varying vec2 texelCoord;

	void main(void){
		float L = samplePressue(pressure, texelCoord - vec2(invresolution.x, 0));
		float R = samplePressue(pressure, texelCoord + vec2(invresolution.x, 0));
		float B = samplePressue(pressure, texelCoord - vec2(0, invresolution.y));
		float T = samplePressue(pressure, texelCoord + vec2(0, invresolution.y));

		vec2 v = texture2D(velocity, texelCoord).xy;

		gl_FragColor = vec4(v - halfrdx*vec2(R-L, T-B), 0, 1);
	}
`;

export const PressureSolveFrag = `
	uniform sampler2D pressure;
	uniform sampler2D divergence;
	uniform float alpha;

	varying vec2 texelCoord;

	void main(void){
		float L = samplePressue(pressure, texelCoord - vec2(invresolution.x, 0));
		float R = samplePressue(pressure, texelCoord + vec2(invresolution.x, 0));
		float B = samplePressue(pressure, texelCoord - vec2(0, invresolution.y));
		float T = samplePressue(pressure, texelCoord + vec2(0, invresolution.y));

		float bC = texture2D(divergence, texelCoord).x;

		gl_FragColor = vec4( (L + R + B + T + alpha * bC) * .25, 0, 0, 1 );//rBeta = .25
	}
`;

export const ShaderBaseVert = `
	#ifdef GL_ES
		precision mediump float;
	#endif
	attribute vec2 vertexPosition;
	varying vec2 texelCoord;

	void main(){
		texelCoord = vertexPosition;
		gl_Position = vec4(vertexPosition*2.0 - 1.0, 0.0, 1.0 );
	}
`;

export const ShaderBaseFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif
	uniform sampler2D texture;

	varying vec2 texelCoord;

	void main(){
		gl_FragColor = texture2D(texture, texelCoord);
	}
`;

export const RenderParticlesVert = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	uniform sampler2D particleData;
	attribute vec2 particleUV;
	varying vec4 color;

	void main(){
		vec2 p = texture2D(particleData, particleUV).xy;
		vec2 v = texture2D(particleData, particleUV).zw;
		gl_PointSize = 1.0;
		gl_Position = vec4(p, 0.0, 1.0);

		color = vec4(1.0, 1.0, 1.0, 1.0);
	}
`;

export const RenderParticlesFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	varying vec4 color;

	void main(){
		gl_FragColor = vec4(color);
	}
`;

export const StepParticlesFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	varying vec2 texelCoord;
	uniform float dt;
	uniform sampler2D particleData;
	uniform float dragCoefficient;
	uniform vec2 flowScale;
	uniform sampler2D flowVelocityField;

	void main(){
		vec2 p = texture2D(particleData, texelCoord).xy;
		vec2 v = texture2D(particleData, texelCoord).zw;

		vec2 vf = texture2D(flowVelocityField, (p+1.)*.5).xy * flowScale;//(converts clip-space p to texel coordinates)
		v += (vf - v) * dragCoefficient;

		p+=dt*v;
		gl_FragColor = vec4(p, v);
	}
`;

export const QuadTextureFrag = `
	#ifdef GL_ES
		precision mediump float;
	#endif

	uniform sampler2D texture;
	varying vec2 texelCoord;

	void main(void){
		gl_FragColor = abs(texture2D(texture, texelCoord));
	}
`;

export const ColorParticleMotionVert = `
	#ifdef GL_ES
		precision mediump float;
	#endif
	uniform sampler2D particleData;
	attribute vec2 particleUV;
	varying vec4 color;
	
	void main(){
		vec2 p = texture2D(particleData, particleUV).xy;
		vec2 v = texture2D(particleData, particleUV).zw;
		gl_PointSize = 1.0;
		gl_Position = vec4(p, 0.0, 1.0);
		float speed = length(v);
		float x = clamp(speed * 4.0, 0., 1.);
		color.rgb = (
				mix(vec3(40.4, 0.0, 35.0) / 300.0, vec3(0.2, 47.8, 100) / 100.0, x)
				+ (vec3(63.1, 92.5, 100) / 100.) * x*x*x * .1
		);
		color.a = 1.0;
	}
`;

export const ColorParticleMotionFrag = `
    #ifdef GL_ES
        precision mediump float;
    #endif
    varying vec4 color;

    void main(){
        gl_FragColor = vec4(color);
    }
`;

export const GeomGLSL = `
	float distanceToSegment(vec2 a, vec2 b, vec2 p, out float fp){
		vec2 d = p - a;
		vec2 x = b - a;

		fp = 0.0;
		float lx = length(x);
		
		if(lx <= 0.0001) return length(d);

		float projection = dot(d, x / lx);

		fp = projection / lx;

		if(projection < 0.0)            return length(d);
		else if(projection > length(x)) return length(p - b);
		return sqrt(abs(dot(d,d) - projection*projection));
	}
	float distanceToSegment(vec2 a, vec2 b, vec2 p){
		float fp;
		return distanceToSegment(a, b, p, fp);
	}
`;

export const UpdateDyeFrag = `
	uniform sampler2D dye;
	uniform float dt;
	uniform float dx;

	varying vec2 texelCoord;
	varying vec2 p;
`;

export const MouseDownFrag = `
    uniform sampler2D velocity;
    uniform float dt;
    uniform float dx;
    varying vec2 texelCoord;
    varying vec2 p;
    uniform bool isMouseDown;
    uniform vec2 mouseClipSpace;
    uniform vec2 lastMouseClipSpace;

    void main(){
        vec2 v = texture2D(velocity, texelCoord).xy;
        v.xy *= 0.999;
        
        if(isMouseDown){
            vec2 mouse = clipToSimSpace(mouseClipSpace);
            vec2 lastMouse = clipToSimSpace(lastMouseClipSpace);
            vec2 mouseVelocity = -(lastMouse - mouse)/dt;
            float fp;
            float l = distanceToSegment(mouse, lastMouse, p, fp);
            float taperFactor = 0.6;
            float projectedFraction = 1.0 - clamp(fp, 0.0, 1.0)*taperFactor;
            float R = 0.015;
            float m = exp(-l/R);
            m *= projectedFraction * projectedFraction;
            vec2 targetVelocity = mouseVelocity*dx;
            v += (targetVelocity - v)*m;
        }
        gl_FragColor = vec4(v, 0, 1.);
    }
`;

export const MouseDyeFrag = `
		uniform bool isMouseDown;
		uniform vec2 mouseClipSpace;
		uniform vec2 lastMouseClipSpace;

		void main(){
			vec4 color = texture2D(dye, texelCoord);

			color.r *= (0.9797);
			color.g *= (0.9494);
			color.b *= (0.9696);
			if(isMouseDown){			
				vec2 mouse = clipToSimSpace(mouseClipSpace);
				vec2 lastMouse = clipToSimSpace(lastMouseClipSpace);
				vec2 mouseVelocity = -(lastMouse - mouse)/dt;
				
				//compute tapered distance to mouse line segment
				float fp;//fractional projection
				float l = distanceToSegment(mouse, lastMouse, p, fp);
				float taperFactor = 0.6;
				float projectedFraction = 1.0 - clamp(fp, 0.0, 1.0)*taperFactor;

				float R = 0.025;
				float m = exp(-l/R);
				
				float speed = length(mouseVelocity);
				float x = clamp((speed * speed * 0.02 - l * 5.0) * projectedFraction, 0., 1.);
				color.rgb += m * (
					mix(vec3(2.4, 0, 5.9) / 60.0, vec3(0.2, 51.8, 100) / 30.0, x)
					+ (vec3(100) / 100.) * pow(x, 9.)
				);
			}

			gl_FragColor = color;
		}
	`;