"use strict"

const { User, Recipe, Ingredient } = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

class UserController {

    static registerUser(req, res) {
        if (req.session.isLogin) {
            res.send('U are already logged in, logout first')
        } else {
            res.render('register');
        }
    }

    static registerUserPost(req, res) {
        let newUser = {
            username: req.body.username,
            password: req.body.password
        }
        // console.log(newUser)
        User.create(newUser)
            .then(data => {
                // harus ada pengecekan dulu apakah username nya ada yang sama di database
                // kalau tidak ada berhasil create/add ke database
                // redirect homepage  
                res.render('successRegister', { user: data } )
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

    static login(req, res) {
        if (req.session.isLogin) {
            res.send('U are already logged in, logout first')
        } else {
            res.render('login');
        }
    }

    static loginPost(req, res) {
        console.log(req.body)

        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(data => {
              
                if (data) {
                    const isValidPassword = bcrypt.compareSync(req.body.password, data.password)
                    
                    if (isValidPassword) {
                    req.session.isLogin = true
                    req.session.UserId = Number(data.id)
                    // console.log('lalala')
                    res.render('successLogin', { user: data} )
                    } else {
                     res.redirect('/login')
                    }
                } else {
                    res.redirect('/login?msg=Username tidak terdaftar')
                }
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

    static logout(req, res) {
        if (req.session.isLogin) {
            req.session.destroy()
            res.redirect('/login')
        } else {
            res.send('please login first')
        }
        
    }
}

module.exports = UserController;