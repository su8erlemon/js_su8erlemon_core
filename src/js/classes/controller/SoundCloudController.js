/**
 * ...
 * @author keita
 * 
 * 
 */

this.GNS.SoundCloudController = (function()	{

	var p = GNS.ClassFactory.create( GNS.ElementObject );
	var s = p._static;

	var CLIENT_ID = '1a2814361cbcccc8033ad0ab9ec86c06';

	var _audio;
	var _bytes;
	var _analyser;
	var _points = {};

	var calculate_a_weighting = function(freq){
    	
	    var f2 = freq * freq;
	    var f4 = f2 * f2;
	    var w = 10 * Math.log10(1.562339 * f4 / ((f2 + 11589.09305) * (f2 + 544440.6705)));
	    w += 10 * Math.log10(2.242881 * Math.pow(10,16) * f4 / (Math.pow(f2 + 424.3186774, 2) * Math.pow(f2 + 148699001.4, 2)));
	    return w; 
	}

	s.init = function( url, initComplate ){

		var script = document.createElement( 'script' );

		script.type = 'text/javascript';
		script.src = "//connect.soundcloud.com/sdk.js";

		var firstScript = document.getElementsByTagName( 'script' )[ 0 ];
		firstScript.parentNode.insertBefore( script, firstScript );
		
		script.onload = scriptLoadComp;
			
		function scriptLoadComp(){

			console.log("SoundCloudController::scriptLoadComp");
			
			document.body.innerHTML += '<canvas id="canvas"></canvas>';

			SC.initialize({
		  		client_id: CLIENT_ID
			});

			// get the sound info
			SC.get('/resolve', {url: url}, function(sound){

				if(sound.errors)return;

				// succeed in getting the sound info
				console.log(sound);

				// set the stream url to the audio element		 
				_audio = document.createElement('audio');
				_audio.crossOrigin = "anonymous";
				_audio.src = sound.stream_url + '?client_id=' + CLIENT_ID;
				_audio.play();

				// create and setup an analyser
				var audioCtx = new (window.AudioContext || window.webkitAudioContext);
				_analyser = audioCtx.createAnalyser();
				_analyser.fftSize = 2048;
				var source = audioCtx.createMediaElementSource(_audio);
				source.connect(_analyser);
				_analyser.connect(audioCtx.destination);

				_bytes = new Uint8Array(_analyser.frequencyBinCount);


				initComplate();

			});

		}
	}

	s.debugShow = function(){

		var canvasElement = document.getElementById('canvas');
		var ctx = canvasElement.getContext("2d");

		var $p = new Processing( canvasElement );
		var CANVAS_WIDTH = 1024;
		var CANVAS_HEIGHT = 300;

		$p.setup = function(){
			$p.frameRate(32);
			$p.noLoop();
			$p.background(0); // prevet white flash at the start of rendering
			$p.size(CANVAS_WIDTH, 500);
		};

		var UNIT_COUNT = _analyser.frequencyBinCount;
		var UNIT_HEIGHT = Math.round(CANVAS_HEIGHT / 512); // round to align bars
		var UNIT_WIDTH = Math.round(CANVAS_WIDTH / UNIT_COUNT); // round to align bars

		var height = 0;
		$p.draw = function(){

			_analyser.getByteFrequencyData(_bytes);
			$p.background(0);
			$p.stroke(255);
			$p.fill(255);

			for(var i = 0; i < UNIT_COUNT*0.1; i++){
				height = _bytes[i] + Math.abs( _bytes[i]/calculate_a_weighting(44100/2048*i) );
				//height = bytes[i]/calculate_a_weighting(44100/2048*i);
				// height *= UNIT_HEIGHT * 0.1;
				height -= 160;
				$p.rect(
					(i * UNIT_WIDTH) * 10,
					500,
					(UNIT_WIDTH - 2) * 10,
					height * -1 
				);


				if( pos ){
					ctx.fillStyle = "red";
					ctx.font = 'italic 400 24px Unknown Font, sans-serif';
			    	ctx.fillText( parseInt( pos.x*0.1 ), parseInt( pos.x*0.1 ) * 10, pos.y - 30);	
			    	ctx.fillStyle = "white";
				}
			    
			}
		};

		// start rendering
		$p.setup();
		$p.loop();

		var pos;
		canvasElement.onmousemove = function( e ){
			pos = getMousePos(canvasElement, e);
		}

		function  getMousePos(canvas, evt) {
		  var rect = canvas.getBoundingClientRect(), // abs. size of element
		      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
		      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

		  return {
		    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
		  }
		}

	}

	s.play = function(){
		_audio.play();
	}

	s.pause = function(){
		_audio.pause();	
	}

	s.stop = function(){
		_audio.pause();
		_audio.currentTime = 0;	
	}

	s.update = function(){
		_analyser.getByteFrequencyData(_bytes);
		
		var UNIT_COUNT = _analyser.frequencyBinCount;
		var gain;

		for (var key in _points) {
			_points[key].gain = 0;
		}

		for(var i = 0; i < UNIT_COUNT*0.1; i++){
			gain = _bytes[i] + Math.abs( _bytes[i]/calculate_a_weighting(44100/2048*i) );
			for (var key in _points) {
				if( i == _points[key].freq -1 )_points[key].gain += gain/3;
				if( i == _points[key].freq +0 )_points[key].gain += gain/3;
				if( i == _points[key].freq +1 )_points[key].gain += gain/3;
			}
		}
	}

	s.getBytes = function(){
		return _bytes;
	}

	s.setPoint = function( label, freq ){

		_points[label] = {freq:freq, gain:0 };

	}

	s.removePoint = function( label ){

		delete _points[label];

	}

	s.getGain = function( label ){

		return _points[label].gain
	}







	return p._self;

})();