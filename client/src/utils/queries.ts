import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      games
    }
  }
`;

export const QUERY_GAME = gql`
  query getgames{
     getgames{
       _id
    wordId
    maskedWord
    solution
    guesses
    numBadGuesses
    isComplete
    isWinner
    userId
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
  me {
    _id
    username
    email
    password
    games {
      _id
    }
  }
}
`;
