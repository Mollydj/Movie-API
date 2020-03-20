const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require("uuid");
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
const Movies = Models.Movie;
const Users = Models.User;
const cors = require('cors');
require('./passport');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

mongoose.connect('mongodb://localhost:27017/myflixdb', { useNewUrlParser: true, useUnifiedTopology: true });


//MIDDLEWARE
app.use(express.static("public"));
app.use(morgan("common")); // Logging with Morgan
app.use(bodyParser.json()); // Using bodyParser
app.use(cors());
var auth = require('./auth')(app);


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));




// GET //////////////////////////////////////////////
//All movies to the user ok - 1
app.get('/movies', passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/users', function (req, res) {
  Users.find()
    .then(function (user) {
      res.status(201).json(user)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Return data of a movie by title to the user - 2
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Return data about a director by name - 4
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies.Director)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});


//Return data about a genre by name - 3
app.get('/movies/Genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'Genre.Name': req.params.Name })
    .then(function (movies) {
      res.json(movies)
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});


// POST //////////////////////////////////////////////
// Allows users to register - 5
app.post('/users',
  [
    check('Username', 'Username is required.').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  (req, res) => {
    var errors = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      // Search to see if a user with the requested username already exists 
      .then(function (user) {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then(function (user) { res.status(201).json(user) })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            })
        }
      }).catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  });

// Allow users to add a movie to their lists - 9
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: [req.params.MovieID] }
  },
    { new: true }, // This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});



// DELETE //////////////////////////////////////////////
//Allow users to remove a movie from their list of favorites - 7 
/*app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.findOneAndRemove({ Title: req.params.title })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Title + " was not found");
    } else {
      res.status(200).send(req.params.Title + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});*/

app.delete(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }, // This line makes sure that the updated document is returned
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);



//Allows users to deregister - 8
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


// PUT //////////////////////////////////////////////
//Allow users to update their user info - 6
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), function (req, res) {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true }, // This line makes sure that the updated document is returned
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
});

//ERROR HANDLING
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log(`Listening on Port ${port}`);
}); 