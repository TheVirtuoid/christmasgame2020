import Screen from "./Screen.js";
import Text from "./../components/Text.js";
import { fontSizes } from "../game/params.js";
import Button from "../components/Button.js";

export default class GameOver extends Screen {
	constructor(args) {
		super(args);
		const { left, width } = this.playground;
		const gameOverText = new Text({
			renderer: this.renderer,
			top: this.playground.top + 200,
			left,
			width,
			height: fontSizes[60].height,
			size: 60,
			text: "GAME OVER"
		});
		const startButton = new Button({ renderer: this.renderer, top: this.playground.height - 100, left, width, height: fontSizes[20].height, size: 20, text: "CLICK OR TOUCH TO START", color: "GreenYellow" });
		startButton.action = this.processStartButton.bind(this);
		this.playground.add(gameOverText);
		this.playground.add(startButton);
	}

	start() {
		const gotHighScore = this.game.highScores.setHighScore(this.game.scoreboard.getScore(), 'MPS');
		console.log(gotHighScore);
		if (gotHighScore) {
			this.game.scoreboard.setHighScore(gotHighScore.score, gotHighScore.initials);
		}
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
