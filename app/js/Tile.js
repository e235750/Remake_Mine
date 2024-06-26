import {Panel} from "./Panel.js";
import {difficulty} from "./Difficulty.js";
import {CustomTile} from "./CustomTile.js";
import {Status} from "./Status.js";

export class Tile extends Panel {
    constructor(game, diff) {
        super();
        this.game = game;
        this.param = difficulty[diff][1];
        this.diff = diff;
        this.FIELD_HEIGHT = this.param[0];
        this.FIELD_WIDTH = this.param[1];
        this.NUM_BOMB = this.param[2];
        this.flagCount = 0;
        this.tiles = [];
        this.open = 0;
        this.status = new Status(this);
    }

    getDefaultBomb() {
        return this.NUM_BOMB;
    }

    setGridLayout(panel) {
        panel.style = null;
        panel.style.display = "grid";
        panel.style.gridTemplateColumns = `repeat(${this.FIELD_WIDTH}, 1fr)`;
        panel.style.gridTemplateRows = `repeat(${this.FIELD_HEIGHT}, 1fr)`;
    }

    placeBombs(tiles) {
        let y, x, now;
        now = 0;
        while(now < this.NUM_BOMB) {
            y = Math.floor(Math.random()*(this.FIELD_HEIGHT-1));
            x = Math.floor(Math.random()*(this.FIELD_WIDTH-1));
            if(!tiles[y][x].isBomb()) {
                console.log(y, x);
                tiles[y][x].setBomb();
                now ++;
            }
        }
    }
    
    createPanel() {
        super.resetPanelLayout(this.panel);
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            const row = [];
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const tile = new CustomTile(this.PANEL_WIDTH, this.FIELD_WIDTH);
                tile.tile.id = (this.FIELD_HEIGHT*i + j).toString();
                tile.tile.addEventListener("click", () => {this.handleLeftClick(tile)});
                tile.tile.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.handleRightClick(tile);
                });
                tile.tile.addEventListener("mouseover", () => {this.handleMouseOver(tile)});
                tile.tile.addEventListener("mouseleave", () => {this.handleMouseLeave(tile)});
                this.panel.appendChild(tile.tile);
                row.push(tile);
            }
            this.tiles.push(row);
            this.status.timerStart();
        }
        this.placeBombs(this.tiles);
        this.bombCountNearby(this.tiles);
        this.setGridLayout(this.panel)
    }

    bombCountNearby(tiles) {
        for(let y = 0; y < this.FIELD_HEIGHT; y ++) {
            for(let x = 0; x < this.FIELD_WIDTH; x ++) {
                if(!tiles[y][x].isBomb()) {
                    let count = 0;
                    for(let i = y-1; i <= y+1; i ++) {
                        for(let j = x-1; j <= x+1; j ++) {
                            if(i == y && j == x) continue;
                            if(i < 0 || i >= this.FIELD_HEIGHT || j < 0 || j >= this.FIELD_WIDTH) continue;
                            if(tiles[i][j].isBomb()) count ++;
                        }
                    }
                    tiles[y][x].setNearBombCount(count);
                }
            }
        } 
    }

    showAllBomb(tiles) {
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const _tiles = tiles[i][j];
                _tiles.tile.style.pointerEvents = "none";
                if(_tiles.isFlag()) {
                    _tiles.toggleFlag();
                    this.flagCount = 0;
                    _tiles.setGroundIcon1(_tiles.tile)
                }
                if(_tiles.isBomb()) {
                    _tiles.open();
                    _tiles.setBombIcon1(_tiles.tile);
                }
                else {
                    _tiles.setNumberIcon1(_tiles.tile, _tiles.getNearBomb());
                }
            }
        }
    }

    handleLeftClick(tile) {
        if(!tile.isFlag() && !tile.isOpened()) {
            tile.open();
            if(tile.isBomb()) {
                this.showAllBomb(this.tiles);
                tile.setBombIcon2(tile.tile);
                this.status.timerStop();
                this.handleGameResult(false);
            }
            else {
                this.open ++;
                if(this.open === (this.FIELD_HEIGHT * this.FIELD_HEIGHT) - this.NUM_BOMB) {
                    this.status.timerStop();
                    this.handleGameResult();
                }
                console.log(this.open);
                tile.setNumberIcon1(tile.tile, tile.getNearBomb())
            }
        }
    }
    handleGameResult(result) {
        this.status.timerReset();
        this.status.flagReset();
        const args = [];
        args.push(result);
        args.push(this.diff);
        args.push(this.param);
        args.push(this.status.getNowTime());
        this.game.showScorePanel(args);
    }

    handleRightClick(tile) {
        if(!tile.isOpened()) {
            if(!tile.isFlag()) {
                if(this.flagCount < this.NUM_BOMB){
                    tile.toggleFlag();
                    this.flagCount ++;
                    tile.setFlagIcon2(tile.tile);
                }
            }
            else {
                tile.toggleFlag();
                this.flagCount --;
                tile.setGroundIcon2(tile.tile);
            }
            this.status.setFlagCount(this.flagCount);
        }
    }
    handleMouseOver(tile) {
        if(!tile.isOpened()) {
            if(!tile.isFlag()) tile.setGroundIcon2(tile.tile);
            else tile.setFlagIcon2(tile.tile);
        }
        else {
            if(tile.isBomb()) tile.setBombIcon2(tile.tile);
            else tile.setNumberIcon2(tile.tile, tile.getNearBomb());
        }
    }
    handleMouseLeave(tile) {
        if(!tile.isOpened()) {
            if(!tile.isFlag()) tile.setGroundIcon1(tile.tile);
            else tile.setFlagIcon1(tile.tile);
        }
        else {
            if(tile.isBomb()) tile.setBombIcon1(tile.tile);
            else tile.setNumberIcon1(tile.tile, tile.getNearBomb());
        }
    }
}
