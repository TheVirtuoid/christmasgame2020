import Component from "./../components/Component.js";

export default class Reindeer extends Component {
	constructor (args) {
		super(args);
	}


	isHit (pos) {
		// hit determination
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.drawFill(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}
