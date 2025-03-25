const admin = require("firebase-admin");
const serviceAccount = require("./mobileapp-d6d8c-firebase-adminsdk-fbsvc-2d23ade4c5.json");
const express = require('express')
const { response } = require('express');

const app = express()
const port = 3000

setInterval((  ) => {
    console.log('log check');
}, 10000);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.get('/', async (req, res) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My HTML from Express</title>
            <style>
              .form-input {
                font-size: 20px;
                width: 100%;
                margin-bottom: 10px;
              }
              
              #send {
                width: 100%;
                font-size: 80px;
                border-radius: 200vh;
                background: dodgerblue;
                aspect-ratio: 1 / 1;
                margin-top: 50px;
              }
              
              .container {
                font-size: 20px;
              
                display: flex;
                align-items: center;
                flex-direction: column;
                
                cursor: pointer;
                height: 100%;
                max-width: 520px;
                margin: 0 auto;
                padding: 0 10px;
                margin-top: 50px;
              }
              
              .container label {
                width: 100%;
                margin-bottom: 1px;
              }
            </style>
        </head>
        <body style="margin: 0; height: 100vh">
            <div class="container">
                <label>Device:</label>
                <input id="device" type="text" class="form-input">
                <label>Title:</label>
                <input id="title" type="text" class="form-input">
                <label>Message:</label>
                <input id="message" type="text" class="form-input">
                <button id="send">SEND</button>
            </div>
            <script>
            const deviceEl = document.querySelector('#device') 
            const titleEl = document.querySelector('#title') 
            const messageEl = document.querySelector('#message') 
            
            const search = new URLSearchParams(window.location.search);
            const device = search.get('device');
            deviceEl.value = device;
            titleEl.value = 'Hello!';
            messageEl.value = 'This is a test notification from Firebase Admin SDK.';
            
            send.addEventListener('click', (  ) => {
            const typeQuery = search.get('type') && '&type='+search.get('type');
            fetch('/send?deviceId='+deviceEl.value+'&title='+titleEl.value+'&body='+messageEl.value+typeQuery, { cache: "no-store" })
              .then( r  => {
                  console.log(r);
              })
            });
            </script>
        </body>
    </html>
  `;

    res.send(htmlContent);
});

app.get('/send', async (req, res) => {
    const deviceId = req.query.deviceId;
    const title = req.query.title;
    const body = req.query.body;
    const type = req.query.type || 'data';

    console.log('deviceId:',deviceId)
    console.log('title:',title)
    console.log('body:',body)
    console.log('type:',type)

    if (!deviceId) {
        return res.status(404).send("No device found");
    }

    const message = {
        [type]: {
            title: title || 'Hello!',
            body: body || 'This is a test notification from Firebase Admin SDK.'
        },
        token: deviceId,
        android: {
            priority: 'high',
        },

    };

    await admin.messaging().send(message).then(response => {
        console.log(response);
    })
        .catch(console.error);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
