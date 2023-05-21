export class Score {
  html: string = '';

  constructor() {
    this.generateHtml();
  }

  generateHtml() {
    const percentNumber = Math.round(percent * 100);
    const style = {
      '--c': `hsl(${percentNumber * 1.3 - 20}, 70%, 50%)`,
      '--p': percentNumber,
      '--w': `${width}px`,
      '--b': `${width / 10}px`,
    } as CSSProperties;

    return (
      <div className={styles.pie} style={style} {...props}>
        <Text size={fontSize}>{percentNumber}</Text>
        {absoluteData ? (
          <div className={styles.tooltip}>{Math.round(absoluteData)}</div>
        ) : null}
      </div>
    );
  }

  letterFromScore(score: number) {
    switch (true) {
      case score >= 99:
        return 'S';
        break;

      case score >= 90:
        return 'A';

      default:
        break;
    }
  }
}
