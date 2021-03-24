'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecipeIngredient.belongsTo(models.Recipe, {
        foreignKey: 'RecipeId'
      })
      RecipeIngredient.belongsTo(models.Ingredient, {
        foreignKey: 'IngredientId'
      })
    }
  };
  RecipeIngredient.init({
    amount: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
  });
  return RecipeIngredient;
};