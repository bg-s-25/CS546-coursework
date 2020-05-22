/**
    Title  : CS 546 A - Lab 4
    Desc   : Animal Farm [MongoDB]
    Name   : Bobby Georgiou
    Date   : 02/26/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const { ObjectId } = require('mongodb')
const mongoCollections = require('./../mongoCollections')
const animals = mongoCollections.animals

/* Create a new animal and insert the new object into the collection */
async function create(name, animalType) {
    if (!name || typeof name !== 'string') throw "Error: Name not provided"
    if (!animalType || typeof animalType !== 'string') throw "Error: Animal type not provided"

    // retrieve collection
    const animalCol = await animals()

    let newAnimal = {
        name: name,
        animalType: animalType
    }

    // try to insert
    const insertResult = await animalCol.insertOne(newAnimal)
    if (insertResult.insertedCount == 0) throw "Error: Could not create the animal"

    // return inserted object
    return await get(insertResult.insertedId.toString())
}

/* Get all animal objects from the collection */
async function getAll() {
    // retrieve collection, query all, convert to array
    const animalCol = await animals()
    const animalLst = await animalCol.find({}).toArray()
    return animalLst
}

/* Get an animal object from the collection based on id */
async function get(id) {
    if (!id || typeof id !== 'string') throw "Error: Id not specified"
    const objId = ObjectId.createFromHexString(id)
    
    // retrieve collection
    const animalCol = await animals()

    // try to get
    const animal = await animalCol.findOne({ _id: objId })
    if (animal === null) throw `Error: No animal with id ${id}`

    // return object
    return animal
}

/* Remove an animal object from the collection based on id */
async function remove(id) {
    if (!id || typeof id !== 'string') throw "Error: Id not specified"
    const objId = ObjectId.createFromHexString(id)

    // retrieve collection
    const animalCol = await animals()

    // try to get
    const animal = await animalCol.findOne({ _id: objId })
    if (animal === null) throw `Error: No animal with id ${id}`

    // try to delete
    const deletionResult = await animalCol.deleteOne({ _id: objId })
    if (deletionResult.deletedCount === 0) {
        throw `Error: Could not remove the animal with id ${id}`
    } else {
        return animal
    }
}

/* Update the name of an animal object in the collection based on id */
async function rename(id, newName) {
    if (!id || typeof id !== 'string') throw "Error: Id not specified"
    if (!newName || typeof newName !== 'string') throw "Error: New name not provided"
    const objId = ObjectId.createFromHexString(id)

    // retrieve collection
    const animalCol = await animals()

    // try to get
    const animal = await animalCol.findOne({ _id: objId })
    if (animal === null) throw `Error: No animal with id ${id}`

    let updatedAnimal = {
        name: newName,
        animalType: animal.animalType
    }

    // try to update
    const updateResult = await animalCol.updateOne({ _id: objId }, { $set: updatedAnimal })
    if (updateResult.modifiedCount === 0) {
        throw `Error: Could not rename the animal with id ${id}`
    }

    return await get(id)

}

module.exports = {create, getAll, get, remove, rename}
