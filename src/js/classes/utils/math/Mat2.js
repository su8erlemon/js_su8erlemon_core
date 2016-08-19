/*
     Mat2.js
*/

this.GNS.Mat2 = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     p.init = function(
              _aa00 , _aa01 ,
              _aa10 , _aa11
          ){

          this.a00 = 0; this.a01 = 0;
          this.a10 = 0; this.a11 = 0;

          if( _aa00 != undefined )this.a00 = _aa00;
          if( _aa01 != undefined )this.a01 = _aa01;
          if( _aa10 != undefined )this.a10 = _aa10;
          if( _aa11 != undefined )this.a11 = _aa11;


          this.inverse = function(){
            var returnMat2 = new GNS.Mat2();

            var size = this.a00 * this.a11 - this.a01 * this.a10;
            if( size == 0 )return null;

            returnMat2.a00 = this.a11 / size;
            returnMat2.a01 = this.a01 * -1 / size;
            returnMat2.a10 = this.a10 * -1 / size;
            returnMat2.a11 = this.a00 / size;

            return returnMat2;
          }

     }


     return p._self;

})();