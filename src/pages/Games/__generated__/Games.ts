/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Games
// ====================================================

export interface Games_games {
  __typename: "Game";
  id: string;
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryId: number;
}

export interface Games {
  games: Games_games[];
}
