/** Class for containing the graphics drawn below the scoreboard (where the game is played) */
export default class Playground {
	/**
	 * Construct a new Playground instance.
	 * @param {Object} args - key/value collection of arguments.
	 * @param {Renderer} args.renderer - the Renderer instance
	 * @param {Number} args.top - upper left corner for start of playground (Y-axis)
	 * @param {Number} args.left - upper left corner for start of playground (X-axis)
	 * @param {Number} args.width - width of playground
	 * @param {Number} args.height - height of playground
	 */
	constructor(args) {
		const { renderer, top, left, width, height } = args;
		this.top = top;
		this.left = left;
		this.width = width;
		this.height = height;
		this.renderer = renderer;
		this.components = [];
		this.clear();
	}

	/**
	 * Draw the playground. Loop through all the added components
	 */
	draw() {
		this.components.forEach( component => component.draw() );
	}

	/**
	 * Erase the playground. Erase each added component
	 */
	erase() {
		this.components.forEach( component => component.erase() );
	}

	/**
	 * Add a component to the playground
	 * @param {Component} component - the component to add
	 */
	add(component) {
		this.components.push(component);
	}

	/**
	 * Erase the playground and clear out all the components.
	 */
	clear() {
		this.erase();
		this.components = [];
	}
}
