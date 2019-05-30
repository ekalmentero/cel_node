var express = require('express');
var router = express.Router();
var cenarioController = require('../controller/cenario.controller');


/* GET cenário listing. */
router.get('/', cenarioController.viewAll);

module.exports = router;