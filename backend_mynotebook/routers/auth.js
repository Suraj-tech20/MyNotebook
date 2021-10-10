const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SurajLetsdo@something';
const fetchuser = require('../middleware/fetchuser');
// =======ROUTES========

// ROUTE 1: /auth/createuser: 
router.post('/createuser',
    body('name', 'The name must contain at least 3 characters!').isLength({ min: 3 }),
    body('email', 'Please enter valid Email!').isEmail(),
    body('password', 'Password must contain at least 5 character!').isLength({ min: 5 }),
    async(req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        let successful = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Catch unusal error
        try {
            // Find user by email
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.json({ error: 'This email is already exit. Please enter a new email or login...' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const userPassword = await bcrypt.hash(req.body.password, salt);
                user = await User.create({
                    name: req.body.name,
                    password: userPassword,
                    email: req.body.email,
                });
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const jwttoken = await jwt.sign(data, JWT_SECRET);
                successful = true;
                res.json({ successful, jwttoken });
            }
        } catch (error) {
            console.log(error);
            return res.json({ error: 'An unexpected error occured' });
        }
    }
);


//Route 2: /auth/login: To authenticate user or login user
router.post('/login',
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
    async(req, res) => {
        let successful = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ successful, errors: errors.array() });
        }
        try {

            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ successful, error: 'Incorrect password or email' });
            }
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
            // console.log(checkPassword);
            if (!checkPassword) {
                return res.status(400).json({ successful, error: 'Incorrect password or email' });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const jwttoken = await jwt.sign(data, JWT_SECRET);
            successful = true;
            return res.json({ successful, jwttoken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ successful, error: 'An unexpected error occured' });
        }
    }
);

// ROUTE 3: /auth/getuser/ : using jwttoken fectch whole detail of user

router.post('/getuser', fetchuser, async(req, res) => {
    let successful = false;
    try {
        const user = await User.findById(req.user.id).select("-password");
        successful = true;
        return res.json({ successful, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ successful, error: "Internal error Occred" });
    }
});

module.exports = router;