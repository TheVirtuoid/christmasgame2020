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
			top: 200,
			left: 100,
			screen: this
		});
		this.action = null;
		this.badItems = [Airplane, Balloon, Bird, Meteor, Ufo];
		this.frequency = [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500];
		// this.speed = [5000, 5000, 5000, 5000, 5000, 4000, 4000, 3000, 3000, 2000, 1000];
		this.speed = [5, 5, 5, 5, 5, 4, 4, 3, 3, 2, 1];
		this.scoreTimer = null;

		this.items = [];
	}

	start() {
		this.playground.add(this.santa);
		this.scoreboard.draw();
		this.playground.draw();
		this.santa.start();
		requestAnimationFrame(this.frame.bind(this));
		setTimeout(this.beginDropping.bind(this), 2000);
	}

	frame(timing) {
		this.santa.moveSanta(timing);
		this.items.forEach( item => item.move(timing));
		requestAnimationFrame(this.frame.bind(this));
	}

	stop (event) {
		this.santa.stop();
		console.log("----------------------------ALL DONE!!!!!");
	}

	beginDropping() {
		this.scoreTimer = setInterval(this.incrementScore.bind(this), 10);
		let frequencyIndex = 0;
		let masterTimer = null;
		let count = 200;
		masterTimer = setInterval( _dropItem, this.frequency[frequencyIndex], this);

		function _dropItem(self) {
			const item = new self.badItems[Math.floor(Math.random() * self.badItems.length)]({
				renderer: self.renderer,
				top: self.playground.top,
				left: self.playground.left,
				screen: self,
				santa: self.santa
			});
			item.start(self.playground.left + Math.floor(Math.random() * self.playground.width), self.speed[Math.floor(Math.random() * self.speed.length)]);
			if (self.scoreboard.health.score <= 0) {
				clearInterval(masterTimer);
				self.endDropping();
				return;
			}
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
		clearInterval(this.scoreTimer);
	}

	incrementScore() {
		this.addScore(1);
	}

	addItem(item) {
		this.items.push(item);
		console.log(`--pushed item ${item.boxId}`);
	}

	removeItem(item) {
		this.items = this.items.filter( fallingItem => fallingItem.boxId !== item.boxId);
		console.log(`--removed item ${item.boxId}`);
	}

}
