const bcrypt = require('bcryptjs');

const express = require('express');

const router = express.Router();

router.post('/register', (req, res, next) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 16);
    console.log(hash);

    res.send();
});

// /login

// /logout

module.exports = router;