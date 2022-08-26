const express = require("express");
const router = express.Router();
const controller = require('./controller');
const { middlewareAuthentication } = require("../_common/middleware/authentication");

router.post('/register', controller.userRegister);
router.post('/register/admin', controller.adminRegister);
router.post('/login', controller.authLogin);
router.get('/me', middlewareAuthentication, controller.me);
router.get('/get', middlewareAuthentication, controller.userGet);

module.exports = router;