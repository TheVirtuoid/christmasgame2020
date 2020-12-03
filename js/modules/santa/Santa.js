import Sleigh from "./Sleigh.js";
import Reindeer from "./Reindeer.js";

export default class Santa {
	constructor () {
		this.sleigh = new Sleigh();
		this.reindeer = [
			{ name: "Dasher", deer: new Reindeer() },
			{ name: "Dancer", deer: new Reindeer() },
			{ name: "Prancer", deer: new Reindeer() },
			{ name: "Vixen", deer: new Reindeer() },
			{ name: "Comet", deer: new Reindeer() },
			{ name: "Cupid", deer: new Reindeer() },
			{ name: "Donner", deer: new Reindeer() },
			{ name: "Clyde", deer: new Reindeer() },
		]
		this.health = 100;
		this.pos = null;
	}

	isHit (pos) {
		return this.sleigh.isHit(pos) || this.reindeer.some( deer => deer.isHit(pos) );
	}
}
