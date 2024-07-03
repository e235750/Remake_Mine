import { Panel } from "./Panel.js";
import { config } from "./Config.js";
import { difficulty } from "./Difficulty.js";

const css = Object.freeze({
    "title-panel": 
    `
        position: relative;
        height: 300px;
    `,
    "title-text":
    `
        position: absolute;
        font-size: 40px;
        top: 70px;
        left: 23%;
    `,
    "start":
    `
        position: absolute;
        font-size: 30px;
        bottom: 70px;
        left: 29%;
    `,
    "selection":
    `
        position: absolute;
        font-size: 30px;
        bottom: 35px;
        left: 35%;
    `
}); 

export class Title extends Panel {
    constructor(game) {
        super();
        this.game = game;
        this.title = config["game-title"]; // キーが正しいか確認してください
    }
    createPanel() {
        super.resetPanelLayout(this.panel);

        const titlePanel = document.createElement("div");
        titlePanel.style.cssText = css["title-panel"];

        const titleText = document.createElement("div");
        titleText.textContent = this.title;
        titleText.style.cssText = css["title-text"];

        const start = this.createSelection("はじめる");
        start.id = "start";
        start.style.cssText = css["start"];
        start.ondragstart = () => {return false};
        start.addEventListener("click", () => {
            const selection = this.createDifficulty();
            selection.style.cssText = css["selection"]
            start.remove();
            titlePanel.appendChild(selection);
        });

        titlePanel.appendChild(titleText);
        titlePanel.appendChild(start);
        this.panel.appendChild(titlePanel);
    }

    createSelection(text) {
        const select = document.createElement("div");
        const left = document.createElement("span");
        const right = document.createElement("span");
        const content = document.createElement("span");
        left.textContent = "> ";
        left.id = "left";
        left.style.opacity = "0";
        right.textContent = " <"
        right.id = "right";
        right.style.opacity = "0";

        select.appendChild(left);
        content.textContent = text;
        select.appendChild(content);
        select.appendChild(right);
        select.addEventListener("mouseover", () => {
            select.querySelector("#left").style.opacity = "1";
            select.querySelector("#right").style.opacity = "1";;
        });
        select.addEventListener("mouseleave", () => {
            select.querySelector("#left").style.opacity = "0";
            select.querySelector("#right").style.opacity = "0";;
        })
        return select
    }

    createDifficulty() {
        const selection = document.createElement("div");
        for(const item in difficulty) {
            const diff = this.createSelection(difficulty[item][0])
            diff.addEventListener("click", () => {
                this.game.showGamePanel(item);
            });
            diff.style.margin = "3px 0"
            selection.appendChild(diff);
        }
        return selection;
    }
}
