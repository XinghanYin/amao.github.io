$(document).ready(function() {
	(function(p) {
		(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(p) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(p.substr(0, 4))
	})(navigator.userAgent || navigator.vendor || window.opera);
	var c = $(window);
	var o = c.width();
	var h = c.height();
	var a = $("#header");
	var k = $("#home-image");
	var g = $("#work-image");
	var m = $("#about-image");
	var j = $("#content-slider-1");
	var d = h - $(".header-container").height();
	k.css({
		height: (d + 100) + "px"
	});
	if (!jQuery.browser.mobile) {
		$("#home-section").css({
			height: d + "px"
		});
		$("#services-section").css({
			height: h + "px"
		});
		$("#work-section").css({
			"min-height": (h / 2) + "px"
		});
		$("#about-section").css({
			height: h + "px"
		});
		$("#hello-section").css({
			"min-height": ((h / 2) - 60) + "px"
		});
		$(".row-map").css({
			height: (h - 380) + "px"
		});
		$(".zoom").css({
			top: (((h - 380) / 2) - 40) + "px"
		});
		$(".row-map-canvas").css({
			height: (h - 355) + "px"
		});
		var n = $("section");
		var f = $(".nav-link");
		n.waypoint({
			handler: function(r) {
				var q;
				q = $(this);
				if (r === "up") {
					q = q.prevAll("section").first()
				}
				var p = $('.nav-link[href="#' + q.attr("id") + '"]');
				f.removeClass("selected");
				p.addClass("selected")
			},
			offset: "15%"
		})
	}
	if (jQuery.browser.mobile) {
		$(".parallax-scy-home").css({
			background: "transparent url('./images/Jpegs/Home/home.jpg') 50% 78% no-repeat"
		});
		$(".parallax-scy-home").css({
			"background-size": "100%"
		});
		k.css({
			height: (d) + "px"
		});
		$("#home-section").css({
			height: d + "px"
		});
		$("#work-section").css({
			"min-height": h / 2 + "px"
		});
		$("#hello-section").css({
			"min-height": (h - 60) + "px"
		});
		$(".parallax-scy").css({
			"min-height": "300px"
		});
		$(".parallax-scy-break-2").css({
			background: "transparent url('../images/Jpegs/Home/breakbottom_1280.jpg') 50% 163% no-repeat !important"
		});
		$(".parallax-scy-break-1").css({
			"background-size": "100%"
		})
	}
	var l = $("#work-section").children();
	var b = 0;
	l.each(function() {
		b = b + $(this).height()
	});
	b = (h - b) / 2;
	if (b > 50) {
		j.animate({
			marginTop: b + "px"
		}, 500)
	}
	var e = a.offset().top;
	$(window).scroll(function() {
		var p = $(window).scrollTop();
		if (e > p) {
			a.removeClass("fixed-top")
		} else {
			a.addClass("fixed-top")
		}
	});
	$(".nav-link").click(function() {
		var p = $(this).attr("href");
		var q = $(p).offset().top;
		jQuery("html,body").animate({
			scrollTop: q
		}, 1000, "easeInOutQuint");
		return false
	});
	$(".royalSlider").royalSlider({
		arrowsNav: true,
		loopRewind: true,
		keyboardNavEnabled: true,
		controlsInside: true,
		arrowsNavAutoHide: false,
		arrowsNavHideOnTouch: true,
		autoScaleSlider: true,
		numImagesToPreload: 1,
		controlNavigation: "none",
		navigateByClick: true,
		transitionType: "move",
		globalCaption: false,
		slidesSpacing: 4,
		imageScalePadding: 0,
		imgWidth: 1840,
		imgHeight: 900
	});
	if (!Modernizr.svg) {
		var i = $("img[data-png-fallback]");
		i.each(function(q) {
			var p = $("<img />");
			p.attr("src", $(this).data("png-fallback"));
			$(this).replaceWith(p)
		})
	}
	//$(window).resize(initialize);
	$(".various").fancybox({
		maxWidth: 800,
		maxHeight: 600,
		fitToView: false,
		width: "70%",
		height: "70%",
		autoSize: false,
		closeClick: false,
		openEffect: "none",
		closeEffect: "none"
	})
});
$(window).load(function() {
	var b = [];
	var a = 0;
	$(".personal-image").each(function() {
		var c = $(this).find(".related-images").find("img");
		b[a] = [];
		b[a][0] = 0;
		b[a][1] = c.length;
		b[a][2] = c;
		a++
	});
	$("div.personal-image").bind({
		mouseenter: $.debounce(200, true, function() {
			var g = $(this);
			var e = $("div.personal-image").index(g);
			var h = b[e][1];
			var d = b[e][2];
			var f = b[e][0];
			g.find(".main-image").addClass("no-show");
			g.find(".related-images").removeClass("no-show");
			var c = d.eq(f);
			c.removeClass("no-show");
			b[e][0] = f + 1;
			if (b[e][0] == h) {
				b[e][0] = 0
			}
		}),
		mouseleave: function() {
			var e = $(this);
			var d = $("div.personal-image").index(e);
			var c = b[d][2];
			c.each(function() {
				if (!$(this).hasClass("no-show")) {
					$(this).addClass("no-show")
				}
			});
			e.find(".related-images").addClass("no-show");
			e.find(".main-image").removeClass("no-show")
		}
	})
});