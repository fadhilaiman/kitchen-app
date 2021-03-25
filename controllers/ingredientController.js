"use strict"

const { User, Recipe, Ingredient, RecipeIngredient } = require('../models');
const { Op } = require("sequelize");

class IngredientController {
    static showIngredients(req, res) {
        Ingredient.findAll({
            where: {
                UserId: req.session.UserId
            },
            order: ['name']
        })
            .then(data => {
                res.render('ingredientList', { ingredients: data })
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    static addIngredient(req, res) {
        res.render('addIngredient')
    }

    static addIngredientPost(req, res) {
        // console.log(req.body)
        let newIngredient = {
            name: req.body.name,
            UserId: Number(req.session.UserId)
        }
        // console.log(newRecipe)
    
        Ingredient.create(newIngredient)
            .then(data => {
                res.redirect('/ingredients')
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

    static editIngredient(req, res) {
        // console.log(req.params.id)
        Ingredient.findByPk(Number(req.params.id))
            .then(data => {
                res.render('editIngredient', { ingredient: data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editIngredientPost(req, res) {
        // console.log(req.body)
        let editedIngredient = {
            name: req.body.name
        }
        
        Ingredient.update(editedIngredient, {
            where: {
                id: Number(req.params.id)
            }
        })
            .then(data => {
                res.redirect('/ingredients')
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

    static deleteIngredient(req, res) {
        Ingredient.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect('/ingredients')
            })
            .catch(err => {
                res.send(err);
            })
    }

    static showRecipes(req, res) {
        // console.log(req.params.id)
        Ingredient.findByPk(Number(req.params.id), {
            include: Recipe
        }) 
            .then(data => {         
                res.render('ingredientRecipeList', { ingredient: data })
            })
            .catch(err => {
                res.send(err);
            })
    }
}

module.exports = IngredientController;