/**
    Title  : CS 546 A - Lab 6
    Desc   : Band Application [MongoDB, API server]
    Name   : Bobby Georgiou
    Date   : 03/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const connection = require('../config/mongoConnection')
const bands = require('../data/bands')
const albums = require('../data/albums')

/* Populate the database */
async function main() {
    const db = await connection()

    // drop exisiting db
    db.dropDatabase()

    // add band1
    const band1 = await bands.addBand("Pink Floyd", ["Roger Waters", "David Gilmour", "Richard Wright", "Nick Mason"], 1965, ["Psychedelic Rock", "Classic Rock", "Rock"], "Columbia Records")

    // add albums to band1
    await albums.addAlbum("The Wall", band1._id.toString(), ["In the Flesh?", "The Thin Ice"])
    await albums.addAlbum("Animals", band1._id.toString(), ["Pigs on the Wing", "Dogs"])

    // add band2
    const band2 = await bands.addBand("Earth, Wind & Fire", ["Philip Bailey", "Verdine White", "Ralph Johnson"], 1969, ["R&B", "Soul", "Funk", "Disco"], "Warner Bros.")

    // add albums to band2
    await albums.addAlbum("The Best of Earth, Wind & Fire, Vol. 1", band2._id.toString(), ["September", "Shining Star"])

    // add band3
    const band3 = await bands.addBand("Lady Gaga", ["Stefani Germanotta", "RedOne"], 2001, ["Pop", "Dance-pop", "Electronic"], "Interscope")

    // add albums to band3
    await albums.addAlbum("The Fame", band3._id.toString(), ["Just Dance", "Poker Face", "Paparazzi", "Lovegame"])
    await albums.addAlbum("The Fame Monster", band3._id.toString(), ["Bad Romance", "Alejandro", "Telephone"])
    await albums.addAlbum("Born This Way", band3._id.toString(), ["Born This Way", "The Edge of Glory", "Judas", "Marry the Night"])

    // add band4
    const band4 = await bands.addBand("Test Band 1.0", ["You", "Me"], 2020, ["Rock"], "SIT")

    // add albums to band4
    await albums.addAlbum("First Album", band4._id.toString(), ["Felt", "Kinda", "Cute"])

	await db.serverConfig.close()
}

main()
