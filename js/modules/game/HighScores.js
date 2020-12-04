export default class HighScores {
	constructor() {
		this.scores = [
			null, null, null, null, null,
			null, null, null, null, null
		]
	}

	setHighScore(score) {
		const index = this.scores.findIndex( highScore => null ? true : score > highScore.score);
		if (index !== -1) {
			// get initials
			const initials = "AAA";
			this.scores = this.scores.splice(index, 0, { score, initials });
			this.scores.pop();  // remove 11th score
		}
		return index;
	}

}
