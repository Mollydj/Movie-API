const express = require('express');
const app = express();

var myLogger = function (req, res, next){
  console.log(req.url);
  next();
};



let topRomComs = [ {
    title : 'About Time',
    director : 'Richard Curtis'
},
{
    title : '13 Going on 30',
    director : 'Gary Winick'
},
{
    title : 'Always Be My Maybe',
    director : 'Nahnatchka Khan'
},
{
    title : 'Sleeping With Other People',
    director : 'Leslye Headland'
},
{
    title : 'Four Weddings and a Funeral',
    director : 'Richard Curtis'
},
{
    title : 'Love Rosie',
    director : 'Christian Ditter'
},
{
    title : '500 Days of Summer',
    director : 'Marc Webb'
},
{
    title : 'Bridget Jones Diary',
    director : 'Sharon Maguire'
},
{
    title : 'The Big Sick',
    director : 'Michael Showalter'
},
{
    title : 'My Big Fat Greek Wedding',
    director : 'Joel Zwick'
}
]


//MIDDLEWARE
app.use(express.static('public'));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use(myLogger);

// GET requests
app.get('/movies', function(req, res) {
  res.json(topRomComs)
});
app.get('/', function(req, res) {
  res.send('Welcome to my book club!')
});
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root : __dirname });
});



// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
