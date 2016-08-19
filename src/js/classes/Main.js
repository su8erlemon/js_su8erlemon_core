 this.GNS.Main = (function () {
 	
	var p = GNS.ClassFactory.create();
	s = p._static;

	s.initWindow = function()
	{
		
		p.logger("Main::initWindow");

		
		//=======================================		
		// resize
		//=======================================
		GNS.ResizeController.init();
		GNS.ResizeController.addFunction( resizeHandler );
		//GNS.ResizeController.removeFunction( resizeHandler );
		function resizeHandler(){
			console.log( "resize event ");
		}


		//=======================================		
		// scene management
		//=======================================
		GNS.SceneController.init();
		GNS.SceneController.gotoScene( GNS.SceneController.TOP_SCENE )



		//=======================================		
		// class sample
		//=======================================
		var sampleClass = new GNS.SampleClass();
		sampleClass.publicMethod();

		GNS.SampleClass.staticMethod();

	}


	/*
	* init
	*/
	s.init = function(){

		p.logger("Main::init");

		GNS.Window.getInstance().addEvent( GNS.Event.UNLOAD , function(){} );
		GNS.Window.getInstance().addEvent( GNS.Event.LOAD , p._static.initWindow );

	}

	s.init();
	return p._self;

})();