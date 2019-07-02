var express = require("express");
var router = express.Router();
var cenarioController = require("../controller/cenario.controller");

/* GET cenário listing. */
router.get("/", cenarioController.viewAll);
router.get("/:id/", cenarioController.view);
router.post("/", cenarioController.createCenario);
router.put('/',cenarioController.updateCenario)
router.put("/:id/atores/:idator", cenarioController.updateAtor);
router.put("/:id/contexto/:idcontexto", cenarioController.updateContexto);
router.put("/:id/episodio/:idepisodio", cenarioController.updateEpisodio);
router.put('/:id/execao/:id_exec',cenarioController.updateExec);
router.put('/:id/recurso/:id_recurso',cenarioController.updateRecursos)
router.put('/:id/updateSemEp',cenarioController.updateCenarioRemovendoEpisodios)
router.put('/:id/updateSemRec',cenarioController.updateCenarioRemovendoRecursos)
router.delete("/:id", cenarioController.delete);
module.exports = router;
