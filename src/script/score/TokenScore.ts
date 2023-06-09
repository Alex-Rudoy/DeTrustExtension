import { Score } from './Score';
import { TokenType } from '../../lib/typings';
import { DeTrustDataLayer } from '../DeTrustDataLayer';

export class TokenScore {
  score?: Score;
  constructor({
    dataLayer,
    keyToSearch = 'symbol',
    valueToSearch,
    marginLeft,
    marginRight,
  }: TokenScoreProps) {
    const tokenFound = dataLayer.tokens.find(
      (token) =>
        token[keyToSearch].toLowerCase() === valueToSearch.toLowerCase(),
    );
    if (!tokenFound) {
      return;
    }
    this.score = new Score({
      percent: tokenFound.general_score,
      width: 18,
      marginLeft,
      marginRight,
      top: 2,
      link: `https://de-trust-front.vercel.app/tokens/${tokenFound.symbol}`,
      scores: this.scoresFromToken(tokenFound),
    });
    this.addButtonsToPopup();
  }

  scoresFromToken(token: TokenType) {
    return [
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
    ];
  }

  addButtonsToPopup() {
    if (!this.score?.popupElement) return;
    const buttons = `
      <div class="detrust-buttons">
        <button class="detrust-button detrust-button-buy">Buy</button>
        <button class="detrust-button detrust-button-sell">Sell</button>
      </div>
    `;
    this.score.popupElement.insertAdjacentHTML('beforeend', buttons);
    this.score.popupElement
      .querySelectorAll('.detrust-button')
      .forEach((button) => {
        button.addEventListener('click', () => {
          chrome.runtime.sendMessage({ detrustOpenPopup: true });
        });
      });
  }
}

export type TokenScoreProps = {
  dataLayer: DeTrustDataLayer;
  keyToSearch?: 'symbol' | 'twitter_screen_name';
  valueToSearch: string;
  marginLeft?: number;
  marginRight?: number;
};
