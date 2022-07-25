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

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    const result = await Users.findBy({ username }).first();
    
    if(!bcrypt.compareSync(password, result.password)) {
        res.status(401).json({ message: 'invalid credentials' });
        return;
    }

    res.json({ message: `You are now logged in, ${username}` });
});

// /logout

module.exports = router;