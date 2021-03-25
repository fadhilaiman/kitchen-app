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
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'amount field required!'
        },
        min: {
          args: 1,
          msg: 'amount must be more than 1'
        }
      }
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'RecipeId cant be empty!'
        }
      }
    },
    IngredientId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'IngredientId cant be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RecipeIngredient',
  });
  return RecipeIngredient;
};