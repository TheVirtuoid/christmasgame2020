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
			top: this.playground.height / 2,
			left: this.playground.width / 2,
			screen: this
		});
		this.action = null;
		this.frequency = [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250];
		this.speed = [5, 5, 5, 5, 5, 4, 4, 3, 3, 2, 1];
		this.scoreTimer = null;
		this.items = [];
		this.remoteAssets = this.game.loadRemoteAssets();
		this.badItems = ['airplane', 'balloon', 'bird', 'meteor', 'ufo'];
		this.assets = {airplane: Airplane, balloon: Balloon, bird: Bird, meteor: Meteor, ufo: Ufo};
		this.droppingTimer = null;
	}

	start() {
		this.playground.clear();
		this.scoreboard.reset();
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
		if (this.scoreboard.health.score <= 0) {
			this.subtractHealth(this.scoreboard.health.score);
			clearInterval(this.droppingTimer);
			this.endDropping();
			this.game.switchScreens('gameover');
		} else {
			requestAnimationFrame(this.frame.bind(this));
		}
	}

	stop (event) {
		this.playground.erase();
	}

	beginDropping() {
		this.scoreTimer = setInterval(this.incrementScore.bind(this), 10);
		let frequencyIndex = 0;
		this.droppingTimer = null;
		let count = 2000000;
		this.droppingTimer = setInterval( _dropItem, this.frequency[frequencyIndex], this);

		function _dropItem(self) {
			const badItemNumber = Math.floor(Math.random() * self.badItems.length);
			const assetName = self.badItems[badItemNumber];
			const asset = self.remoteAssets.get(assetName);
			const item = new self.assets[assetName]({
				renderer: self.renderer,
				top: self.playground.top,
				left: self.playground.left,
				screen: self,
				santa: self.santa,
				image: asset.image,
				sound: asset.sound
			});
			item.start(self.playground.left + Math.floor(Math.random() * (self.playground.width - item.width)), self.speed[Math.floor(Math.random() * self.speed.length)]);
			count--;
			if (count === 0) {
				clearInterval(self.droppingTimer);
				self.endDropping();
			} else if (count % 10 === 0) {
				frequencyIndex++;
				frequencyIndex = Math.min(frequencyIndex, self.frequency.length - 1);
				clearInterval(self.droppingTimer);
				self.droppingTimer = setInterval( _dropItem, self.frequency[frequencyIndex], self);
			}
		}

	}
	endDropping() {
		this.allDone = true;
		const items = this.items.map( item => item.boxId);
		console.log(items);
		clearInterval(this.scoreTimer);
		items.forEach( boxId => {
			const item = this.items.find( item => item.boxId === boxId);
			item.erase(item.action.top, item.action.left);
			item.stop();
		});
		this.santa.stop();
		this.santa.erase();
	}

	incrementScore() {
		this.addScore(1);
	}

	addItem(item) {
		this.items.push(item);
		// console.log(`--pushed item ${item.boxId}`);
	}

	removeItem(item) {
		this.items = this.items.filter( fallingItem => fallingItem.boxId !== item.boxId);
		// console.log(`--removed item ${item.boxId}`);
	}

	addScore(value) {
		this.scoreboard.addScore(value);
	}

	subtractHealth(value) {
		this.scoreboard.addHealth(value * -1);
	}


}
