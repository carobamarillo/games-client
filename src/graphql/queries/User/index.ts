import { gql } from 'apollo-boost';

export const USER = gql`
  query User($id: ID!, $wishlistPage: Int!, $gamesPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      wishlist(limit: $limit, page: $wishlistPage) {
        total
        result {
          id
          game {
            id
            name
            description
            code
            icon
            url
          }
        }
      }
      games(limit: $limit, page: $gamesPage) {
        total
        result {
          id
          name
          description
          code
          icon
          url
          type
        }
      }
    }
  }
`;
