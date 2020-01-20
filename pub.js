// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic = 'trafic'
var message = 'Hello World!'

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 5000)
})