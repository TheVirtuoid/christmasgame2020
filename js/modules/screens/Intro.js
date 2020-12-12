import Screen from "./Screen.js";
import { fontSizes } from "../game/params.js";
import Text from "../components/Text.js";
import Button from "../components/Button.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
		const game = this.game;
		const renderer = this.renderer;
		const top = this.playground.top + 200;
		const left = this.playground.left;
		const width = this.playground.width;
		const size = 60;
		const height = fontSizes[size].height;
		const justify = "left";
		const runText1 = new Text({ renderer, top: top + 20, left, width, height, size, justify, text: 'RUN'});
		const runText2 = new Text({ renderer, top: top + 90, left: left + 90, width, height, size, justify, text: 'RUN'});
		const santaText = new Text({ renderer, top: top + 160, left: left + 180, width, height, size, justify, text: 'SANTA'});

		const action = {
			name: 'introStartButton',
			routine: this.processStartButton.bind(this)
		}
		const startButton = new Button({
			game,
			renderer,
			top: this.playground.height - 100,
			left,
			width,
			height: fontSizes[20].height,
			size: 20,
			text: "CLICK OR TOUCH TO START",
			color: "GreenYellow",
			action
		});
		this.playground.add(runText1);
		this.playground.add(runText2);
		this.playground.add(santaText);
		this.playground.add(startButton);

		this.timer = null;
	}

	processStartButton(event) {
		clearTimeout(this.timer);
		this.timer = null;
		this.game.switchScreens('play');
	}

	start() {
		super.start();
		this.timer = setTimeout( this.nextScreen.bind(this), 5000);
	}

	nextScreen() {
		this.timer = null;
		this.game.switchScreens('highscore');
	}

	stop() {
		this.playground.erase();
	}
}
