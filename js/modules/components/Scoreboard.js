import Health from "./Health.js";
import ScoreCard from "./ScoreCard.js";
import HighScore from "./HighScore.js";

export default class Scoreboard {
	constructor(args) {
		const { renderer } = args;
		this.health = new Health({ renderer });
		this.scoreCard = new ScoreCard({ renderer });
		this.highScore = new HighScore({ renderer });
	}

	draw() {
		this.health.draw();
		this.scoreCard.draw();
		this.highScore.draw();
	}

	addScore(score) {
		this.scoreCard.add(score);
	}
}