//https://github.com/wagerfield/flat-surface-shader
(function() {
	//------------------------------
	// Mesh Properties
	//------------------------------
	var MESH = {
		width: 1.2,
		height: 1.2,
		depth: 10,
		segments: 16,
		slices: 8,
		xRange: 0.8,
		yRange: 0.1,
		zRange: 1.0,
		ambient: '#555555',
		diffuse: '#FFFFFF',
		speed: 0.002
	};

	//------------------------------
	// Light Properties
	//------------------------------
	var LIGHT = {
		count: 2,
		xyScalar: 1,
		zOffset: 100,
		speed: 0.001,
		gravity: 1200,
		dampening: 0.95,
		minLimit: 10,
		maxLimit: null,
		minDistance: 20,
		maxDistance: 400,
		autopilot: true,
		draw: true,
		bounds: FSS.Vector3.create(),
		step: FSS.Vector3.create(
		Math.randomInRange(0.2, 1.0),
		Math.randomInRange(0.2, 1.0),
		Math.randomInRange(0.2, 1.0)
		)
	};

	var random = Math.floor(Math.random() * 3);
	if (random == 0) {
		LIGHT.ambient = '#00A0F7';
		LIGHT.diffuse = '#70BBFF';
	}
	else if (random == 1) {
		LIGHT.ambient = '#880066';
		LIGHT.diffuse = '#FF8800';
	}
	else {
		LIGHT.ambient = '#008866';
		LIGHT.diffuse = '#88FF00';
	}

	//------------------------------
	// Render Properties
	//------------------------------
	var WEBGL = 'webgl';
	var CANVAS = 'canvas';
	var SVG = 'svg';
	var RENDER = {
		renderer: CANVAS
	};

	//------------------------------
	// Global Properties
	//------------------------------
	var now,
		start = Date.now();
	var center = FSS.Vector3.create();
	var attractor = FSS.Vector3.create();
	var container = document.getElementById('container');
	var output = document.getElementById('output');
	var renderer,
		scene,
		mesh,
		geometry,
		material;
	var webglRenderer,
		canvasRenderer,
		svgRenderer;
	var gui,
		autopilotController;

	//------------------------------
	// Methods
	//------------------------------
	function initialise() {
		createRenderer();
		createScene();
		createMesh();
		createLights();
		addEventListeners();
		resize(container.offsetWidth, container.offsetHeight);
		animate();
	}

	function createRenderer() {
		webglRenderer = new FSS.WebGLRenderer();
		canvasRenderer = new FSS.CanvasRenderer();
		svgRenderer = new FSS.SVGRenderer();
		setRenderer(RENDER.renderer);
	}

	function setRenderer(index) {
		if (renderer) {
			output.removeChild(renderer.element);
		}
		switch (index) {
		case WEBGL:
			renderer = webglRenderer;
			break;
		case CANVAS:
			renderer = canvasRenderer;
			break;
		case SVG:
			renderer = svgRenderer;
			break;
		}
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		output.appendChild(renderer.element);
	}

	function createScene() {
		scene = new FSS.Scene();
	}

	function createMesh() {
		scene.remove(mesh);
		renderer.clear();
		geometry = new FSS.Plane(MESH.width * renderer.width, MESH.height * renderer.height, MESH.segments, MESH.slices);
		material = new FSS.Material(MESH.ambient, MESH.diffuse);
		mesh = new FSS.Mesh(geometry, material);
		scene.add(mesh);

		// Augment vertices for animation
		var v,
			vertex;
		for (v = geometry.vertices.length - 1; v >= 0; v--) {
			vertex = geometry.vertices[v];
			vertex.anchor = FSS.Vector3.clone(vertex.position);
			vertex.step = FSS.Vector3.create(
			Math.randomInRange(0.2, 1.0),
			Math.randomInRange(0.2, 1.0),
			Math.randomInRange(0.2, 1.0)
			);
			vertex.time = Math.randomInRange(0, Math.PIM2);
		}
	}

	function createLights() {
		var l,
			light;
		for (l = scene.lights.length - 1; l >= 0; l--) {
			light = scene.lights[l];
			scene.remove(light);
		}
		renderer.clear();
		for (l = 0; l < LIGHT.count; l++) {
			light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
			light.ambientHex = light.ambient.format();
			light.diffuseHex = light.diffuse.format();
			scene.add(light);

			// Augment light for animation
			light.mass = Math.randomInRange(0.5, 1);
			light.velocity = FSS.Vector3.create();
			light.acceleration = FSS.Vector3.create();
			light.force = FSS.Vector3.create();

			// Ring SVG Circle
			light.ring = document.createElementNS(FSS.SVGNS, 'circle');
			light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
			light.ring.setAttributeNS(null, 'stroke-width', '0.5');
			light.ring.setAttributeNS(null, 'fill', 'none');
			light.ring.setAttributeNS(null, 'r', '10');

			// Core SVG Circle
			light.core = document.createElementNS(FSS.SVGNS, 'circle');
			light.core.setAttributeNS(null, 'fill', light.diffuseHex);
			light.core.setAttributeNS(null, 'r', '4');
		}
	}

	function resize(width, height) {
		renderer.setSize(width, height);
		FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
		createMesh();
	}

	function animate() {
		now = Date.now() - start;
		update();
		render();
		requestAnimationFrame(animate);
	}

	function update() {
		var ox,
			oy,
			oz,
			l,
			light,
			v,
			vertex,
			offset = MESH.depth / 2;

		// Update Bounds
		FSS.Vector3.copy(LIGHT.bounds, center);
		FSS.Vector3.multiplyScalar(LIGHT.bounds, LIGHT.xyScalar);

		// Update Attractor
		FSS.Vector3.setZ(attractor, LIGHT.zOffset);

		// Overwrite the Attractor position
		if (LIGHT.autopilot) {
			ox = Math.sin(LIGHT.step[0] * now * LIGHT.speed);
			oy = Math.cos(LIGHT.step[1] * now * LIGHT.speed);
			FSS.Vector3.set(attractor,
			LIGHT.bounds[0] * ox,
			LIGHT.bounds[1] * oy,
			LIGHT.zOffset);
		}

		// Animate Lights
		for (l = scene.lights.length - 1; l >= 0; l--) {
			light = scene.lights[l];

			// Reset the z position of the light
			FSS.Vector3.setZ(light.position, LIGHT.zOffset);

			// Calculate the force Luke!
			var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), LIGHT.minDistance, LIGHT.maxDistance);
			var F = LIGHT.gravity * light.mass / D;
			FSS.Vector3.subtractVectors(light.force, attractor, light.position);
			FSS.Vector3.normalise(light.force);
			FSS.Vector3.multiplyScalar(light.force, F);

			// Update the light position
			FSS.Vector3.set(light.acceleration);
			FSS.Vector3.add(light.acceleration, light.force);
			FSS.Vector3.add(light.velocity, light.acceleration);
			FSS.Vector3.multiplyScalar(light.velocity, LIGHT.dampening);
			FSS.Vector3.limit(light.velocity, LIGHT.minLimit, LIGHT.maxLimit);
			FSS.Vector3.add(light.position, light.velocity);
		}

		// Animate Vertices
		for (v = geometry.vertices.length - 1; v >= 0; v--) {
			vertex = geometry.vertices[v];
			ox = Math.sin(vertex.time + vertex.step[0] * now * MESH.speed);
			oy = Math.cos(vertex.time + vertex.step[1] * now * MESH.speed);
			oz = Math.sin(vertex.time + vertex.step[2] * now * MESH.speed);
			FSS.Vector3.set(vertex.position,
			MESH.xRange * geometry.segmentWidth * ox,
			MESH.yRange * geometry.sliceHeight * oy,
			MESH.zRange * offset * oz - offset);
			FSS.Vector3.add(vertex.position, vertex.anchor);
		}

		// Set the Geometry to dirty
		geometry.dirty = true;
	}

	function render() {
		renderer.render(scene);

		// Draw Lights
		if (LIGHT.draw) {
			var l,
				lx,
				ly,
				light;
			for (l = scene.lights.length - 1; l >= 0; l--) {
				light = scene.lights[l];
				lx = light.position[0];
				ly = light.position[1];
				switch (RENDER.renderer) {
				case CANVAS:
					renderer.context.lineWidth = 0.5;
					renderer.context.beginPath();
					renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
					renderer.context.strokeStyle = light.ambientHex;
					renderer.context.stroke();
					renderer.context.beginPath();
					renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
					renderer.context.fillStyle = light.diffuseHex;
					renderer.context.fill();
					break;
				case SVG:
					lx += renderer.halfWidth;
					ly = renderer.halfHeight - ly;
					light.core.setAttributeNS(null, 'fill', light.diffuseHex);
					light.core.setAttributeNS(null, 'cx', lx);
					light.core.setAttributeNS(null, 'cy', ly);
					renderer.element.appendChild(light.core);
					light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
					light.ring.setAttributeNS(null, 'cx', lx);
					light.ring.setAttributeNS(null, 'cy', ly);
					renderer.element.appendChild(light.ring);
					break;
				}
			}
		}
	}

	function addEventListeners() {
		window.addEventListener('resize', onWindowResize);
		container.addEventListener('click', onMouseClick);
		container.addEventListener('mousemove', onMouseMove);
	}

	//------------------------------
	// Callbacks
	//------------------------------
	function onMouseClick(event) {
		FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
		FSS.Vector3.subtract(attractor, center);
		LIGHT.autopilot = !LIGHT.autopilot;
	}

	function onMouseMove(event) {
		FSS.Vector3.set(attractor, event.x, renderer.height - event.y);
		FSS.Vector3.subtract(attractor, center);
	}

	function onWindowResize(event) {
		resize(container.offsetWidth, container.offsetHeight);
		render();
	}

	// Let there be light!
	//window.addEventListener("load", initialise);
	initialise();

/*
	// 1) Create a Renderer for the context you would like to render to.
	//   You can use either the WebGLRenderer, CanvasRenderer or SVGRenderer.
	var renderer = new FSS.CanvasRenderer();
	// 2) Add the Renderer's element to the DOM:
	var container = document.getElementsByTagName('body')[0];
	container.appendChild(renderer.element);
	// 3) Create a Scene:
	var scene = new FSS.Scene();
	// 4) Create some Geometry & a Material, pass them to a Mesh constructor, and add the Mesh to the Scene:
	var geometry = new FSS.Plane(2000, 1000, 4, 2);
	var material = new FSS.Material('#555555', '#FFF');
	var mesh = new FSS.Mesh(geometry, material);
	scene.add(mesh);
	// 5) Create and add a Light to the Scene:
	var light = new FSS.Light('#880066', '#FF8800');
	scene.add(light);
	// 6) Finally, render the Scene:
	renderer.render(scene);
*/
})();
