import Component from "../components/Component.js";
import { borders } from "./params.js";
let boxCount = 0;

export default class Box extends Component {
	constructor (args) {
		super(args);
		this.playground = args.playground;
		this.dropTimer = null;
		this.width = 30;
		this.height = 30;
		this.santa = args.santa;
		this.dropRange = this.playground.height + this.playground.top + borders.top + borders.bottom;
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
			distance: Math.ceil(this.playground.height / (time / this.incrementTiming)),
			top: this.top,
			left: left,
			handle: null,
			oldTop: this.top,
			oldLeft: left
		};
		this.dropTimer.handle = setInterval(this.dropIncrement.bind(this), this.incrementTiming);
	}

	dropIncrement() {
		this.hit();
		this.erase(this.dropTimer.oldTop, this.dropTimer.oldLeft);
		this.draw(this.dropTimer.top, this.dropTimer.left);
		console.log(`(${this.boxId}) Draw: (${this.dropTimer.top},${this.dropTimer.left})`);
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
	}

	hit () {
		const { top, left, width, height } = this.santa;
		const d = this.dropTimer;
		const dth = d.top + this.height;
		const dlw = d.left + this.width;
		const th = top + height;
		const lw = left + width;
/*
		if ( (d.top >= top && d.top <= th) || (dth >= top && dth <= th)) {
			console.log(`(${this.boxId}) top: (${d.top},${this.height})-(${top},${height}), left: (${d.left},${this.width})-(${left},${width}), Results: ${d.top >= top && d.top <= th && d.left >= left && d.left <= lw}-${dth >= top && dth <= th && dlw >= left && dlw <= lw}`);
		}
*/

		const hitTop = d.top >= top && d.top <= th;
		const hitBottom = dth >= top && dth <= th;
		const hit = hitTop || hitBottom;
/*
		const hitLeft = (d.left >= left && d.left <= lw) || (dlw >= left && dlw <= lw);
		const hitTop = (d.top >= top && d.top <= th) || (dth >= top && dth <= th);
		if (hitTop) {
			console.log(`(${this.boxId}) top: (${d.top},${this.height})-(${top},${height}), left: (${d.left},${this.width})-(${left},${width}), Results: ${hitTop}-${hitLeft}`);
		}
*/
		if (hit) {
			console.log(`**** HIT (${this.boxId}): current: (${d.top},${d.left}), old: (${d.oldTop},${d.oldLeft})`);
			clearInterval(d.handle);
			this.erase(d.oldTop, d.oldLeft);
			return true;
		} else {
			return false;
		}
	}
}
