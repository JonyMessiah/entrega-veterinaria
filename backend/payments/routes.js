const express = require("express");
const router = express.Router();
const controller = require('./controller');
const { middlewareAuthentication } = require("../_common/middleware/authentication");

router.post('/add', middlewareAuthentication, controller.paymentAdd);
router.get('/list', middlewareAuthentication, controller.paymentsList);

module.exports = router;