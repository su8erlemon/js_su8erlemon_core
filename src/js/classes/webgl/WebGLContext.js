this.GNS.WebGLContext = (function () {

	var p = GNS.ClassFactory.create();
	var s = p._static;

	s.element;
	s.context;
	s.WIDTH;
	s.HEIGHT;
	/*
	* init
	*/
	s.init = function( canvasId, width, height )
	{

		// canvasエレメントを取得
		s.element = document.getElementById(canvasId);
		s.element.width = s.WIDTH = width;
		s.element.height = s.HEIGHT = height;

		// webglコンテキストを取得
		// grobalに
		gl = s.element.getContext('webgl') || s.element.getContext('experimental-webgl');

	}

	s.resize = function( width, height ){

		if( s.element ){
			s.element.width = s.WIDTH = width;
			s.element.height = s.HEIGHT = height;	
			gl.viewport( 0, 0, s.WIDTH, s.HEIGHT );
		}
		
	}

	return p._self;

})();