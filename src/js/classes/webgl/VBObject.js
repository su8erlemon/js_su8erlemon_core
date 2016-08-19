this.GNS.VBObject = (function () {

	var p = GNS.ClassFactory.create();
	var s = p._static;

	/*
	* init
	*/
	p.init = function( programObject )
	{

		var _this = this;
		var _positionBuffer = gl.createBuffer();
		var _colorBuffer = gl.createBuffer();
		var _normalBuffer = gl.createBuffer();
		var _textureCoordBuffer = gl.createBuffer();

		var _indexBuffer = gl.createBuffer();

		var _indexLength;
		var _positionLength;


		var _hasPositionBuffer;
		var _hasColorBuffer;
		var _hasNormalBuffer;
		var _hasTextureCoordBuffer;
		var _hasIndexBuffer = false;

		this.setPosition = function( position ){
			_hasPositionBuffer = true;
			_positionLength = position.length;
			updateVBO( _positionBuffer, position );
		}

		this.setColor = function( color ){
			_hasColorBuffer = true;
			updateVBO( _colorBuffer, color );
		}

		this.setNormal = function( normal ){
			_hasNormalBuffer = true;
			updateVBO( _normalBuffer, normal );
		}

		this.setTextureCoord = function( textureCoord ){
			_hasTextureCoordBuffer = true;
			updateVBO( _textureCoordBuffer, textureCoord );
		}

		this.setIndex = function( index ){
			_hasIndexBuffer = true;
			_indexLength = index.length;
			updateIBO( _indexBuffer, index );
		}

		this.getAttLocationList = function(){

			var returnArr = [];
			if( _hasPositionBuffer )returnArr.push(gl.getAttribLocation(programObject, 'position'));
			if( _hasColorBuffer )returnArr.push(gl.getAttribLocation(programObject, 'color'));
			if( _hasNormalBuffer )returnArr.push(gl.getAttribLocation(programObject, 'normal'));
			if( _hasTextureCoordBuffer )returnArr.push(gl.getAttribLocation(programObject, 'textureCoord'));

			return returnArr;

		}

		this.getIndexLength = function(){
			return _indexLength;
		}

		this.getAttrStrideList = function(){

			var returnArr = [];
			if( _hasPositionBuffer )returnArr.push(3);
			if( _hasColorBuffer )returnArr.push(4);
			if( _hasNormalBuffer )returnArr.push(3);
			if( _hasTextureCoordBuffer )returnArr.push(2);

			return returnArr;

		}

		var bind = function(){

			var vbo = [];
			if( _hasPositionBuffer )vbo.push( _positionBuffer );
			if( _hasColorBuffer )vbo.push( _colorBuffer );
			if( _hasNormalBuffer )vbo.push( _normalBuffer );
			if( _hasTextureCoordBuffer )vbo.push( _textureCoordBuffer );

			var attL = _this.getAttLocationList();
			// console.log(attL)
			var attS = _this.getAttrStrideList();

			// 引数として受け取った配列を処理する
			for(var i in vbo){
				// バッファをバインドする
				gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);

				// attributeLocationを有効にする
				gl.enableVertexAttribArray(attL[i]);

				// attributeLocationを通知し登録する
				gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
			}

			if( _hasIndexBuffer ){
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _indexBuffer);
			}

		}

		var updateVBO = function( vbo, data ){

			// バッファをバインドする
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

			// バッファにデータをセット
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);

			// バッファのバインドを無効化
			gl.bindBuffer(gl.ARRAY_BUFFER, null);

		}

		// IBOを生成する関数
		var updateIBO = function( ibo, data ){

			// バッファをバインドする
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

			// バッファにデータをセット
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.DYNAMIC_DRAW);

			// バッファのバインドを無効化
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		}

		this.draw = function( type ){
			bind();
			gl.drawElements( type, _this.getIndexLength(), gl.UNSIGNED_SHORT, 0);
		}

		this.drawArrays = function( type ){
			bind();
			gl.drawArrays( type, 0, parseInt(_positionLength/3));
		}

	}

	return p._self;

})();