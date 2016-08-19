//SampleClass
this.GNS.SampleClass = (function () {

     var p = new GNS.ClassFactory.create();
     var s = p._static;

     s.aa = "static member";
     
     p.init = function(){
          
          var _this = this;

          _this.aa = "public-member";
          var aa = "private-member";

          console.log( "SampleClass::constructor", _this.aa , aa );

          //public method
          _this.publicMethod = function(){
               console.log( "SampleClass::publicMethod" );
          }

          //private method
          var privateMethod = function(){
               console.log( "SampleClass::privateMethod" );
          }

     }

     //static method
     s.staticMethod = function(){
          console.log( "SampleClass::static-method" );
     }

     return p._self;

})();