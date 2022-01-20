require('dotenv').config()
const express = require('express')
const routes = require('./routes/routes')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use(routes)

const port = 3333

const mongoConnect = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@apicluster.htfwe.mongodb.net/users?retryWrites=true&w=majority`
mongoose.connect(mongoConnect)
.then(() => {
  console.log('Database connected!!')
  app.listen(port, () => console.log(`Server running at port ${port}!!`))
})
.catch((err) => console.log(err))