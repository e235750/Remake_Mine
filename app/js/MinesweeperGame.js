import {Tile} from "./Tile.js"
class MinesweeperGame {
    constructor() {
        ;
    }
    showGamePanel() {
        const tile = new Tile("ADVANCED")
        tile.createPanel();
    }
}

const game = new MinesweeperGame();
game.showGamePanel()