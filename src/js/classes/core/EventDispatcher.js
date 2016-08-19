this.GNS.EventDispatcher = (function () {

     var p = GNS.ClassFactory.create();
     p.element;

     var hasEventList = [];
     //public method

     p.dispatchEvent = function( type ){

		if( type == null )return;

     	for( var i = 0 ; i < hasEventList.length ; i++ ){
     		if(hasEventList[i].type == type){
     			hasEventList[i].call();
     		}
     	}
     	// p.logger( "EventDispatcher::dispatchEvent " + hasEventList.length );
     }

     p.addEventListener = function( type , call ){

     	if( type == null )return;
     	if( call == null )return;

     	for( var i = 0 ; i < hasEventList.length ; i++ ){
     		if(hasEventList[i].type == type && hasEventList[i].call == call ){
     			return;
     		}
     	}
     	
     	hasEventList.push({"type":type,"call":call});
		// p.logger( "EventDispatcher::addEventListener " + hasEventList.length );
     }

     p.removeEventListener = function( type , call ){

		if( type == null )return;
     	if( call == null )return;

     	for( var i = 0 ; i < hasEventList.length ; i++ ){
     		if(hasEventList[i].type == type && hasEventList[i].call == call ){
     			hasEventList.splice( i , 1 );
     		}
     	}
     	// p.logger( "EventDispatcher::removeEventListener " + hasEventList.length );
     }

     p.removeAllEventListener = function(){

          hasEventList.length = 0;
     }

     p.hasEventNum = function(){

     	return hasEventList.length;

     }

     p.hasEventList = function(){

          return hasEventList;

     }

     p.hasEventListener = function( type ){

     	if( type == null )return;

		for( var i = 0 ; i < hasEventList.length ; i++ ){
     		if(hasEventList[i].type == type){
     			return true;
     		}
     	}
     	return false;

     }



     return p._self;

})();