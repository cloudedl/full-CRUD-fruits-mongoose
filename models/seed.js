///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connection")
const Fruit = require("./fruit")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ]

  // Delete all fruits
  Fruit.deleteMany({})
    .then((deletedFruits) => {
      // add the starter fruits
      Fruit.create(startFruits)
        .then((newFruits) => {
          // log the new fruits to confirm their creation
          console.log('here are the new seed fruits' , newFruits)
          db.close()
        })
        .catch((error) => {
          console.log(error)
          db.close()
        })
    })
    .catch((error) => {
      console.log(error)
      db.close()
    })

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
})