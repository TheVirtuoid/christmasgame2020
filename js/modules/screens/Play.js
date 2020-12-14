import Screen from "./Screen.js";
import Santa from "../santa/Santa.js";
import Airplane from "../baditems/Airplane.js";
import Balloon from "../baditems/Balloon.js";
import Bird from "../baditems/Bird.js";
import Meteor from "../baditems/Meteor.js";
import Ufo from "../baditems/Ufo.js";

export default class Play extends Screen {
	/**
	 * Construct a new Play screen
	 * @param {Object} args - key/value collection of properties
	 */
	constructor(args) {
		super(args);
		this.action = null;
		this.frequency = [1000, 950, 900, 850, 800, 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250];
		this.speed = [5, 5, 5, 5, 5, 4, 4, 3, 3, 2, 1];
		this.scoreTimer = null;
		this.items = [];
		this.remoteAssets = this.game.loadRemoteAssets();
		this.badItems = ['airplane', 'balloon', 'bird', 'meteor', 'ufo'];
		this.assets = {airplane: Airplane, balloon: Balloon, bird: Bird, meteor: Meteor, ufo: Ufo};
		this.droppingTimer = null;

		this.santa = new Santa({
			top: this.playground.height / 2,
			left: this.playground.width / 2,
			screen: this
		});

	}

	/**
	 * Start playing the game. This also starts the BadItem dropping sequence and the requestAnimationFrame sequence
	 * to properly display the Santa and the Bad Items
	 */
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

	/**
	 * Process a frame of animation. Move Santa, move all the items, and if the health is 0 or less, the game is over!
	 * @param {Number} timing - argument passed by requestAnimationFrame
	 */
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

	/**
	 * End this screen. NOTE: No super.erase() here until screen.erase is fixed!
	 * @param event
	 */
	stop (event) {
		this.playground.erase();
	}

	/**
	 * Start the dropping process. This also includes starting the score timer to increment the score.
	 */
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

	/**
	 * End the dropping sequence. Santa has been hit one to many times!
	 */
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

	/**
	 * Increment the score
	 */
	incrementScore() {
		this.addScore(1);
	}

	/**
	 * Add an item to the list of items being dropped. This is called from the component's 'start()' method
	 * @param {Box} item - item to be dropped
	 */
	addItem(item) {
		this.items.push(item);
		// console.log(`--pushed item ${item.boxId}`);
	}

	/**
	 * Remove the component from the items being dropped. Occurs after a hit or after it goes off the screen.
	 * @param {Box} item - item to be removed
	 */
	removeItem(item) {
		this.items = this.items.filter( fallingItem => fallingItem.boxId !== item.boxId);
	}

	/**
	 * Add a score!
	 * @param {Number} value - score to the added
	 */
	addScore(value) {
		this.scoreboard.addScore(value);
	}

	/**
	 * Subtract out damage from a hit
	 * @param {Number} value - score to be subtracted
	 */
	subtractHealth(value) {
		this.scoreboard.addHealth(value * -1);
	}


}
