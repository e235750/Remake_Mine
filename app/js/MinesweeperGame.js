import {Tile} from "./Tile.js"
import { Title } from "./Title.js";
import { Score } from "./Score.js";
export class MinesweeperGame {
    constructor() {
        this.showTitlePanel(this);
    }
    showTitlePanel() {
        const title = new Title(this);
        title.createPanel();
    }
    showGamePanel(diff) {
        const tile = new Tile(this, diff);
        tile.createPanel();
    }
    showScorePanel(args) {
        const score = new Score(this, args);
        score.createPanel();
    }
}
const game = new MinesweeperGame();