this.GNS.CSS3Tween = (function () {

    //CSSTween.to( element , time , params );
    //CSSTween.to( element , 1 , { opacity:0,width:100,top:20 } );

    var p = GNS.ClassFactory.create();

    var styleSheet;
    var ct;

    p._static.to = function( element , sec , params ){

      var keyframesName = "WpQYXIHoaU"+ct;
      ct++;

      var initParams = element.currentStyle || document.defaultView.getComputedStyle(element, '');

      var params_str = "";
      var init_params_str = "";
      for(var key in params) {

        params_str += key + ":" + params[key]; 
        params_str += addUnit(key);
        params_str += ";"

        var init_param = initParams[key];
        if( init_param == "auto" )init_param = 0;
        init_params_str += key + ":" + init_param;
        //init_params_str += addUnit(key);
        init_params_str += ";"

      }

      p.logger("##INIT## : " + init_params_str);
      p.logger("##GOGO## : " + params_str);

      var keyframes = "";
      keyframes += "@-webkit-keyframes " + keyframesName;
      keyframes += "{"
      keyframes += "0% { " + init_params_str + " }";
      keyframes += "100% { " + params_str + " }";
      keyframes += "}"

      styleSheet.insertRule( keyframes , 0 );
      

      var animation_property = "";
      animation_property += keyframesName;
      animation_property += " ";
      animation_property += sec + "s";
      animation_property += " ";
      
      var dalay = params["delay"];
      if( dalay != null){
        animation_property += dalay + "s";
        animation_property += " ";
      }

      var ease = params["ease"];
      if( ease != null){
        animation_property += ease + "s";
        animation_property += " ";
      }

      var iteration_count = params["iteration"];
      if( iteration_count != null){
        animation_property += iteration_count;
        animation_property += " ";
      }

      var direction = params["direction"];
      if( direction != null){
        animation_property += direction;
      }

      element.style["-webkit-animation"] = animation_property;

      element.addEventListener( "webkitAnimationEnd" , function(){
        
        for(var key in params) {
          element.style[key] = params[key] + addUnit(key);
        }

      } , false);

    }

    var addUnit = function( key ){

      if( key == "left" || key == "top" || key == "right" || key == "bottom" || key == "width" || key == "height"){
        return "px";
      }

      return "";

    }

    p._static.init = function(){

      //init();  
      styleSheet = document.styleSheets[0];
      ct = 0;

    }


    p._static.init();
    return p._self;

})();