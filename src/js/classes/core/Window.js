this.GNS.Window = (function () {

     var p = GNS.ClassFactory.create( GNS.ElementObject );
     p._static.instance;

     p.init = function(){

          p.logger( "Document::init" );

     }

     p._static.getInstance = function(){

          if( p._static.instance == null ){
               p.element = window;
               p._static.instance = new GNS.Window();
          }

          return p._static.instance;

     }

     p._static.getSize = function(){

          return {
               innerWidth:( window.innerWidth || (document.documentElement && document.documentElement.clientWidth) ),
               innerHeight:( window.innerHeight || (document.documentElement && document.documentElement.clientHeight) ),
               screenWidth:screen.width,
               screenHeight:screen.height
          }

     }

     return p._self;

})();