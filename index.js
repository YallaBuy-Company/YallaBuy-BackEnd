import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import cors from 'cors';


dotenv.config();

import usersRouter from './routes/users.js';
import authRouter from './routes/authRoutes.js';
import { auth } from './middlewares/authMiddleware.js';

//import countriesRouter from './routes/countries.js';
import leaguesRouter from './routes/leagues.js';
import teamsRouter from './routes/teams.js';
import venuesRouter from './routes/venues.js';
//import favoriteGamesRouter from './routes/favoriteGames.js'; 

const app = express();

// Use the cors middleware to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173'  
}));

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(error => console.error('Error connecting to MongoDB Atlas:', error));

app.use('/users',/*auth,*/ usersRouter);
app.use('/auth', authRouter);

//app.use('/countries', countriesRouter); 
app.use('/leagues', leaguesRouter); 
app.use('/venues', venuesRouter); 
app.use('/teams', teamsRouter); 
//app.use('/favoritegames',auth, favoriteGamesRouter);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;