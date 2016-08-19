this.GNS.TextureObject = (function () {

	var p = GNS.ClassFactory.create();
	var s = p._static;

	/*
	* init
	*/
	p.init = function( img )
	{

		var _this = this;

		// テクスチャオブジェクトの生成
		this.texture = gl.createTexture();

		// テクスチャをバインドする
		gl.bindTexture(gl.TEXTURE_2D, this.texture);

		// テクスチャへイメージを適用
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

		// ミップマップを生成
		gl.generateMipmap(gl.TEXTURE_2D);

		// テクスチャパラメータの設定
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

		// テクスチャのバインドを無効化
		gl.bindTexture(gl.TEXTURE_2D, null);

	}

	return p._self;

})();