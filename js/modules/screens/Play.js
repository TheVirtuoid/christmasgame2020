import Screen from "./Screen.js";
import Santa from "../santa/Santa.js";
import Airplane from "../baditems/Airplane.js";
import Balloon from "../baditems/Balloon.js";
import Bird from "../baditems/Bird.js";
import Meteor from "../baditems/Meteor.js";
import Ufo from "../baditems/Ufo.js";

export default class Play extends Screen {
	constructor(args) {
		super(args);
		this.santa = new Santa({
			renderer: this.renderer,
			top: 200,
			left: 100
		});
		this.boundMoveFunction = this.move.bind(this);
		this.boundKeyFunction = this.stop.bind(this);
		this.action = null;
		this.moveEnabled = false;
		this.oldMousePos = { top: this.santa.top, left: this.santa.left };

		this.badItems = [Airplane, Balloon, Bird, Meteor, Ufo];
		this.frequency = [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500];
		this.speed = [5000, 5000, 5000, 5000, 5000, 4000, 4000, 3000, 3000, 2000, 1000];
	}

	start() {
		this.playground.add(this.santa);
		this.scoreBoard.draw();
		this.playground.draw();
		if (!this.moveEnabled) {
			this.renderer.canvas.addEventListener('mousemove', this.boundMoveFunction);
			document.addEventListener('keyup', this.boundKeyFunction);
			this.moveEnabled = true;
		}
		setTimeout(this.beginDropping.bind(this), 2000);
	}

	stop (event) {
		if (this.moveEnabled) {
			this.renderer.canvas.removeEventListener('mousemove', this.boundMoveFunction);
			document.removeEventListener('keyup', this.boundKeyFunction);
			this.moveEnabled = false;
		}
		console.log("----------------------------ALL DONE!!!!!");
	}

	move(event) {
		const { offsetX, offsetY } = event;
		if (offsetX >= this.playground.left && offsetX <= this.playground.left + this.playground.width &&
		offsetY >= this.playground.top && offsetY <= this.playground.top + this.playground.height) {
			this.santa.left = offsetX;
			this.santa.top = offsetY;
			this.santa.erase(this.oldMousePos.top, this.oldMousePos.left);
			this.santa.draw(offsetY, offsetX);
			this.oldMousePos = { top: offsetY, left: offsetX };
		}
	}

	beginDropping() {
		let frequencyIndex = 0;
		let masterTimer = null;
		let count = 10;
		masterTimer = setInterval( _dropItem, this.frequency[frequencyIndex], this);

		function _dropItem(self) {
			const item = new self.badItems[Math.floor(Math.random() * self.badItems.length)]({
				renderer: self.renderer,
				top: self.playground.top,
				left: self.playground.left,
				playground: self.playground,
				santa: self.santa
			});
			item.drop(self.playground.left + Math.floor(Math.random() * self.playground.width), self.speed[Math.floor(Math.random() * self.speed.length)]);
			console.log(count);
			count--;
			if (count === 0) {
				clearInterval(masterTimer);
				self.endDropping();
			} else if (count % 10 === 0) {
				frequencyIndex++;
				frequencyIndex = Math.min(frequencyIndex, self.frequency.length - 1);
				clearInterval(masterTimer);
				masterTimer = setInterval( _dropItem, self.frequency[frequencyIndex], self);
			}
		}

	}
	endDropping() {
		console.log('---------GMAE OVER');
	}
}
