/**
    Title  : CS 546 A - Lab 6
    Desc   : Band Application [MongoDB, API server]
    Name   : Bobby Georgiou
    Date   : 03/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const { ObjectId } = require('mongodb')
const mongoCollections = require('../config/mongoCollections')
const albums = mongoCollections.albums
const bands = require('./bands')

/* Add a new album to the database */
async function addAlbum(title, author, songs) {
    if (!title || typeof title != 'string') throw "Error: Album title not specified"
    if (!author || typeof author != 'string') throw "Error: Album author not specified"
    if (!songs || !Array.isArray(songs) || songs.length == 0) {
        throw "Error: Album songs not specified"
    }

    // verify that the author band exists
    let gotBand = await bands.getBand(author)

    // get collection
    const albumCollection = await albums()
    
    let newAlbum = {
        title, author, songs
    }

    // insert & get by id
    const insertResult = await albumCollection.insertOne(newAlbum)
    if (insertResult.insertedCount === 0) throw "Error: Could not add the album"

    // insert the album id in the author band's albums
    gotBand.albums.push(insertResult.insertedId.toString())
    await bands.updateBand(gotBand._id.toString(), gotBand.bandName, gotBand.bandMembers, gotBand.yearFormed, gotBand.genres, gotBand.recordLabel, gotBand.albums)

    return await getAlbum(insertResult.insertedId.toString())
}

/* Get all albums & print as array */
async function getAllAlbums() {
    const albumCollection = await albums()
    const albumLst = await albumCollection.find({}).toArray()
    return albumLst
}

/* Get album by id */
async function getAlbum(id) {
    if (!id) throw "Error: Id not specified"
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const albumCollection = await albums()

    // try to get
    const gotAlbum = await albumCollection.findOne({ _id: objId })
    if (gotAlbum === null) throw "Error: No album with that id"

    return gotAlbum
}

/* Update an album by id */
async function updateAlbum(id, title, author, songs) {
    if (!id) throw "Error: Album id not specified"
    if (!title || typeof title != 'string') throw "Error: Album title not specified"
    if (!author || typeof author != 'string') throw "Error: Album author not specified"
    if (!songs || !Array.isArray(songs) || songs.length == 0) {
        throw "Error: Album songs not specified"
    }
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const albumCollection = await albums()

    let updatedAlbum = {
        title, author, songs
    }

    // try to update
    const updateResult = await albumCollection.updateOne({ _id: objId }, { $set: updatedAlbum })
    if (updateResult.modifiedCount === 0) {
        throw "Error: Could not update the album"
    }

    return await this.getAlbum(id)
}

/* Remove an album by id */
async function removeAlbum(id) {
    if (!id) throw "Error: Album id not specified"
    const objId = ObjectId.createFromHexString(id)

    // get collection
    const albumCollection = await albums()

    // try to delete
    const deletionResult = await albumCollection.deleteOne({ _id: objId })
    if (deletionResult.deletedCount === 0) throw "Error: Could not delete the album"
    return true
}

module.exports = {addAlbum, getAllAlbums, getAlbum, updateAlbum, removeAlbum}
