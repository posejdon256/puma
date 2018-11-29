export function quaterion(x, y, z, w){

    if(!x) x = 0; if(!y) y = 0; if(!z) z = 0;
    if(w === undefined) w = 1;
    quaternion.x = x;
    quaternion.y = y;
    quaternion.z = z;
    quaternion.w = w;
    function quaternion(){}
    quaternion.mul = function(q){
      q = q.array()
      return quaterion( 
            x * q[3]  +  y * q[2]  -  z * q[1]  +  w * q[0]
        , - x * q[2]  +  y * q[3]  +  z * q[0]  +  w * q[1]
        ,   x * q[1]  -  y * q[0]  +  z * q[3]  +  w * q[2]
        , - x * q[0]  -  y * q[1]  -  z * q[2]  +  w * q[3]
      )
    }
    quaternion.mulScalar = function(scalar){
        return quaterion(x * scalar, y * scalar, z * scalar, w * scalar);
    }
    quaternion.inverse = function(){
      return quaterion(x * -1, y * -1, z * -1);
    }
  
    quaternion.size = function(){
      return Math.sqrt(x*x + y*y + z*z + w*w);
    }
  
    quaternion.norm = function(){
      var l = this.size();
      if(l === 0) return quaternion(0, 0, 0, 0);
      else return quaterion(x / l, y / l, z / l, w / l);
    }
  
    quaternion.add = function(s){
        return quaterion(x + s.x, y + s.y, z + s.z, w + s.w);
    }
    quaternion.diff = function(s){
        return quaterion(x - s.x, y - s.y, z - s.z, w - s.w);
    }
  
    quaternion.fromAxis = function(axis, angle){
      var halfAngle = angle / 2, s = Math.sin(halfAngle);
      return quaterion(axis.x * s, axis.y * s, axis.z * s, Math.cos(halfAngle));
    }
    return quaternion
  }