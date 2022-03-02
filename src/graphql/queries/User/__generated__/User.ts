/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GameType } from "../../../globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_wishlist_result_game {
  __typename: "Game";
  id: string;
  name: string;
  description: string;
  code: string;
  icon: string;
  url: string;
}

export interface User_user_wishlist_result {
  __typename: "Wishlist";
  id: string;
  game: User_user_wishlist_result_game;
}

export interface User_user_wishlist {
  __typename: "Wishlists";
  total: number;
  result: User_user_wishlist_result[];
}

export interface User_user_games_result {
  __typename: "Game";
  id: string;
  name: string;
  description: string;
  code: string;
  icon: string;
  url: string;
  type: GameType;
}

export interface User_user_games {
  __typename: "Games";
  total: number;
  result: User_user_games_result[];
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  wishlist: User_user_wishlist | null;
  games: User_user_games;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  wishlistPage: number;
  gamesPage: number;
  limit: number;
}
