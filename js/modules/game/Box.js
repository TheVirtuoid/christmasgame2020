import Component from "../components/Component.js";
import { borders } from "./params.js";
let boxCount = 0;

export default class Box extends Component {
	constructor (args) {
		super(args);
		this.screen = args.screen;
		this.width = 30;
		this.height = 30;
		this.santa = args.santa;
		this.dropRange = this.screen.playground.height + this.screen.playground.top + borders.top + borders.bottom;
		this.speed = 100;
		this.action = null;
		this.boxId = boxCount;
		boxCount ++;

	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.drawFill(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}

	start(left, time = 5000) {
		left = left ? left : this.left;
		this.action = {
			top: this.top,
			left: left,
			timing: 1,
			futureTop: this.top,
			distance: Math.ceil(this.screen.playground.height / time / this.speed)
		}
		this.screen.addItem(this);
	}

	stop() {
		this.action = null;
		this.screen.removeItem(this);
	}

	move(timing) {
		if (this.action) {
			this.action.timing --;
			if (this.action.timing === 0) {
				this.action.futureTop += this.action.distance;
				this.erase(this.action.top, this.action.left);
				if (this.action.futureTop > this.dropRange) {
					this.stop();
				} else if (!this.hit()) {
					this.draw(this.action.futureTop, this.action.left);
					this.action.top = this.action.futureTop;
					// this.action.timing = this.speed;
					this.action.timing = 1;
					this.top = this.action.futureTop;
				} else {
					const damage = this.damage;
					console.log(`*** You got hit by a ${this.name} dealing ${damage} damage.`);
					this.screen.subtractHealth(damage);
					this.stop();
				}
			}
		}
	}

	hit () {
		const { top, left, width, height } = this.santa;
		const d = this.action;
		const dth = d.top + this.height;
		const dlw = d.left + this.width;
		const th = top + height;
		const lw = left + width;
		const hitTop = d.top >= top && d.top <= th;
		const hitBottom = dth >= top && dth <= th;
		const hitLeft = d.left >= left && d.left <= lw;
		const hitRight = dlw >= left && dlw <= lw;
		return ((hitRight || hitLeft) && (hitTop || hitBottom));
	}
}
