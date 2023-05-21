import './styles.css';

export class Score {
  html: string = '';

  constructor() {
    this.html = this.generateScorePie(85, 18);
  }

  generateScorePie(percent: number, width: number) {
    const percentNumber = Math.round(percent * 100);
    const letter = this.letterFromScore(percentNumber);
    const style = {
      '--c': `hsl(${percentNumber * 1.3 - 20}, 70%, 50%)`,

      '--p': percentNumber,
      '--w': `${width}px`,
      '--b': `${width / 10}px`,
      '--f': `${width / 1.5}px`,
    };

    return `
      <div className="detrust_pie" style={${style}}>
        <span>${letter}</span>
      </div>
    `;
  }

  letterFromScore(score: number) {
    switch (true) {
      case score >= 99:
        return 'S';
      case score >= 90:
        return 'A';
      case score >= 75:
        return 'B';
      case score >= 60:
        return 'C';
      case score >= 45:
        return 'D';
      case score >= 25:
        return 'E';
      default:
        return 'F';
    }
  }
}
