/*

     ArticleScene.js

*/

this.GNS.ArticleScene = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );

     var _instance;

     //シーンに必要なviewをaddする
     p.show = function(){

          p.logger("ArticleScene::show");

          _instance = this;

     }

     //シーンが消されるときに呼ばれる
     p.del = function(){

          p.logger("ArticleScene::del");

          _instance.dispatchEvent( GNS.SceneEvent.DEL_COMPLETE );

     }

     return p._self;

})();