class Pet {
	constructor(name, food) {
		if (new.target === Pet) {
			throw new Error('Cannot construct Pet instances directly');
		}
		if (!name || typeof name !== 'string') {
			console.log(typeof name);
			throw new TypeError(`${name} is not a String`);
		}
		this.name = name;
		this.foodToEat = food;
	}

	shout() {
		throw new Error('Method shout must be overriden');
	}

	feed(food) {
		if (food instanceof this.foodToEat) {
			console.log(`Yum, this ${food.name} was delicious!`);
		} else {
			throw TypeError(`A ${this.constructor.name} can not eat some ${food.constructor.name}`);
		}
	}
}

module.exports = Pet;
