const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    games: [Game]!
  }

  type Game {
    _id: ID!
    wordId: ID!
    maskedWord: String!
    solution: String
    guesses: [String]!
    numBadGuesses: Int!
    isComplete: Boolean!
    isWinner: Boolean!
    userId: ID
  }

  type Word {
    _id: ID
    text: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input StartGameInput {
    wordId: ID
  }

  input GuessInput {
    gameId: ID!
    letter: String!
  }

  type Auth {
    token: ID!
    user: User
  }

type Query {
  getUser(id: ID!): User
  getAllUsers: [User!]!
  getGame(id: ID!): Game
  getAllGames(userId: ID!): [Game!]!
  me: User
}

  type UserResponse {
    _id: ID
    username: String
    email: String
    games: [Game]
  }

type Mutation {
  addUser(input: UserInput!): Auth
  login(email: String!, password: String!): Auth
  updateUser(id: ID!, username: String, email: String): User!
  deleteUser(id: ID!): Boolean!
  startGame(userId: ID!): Game!
  guessWord(gameId: ID!, letter: String!): Game!
  endGame(gameId: ID!): Game!
  getRandomWord: Word
}
`;

export default typeDefs;
