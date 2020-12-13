export default class Events {
	/**
	 * Construct an Events class.
	 * @param {Object} args - key/value collection of properties
	 * @param {Game} args.game - the Game object
	 *
	 * All click events are handled here. We do this because the same HTML canvas is used
	 * throughout the game, and we don't want to have clicks in one screen affecting clicks
	 * in another screen.
	 */
	constructor (args) {
		const { game } = args;
		this.game = game;
		this.actions = [];
		this.boundedClickEvent = this.processClick.bind(this);
	}

	/**
	 * Add an action to the list of registered actions. Duplicates are ignored.
	 * @param actionToAdd
	 */
	add(actionToAdd) {
		if (!this.actions.some( action => action.name === actionToAdd.name)) {
			this.actions.push(actionToAdd);
		}
	}

	/**
	 * Remove an action from the list of registered actions.
	 * @param actionToRemove
	 */
	remove(actionToRemove) {
		this.actions = this.actions.filter( action => action.name !== actionToRemove.name);
	}

	/**
	 * Initiate the global click event.
	 */
	start() {
		this.game.renderer.canvas.addEventListener('click', this.boundedClickEvent);
	}

	/**
	 * Remove the global click event
	 */
	stop() {
		this.game.renderer.canvas.removeEventListener('click', this.boundedClickEvent);
	}

	/**
	 * Process a click event. Execute the routine in the action.routine property if found.
 	 * @param {Event} event - mouseclick/touch event
	 */
	processClick(event) {
		const { offsetX, offsetY } = event;
		this.actions.forEach( action => {
			if (typeof action.routine === 'function' && action.check) {
				const { x1, x2, y1, y2 } = action.clickZone;
				const hitX = offsetX >= x1 && offsetX <= x2;
				const hitY = offsetY >= y1 && offsetY <= y2;
				if (hitX && hitY) {
					action.routine(event);
				}
			}
		});
	}
}
