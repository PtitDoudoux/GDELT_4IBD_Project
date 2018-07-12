const express = require('express'),
      router = express.Router(),
      mongo = require('../models/mongod'),
      fetch = require('node-fetch');


router.get('/prediction/documents/count/:filter', function (req, res, next){
        var filter = parseString(req.params.filter);
        mongo.getCountAllDocuments(filter)
        .then(function(result){
                res.json(result.count);
        });
});


router.post('/prediction/history', function (req, res){
     var actor1 = req.body.actor1,
         actor2 = req.body.actor2,
         date = req.body.date;

     mongo.getHistory(actor1,actor2,date)
      .then(function(result){
            res.json(result);
        });
});


router.get('/action/:code', function (req, res, next){
        var code = req.params.code;
        mongo.getAction(code)
        .then(function (result) { 
        res.json(result); 
    });
});



module.exports = router;