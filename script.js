// HTML5 canvas boilerplate
// Resizes canvas size based on device pixel aspect ratio
// Particles can only spawn within canvas dimensions
// Creates 1000 particles with varying radii
// Provides basic math random functions

window.onload = () => {

	window.addEventListener('resize', resize, false);

	let canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let particles = [];

	function resize() {
		let scale = window.devicePixelRatio,
			sizeX = window.innerWidth,
			sizeY = window.innerHeight;
		canvas.style.width = `${sizeX}px`;
		canvas.style.height = `${sizeY}px`;
		canvas.width = sizeX * scale;
		canvas.height = sizeY * scale;
		ctx.scale(scale, scale);
	}

	function Particle(x, y, r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	Particle.prototype.update = function () {
		this.draw();
	};

	Particle.prototype.draw = function () {
		ctx.fillStyle = `rgba(0, 0, 0, 1)`;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	};

	function makeParticles() {
		let x, y, r, num, particle;
		for (let i = 0; i < 1000; i++) {
			num = getRandomNum(1, 10);
			num > 9.7 ? r = getRandomInt(3, 4) : r = getRandomInt(1, 3);
			x = getRandomInt(r, canvas.width - r);
			y = getRandomInt(r, canvas.height - r);
			particle = new Particle(x, y, r);
			particles.push(particle);
		}
	}

	function getRandomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function loop() {
		//window.requestAnimationFrame(loop);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particles.forEach(particle => {
			particle.update();
		});
	}

	function init() {
		makeParticles();
		resize();
		loop();
	}

	init();

};
