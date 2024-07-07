import {Panel} from "./Panel.js";
import {difficulty} from "./Difficulty.js";
import {CustomTile} from "./CustomTile.js";
import {Status} from "./Status.js";

const msg = "スコアを見る";
const css = Object.freeze({
    "message":
    `
        position: absolute;
        width: 200px;
        height: 100px;
        border: 5px ridge #333;
        padding: 7px 3px;
        margin: 0 10px;
        background-color: white;
        opacity: 0.9;
        left: 20.5%;
        bottom: 40%;
    `,
    "description":
    `
        position: absolute;
        left: 17%;
        bottom: 55%;
        font-size: 22px;
    `,
    "next":
    `
        position: absolute;
        border: 5px ridge #333;
        padding: 7px 5px;
        background-color: #75A9FF;
        left: 30%;
        font-size: 20px;
        bottom: 10%;
        margin: 0 auto;
    `,
})

export class Tile extends Panel {
    //メインゲーム画面
    //タイルへのクリックリスナー、成功・失敗時の処理を実装
    constructor(game, diff, cookie) {
        super();
        this.cookie = cookie;
        this.game = game;
        this.diff = diff;
        this.param = difficulty[this.diff];
        this.FIELD_HEIGHT = this.param["height"];
        this.FIELD_WIDTH = this.param["width"];
        this.NUM_BOMB = this.param["bomb"];
        this.flagCount = 0;
        this.tiles = [];
        this.open = 0;
        this.status = new Status(this);
        this.flag = false;
        this.resume = this.cookie === undefined ? false : true;
    }

    getCookies() {
        document.cookie = "";
        const cookies = {
            "diff": this.diff,
            "tiles": {},
            "flagCount": 0,
            "time": "00:00:00",
        };
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                cookies["tiles"][`${(this.FIELD_HEIGHT*i + j)}`] = this.createCookie(this.tiles[i][j]);
            }
        }
        cookies["flagCount"] = this.flagCount;
        cookies["time"] = this.status.getNowTime();
        return cookies;
    }
    createCookie(bomb) {
        let cookieString = {
            isBomb: bomb.isBomb(),
            isFlag: bomb.isFlag(),
            isOpened: bomb.isOpened(),
            nearBomb: bomb.getNearBomb(),
        };
        return cookieString;
    }

    getTiles() {
        return this.tiles;
    }

    getDefaultBomb() {
        return this.NUM_BOMB;
    }

    setGridLayout(panel) {
        panel.style = null;
        panel.style.position = "relative";
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
                tile.tile.addEventListener("click", () => {
                    this.handleLeftClick(tile);
                });
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
        }
        if(!this.resume) {
            this.placeBombs(this.tiles);
            this.bombCountNearby(this.tiles);
            this.status.timerStart();
        }
        this.resumeTile();
        this.setGridLayout(this.panel)
    }
    resumeTile() {
        if(!this.resume) return;
        const args = this.cookie["args"];
        this.flagCount = parseInt(args["flagCount"]);
        this.status.setFlagCount(this.flagCount);
        let time = args["time"];
        time = time.split(":").map(x => parseInt(x));
        //すでに経過している時間
        const passed = time[0]*60*1000 + time[1]*1000 + time[2];
        //すでに爆弾タイルを開けているか
        let failed = false;
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const tile = this.tiles[i][j];
                if(args["tiles"][this.FIELD_HEIGHT*i+j]["isBomb"]) tile.setBomb();
                if(args["tiles"][this.FIELD_HEIGHT*i+j]["isFlag"]) tile.toggleFlag();
                tile.setNearBombCount(parseInt(args["tiles"][this.FIELD_HEIGHT*i+j]["nearBomb"]));
                if(args["tiles"][this.FIELD_HEIGHT*i+j]["isOpened"]) {
                    tile.open();
                    if(tile.setNumberIcon1(tile.tile, tile.getNearBomb()));
                    if(tile.isBomb()) {
                        failed = true;
                    }
                }
                else {
                    if(tile.isFlag()) tile.setFlagIcon1(tile.tile);
                }
                this.tiles[i][j] = tile
            }
        }
        this.status.timerStart(passed);
        if(failed) {
            this.flag = true;
            this.status.timerStop();
            this.showAllBomb(this.tiles);
            this.gameExit();
        }
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
        if(!tile.isFlag() && !tile.isOpened() && !this.flag) {
            tile.open();
            if(tile.isBomb()) {
                this.flag = true;
                this.status.timerStop();
                tile.explosion(tile.tile);
                setTimeout(() => {
                    this.showAllBomb(this.tiles);
                    tile.setBombIcon1(tile.tile);
                    this.gameExit(false);
                }, 1100);
            }
            else {
                this.open ++;
                if(this.open === (this.FIELD_HEIGHT * this.FIELD_HEIGHT) - this.NUM_BOMB) {
                    this.status.timerStop();
                    this.gameExit(true);
                }
            
                tile.setNumberIcon1(tile.tile, tile.getNearBomb())
            
            }
        }
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
    gameExit(result) {
        const message = document.createElement("div");
        message.style.cssText = css["message"];

        const description = document.createElement("div");
        description.textContent = msg;
        description.style.cssText = css["description"];

        const next = document.createElement("div");
        next.textContent = "すすむ";
        next.style.cssText = css["next"];
        next.addEventListener("click", () => {this.handleGameResult(result)});
        next.addEventListener("mouseover", () => {next.style.backgroundColor = "#5277b4"});
        next.addEventListener("mouseleave", () => {next.style.backgroundColor = "#75A9FF"});
        message.appendChild(description);
        message.appendChild(next);
        this.panel.appendChild(message);
    }
    
    handleGameResult(result) {
        const args = {
            "result": result,
            "diff": this.diff,
            "param": {"diff": this.diff, "height": this.FIELD_HEIGHT, "width": this.FIELD_WIDTH, "bomb": this.NUM_BOMB},
            "time": this.status.getNowTime(),
        };
        this.status.timerReset();
        this.status.flagReset();
        this.game.showScorePanel(args);
    }
    
    handleMouseOver(tile) {
        if(!this.flag){
            if(!tile.isOpened()) {
                if(!tile.isFlag()) tile.setGroundIcon2(tile.tile);
                else tile.setFlagIcon2(tile.tile);
            }
            else {
                tile.setNumberIcon2(tile.tile, tile.getNearBomb());
            }
        }
    }
    handleMouseLeave(tile) {
        if(!this.flag) {
            if(!tile.isOpened()) {
                if(!tile.isFlag()) tile.setGroundIcon1(tile.tile);
                else tile.setFlagIcon1(tile.tile);
            }
            else {
                tile.setNumberIcon1(tile.tile, tile.getNearBomb());
            }
        }
    }
}
