export default class Score {
	constructor() {
		this.score = 0;
	}

	add(number) {
		this.score += number;
	}

	subtract(number) {
		this.score -= number;
	}

	draw(canvas) {}
}
