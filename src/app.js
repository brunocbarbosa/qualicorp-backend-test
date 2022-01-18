const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')


const app = express()

app.use(express.json())

app.use('/user', routes)

const port = 3333

const mongoConnect = `mongodb+srv://qualicorp:5717485@apicluster.htfwe.mongodb.net/users?retryWrites=true&w=majority`
mongoose.connect(mongoConnect)
.then(() => {
  console.log('Database connected!!')
  app.listen(port, () => console.log(`Server running at port ${port}!!`))
})
.catch((err) => console.log(err))

