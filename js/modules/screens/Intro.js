import Screen from "./Screen.js";
import RunRunSanta from "./../components/RunRunSanta.js";
import StartButton from "../components/StartButton.js";
import { fontSizes } from "./../game/params.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
		this.runRunSanta = new RunRunSanta({
			renderer: this.renderer,
			top: this.playground.top + 200,
			left: this.playground.left,
			width: this.playground.width,
			height: fontSizes[60].height,
			size: 60
		});
		this.startButton = new StartButton({
			renderer: this.renderer,
			top: this.playground.height - 100,
			left: this.playground.left,
			width: this.playground.width,
			height: fontSizes[20].height,
			size: 20
		});
		this.startButton.action = this.processStartButton.bind(this);
		this.playground.add(this.runRunSanta);
		this.playground.add(this.startButton);
	}

	start() {
		this.scoreboard.draw();
		this.playground.draw();
	}

	stop() {
		this.playground.erase();
	}

	processStartButton(event) {
		console.log('GOT THE CLICK EVENT');
		console.log(event);
		this.game.switchScreens('play');
		// this.playground.erase();
	}
}
