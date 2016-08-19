/*
     Mat4.js
*/

this.GNS.Mat4 = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     p.init = function(
              _aa00 , _aa01 , _aa02 , _aa03 ,
              _aa10 , _aa11 , _aa12 , _aa13 ,
              _aa20 , _aa21 , _aa22 , _aa23 ,
              _aa30 , _aa31 , _aa32 , _aa33
          ){

          this.a00 = 0; this.a01 = 0; this.a02 = 0; this.a03 = 0;
          this.a10 = 0; this.a11 = 0; this.a12 = 0; this.a13 = 0;
          this.a20 = 0; this.a21 = 0; this.a22 = 0; this.a23 = 0;
          this.a30 = 0; this.a31 = 0; this.a32 = 0; this.a33 = 0;

          if( _aa00 != undefined )this.a00 = _aa00;
          if( _aa01 != undefined )this.a01 = _aa01;
          if( _aa02 != undefined )this.a02 = _aa02;
          if( _aa03 != undefined )this.a03 = _aa03;

          if( _aa10 != undefined )this.a10 = _aa10;
          if( _aa11 != undefined )this.a11 = _aa11;
          if( _aa12 != undefined )this.a12 = _aa12;
          if( _aa13 != undefined )this.a13 = _aa13;

          if( _aa20 != undefined )this.a20 = _aa20;
          if( _aa21 != undefined )this.a21 = _aa21;
          if( _aa22 != undefined )this.a22 = _aa22;
          if( _aa23 != undefined )this.a23 = _aa23;

          if( _aa30 != undefined )this.a30 = _aa30;
          if( _aa31 != undefined )this.a31 = _aa31;
          if( _aa32 != undefined )this.a32 = _aa32;
          if( _aa33 != undefined )this.a33 = _aa33;

          this.mul = function(mat4){
            var returnMat4 = new GNS.Mat4();

            returnMat4.a00 = this.a00*mat4.a00 + this.a01*mat4.a10 + this.a02*mat4.a20 + this.a03*mat4.a30;
            returnMat4.a01 = this.a00*mat4.a01 + this.a01*mat4.a11 + this.a02*mat4.a21 + this.a03*mat4.a31;
            returnMat4.a02 = this.a00*mat4.a02 + this.a01*mat4.a12 + this.a02*mat4.a22 + this.a03*mat4.a32;
            returnMat4.a03 = this.a00*mat4.a03 + this.a01*mat4.a13 + this.a02*mat4.a23 + this.a03*mat4.a33;

            returnMat4.a10 = this.a10*mat4.a00 + this.a11*mat4.a10 + this.a12*mat4.a20 + this.a13*mat4.a30;
            returnMat4.a11 = this.a10*mat4.a01 + this.a11*mat4.a11 + this.a12*mat4.a21 + this.a13*mat4.a31;
            returnMat4.a12 = this.a10*mat4.a02 + this.a11*mat4.a12 + this.a12*mat4.a22 + this.a13*mat4.a32;
            returnMat4.a13 = this.a10*mat4.a03 + this.a11*mat4.a13 + this.a12*mat4.a23 + this.a13*mat4.a33;

            returnMat4.a20 = this.a20*mat4.a00 + this.a21*mat4.a10 + this.a22*mat4.a20 + this.a23*mat4.a30;
            returnMat4.a21 = this.a20*mat4.a01 + this.a21*mat4.a11 + this.a22*mat4.a21 + this.a23*mat4.a31;
            returnMat4.a22 = this.a20*mat4.a02 + this.a21*mat4.a12 + this.a22*mat4.a22 + this.a23*mat4.a32;
            returnMat4.a23 = this.a20*mat4.a03 + this.a21*mat4.a13 + this.a22*mat4.a23 + this.a23*mat4.a33;

            returnMat4.a30 = this.a30*mat4.a00 + this.a31*mat4.a10 + this.a32*mat4.a20 + this.a33*mat4.a30;
            returnMat4.a31 = this.a30*mat4.a01 + this.a31*mat4.a11 + this.a32*mat4.a21 + this.a33*mat4.a31;
            returnMat4.a32 = this.a30*mat4.a02 + this.a31*mat4.a12 + this.a32*mat4.a22 + this.a33*mat4.a32;
            returnMat4.a33 = this.a30*mat4.a03 + this.a31*mat4.a13 + this.a32*mat4.a23 + this.a33*mat4.a33;

            return returnMat4;
          }
     }


     return p._self;

})();