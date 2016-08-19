this.GNS.ElementUtil = (function () {

    var p = GNS.ClassFactory.create();

    p._static.getStyle = function( element , param ){

      if( element == null )return;

      var value = ( element.currentStyle || document.defaultView.getComputedStyle(element, '') )[param];
      if( param == "left" || param == "top" || param == "width" || param == "height" ){
        value = parseFloat(value);
      }

      return value;

    }

    p._static.enableAlphaImageLoader = function(){

      var imgList = document.body.getElementsByTagName("img");
      var len = imgList.length;
      var ct = 0;
      
      //console.dir( imgList );
      for( var i = 0 ; i < len ; i++ ){
        imgList[i].style["filter"] = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+imgList[i].src+"', sizingMethod='scale');";
      }
    
    }

    return p._self;

})();