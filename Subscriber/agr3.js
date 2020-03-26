/***********************************************************************************************************************
 * Cours: Log430 Session: H2020 Groupe:01 Projet: Laboratoire #1,#2,#3,#4 Étudiant(e)s:
 *
 * @author : Thamer Aissaoui
 *           Nesrine Cherfaoui
 *           Pier-Alexandre Trudeau
 *           Benjamin Fontaine
 *
 * @Description: Cette Classe constitue le troisiéme aggrégateur qui se charge du calcul de la sum of Squares du nombre de véhicule.
 * cette classe aggrége des données en temps reel ou bien a partir dun fichier local, en plus elle enregistre les données 
 * aggrégées dans une BD locale pour gérer la disponibilité.
 *
 *               Chargé de Lab: Bilal Alchalabi
 *               Date Création: 2020-02-02 Date dern. modif. 2020-03-26
 **********************************************************************************************************************/

/////////////////// MQTT Subcriber :  real time aggregation ///////////////
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt.cgmu.io:1883');
var myArgs = process.argv.slice(2)
var topic = "worldcongress2017/pilot_resologi/" + myArgs[0]
var dataList = [];
var sumSquares = 0;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/aggr-realTime";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

client.on('message', (topic, message) => {
    message = message.toString()
    var stringBuf = message && message.toString('utf-8')
    try {
      var json = JSON.parse(stringBuf);
     
       //console.log(json);
       dataList.push(new Data(json.Format, json.Desc, json.CreateUtc, json.ExpiryUtc, json.Unit, json.Status,
        json.Value));
        calculersumSquares();
    } 
    catch (e) {
      console.error(stringBuf);
    }
})

client.on('connect', ()=>{
    client.subscribe(topic)
    console.log("connected")
    console.log("subscribe to topic -> " + topic)
    
})

client.on('close', function(line) {
  console.log("Closing Connection")
});
//////////////////////////// fin de realtime aggregation //////////////////////////
______________________________________________________________________________________________



/////////////////// local  aggregation pour tester la Testabilité: lire a partir d'un fichier  ///////////////
////////////////////////  Enlever le '/*' au besoin ////////////////////////////////////////////////////////
/*var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('detector.txt'),
    console: false,
});
var dataList = [];

rd.on('line', function(line) {
    var array = line.split(';');
    var jsonMessage = array[2];
    var stringBuf = jsonMessage && jsonMessage.toString('utf-8')
    var json;
    try {
       json = JSON.parse(stringBuf);
       dataList.push(new Data(json.Format, json.Desc, json.CreateUtc, json.ExpiryUtc, json.Unit, json.Status,
        json.Value));
        calculersumSquares();    
    } 
    catch (e) {
      console.error(stringBuf);
    }
});

rd.on('close', function(line) {
  // do something
});*/
////////////////////////////////////// fin de local aggregation /////////////////////////////////////////
_________________________________________________________________________________________________________


function calculersumSquares()
{
  var somme=0;
  var nbData = dataList.length;
  for(i=0;i<dataList.length;i++)
  {
    if (dataList[i].desc == "Vehicule count") {
      somme+=dataList[i].value;
      moyennei = somme/i;
      sumSquares = (dataList[i].value  - moyennei)*(dataList[i].value - moyennei);
      timeCreateUtc = dataList[i].CreateUtc;
      timeExpiryUtc = dataList[i].ExpiryUtc;
    }
  }
  console.log("sumSquares = " + sumSquares);
  console.log("timeCreateUtc = " + timeCreateUtc);
  console.log("timeExpiryUtc = " + timeExpiryUtc);
  return sumSquares;
}

class Data {
  constructor(format, desc, CreateUtc, ExpiryUtc, unit, status, value) {
      this.format = format;
      this.desc = desc;
      this.CreateUtc = CreateUtc;
      this.ExpiryUtc = ExpiryUtc;
      this.unit = unit;
      this.status = status;
      this.value = value;
  }
}

/////****** */ Cette fonction sert a insérer dans la base de données locale pour montrer la Disponibilité *********////
setTimeout(dBInsert, 40000, 'timer');
function dBInsert() {
  // make client connect to mongo service
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");

  // document to be inserted
  var doc = {aggrSum: sumSquares, debut: timeCreateUtc, fin : timeExpiryUtc };
  
  // insert document to 'users' collection using insertOne
  db.collection("sumOfSquares").insertOne(doc, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
      // close the connection to db when you are done with it
      db.close();
      client.close();
  });
});
}
//////////////////////// fin de la fonction d'insetion dans la base de données ///////////////////////////