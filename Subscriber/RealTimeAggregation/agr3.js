// MQTT Subcriber
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


