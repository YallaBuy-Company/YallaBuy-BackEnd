const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const leaguesRouter = require('./routes/countries');
const teamsRouter = require('./routes/countries');
const favoriteGamesRouter = require('./routes/countries');

const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(error => console.error('Error connecting to MongoDB Atlas:', error));


app.use('/users', usersRouter);
app.use('/countries', countriesRouter); 
app.use('/leagues', leaguesRouter); 
app.use('/teams', teamsRouter); 
app.use('/favoritegames', favoriteGamesRouter); // ! be aware : path should be - lowercase


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
