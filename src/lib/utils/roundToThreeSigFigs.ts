export const roundToThreeSigFigs = (num: number): number => {
  if (num === 0) {
    return 0;
  }

  const power = Math.floor(Math.log10(Math.abs(num))) - 2;
  const factor = 10 ** -power;
  const rounded = Math.round(num * factor) / factor;

  return rounded;
};
