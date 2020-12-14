import Sleigh from "./Sleigh.js";
import Reindeer from "./Reindeer.js";
import { borders } from "../game/params.js";

export default class Santa {
	/**
	 * Construct a new Santa Clause
	 * @param {Object} args - key/value collection of properties
	 * @param {Number} args.top - upper left corner of object (Y-axis)
	 * @param {Number} args.left - upper left corner of object (X-axis)
	 * @param {Screen} args.screen - screen associated with this Santa
	 */
	constructor (args) {
		const { top, left, screen } = args;
		this.renderer = screen.renderer;
		this.top = top;
		this.left = left;
		this.screen = screen;
		const width = 12;
		const height = 16;
		const rLeft = 0;
		const rRight = width + 2;
		const renderer = this.renderer;
		const image = this.screen.remoteAssets.get('reindeer').image;
		this.reindeer = [
			{ name: "Dasher", deltaLeft: rLeft, deltaTop: 0, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top, left: this.left }) },
			{ name: "Dancer", deltaLeft: rRight, deltaTop: 0, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top, left: this.left + rRight }) },
			{ name: "Prancer", deltaLeft: rLeft, deltaTop: 20, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 20, left: this.left }) },
			{ name: "Vixen", deltaLeft: rRight, deltaTop: 20, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 20, left: this.left + rRight }) },
			{ name: "Comet", deltaLeft: rLeft, deltaTop: 40, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 40, left: this.left }) },
			{ name: "Cupid", deltaLeft: rRight, deltaTop: 40, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 40, left: this.left + rRight }) },
			{ name: "Donner", deltaLeft: rLeft, deltaTop: 60, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 60, left: this.left }) },
			{ name: "Clyde", deltaLeft: rRight, deltaTop: 60, deer: new Reindeer({ renderer, screen, image, width, height, top: this.top + 60, left: this.left + rRight }) },
		]
		this.sleigh = new Sleigh({
			renderer,
			screen,
			top: this.top + 80,
			left: this.left,
			width: width * 2 + 5,
			height: height + 10,
			image: this.screen.remoteAssets.get('santa').image
		});
		this.health = 100;
		this.width = this.sleigh.width;
		this.height = height * 4 + 8 + this.sleigh.height;
		this.speed = 1;
		this.action = null;
		this.boundedMouseMove = this.move.bind(this);
		this.boundedMobileMove = this.mobileMove.bind(this);
		this.device = {
			alpha: 0,
			beta: 0,
			gamma: 0,
			gammaRange: 45,
			gammaStep: this.screen.playground.width / 45,
			gammaDivisor: 45 / 2,
			gammaStart: borders.left,
			betaRange: 45,
			betaStep: this.screen.playground.height / 45,
			betaDivisor: 45 / 2,
			betaStart: borders.top
		}
	}

	/**
	 * Draw the Reindeer and the Sleigh
	 * @param {Number} top - upper left corner of object (Y-axis)
	 * @param {Number} left - upper left corner of object (X-axis)
	 */
	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.reindeer.forEach( reindeer => reindeer.deer.draw(top + reindeer.deltaTop, left + reindeer.deltaLeft));
		this.sleigh.draw(top + 80, left);
	}

	/**
	 * Erase the reindeer and the sleigh
	 * @param {Number} top - upper left corner of object (Y-axis)
	 * @param {Number} left - upper left corner of object (X-axis)
	 */
	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		this.reindeer.forEach( reindeer => reindeer.deer.erase(top + reindeer.deltaTop, left + reindeer.deltaLeft) );
		this.sleigh.erase(top + 80, left);
	}

	/**
	 * Start processing the Santa. This adds events for both mouse movement and change in device orientation (mobile)
	 */
	start() {
		this.action = {
			top: this.top,
			left: this.left,
			timing: this.speed,
			futureTop: this.top,
			futureLeft: this.left
		}
		this.renderer.canvas.addEventListener('mousemove', this.boundedMouseMove);
		window.addEventListener('deviceorientation', this.boundedMobileMove);
	}

	/**
	 * Stop processing the Santa. Removes the event listeners for the mouse and the device
	 */
	stop() {
		this.action = null;
		window.removeEventListener('deviceorientation', this.boundedMobileMove);
		this.renderer.canvas.removeEventListener('mousemove', this.boundedMouseMove);
	}

	/**
	 * Add a number to the health of the Santa
	 * @param {Number} number - value to add to the health of the Santa
	 */
	addHealth(number) {
		this.health += number;
	}

	/**
	 * Routine to process a change in the device orientation. This is converted to offsetX/offsetY and processed by tge mouse movement routine
	 * @param {DeviceOrientationEvent} event - the device orientation event.
	 */
	mobileMove(event) {
		this.device.alpha = event.alpha;
		this.device.beta = event.beta;
		this.device.gamma = event.gamma;
		const offsetY = Math.floor((this.device.beta + this.device.betaDivisor) * this.device.betaStep + this.device.betaStart);
		const offsetX = Math.floor((this.device.gamma + this.device.gammaDivisor) * this.device.gammaStep + this.device.gammaStart);
		this.move({ offsetX, offsetY });
	}

	/**
	 * Process a mouse movement event. Also used by the mobileMove routine above.
	 * @param {MouseEvent} event - the mousemouse event
	 */
	move(event) {
		let { offsetX, offsetY } = event;
		if (offsetX !== this.action.futureLeft || offsetY !== this.action.futureTop) {
			const { top, left, width, height } = this.screen.playground;
			const limitX = left + width - this.width;
			const limitY = top + height - this.height;
			offsetX = offsetX < left ? left : offsetX > limitX ? limitX : offsetX;
			offsetY = offsetY < top ? top : offsetY > limitY ? limitY : offsetY;
			this.action.futureTop = offsetY;
			this.action.futureLeft = offsetX;
		}
	}

	/**
	 * Move the Santa from one place to another
	 * @param {Number} timing - timing value sent from requestAnimationFrame
	 */
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
