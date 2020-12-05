export default class Playground {
	constructor(args) {
		const { renderer, top, left, width, height } = args;
		this.top = top;
		this.left = left;
		this.width = width;
		this.height = height;
		this.renderer = renderer;
		this.components = [];
	}

	draw() {
		this.components.forEach( component => component.draw() );
	}

	erase() {
		this.components.forEach( component => component.erase() );
	}

	add(component) {
		this.components.push(component);
	}
}
