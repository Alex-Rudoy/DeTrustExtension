import { createPopper } from '@popperjs/core';

import './styles.css';

export class Score {
  pieElement: HTMLDivElement;
  props: ScoreProps;
  letter: ScoreLetter = 'A';

  constructor(props: ScoreProps) {
    this.props = props;
    this.pieElement = this.generateScorePie();
  }

  generateScorePie() {
    const { percent, width, marginLeft, marginRight } = this.props;
    const percentNumber = Math.round(percent * 100);
    const detrust_pie = document.createElement('div');
    detrust_pie.classList.add('detrust_pie');
    detrust_pie.style.setProperty(
      '--detrust-c',
      `hsl(${percentNumber * 1.3 - 20}, 70%, 50%)`,
    );
    detrust_pie.style.setProperty('--detrust-p', `${percentNumber}`);
    detrust_pie.style.setProperty('--detrust-w', `${width}px`);
    detrust_pie.style.setProperty('--detrust-b', `${width / 8}px`);
    detrust_pie.style.setProperty('--detrust-f', `${width / 1.5}px`);
    detrust_pie.style.setProperty('margin-left', `${marginLeft || 0}px`);
    detrust_pie.style.setProperty('margin-right', `${marginRight || 0}px`);

    this.letter = this.letterFromScore(percentNumber);
    const letterSpan = document.createElement('span');
    letterSpan.innerText = this.letter;

    detrust_pie.insertAdjacentElement('beforeend', letterSpan);

    const popup = this.generateHoverPopup();

    document.body.insertAdjacentElement('beforeend', popup);

    detrust_pie.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    const popperInstance = createPopper(detrust_pie, popup);

    const show = () => {
      popup.setAttribute('data-show', '');
      popup.removeAttribute('data-hide');
      popperInstance.update();
    };

    const hide = () => {
      popup.setAttribute('data-hide', '');
      popup.removeAttribute('data-show');
    };

    detrust_pie.addEventListener('mouseenter', show);
    detrust_pie.addEventListener('mouseleave', hide);
    popup.addEventListener('mouseenter', show);
    popup.addEventListener('mouseleave', hide);

    return detrust_pie;
  }

  generateHoverPopup() {
    const bodyStyle = document.body.style;
    const bgColor = bodyStyle.getPropertyValue('background-color');

    const popup = document.createElement('div');
    popup.classList.add('detrust_popup');
    popup.style.setProperty('background-color', bgColor);

    if (
      bgColor === 'rgb(255, 255, 255)' ||
      bgColor === '#ffffff' ||
      bgColor === '#FFFFFF'
    ) {
      popup.classList.add('detrust_popup_white');
    }

    if (bgColor === 'rgb(0, 0, 0)' || bgColor === '#000000') {
      popup.classList.add('detrust_popup_black');
    }

    popup.innerText = 'test test ololo';

    return popup;
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
}

export type ScoreProps = {
  percent: number;
  width: number;
  marginLeft?: number;
  marginRight?: number;
};

export type ScoreLetter = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
