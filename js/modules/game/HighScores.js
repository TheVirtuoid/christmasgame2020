export default class HighScores {
	/**
	 * Construct a new array of storing High Scores.
	 * Loads from localStorage, or creates a new instance into localStorage
	 */
	constructor() {
		if (localStorage.highScores) {
			this.scores = JSON.parse(localStorage.highScores);
		} else {
			this.scores = [
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' },
				{ score: 0, initials: 'AAA' }
			]
			localStorage.highScores = JSON.stringify(this.scores);
		}
	}

	/**
	 * Sets the new High Score
	 * @param {Number} score - possible new high score
	 * @param {String} initials - possible new initials
	 * @returns {{score: number, initials: string}|null} This new high score or null is the score submitted is not a high score.
	 */
	setHighScore(score, initials) {
		const index = this.scores.findIndex( highScore => score > highScore.score);
		if (index !== -1) {
			this.scores.splice(index, 0, { score, initials });
			this.scores.pop();  // remove 11th score
			localStorage.highScores = JSON.stringify(this.scores);
			return this.scores[index];
		} else {
			return null;
		}
	}

	/**
	 * Checks for a high score
	 * @param {Number} score - the score to check
	 * @returns {boolean} - True if the score is indeed a high score.
	 */
	isHighScore(score) {
		return score >= this.scores[0].score;
	}

}
