const mqtt = require('mqtt');
require('dotenv').config();

const client = mqtt.connect(`mqtt://${process.env.ADDRESS}`);
client.on('connect', () => {

  let temp = 0;
  client.subscribe('myTopic');
  client.on('message', (topic, message) => {
    const context = JSON.parse(message.toString());
    console.log('app: ', context.temp);
    temp = context;

    client.publish('display', 'on');
  });

});