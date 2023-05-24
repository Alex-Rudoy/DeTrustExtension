import { Score } from './Score';
import { TokenScore } from './TokenScore';
import { DeTrustDataLayer } from '../DeTrustDataLayer';
import { DegenType } from '../lib/typings';

export class DegenScore {
  score?: Score;

  constructor({
    dataLayer,
    username,
    marginLeft,
    marginRight,
  }: DegenScoreProps) {
    const degenFound = dataLayer.degens.find(
      (degen) => degen.username.toLowerCase() === username.toLowerCase(),
    );
    if (!degenFound) {
      this.score = new TokenScore({
        dataLayer,
        keyToSearch: 'twitter_screen_name',
        valueToSearch: username,
        marginLeft,
        marginRight,
      }).score;
      return;
    }
    this.score = new Score({
      percent: degenFound.general_score,
      width: 18,
      marginLeft,
      marginRight,
      top: 2,
      link: `https://de-trust-front.vercel.app/degens/${username}`,
      scores: this.scoresFromDegen(degenFound),
    });
  }

  scoresFromDegen(degen: DegenType) {
    return [
      {
        title: 'Popularity',
        percent: degen.popularity_scaled,
        tooltip: degen.popularity,
      },
      {
        title: 'Big Followers',
        percent: degen.big_followers_scaled,
        tooltip: degen.big_followers,
      },
      {
        title: 'Followers',
        percent: degen.followers_count_scaled,
        tooltip: degen.followers_count,
      },
      {
        title: 'Influence',
        percent: degen.influence_scaled,
        tooltip: degen.influence,
      },
      {
        title: 'Predictive score',
        percent: degen.price_change_scaled,
        tooltip: degen.price_change,
      },
      {
        title: 'Assets',
        percent: degen.assets_scaled,
        tooltip: degen.assets,
      },
    ];
  }
}

export type DegenScoreProps = {
  dataLayer: DeTrustDataLayer;
  username: string;
  marginLeft?: number;
  marginRight?: number;
};
