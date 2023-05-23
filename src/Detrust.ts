import { DetrustDataLayer } from './DetrustDataLayer';
import {
  CASH_TAG_REGEX,
  DEGEN_MENTION_REGEX,
  DETRUST_VISITED_CLASS,
} from './lib/constants';
import { Score } from './score/Score';

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
        const score = new Score({ percent: 0.9, width: 18, marginLeft: 4 });
        el?.insertAdjacentElement('beforeend', score.pieElement);
        el.classList.add(DETRUST_VISITED_CLASS);
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
        const score = new Score({ percent: 0.9, width: 18, marginLeft: 4 });
        el?.parentElement?.insertAdjacentElement('afterend', score.pieElement);
        // el.parentElement?.style.setProperty('flex-direction', 'row');
        el.classList.add(DETRUST_VISITED_CLASS);
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
        const score = new Score({ percent: 0.9, width: 18, marginRight: 4 });
        el?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.insertAdjacentElement(
          'beforebegin',
          score.pieElement,
        );
        el.classList.add(DETRUST_VISITED_CLASS);
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

    const score = new Score({ percent: 0.9, width: 18, marginLeft: 4 });
    element?.insertAdjacentElement('beforeend', score.pieElement);
  }
}
