const router = require("express").Router()

const Users = require("./users-model.js")

router.get("/", (req, res, next) => {
  console.log(req.session);
  // if(userIsNotLoggedIn) {
  //   next({ message: 'You must be logged in!' });
  //   return;
  // }

  req.session.newData = 123;

  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

module.exports = router
