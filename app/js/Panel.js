export class Panel {
    //パネルの親クラス
    //Title, Tile, Scoreクラスのスーパークラス
    constructor() {
        this.panel = document.querySelector(".panel");
        this.PANEL_WIDTH = this.panel.getBoundingClientRect().width;
    }
    //指定した要素(パネル)の子要素を削除
    resetPanelLayout(panel) {
        while(panel.firstChild) {
            panel.removeChild(panel.firstChild);
        }
    }
    append(child) {
        this.panel.appendChild(child);
    }
}