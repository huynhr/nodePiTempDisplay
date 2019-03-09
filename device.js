const mqtt = require('mqtt');
const fs = require('fs');
require('dotenv').config();


const client = mqtt.connect(`mqtt://${process.env.ADDRESS}`);
client.on('connect', () => {

  const data = { temp: 35 }
  setInterval(() => {
    const temp = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp');
    data.temp = temp / 1000;


    client.publish('myTopic', JSON.stringify(data));
    console.log('Device: Message Sent');
  }, 5000);

  client.subscribe('display');
  client.on('message', (topic, message) => {
    const context = message.toString();
    console.log('Device: ', context);
  });
});