import Component from "./Component.js";

export default class StartButton extends Component {
	constructor(args) {
		super(args);
		this.clickRange = {
			x1: this.left,
			y1: this.top,
			x2: this.left + this.width,
			y2: this.top + this.height
		};
		this.color = "GreenYellow";
		this.text = "CLICK OR TOUCH TO START";
		this.clickActive = false;
		this.action = null;
		this.bindedClickFunction = this.processClick.bind(this);
	}

	erase() {
		if (this.clickActive) {
			this.renderer.canvas.removeEventListener('click', this.bindedClickFunction);
			this.clickActive = false;
		}
		super.erase();
	}

	draw() {
		super.draw(this.text);
		if (!this.clickActive) {
			this.renderer.canvas.addEventListener('click', this.bindedClickFunction);
			this.clickActive = true;
		}
	}

	processClick (event) {
		if (typeof this.action === 'function') {
			const { x1, x2, y1, y2 } = this.clickRange;
			const hitX = event.offsetX >= x1 && event.offsetX <= x2;
			const hitY = event.offsetY >= y1 && event.offsetY <= y2;
			if (hitX && hitY) {
				this.action(event);
			}
		}
	}

}
