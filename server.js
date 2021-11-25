const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');


if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: [port],
}))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server running on port ' + port);
});

app.get('/echo', (req, res) => { 
    res.send({ echo: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

app.get('/googlemapapi', async (req, res, next) => {
    console.log("'/test' call");
    console.log(req.query)
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    console.log(latitude, longitude);
    try {
        const { data: result } = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&type=restaurant&language=zh-TW&key=AIzaSyApORX8OKehWcSAVnBbqCGetlLwT1HP9Oo`)
        res.send(result)
    }

    catch (err) {
        console.error("GG", err);
    }
})

app.get('/geocoding', async (req, res, next) => {
    console.log("'/geocoding' call");
    console.log(req.query)
    const address = encodeURI(req.query.address);
    console.log(address);
    try {
        const {data: result } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBO7fZmEjMNueQmTQ7YkjO6rwBAvLUlSBQ`)
        console.log(result)
        res.send(result)
    }

    catch (err) {
        console.error("GG", err);
    }
})
