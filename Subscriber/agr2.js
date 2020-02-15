///***** Count Aggregator */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/aggr2";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;


var fs = require('fs'),
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
       //calculerSomme()
      
    } 
    catch (e) {
      console.error(stringBuf);
    }
});

rd.on('close', function(line) {
  calculerSomme();
});


function calculerSomme()
{
  var somme=0;
  var dateDebut = "2019-05-31T03:06:06";
  var dateFin = "2019-05-31T02:37:30";
  var timestamp
  for(j=0;j<dataList.length;j++)
  {
    if(dataList[j].CreateUtc == dateDebut){ timestamp = j}
  
  }

  for(i=timestamp;i<dataList.length;i++)
  {
    //console.log("dataList[i].CreateUtc " + dataList[i].CreateUtc);

    if ((dataList[i].desc == "Vehicule count") /*&& (dataList[i].CreateUtc == dateDebut)*/) {
      //console.log("dataList[i].CreateUtc " + dataList[i].CreateUtc);
        somme+=dataList[i].value;
        //console.log("hello" + i);
        if(dataList[i].ExpiryUtc == "dateFin"){
          console.log("break");
          break;
        }
      
    }
  }

  console.log("La somme de nombre de vécicule = " + somme);
  console.log("Date debut " + dateDebut);
  console.log("Date fin " + dateFin);

  // make client connect to mongo service
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // db pointing to newdb
  console.log("Switched to "+db.databaseName+" database");

  // document to be inserted
  var doc = {aggrSomme: somme, debut: dateDebut, fin : dateFin };
  
  // insert document to 'users' collection using insertOne
  db.collection("somme").insertOne(doc, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
      // close the connection to db when you are done with it
      db.close();
  });
});

  return somme;
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