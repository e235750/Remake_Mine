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
    }

    createTile() {
        const tiles = document.createElement("div");
        tiles.className = "tile";
        const width = this.panel.getBoundingClientRect().width;
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const tile = document.createElement("div");
                tile.id = (this.FIELD_HEIGHT*i + j).toString();
                const dflt = document.createElement("img");
                dflt.src = "img/tile.jpeg";
                dflt.alt = "default-tile"+　(this.FIELD_HEIGHT*i + j).toString();
                dflt.style.width = `${width/this.FIELD_WIDTH - 2.5}px`;
                dflt.style.height = `${width/this.FIELD_WIDTH - 2.5}px`;
                tile.appendChild(dflt);
                tiles.appendChild(tile);
            }
        }
        while (this.panel.firstChild) {
            this.panel.removeChild(this.panel.firstChild);
        }
        this.panel.appendChild(tiles);

        tiles.style.display = "grid";
        tiles.style.gridTemplateColumns = `repeat(${this.FIELD_WIDTH}, 1fr)`;
        tiles.style.gridTemplateRows = `repeat(${this.FIELD_HEIGHT}, 1fr)`;
    }
}
