const express = require("express")
const OAuth = require("oauth")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

const KEY = process.env.APP_KEY
const SECRET = process.env.APP_SECRET
const URL = process.env.URL

const oauth = new OAuth.OAuth(URL, URL, KEY, SECRET, "1.0", null, "HMAC-SHA1")

app.get("/icon/:query", (req, res) => {
    const query = req.params.query
    console.log(query)

    oauth.get(`https://api.thenounproject.com/v2/icon?query=${query}`, null, null, (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Error fetching Noun Project API")
        } else {
            res.json(JSON.parse(data))
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
