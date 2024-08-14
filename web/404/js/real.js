var random = Math.floor(Math.random() * 4);
if (random == 0) document.write('<script src="js/canvas-yigo.js"><\/script>');
else if (random == 1) document.write('<script src="js/canvas-matrix.min.js"><\/script>');
else if (random == 2) document.write('<script src="js/canvas-hexagon.js"><\/script>');
else {
	document.write('<script src="js/fss.min.js"><\/script>');
	document.write('<script src="js/fss-init.js"><\/script>');
}
var target = document.getElementById("title"),
	origin = 0,
	title = [["修合无人见，存心有天知"],
		["阿毛最帅！"],
		["英特纳雄耐尔", "就一定要实现"],
		["敢同恶鬼争高下", "不向霸王让寸分"],
		["苟利国家生死以", "岂因祸福避趋之"],
		["力量本身并不可怕", "可怕的是它的主人"],
		["Ruaaaaaaaaa!"],
		["就很无敌"]];
function changeTitle() {
	target.style.cssText = "animation: fade-out 0.8s ease-in forwards;";
	var index;
	do {
		index = Math.floor(Math.random() * title.length);
	}
	while (index == origin);
	setTimeout(function() {
		target.style.cssText += "animation: fade-in 0.8s ease-in forwards;";
		target.innerHTML = `<span class="glitch" data-text="${title[index][0]}">${title[index][0]}</span>`;
		if (title[index].length > 1) {
			for (var i = 1; i < title[index].length; i++) {
				target.innerHTML += `<br>\
					<span class="glitch" data-text="${title[index][i]}">${title[index][i]}</span>`;
			}
		}
		setMargin();
	}, 800);
	origin = index;
}
setInterval(changeTitle, 8000);
function setMargin() {
	var H = window.innerHeight,
		h = document.getElementById("welcome").offsetHeight;
	document.getElementById("welcome").style.cssText = `bottom: ${100 * (H - h) / (2 * H)}%;`;
}
setMargin();