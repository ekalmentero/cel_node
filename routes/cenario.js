var express = require("express");
var router = express.Router();
var cenarioController = require("../controller/cenario.controller");

/* GET cenário listing. */
router.get("/", cenarioController.viewAll);
router.put('/',cenarioController.updateCenario)
router.put("/:id/atores/:idator", cenarioController.updateAtor);
router.put("/:id/contexto/:idcontexto", cenarioController.updateContexto);
router.put("/:id/episodio/:idepisodio", cenarioController.updateEpisodio);
router.put('/:id/execao/:id_exec',cenarioController.updateExec);
router.put('/:id/recurso/:id_recurso',cenarioController.updateRecursos)
router.delete("/:id", cenarioController.delete);
module.exports = router;
