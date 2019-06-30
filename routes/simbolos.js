var express = require('express');
var router  = express.Router();
var simbolo_controller = require ('../controllers/simbolos')
router.post('/create', simbolo_controller.simbolo_create);
router.get('/:simbolo_id/get',simbolo_controller.simbolo_get)
router.put('/:simbolo_id/update',simbolo_controller.simbolo_update)
router.delete('/:simbolo_id/delete_sinonimo',simbolo_controller.update_delete_sinonimo)
router.delete('/:simbolo_id/delete_todos_sinonimos',simbolo_controller.update_delete_todos_sinonimos)
router.delete('/:simbolo_id/delete', simbolo_controller.simbolo_delete);
module.exports = router;
