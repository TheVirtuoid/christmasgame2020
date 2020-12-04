import Screen from "./Screen.js";
import HighScore from "./../components/HighScore.js";
import Score from "./../components/Score.js";
import Health from "./../components/Health.js";
import RunRunSanta from "./../components/RunRunSanta.js";
import StartButton from "../components/StartButton.js";

export default class Intro extends Screen {
	constructor(args) {
		super(args);
		this.highScore = new HighScore({ renderer: this.renderer });
		this.score = new Score({ renderer: this.renderer });
		this.health = new Health({ renderer: this.renderer });
		this.runRunSanta = new RunRunSanta({ renderer: this.renderer });
		this.startButton = new StartButton({ renderer: this.renderer});
	}

	start() {
		this.highScore.draw();
		this.score.draw();
		this.health.draw();
		this.runRunSanta.draw();
		this.startButton.draw();
	}
}
