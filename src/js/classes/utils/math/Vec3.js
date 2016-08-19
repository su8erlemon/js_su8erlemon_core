/*
     Vec3.js
*/

this.GNS.Vec3 = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     p.init = function( _x , _y , _z ){

          this.x = 0;
          this.y = 0;
          this.z = 0;

          if( _x != undefined )this.x = _x;
          if( _y != undefined )this.y = _y;
          if( _z != undefined )this.z = _z;

          this.add = function(vec3){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x + vec3.x;
            returnVec3.y = this.y + vec3.y;
            returnVec3.z = this.z + vec3.z;
            return returnVec3;
          }

          this.add1 = function(value){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x + value;
            returnVec3.y = this.y + value;
            returnVec3.z = this.z + value;
            return returnVec3;
          }



          this.sub = function(vec3){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x - vec3.x;
            returnVec3.y = this.y - vec3.y;
            returnVec3.z = this.z - vec3.z;
            return returnVec3;
          }

          this.sub1 = function(value){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x - value;
            returnVec3.y = this.y - value;
            returnVec3.z = this.z - value;
            return returnVec3;
          }



          this.mul = function(vec3){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x * vec3.x;
            returnVec3.y = this.y * vec3.y;
            returnVec3.z = this.z * vec3.z;
            return returnVec3;
          }

          this.mul1 = function(value){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x * value;
            returnVec3.y = this.y * value;
            returnVec3.z = this.z * value;
            return returnVec3;
          }






          this.div = function(vec3){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x / vec3.x;
            returnVec3.y = this.y / vec3.y;
            returnVec3.z = this.z / vec3.z;
            return returnVec3;
          }

          this.div1 = function(value){
            var returnVec3 = new GNS.Vec3();
            returnVec3.x = this.x / value;
            returnVec3.y = this.y / value;
            returnVec3.z = this.z / value;
            return returnVec3;
          }





          this.normalize = function(){
            var returnVec3 = new GNS.Vec3();
            var length = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );
            if( length > 0 ) {
              returnVec3.x = this.x / length;
              returnVec3.y = this.y / length;
              returnVec3.z = this.z / length;
            }
            return returnVec3;
          }

          this.cross = function(vec3){
            var returnVec3 = new GNS.Vec3();
            var _x = this.y*vec3.z - this.z*vec3.y;
            var _y = this.z*vec3.x - this.x*vec3.z;
            returnVec3.z = this.x*vec3.y - this.y*vec3.x;
            returnVec3.x = _x;
            returnVec3.y = _y;
            return returnVec3;
          }

          this.dot = function(vec3){
            return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
          }

          this.dist = function(vec3){
            return Math.sqrt( (vec3.x - this.x ) * (vec3.x - this.x ) + (vec3.y - this.y ) * (vec3.y - this.y ) + (vec3.z - this.z ) * (vec3.z - this.z ) );
          }

          this.lim = function(max){
              var returnVec3 = this;
              var lengthSquared = (this.x*this.x + this.y*this.y + this.z*this.z);
              if( lengthSquared > max * max && lengthSquared > 0 ) {
                  var ratio = max/Math.sqrt(lengthSquared);
                  returnVec3.x = this.x * ratio;
                  returnVec3.y = this.y * ratio;
                  returnVec3.z = this.z * ratio;
              }
              return returnVec3;
          }

     }


     return p._self;

})();