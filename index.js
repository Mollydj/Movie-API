const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

let movies = [ {
    title : 'About Time',
    director : 'Richard Curtis',
    subgenre: 'Dramedy',
    description: 'At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. ... So they meet for the first time again-and again-but finally, after a lot of cunning time-traveling, he wins her heart.',
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/9564054/p9564054_v_v8_ad.jpg',

},
{
    title : '13 Going on 30',
    director : 'Gary Winick',
    subgenre: 'Fantasy',
    description: "A girl who's sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna (Christa B. Allen) wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old (Jennifer Garner). But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/34314/p34314_v_v8_ak.jpg',
},
{
    title : 'Always Be My Maybe',
    director : 'Nahnatchka Khan',
    subgenre: ' Comedy ',
    description: "Childhood sweethearts have a falling out and don't speak for 15 years, only reconnecting as adults when Sasha runs into Marcus in San Francisco. Although the old sparks are still there, the couple live in different worlds.",
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/15586359/p15586359_v_v8_ab.jpg',
},
{
    title : 'Sleeping With Other People',
    director : 'Leslye Headland',
    subgenre: 'Comedy',
    description: ' Twelve years after a one-night stand, a man (Jason Sudeikis) and a woman (Alison Brie) run into each other and try to maintain a platonic relationship despite their mutual attraction. ',
    imgurl: ' https://m.media-amazon.com/images/M/MV5BMTUyMzQwNjEyNV5BMl5BanBnXkFtZTgwMzYwMzgwNjE@._V1_.jpg ',
},
{
    title : 'Amelie',
    director : 'Jean-Pierre Jeunet',
    subgenre: ' Comedy ',
    description: "Amélie is a fanciful comedy about a young woman who discretely orchestrates the lives of the people around her, creating a world exclusively of her own making. Shot in over 80 Parisian locations, acclaimed director Jean-Pierre Jeunet invokes his incomparable visionary style to capture the exquisite charm and mystery of modern-day Paris through the eyes of a beautiful ingenue.",
    imgurl: 'https://images-na.ssl-images-amazon.com/images/I/71yc%2BcqlaiL.jpg',
},
{
    title : 'Love Rosie',
    director : 'Christian Ditter',
    subgenre: 'Dramedy',
    description: 'Best friends Rosie and Alex are suddenly separated when Alex and his family move from Dublin to America. Can their friendship survive years and miles? Will they gamble everything for true love?',
    imgurl: 'https://m.media-amazon.com/images/M/MV5BMTk0Mzg1MTU1MF5BMl5BanBnXkFtZTgwMjU3ODI2MzE@._V1_UY1200_CR89,0,630,1200_AL_.jpg',
},
{
    title : '500 Days of Summer',
    director : 'Marc Webb',
    subgenre: ' Dramedy ',
    description: ' Tom (Joseph Gordon-Levitt), greeting-card writer and hopeless romantic, is caught completely off-guard when his girlfriend, Summer (Zooey Deschanel), suddenly dumps him. He reflects on their 500 days together to try to figure out where their love affair went sour, and in doing so, Tom rediscovers his true passions in life. ',
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/193428/p193428_v_v8_aa.jpg',
},
{
    title : 'Bridget Jones Diary',
    director : 'Sharon Maguire',
    subgenre: ' Comedy ',
    description: "At the start of the New Year, 32-year-old Bridget (Renée Zellweger) decides it's time to take control of her life -- and start keeping a diary. Now, the most provocative, erotic and hysterical book on her bedside table is the one she's writing. With a taste for adventure, and an opinion on every subject - from exercise to men to food to sex and everything in between - she's turning the page on a whole new life.",
    imgurl: ' https://www.gstatic.com/tv/thumb/v22vodart/27484/p27484_v_v8_an.jpg ',
},
{
    title : 'The Big Sick',
    director : 'Michael Showalter',
    subgenre: ' Dramedy ',
    description: 'Kumail is a Pakistani comic, who meets an American graduate student named Emily at one of his stand-up shows. As their relationship blossoms, he soon becomes worried about what his traditional Muslim parents will think of her. When Emily suddenly comes down with an illness that leaves her in a coma, Kumail finds himself developing a bond with her deeply concerned mother and father.',
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/13831327/p13831327_v_v8_ab.jpg',
},
{
    title : 'My Big Fat Greek Wedding',
    director : 'Joel Zwick',
    subgenre: ' Comedy ',
    description: "DescriptionEveryone in the Portokalos family worries about Toula (Nia Vardalos). Still unmarried at 30 years old, she works at Dancing Zorba's, the Greek restaurant owned by her parents, Gus (Michael Constantine) and Maria (Lainie Kazan). After taking a job at her aunt's travel agency, she falls in love with Ian Miller (John Corbett), a teacher who is tall, handsome and definitely not Greek. Toula isn't sure which will be more upsetting to her father, that Ian is a foreigner or that he's a vegetarian.",
    imgurl: 'https://www.gstatic.com/tv/thumb/v22vodart/29868/p29868_v_v8_aa.jpg',
}
]


//MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// GET //////////////////////////////////////////////
app.get('/movies', function(req, res) {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find( (movie) =>
    { return movie.title === req.params.title   }));
});
app.get('/movies/:director', function(req, res) {
  res.send('Return data about a director (bio, birth year, death year) by name');
});

app.get('/movies/:director/:genre', function(req, res) {
  res.send('Return data about a genre (description) by name/title (e.g., “Thriller”)');
});


// POST //////////////////////////////////////////////
app.post('/movies', function(req, res) {
  res.send('Allow new users to register');
});
app.post('/movies/:title', function(req, res) {
  res.send('Allow users to add a movie to their list of favorites');
});

// POST //////////////////////////////////////////////
app.delete('/movies', function(req, res) {
  res.send('Allow existing users to deregister');
});
app.delete('/movies/:title', function(req, res) {
  res.send('Allow users to remove a movie from their list of favorites');
});

// PUT //////////////////////////////////////////////
app.put('/movies', function(req, res) {
  res.send('Allow users to update their user info (username, password, email, date of birth)');
});

//LEAVE THIS//////////////////////////////////////////////
//app.get('/documentation', function(req, res) {
  //res.sendFile('public/documentation.html', { root : __dirname });
//});



// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
