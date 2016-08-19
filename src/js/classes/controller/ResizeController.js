/*
     ResizeController.js

*/

this.GNS.ResizeController = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     var hasFunctionList;

     s.init = function(){

          console.log("ResizeController::init");

          GNS.Window.getInstance().addEvent( GNS.Event.RESIZE , resizeHandler );
          hasFunctionList = [];

     }

     s.addFunction = function( call ){
          if( call == null )return;

          for( var i = 0 ; i < hasFunctionList.length ; i++ ){
               if(hasFunctionList[i] == call ){
                    return;
               }
          }

          hasFunctionList.push( call );

          // console.log( "addFunction",hasFunctionList.length );
     }

     s.removeFunction = function( call ){
          if( call == null )return;

          for( var i = 0 ; i < hasFunctionList.length ; i++ ){
               if(hasFunctionList[i] == call ){
                    hasFunctionList.splice( i , 1 );
               }
          }

          // console.log( "removeFunction",hasFunctionList.length );
     }

     var resize_timer = null;
     var resizeHandler = function(){
          clearTimeout(resize_timer);
          resize_timer = setTimeout(function() {
               for( var i = 0 ; i < hasFunctionList.length ; i++ ){
                    hasFunctionList[i]();
               }
          }, 33);
     }

     return p._self;

})();