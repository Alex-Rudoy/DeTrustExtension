import { DeTrust } from './DeTrust2';
import onDocumentLoad from './lib/utils/onDocumentLoad';

onDocumentLoad(() => {
  const detrust = new DeTrust();

  detrust.init();
});
