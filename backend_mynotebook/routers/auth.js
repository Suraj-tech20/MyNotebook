const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require('crypto');
// const cookie = require('cookie-parser');
const nodemailer = require('nodemailer');
const fetchuser = require('../middleware/fetchuser');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yash69sharma69@gmail.com',
        pass: 'Yash69@2000'
    }
});
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
            await User.remove({});
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
                    emailToken: crypto.randomBytes(64).toString('hex'),
                    isVerified: false
                });
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const jwttoken = await jwt.sign(data, JWT_SECRET);
                var mailOption = {
                    from: '"Verify your email" <My Notebook>',
                    to: user.email,
                    subject: 'mynotebook - verify your email',
                    html: `<h2> ${user.name}! Thanks for registering on our site </h2>
                    <h4> Please verify your mail to continue...</h4>
                    <a href="http://${req.headers.host}/auth/user/verify-email?token=${user.emailToken}"> Verify Your Email`
                }
                transporter.sendMail(mailOption, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({ error: "Please Enter a valid email.." })
                    } else {
                        console.log("Verification email is sent to your gmail account");
                    }
                })
                successful = true;
                res.json({ successful, jwttoken });

            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error: 'An unexpected error occured' });
        }
    }
);

// Route to verify email
router.get('/user/verify-email', async(req, res) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });
        console.log(user);
        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            console.log(user);
            res.redirect("http://localhost:3000/login");
        } else {
            res.redirect("http://localhost:3000/login");
        }
    } catch (err) {
        console.log(err);
        res.json({ verified: false });
    }
});

// // Route to resend verification email

// router.post('/user/resend-email', async(req, res) => {

// });

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
            if (!user.isVerified) {
                var mailOption = {
                    from: '"Verify your email" <My Notebook>',
                    to: user.email,
                    subject: 'mynotebook - verify your email',
                    html: `<h2> ${user.name}! Thanks for registering on our site </h2>
                    <h4> Please verify your mail to continue...</h4>
                    <a href="http://${req.headers.host}/auth/user/verify-email?token=${user.emailToken}"> Verify Your Email`
                }
                transporter.sendMail(mailOption, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.status(400).json({ error: "Please Enter a valid email.." })
                    } else {
                        console.log("Verification email is sent to your gmail account");
                    }
                })
                return res.status(401).json({ successful, error: 'Please verify your email. Verification link is sent to your mail..' });
            }

            // res.cookie('access-token', token);
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