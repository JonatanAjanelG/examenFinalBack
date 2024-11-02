let express = require('express');
let router = express.Router();

const Proyecto = require('../controllers/proyecto.controller.js');

router.post('/api/proyecto', Proyecto.create);
router.get('/api/proyectos', Proyecto.retrieveAllProyectos);
router.get('/api/proyectos/:id', Proyecto.getProyectoById);
router.put('/api/proyectos/:id', Proyecto.updateProyectoById);
router.delete('/api/proyectos/:id', Proyecto.deleteProyectoById);

module.exports = router;
