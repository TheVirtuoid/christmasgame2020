import Health from "./Health.js";
import ScoreCard from "./ScoreCard.js";
import HighScore from "./HighScore.js";

export default class Scoreboard {
	constructor(args) {
		const { renderer, height, width, top, left } = args;
		const third = Math.floor(width / 3);
		this.width = width;
		this.height = height;
		this.top = top;
		this.left = left;
		this.scoreCard = new ScoreCard({
			renderer,
			top: top,
			left: left,
			height: height,
			width: third
		});
		this.highScore = new HighScore({
			renderer,
			top: top,
			left: left + third,
			height: height,
			width: third
		});
		this.health = new Health({
			renderer,
			top: top,
			left: left + third + third,
			height: height,
			width: third
		});
	}

	draw() {
		this.health.draw();
		this.scoreCard.draw();
		this.highScore.draw();
	}

	addScore(score) {
		this.scoreCard.add(score);
	}

	subtractHealth(health) {
		this.health.add(health * -1);
	}

	setHighScore(value, initials) {
		this.highScore.score = value;
		this.highScore.initials = initials;
		this.highScore.draw();
	}
}
