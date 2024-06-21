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

    //指定した要素(パネル)の子要素を削除
    resetPanelLayout(panel) {
        while(panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
    }

    setGridLayout(panel) {
        panel.style = null;
        panel.style.display = "grid";
        panel.style.gridTemplateColumns = `repeat(${this.FIELD_WIDTH}, 1fr)`;
        panel.style.gridTemplateRows = `repeat(${this.FIELD_HEIGHT}, 1fr)`;
    }
    
    createPanel() {
        this.resetPanelLayout(this.panel);
        for(let i = 0; i < this.FIELD_HEIGHT; i ++) {
            for(let j = 0; j < this.FIELD_WIDTH; j ++) {
                const tile = new CustomTile(this.IMG_HEIGHT, this.IMG_WIDTH);
                tile.tile.id = (this.FIELD_HEIGHT*i + j).toString();
                tile.tile.addEventListener("click", () => {
                    tile.setBombIcon(tile.tile);
                });
                this.panel.appendChild(tile.tile);
            }
        }
        this.setGridLayout(this.panel)
    }

    
}
