import { DeTrustDataLayer } from './DeTrustDataLayer';
import {
  CASH_TAG_REGEX,
  DEGEN_MENTION_REGEX,
  DETRUST_VISITED_CLASS,
  scoreLetterToDescriptionMap,
} from './lib/constants';
import { DegenScore } from './score/DegenScore';
import { TokenScore } from './score/TokenScore';

import './styles.css';

export class DeTrust {
  dataLayer: DeTrustDataLayer;

  constructor() {
    this.dataLayer = new DeTrustDataLayer();
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
          valueToSearch: el.innerText.replace('$', ''),
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
    const userNameBlock = document.querySelector('[data-testid*="UserName"]');
    if (!userNameBlock) return;

    if (userNameBlock.classList.contains(DETRUST_VISITED_CLASS)) return;
    userNameBlock.classList.add(DETRUST_VISITED_CLASS);

    let targetElement = userNameBlock;
    while (targetElement.tagName !== 'SPAN') {
      if (targetElement?.children.length === 0) return;
      targetElement = targetElement.children[0];
    }

    let username = '';
    Array.from(userNameBlock.querySelectorAll('span')).forEach((el) => {
      if (el.innerText.match(DEGEN_MENTION_REGEX)) {
        username = el.innerText.replace('@', '');
      }
    });

    const score = new DegenScore({
      dataLayer: this.dataLayer,
      username,
      marginLeft: 4,
      marginRight: 4,
    });
    if (!score.score) return;

    targetElement?.insertAdjacentElement('beforeend', score.score.pieElement);

    const note = document.createElement('div');
    note.classList.add('detrust_degen_note');
    note.style.setProperty(
      'color',
      `hsl(${score.score.percentNumber * 1.3 - 20}, 70%, 50%)`,
    );
    note.innerText = scoreLetterToDescriptionMap[score.score.letter];
    targetElement?.insertAdjacentElement('beforeend', note);
  }
}
