export class CustomTile {
    constructor(height, width) {
        this.IMG_WIDTH = width;
        this.IMG_HEIGHT = height;
        this.IMG_BOMB_SRC = "img/bomb.png";
        this.IMG_FLAG_SRC = "img/flag.png";
        this.IMG_TILE_SRC = "img/tile.jpeg";
        this.tile = document.createElement("img");
        this.setDfaultIcon(this.tile, this.IMG_TILE_SRC);
        this.setDefaultUserPermissions(this.tile);
        this._isBomb = false;
        this._isFlag = false;
        this._isOpened = false;
        this.nearBomb = 0;
    }

    //画像のドラッグと選択の禁止
    setDefaultUserPermissions(tile) {
        tile.ondragstart = () => {return false};
        tile.style.userSelect = "none";
        tile.style.mozUserSelect = "none"; //FireFox
        tile.style.msUserSelect  = "none"; //IE, Edge
    }

    _setIcon(tile, src) {
        tile.src = src;
        tile.style.width = `${this.IMG_WIDTH- 2.5}px`;
        tile.style.height = `${this.IMG_HEIGHT- 2.5}px`;
    }
    setBombIcon(tile) {
        this._setIcon(tile, this.IMG_BOMB_SRC);
    }
    setFlagIcon(tile) {
        this._setIcon(tile, this.IMG_FLAG_SRC);
    }
    setDfaultIcon(tile) {
        this._setIcon(tile, this.IMG_TILE_SRC);
    }

    setBomb() {
        this._isBomb = true;
    }
    isBomb() {
        return this._isBomb;
    }
    toggleFlag() {
        this._isFlag = !this._isFlag;
    }
    isFlag() {
        return this._isFlag;
    }
    open() {
        this._isOpened = true;
    }
    isOpened() {
        return this._isOpened;
    }

    setNearBombCount(count) {
        this.nearBomb = count;
    }
    getNearBomb() {
        return this.nearBomb;
    }
}