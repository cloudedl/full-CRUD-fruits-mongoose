////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// INDEX ROUTE
router.get('/', (req, res) => {
    // find the fruits
    Fruit.find({})
        // then render a template AFTER they're found
        .then(fruits => {
            console.log(fruits)
            res.render('fruits/index.liquid', { fruits })
        })
        // show an error if there is one
        .catch(error => {
            console.log(error)
            res.json({ error })
        })
})

// NEW ROUTE -> GET route that renders our page with the form
router.get('/new', (req, res) => {
    res.render('fruits/new')
})

//CREATE ROUTE -> POST route that actually calls the db and makes a new document
router.post('/', (req,res) => {
    console.log('this is the fruit to create', req.body)

    //check and set readyToEat into one line of code
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    console.log
   
    //now we're ready for mongoose to do its thing
    Fruit.create(req.body)
        .then(data => {
            console.log('this was returned from create', data)
            res.redirect('/fruits')
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

//EDIT ROUTE
router.get('/:id/edit', (req,res) => {
    // we need to get the Id
    const fruitId = req.params.id
    //find the fruit
    Fruit.findById(fruitId)
    //--render if there is a fruit
        .then(fruit => {
            res.render('fruits/edit.liquid', {fruit})
        })
    // error if no fruit
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})
// UPDATE ROUTE
router.put('/:id', (req,res) => {
    //get the id
    const fruitId = req.params.id
    //check and assign ready to eat property with correct value
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    //tell mongoose to update the fruit
    Fruit.findByIdAndUpdate(fruitId, req.body, {new: true})
        .then(fruit => {
            console.log('the updated fruit', fruit)
            res.redirect(`/fruits/${fruit.id}`)
        })
          // error if no fruit
          .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// SHOW ROUTE
router.get('/:id', (req,res) => {
    // first, we need to the id
    const fruitId = req.params.id
    // then we can find a fruit by it's id
    Fruit.findById(fruitId)
    // once found, we can render a view with the data
        .then(fruit => {
            res.render('fruits/show.liquid', {fruit})
        })
    // if there is an error, show that instead
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})


//DELETE ROUTE
router.delete('/:id', (req,res) => {
    //get fruit id
    const fruitId =req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(fruitId)
        .then(fruit => {
            console.log('this is the response from FBID', fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })

})
////////////////////////////////////////////
// Export Router
////////////////////////////////////////////
module.exports = router