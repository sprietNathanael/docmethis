const Pet = require('./Pet');
const Mouse = require('../PetFoods/Mouse');

class Cat extends Pet {
	constructor(name) {
		super(name, Mouse);
	}

	shout() {
		console.log('Miaou');
	}
}

module.exports = Cat;
