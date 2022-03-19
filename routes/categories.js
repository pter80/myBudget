var express = require('express');
var router = express.Router();
const sql = require("../models/db.js");
var bodyParser = require("body-parser");
var twig = require('twig');
var resultUpdate="";
var path = require('path');

const knexConfig = require("../db/knexfile");
//initialize knex
//console.log(process.env.NODE_ENV);
const knex = require('knex')(knexConfig["development"]);

var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
var app=express();

var results=[];

router.get('/',function(req,res,next) {
  res.render('categories.twig',{entete:"Gestion des catégories"});
})

router.get('/getCategories', function(req, res, next) {
  knex('category')
    .select({
      id: 'id',
      lib: 'lib'
    })
    .then((categories) => {
      res.json({success: true,categories: categories});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    })
  });


router.post('/',function(req,res,next) {
  console.log({request:req.body});
  knex('category')
    .insert(req.body)
      .then((id) => {
        //get user by id
        knex('category')
          .select({
            id: 'id',
            lib: 'lib'
        })
          .where({id})
          .then((category) => {
          return res.json(category[0]);
        })
      })
      .catch((err) => {
        console.error(err);
        return res.json({success: false, message: 'An error occurred, please try again later.'});
      });
    
  });

module.exports = router;
