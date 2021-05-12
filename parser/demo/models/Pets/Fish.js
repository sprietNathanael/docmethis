const Pet = require('./Pet');
const Pellet = require('../PetFoods/Pellet');

class Bloup extends Pet {
	constructor(name) {
		super(name, Pellet);
	}

	shout() {
		console.log('Miaou');
	}
}

module.exports = Bloup;
