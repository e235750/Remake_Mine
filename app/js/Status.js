export class Status {
    constructor(panel) {
        this.footer = document.querySelector(".status");
        this.flagCounter = this.footer.querySelector("#flag-counter");
        this.timer = this.footer.querySelector(".timer")
        this.time = new Date();
        this.minute = this.timer.querySelector("#mm");
        this.second = this.timer.querySelector("#ss");
        this.millisecond = this.timer.querySelector("#ms");
        this.stop = false;
        this.NUM_FLAG = panel.getDefaultBomb();
        this.setFlagCount(0);
    }
    
    setFlagCount(count) {
        this.flagCounter.textContent = `${count}/${this.NUM_FLAG}`;
    }
    flagReset() {
        this.flagCounter.textContent = `0/${this.NUM_FLAG}`;
    }

    getNowTime() {
        return this.minute.innerHTML + ":" + this.second.innerHTML  + ":" + this.millisecond.innerHTML ;
    }
    
    timerReset() {
        this.minute.textContent = "00";
        this.second.textContent = "00";
        this.millisecond.textContent = "00";
    }
    timerSet(mm, ss, ms) {
        this.minute.textContent = mm;
        this.second.textContent = ss;
        this.millisecond.textContent = ms;
    }

    timerStart() {
        this.stop = false;
        this.timerReset();
        const startTime = Date.now();
        const rep = setInterval(() => {
            if(this.stop) {
                clearInterval(rep)
                return 0;
            };
            const nowTime = Date.now() - startTime;
            let mm = Math.floor(nowTime / 60000);
            let ss = Math.floor((nowTime % 60000) / 1000);
            let ms = Math.floor((nowTime % 1000) / 10);
            
            mm = String(mm).padStart(2, 0);
            ss = String(ss).padStart(2, 0);
            ms = String(ms).padStart(2, 0);
            this.timerSet(mm, ss, ms);
        }, 10);
    }
    timerStop() {
        this.stop = true;
    }
}   