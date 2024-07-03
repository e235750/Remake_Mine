import {Tile} from "./Tile.js"
import { Title } from "./Title.js";
import { Score } from "./Score.js";
import { config } from "./Config.js";
export class MinesweeperGame {
    //パネル管理、切り替えようクラス
    constructor() {
        this.showTitlePanel(this);
        this.showRule();
        this.init();
    }
    init() {
        const mainTitle = document.querySelector("#main-title");
        const title = document.querySelector("#title-text");
        mainTitle.textContent = config["game-title"];
        title.textContent = config["game-title"];
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
    showRule() {
        const rule = document.querySelector("#description");
        const file = "./rule.txt";
        
        fetch(file)
            .then(response => response.text())
            .then(text => {
                rule.textContent = text;
            })
            .catch(error => {
                console.error('Error fetching the rule file:', error);
            });
    }
}
const game = new MinesweeperGame();