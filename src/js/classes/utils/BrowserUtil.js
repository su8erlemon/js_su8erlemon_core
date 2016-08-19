this.GNS.BrowserUtil = (function () {

     var p = GNS.ClassFactory.create();

     p._static.isIE6 = false;
     p._static.isIE7 = false;
     p._static.isIE8 = false;
     p._static.isIE8 = false;
     p._static.isIE9 = false;
     p._static.isIE10 = false;
     p._static.isIE11 = false;
     p._static.isIE = false;
     p._static.isChorome = false;
     p._static.isSafari = false;
     p._static.isOpera = false;
     p._static.isFirefox = false;

     p._static.isiPadiOS7 = false;
     p._static.isiPad = false;
     p._static.isiOS = false;
     p._static.isiOS7 = true;

     p._static.isAndroid = false;
     p._static.isAndroidTablet = false;

     p._static.initialized = false;

     p._static.init = function(){
          
          var ua = window.navigator.userAgent.toLowerCase();
          var ver = window.navigator.appVersion.toLowerCase();
          var name = 'unknown';

          if (ua.indexOf("msie") != -1){
             p._static.isIE = true;
             name = "IE";
             if (ver.indexOf("msie 6.") != -1){
                 p._static.isIE6 = true;
                 name = "IE6";
             }else if (ver.indexOf("msie 7.") != -1){
                 p._static.isIE7 = true;
                 name = "IE7";
             }else if (ver.indexOf("msie 8.") != -1){
                 p._static.isIE8 = true;
                 name = "IE8";
             }else if (ver.indexOf("msie 9.") != -1){
                 p._static.isIE9 = true;
                 name = "IE9";
             }else if (ver.indexOf("msie 10.") != -1){
                 p._static.isIE10 = true;
                 name = "IE10";
             }
          }else if(ua.indexOf('trident/7') != -1){
             p._static.isIE11 = true;
             p._static.isIE = true;
             name = "IE11";
          }else if (ua.indexOf('chrome') != -1){
             p._static.isChorome = true;
             name = "Chorome";
          }else if (ua.indexOf('safari') != -1){
             p._static.isSafari = true;
             name = "Safari";
          }else if (ua.indexOf('opera') != -1){
             p._static.isOpera = true;
             name = "Opera";
          }else if (ua.indexOf('firefox') != -1){
             p._static.isFirefox = true;
             name = "Firefox";
          }

          
          //iPad判定
          if( ua.indexOf('iphone') != -1 ){
            p._static.isiOS = true;

            var verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua);
            if( verArray[2] == 7 ){
              p._static.isiOS7 = true;
            }
          }

          if( ua.indexOf('ipod') != -1 ){
            p._static.isiOS = true;
          }

          if( ua.indexOf('ipad') != -1 ){
              p._static.isiOS = true;
              p._static.isiPad = true;
              
            var verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua);
            if( verArray[2] == 7 ){
              p._static.isiPadiOS7 = true;
            }

          }

          if( ua.indexOf('android') != -1 ){
            p._static.isAndroid = true;

            if( ua.indexOf('Mobile') == -1 ){
              p._static.isAndroidTablet = true;
            }

          }

          p._static.initialized = true;

          p.logger("BrowserUtill::init ----------> is"+name)
     }

     p._static.init();
     return p._self;

})();