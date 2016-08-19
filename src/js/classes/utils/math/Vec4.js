/*
     Vec4.js
*/

this.GNS.Vec4 = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     p.init = function( _x, _y, _z, _w ){

          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.w = 0;

          if( _x != undefined )this.x = _x;
          if( _y != undefined )this.y = _y;
          if( _z != undefined )this.z = _z;
          if( _w != undefined )this.w = _w;

          this.mulMat4 = function(mat4){
            var returnVec4 = new GNS.Vec4();

            returnVec4.x = this.x*mat4.a00 + this.y*mat4.a10 + this.z*mat4.a20 + this.w*mat4.a30;
            returnVec4.y = this.x*mat4.a01 + this.y*mat4.a11 + this.z*mat4.a21 + this.w*mat4.a31;
            returnVec4.z = this.x*mat4.a02 + this.y*mat4.a12 + this.z*mat4.a22 + this.w*mat4.a32;
            returnVec4.w = this.x*mat4.a03 + this.y*mat4.a13 + this.z*mat4.a23 + this.w*mat4.a33;

            return returnVec4;
          }

     }


     return p._self;

})();