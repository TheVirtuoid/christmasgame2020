import Screen from "./Screen.js";
import Text from "./../components/Text.js";
import { fontSizes } from "../game/params.js";
import Button from "../components/Button.js";
import Up from "../components/buttons/Up.js";
import Down from "../components/buttons/Down.js";

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

		this.initial1 = null;
		this.initial2 = null;
		this.initial3 = null;
		this.initialRange = "ABDEFGHIJKLMNOPQRSTUVWXYZ";

		this.up1 = null;
		this.up2 = null;
		this.up3 = null;
		this.down1 = null;
		this.down2 = null;
		this.down3 = null;
	}

	start() {
		const isHighScore = this.game.highScores.isHighScore(this.game.scoreboard.getScore());
		if (isHighScore) {
			const height = 30;
			const width = 30;
			const size = 30;
			const renderer = this.renderer;
			let top = this.playground.top + 200 + fontSizes[60].height + 60;
			const youGotHighScoreText = new Text({
				renderer: this.renderer,
				top,
				left: this.playground.left,
				width: this.playground.width,
				height: fontSizes[30].height,
				size: 30,
				text: "YOU GOT HIGH SCORE!"
			});
			this.playground.add(youGotHighScoreText);

			top += fontSizes[30].height + 20;
			const left = this.playground.left + 125;
			const color = "white";
			const justify = "left";
			let image = this.game.remoteAssets.get('up').image;
			this.up1 = new Up({ renderer, image, top, left });
			this.up2 = new Up({ renderer, image, top, left: left + width + 30 });
			this.up3 = new Up({ renderer, image, top, left: left + width * 2 + 60 });
			this.up1.action = this.upInitial1.bind(this);
			top += height + 10;
			this.initial1 = new Text({ renderer, size, width, justify, top, left: left + 6, text: 'A'});
			this.initial2 = new Text({ renderer, size, width, justify, top, left: left + width + 36, text: 'A'});
			this.initial3 = new Text({ renderer, size, width, justify, top, left: left + width * 2 + 66, text: 'A'});
			this.playground.add(this.initial1);
			this.playground.add(this.initial2);
			this.playground.add(this.initial3);
			top += height + 10;
			image = this.game.remoteAssets.get('down').image;
			this.down1 = new Down({ renderer, image, top, left });
			this.down2 = new Down({ renderer, image, top, left: left + width + 30 });
			this.down3 = new Down({ renderer, image, top, left: left + width * 2 + 60 });
			this.playground.add(this.up1);
			this.playground.add(this.up2);
			this.playground.add(this.up3);
			this.playground.add(this.down1);
			this.playground.add(this.down2);
			this.playground.add(this.down3);

		}
/*
		const gotHighScore = this.game.highScores.setHighScore(this.game.scoreboard.getScore(), 'MPS');
		if (gotHighScore) {
			this.game.scoreboard.setHighScore(gotHighScore.score, gotHighScore.initials);
		}
*/
		this.scoreboard.draw();
		this.playground.draw();
	}

	stop() {
		this.playground.erase();
		this.playground.clear();
		if (this.up1) this.up1.stop();
		if (this.up2) this.up2.stop();
		if (this.up3) this.up3.stop();
		if (this.down1) this.down1.stop();
		if (this.down2) this.down2.stop();
		if (this.down3) this.down3.stop();
	}


	processStartButton(event) {
		this.game.switchScreens('play');
	}

	upInitial1(event) {
		this.initial1 = this.getNextInitial(this.initial1);
		this.initial1.draw();
	}

	getNextInitial(initial) {
		let index = this.initialRange.indexOf(initial.text) + 1;
		index = index === this.initialRange.length ? 0 : index;
		initial.text = this.initialRange.charAt(index);
		return initial;
	}

}
