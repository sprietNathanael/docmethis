const PetFood = require('./PetFood');

class Mouse extends PetFood {
	constructor(name) {
		super('mouse');
	}
}

module.exports = Mouse;
