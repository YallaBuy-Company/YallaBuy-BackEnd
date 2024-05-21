import mongoose from 'mongoose';

const favoriteGamesSchema = new mongoose.Schema({
    homeTeam:{
        type : String,
        required: true,
    },
    awayTeam:{
        type : String,
        required: true,
    },
    country:{
        type : String,
        required: true,
    },
    city:{
        type : String,
        required: true,
    },
    stadium:{
        type : String,
        required: true,
    },
    date:{
        type : Date,
        required: true,
    }
});

export default mongoose.model('favoriteGames', favoriteGamesSchema);
