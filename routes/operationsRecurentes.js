var express = require('express');
var router = express.Router();
const sql = require("../models/db.js");
var bodyParser = require("body-parser");
var twig = require('twig');
var resultUpdate="";

const knexConfig = require("../db/knexfile");
//initialize knex
//console.log(process.env.NODE_ENV);
const knex = require('knex')(knexConfig["development"]);

var server = express();
server.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
    knex('category')
    .select()
    //.returning('id','lib')
    .then((rows) => {
      console.log({success: true,rows: JSON.stringify(rows)});
      var categories=JSON.stringify(rows);
      res.render('operationsRecurentes.twig', {entete:"Gestion des opérations récurentes",categories: categories});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    })
});



function getAll(req,res,next) {
    knex({o:'operation_recurente'})
        .select('o.*',{libo:'o.lib',libc:'c.lib'})
        .orderByRaw("o.jour_echeance")
        .leftJoin({c:'category'}, {'o.category_id': 'c.id'})
        .then((items) => {
          res.json({success: true,items: items});
        })
        .catch((err) => {
          console.error(err);
          return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
}


router.get("/all",function(req,res,next) {
    getAll(req,res,next);
});

router.post("/post",function(req, res, next) {
    //console.log(Object.values(req.body));
    var sqlReq = "INSERT INTO operation_recurente (date_fin,lib,montant) VALUES ( ? )";
    sql.query(sqlReq, [Object.values(req.body)], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    res.redirect('/operationsRecurentes');
});

router.post("/add",function(req, res, next) {
    var data=req.body;
    var dtTab = data.date_fin.split('/');
    console.log("Date : ",data.dt_fin,dtTab);
    var dtStr = dtTab[2]+"-"+dtTab[1]+"-"+dtTab[0];
    console.log(dtStr);
    var sqlReq = "INSERT INTO operation_recurente (date_fin,lib,montant) VALUES ( ? )";
    var dtTab=[[dtStr,data.lib,data.montant]];
    console.log(dtTab);
    sql.query(sqlReq, dtTab , function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    sql.query('SELECT * FROM operation_recurente', function(err, rows, next) {
        if (err) throw err;
        console.log(resultUpdate,rows);
        res.json(rows);
    });
});

router.put("/",function(req,res,next) {
    console.log("Requete PUT",req.body);
    var data=(req.body);
    var dtTab = data.date_fin.split('/');
    console.log("Date : ",dtTab);
    var dtStr = dtTab[2]+"-"+dtTab[1]+"-"+dtTab[0];
    console.log("DateObj",dtStr);
    var qb="UPDATE operation_recurente SET lib='"+data.lib+
        "', date_fin='"+dtStr+
        "', montant='"+data.montant+
        "', category_id="+data.catSelected+
        " WHERE id="+data.id;
    console.log(qb);
    
    sql.query(qb, function(err, rows, next) {
        if (err) throw err;
        resultUpdate=rows;
        getAll(req,res,next);
    });
    
})

module.exports = router;
