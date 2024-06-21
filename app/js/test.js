const difficulty = Object.freeze({
    "BEGINNER": [5, 5, 5],
    "INTERMEDIATE": [9, 9, 9],
    "ADVANCED": [16, 16, 40],
});

class Panel {
    // Panelクラスの定義（必要に応じて追加してください）
}

class Tile extends Panel {
    constructor(diff) {
        super();
        this.tile = document.getElementsByClassName("panel");
        this.param = difficulty[diff];
        this.FIELD_HEIGHT = this.param[0];
        this.FIELD_WIDTH = this.param[1];
        this.NUM_BOMB = this.param[2];
        alert(`Height: ${this.FIELD_HEIGHT}, Width: ${this.FIELD_WIDTH}, Bombs: ${this.NUM_BOMB}`);
    }
}

// MinesweeperGameクラスの定義
class MinesweeperGame {
    constructor() {
        // 初期化処理があればここに追加
    }

    showGamePanel() {
        const tile = new Tile("BEGINNER");
    }
}

const game = new MinesweeperGame();
game.showGamePanel();
