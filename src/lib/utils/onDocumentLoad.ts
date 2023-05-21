const onDocumentLoad = (onReadyCallback: () => void) => {
  const state = document.readyState;

  if (state === 'complete' || state === 'interactive') {
    setTimeout(onReadyCallback, 1);
    return;
  }

  document.addEventListener('DOMContentLoaded', onReadyCallback as any);
};

export default onDocumentLoad;
