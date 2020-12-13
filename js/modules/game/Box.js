import Component from "../components/Component.js";
import { borders } from "./params.js";
let boxCount = 0;

export default class Box extends Component {
	/**
	 * Constructs a new Box (icon, solid box)
	 * @param {Object} args - key/value collection of properties
	 * @param {Screen} args.screen - the Screen associated with this instance
	 * @param {Santa} args.santa - the Santa icon associated with this instance. Used for hit determination
	 */
	constructor (args) {
		super(args);
		const { screen, santa } = args;
		this.screen = screen;
		this.game = this.screen.game;
		this.width = 30;
		this.height = 30;
		this.santa = santa;
		this.dropRange = this.screen.playground.height + this.screen.playground.top + borders.top + borders.bottom;
		this.speed = 100;
		this.action = null;
		this.boxId = boxCount;
		boxCount ++;
	}

	/**
	 * Draw the image/box
	 * @param {Number} top - upper-left corner of image/box (Y-axis)
	 * @param {Number} left - upper-left corner of image/box (X-axis)
	 */
	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		if (this.image) {
			super.drawImage(top, left);
		} else {
			super.drawFill(top, left);
		}
	}

	/**
	 * Erase the image/box
	 * @param {Number} top - upper-left corner of image/box (Y-axis)
	 * @param {Number} left - upper-left corner of image/box (X-axis)
	 */
	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}

	/**
	 * Start the dropping process
	 * @param {Number} left - upper-left corner of image/box to start display (X-axis)
	 * @param {Number} time - milliseconds neede to traverse the entire screen from top to bottom
	 *
	 * The 'action' property controls the timing and the speed (distance) of the falling object
	 * at each frame interval (determined by requestAnimationFrame). To stop the object from
	 * falling, the 'action' property is set to null.
	 */
	start(left, time = 5000) {
		left = left ? left : this.left;
		this.action = {
			top: this.top,
			left: left,
			timing: 1,
			futureTop: this.top,
			distance: Math.ceil(this.screen.playground.height / time / this.speed)
		}
		// this.screen.sounds.drop.play();
		this.screen.addItem(this);
	}

	/**
	 * Stop the dropping process.
	 */
	stop() {
		this.action = null;
		this.screen.removeItem(this);
	}

	/**
	 * Move the image/box one frame (defined by action.distance)
	 * @param {Number} timing - passed by the requestAnimationFrame method (not used here)
	 */
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
					this.action.timing = 1;
					this.top = this.action.futureTop;
				} else {
					const damage = this.damage;
					this.sound.play();
					// console.log(`*** You got hit by a ${this.name} dealing ${damage} damage.`);
					this.screen.subtractHealth(damage);
					this.stop();
				}
			}
		}
	}

	/**
	 * Determine if there was a hit.
	 * @returns {boolean} - True if there was a hit.
	 *
	 * For this game, it's easier to determine if the object has *not* hit Santa. Therefore, the negative logic below.
	 */
	hit () {
		const { top, left, width, height } = this.santa;
		const d = this.action;
		const noWidthHit =  left > d.left + this.width || left + width < d.left;
		const noHeightHit = top > d.top + this.height || top + height < d.top;

		return !noWidthHit && !noHeightHit;
	}
}
