$(document).ready(function(){
	
	if (window.navigator.standalone) {
	
		// for home screen app
		
		$('body').addClass('standalone')
		
		$("a").click(function (event) {
		  event.preventDefault();
		  window.location = $(this).attr("href");
		});
		
		function NoClickDelay(el) {
			this.element = el;
			if( window.Touch ) this.element.addEventListener('touchstart', this, false);
		}
		
		NoClickDelay.prototype = {
			handleEvent: function(e) {
				switch(e.type) {
					case 'touchstart': this.onTouchStart(e); break;
					case 'touchmove': this.onTouchMove(e); break;
					case 'touchend': this.onTouchEnd(e); break;
				}
			},
		
			onTouchStart: function(e) {
				e.preventDefault();
				this.moved = false;
		
				this.element.addEventListener('touchmove', this, false);
				this.element.addEventListener('touchend', this, false);
			},
		
			onTouchMove: function(e) {
				this.moved = true;
			},
		
			onTouchEnd: function(e) {
				this.element.removeEventListener('touchmove', this, false);
				this.element.removeEventListener('touchend', this, false);
		
				if( !this.moved ) {
					// Place your code here or use the click simulation below
					var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
					if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
		
					var theEvent = document.createEvent('MouseEvents');
					theEvent.initEvent('click', true, true);
					theTarget.dispatchEvent(theEvent);
				}
			}
		};
	
	} 
	else if (isMobileSafari()) {
		// for mobile safari
		$('.install').click(function(){
			$(this).removeClass('show');
			if(typeof(Storage)!=="undefined")
				localStorage.hide_install = true;
		});
		if(typeof(Storage)!=="undefined" && !localStorage.hide_install)
			$('.install').addClass('show');
	}
});

function isMobileSafari() {
    return window.navigator.userAgent.match(/(iPod|iPhone|iPad)/) && window.navigator.userAgent.match(/AppleWebKit/)
}