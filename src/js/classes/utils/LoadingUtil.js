this.GNS.LoadingUtil = (function () {

    var p = GNS.ClassFactory.create();
    var s = p._static;
    
    //複数ローディングのcomplete待ち
    s.multiLoad = function( funcList, callBack ){

        var loadCount = 0;
        for( var i = 0; i < funcList.length ; i++ ){
            funcList[i]( comp );
        }

        function comp(){
            loadCount++;
            if( loadCount >= funcList.length ){
                callBack();
            }
        }

    }

    return p._self;

})();