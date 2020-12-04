import Component from "./Component.js";

export default class StartButton extends Component {
	constructor(args) {
		super(args);
	}

	draw() {
		this.renderer.ctx.strokeStyle = "green";
		this.renderer.ctx.lineWidth = 5;
		// this.renderer.ctx.arc(175, 575, 20, 0, Math.PI * 2, true);
		// this.renderer.ctx.arc(175, 575, 20, 0, Math.PI / 2 + Math.PI, true);
		this.renderer.ctx.arc(175, 575, 20, Math.PI / 2 + Math.PI, Math.PI / 2, true);

		this.renderer.ctx.arcTo(400, 595, 400, 545, 20);
		this.renderer.ctx.stroke();
	}

/*
		var x = 25 + j * 50; // x coordinate
		var y = 25 + i * 50; // y coordinate
		var radius = 20; // Arc radius
		var startAngle = 0; // Starting point on circle
		var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
		var anticlockwise = i % 2 !== 0; // clockwise or anticlockwise

		ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

		if (i > 1) {
			ctx.fill();
		} else {
			ctx.stroke();
	}
*/
}
