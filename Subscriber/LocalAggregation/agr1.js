///***** Average Aggregator */

var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('detector.txt'),
    console: false,
});
var dataList = [];
var moyenne = 0;
var dateDebut = "2019-05-31T03:06:06";
var dateFin = "2019-05-31T02:37:30";


rd.on('line', function(line) {
    var array = line.split(';');
    var jsonMessage = array[2];
    var stringBuf = jsonMessage && jsonMessage.toString('utf-8')
    var json;
    try {
       json = JSON.parse(stringBuf);
      
       dataList.push(new Data(json.Format, json.Desc, json.CreateUtc, json.ExpiryUtc, json.Unit, json.Status,
        json.Value));
       //calculerMoyenne()
      
    } 
    catch (e) {
      console.error(stringBuf);
    }
});

rd.on('close', function(line) {
  calculerMoyenne();
});


function calculerMoyenne()
{
  var somme=0;
  var nbData = dataList.length;
  var timestamp
  for(j=0;j<dataList.length;j++)
  {
    if(dataList[j].CreateUtc == dateDebut){ timestamp = j}
  
  }

  for(i=timestamp;i<dataList.length;i++)
  {
    if (dataList[i].desc == "Vehicule count") {
      somme+=dataList[i].value;
      if(dataList[i].ExpiryUtc == dateFin){
        console.log("break");
        break;
      }
      
    }
  }
  moyenne = somme/nbData;
  console.log("La moyenne de nombre de vécicule = " + moyenne);
  console.log("Date debut " + dateDebut);
  console.log("Date fin " + dateFin);
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




 

