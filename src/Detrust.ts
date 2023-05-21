import { DetrustDataLayer } from './DetrustDataLayer';
import { CASH_TAG_REGEX } from './lib/constants';
import { delay } from './lib/utils/delay';
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
  }

  async init() {
    await delay(500);
    const elements = Array.from(document.querySelectorAll('span'));
    console.log(elements);
    elements.forEach((el) => {
      if (el.innerHTML.match(CASH_TAG_REGEX)) {
        console.log(el);
        const score = new Score();
        el?.insertAdjacentHTML('afterend', score.html);
      }
    });

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
    // find all token mentions on page
    // add stuff
    setTimeout(() => {
      this.run();
    }, 500);
  }
}
