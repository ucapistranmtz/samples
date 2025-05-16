const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const { userSchema } = require ('../validations/user.schema')
const { createUser} = require('../controllers/user.controller');
 
router.post('/', validate({body:userSchema}), createUser);

module.exports = router;