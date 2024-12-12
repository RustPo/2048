import { Cell } from '../Cell/Cell';

const GRID_SIZE = 4;
const CELLS_SIZE = GRID_SIZE * GRID_SIZE;

export class Grid {
    gameBoard: HTMLElement;
    cellsGropedByColumn: Cell[][];
    cellsGropedByRow: Cell[][];
    cellsGropedByReversedColumn: Cell[][];
    cellsGropedByReversedRow: Cell[][];
    cells: Cell[];

    constructor(gameBoard: HTMLElement) {
        this.gameBoard = gameBoard;
        this.cells = [];

        for (let i = 0; i < CELLS_SIZE; i++) {
            this.cells.push(new Cell(gameBoard, i % GRID_SIZE, Math.floor(i / GRID_SIZE)));
        }

        this.cellsGropedByColumn = this.groupCellsByColumn();
        this.cellsGropedByRow = this.groupCellsByRow();
        this.cellsGropedByReversedColumn = this.groupCellsByColumn().map((column) => [...column].reverse());
        this.cellsGropedByReversedRow = this.groupCellsByRow().map((row) => [...row].reverse());
    }

    getRandomEmptyCell(): Cell {
        const emptyCells = this.cells.filter((cell) => cell.isEmpty());

        const randomIndex = Math.floor(Math.random() * emptyCells.length);

        return emptyCells[randomIndex];
    }

    groupCellsByColumn(): Cell[][] {
        return this.cells.reduce((gropedCells: Cell[][], cell) => {
            gropedCells[cell.x] = gropedCells[cell.x] || [];
            gropedCells[cell.x][cell.y] = cell;
            return gropedCells;
        }, []);
    }

    groupCellsByRow(): Cell[][] {
        return this.cells.reduce((gropedCells: Cell[][], cell) => {
            gropedCells[cell.y] = gropedCells[cell.y] || [];
            gropedCells[cell.y][cell.x] = cell;
            return gropedCells;
        }, []);
    }
}
