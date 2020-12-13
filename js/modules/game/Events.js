export default class Events {
	constructor (args) {
		const { game } = args;
		this.game = game;
		this.actions = [];
		this.boundedClickEvent = this.processClick.bind(this);
	}

	add(actionToAdd) {
		if (!this.actions.some( action => action.name === actionToAdd.name)) {
			this.actions.push(actionToAdd);
		}
	}

	remove(actionToRemove) {
		this.actions = this.actions.filter( action => action.name !== actionToRemove.name);
	}

	start() {
		this.game.renderer.canvas.addEventListener('click', this.boundedClickEvent);
	}

	stop() {
		this.game.renderer.canvas.removeEventListener('click', this.boundedClickEvent);
	}

	processClick(event) {
		const { offsetX, offsetY } = event;
		this.actions.forEach( action => {
			if (typeof action.routine === 'function' && action.check) {
				// console.log(`-----checking ${action.name}`);
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
