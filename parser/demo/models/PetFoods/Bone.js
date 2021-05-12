const PetFood = require('./PetFood');

class Bone extends PetFood {
	constructor(name) {
		super('bone');
	}
}

module.exports = Bone;
