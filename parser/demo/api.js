#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const port = 1337;

const Cat = require('./models/Pets/Cat');
const Fish = require('./models/Pets/Fish');
const Dog = require('./models/Pets/Dog');
const Bone = require('./models/PetFoods/Bone');
const Mouse = require('./models/PetFoods/Mouse');
const Pellet = require('./models/PetFoods/Pellet');
const PetStore = require('./models/PetStore');

const PetRouter = require('./routes/PetRouter');

console.log('--------');
const app = express();
app.use(express.json());
// app.use(bodyParser.json());

let myPetStore = new PetStore('MyWonderfulPetStore');

new PetRouter(app, myPetStore);

myPetStore.addPet(new Cat('felix'));
myPetStore.addPet(new Cat('blacky'));
myPetStore.addPet(new Cat('tiger'));
myPetStore.addPet(new Cat('ash'));

myPetStore.addPet(new Dog('dash'));
myPetStore.addPet(new Dog('k9'));
myPetStore.addPet(new Dog('brutus'));
myPetStore.addPet(new Dog('scrappy'));

myPetStore.addPet(new Fish('maurice'));
myPetStore.addPet(new Fish('pepito'));
myPetStore.addPet(new Fish('tim'));

myPetStore.addPetFood(Bone, 2);
myPetStore.addPetFood(Mouse, 2);
myPetStore.addPetFood(Pellet, 2);

console.log(myPetStore.getAllPets());

app.listen(port);
