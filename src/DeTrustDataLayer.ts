import api from './lib/api';
import { STORAGE_DATA_LAYER_KEY } from './lib/constants';
import { DegenType, TokenType } from './lib/typings';

export class DeTrustDataLayer {
  tokens: TokenType[] = [];
  degens: DegenType[] = [];

  constructor() {
    this.bindMethods();
  }

  bindMethods() {
    this.restoreFromLocalStorage = this.restoreFromLocalStorage.bind(this);
  }

  restoreFromLocalStorage() {
    const storedDataLayer = localStorage.getItem(STORAGE_DATA_LAYER_KEY);

    if (!storedDataLayer) {
      return;
    }

    const { tokens, degens } = JSON.parse(
      storedDataLayer,
    ) as LocalStorageDataLayer;

    if (
      Array.isArray(tokens) &&
      tokens.every((token) => typeof token === 'object')
    ) {
      tokens.forEach((token) => {
        // todo add checks
        // if (...) {
        //   return;
        // }
        this.tokens.push(token);
      });
    }

    if (
      Array.isArray(degens) &&
      degens.every((degen) => typeof degen === 'object')
    ) {
      degens.forEach((degen) => {
        // todo add checks
        this.degens.push(degen);
      });
    }
  }

  async fetchData() {
    const [tokens, degens] = await Promise.all([
      api.getTokens(),
      api.getDegens(),
    ]);
    this.tokens = tokens.data;
    this.degens = degens.data;

    this.updateDataLayerInStorage();
  }

  updateDataLayerInStorage() {
    const dataLayerToBeSaved: LocalStorageDataLayer = {
      tokens: this.tokens,
      degens: this.degens,
    };
    localStorage.setItem(
      STORAGE_DATA_LAYER_KEY,
      JSON.stringify(dataLayerToBeSaved),
    );
  }
}

type LocalStorageDataLayer = {
  tokens: TokenType[];
  degens: DegenType[];
};
