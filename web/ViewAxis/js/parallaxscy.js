$(window).load(function(){var k=true;var s=true;var q=navigator.userAgent;var l=window.location.toString();var t=q.match(/webkit/i);var j=q.match(/gecko/i);var v=q.match(/msie (9|([1-9][0-9]))/i);var m=q.match(/msie/i)&&!v;var o=q.match(/msie 6/i);var w=q.match(/mobile/i);var a=!Modernizr.csstransforms3d;var b=null;var r,i;var g=[];var c=null;var p;var e=new Date();if(jQuery.browser.mobile){s=false}r={webkit:"webkitTransform",firefox:"MozTransform",ie:"msTransform",w3c:"transform"};if(k){if(t){i=r.webkit}else{if(j){i=r.firefox}else{if(v){i=r.ie}}}}function f(z){var x,E,A,B,G,D,F;x=$(z);E=x.find(".parallax-scy");function y(){A=x.offset().top;G=x.outerHeight();bgHeights=[];D=[];E.each(function(H){F=$(this).outerHeight();bgHeights.push(F);D.push(G-F+2)})}function C(L){var J,I,H,K;J=0;E.each(function(){var N=$(this);H=-Math.round(((L-A)/G)*D[J]);H=Math.max(H,D[J]);var M;if(!a){M="translate3d(0px,"+H+"px, 0px)"}else{M="translateY("+H+"px)"}if(i&&M){N.css(i,M);N.css(r.w3c,M)}else{N.css("marginTop",H+"px")}J++})}y();return{refresh:C,refreshCoords:y}}function d(){var z=$(window).scrollTop();if(!g||!g.length){return false}for(var y=0,x=g.length;y<x;y++){g[y].refresh(z)}}function n(){if(b){b(d)}else{d()}}function u(x){g.push(new f(x));if(!c){c=$(window).on("scroll",n)}}function h(){for(var y=0,x=g.length;y<x;y++){g[y].refreshCoords()}}if(s){$nodes=$(".scyscroller");$nodes.each(function(){u($(this))});$(window).resize(h);$(this).on("PhotoListView:render",function(){var y=new Date();if(y-e>250){for(var z=0,x=g.length;z<x;z++){g[z].refreshCoords()}e=y}});d()}});