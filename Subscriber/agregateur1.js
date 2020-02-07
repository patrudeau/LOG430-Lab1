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
  for(i=0;i<dataList.length;i++)
  {
    if (dataList[i].desc == "Vehicule count") {
      somme+=dataList[i].value;
    }
  }
  moyenne = somme/nbData;
  console.log("La moyenne de nombre de vécicule = " + moyenne);
  return moyenne;
}

class Data {
    constructor(format, desc, createdUTC, ExpiryUtc, unit, status, value) {
        this.format = format;
        this.desc = desc;
        this.createdUTC = createdUTC;
        this.ExpiryUtc = ExpiryUtc;
        this.unit = unit;
        this.status = status;
        this.value = value;
    }
}