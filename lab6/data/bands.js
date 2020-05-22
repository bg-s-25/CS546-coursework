/**
    Title  : CS 546 A - Lab 6
    Desc   : Band Application [MongoDB, API server]
    Name   : Bobby Georgiou
    Date   : 03/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const { ObjectId } = require('mongodb')
const mongoCollections = require('../config/mongoCollections')
const bands = mongoCollections.bands

/* Add a new band to the database */
async function addBand(bandName, bandMembers, yearFormed, genres, recordLabel) {
    if (!bandName || typeof bandName != 'string') throw "Error: Band name not specified"
    if (!bandMembers || !Array.isArray(bandMembers) || bandMembers.length == 0) {
        throw "Error: Band members not specified"
    }
    if (!yearFormed || typeof yearFormed != 'number') throw "Error: Year formed not specified"
    if (!genres || !Array.isArray(genres) || genres.length == 0) {
        throw "Error: Genres not specified"
    }
    if (!recordLabel || typeof recordLabel != 'string') throw "Error: Record label not specified"

    // get collection
    const bandCollection = await bands()
    
    let newBand = {
        bandName, bandMembers, yearFormed, genres, recordLabel, albums: []
    }

    // insert & get by id
    const insertResult = await bandCollection.insertOne(newBand)
    if (insertResult.insertedCount === 0) throw "Error: Could not add the band"

    return await getBand(insertResult.insertedId.toString())
}

/* Get all bands & print as array */
async function getAllBands() {
    const bandCollection = await bands()
    const bandList = await bandCollection.find({}).toArray()
    return bandList
}

/* Get band by id */
async function getBand(id) {
    if (!id) throw "Error: Id not specified"
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const bandCollection = await bands()

    // try to get
    const band = await bandCollection.findOne({ _id: objId })
    if (band === null) throw "Error: No band with that id"

    return band
}

/* Update a band by id */
async function updateBand(id, bandName, bandMembers, yearFormed, genres, recordLabel, albums) {
    if (!id) throw "Error: Band id not specified"
    if (!bandName || typeof bandName != 'string') throw "Error: Band name not specified"
    if (!bandMembers || !Array.isArray(bandMembers) || bandMembers.length == 0) {
        throw "Error: Band members not specified"
    }
    if (!yearFormed || typeof yearFormed != 'number') throw "Error: Year formed not specified"
    if (!genres || !Array.isArray(genres) || genres.length == 0) {
        throw "Error: Genres not specified"
    }
    if (!recordLabel || typeof recordLabel != 'string') throw "Error: Record label not specified"
    if (!albums || !Array.isArray(albums)) {
        throw "Error: Albums not specified"
    }
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const bandCollection = await bands()

    let updatedBand = {
        bandName, bandMembers, yearFormed, genres, recordLabel, albums
    }

    // try to update
    const updateResult = await bandCollection.updateOne({ _id: objId }, { $set: updatedBand })
    if (updateResult.modifiedCount === 0) {
        throw "Error: Could not update the band"
    }

    return await this.getBand(id)
}

/* Remove a band by id */
async function removeBand(id) {
    if (!id) throw "Error: Band id not specified"
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const bandCollection = await bands()

    // try to delete
    const deletionResult = await bandCollection.deleteOne({ _id: objId })
    if (deletionResult.deletedCount === 0) throw "Error: Could not delete the band"
    return true
}

module.exports = {addBand, getAllBands, getBand, updateBand, removeBand}
