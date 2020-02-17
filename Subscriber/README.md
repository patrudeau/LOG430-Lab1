# LOG430-Lab1
Faire : npm install mosca 


Initial solution for node.js mqtt connection

Pour lancer les services en local vous devez lancez les commandes suivantes dans des terminaux séparés:
1. node broker (pour lancer le broker)
2. node pub (pour lancer le publisher par défaut il publie dans le topic "trafic")
3. node sub trafic (pour lancer le subcriber avec un argument en ligne de commande)

Vous verez ensuite dans chacun des 3 terminaux les messages publiés sur le broker, pub et sub (si vous écoutez bien le topic trafic)

///////////////////// Update pour Iteration 3 apres Dicussion avec Bilal:///////////////////////////////////////

- Crash; Faur mpntrer que notre aggregateur est capable de recuperer son activity apres un Crash: un exemple de crash est de forcer une division par 0 dans le fichier Agr.js de ce fait on peut utiliser un bloc:

try { 
var stringBuf = jsonMessage && jsonMessage.toString('utf-8')
CalculMoyenne(){division par 0}

catch (e) {
      console.error(stringBuf);
      reconnect()
    }
    
- Latence: tou simplement on fake une latence avant de se connecter et recuperer les data, notre agrregateur doit nous informer apres un certain temps que les donnes ne rentrent pas et nous devrons reinitialiser la connexion au Broker:

exemple:

//////////////// dans sub.js
setTimeout(connect, 40000, 'timer');
on se connect apres 40 seconde de delay

function connect(){
client.on('message', (topic, message) => {
    message = message.toString()
    var stringBuf = message && message.toString('utf-8')
    try {
      var json = JSON.parse(stringBuf);
       console.log(json);
    } 
    catch (e) {
      console.error(stringBuf);
    }
})

client.on('connect', ()=>{
    client.subscribe(topic)
    console.log("connected")
    console.log("subscribe to topic -> " + topic)
})}

//// dans agr.js

si on recoit pas des donnees dans 20 secondes par exemple, on demande au sub.js de reinitialiser la connxion, la on rentre dans une boucle infinie car la latence est fake, pour sortir de la boucle et au bout de 3 tentatives on affiche un message derreur: connexion au serveur imposiible, veuillez ressayer plutard.

a noter que nosu pouvons travailler le reste sans Docker, le monitor peut tou simplement etre une classe js qui recoit des echo/ping tou les x secondes de la part de subscriber et aggregator.


mais avant tout cela faut optimiser le code existant.



