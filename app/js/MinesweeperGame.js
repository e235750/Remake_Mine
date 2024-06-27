import {Tile} from "./Tile.js"
import { Title } from "./Title.js";
export class MinesweeperGame {
    constructor() {
        this.showTitlePanel(this);
    }
    showTitlePanel(me) {
        const title = new Title(this);
        title.createTitle();
    }
    showGamePanel(diff, me) {
        const tile = new Tile(me, diff);
        tile.createPanel();
    }
}
const game = new MinesweeperGame();