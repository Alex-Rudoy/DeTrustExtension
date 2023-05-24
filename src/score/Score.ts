import { Instance, createPopper } from '@popperjs/core';
import { postfixNumber } from '../lib/utils/postfixNumber';

export class Score {
  props: ScoreProps;
  pieElement: HTMLDivElement;
  popupElement: HTMLDivElement;
  popperInstance?: Instance;
  percentNumber: number = 0;
  letter: ScoreLetter = 'A';

  constructor(props: ScoreProps) {
    this.props = props;
    this.bindMethods();
    const { percent, width, marginLeft, marginRight, top } = this.props;
    this.pieElement = this.generateScorePie(
      percent,
      width,
      undefined,
      marginLeft,
      marginRight,
      top,
    );
    this.popupElement = this.generateHoverPopup();
    this.popperInstance = createPopper(this.pieElement, this.popupElement);
    this.addEventListeners();
    this.percentNumber = Math.round(percent * 100);
    this.letter = this.letterFromScore(this.percentNumber);
  }

  bindMethods() {
    this.generateScorePie = this.generateScorePie.bind(this);
    this.generateHoverPopup = this.generateHoverPopup.bind(this);
    this.addEventListeners = this.addEventListeners.bind(this);
    this.letterFromScore = this.letterFromScore.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.postAuthorFix = this.postAuthorFix.bind(this);
  }

  generateScorePie(
    percent: number,
    width: number,
    tooltip?: number,
    marginLeft?: number,
    marginRight?: number,
    top?: number,
  ) {
    const percentNumber = Math.round(percent * 100);
    const letter = this.letterFromScore(percentNumber);

    const pieElement = document.createElement('div');
    pieElement.classList.add('detrust_pie');
    pieElement.style.setProperty(
      '--detrust-c',
      `hsl(${percentNumber * 1.3 - 20}, 70%, 50%)`,
    );
    pieElement.style.setProperty('--detrust-p', `${percentNumber}`);
    pieElement.style.setProperty('--detrust-w', `${width}px`);
    pieElement.style.setProperty('--detrust-b', `${width / 8}px`);
    pieElement.style.setProperty('--detrust-f', `${width / 1.7}px`);
    pieElement.style.setProperty('margin-left', `${marginLeft || 0}px`);
    pieElement.style.setProperty('margin-right', `${marginRight || 0}px`);
    pieElement.style.setProperty('top', `${top || 0}px`);

    const letterSpan = document.createElement('span');
    letterSpan.innerText = letter;

    pieElement.insertAdjacentElement('beforeend', letterSpan);

    if (tooltip) {
      pieElement.insertAdjacentHTML(
        'beforeend',
        `<div class="tooltip">${postfixNumber(tooltip)}</div>`,
      );
    }

    return pieElement;
  }

  generateHoverPopup() {
    const bodyStyle = document.body.style;
    const bgColor = bodyStyle.getPropertyValue('background-color');

    const popup = document.createElement('div');
    popup.classList.add('detrust_popup');

    bodyStyle.setProperty('--detrust-bgc', bgColor);

    if (
      bgColor === 'rgb(255, 255, 255)' ||
      bgColor === '#ffffff' ||
      bgColor === '#FFFFFF'
    ) {
      // if light mode
      bodyStyle.setProperty('--detrust-text', 'rgb(83, 100, 113)');
      bodyStyle.setProperty('--detrust-title', 'rgb(15, 20, 25)');
      bodyStyle.setProperty(
        '--detrust-shadow',
        'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px',
      );
    } else if (bgColor === 'rgb(0, 0, 0)' || bgColor === '#000000') {
      // if full dark mode
      bodyStyle.setProperty('--detrust-text', 'rgb(113, 118, 123)');
      bodyStyle.setProperty('--detrust-title', 'rgb(231, 233, 234)');
      bodyStyle.setProperty(
        '--detrust-shadow',
        'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
      );
    } else {
      // if dim mode
      bodyStyle.setProperty('--detrust-text', 'rgb(139, 152, 165)');
      bodyStyle.setProperty('--detrust-title', 'rgb(247, 249, 249)');
      bodyStyle.setProperty(
        '--detrust-shadow',
        'rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px',
      );
    }

    const titleLine = `
      <div class="title_line">
        <p class="title">DeTrust Score</p>
        <a href="${this.props.link}" target="_blank" rel="noopener noreferrer">more...</a>
      </div>
    `;
    popup.insertAdjacentHTML('beforeend', titleLine);

    this.props.scores.forEach((score) => {
      const scoreLine = document.createElement('div');
      scoreLine.classList.add('score_line');
      const pieElement = this.generateScorePie(
        score.percent,
        28,
        score.tooltip,
      );
      scoreLine.insertAdjacentElement('beforeend', pieElement);
      scoreLine.insertAdjacentHTML('beforeend', `<p>${score.title}</p>`);
      popup.insertAdjacentElement('beforeend', scoreLine);
    });

    document.body.insertAdjacentElement('beforeend', popup);

    return popup;
  }

  addEventListeners() {
    this.pieElement.addEventListener('mouseenter', this.showPopup);
    this.pieElement.addEventListener('mouseleave', this.hidePopup);
    this.pieElement.addEventListener('mouseenter', this.postAuthorFix);
    this.pieElement.addEventListener('mouseover', this.postAuthorFix);
    this.pieElement.addEventListener('click', this.postAuthorFix);
    this.popupElement.addEventListener('mouseenter', this.showPopup);
    this.popupElement.addEventListener('mouseleave', this.hidePopup);
  }

  letterFromScore(score: number): ScoreLetter {
    switch (true) {
      // case score >= 99:
      //   return 'S';
      case score >= 90:
        return 'A';
      case score >= 75:
        return 'B';
      case score >= 60:
        return 'C';
      case score >= 45:
        return 'D';
      case score >= 25:
        return 'E';
      default:
        return 'F';
    }
  }

  showPopup() {
    this.popupElement.setAttribute('data-show', '');
    this.popupElement.removeAttribute('data-hide');
    this.popperInstance?.update();
  }

  hidePopup() {
    this.popupElement.setAttribute('data-hide', '');
    this.popupElement.removeAttribute('data-show');
  }

  postAuthorFix(e: MouseEvent) {
    e.stopPropagation();
    const mouseLeaveEvent = new MouseEvent('mouseout', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const target = e.target as HTMLDivElement;
    target.parentElement?.dispatchEvent(mouseLeaveEvent);
  }
}

export type ScoreProps = {
  percent: number;
  width: number;
  link: string;
  scores: {
    title: string;
    percent: number;
    tooltip?: number;
  }[];
  marginLeft?: number;
  marginRight?: number;
  top?: number;
};

export type ScoreLetter = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
