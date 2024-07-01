import { Panel } from "./Panel.js";
import { config } from "./Config.js";

const css = Object.freeze({
    "panel":
    `
        position: relative;
        height: 300px;
    `,
    "message-complete":
    `
        position: absolute;
        font-size: 40px;
        top: 15%;
        left: 17%;
    `,
    "message-failed":
    `
        position: absolute;
        font-size: 40px;
        top: 15%;
        left: 23%;
    `,
    "info":
    `
        position: absolute;
        white-space: pre;
        font-size: 28px;
        bottom: 28%;
        left: 13%;
    `,
    "score":
    `
        margin: 5px 0;
    `,
    "button":
    `   
        display: inline-block;
        border: 5px ridge #333;
        font-size: 30px;
        padding: 7px 3px;
        margin: 0 10px;
    `,
    "option":
    `
        position: absolute;
        bottom: 6%;
        left: 5%;
    `,
}); 

export class Score extends Panel {
    constructor(game, score) {
        super();
        this.game = game;
        this.score = score;
    }

    createPanel() {
        super.resetPanelLayout(this.panel);
        this.panel.style.cssText = css["panel"];
        this.panel.ondragstart = () => {return false};
        this.gameResult(this.score[0]);
    }

    gameResult(result) {
        const message = document.createElement("div");
        if(result) {
            message.textContent = config["game-complete"];
            message.style.cssText = css["message-complete"]
        }
        else {
            message.textContent = config["game-failed"];
            message.style.cssText = css["message-failed"]
        }
        const contents = this.createInfo();
        const info = contents[0];
        const option = contents[1];
        this.panel.appendChild(message);
        this.panel.appendChild(info);
        this.panel.appendChild(option)
    }

    createInfo() {
        const info = document.createElement("div");
        info.style.cssText = css["info"];
        const fieldSize = document.createElement("div");
        fieldSize.style.cssText = css["score"];
        const numBomb = document.createElement("div");
        numBomb.style.cssText = css["score"];
        const time = document.createElement("div");
        time.style.cssText = css["score"];

        let labelSize = "FIELD SIZE:  ";
        let labelBomb = "B O M B  :  ";
        let labelTime = "T I M E  :  ";
        const length = Math.max(labelSize.length, labelBomb.length, labelTime.length);
        labelSize = labelSize.padEnd(length, ' ');
        labelBomb = labelBomb.padStart(length, ' ');
        labelTime = labelTime.padStart(length, ' ');

        fieldSize.textContent   = `${labelSize} ${this.score[2][0]} x ${this.score[2][1]}`;
        numBomb.textContent     = `${labelBomb}   ${this.score[2][2]}`;
        time.textContent        = `${labelTime}${this.score[3]}`;
        info.appendChild(fieldSize);
        info.appendChild(numBomb);
        info.appendChild(time);

        const option = document.createElement("div");
        const conti = document.createElement("span");
        conti.style.cssText = css["button"];
        const exit = document.createElement("span");
        exit.style.cssText = css["button"];
        conti.textContent = "もういちど";
        conti.addEventListener("click", () => {this.handleContinue()});
        exit.textContent = "　やめる　";
        exit.addEventListener("click", () => {this.handleExit()});
        option.appendChild(conti);
        option.appendChild(exit);
        option.style.cssText = css["option"];
        return [info, option];
    }

    handleContinue() {
        this.game.showGamePanel(this.score[1])
    }
    handleExit() {
        this.game.showTitlePanel();
    }
}