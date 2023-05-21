import { Detrust } from './Detrust';
import onDocumentLoad from './lib/utils/onDocumentLoad';

onDocumentLoad(() => {
  const detrust = new Detrust();

  detrust.init();
});
