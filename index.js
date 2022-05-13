const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let ContextTable = [
  {
    message: ["Hello", "Hi"],
    context: 'Welcome to StationFive.'
  },
  {
    message: ["Goodbye", "bye"],
    context: 'Thank you, see you around.'
  },
  {
    message: [],
    context: 'Sorry, I don’t understand.'
  },
];

const getContext = (messageArray) => {
  for(let i = 0; i < ContextTable.length; i++) {
    const { message } = ContextTable[i];
    if (message.some(i => messageArray.includes(i))) {
      return ContextTable[i].context;
    }
  }
  return '';
}


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World, from express');
});

app.post('/message', (req, res) => {
  const message = req.body.message;
  const conversation_id = req.body.conversation_id;
  
  const messageArray = message.split(" ");
  let contextResponse = getContext(messageArray);

  if (contextResponse === '') {
    const validationRes = ContextTable.find(o => o.message.length === 0);
    contextResponse = validationRes.context;
  };

  const response = {
    response_id: conversation_id,
    response: contextResponse
  }

  res.json(response);
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))