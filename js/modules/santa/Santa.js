import Sleigh from "./Sleigh.js";
import Reindeer from "./Reindeer.js";

export default class Santa {
	constructor (args) {
		const { top, left, screen } = args;
		this.renderer = screen.renderer;
		this.top = top;
		this.left = left;
		this.screen = screen;
		const color = "brown";
		const width = 10;
		const height = 18;
		const rLeft = 0;
		const rRight = width + 2;
		const renderer = this.renderer;
		this.reindeer = [
			{ name: "Dasher", deltaLeft: rLeft, deltaTop: 0, deer: new Reindeer({ renderer, color, width, height, top: this.top, left: this.left }) },
			{ name: "Dancer", deltaLeft: rRight, deltaTop: 0, deer: new Reindeer({ renderer, color, width, height, top: this.top, left: this.left + rRight }) },
			{ name: "Prancer", deltaLeft: rLeft, deltaTop: 20, deer: new Reindeer({ renderer, color, width, height, top: this.top + 20, left: this.left }) },
			{ name: "Vixen", deltaLeft: rRight, deltaTop: 20, deer: new Reindeer({ renderer, color, width, height, top: this.top + 20, left: this.left + rRight }) },
			{ name: "Comet", deltaLeft: rLeft, deltaTop: 40, deer: new Reindeer({ renderer, color, width, height, top: this.top + 40, left: this.left }) },
			{ name: "Cupid", deltaLeft: rRight, deltaTop: 40, deer: new Reindeer({ renderer, color, width, height, top: this.top + 40, left: this.left + rRight }) },
			{ name: "Donner", deltaLeft: rLeft, deltaTop: 60, deer: new Reindeer({ renderer, color, width, height, top: this.top + 60, left: this.left }) },
			{ name: "Clyde", deltaLeft: rRight, deltaTop: 60, deer: new Reindeer({ renderer, color, width, height, top: this.top + 60, left: this.left + rRight }) },
		]
		this.sleigh = new Sleigh({
			renderer,
			color: "red",
			top: this.top + 80,
			left: this.left,
			width: width * 2 + 2,
			height: 38
		});
		this.health = 100;
		this.width = this.sleigh.width;
		this.height = height * 4 + 8 + this.sleigh.height;
		this.speed = 1;
		this.action = null;
		this.boundedMouseMove = this.move.bind(this);
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.reindeer.forEach( reindeer => reindeer.deer.draw(top + reindeer.deltaTop, left + reindeer.deltaLeft));
		this.sleigh.draw(top + 80, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.reindeer.forEach( reindeer => reindeer.deer.erase(top + reindeer.deltaTop, left + reindeer.deltaLeft) );
		this.sleigh.erase(top + 80, left);
	}

	start() {
		this.action = {
			top: this.top,
			left: this.left,
			timing: this.speed,
			futureTop: this.top,
			futureLeft: this.left
		}
		this.renderer.canvas.addEventListener('mousemove', this.boundedMouseMove);
	}

	stop() {
		this.action = null;
		this.renderer.canvas.removeEventListener('mousemove', this.boundedMouseMove);
	}

	move(event) {
		const { offsetX, offsetY } = event;
		if (offsetX !== this.action.futureLeft || offsetY !== this.action.futureTop) {
			const { top, left, width, height } = this.screen.playground;
			if (offsetX >= left && offsetX <= left + width && offsetY >= top && offsetY <= top + height) {
				this.action.futureTop = offsetY;
				this.action.futureLeft = offsetX;
			}
		}
	}

	moveSanta(timing) {
		if (this.action) {
			this.action.timing --;
			if (this.action.timing === 0) {
				this.erase(this.action.top, this.action.left);
				this.draw(this.action.futureTop, this.action.futureLeft);
				this.action.top = this.action.futureTop;
				this.action.left = this.action.futureLeft;
				this.action.timing = this.speed;
				this.top = this.action.futureTop;
				this.left = this.action.futureLeft;
			}
		}
	}
}
