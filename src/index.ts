import { DeTrust } from './DeTrust';
import onDocumentLoad from './lib/utils/onDocumentLoad';

onDocumentLoad(() => {
  const detrust = new DeTrust();

  detrust.init();
});
