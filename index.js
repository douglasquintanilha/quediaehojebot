var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')
const process = require('process')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
console.log(process.env);
//This is the route the API will call
app.post('/new-message', function(req, res) {
    const {message} = req.body
    let chatMessage = '';

    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || !message.text.toLowerCase().includes('que dia é hoje?') ) {
        // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
        // return res.end()
        chatMessage = 'Não tem';
    }else{
        let weekDay = new Date().getDay();

        switch(weekDay){
            case 0:
                chatMessage = 'Hoje é domingo, dia do churrascão';
                break;
            case 1:
                chatMessage = 'Hoje é segunda, dia da ressaca do fds';
                break;
            case 2:
                chatMessage = 'Hoje é terça, dia de trabalho';
                break;
            case 3:
                chatMessage = 'Hoje é quarta, dia de jogo';
                break;
            case 4:
                chatMessage = 'Hoje é quinta, que é quase sexta';
                break;
            case 5:
                chatMessage = 'Hoje é SEXTA, dia de MALDADE!:smiling_imp:';
                break;
            case 6:
                chatMessage = 'Hoje é sábado, dia da catchaça';
                break;
        }
    }

    // If we've gotten this far, it means that we have received a message containing the word "marco".
    // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
    // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
    let apiUrl = 'https://api.telegram.org/bot359944401:AAH10O5iXgVErXg8tRYF9B8zD1hGmoRJrIk/sendMessage';

    axios.post(apiUrl, {
        chat_id: message.chat.id,
        text: chatMessage
    })
    .then(response => {
        // We get here if the message was successfully posted
        console.log('Message posted')
        res.end('ok')
    })
    .catch(err => {
        // ...and here if it was not
        console.log('Error :', err)
        res.end('Error :' + err)
    })

});

// Finally, start our server
app.listen(3000, function() {
    console.log('Telegram app listening on port 3000!');
});
