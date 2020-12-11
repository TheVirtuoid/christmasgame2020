import Screen from "./Screen.js";
import { fontSizes } from "./../game/params.js";
import Text from "../components/Text.js";
import Button from "../components/Button.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
		const renderer = this.renderer;
		const top = this.playground.top + 200;
		const left = this.playground.left;
		const width = this.playground.width;
		const size = 60;
		const height = fontSizes[60].height;
		const justify = "left";
		const runText1 = new Text({ renderer, top: top + 20, left, width, height, size, justify, text: 'RUN'});
		const runText2 = new Text({ renderer, top: top + 90, left: left + 90, width, height, size, justify, text: 'RUN'});
		const santaText = new Text({ renderer, top: top + 160, left: left + 180, width, height, size, justify, text: 'SANTA'});
		const startButton = new Button({ renderer, top: this.playground.height - 100, left, width, height: fontSizes[20].height, size: 20, text: "CLICK OR TOUCH TO START", color: "GreenYellow" });

		startButton.action = this.processStartButton.bind(this);
		this.playground.add(runText1);
		this.playground.add(runText2);
		this.playground.add(santaText);
		this.playground.add(startButton);
	}

	start() {
		this.scoreboard.draw();
		this.playground.draw();
	}

	stop() {
		this.playground.erase();
	}

	processStartButton(event) {
		this.game.switchScreens('play');
	}
}
