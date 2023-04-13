import { TennisScore } from './tennis-score';

describe('Tennis Score', function () {
  let score: TennisScore;

  beforeEach(() => {
    score = new TennisScore();
  });

  it('should set 15 - 0 when player 1 score', function () {
    score = score.player1Scores();
    expect(score.getScore()).toBe('15 - 0');
  });

  it('should start by Love all', function () {
    expect(score.getScore()).toBe('0 - 0');
  });

  it('should write 40 - 40', function () {
    // ARRANGE
    score = score
      .player1Scores()
      .player1Scores()
      .player2Scores()
      .player1Scores()
      .player2Scores()
      .player2Scores();

    // ACT
    const scoreAsStr = score.getScore();

    // ASSERT
    expect(scoreAsStr).toBe('40 - 40');
  });
});
