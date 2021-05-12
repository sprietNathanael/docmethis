const Bone = require('./PetFoods/Bone');
const Mouse = require('./PetFoods/Mouse');
const Pellet = require('./PetFoods/Pellet');
const Pet = require('./Pets/Pet');
const Cat = require('./Pets/Cat');

class PetStore {
	constructor(name) {
		this.name = name;
		this.pets = [];
		this.petFoodsQuantity = [
			{
				food: new Bone(),
				quantity: 0,
			},
			{
				food: new Mouse(),
				quantity: 0,
			},
			{
				food: new Pellet(),
				quantity: 0,
			},
		];
	}

	addPet(pet) {
		this.pets.push(pet);
		return true;
	}

	editPet(petId, name) {
		if (typeof petId === 'number') {
			let pet = this.pets[petId];
			if (pet) {
				if (typeof name === 'string') {
					pet.name = name;
					return true;
				} else {
					throw new TypeError(`${name} is not a string`);
				}
			} else {
				throw new ReferenceError(`Pet ${petId} does not exists`);
			}
		} else {
			throw new TypeError(`${petId} is not a number`);
		}
	}

	removePet(petId) {
		if (typeof petId === 'number') {
			let pet = this.pets[petId];
			if (pet) {
				this.pets.splice(petId, 1);
				return true;
			} else {
				throw new ReferenceError(`Pet ${petId} does not exists`);
			}
		} else {
			throw new TypeError(`${petId} is not a number`);
		}
	}

	getAllPets() {
		return this.pets;
	}

	getPetById(id) {
		if (typeof id === 'number') {
			let pet = this.pets[id];
			if (pet) {
				return pet;
			} else {
				throw new ReferenceError(`Pet ${id} does not exists`);
			}
		} else {
			throw new TypeError(`${id} is not a number`);
		}
	}

	getPetOfType(type) {
		if (typeof type === 'function') {
			return this.pets.filter((pet) => pet instanceof type);
		} else {
			throw new TypeError(`${type} is not a Class`);
		}
	}

	addPetFood(type, quantity) {
		let petFoodToUpdate = this.petFoodsQuantity.find((petFood) => petFood.food instanceof type);
		if (petFoodToUpdate) {
			petFoodToUpdate.quantity += quantity;
		} else {
			throw new TypeError(`${type} is not a known PetFood`);
		}
	}

	getAllPetFoodQuantity() {
		return this.petFoodsQuantity;
	}

	getPetFoodQuantityByType(type) {
		return this.petFoodsQuantity.filter((food) => food instanceof type);
	}

	feedPet(petId, foodType) {
		if (this.pets[petId]) {
			let petFoodToEat = this.petFoodsQuantity.find((petFood) => petFood instanceof type);
			if (petFoodToEat) {
				if (petFoodToEat.quantity > 0) {
					try {
						this.pets[petId].feed(petFoodToEat.food);
						return true;
					} catch (error) {
						throw error;
					}
				} else {
					return false;
				}
			} else {
				throw new TypeError(`${foodType} is not a known PetFood`);
			}
		} else {
			throw new ReferenceError(`Pet ${petId} does not exists`);
		}
	}
}

module.exports = PetStore;
