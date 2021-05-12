const Pet = require('./Pet');
const Bone = require('../PetFoods/Bone');

class Dog extends Pet {
	constructor(name) {
		super(name, Bone);
	}

	shout() {
		console.log('Waf');
	}
}

module.exports = Dog;
