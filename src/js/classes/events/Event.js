//Eventクラス 
//model

this.GNS.Event = (function () {

     var p = GNS.ClassFactory.create();

     p._static.LOAD = "load";
     p._static.UNLOAD = "unload";
     p._static.RESIZE = "resize";
     p._static.SCROLL = "scroll";
     p._static.MOUSE_DOWN = "mousedown";
     p._static.MOUSE_UP = "mouseup";
     p._static.MOUSE_OVER = "mouseover";
     p._static.MOUSE_OUT = "mouseout";
     // p._static.CLICK = "click";
     p._static.CLICK = "mousedown";
     

     p._static.getTarget = function(e){

          return (e && e.target) || (window.event && window.event.srcElement);
          
     }   

     return p._self;

})();