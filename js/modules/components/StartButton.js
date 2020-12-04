import Component from "./Component.js";

export default class StartButton extends Component {
	constructor(args) {
		super(args);
		this.processClickRange = {};
	}

	draw() {
		this.text = "CLICK/TOUCH HERE TO START";
		this.size = 24;
		const x1 = ( this.renderer.width - this.text.length * this.renderer.fontSizes[this.size].width) / 2;
		const y1 = 600;
		const x2 = x1 + this.text.length * this.renderer.fontSizes[this.size].width;
		const y2 = y1 + this.renderer.fontSizes[this.size].height;
		this.pos = { x: x1, y: y1 };
		super.draw(this.text, x2 - x1);
		this.processClickRange = { x1, x2, y1, y2 };
		this.renderer.canvas.addEventListener('click', this.processClick.bind(this));
/*
		this.renderer.ctx.strokeStyle = "green";
		this.renderer.ctx.lineWidth = 5;
		// this.renderer.ctx.arc(175, 575, 20, 0, Math.PI * 2, true);
		// this.renderer.ctx.arc(175, 575, 20, 0, Math.PI / 2 + Math.PI, true);
		this.renderer.ctx.arc(175, 575, 20, Math.PI / 2 + Math.PI, Math.PI / 2, true);

		this.renderer.ctx.arcTo(400, 595, 400, 545, 20);
		this.renderer.ctx.stroke();
*/
	}

	processClick (event) {
		const { x1, x2, y1, y2 } = this.processClickRange;
		const hitX = event.offsetX >= x1 && event.offsetX <= x2;
		const hitY = event.offsetY >= y1 && event.offsetY <= y2;
		if (hitX && hitY) {
			console.log('HIT!');
		} else {
			console.log('MISS!');
		}
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
