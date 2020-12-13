import Health from "./Health.js";
import ScoreCard from "./ScoreCard.js";
import HighScore from "./HighScore.js";

export default class Scoreboard {
	/**
	 * Construct a new Scoreboard. This is the section at the top of the screen.
	 * @param {Object} args - key/value collection of arguments.
	 * @param {Renderer} args.renderer - the Renderer instance
	 * @param {Number} args.top - upper left corner for start of scoreboard(Y-axis)
	 * @param {Number} args.left - upper left corner for start of scoreboard (X-axis)
	 * @param {Number} args.width - width of scoreboard
	 * @param {Number} args.height - height of scoreboard
	 */
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

	/**
	 * Draw the scoreboard
	 */
	draw() {
		this.health.draw();
		this.scoreCard.draw();
		this.highScore.draw();
	}

	/**
	 * Add a score to the Score section
	 * @param {Number} score - the score to add
	 */
	addScore(score) {
		this.scoreCard.add(score);
	}

	/**
	 * Add health to the Health section
	 * @param {Number} health - the health to add
	 */
	addHealth(health) {
		this.health.add(health);
	}

	/**
	 * Set a new High Score
	 * @param {Number} value - the new score
	 * @param {String} initials - the initials
	 */
	setHighScore(value, initials) {
		this.highScore.score = value;
		this.highScore.initials = initials;
		this.highScore.draw();
	}

	/**
	 * Returns the current score
	 * @returns {number}
	 */
	getScore() {
		return this.scoreCard.score;
	}

	/**
	 * Reset the score and health
	 */
	reset() {
		this.scoreCard.reset();
		this.health.reset();
	}
}
