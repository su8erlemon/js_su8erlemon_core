this.GNS.SVGModel = (function () {

	var p = GNS.ClassFactory.create( GNS.ElementObject );
	var s = p._static;

	var LIST = ["M","m","H","h","L","l","V","v","C","c","S","s","z"]
	/*
	* init
	*/
	p.init = function( svgPathElement )
	{

		//p.logger( "SVGModel::init" );

		var d = svgPathElement.getAttributeNode("d");
		this.element = svgPathElement;
		var dStr = d.value;
		var dlist = [];
		this.dlist = dlist;

		for( var i = 0 ; i < LIST.length ; i++ ){
			var regexp = new RegExp(LIST[i], 'g');
			dStr = dStr.replace(regexp,"__" + LIST[i]);
			dStr = dStr.replace(/\n/g,"");
			dStr = dStr.replace(/\s/g,"");
		}

		var arr = dStr.split("__");
		var obj = [];
		for( var i = 0 ; i < arr.length ; i++ ){
			if( arr[i] == "" ){
				arr.splice(i,1);
			}
		}

		for( var i = 0 ; i < arr.length ; i++ ){

			for( var i2 = 0 ; i2 < LIST.length ; i2++ ){
				var regexp = new RegExp(LIST[i2], 'g');
				var ma = arr[i].match(regexp);
				if( ma ){
					var ddata = {};
					arr[i] = arr[i].replace(/-/g,",-");
					ddata.originData = arr[i].replace(regexp,"").split(",");
					ddata.data = arr[i].replace(regexp,"").split(",");
					for( var i3 = 0 ; i3 < ddata.originData.length ; i3++ ){
						if( ddata.originData[i3] == "" ){
							ddata.originData.splice(i3,1);
							ddata.data.splice(i3,1);
						}
					}
					ddata.type = ma;
					dlist.push( ddata );
				}
			}
		}

		this.update = function(){
			var str1 = "";
			for( var i1 = 0 ; i1 < dlist.length ; i1++ ){
				str1 += dlist[i1].type
				for( var i2 = 0 ; i2 < dlist[i1].data.length ; i2++ ){
					if( i2 != 0)str1 += ",";
					str1 += dlist[i1].data[i2];
				}
			}
			str1 = str1.replace(/,-/g,"-");
			d.value = str1;
			//svgPathElement.setAttributeNode(s)
		}




	}

	return p._self;

})();