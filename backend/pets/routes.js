// Routes Pets

const express = require("express");
const { middlewareAuthentication } = require("../_common/middleware/authentication");
const router = express.Router();
const controller = require('./controller');

router.post('/add', middlewareAuthentication, controller.petAdd);
router.get('/list', middlewareAuthentication, controller.petsList);

module.exports = router;