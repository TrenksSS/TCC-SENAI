require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')
const cors = require('cors')

const router = require('./src/routes/router')

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

app.listen(PORT, () => {
    console.log("App ON porta:" + PORT)
})

