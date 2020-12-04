export default class Score {
	constructor(initialValue = 0) {
		this.score = initialValue;
	}

	add(number) {
		this.score += number;
	}


}
