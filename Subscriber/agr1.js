// MQTT Subcriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt.cgmu.io:1883');
var myArgs = process.argv.slice(2)
var topic = "worldcongress2017/pilot_resologi/odtf1/ca/qc/mtl/mobil/#"
var dataList = [];
var moyenne = 0;
var timeList = [];
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /*//delay///////////////
var delay = true;
exports.delay = delay;
///////////////////// */


// export it


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

        ///crash//////////////
        calculerMoyenne();
        ////////////// 


       /* //delay////////////
       setTimeout(calculerMoyenne, 20000, 'timer');
       /////////////////////// */
      
     



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


function calculerMoyenne()
{
  var somme=0;
  var nbData = dataList.length;
  for(i=0;i<dataList.length;i++)
  {
    if (dataList[i].desc == "Vehicule count") {
      somme+=dataList[i].value;
      timeCreateUtc = dataList[i].CreateUtc;
      timeExpiryUtc = dataList[i].ExpiryUtc;

     
     
    }
  }
  moyenne = somme/nbData;
  console.log("La moyenne de nombre de vécicule = " + moyenne);
  console.log("timeCreateUtc = " + timeCreateUtc);
  console.log("timeExpiryUtc = " + timeExpiryUtc);

    
    

  return moyenne;
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


setTimeout(dBInsert, 20000, 'timer');
function dBInsert() {
 

      //////force crash//////
      client.close();
      //////////////// 


}





