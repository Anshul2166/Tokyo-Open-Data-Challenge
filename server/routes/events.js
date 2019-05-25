const express = require('express');
const router = express.Router();
const _ = require('lodash');
const axios = require('axios');
let { PythonShell } = require('python-shell');
//==========================
//======== /api/user/....
//==========================

//function to check if the user is already logged in or not
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log('You are not logged in!');
		res.statusCode = 401;
		res.setHeader('Content-Type', 'application/json');
		res.json({ success: false, status: 'You are not logged in!' });
	}
}

router.get('/get-events', async (req, res, next) => {
	
});

module.exports = router;
