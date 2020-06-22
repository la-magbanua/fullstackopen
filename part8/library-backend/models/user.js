const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema)
