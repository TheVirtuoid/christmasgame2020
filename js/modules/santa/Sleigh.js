import Component from "./../components/Component.js";

export default class Sleigh extends Component {
	constructor(args) {
		super(args);
		this.image.height = this.height;
		this.image.width = this.width;
		this.color = "red";
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.drawImage(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}
