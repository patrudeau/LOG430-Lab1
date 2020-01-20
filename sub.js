// MQTT Subcriber
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883');
var myArgs = process.argv.slice(2)
var topic = myArgs[0]

client.on('message', (topic, message) => {
    message = message.toString()
    console.log(message)
})

client.on('connect', ()=>{
    client.subscribe(topic)
    console.log("connected")
    console.log("subscribe to topic -> " + topic)
})

client.on('close', ()=>{
    console.log("Closing Connection")
})