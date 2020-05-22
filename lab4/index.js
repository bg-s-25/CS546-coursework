/**
    Title  : CS 546 A - Lab 4
    Desc   : Animal Farm [MongoDB]
    Name   : Bobby Georgiou
    Date   : 02/26/2020
    Pledge : "I pledge my honor that I have abided by the Stevens Honor System."
 */

const connection = require('./mongoConnection')
const animals = require('./data/animals')

async function main() {
    // create + log Sasha
    const res1 = await animals.create('Sasha', 'Dog')
    .catch((err) => console.error(err))
    if (res1) console.log(res1)
    
    // create Lucy
    const res2 = await animals.create('Lucy', 'Dog')
    .catch((err) => console.error(err))
    
    // log all animals
    const res3 = await animals.getAll()
    .catch((err) => console.error(err))
    if (res3) console.log(res3)

    // create + log Duke
    const res4 = await animals.create('Duke', 'Walrus')
    .catch((err) => console.error(err))
    if (res4) console.log(res4)

    // rename Sasha -> Sashita
    const res5 = await animals.rename(res1._id.toString(), 'Sashita')
    .catch((err) => console.error(err))

    // log Sashita
    const res6 = await animals.get(res5._id.toString())
    .catch((err) => console.error(err))
    if (res6) console.log(res6)

    // remove Lucy
    const res7 = await animals.remove(res2._id.toString())
    .catch((err) => console.error(err))

    // log all animals
    const res8 = await animals.getAll()
    .catch((err) => console.error(err))
    console.log(res8)

    const db = await connection()
	await db.serverConfig.close()
}

main()
