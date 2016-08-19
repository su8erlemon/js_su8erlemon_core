/*
     SceneController.js

     index画面<->記事画面、各記事同士を遷移するクラス
*/

this.GNS.SceneController = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     var s = p._static;

     s.TOP_SCENE = "index";
     s.ARTICLE_SCENE = "article";

     //現在のシーンID
     s.current_scene_id = "";

     //現在のシーンobj
     s.current_scene;

     p.init = function(){}

     s.init = function(){
          
          p.logger("SceneController::init");

     }

     //指定のscene_idに移動します
     s.gotoScene = function( scene_id ){


          if( s.current_scene != null ){

               if( s.current_scene.hasEventListener( GNS.SceneEvent.DEL_COMPLETE ) ) return;

               s.current_scene.addEventListener( GNS.SceneEvent.DEL_COMPLETE , function(){
                    s.current_scene.removeEventListener( GNS.SceneEvent.DEL_COMPLETE , arguments.callee );
                    s.current_scene = null;
                    GNS.SceneController.gotoScene( scene_id );
               });

               s.current_scene.del();

               return;

          }

          p.logger( "current_scene "+s.current_scene );
          p.logger( "SceneController::gotoScene -> " + scene_id );

          switch( scene_id ){
               case s.TOP_SCENE:
               s.current_scene = new GNS.TopScene();
               break;

               case s.ARTICLE_SCENE:
               s.current_scene = new GNS.ArticleScene();
               break;


               default:
               p.logger( "###ERROR SceneController::gotoScene scene_id not found" );
               return;
               break;
          }

          s.current_scene.show();
          s.current_scene_id = scene_id;


     }

     return p._self;

})();