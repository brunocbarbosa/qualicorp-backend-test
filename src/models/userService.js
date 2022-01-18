const mongoose = require('mongoose');

const User = mongoose.model('user', {
  name: String,
  password: String,
  email: String
})

module.exports = User