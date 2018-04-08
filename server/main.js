const url = require('url');
const path = require('path');
const express = require('express');
const app = express();

let qrCounter = 1;

app.set('port', (process.env.PORT || 8016));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/checkedStart', (req, res) => {
    timerId = setInterval(startQR, 2000);
})

app.get('/checked', (req, res) => {
     let parsedUrl = url.parse(req.url, true);
     let query = parsedUrl.query;//parsing the url and putting the query arguments into the array
    // if (query.start == "Start") {//if the lecturer sends request to begin running the QR code in the class
    //     timerId = setInterval(startQR, 2000);//raising the QR code counter, every 2 seconds
    // }

    let isValid = checkIfNumIsValid(query.num);
    let imageUrl = isValid ? "checkedPic.png" : "unCheckedPic.png";

    res.redirect(imageUrl);
})

app.listen(app.get('port'), () => {
    console.log('running on port', app.get('port'))
})


function startQR() {
    qrCounter++;
}

function checkIfNumIsValid(num) {
    let isValid = num > qrCounter - 5;

    if (isValid) {//if the QR code does the current QRcode + 3 QR codes spare
        console.log("checked in second: " + qrCounter);
    } else {
        console.log("inValid in second: " + qrCounter);
    }

    return isValid;
}