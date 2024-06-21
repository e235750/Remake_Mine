import {Tile} from "./Tile.js"
class MinesweeperGame {
    constructor() {
        ;
    }
    showGamePanel() {
        const tile = new Tile("ADVANCED")
        tile.createTile();
    }
}

const game = new MinesweeperGame();
game.showGamePanel()