const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");

// load innput validation 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model
const User = require('../../models/User');

//@route POST api/users/register
//@desc Register user
//@access Public
router.post('/register', (req, res) => {
    // form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }

    user.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email Aready exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

// @route POST api/users/login
// @desc Login user and return JWT token 
// @access Public
router.post('/login', (req, res) => {
    // Form Validation

    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({ email }).then(user => {
        // check if user exists
        if (!user) {
            return res.status(404).json({
                emailnotfound: "email not found"
            });
        }

        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // user matched
                // create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                }

                // sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // one year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        })
                    }
                )
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password icorrect" });
            }
        })
    })
})

module.exports = router;
