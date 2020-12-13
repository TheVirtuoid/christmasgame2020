import Screen from "./Screen.js";
import { fontSizes } from "../game/params.js";
import Text from "../components/Text.js";
import Button from "../components/Button.js";

export default class Credits extends Screen {
	constructor(args) {
		super(args);
		const game = this.game;
		const renderer = this.renderer;
		let left = this.playground.left;
		const width = this.playground.width;
		let size = 40;
		let height = fontSizes[size].height;
		let top = this.playground.top + 75;
		let justify = "center";
		const creditsText = new Text({ renderer, top: top + 20, left, width, height, size, justify, text: 'CREDITS'});

		size = 20;
		justify = "left";
		top += height + 45;
		height = fontSizes[size].height;
		const text1 = new Text({ renderer, top, left, width, height, size, justify, text: 'Images by Vecteezy'});

		left += 10;
		size = 12;
		top += height + 8;
		height = fontSizes[size].height;
		const link1 = new Text({ renderer, top, left, width, height, size, justify, text: `Airplane: <https://www.vecteezy.com/free-vector/plane-window>`});
		const link2 = new Text({ renderer, top: top + (height + 2), left, width, height, size, justify, text: `Balloon: <https://www.vecteezy.com/free-vector/air-balloon>`});
		const link3 = new Text({ renderer, top: top + (height + 2) * 2, left, width, height, size, justify, text: `Bird: <https://www.vecteezy.com/free-vector/flying-bird>`});
		const link4 = new Text({ renderer, top: top + (height + 2) * 3, left, width, height, size, justify, text: `Meteor: <https://www.vecteezy.com/free-vector/earth>`});
		const link5 = new Text({ renderer, top: top + (height + 2) * 4, left, width, height, size, justify, text: `UFO: <https://www.vecteezy.com/free-vector/set>`});


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
		this.playground.add(link2);
		this.playground.add(link3);
		this.playground.add(link4);
		this.playground.add(link5);
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
