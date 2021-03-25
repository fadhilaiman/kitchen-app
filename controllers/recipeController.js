"use strict"

const { User, Recipe, Ingredient, RecipeIngredient } = require('../models');
const { Op } = require("sequelize");
const toMinutes = require('../helpers/toMinutes');

class RecipeController {
    static showRecipes(req, res) {
        Recipe.findAll({
            where: {
                UserId: req.session.UserId
            },
            order: ['name']
        })
            .then(data => {
                res.render('recipeList', { recipes: data, toMinutes })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static addRecipe(req, res) {
        res.render('addRecipe')
    }

    static addRecipePost(req, res) {
        // console.log(req.body)
        let newRecipe = {
            name: req.body.name,
            urlLink: req.body.urlLink,
            calories: req.body.calories,
            cookingTime: req.body.cookingTime,
            UserId: Number(req.session.UserId)
        }
        // console.log(newRecipe)
    
        Recipe.create(newRecipe)
            .then(data => {
                res.redirect('/recipes')
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let validateMessage = [];
                    err.errors.forEach(el => {
                        validateMessage.push(el.message)
                    })
                    res.send(validateMessage)
                } else {
                    console.log(err);
                    res.send(err);
                }
            })
    }

    static editRecipe(req, res) {
        // console.log(req.params.id)
        Recipe.findByPk(Number(req.params.id))
            .then(data => {
                res.render('editRecipe', { recipe: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editRecipePost(req, res) {
        // console.log(req.body)
        let editedRecipe = {
            name: req.body.name,
            urlLink: req.body.urlLink,
            calories: req.body.calories,
            cookingTime: req.body.cookingTime
        }
        
        Recipe.update(editedRecipe, {
            where: {
                id: Number(req.params.id)
            }
        })
            .then(data => {
                res.redirect('/recipes')
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    let validateMessage = [];
                    err.errors.forEach(el => {
                        validateMessage.push(el.message)
                    })
                    res.send(validateMessage)
                } else {
                    res.send(err);
                }
            })
    }

    static deleteRecipe(req, res) {
        Recipe.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/recipes')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static showIngredients(req, res) {
        // console.log(req.params.id)
        let recipe;
        Recipe.findByPk(Number(req.params.id), {
            include: Ingredient
        })
            .then(data => {
                recipe = data;
                
                return Ingredient.findAll({
                    where: {
                        UserId: req.session.UserId
                    },
                    order: ['name']
                })
            })
            .then(data => {
                let ingredients = data;
                
                res.render('recipeIngredientList', { recipe, ingredients })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static addIngredientToRecipe(req, res) {
        // console.log(req.body)
        let RecipeId = Number(req.params.id);
        let newRecipeIngredient = {
            RecipeId: RecipeId,
            IngredientId: Number(req.body.IngredientId),
            amount: req.body.amount
        }
        RecipeIngredient.create(newRecipeIngredient)
            .then(data => {
                res.redirect(`/recipes/ingredients/${RecipeId}`)
            })
            .catch(err => {
                // handle error validate
                if (err.name === 'SequelizeValidationError') {
                    let validateMessage = [];
                    err.errors.forEach(el => {
                        validateMessage.push(el.message)
                    })
                    res.send(validateMessage)
                } else {
                    console.log(err);
                    res.send(err);
                }
            })
    }
}

module.exports = RecipeController;