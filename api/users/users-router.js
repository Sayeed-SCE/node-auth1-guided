const router = require("express").Router()

const Users = require("./users-model.js")

router.get("/", (req, res, next) => {
  // if(userIsNotLoggedIn) {
  //   next({ message: 'You must be logged in!' });
  //   return;
  // }

  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

module.exports = router
