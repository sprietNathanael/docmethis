const Cat = require('../models/Pets/Cat');
const Fish = require('../models/Pets/Fish');
const Dog = require('../models/Pets/Dog');
const Pet = require('../models/Pets/Pet');

class PetRouter {
	constructor(app, petStore) {
		this.petStore = petStore;
		app.get('/pets', (req, res) => {
			try {
				let result = this.petStore.getAllPets().map((pet) => ({
					...pet,
					type: pet.constructor.name,
				}));
				res.status(200).send(result);
			} catch (error) {
				res.sendStatus(500);
			}
		});

		app.get('/pets/cats/', (req, res) => {
			try {
				let result = this.petStore.getPetOfType(Cat);
				res.status(200).send(result);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.get('/pets/dogs/', (req, res) => {
			try {
				let result = this.petStore.getPetOfType(Dog);
				res.status(200).send(result);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.get('/pets/fishs/', (req, res) => {
			try {
				let result = this.petStore.getPetOfType(Fish);
				res.status(200).send(result);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.get('/pets/:id', (req, res) => {
			let petId = parseInt(req.params.id);
			try {
				let result = this.petStore.getPetById(petId);
				res.status(200).send(result);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.post('/pets/cats/', (req, res) => {
			let data = req.body;
			try {
				this.petStore.addPet(new Cat(data.name));
				res.sendStatus(201);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.post('/pets/dogs/', (req, res) => {
			let data = req.body;
			try {
				this.petStore.addPet(new Dog(data.name));
				res.sendStatus(201);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.post('/pets/fishs/', (req, res) => {
			let data = req.body;
			try {
				this.petStore.addPet(new Fish(data.name));
				res.sendStatus(201);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.put('/pets/:id', (req, res) => {
			let id = parseInt(req.params.id);
			let data = req.body;
			try {
				this.petStore.editPet(id, data.name);
				res.sendStatus(200);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});

		app.delete('/pets/:id', (req, res) => {
			let id = parseInt(req.params.id);
			try {
				this.petStore.removePet(id);
				res.sendStatus(200);
			} catch (error) {
				if (error instanceof TypeError) {
					res.sendStatus(400);
				} else if (error instanceof ReferenceError) {
					res.sendStatus(404);
				} else {
					res.sendStatus(500);
				}
			}
		});
	}
}

module.exports = PetRouter;
