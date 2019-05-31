var express = require("express");
var router = express.Router();
var cenarioController = require("../controller/cenario.controller");

/* GET cenário listing. */
router.get("/", cenarioController.viewAll);
router.put("/:id/atores/:idator", cenarioController.updateAtor);
router.put("/:id/contexto/:idcontexto", cenarioController.updateContexto);
router.put("/:id/episodio/:idepisodio", cenarioController.updateEpisodio);
router.delete("/:id", cenarioController.delete);
module.exports = router;
