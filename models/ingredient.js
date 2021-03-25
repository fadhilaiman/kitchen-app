'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsToMany(models.Recipe, {
        through: models.RecipeIngredient,
        foreignKey: 'IngredientId'
      })
    }
  };
  Ingredient.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Ingredient name field is required!'
        }
      }
    },  
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId cant be empty'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};