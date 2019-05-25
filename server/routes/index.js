//Main route file for each routes

const express = require("express");
const router = express.Router();
const users = require("./users");
const events = require("./events");

router.use("/users", users);
router.use("/events", events);

module.exports = router;
