// MQTT Subcriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://mqtt.cgmu.io:1883');
var myArgs = process.argv.slice(2)
var topic = "#"//"worldcongress2017/pilot_resologi"// + myArgs[0]

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
})

client.on('close', ()=>{
    console.log("Closing Connection")
})