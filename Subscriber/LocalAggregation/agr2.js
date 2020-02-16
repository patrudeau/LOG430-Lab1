///***** Count Aggregator */

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