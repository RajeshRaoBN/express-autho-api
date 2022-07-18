// console.log("Hello from Auth0")

// All the dependencies 

const express = require("express")
const cors = require("cors")
const morgan = require('morgan')
const helmet = require('helmet')

// Defining the express app

const app = express()

// Defining an array to work as a database (temp solution)

const abs = [
    {title: "Hello World again from Auth0"}
]

// adding Helmet to enhance your API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json())

// enabling CORS for all requests
app.use(cors())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

const {startDatabase} = require('./database/mongo')
const {insertAd, getAds} = require('./database/ads')

// replace the endpoint responsible for the GET requests
app.get('/', async (req, res) => {
    res.send(await getAds());
  });

startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-momorydatabase!'})
})

// Creating a server
app.listen(3000, () => {
    console.log("Server is listning on port 3000")
})