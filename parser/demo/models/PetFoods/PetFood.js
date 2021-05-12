class PetFood {
	constructor(name) {
		if (new.target === PetFood) {
			throw new Error('Cannot construct PetFood instances directly');
		}
		this.name = name;
	}
}

module.exports = PetFood;
