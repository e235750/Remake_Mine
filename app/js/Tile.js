import {Panel} from "./Panel.js";
import {difficulty} from "./Difficulty.js";
import {CustomTile} from "./CustomTile.js";


export class Tile extends Panel {
    constructor(diff) {
        super();
        this.panel = document.querySelector(".panel");
        this.param = difficulty[diff];
        this.FIELD_HEIGHT = this.param[0];
        this.FIELD_WIDTH = this.param[1];
        this.NUM_BOMB = this.param[2];
        this.PANEL_WIDTH = this.panel.getBoundingClientRect().width;
        this.setImageSize(this.PANEL_WIDTH);
    }

    setImageSize(PANEL_WIDTH) {
        const imgWidth = PANEL_WIDTH/this.FIELD_WIDTH;
        console.log(this.FIELD_HEIGHT)
        this.IMG_WIDTH = imgWidth;
        this.IMG_HEIGHT = imgWidth;
    }

    createTile(i, j) {
        const tile = document.createElement("div");
        tile.id = (this.FIELD_HEIGHT*i + j).toString();
        const dflt = document.createElement("img");
        dflt.src = "img/tile.jpeg";
        dflt.alt = "default-tile"+　(this.FIELD_HEIGHT*i + j).toString();
        dflt.style.width = `${this.IMG_WIDTH- 2.5}px`;
        dflt.style.height = `${this.IMG_HEIGHT- 2.5}px`;
        tile.appendChild(dflt);
        return tile
    }

    //指定した要素(パネル)の子要素を削除
    resetPanelLayout(panel) {
        while(panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
    }

    setGridLayout(tiles) {
        tiles.style.display = "grid";
        tiles.style.gridTemplateColumns = `repeat(${this.FIELD_WIDTH}, 1fr)`;
        tiles.style.gridTemplateRows = `repeat(${this.FIELD_HEIGHT}, 1fr)`;
    }
    
    createPanel() {
        const tiles = document.createElement("div");
        tiles.className = "tile";
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const tile = this.createTile(i, j)
                tile.addEventListener("click", () => {
                    const img = tile.querySelector("img");
                    img.src = "img/bomb.png";
                    img.style.width = `${this.IMG_WIDTH- 2.5}px`;
                    img.style.height = `${this.IMG_HEIGHT- 2.5}px`;
                });
                tiles.appendChild(tile);
            }
        }
        this.setGridLayout(tiles)
        this.resetPanelLayout(this.panel);
        this.panel.appendChild(tiles);
    }

    
}
