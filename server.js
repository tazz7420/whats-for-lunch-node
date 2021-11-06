const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// const port = process.env.PORT || 5000;
const port = process.env.NODE_ENV === 'production' ? 'https://whats-for-lunch-withnodejs.herokuapp.com/' : process.env.PORT || 5000;



app.use(cors({
    origin: [port],
  }))

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server running on port ' + port);
});
app.get('/googlemapapi', async  (req, res, next) => {
    console.log("'/test' call");
    console.log(req.query)
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    console.log(latitude, longitude);
    try {
        const { data: result } = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=restaurant&language=zh-TW&key=AIzaSyApORX8OKehWcSAVnBbqCGetlLwT1HP9Oo`)
        console.log(result)
        res.send(result)
    }

    catch (err) {
        console.error("GG", err);
    }
})
// axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.06946,121.66105&radius=1000&type=restaurant&language=zh-TW&key=AIzaSyApORX8OKehWcSAVnBbqCGetlLwT1HP9Oo`).then(function (res) {
//     console.log(res.data)
// })