import { AxiosResponse } from 'axios';

export type DegenType = {
  assets: number;
  assets_scaled: number;
  big_followers: number;
  big_followers_scaled: number;
  followers_count: number;
  followers_count_scaled: number;
  general_score: number;
  influence: number;
  influence_scaled: number;
  popularity: number;
  popularity_scaled: number;
  price_change: number;
  price_change_scaled: number;
  user_id: string;
  username: string;
};

export type TokenType = {
  id: number;
  symbol: string;
  project_name: string;
  contract_address: string;
  categories: string;
  description: string;
  twitter_screen_name: string;
  buying_power: number;
  project_count_followers_10k: number;
  project_count_followers_10k_scaled: number;
  x: number;
  y: number;
  project_token_ranked_followers_10k: number;
  project_token_ranked_followers_10k_scaled: number;
  holders_value: number;
  holders_value_scaled: number;
  holders_count: number;
  holders_count_scaled: number;
  volume_to_mc: number;
  volume_to_mc_scaled: number;
  general_score: number;
};

export type FetchDegensResponse = AxiosResponse<DegenType[]>;
export type FetchTokensResponse = AxiosResponse<TokenType[]>;
