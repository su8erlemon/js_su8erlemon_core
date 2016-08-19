this.GNS.ElementObject = (function () {

     var p = GNS.ClassFactory.create(GNS.EventDispatcher);
     p.element;
     //public method

     p.addEvent = function( type , call ){

          var handler = function(e){ 
               call( e , this.element );
               stopEvent(e);
          };

          if(this.element.hasEventList == null)this.element.hasEventList=[];
          this.element.hasEventList.push({"type":type,"call":call,"handler":handler});

          if( this.element.addEventListener ){

               this.element.addEventListener( type , handler );

          }else if( this.element.attachEvent ){

               this.element.attachEvent( "on" + type , handler );

          }else{

               this.element["on"+type] = handler;   

          } 

     }

     p.removeEvent = function( type , call ){

           for( var i = 0 ; i < this.element.hasEventList.length ; i++ ){
               
               if( this.element.hasEventList[i].type == type && this.element.hasEventList[i].call == call ){
                    
                    if( this.element.removeEventListener ){

                         this.element.removeEventListener( this.element.hasEventList[i].type , this.element.hasEventList[i].handler );

                    }else if( this.element.detachEvent ){

                         this.element.detachEvent( "on" + this.element.hasEventList[i].type , this.element.hasEventList[i].handler );

                    }else{

                         this.element["on"+this.element.hasEventList[i].type] = null;

                    }

                    this.element.hasEventList.splice( i , 1 );

               }
          }

     }

     p._static.addEvent = function( element , type , call ){

          var handler = function(e){ 
               call(e,element);
               stopEvent(e);
          };

          if(element.hasEventList == null)element.hasEventList=[];
          element.hasEventList.push({"type":type,"call":call,"handler":handler});

          if( element.addEventListener ){

               element.addEventListener( type , handler );

          }else if( element.attachEvent ){

               element.attachEvent( "on" + type , handler );
               
          }else{

               element["on"+type] = handler;   

          } 

     }

     p._static.removeEvent = function( element , type , call ){
          

          for( var i = 0 ; i < element.hasEventList.length ; i++ ){
               
               if( element.hasEventList[i].type == type && element.hasEventList[i].call == call ){
                    
                    if( element.removeEventListener ){

                         element.removeEventListener( element.hasEventList[i].type , element.hasEventList[i].handler );

                    }else if( element.detachEvent ){

                         element.detachEvent( "on" + element.hasEventList[i].type , element.hasEventList[i].handler );

                    }else{

                         element["on"+element.hasEventList[i].type] = null;

                    }

                    element.hasEventList.splice( i , 1 );

               }
          }

     }

     p._static.hasEventList = function( element ){
          return element.hasEventList;
     }

     var stopEvent = function(e){

          return;
          if( e && e.stopPropagation ) {
               e.stopPropagation();
          }else if(window.event) {
               window.event.cancelBubble = true;
          }

     }



     p._static.addClass = function(element, classNameString)
     {
          var nowClass = element.className;
          if( p._static.hasClass(element, classNameString) ) return;
          if( nowClass == ''){
               element.className = classNameString;
          }else{
               element.className = nowClass + ' ' + classNameString;
          }
          // var newclass = e.className.split(' ');
          // newclass.push(c);
          // e.className = newclass.join(' ');
     };

     p._static.hasClass = function(element, classNameString)
     {
          // if( (element.className).indexOf(classNameString) >= 0) return true;
          // return false;
          var re = new RegExp("(^|\\s)" + classNameString + "(\\s|$)");
          return re.test(element.className);
     };

     p._static.removeClass = function(element, classNameString)
     {
          var nowClass = element.className;
          if( nowClass.indexOf(classNameString+' ') >= 0 )
          {
               element.className = nowClass.replace(classNameString+' ','');
          }
          else if( nowClass.indexOf(' '+classNameString) >= 0 )
          {
               element.className = nowClass.replace(' '+classNameString,'');
          }
          else
          {
               element.className = nowClass.replace(classNameString, '');
          }
     };


     return p._self;

})();