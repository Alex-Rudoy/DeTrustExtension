export const BASE_URL = 'https://plankton-app-awr8q.ondigitalocean.app';
export const STORAGE_DATA_LAYER_KEY = 'DetrustDataLayer';

export const DETRUST_VISITED_CLASS = 'detrust_visited';

export const CASH_TAG_REGEX = /^\$\w{1,10}$/g;
export const DEGEN_MENTION_REGEX = /(^@\w{1,15})\b/g;

export const scoreLetterToDescriptionMap = {
  S: '',
  A: 'Highly reliable account for informed decisions.',
  B: 'Generally reliable, exercise caution before deciding.',
  C: 'Average reliability, verify information independently for accuracy.',
  D: 'Questionable reliability, seek additional sources for confirmation.',
  E: 'Unreliable account, cross-check facts with trusted sources.',
  F: 'Highly unreliable account, avoid making decisions based on it.',
};
