import Screen from "./Screen.js";
import Text from "../components/Text.js";
import {fontSizes} from "../game/params.js";
import Button from "../components/Button.js";

export default class HighScoreScreen extends Screen {
	constructor(args) {
		super(args);
		this.hsText = new Text({
			renderer: this.renderer,
			top: this.playground.top + 50,
			left: this.playground.left,
			width: this.playground.width,
			height: fontSizes[40].height,
			size: 40,
			text: "HIGH SCORES"
		});
		this.playground.add(this.hsText);
		this.update();

		const action = {
			name: 'highScoreStartButton',
			routine: this.processStartButton.bind(this)
		}
		const startButton = new Button({
			game: this.game,
			renderer: this.renderer,
			top: this.playground.height - 100,
			left: this.left,
			width: this.width,
			height: fontSizes[20].height,
			size: 20,
			text: "CLICK OR TOUCH TO START",
			color: "GreenYellow",
			action
		});
		this.playground.add(startButton);
		this.timer = null;
	}

	update() {
		let top = this.playground.top + 100;
		const halfWidth = this.playground.width / 2 - 10;
		const scoreLeft = 0;
		const initialsLeft = halfWidth + 20;
		const height = fontSizes[30].height;
		this.game.highScores.scores.forEach( score => {
			let text = new Text({
				renderer: this.renderer,
				top: top,
				left: scoreLeft,
				width: halfWidth,
				height: height,
				size: 30,
				justify: 'right',
				text: score.score.toString()
			});
			this.playground.add(text);
			text = new Text({
				renderer: this.renderer,
				top: top,
				left: initialsLeft,
				width: halfWidth,
				height: height,
				size: 30,
				justify: 'left',
				text: score.initials.toString()
			});
			this.playground.add(text);
			top += height + 10;
		});
	}

	start() {
		this.scoreboard.draw();
		this.playground.draw();
		this.timer = setTimeout(this.nextScreen.bind(this), 5000);
	}

	stop() {
		this.playground.erase();
	}

	nextScreen() {
		this.timer = null;
		this.game.switchScreens('intro');
	}

	processStartButton() {
		clearTimeout(this.timer);
		this.timer = null;
		this.game.switchScreens('play');
	}
}
