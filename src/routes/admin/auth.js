const express = require('express');
const { signup, signin, requireSignin } = require('../../control/admin/auth');
const router = express.Router();


router.post('/admin/signup',signup);
router.post('/admin/signin',signin);



module.exports = router ;