module.exports = (sequelize,Sequelize) => {

    const Proyecto = sequelize.define('proyecto', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING
        },
        descricpcion:{
            type: Sequelize.STRING
        },
        completada:{
            type: Sequelize.BOOLEAN
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        prioridad:{
            type: Sequelize.STRING
        },
        asignado_a:{
            type: Sequelize.STRING
        },
        categorias:{
            type: Sequelize.STRING
        },
        costo_proyecto:{
            type: Sequelize.INTEGER
        }
    });
    
    return Proyecto;
}