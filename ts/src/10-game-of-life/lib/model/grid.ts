import {Cell} from "./cell";

export class Grid {
  private _cells: boolean[][];
  get aliveCells(): Cell[] {
    const result = [];
    for(let row = 0; row < this.rows; ++row) {
      for(let col = 0; col < this.cols; ++col) {
        if(this._cells[row][col]) {
          result.push(new Cell(row+1, col+1));
        }
      }
    }
    return result;
  }

  constructor(readonly rows: number, readonly cols: number) {
    this._cells = Array.from({length: rows}, () => Array.from({length: cols}, () => false));
  }

  withAliveCell(row: number, col: number): Grid {
    this._cells[row-1][col-1] = true;
    return this;
  }
}
