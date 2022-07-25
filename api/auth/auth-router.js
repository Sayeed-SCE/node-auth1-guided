const bcrypt = require('bcryptjs');

const express = require('express');

const Users = require('../users/users-model');

const router = express.Router();

function validateUser(req, res, next) {
    let { username, password } = req.body;
    if(typeof username != 'string' || username.trim() === '') {
        next({ status: 400, message: 'missing username' });
        return;
    } else if(typeof password != 'string') {
        next({ status: 400, message: 'missing password' });
        return;
    }

    req.user = {
        username: username.trim(),
        password,
    };

    next();
}

async function validateUserNotExists(req, res, next) {
    const result = await Users.findBy({ username: req.user.username }).first();
    if(result != null) {
        next({ status: 400, message: 'username unavailable' });
        return;
    }

    next();
}



router.post('/register', validateUser, validateUserNotExists, async (req, res, next) => {
    const { username, password } = req.body;

    const hash = bcrypt.hashSync(password, 12);
    const result = await Users.add({ username, password: hash });

    res.status(201).json({ message: `You are now registered, ${username}!` });
});

router.post('/login', validateUser, async (req, res, next) => {
    try {
        const { username, password } = req.user;

        const result = await Users.findBy({ username }).first();
        
        if(result == null || !bcrypt.compareSync(password, result.password)) {
            next({ status: 401, message: 'invalid credentials' });
            return;
        }

        req.session.loggedInUser = result;

        res.json({ message: `You are now logged in, ${username}` });
    } catch(err) {
        next(err);
    }
});

// /logout

module.exports = router;