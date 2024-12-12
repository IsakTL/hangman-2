// import { User } from './User.js';
// import { Schema, model, type Document } from 'mongoose';


// interface ILeaderboard extends Document {
//     numofGamesWon: number; 
//     UserId: Schema.Types.ObjectId; // Array of Players
//     guesses: string[]; 
// }

// const leaderboardSchema: Schema<ILeaderboard> = new Schema ( 
//     {
//         numofGamesWon: {
//             type: Number, 
//         }, 
//         UserId: {
//             type: String, 
//         }, 
//     },  
// ); 

// leaderboardSchema

// db.gamescores.aggregate( [
//     {
//        $group:
//           {
//              playerId:
//                 {
//                    $topN:
//                    {
//                       output: ["$playerId", "$score"],
//                       sortBy: { "score": -1 },
//                       n:10
//                    }
//                 }
//           }
//     }
//  ] )