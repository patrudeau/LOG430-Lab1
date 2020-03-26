/***********************************************************************************************************************
 * Cours: Log430 Session: H2020 Groupe:01 Projet: Laboratoire #1,#2,#3,#4 Étudiant(e)s:
 *
 * @author : Thamer Aissaoui
 *           Nesrine Cherfaoui
 *           Pier-Alexandre Trudeau
 *           Benjamin Fontaine
 *
 * @Description: ce composant joue le role de monotoring de l'aggrégateur et le subscriber. Il assure la redandance passive de l'aggrégation suite a un crash ou latence.
 * nous utilsons la technologie nodemon qui est une API Javascript 
 *
 *               Chargé de Lab: Bilal Alchalabi
 *               Date Création: 2020-02-02 Date dern. modif. 2020-03-26
 **********************************************************************************************************************/


var nodemon1 = require('nodemon');
var nodemon2 = require('nodemon');

 //delay//////////////
var myAgr = require('./agr1');
var delay = myAgr.delay;
/////////////// 

var colors = require('colors');
colors.enable();


// lancement du premier Aggrégateur
nodemon1({ script: './agr1.js' }).on('start', function () {
  console.log('Monitor started');
  console.log('starting Agregator 1');

}).on('crash', function () {

//gestion du crash
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
        script: './agr1-alternatif.js',
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




// gestion des couleurs des messages.
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




