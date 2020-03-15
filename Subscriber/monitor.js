var nodemon1 = require('nodemon');
var nodemon2 = require('nodemon');

 //delay//////////////
var myAgr = require('./agr1');
var delay = myAgr.delay;
/////////////// 

var colors = require('colors');
colors.enable();




nodemon1({ script: './agr1.js' }).on('start', function () {
  console.log('Monitor started');
  console.log('starting Agregator 1');

}).on('crash', function () {
//crash
  console.log(colors.red('Agregator 1 crashed for some reason!!!!!!'));
  console.log(colors.green('switching to agregator 2 and starting...'));
  setTimeout(startNewAgr, 10000, 'timer');
}).on('quit', function () {
    console.log('Agregator 1 has quit');
    process.exit(1);

  })

  //delay//////////////
if (delay == true) {
    setTimeout(manageDelay, 10000, 'timer');

}
/////////////////// 



// start new aggregator
function startNewAgr() {
    nodemon2({
        script: './agr2.js',
      });
      nodemon2.on('start', function () {
          console.log('Agregator 2 has started');
        })     
}


 ///delay////////////////
function manageDelay(){
    console.log(colors.red('Agregator 1 delayed for some reason!!!!!!'));
    console.log(colors.green('switching to agregator 2 and starting...'));
    setTimeout(startNewAgr, 1000, 'timer');
}
//////////////////////  






function colorLog(message, color) {

    color = color || "black";

    switch (color) {
        case "success":  
             color = "Green"; 
             break;
        case "info":     
                color = "DodgerBlue";  
             break;
        case "error":   
             color = "Red";     
             break;
        case "warning":  
             color = "Orange";   
             break;
        default: 
             color = color;
    }

    console.log("%c" + message, "color:" + color);
}




