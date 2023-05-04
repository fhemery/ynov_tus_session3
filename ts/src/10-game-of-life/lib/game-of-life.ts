import {Grid} from "./model/grid";
import {Cell} from "./model/cell";

export class GameOfLife {
  static readonly UNDERPOPULATION_CAP = 2;
  static readonly OVERPOPULATION_CAP = 3;
  static readonly CREATION_CAP = 3;

  nextGeneration(grid: Grid): Grid {
    const aliveCells = grid.aliveCells;
    const neighbours = this.computeNeighbors(grid, aliveCells);
    return this.generateNewGrid(aliveCells, neighbours, grid);
  }

  private generateNewGrid(aliveCells: Cell[], neighbours: number[][], grid: Grid): Grid {
    const newGrid = new Grid(grid.rows, grid.cols);
    this.killCells(aliveCells, neighbours, newGrid);
    this.spawnNewCells(grid, neighbours, aliveCells, newGrid);
    return newGrid;
  }

  private spawnNewCells(grid: Grid, neighbours: number[][], aliveCells: Cell[], newGrid: Grid) {
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        if (neighbours[row][col] === GameOfLife.CREATION_CAP && !aliveCells.some(cell => cell.row === row + 1 && cell.col === col + 1)) {
          newGrid.withAliveCell(row + 1, col + 1);
        }
      }
    }
  }

  private killCells(aliveCells: Cell[], neighbours: number[][], newGrid: Grid) {
    for (const cell of aliveCells) {
      if (neighbours[cell.row - 1][cell.col - 1] >= GameOfLife.UNDERPOPULATION_CAP && neighbours[cell.row - 1][cell.col - 1] <= GameOfLife.OVERPOPULATION_CAP) {
        newGrid.withAliveCell(cell.row, cell.col);
      }
    }
  }

  private computeNeighbors(grid: Grid, aliveCells: Cell[]) {
    const neighbours = Array.from({length: grid.rows}, () => Array.from({length: grid.cols}, () => 0));
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        neighbours[row][col] = aliveCells
          .filter(cell => Math.abs(cell.row - 1 - row) <= 1 && Math.abs(cell.col - 1 - col) <= 1)
          .filter(cell => cell.row - 1 !== row || cell.col - 1 !== col)
          .length
      }
    }
    return neighbours;
  }
}
