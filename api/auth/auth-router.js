const bcrypt = require('bcryptjs');

const express = require('express');

const Users = require('../users/users-model');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);
    const result = await Users.add({ username, password: hash });

    res.status(201).json({ message: `You are now registered, ${username}!` });
});

// /login

// /logout

module.exports = router;