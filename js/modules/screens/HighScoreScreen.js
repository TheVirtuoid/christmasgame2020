import Screen from "./Screen.js";
import Text from "../components/Text.js";
import {fontSizes} from "../game/params.js";
import Button from "../components/Button.js";

export default class HighScoreScreen extends Screen {
	/**
	 * Construct a High Score Screen
	 * @param {Object} args - key/value collection of properties
	 */
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
		this.scoreList = [];
		let top = this.playground.top + 100;
		const halfWidth = this.playground.width / 2 - 10;
		const height = fontSizes[30].height;
		const size = 30;
		this.game.highScores.scores.forEach( score => {
			this.scoreList.push(new Text({
				renderer: this.renderer,
				top: top,
				left: 0,
				width: halfWidth,
				height: height,
				size: size,
				justify: 'right',
				text: score.score.toString()
			}));
			this.scoreList.push(new Text({
				renderer: this.renderer,
				top: top,
				left: halfWidth + 20,
				width: halfWidth,
				height: height,
				size: size,
				justify: 'left',
				text: score.initials
			}));
			this.playground.add(this.scoreList[this.scoreList.length - 2]);
			this.playground.add(this.scoreList[this.scoreList.length - 1]);
			top += height + 10;
		});
		this.update();

		const action = {
			name: 'highScoreStartButton',
			routine: this.processStartButton.bind(this)
		}
		const startButton = new Button({
			game: this.game,
			renderer: this.renderer,
			top: this.playground.height - 100,
			left: this.playground.left,
			width: this.playground.width,
			height: fontSizes[20].height,
			size: 20,
			text: "CLICK OR TOUCH TO START",
			color: "GreenYellow",
			action
		});
		this.playground.add(startButton);
		this.timer = null;
	}

	/**
	 * Update the scores on the screen. This is normally called when there is a change in the high score
	 */
	update() {
		this.scoreList.forEach( score => score.erase());
		this.game.highScores.scores.forEach( (score, index) => {
			this.scoreList[index * 2].erase();
			this.scoreList[index * 2 + 1].erase();
			this.scoreList[index * 2].text = score.score.toString();
			this.scoreList[index * 2 + 1].text = score.initials;
		});
	}

	/**
	 * Start the high score screen. If nothing happens after 5 seconds, move on to the next screen
	 */
	start() {
		this.update();
		this.scoreboard.draw();
		this.playground.draw();
		this.timer = setTimeout(this.nextScreen.bind(this), 5000);
	}

	/**
	 * Stop the screen. NOTE: We need to fix super.erase() as it calls clear() and not erase()
 	 */
	stop() {
		this.playground.erase();
	}

	/**
	 * Go to the next screen.
	 */
	nextScreen() {
		this.timer = null;
		this.game.switchScreens('credits');
	}

	/**
	 * Process the start button
	 */
	processStartButton() {
		clearTimeout(this.timer);
		this.timer = null;
		this.game.switchScreens('play');
	}
}
