const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;

exports.create = (req, res) => {
    let proyecto = {};
    try {
        proyecto.titulo = req.body.titulo;
        proyecto.descricpcion = req.body.descricpcion;
        proyecto.completada = req.body.completada;
        proyecto.prioridad = req.body.prioridad;
        proyecto.asignado_a = req.body.asignado_a;
        proyecto.categorias = req.body.categorias;
        proyecto.costo_proyecto = req.body.costo_proyecto;

        // Crear el nuevo proyecto en la base de datos
        Proyecto.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto guardado con éxito, ID: " + result.id,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo crear este proyecto en la BD",
            error: error.message,
        });
    }
};

exports.retrieveAllProyectos = (req, res) => {
    Proyecto.findAll().then(proyectosInfos => {
        res.status(200).json({
            message: "Listado de Proyectos:",
            proyectos: proyectosInfos,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};

exports.getProyectoById = (req, res) => {
    Proyecto.findByPk(req.params.id).then(proyectoInfo => {
        if (!proyectoInfo) {
            return res.status(404).json({
                message: "No se encontró el proyecto con el ID: " + req.params.id,
            });
        }

        res.status(200).json({
            message: "El proyecto con el ID: " + req.params.id + " es:",
            proyecto: proyectoInfo,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};

exports.updateProyectoById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No se encontró ningún proyecto con el ID = " + proyectoId,
                error: "404",
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                descricpcion: req.body.descricpcion,
                completada: req.body.completada,
                prioridad: req.body.prioridad,
                asignado_a: req.body.asignado_a,
                categorias: req.body.categorias,
                costo_proyecto: req.body.costo_proyecto,
            };

            let result = await Proyecto.update(updatedObject, { returning: true, where: { id: proyectoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar los datos del Proyecto con el ID = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Proyecto actualizado correctamente con el ID = " + proyectoId,
                proyecto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Error de Proyecto con el ID = " + req.params.id,
            error: error.message,
        });
    }
};

exports.deleteProyectoById = (req, res) => {
    Proyecto.destroy({
        where: {
            id: req.params.id,
        },
    }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "El proyecto con el ID: " + req.params.id + " ha sido eliminado correctamente",
            });
        } else {
            res.status(404).json({
                message: "No se encontró el proyecto con el ID: " + req.params.id,
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Error -> " + err.message,
        });
    });
};
