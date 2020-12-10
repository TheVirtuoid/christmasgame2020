import Screen from "./Screen.js";
import Text from "../components/Text.js";
import {fontSizes} from "../game/params.js";

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
			justify: 'center',
			text: "HIGH SCORES"
		});
		this.playground.add(this.hsText);
		this.update();
	}

	update() {
		let top = this.playground.top + 100;
		const halfWidth = this.playground.width / 2;
		const scoreLeft = 0;
		const initialsLeft = halfWidth + 10;
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
	}

	stop() {
		this.playground.erase();
	}
}