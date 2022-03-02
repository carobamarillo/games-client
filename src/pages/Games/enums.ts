import { gql } from "apollo-boost";

export const GAMES = gql`
  query Games {
    games {
      id
      name
      description
      code
      icon
      categoryId
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;
