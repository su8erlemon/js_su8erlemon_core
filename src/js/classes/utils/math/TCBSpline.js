/*
     TCBSpline.js
*/

this.GNS.TCBSpline = (function () {

     var p = GNS.ClassFactory.create( GNS.EventDispatcher );
     s = p._static;

     p.init = function(){

          var div;
          var points = [];
	
     	this.addPoint = function( x , y , t , c , b ){

     		var pointModel = {
     			x:x,
     			y:y,
     			t:t,
     			c:c,
     			b:b,
     		}
     		points.push( pointModel );

     	}

          this.getSpline = function(t){

               //tからどのポイントポイント間か割り出す
               if( t > 1.0 )t = 1.0;
               if( t < 0.0 )t = 0.0;
               var tp = (points.length-1) * (t/1.0)

               var pid1 = Math.floor(tp);
               var pid2 = Math.ceil(tp);


               var p0 = (pid1==0)?{ x:points[pid1].x, y:points[pid1].y }:{ x:points[pid1-1].x, y:points[pid1-1].y };
               var p1 = { x:points[pid1].x , y:points[pid1].y };
               var p2 = { x:points[pid2].x , y:points[pid2].y };
               var p3 = (pid2==(points.length-1))?{ x:points[pid2].x, y:points[pid2].y }:{ x:points[pid2+1].x, y:points[pid2+1].y };

               var tangentP0 = getTangentP0( p0, p1, p2, points[pid1].t, points[pid1].c, points[pid1].b );
               var tangentP1 = getTangentP1( p1, p2, p3, points[pid2].t, points[pid2].c, points[pid2].b );

               var returnP = getHermiteSpline( p1, p2, tangentP0, tangentP1, tp - pid1 );

               return { x:returnP.x, y:returnP.y };

          }

          this.getSplineAB = function( pid1 , pid2 , t ){

               var p0 = (pid1==0)?{ x:points[pid1].x, y:points[pid1].y }:{ x:points[pid1-1].x, y:points[pid1-1].y };
               var p1 = { x:points[pid1].x , y:points[pid1].y };
               var p2 = { x:points[pid2].x , y:points[pid2].y };
               var p3 = (pid2==(points.length-1))?{ x:points[pid2].x, y:points[pid2].y }:{ x:points[pid2+1].x, y:points[pid2+1].y };

               var tangentP0 = getTangentP0( p0, p1, p2, points[pid1].t, points[pid1].c, points[pid1].b );
               var tangentP1 = getTangentP1( p1, p2, p3, points[pid2].t, points[pid2].c, points[pid2].b );

               if( t > 1.0 )t = 1.0;
               if( t < 0.0 )t = 0.0;

               var returnP = getHermiteSpline( p1, p2, tangentP0, tangentP1, t );

               return { x:returnP.x, y:returnP.y };
               
          }

     	this.getLength = function(){
			return points.length;     		
     	}

          this.setPointX = function( id , x ){
               if( id > points.length )return;
               points[id].x = x;
          }

          this.setPointY = function( id , y ){
               if( id > points.length )return;
               points[id].y = y;
          }

          this.setPointXY = function( id , x , y ){
               if( id > points.length )return;
               points[id].x = x;
               points[id].y = y;
          }

     	this.setPointT = function( id , t ){
     		if( id > points.length )return;
     		points[id].t = t;
     	}

     	this.setPointC = function( id , c ){
     		if( id > points.length )return;
     		points[id].c = c;
     	}

     	this.setPointB = function( id , b ){
     		if( id > points.length )return;
     		points[id].b = b;
     	}

     	this.setPointTCB = function( id , t , c , b ){
     		if( id > points.length )return;
     		points[id].t = t;
     		points[id].c = c;
     		points[id].b = b;
     	}




          //calculation
          var getHermiteSpline = function( p1 , p2 , m1, m2, t ){
              
              var e1x = ((2*t*t*t) - (3*t*t) + 1) * p1.x;
              var e2x = ((t*t*t) - (2*t*t) + t) * m1.x;
              var e3x = ((-2*t*t*t) + (3*t*t)) * p2.x;
              var e4x = ((t*t*t) - (t*t)) * m2.x;

              var e1y = ((2*t*t*t) - (3*t*t) + 1) * p1.y;
              var e2y = ((t*t*t) - (2*t*t) + t) * m1.y;
              var e3y = ((-2*t*t*t) + (3*t*t)) * p2.y;
              var e4y = ((t*t*t) - (t*t)) * m2.y;
              
              return { x:e1x + e2x + e3x + e4x , y:e1y + e2y + e3y + e4y };
              
          }

          var getTangentP0 = function( p0 , p1, p2 , t , c , b ){
              
              var e1x = (((1-t) * (1+b) * (1+c))/2) * ( p1.x - p0.x );
              var e2x = (((1-t) * (1-b) * (1-c))/2) * ( p2.x - p1.x );

              var e1y = (((1-t) * (1+b) * (1+c))/2) * ( p1.y - p0.y );
              var e2y = (((1-t) * (1-b) * (1-c))/2) * ( p2.y - p1.y );

              return { x:e1x + e2x , y:e1y + e2y };
          }

          var getTangentP1 = function( p0 , p1,  p2 , t , c , b ){
              
              var e1x = (((1-t) * (1+b) * (1-c))/2) * ( p1.x - p0.x );
              var e2x = (((1-t) * (1-b) * (1+c))/2) * ( p2.x - p1.x );

              var e1y = (((1-t) * (1+b) * (1-c))/2) * ( p1.y - p0.y );
              var e2y = (((1-t) * (1-b) * (1+c))/2) * ( p2.y - p1.y );
              
              return { x:e1x + e2x , y:e1y + e2y };
          }


     }


     return p._self;

})();