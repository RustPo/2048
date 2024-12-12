import { Tile } from '../Tile/Tile';

export class Cell {
    gameBoard: HTMLElement;
    linkedTile: Tile;
    linkedTileForMerge: Tile;
    x: number;
    y: number;

    constructor(gameBoard: HTMLElement, x: number, y: number) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        this.x = x;
        this.y = y;

        gameBoard.append(cell);
    }

    isEmpty(): boolean {
        return !this.linkedTile;
    }

    linkTile(tile: Tile) {
        this.linkedTile = tile;
        tile.setXY(this.x, this.y);
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    hasTileForMerge(): boolean {
        return !!this.linkedTileForMerge;
    }

    canAccept(newTile: Tile): boolean {
        return this.isEmpty() || (!this.hasTileForMerge() && this.linkedTile.value === newTile.value);
    }

    linkTileForMerge(tile: Tile) {
        tile.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }

    mergeTiles() {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        this.linkedTile.setValue(String(Number(this.linkedTile.value) + Number(this.linkedTileForMerge.value)));
        this.linkedTileForMerge.removeFromDOM();
        this.unlinkTileForMerge();
    }

    unlinkTileForMerge() {
        this.linkedTileForMerge = null;
    }
}
