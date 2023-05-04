import {GameOfLife} from './game-of-life';
import {Grid} from "./model/grid";

import {Cell} from "./model/cell";

describe('gameOfLife', () => {

  it('should return an empty grid if grid is empty at the beginning', function () {
    const grid = new Grid(2,4)
    const gameOfLife = new GameOfLife();
    const result = gameOfLife.nextGeneration(grid);

    expect(result.aliveCells).toEqual([]);
  });

  it('should kill any cell with less than two neighbourds ', function () {
    const grid = new Grid(2,4).withAliveCell(1,1).withAliveCell(1,2).withAliveCell(2,4);
    const gameOfLife = new GameOfLife();
    const result = gameOfLife.nextGeneration(grid);

    expect(result.aliveCells).toEqual([]);
  });

  it('should kill any cell that has more than 3 neighbors', function () {
    const grid = new Grid(2,4)
      .withAliveCell(1,1).withAliveCell(1,2).withAliveCell(1,3)
      .withAliveCell(2,1).withAliveCell(2,3);

    const gameOfLife = new GameOfLife();
    const result = gameOfLife.nextGeneration(grid);

    expect(result.aliveCells).not.toContainEqual(new Cell(1,2));
  });

  it('should keep alive any cell with two or three neighbours', function () {
    const grid = new Grid(2,4).withAliveCell(1,1).withAliveCell(1,2).withAliveCell(1,3);
    const gameOfLife = new GameOfLife();
    const result = gameOfLife.nextGeneration(grid);

    expect(result.aliveCells).toContainEqual(new Cell(1,2));
  });

  it('should spawn any cell with exactly 3 neighbors', function () {
    const grid = new Grid(2,4).withAliveCell(1,1).withAliveCell(1,2).withAliveCell(1,3);
    const gameOfLife = new GameOfLife();
    const result = gameOfLife.nextGeneration(grid);

    expect(result.aliveCells).toContainEqual(new Cell(2,2));
  });

});
