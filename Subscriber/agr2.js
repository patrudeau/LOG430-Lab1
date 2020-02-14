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
        calculersumSquares()
       console.log(json);
      
    } 
    catch (e) {
      console.error(stringBuf);
    }
});

rd.on('close', function(line) {
  // do something
});


function calculersumSquares()
{
  var somme=0;
  var nbData = dataList.length;
  for(i=0;i<dataList.length;i++)
  {
    if (dataList[i].desc == "Vehicule count") {
      somme+=dataList[i].value;

      somme+=dataList[i].value;
      moyennei = somme/i;
      sumSquares = (dataList[i].value  - moyennei)*(dataList[i].value - moyennei);

    }
  }

  console.log("sumSquares = " + sumSquares);
  return sumSquares;
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