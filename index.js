const express = require('express');
const OAuth = require('oauth');

const app = express();

const KEY = '4f3983af446c459ea041fce81810b6f3';
const SECRET = 'f76d7c6f9fb14724a6551d4d5011874f';

const oauth = new OAuth.OAuth(
    'https://api.thenounproject.com',
    'https://api.thenounproject.com',
    KEY,
    SECRET,
    '1.0',
    null,
    'HMAC-SHA1'
);

app.get('/icon/:query', (req, res) => {
    const query = req.params.query;

    oauth.get(
        `https://api.thenounproject.com/v2/icon?query=${query}`,
        null,
        null,
        (err, data, response) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error fetching Noun Project API');
            } else {
                res.json(JSON.parse(data));
            }
        }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
