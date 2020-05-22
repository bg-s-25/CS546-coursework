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

/* GET route for bands/ */
router.get("/", async (_, res) => {
  try {
    let bands = await bandData.getAllBands()

    // convert album ids to objects containing album information
    for (let curBand = 0; curBand < bands.length; ++curBand) {
      let albumsWithInfo = []
      for (let i = 0; i < bands[curBand].albums.length; ++i) {
        albumsWithInfo.push(await albumData.getAlbum(bands[curBand].albums[i]))
      }
      bands[curBand].albums = albumsWithInfo
    }
    
    res.json(bands)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Not found" })
  }
})

/* GET route for bands/{id} */
router.get("/:id", async (req, res) => {
  try {
    let band = await bandData.getBand(req.params.id)

    // convert album ids to objects containing album information
    let albumsWithInfo = []
    for (let i = 0; i < band.albums.length; ++i) {
      albumsWithInfo.push(await albumData.getAlbum(band.albums[i]))
    }
    band.albums = albumsWithInfo

    res.json(band)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Not found" })
  }
})

/* Check if the request body has the correct format */
function goodReq(body) {
  const fields = ["bandName", "bandMembers", "yearFormed", "genres", "recordLabel"]
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

/* POST route for bands/ */
router.post("/", async (req, res) => {
  try {
    if (!req.body || !goodReq(req.body)) {
      res.status(400).json({ message: "Incorrect format of request body" })
    } else {
      // create new band with request data & return it
      const newBand = await bandData.addBand(req.body.bandName, req.body.bandMembers, req.body.yearFormed, req.body.genres, req.body.recordLabel)
      res.json(newBand)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json( {message: "Could not post band"} )
  }
})

/* PUT route for bands/{id} */
router.put("/:id", async (req, res) => {
  try {
    if (!goodReq(req.body)) {
      res.status(400).json({ message: "Incorrect format of request body" })
    } else {
      // try to get band for albums, update band
      const gotBand = await bandData.getBand(req.params.id)
      let updatedBand = await bandData.updateBand(req.params.id, req.body.bandName, req.body.bandMembers, req.body.yearFormed, req.body.genres, req.body.recordLabel, gotBand.albums)

      // convert album ids to objects containing album information
      let albumsWithInfo = []
      for (let i = 0; i < updatedBand.albums.length; ++i) {
        albumsWithInfo.push(await albumData.getAlbum(updatedBand.albums[i]))
      }
      updatedBand.albums = albumsWithInfo

      res.json(updatedBand)
    }
  } catch (err) {
    console.error(err)
    res.status(404).json( {message: "Could not update band"} )
  }
})

/* DELETE route for bands/{id} */
router.delete("/:id", async (req, res) => {
  try {
    // try to get band
    let gotBand = await bandData.getBand(req.params.id)

    // convert album ids to objects containing album information, also remove each album associated with the band
    let albumsWithInfo = []
    for (let i = 0; i < gotBand.albums.length; ++i) {
      albumsWithInfo.push(await albumData.getAlbum(gotBand.albums[i]))
      await albumData.removeAlbum(gotBand.albums[i])
    }
    gotBand.albums = albumsWithInfo

    // delete the band & return it
    await bandData.removeBand(req.params.id)
    res.json({ deleted: true, data: gotBand })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: "Could not delete band"} )
  }
})

module.exports = router
