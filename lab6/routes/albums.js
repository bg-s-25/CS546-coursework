/**
    Title  : CS 546 A - Lab 6
    Desc   : Band Application [MongoDB, API server]
    Name   : Bobby Georgiou
    Date   : 03/11/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const express = require('express')
const router = express.Router()
const data = require('../data')
const bandData = data.bands
const albumData = data.albums

/* GET route for albums/ */
router.get("/", async (_, res) => {
  try {
    const albumLst = await albumData.getAllAlbums()

    // convert band ids to objects containing band id & band name
    for (let i = 0; i < albumLst.length; ++i) {
      const gotBand = await bandData.getBand(albumLst[i].author)
      albumLst[i].author = {_id: albumLst[i].author, bandName: gotBand.bandName}
    }

    res.json(albumLst)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Not found" })
  }
})

/* GET route for albums/{id} */
router.get("/:id", async (req, res) => {
  try {
    let album = await albumData.getAlbum(req.params.id)

    // convert band id to object containing band id & band name
    const gotBand = await bandData.getBand(album.author)
    album.author = {_id: album.author, bandName: gotBand.bandName}

    res.json(album)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Not found" })
  }
})

/* Check if the request body has the correct format */
function goodReq(body) {
  const fields = ["title", "author", "songs"]
  let goodReq = true

  if (typeof body != 'object') goodReq = false
  if (Object.keys(body).length !== fields.length) goodReq = false
  
  if (goodReq) {
    // request body should have all the necessary fields
    for (n in fields) {
      if (!(body.hasOwnProperty(fields[n]))) goodReq = false
    }
  }

  return goodReq
}

/* POST route for albums/ */
router.post("/", async (req, res) => {
  try {
    if (!req.body || !goodReq(req.body)) {
      res.status(400).json({ message: "Incorrect format of request body" })
    } else {
      // create new album with request data
      let newAlbum = await albumData.addAlbum(req.body.title, req.body.author, req.body.songs)

      // convert band id to object containing band id & band name
      const gotBand = await bandData.getBand(newAlbum.author)
      newAlbum.author = {_id: newAlbum.author, bandName: gotBand.bandName}

      res.json(newAlbum)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json( {message: "Could not post album"} )
  }
})

/* PATCH route for albums/{id} */
router.patch("/:id", async (req, res) => {
  if (!req.body || !Object.keys(req.body).every((x) => x === 'newTitle' || x === 'newSongs')) {
    res.status(400).json({ message: "Incorrect format of request body" })
  } else {
    try {
      let gotAlbum = await albumData.getAlbum(req.params.id)
      for (n in req.body) {
        if (n === 'newTitle') {
          gotAlbum.title = req.body[n]
        } else if (n === 'newSongs') {
          gotAlbum.songs.push(req.body[n])
        }
      }

      // update the album with new info
      let updatedAlbum = await albumData.updateAlbum(req.params.id, gotAlbum.title, gotAlbum.author, gotAlbum.songs)

      // convert band id to object containing band id & band name
      const gotBand = await bandData.getBand(updatedAlbum.author)
      updatedAlbum.author = {_id: updatedAlbum.author, bandName: gotBand.bandName}

      res.json(updatedAlbum)
    } catch (err) {
      console.error(err)
      res.status(404).json({ message: "Could not update album"} )
    }
  }
})

/* DELETE route for albums/{id} */
router.delete("/:id", async (req, res) => {
  try {
    // try to get album
    let gotAlbum = await albumData.getAlbum(req.params.id)

    // convert band id to object containing band id & band name
    const gotBand = await bandData.getBand(gotAlbum.author)
    gotAlbum.author = {_id: gotAlbum.author, bandName: gotBand.bandName}

    // remove the album id from the author band
    await bandData.updateBand(gotBand._id.toString(), gotBand.bandName, gotBand.bandMembers, gotBand.yearFormed, gotBand.genres, gotBand.recordLabel, gotBand.albums.filter((x) => x != req.params.id))

    // delete the album & return it
    await albumData.removeAlbum(req.params.id)
    res.json({ deleted: true, data: gotAlbum })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Could not delete album"} )
  }
})

module.exports = router
