this.GNS.ProgramObject = (function () {

	var p = GNS.ClassFactory.create();
	var s = p._static;

	var div;
	/*
	* init
	*/
	p.init = function(vartexShaderId,fragmentShaderId)
	{

		var v_shader = create_shader(vartexShaderId);
		var f_shader = create_shader(fragmentShaderId);

		var _this = this;
		var _uniformLocationObj = {};
		// プログラムオブジェクトの生成とリンク
		this.prgramObject = create_program(v_shader, f_shader);

		this.setUniformLocation = function(locationName){
			_uniformLocationObj[locationName] = gl.getUniformLocation( _this.prgramObject, locationName );
		}

		this.getUniformLocation = function(locationName){
			return _uniformLocationObj[locationName];
		}

		this.useProgram = function(){
			gl.useProgram( _this.prgramObject );
		}
	}

	// シェーダを生成する関数
	var create_shader = function(id){
		// シェーダを格納する変数
		var shader;

		// HTMLからscriptタグへの参照を取得
		var scriptElement = document.getElementById(id);

		// scriptタグが存在しない場合は抜ける
		if(!scriptElement){return;}

		// scriptタグのtype属性をチェック
		switch(scriptElement.type){

			// 頂点シェーダの場合
			case 'x-shader/x-vertex':
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;

			// フラグメントシェーダの場合
			case 'x-shader/x-fragment':
				shader = gl.createShader(gl.FRAGMENT_SHADER);
				break;
			default :
				return;
		}

		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource(shader, scriptElement.text);

		// シェーダをコンパイルする
		gl.compileShader(shader);

		// シェーダが正しくコンパイルされたかチェック
		if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){

			// 成功していたらシェーダを返して終了
			return shader;
		}else{

			// 失敗していたらエラーログをアラートする
			alert(gl.getShaderInfoLog(shader));
		}
	}

	// プログラムオブジェクトを生成しシェーダをリンクする関数
	var create_program = function(vs, fs){
		// プログラムオブジェクトの生成
		var program = gl.createProgram();

		// プログラムオブジェクトにシェーダを割り当てる
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);

		// シェーダをリンク
		gl.linkProgram(program);

		// シェーダのリンクが正しく行なわれたかチェック
		if(gl.getProgramParameter(program, gl.LINK_STATUS)){

			// 成功していたらプログラムオブジェクトを有効にする
			gl.useProgram(program);

			// プログラムオブジェクトを返して終了
			return program;
		}else{

			// 失敗していたらエラーログをアラートする
			alert(gl.getProgramInfoLog(program));
		}
	}

	return p._self;

})();