export class CustomTile {
    constructor(height, width) {
        this.IMG_WIDTH = width;
        this.IMG_HEIGHT = height;
        this.IMG_BOMB_SRC_1 = "img/bomb/bomb_tile1.png";
        this.IMG_BOMB_SRC_2 = "img/bomb/bomb_tile2.png";
        this.IMG_FLAG_SRC_1 = "img/flag/flag_tile1.png";
        this.IMG_FLAG_SRC_2 = "img/flag/flag_tile2.png";
        this.IMG_TILE_SRC_1 = "img/tile/ground_1.png";
        this.IMG_TILE_SRC_2 = "img/tile/ground_2.png";
        this.IMG_NUMBERS_SRC_1 = Object.freeze(["img/numbers/normal/zero.png"  ,
                                                "img/numbers/normal/one.png"   ,
                                                "img/numbers/normal/tow.png"   ,
                                                "img/numbers/normal/three.png" ,
                                                "img/numbers/normal/four.png"  ,
                                                "img/numbers/normal/five.png"  ,
                                                "img/numbers/normal/six.png"   ,
                                                "img/numbers/normal/seven.png" ,
                                                "img/numbers/normal/enght.png"]);
        this.IMG_NUMBERS_SRC_2 = Object.freeze(["img/numbers/hover/zero.png"  ,
                                                "img/numbers/hover/one.png"   ,
                                                "img/numbers/hover/tow.png"   ,
                                                "img/numbers/hover/three.png" ,
                                                "img/numbers/hover/four.png"  ,
                                                "img/numbers/hover/five.png"  ,
                                                "img/numbers/hover/six.png"   ,
                                                "img/numbers/hover/seven.png" ,
                                                "img/numbers/hover/enght.png"]);
        this.tile = document.createElement("img");
        this.setGroundIcon1(this.tile);
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
        tile.style.width = `${this.IMG_WIDTH-0.5}px`;
        tile.style.height = `${this.IMG_HEIGHT-0.5}px`;
    }
    setBombIcon1(tile) {
        this._setIcon(tile, this.IMG_BOMB_SRC_1);
    }
    setBombIcon2(tile) {
        this._setIcon(tile, this.IMG_BOMB_SRC_2);
    }
    setFlagIcon1(tile) {
        this._setIcon(tile, this.IMG_FLAG_SRC_1);
    }
    setFlagIcon2(tile) {
        this._setIcon(tile, this.IMG_FLAG_SRC_2);
    }
    setGroundIcon1(tile) {
        this._setIcon(tile, this.IMG_TILE_SRC_1);
    }
    setGroundIcon2(tile) {
        this._setIcon(tile, this.IMG_TILE_SRC_2);
    }
    setNumberIcon1(tile, nearBomb) {
        this._setIcon(tile, this.IMG_NUMBERS_SRC_1[nearBomb]);
    }
    setNumberIcon2(tile, nearBomb) {
        this._setIcon(tile, this.IMG_NUMBERS_SRC_2[nearBomb]);
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