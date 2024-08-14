var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var container;
var particle;
var camera;
var scene;
var renderer;
var starSnow = 1;
var particles = [];
var particleImage = new Image();
particleImage.src = 'hj.png';

function init() {
	container = document.createElement('div');
	document.body.appendChild(container);
	camera = new THREE.PerspectiveCamera(60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
	camera.position.z = 1000;
	scene = new THREE.Scene();
	scene.add(camera);
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	var material = new THREE.ParticleBasicMaterial({
		map: new THREE.Texture(particleImage)
	});
	for (var i = 0; i < 500; i++) {
		particle = new Particle3D(material);
		particle.position.x = Math.random() * 2000 - 1000;
		particle.position.z = Math.random() * 2000 - 1000;
		particle.position.y = Math.random() * 2000 - 1000;
		particle.scale.x = particle.scale.y = 1;
		scene.add(particle);
		particles.push(particle);
	}
	container.appendChild(renderer.domElement);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	document.addEventListener('touchend', onDocumentTouchEnd, false);
	setInterval(loop, 1000 / 30);
}
var touchStartX;
var touchFlag = 0;
var touchSensitive = 80;

function onDocumentTouchStart(event) {
	if (event.touches.length == 1) {
		touchStartX = 0;
		touchStartX = event.touches[0].pageX;
	}
}

function onDocumentTouchMove(event) {
	if (event.touches.length == 1) {
		var direction = event.touches[0].pageX - touchStartX;
		if (Math.abs(direction) > touchSensitive) {
			if (direction > 0) {
				touchFlag = 1;
			} else if (direction < 0) {
				touchFlag = -1;
			};
		}
	}
}

function onDocumentTouchEnd(event) {
	var direction = event.changedTouches[0].pageX - touchStartX;
	changeAndBack(touchFlag);
}

function changeAndBack(touchFlag) {
	var speedX = 25 * touchFlag;
	touchFlag = 0;
	for (var i = 0; i < particles.length; i++) {
		particles[i].velocity = new THREE.Vector3(speedX, -10, 0);
	}
	var timeOut = setTimeout(";", 800);
	clearTimeout(timeOut);
	var clearI = setInterval(function() {
		if (touchFlag) {
			clearInterval(clearI);
			return;
		};
		speedX *= 0.8;
		if (Math.abs(speedX) <= 1.5) {
			speedX = 0;
			clearInterval(clearI);
		};
		for (var i = 0; i < particles.length; i++) {
			particles[i].velocity = new THREE.Vector3(speedX, -10, 0);
		}
	}, 100);
}

function loop() {
	for (var i = 0; i < particles.length; i++) {
		var particle = particles[i];
		particle.updatePhysics();
		with(particle.position) {
			if ((y < -1000) && starSnow) {
				y += 2000;
			}
			if (x > 1000) x -= 2000;
			else if (x < -1000) x += 2000;
			if (z > 1000) z -= 2000;
			else if (z < -1000) z += 2000;
		}
	}
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}