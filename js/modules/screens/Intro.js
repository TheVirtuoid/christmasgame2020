import Screen from "./Screen.js";
import HighScore from "./../components/HighScore.js";
import ScoreCard from "../components/ScoreCard.js";
import Health from "./../components/Health.js";
import RunRunSanta from "./../components/RunRunSanta.js";
import StartButton from "../components/StartButton.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
		this.runRunSanta = new RunRunSanta({ renderer: this.renderer });
		this.startButton = new StartButton({ renderer: this.renderer});
	}

	start() {
		this.scoreBoard.draw();
		this.runRunSanta.draw();
		this.startButton.draw();
	}
}
