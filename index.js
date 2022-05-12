const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let dataMessage = [
  {
    message: ["Hello", "Hi"],
    convert: 'Welcome'
  },
  {
    message: ["Goodbye", "bye"],
    convert: 'Thank You'
  },
];


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/book', (req, res) => {
  const message = req.body.message;
  
  const convertArray = message.split(" ");
  let stage = [];
  convertArray.forEach((item, key) => {
    if (item.includes(dataMessage[0].message[0]) || item.includes(dataMessage[0].message[1])) {
      stage = 0
    } 
    if (item.includes(dataMessage[1].message[0]) || item.includes(dataMessage[1].message[1])) {
      stage = 1
    } 
  });
  convertArray[0] = dataMessage[stage].convert;
  const response = convertArray.join(" ");
  res.json({
    message: response
  });
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))