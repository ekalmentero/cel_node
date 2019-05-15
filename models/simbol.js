'use strict';

export default class Simbol extends Project{
    

}
module.exports = (sequelize, Datatypes) => {
        var Simbol = sequelize.define('Simbol', {
            
            simbolId: DataTypes.STRING,
            nomeSimbol: Datatypes.STRING,
            sinonimosSimbol []: DataTypes.STRING,
            nocaoSimbol: DataTypes.STRING,
            impactoSimbol: DataTypes.STRING,
            classificaSimbol: DataTypes.STRING
        });

        Simbol.associate = function(models){
        models.Simbol.belongsTo(models.project);
        models.Simbolo.hasMany(models.sinonimosSimbol);
    };

        return Simbol;
};