export enum Score {
  Love = '0',
  Fifteen = '15',
  Thirty = '30',
  Forty = '40',
  Advantage = 'Adv.',
  Game = 'Game',
}

export class TennisScore {
  private player1Score = Score.Love;
  private player2Score = Score.Love;

  player1Scores(): TennisScore {
    const { first, second } = this.computeScore(
      this.player1Score,
      this.player2Score
    );
    this.player1Score = first;
    this.player2Score = second;

    return this;
  }

  private computeScore(
    winningPointScore: Score,
    opponentScore: Score
  ): { first: Score; second: Score } {
    if (winningPointScore === Score.Game || opponentScore === Score.Game) {
      throw new Error('Game is over');
    }
    switch (winningPointScore) {
      case Score.Love:
        return { first: Score.Fifteen, second: opponentScore };
      case Score.Fifteen:
        return { first: Score.Thirty, second: opponentScore };
      case Score.Thirty:
        return { first: Score.Forty, second: opponentScore };
      case Score.Forty:
        if (this.player2Score === Score.Forty) {
          return { first: Score.Advantage, second: opponentScore };
        } else if (this.player2Score === Score.Advantage) {
          return { first: Score.Forty, second: Score.Forty };
        } else {
          return { first: Score.Game, second: opponentScore };
        }
      case Score.Advantage:
        return { first: Score.Game, second: opponentScore };
    }
  }

  player2Scores(): TennisScore {
    const { first, second } = this.computeScore(
      this.player2Score,
      this.player1Score
    );
    this.player2Score = first;
    this.player1Score = second;

    return this;
  }

  getScore(): string {
    return `${this.player1Score} - ${this.player2Score}`;
  }
}
