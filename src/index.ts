import './index.css';
import { Grid, Tile, Cell } from './services';
// import { Grid } from './services';

const gameBoard = document.getElementById('game-board');

const grid = new Grid(gameBoard);
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
const tg = window.Telegram.WebApp;

if (tg.version > '6.0') {
    tg.requestFullscreen();
    tg.lockOrientation();
    tg.addToHomeScreen();
}

setUpInputOnce();

function setUpInputOnce() {
    window.addEventListener('keydown', handleInput, { once: true });
}

async function handleInput(e: KeyboardEvent) {
    switch (e.key) {
        case 'ArrowDown':
            if (!canMoveDown()) {
                setUpInputOnce();
                return;
            }
            await moveDown();
            break;
        case 'ArrowUp':
            if (!canMoveUp()) {
                setUpInputOnce();
                return;
            }
            await moveUp();
            break;
        case 'ArrowLeft':
            if (!canMoveLeft()) {
                setUpInputOnce();
                return;
            }
            await moveLeft();
            break;
        case 'ArrowRight':
            if (!canMoveRight()) {
                setUpInputOnce();
                return;
            }
            await moveRight();
            break;
        default:
            setUpInputOnce();
            return;
    }

    const newTile = new Tile(gameBoard);
    grid.getRandomEmptyCell().linkTile(newTile);

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        await newTile.waitForAnimationEnd();
        alert('try again');
        return;
    }

    setUpInputOnce();
}

async function moveUp() {
    await slideTiles(grid.cellsGropedByColumn);
}

async function moveDown() {
    await slideTiles(grid.cellsGropedByReversedColumn);
}

async function moveLeft() {
    await slideTiles(grid.cellsGropedByRow);
}

async function moveRight() {
    await slideTiles(grid.cellsGropedByReversedRow);
}

async function slideTiles(groupedTiles: Cell[][]) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    const promises: Promise<any>[] = [];
    groupedTiles.forEach((group) => slideTilesInGroup(group, promises));

    await Promise.all(promises);

    grid.cells.forEach((cell) => cell.hasTileForMerge() && cell.mergeTiles());
}

function slideTilesInGroup(group: Cell[], promises: Promise<any>[]) {
    for (let i = 1; i < group.length; i++) {
        if (group[i].isEmpty()) {
            continue;
        }

        const cellWithTile = group[i];

        let targetCell;
        let j = i - 1;
        while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
            targetCell = group[j];
            j--;
        }

        if (!targetCell) {
            continue;
        }

        promises.push(cellWithTile.linkedTile.waitForTransitionEnd());

        if (targetCell.isEmpty()) {
            targetCell.linkTile(cellWithTile.linkedTile);
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }

        cellWithTile.unlinkTile();
    }
}

function canMoveUp(): boolean {
    return canMove(grid.cellsGropedByColumn);
}

function canMoveDown(): boolean {
    return canMove(grid.cellsGropedByReversedColumn);
}
function canMoveLeft(): boolean {
    return canMove(grid.cellsGropedByRow);
}
function canMoveRight(): boolean {
    return canMove(grid.cellsGropedByReversedRow);
}

function canMove(groupCell: Cell[][]) {
    return groupCell.some((group) => canMoveInGroup(group));
}

function canMoveInGroup(group: Cell[]): boolean {
    return group.some((cell, index) => {
        if (index === 0) return false;

        if (cell.isEmpty()) return false;

        const targetCell = group[index - 1];

        return targetCell.canAccept(cell.linkedTile);
    });
}
