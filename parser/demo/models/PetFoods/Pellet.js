const PetFood = require('./PetFood');

class Pellet extends PetFood {
	constructor(name) {
		super('pellet');
	}
}

module.exports = Pellet;
