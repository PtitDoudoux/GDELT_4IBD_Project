var MongoClient = require('mongodb').MongoClient, assert = require('assert');

   var hosts = 'localhost:27017'

//Fonction de création de l'url de connexion en fonction du nom de base de données Mongo DB
function conn_url(){
  return 'mongodb://'+hosts+'/'+"data_201806";
}

//Nom de la base de données actuelle (data_YYYYMM)
// function last_dbname(){
//   var today = new Date();
//   var mm = (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
//   var year = today.getFullYear();
//   return 'data_'+year+mm;
// }

//Fonction qui retourne la date du jour (utilisé pour nommer les collections)
function tdy(){
  var today = new Date();
  var dd = today.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
      mm = (today.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
      yyyy = today.getFullYear();
  return ""+yyyy+mm+dd+"";
}

// Promise de connexion à la base db_name
function  connection(db_name = "data_201806" ){
  return MongoClient.connect(conn_url(db_name));
};



/*
===============================================================================================================
                                              FONCTIONS EXPORTEES
===============================================================================================================
*/

// Stock des données de prediction 
function storePrediction(prediction){
  var collection_name = "prediction";
  var d = new Date().toLocaleString();

  return connection()
  .then(function(db){
    col = db.collection(collection_name);
    col.insertOne({m_date:d, data:prediction})
    .then(function(r) {
      assert.equal(1, r.insertedCount);
      console.log("Prediction stocké à "+d+" dans la collection : "+collection_name)
      db.close();
    });
  })
}
exports.storePrediction = storePrediction;

// Stock des données historiques entre deux acteurs 
function storeHistory(history){
  var collection_name = "history";
  var d = new Date().toLocaleString();

  return connection()
  .then(function(db){
    col = db.collection(collection_name);
    col.insertOne({m_date:d, data:history})
    .then(function(r) {
      assert.equal(1, r.insertedCount);
      console.log("Historique stocké à "+d+" dans la collection : "+collection_name)
      db.close();
    });
  })
}
exports.storeHistory = storeHistory;


function getAction(code){
  var codep=parseInt(code);
  var collection_name = "ref_code";

  return connection()
  .then(function(db){
     col = db.collection(collection_name);
     return col.find({"code":codep}).toArray()
   });
}
exports.getAction = getAction;

function getHistory(actor1,actor2,d){
  var collection_name = "history";
  console.log(typeof(actor1))
  console.log(typeof(actor2))
  d=20180524
  
  // actor1 ="USA"
  // actor2 ="GOV"
  // d=20180524
  return connection()
  .then(function(db){
     col = db.collection(collection_name);
     return col.findOne({"Actor1Code":actor1, "Actor2Code":actor2, "SQLDATE":d})
   });
}
exports.getHistory = getHistory;

