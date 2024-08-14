if (!window.hasOwnProperty("ontouchstart")) sr = ScrollReveal({
	reset: true,
	origin: "right"
});
else sr = {
	reveal: function() {
		return false;
	}
}
sr.reveal(".navbar", {
	duration: 2000,
	origin: "top"
});
sr.reveal("#main img", {
	duration: 1500,
	delay: 1500,
	origin: "top"
});
sr.reveal("#main i", {
	duration: 1000,
	delay: 2500,
	origin: "top"
});
sr.reveal(".showcase-left", {
	duration: 2000,
	origin: "left",
	distance: "300px"
});
sr.reveal(".showcase-right", {
	duration: 2000,
	origin: "right",
	distance: "300px"
});
sr.reveal(".showcase-btn", {
	duration: 2000,
	delay: 2000,
	origin: "bottom"
});
sr.reveal("#testimonial div", {
	duration: 2000,
	origin: "bottom"
});
sr.reveal("#testimonial div", {
	duration: 2000,
	origin: "bottom"
});
sr.reveal("#info1 .info-left", {
	duration: 2000,
	origin: "left",
	distance: "300px",
	viewFactor: 0.2
});
sr.reveal("#info1 .info-right", {
	duration: 2000,
	origin: "right",
	distance: "300px",
	viewFactor: 0.2
});
sr.reveal("#info2 .info-left", {
	duration: 2000,
	origin: "bottom",
	distance: "300px",
	viewFactor: 0.2
});
sr.reveal("#info2 .info-right", {
	duration: 2000,
	origin: "bottom",
	distance: "300px",
	viewFactor: 0.2
});
$(function() {
	// Smooth Scrolling from jQuery
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
			if (target.length) {
				$("html, body").animate({
					scrollTop: target.offset().top - 50
				}, 1000);
				return false;
			}
		}
	});
});
$("#year").html(new Date().getFullYear());