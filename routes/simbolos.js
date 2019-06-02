var express = require('express');
var router  = express.Router();
var simbolo_controller = require ('../controllers/simbolos')
router.post('/create', simbolo_controller.simbolo_create);
router.get('/:simbolo_id/destroy', simbolo_controller.simbolo_delete);
router.post('/:simbolo_id/sinonimos/create', simbolo_controller.sinonimo_create);
router.get('/:simbolo_id/sinonimos/:sinonimo_id/destroy', simbolo_controller.sinonimo_delete);

module.exports = router;
