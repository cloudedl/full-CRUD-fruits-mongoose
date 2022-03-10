////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////
// Routes
/////////////////////////////////////////


// two sign up routes
// get to render the signup form
router.get('/signup', (req, res) => {
    res.render('users/signup')
})
// post to send the signup info
router.post('/signup', async (req, res) => {
    // console.log('this is initial req.body in signup', req.body)
    // first encrypt our password
    req.body.password = await bcrypt.hash(
        req.body.password, 
        await bcrypt.genSalt(10)
    )
    // console.log('req.body after hash', req.body)
    // create a new user
    User.create(req.body)
        // if created successfully redirect to login
        .then(user => {
            res.redirect('/user/login')
        })
        // if an error occurs, send err
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})


// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("users/login.liquid")
})

router.post("/login", async (req, res) => {
        // get the data from the request body
        const { username, password } = req.body
        // search for the user
        User.findOne({ username })
          .then(async (user) => {
            // check if user exists
            if (user) {
              // compare password
              const result = await bcrypt.compare(password, user.password)
              if (result) {

                // store some properties in the session object
                req.session.username = username;
                req.session.loggedIn = true;
                // redirect to fruits page if successful
                res.redirect("/fruits")
              } else {
                // error if password doesn't match
                res.json({ error: "password doesn't match" })
              }
            } else {
              // send error if user doesn't exist
              res.json({ error: "user doesn't exist" })
            }
          })
          .catch((error) => {
            // send error as json
            console.log(error)
            res.json({ error })
        })
})



// Signout Route 

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router