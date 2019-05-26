const express = require('express');
const router = express.Router();
const _ = require('lodash');
const axios = require('axios');
const CircularJSON=require('circular-json');
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
	try {
		const resp = await axios.get('http://127.0.0.1:5000/get-event');
		console.log(resp[1]);
		console.log("Hello");
		res.statusCode = 200;
		console.log("Hello 1");
		res.setHeader('Content-Type', 'application/json');
		console.log("Hello 2");
		res.json({
			success: true,
			resp: resp.data
		});
	} catch (err) {
		console.log("Inside errors");
		console.log(err);
		res.status(401).send(err);
	}
});

module.exports = router;
