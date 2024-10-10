const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcyrpt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const JWTscret = "ommanon@rayanharharmahadev#";

router.post('/CreateUser', [
    body('email').isEmail().withMessage('Invalid email'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const salt = await bcyrpt.genSalt(10);
    let secPassword = await bcyrpt.hash(req.body.password,salt)
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.geolocation,
        });
        console.log("success");
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
});
router.post('/Login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ error: "User not found." });
        }

        const isPasswordValid = await bcyrpt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password." });
        }

        const tokenData = { user: { id: userData.id } };
        const authToken = JWT.sign(tokenData, JWTscret, { expiresIn: '1h' });

        console.log("Token generated:", authToken); // Log the token for debugging

        return res.json({ success: true, authToken }); // Send the token back

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred during login." });
    }
});



module.exports = router;
