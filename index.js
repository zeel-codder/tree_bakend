const express = require('express')
const {CategoryRoute} = require('./router/category');
const db=require('./db');
const app = express()
const port= process.env.PORT ||3001 ;
var cors = require('cors');
require('dotenv').config()


app.use(cors());


app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/Category',CategoryRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

