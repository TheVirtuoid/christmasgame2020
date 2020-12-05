import Screen from "./Screen.js";
// import RunRunSanta from "./../components/RunRunSanta.js";
// import StartButton from "../components/StartButton.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
	}

	start() {
		this.scoreBoard.draw();
		this.playground.draw('runRunSanta');
	}
}
