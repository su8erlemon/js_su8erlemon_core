this.GNS.StringUtil = (function () {

    var p = GNS.ClassFactory.create();
    var s = p._static;
    

    s.getUrlQuery = function (){

        var result = {};
        if( 1 < window.location.search.length )
        {
            // 最初の1文字 (?記号) を除いた文字列を取得する
            var query = window.location.search.substring( 1 );

            // クエリの区切り記号 (&) で文字列を配列に分割する
            var parameters = query.split( '&' );

            for( var i = 0; i < parameters.length; i++ )
            {
                // パラメータ名とパラメータ値に分割する
                var element = parameters[ i ].split( '=' );

                var paramName = decodeURIComponent( element[ 0 ] );
                var paramValue = decodeURIComponent( element[ 1 ] );

                // パラメータ名をキーとして連想配列に追加する
                result[ paramName ] = paramValue;
            }
        }

        return result;

    }

    return p._self;

})();


