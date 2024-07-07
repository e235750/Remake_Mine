import {Tile} from "./Tile.js"
import { Title } from "./Title.js";
import { Score } from "./Score.js";
import { config } from "./Config.js";
export class MinesweeperGame {
    //パネル管理、切り替え、クッキー管理
    constructor() {
        this.showRule();
        //タイトル->0, ゲーム->1, スコア->2 
        this.state = 0;
        this.tile = {};
        this.args = [];
        this.init();
        this.cookies = this.extractCookies();
        this.start(this.cookies)
    }
    init() {
        const mainTitle = document.querySelector("#main-title");
        const title = document.querySelector("#title-text");
        mainTitle.textContent = config["game-title"];
        title.textContent = config["game-title"];
    }
    setTile(tile) {
        this.tile = tile;
    }
    start(cookies) {
        const state = cookies["state"];
        if(state === 0 || cookies === "") {
            this.showTitlePanel();
        }
        if(state === 1) {
            const diff = cookies["args"]["diff"];
            this.showGamePanel(diff, cookies);
        }
        if(state === 2) {
            this.showScorePanel(cookies["args"]);
        }
    }

    // extractCookies() {
    //     let cookies = document.cookie === "" ? 'cookie={"state": 0, "args": {}}' : document.cookie;
    //     const jsonString = cookies.split("=");
    //     cookies = JSON.parse(jsonString[1]);
    //     console.log("Extracted cookies:", cookies)
    //     return cookies;
    // }
    
    //容量面からsessionStotage使用 https://b-risk.jp/blog/2021/07/sessionstorage/
    extractCookies() {
        let cookies = sessionStorage.getItem("cookie") === null ? '{"state": 0, "args": {}}' : sessionStorage.getItem("cookie");
        cookies = JSON.parse(cookies);
        return cookies;
    }
    showTitlePanel() {
        this.state = 0;
        const title = new Title(this);
        title.createPanel();
        window.addEventListener("beforeunload", () => {
            this.setCookies({});
        });
    }
    showGamePanel(diff, cookies) {
        this.state = 1;
        const tile = new Tile(this, diff, cookies);
        tile.createPanel();
        window.addEventListener("beforeunload", () => {
            this.setCookies(tile.getCookies());
        });
    }
    showScorePanel(args) {
        this.state = 2;
        const score = new Score(this, args);
        score.createPanel();
        this.args = args;
        window.addEventListener("beforeunload", () => {
            this.setCookies(args);
        });
    }

    setCookies(args) {
        let cookie = {state: this.state, args: args};
        sessionStorage.setItem("cookie", JSON.stringify(cookie));
    }

    //ルールを記述
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