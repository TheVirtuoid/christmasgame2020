import Component from "../components/Component.js";
import { borders } from "./params.js";
let boxCount = 0;

export default class Box extends Component {
	constructor (args) {
		super(args);
		this.screen = args.screen;
		this.dropTimer = null;
		this.width = 30;
		this.height = 30;
		this.santa = args.santa;
		this.dropRange = this.screen.playground.height + this.screen.playground.top + borders.top + borders.bottom;
		this.incrementTiming = 10;
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

	drop(left, time = 5000) {
		left = left ? left : this.left;
		this.dropTimer = {
			count: 500,
			distance: Math.ceil(this.screen.playground.height / (time / this.incrementTiming)),
			top: this.top,
			left: left,
			handle: null,
			oldTop: this.top,
			oldLeft: left
		};
		this.dropTimer.handle = setInterval(this.dropIncrement.bind(this), this.incrementTiming);
	}

	dropIncrement() {
		this.erase(this.dropTimer.oldTop, this.dropTimer.oldLeft);
		if (!this.hit()) {
			this.draw(this.dropTimer.top, this.dropTimer.left);
			if (this.dropTimer.top > this.dropRange) {
				clearInterval(this.dropTimer.handle);
				this.dropTimer = null;
			} else {
				this.dropTimer.count--;
				if (this.dropTimer.count === 0) {
					clearInterval(this.dropTimer.handle);
					this.dropTimer = null;
				} else {
					this.dropTimer.oldTop = this.dropTimer.top;
					this.dropTimer.oldLeft = this.dropTimer.left;
					this.dropTimer.top += this.dropTimer.distance;
				}
			}
		} else {
			const damage = this.damage;
			console.log(`*** You got hit by a ${this.name} dealing ${damage} damage.`);
			this.screen.subtractHealth(damage);
			// this.scoreboard.subtractHealth(damage);
		}
	}

	hit () {
		const { top, left, width, height } = this.santa;
		const d = this.dropTimer;
		const dth = d.top + this.height;
		const dlw = d.left + this.width;
		const th = top + height;
		const lw = left + width;
		const hitTop = d.top >= top && d.top <= th;
		const hitBottom = dth >= top && dth <= th;
		const hitLeft = d.left >= left && d.left <= lw;
		const hitRight = dlw >= left && dlw <= lw;
		if ((hitRight || hitLeft) && (hitTop || hitBottom)) {
			clearInterval(d.handle);
			return true;
		} else {
			return false;
		}
	}
}
