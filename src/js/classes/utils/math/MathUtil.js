/*
     MathUtil.js
*/

this.GNS.MathUtil = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     s.random = function(min,max){

        return Math.random() * ( max - min ) + min

     }

     s.dist = function(x1,x2,y1,y2){

        return ( x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 );

     }


     return p._self;

})();