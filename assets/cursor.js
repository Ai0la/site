const fps = 144;
const particles_per_second = 40;
const particle_lifetime = 500;
const particle_speed = 4;
const particle_jitter = 0;
const particle_size = 10;

let canvas = document.getElementById("canvas-background");
let ctx = canvas.getContext("2d");
let particles = []

class particle {
	constructor(x, y) {
		this.i = 1;
		this.x = x;
		this.y = y;
    this.variation = Math.floor(Math.random() * 8)
		this.size = particle_size * Math.random();
		this.direction = Math.random() * 0.5 - 0.25;
	}

	animate() {
		this.i += Math.random() * 2;
		this.y += Math.random() * particle_speed;
		this.x += Math.random() * particle_speed * this.direction;
		this.size -= 0.2
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function main() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	setInterval(draw, 1000 / fps);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < particles.length; i++) {
		p = particles[i];
		p.animate();

		if(p.i > particle_lifetime || p.size < 0) {
			particles.splice(i, 1);
			continue;
		}

		draw_particle(p);
	}
}

function draw_particle(p) {
	let transparency = p.i / (particle_lifetime / 2);
	let color = `rgba(255, 255, 255, ${0.7 - transparency})`;

	ctx.beginPath();
  if (p.variation == 0 || p.variation == 1 || p.variation == 2 || p.variation == 3) { // Create X
    ctx.moveTo(p.x - p.size / 2, p.y - p.size / 2);
    ctx.lineTo(p.x + p.size / 2, p.y + p.size / 2);

    ctx.moveTo(p.x + p.size / 2, p.y - p.size / 2);
    ctx.lineTo(p.x - p.size / 2, p.y + p.size / 2);
  }

  if (p.variation == 0 || p.variation == 1 || p.variation == 4 || p.variation == 5) { // Create +
    ctx.moveTo(p.x + p.size / 2, p.y);
    ctx.lineTo(p.x - p.size / 2, p.y);

    ctx.moveTo(p.x, p.y + p.size / 2);
    ctx.lineTo(p.x, p.y - p.size / 2);
  }

  if (p.variation == 6) { // Create circle
    ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI, false);
  }

  if (p.variation == 7) { // Create filled circle
    ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }

	ctx.lineWidth = 2;
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.closePath();
}

document.getElementsByTagName("body")[0].addEventListener("mousemove", function(e) {
	let rect = this.getBoundingClientRect();
	if (Math.random() < 0.6) {
		particles.push(new particle(e.clientX - rect.left, e.clientY - rect.top));
	}
}, false);
