import Screen from "./Screen.js";
import { fontSizes } from "../game/params.js";
import Text from "../components/Text.js";
import Button from "../components/Button.js";

export default class Credits extends Screen {
	constructor(args) {
		super(args);
		const game = this.game;
		const renderer = this.renderer;
		const left = this.playground.left;
		const width = this.playground.width;
		let size = 40;
		let height = fontSizes[size].height;
		let top = this.playground.top + 75;
		let justify = "center";
		const creditsText = new Text({ renderer, top: top + 20, left, width, height, size, justify, text: 'CREDITS'});
		const size20 = 20;
		const height20 = fontSizes[size20].height;
		const size18 = 18;
		const height18 = fontSizes[size18].height;
		const left10 = left + 10;

		justify = "left";
		top += height + 45;
		const text1 = new Text({ renderer, top, left, width, height: height20, size: size20, justify, text: 'All images by Vecteezy'});
		top += height20 + 8;
		const link1 = new Text({ renderer, top, left: left10, width, height: height18, size: size18, justify, text: `(https://www.vecteezy.com)`});

		top += height;
		const text2 = new Text({ renderer, top, left, width, height: height20, size: size20, justify, text: `All sounds by FreeSound`});
		top += height20 + 8;
		const link2 = new Text({ renderer, top, left: left10, width, height: height18, size: size18, justify, text: `(https://www.freesounds.org)`});

		top += height;
		const text3 = new Text({ renderer, top, left, width, height: height20, size: size20, justify, text: 'All else by me! TheVirtuoid'});
		top += height20 + 8;
		const link3 = new Text({ renderer, top, left: left10, width, height: height18, size: size18, justify, text: `(https://blog.thevirtuoid.com)`});

		const action = {
			name: 'creditsStartButton',
			routine: this.processStartButton.bind(this)
		}
		const startButton = new Button({
			game,
			renderer,
			top: this.playground.height - 100,
			left,
			width,
			height: fontSizes[20].height,
			size: 20,
			text: "CLICK OR TOUCH TO START",
			color: "GreenYellow",
			action
		});
		this.playground.add(creditsText);
		this.playground.add(text1);
		this.playground.add(link1);
		this.playground.add(text2);
		this.playground.add(link2);
		this.playground.add(text3);
		this.playground.add(link3);
		this.playground.add(startButton);

		this.timer = null;
	}

	processStartButton(event) {
		clearTimeout(this.timer);
		this.timer = null;
		this.game.switchScreens('play');
	}

	start() {
		super.start();
		this.timer = setTimeout( this.nextScreen.bind(this), 5000);
	}

	nextScreen() {
		this.timer = null;
		this.game.switchScreens('intro');
	}

	stop() {
		this.playground.erase();
	}
}
