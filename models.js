const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');
var movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String, Birth: String, Death: String },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});
var userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: { type: String, required: true },
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};
var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);
module.exports.Movie = Movie;
module.exports.User = User;