//Eventクラス
//model

this.GNS.SceneEvent = (function () {

     var p = GNS.ClassFactory.create();
     var s = p._static;

     s.DEL_COMPLETE = "del_complete";

     p._static.getTarget = function(e){

          return (e && e.target) || (window.event && window.event.srcElement);

     }

     return p._self;

})();