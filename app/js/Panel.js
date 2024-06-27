export class Panel {
    constructor() {
        this.panel = document.querySelector(".panel");
        this.PANEL_WIDTH = this.panel.getBoundingClientRect().width;
        this.panel.ondragstart = () => {return false};
        this.panel.style.userSelect = "none";
        this.panel.style.mozUserSelect = "none"; //FireFox
        this.panel.style.msUserSelect  = "none"; //IE, Edge
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