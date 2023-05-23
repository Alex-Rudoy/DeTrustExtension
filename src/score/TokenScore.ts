import { Score } from './Score';
import { DetrustDataLayer } from '../DetrustDataLayer';

export class TokenScore {
  score?: Score;
  constructor({ dataLayer, symbol, marginLeft, marginRight }: TokenScoreProps) {
    const token = dataLayer.tokens.find(
      (token) => token.symbol.toLowerCase() === symbol.toLowerCase(),
    );
    console.log(token, symbol);
    if (!token) {
      return;
    }
    this.score = new Score({
      percent: 0.9,
      width: 18,
      marginLeft,
      marginRight,
      top: 2,
      link: `https://de-trust-front.vercel.app/tokens/${token}`,
      scores: [
        {
          title: 'Big followers',
          percent: token.project_count_followers_10k_scaled,
          tooltip: token.project_count_followers_10k,
        },
        {
          title: 'Buying power',
          percent: token.buying_power,
        },
        {
          title: 'Holders count',
          percent: token.holders_count_scaled,
          tooltip: token.holders_count,
        },
        {
          title: 'Influence',
          percent: token.project_token_ranked_followers_10k_scaled,
          tooltip: token.project_token_ranked_followers_10k,
        },
        {
          title: 'Holders value',
          percent: token.holders_value_scaled,
          tooltip: token.holders_value,
        },
        {
          title: 'Volume to MC',
          percent: token.volume_to_mc_scaled,
          tooltip: token.volume_to_mc,
        },
      ],
    });
  }
}

export type TokenScoreProps = {
  dataLayer: DetrustDataLayer;
  symbol: string;
  marginLeft?: number;
  marginRight?: number;
};
