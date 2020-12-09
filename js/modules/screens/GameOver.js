import Screen from "./Screen.js";
import GameOverText from "./../components/GameOverText.js";
import { fontSizes } from "./../game/params.js";

export default class GameOver extends Screen {
	constructor(args) {
		super(args);
		this.gameOverText = new GameOverText({
			renderer: this.renderer,
			top: this.playground.top + 200,
			left: this.playground.left,
			width: this.playground.width,
			height: fontSizes[60].height,
			size: 60
		});
		this.playground.add(this.gameOverText);
	}

	start() {
		this.scoreboard.draw();
		this.playground.draw();
	}

}
