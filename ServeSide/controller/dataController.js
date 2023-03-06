const axios = require('axios');

exports.getData = async (req, res) => {
    try {
        console.log(req.body);
        res.send('Data successfully received by Node.js server!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while retreiving data from Flask server!')
    }
}


exports.sendData = async (req, res) => {
    try {

        const data = req.body;

        const response = await axios.post('http://127.0.0.1:5000/data', data);
        res.send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while sending data to Flask server!');
    }
} 