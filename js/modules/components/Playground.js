import RunRunSanta from "./RunRunSanta.js";
import StartButton from "./StartButton.js";

export default class Playground {
	constructor(args) {
		const { renderer } = args;
		this.renderer = renderer;
		this.runRunSanta = new RunRunSanta({ renderer });
		this.startButton = new StartButton({ renderer });
	}

	draw(object) {
		console.log(this[object]);
	}
}
