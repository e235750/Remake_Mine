import {Tile} from "./Tile.js"
import { Title } from "./Title.js";
class MinesweeperGame {
    constructor() {

    }
    showTitlePanel() {
        const title = new Title();
        title.createTitle();
    }
    // showGamePanel() {
    //     const tile = new Tile("BEGINNER")
    //     tile.createPanel();
    // }
}
const game = new MinesweeperGame();
game.showTitlePanel();
// game.showGamePanel()