import { DetrustDataLayer } from './DetrustDataLayer';
import {
  CASH_TAG_REGEX,
  DEGEN_MENTION_REGEX,
  DETRUST_VISITED_CLASS,
} from './lib/constants';
import { DegenScore } from './score/DegenScore';
import { Score } from './score/Score';
import { TokenScore } from './score/TokenScore';

export class Detrust {
  dataLayer: DetrustDataLayer;

  constructor() {
    this.dataLayer = new DetrustDataLayer();
    this.bindMethods();
  }

  bindMethods() {
    this.init = this.init.bind(this);
    this.run = this.run.bind(this);
    this.addScoreToTokens = this.addScoreToTokens.bind(this);
    this.addScoreToMentions = this.addScoreToMentions.bind(this);
    this.addScoreToPostAuthor = this.addScoreToPostAuthor.bind(this);
    this.addScoreToUserName = this.addScoreToUserName.bind(this);
  }

  async init() {
    this.dataLayer.restoreFromLocalStorage();
    if (this.dataLayer.tokens.length || this.dataLayer.degens.length) {
      this.run();
      this.dataLayer.fetchData();
      return;
    }
    await this.dataLayer.fetchData();
    this.run();
  }

  run() {
    this.addScoreToTokens();
    this.addScoreToMentions();
    this.addScoreToPostAuthor();
    this.addScoreToUserName();

    setTimeout(() => {
      this.run();
    }, 200);
  }

  addScoreToTokens() {
    const elements = Array.from(document.querySelectorAll('span'));
    elements
      .filter((el) => el.innerText.match(CASH_TAG_REGEX))
      .filter((el) => !el.classList.contains(DETRUST_VISITED_CLASS))
      .filter(
        (el) => el.children.length === 1 && el.children[0].tagName === 'A',
      )
      .forEach((el) => {
        el.classList.add(DETRUST_VISITED_CLASS);
        const score = new TokenScore({
          dataLayer: this.dataLayer,
          symbol: el.innerText.replace('$', ''),
          marginLeft: 4,
        });
        if (!score.score) return;
        el?.insertAdjacentElement('beforeend', score.score.pieElement);
      });
  }

  addScoreToMentions() {
    const elements = Array.from(document.querySelectorAll('span'));
    elements
      .filter((el) => el.innerText.match(DEGEN_MENTION_REGEX))
      .filter((el) => !el.classList.contains(DETRUST_VISITED_CLASS))
      .filter(
        (el) => el.children.length === 1 && el.children[0].tagName === 'A',
      )
      .forEach((el) => {
        el.classList.add(DETRUST_VISITED_CLASS);
        const score = new DegenScore({
          dataLayer: this.dataLayer,
          username: el.innerText.replace('@', ''),
          marginLeft: 4,
        });
        if (!score.score) return;
        el?.parentElement?.insertAdjacentElement(
          'afterend',
          score.score.pieElement,
        );
      });
  }

  addScoreToPostAuthor() {
    const elements = Array.from(document.querySelectorAll('span'));
    elements
      .filter((el) => el.innerText.match(DEGEN_MENTION_REGEX))
      .filter((el) => !el.classList.contains(DETRUST_VISITED_CLASS))
      .filter(
        (el) =>
          el.children.length === 0 &&
          (el.parentElement?.tagName === 'A' ||
            el.parentElement?.parentElement?.tagName === 'A' ||
            el.parentElement?.parentElement?.parentElement?.tagName === 'A'),
      )
      .forEach((el) => {
        el.classList.add(DETRUST_VISITED_CLASS);
        const score = new DegenScore({
          dataLayer: this.dataLayer,
          username: el.innerText.replace('@', ''),
          marginRight: 4,
        });
        if (!score.score) return;
        el?.insertAdjacentElement('beforebegin', score.score.pieElement);
      });
  }

  addScoreToUserName() {
    let element = document.querySelector('[data-testid*="UserName"]');
    if (!element) return;

    if (element.classList.contains(DETRUST_VISITED_CLASS)) return;
    element.classList.add(DETRUST_VISITED_CLASS);

    while (element.tagName !== 'SPAN') {
      element = element?.children[0];
    }

    const score = new DegenScore({
      dataLayer: this.dataLayer,
      username: (element as HTMLSpanElement).innerText.replace('@', ''),
      marginLeft: 4,
    });
    if (!score.score) return;
    element?.insertAdjacentElement('beforeend', score.score.pieElement);
  }
}
