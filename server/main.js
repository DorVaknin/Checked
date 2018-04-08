const url = require('url');
const path = require('path');
const express = require('express');
const app = express();

let qrCounter = 1;

app.set('port', (process.env.PORT || 8016));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/checked', (request, res) => {
    let parsedUrl = url.parse(request.url, true);
    let query = parsedUrl.query;//parsing the url and putting the query arguments into the array
    if (query.start == "Start") {//if the lecturer sends request to begin running the QR code in the class
        timerId = setInterval(startQR, 2000);//raising the QR code counter, every 2 seconds
    }

    isValid(query.num);
})

app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'))
})


function startQR() {
    qrCounter++;
}

function isValid(num) {
    //console.log("in isValid");
    if (num > qrCounter - 5) {//if the QR code does the current QRcode + 3 QR codes spare
        console.log("checked in second: " + qrCounter);
        // we didnt success to give answer to the client
        //res.write('Your checked!');
    } else {
        console.log("unValid in second: " + qrCounter);
        //res.write('Incorrect, Your not checked!!');
    }
}