const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const { RegisterValidation, LoginValidation } = require('../Validation/');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	const { error } = RegisterValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const { name, email, password } = req.body;

	//check database if email is in use
	const isEmailInUse = await User.findOne({ email });
	if (isEmailInUse) return res.status(400).send('Email is on use please enter another valid email');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		password: hashPassword
	});
	try {
		const saveUser = await user.save();

		res.send({ user: saveUser._id });
	} catch (err) {
		res.status(400).send(err);
	}
});
router.post('/login', async (req, res) => {
	const { error } = LoginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return res.status(400).send('Please check your email or password');

	const validateUserPassword = await bcrypt.compare(password, user.password);
	if (!validateUserPassword) return res.status(400).send('Please check your password or email');

	//Everything is good and the email in use and password are ok
	//Create and assign toke
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

	res.header('auth-toke', token).send(token);
});

module.exports = router;
