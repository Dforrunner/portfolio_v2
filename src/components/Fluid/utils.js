export const IntMap = () => {
    const h = {}; 

    return {
        set: (key,value) => {
            h[key] = value;
        }
        ,get: (key) => {
            return h[key];
        }
    } 
}; 

export const Vector2 = (x, y) => ({
	y: y || 0,
	x: x || 0,
	setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
});  

export const StringMap = () => {
    const h = {};
    
    return {
        set: (key,value) => {
            h["$" + key] = value;
        }
        ,get: (key) =>{
            return h["$" + key];
        }
        ,exists: (key) =>{
            return h.hasOwnProperty("$" + key);
        }
        ,remove: (key) => {
            key = "$" + key;
            if(!h.hasOwnProperty(key)) return false; 
            delete(h[key]);
            return true;
        }
    }
};