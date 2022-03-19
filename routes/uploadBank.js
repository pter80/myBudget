var express = require('express');
var router = express.Router();
const sql = require("../models/db.js");
var bodyParser = require("body-parser");
var twig = require('twig');
var resultUpdate="";
var path = require('path');

var csv = require('csv-parser');
const fs = require('fs');
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));
var app=express();

var results=[];

router.get('/', function(req, res, next) {
  res.render('uploadBank.twig');
});

router.get('/getData', function(req, res, next) {
    fs.createReadStream('./public/uploads/bank.csv')
      .pipe(csv({separator: ';'}) )
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('CSV file successfully processed');
        res.json(results);
        
      })
        
});

router.post('/',function(req,res,next) {
  console.log("body",req.body);
  //INSERT INTO operation_recurente (date_fin,lib,montant) VALUES ( ? )
  var sqlReq="INSERT INTO operation_recurente (jour_echeance,date_fin,lib,montant) VALUES (?)";
  var dateTab=req.body.date.split('/');
  var dateToInsert=dateTab[2]+"-"+dateTab[1]+"-"+dateTab[0];
  console.log(dateToInsert);
  var dataToInsert={
    jour_echeance: dateTab[0],
    date_fin: dateToInsert,
    lib: req.body.libelle,
    montant: req.body.montant
  }
  sql.query(sqlReq, [Object.values(dataToInsert)], function (err, result) {
    if (err) throw err;
    res.json({result: "Success"});
  });
})

module.exports = router;
