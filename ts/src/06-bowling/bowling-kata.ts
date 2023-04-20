export class BowlingKata {
  getScore(framesAsStr: string): number {
    const frames = framesAsStr.split(" ");

    return frames
      .map((frame, index) => this.getFrameScore(frame, index, frames))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  private getThrowScore(aThrow: string): number {
    const throwAsInt = parseInt(aThrow);
    return isNaN(throwAsInt) ? 0 : throwAsInt;
  }

  private getFrameScore(frame: string, currentFrameIndex: number, frames: string[]) {
    if (this.isStrike(frame)) {
      return this.handleStrikeFrame(frames, currentFrameIndex);
    }
    if (this.isSpare(frame)) {
      return 10 + this.getThrowScore(frames[currentFrameIndex + 1][0]);
    }
    return this.getThrowScore(frame[0]) + this.getThrowScore(frame[1]);
  }

  private handleStrikeFrame(frames: string[], currentFrameIndex: number) {
    let score = 10;
    if (this.isSpare(frames[currentFrameIndex + 1])) {
      score += 10;
    } else {
      score += this.getThrowScore(frames[currentFrameIndex + 1][0]) + this.getThrowScore(frames[currentFrameIndex + 1][1]);
    }
    return score;
  }

  private isSpare(frame: string) {
    return frame.includes("/");
  }

  private isStrike(frame: string) {
    return frame[0] === "X";
  }
}