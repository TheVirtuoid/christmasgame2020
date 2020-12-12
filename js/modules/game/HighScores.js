export default class HighScores {
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

	setHighScore(score) {
		const index = this.scores.findIndex( highScore => score > highScore.score);
		if (index !== -1) {
			// get initials
			const initials = "AAA";
			this.scores.splice(index, 0, { score, initials });
			this.scores.pop();  // remove 11th score
			localStorage.highScores = JSON.stringify(this.scores);
			return this.scores[index];
		} else {
			return null;
		}
	}

	isHighScore(score) {
		return score >= this.scores[0].score;
	}

}
