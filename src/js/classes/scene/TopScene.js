/*

     TopScene.js

*/

this.GNS.TopScene = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );

     var _instance;

     //シーンに必要なviewをaddする
     p.show = function(){

          p.logger("TopScene::show");

          _instance = this;

     }

     //シーンが消されるときに呼ばれる
     p.del = function(){

          p.logger("TopScene::del");

          _instance.dispatchEvent( GNS.SceneEvent.DEL_COMPLETE );

     }

     return p._self;

})();