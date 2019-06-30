var models  = require('../models');
var express = require('express');
var index_controller = require ('../controllers/index')
var router  = express.Router();

router.get('/', index_controller.simbolo_find);

module.exports = router;
