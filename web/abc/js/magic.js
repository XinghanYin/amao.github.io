$(function() {
	if(!window.navigator.userAgent.match(/(Android|android)/))
	{
		$('.mobNav li a').mouseenter(function(){
			$(this).addClass('hover');
		});
		$('.mobNav li a').mouseout(function(){
			$(this).removeClass('hover');
		});
	}
	var doc = $(document),
		bodyElem = $('body'),
		backgroundElem = $("#background"),
		entry = $('.entry'),
		activeElem,
		background,
		backgroundImageCount = bodyElem.data('background-image-count');

	// Preload Background Images
	entry.each(function() {
	
		var backgroundPrefix = $(this).data('background-prefix');
		if (!backgroundPrefix)
		{
			return;
		}

		for (var i = 1; i <= backgroundImageCount; i++)
		{
			$('<img/>')[0].src = "slides/" + backgroundPrefix + i + ".jpg";
		}
	});

	$(window).scroll(function(e) {
		$('#nav').css('max-height', '101%');
		setTimeout(function(){$('#nav').css('max-height', '100%');},1);
		
		entry.each(function() {

			var scrollTop = $(this).position().top - doc.scrollTop();
			if (scrollTop < 0)
			{
				activeElem = $(this);
			}

		});

		var backgroundPrefix = activeElem.data('background-prefix');
		if (!backgroundPrefix)
		{
			return;
		}

		var scrollTop = doc.scrollTop() - activeElem.position().top;
		var backgroundSectionHeight = entry.outerHeight() / backgroundImageCount;
		
		var backgroundNumber = Math.min(backgroundImageCount, Math.floor(scrollTop / backgroundSectionHeight) + 1);
		var background = "slides/" + activeElem.data('background-prefix') + backgroundNumber + ".jpg";

		if (background != backgroundElem.attr('src'))
		{
			backgroundElem.attr('src', background);
		}
	});
	
	// Ease scrolling between anchors
	
	$('a').click(function(){
		$el = $(this);
		$el.addClass('hover');
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 1500, function(){$el.removeClass('hover')});
	    return false;
	});

	$(window).resize(calculateFills);

	calculateFills();

});

function calculateFills()
{

	$('#background').each(function() {

		var me = $(this),
			width = 16,
			height = 9,
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			newWidth = windowWidth,
			newHeight = windowHeight,
			aspectRatio = height / width;

		newHeight = newWidth * aspectRatio;

		if (newHeight < windowHeight)
		{
			newHeight = windowHeight;
			aspectRatio = width / height;
			newWidth = newHeight * aspectRatio;
		}

		me.css({

			'width': newWidth,
			'height': newHeight,
			'margin-left':0,
			'margin-top':0

		});

	});

}