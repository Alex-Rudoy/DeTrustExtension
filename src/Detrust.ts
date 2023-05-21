import { DetrustDataLayer } from './DetrustDataLayer';

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
