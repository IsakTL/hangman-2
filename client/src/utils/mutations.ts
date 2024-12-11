import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    token
    user {
      username
      email
      password
    }
  }
}
`;

export const UPDATE_USER = gql`
 mutation UpdateUser($updateUserId: ID!, $username: String, $email: String) {
  updateUser(id: $updateUserId, username: $username, email: $email) {
    email
    username
  }
}
`;

export const DELETE_USER = gql`
 mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`;

export const GET_RANDOM_WORD = gql`
mutation GetRandomWord {
  getRandomWord {
    _id
    text
  }
}
`;
