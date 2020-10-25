class demo {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.arr = [];
        this.color = [];
        this.init();
    }
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        for (let i = 0; i < 1000; i++) {
            this.arr.push(i);
            this.color.push(0);
        }

        this.arr.sort(() => {
            return Math.random() - 0.5;
        })
        this.mergeSort(this.arr, 0, this.arr.length - 1);
        this.loop();
    }
    async mergeSort(arr, start, end) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            await this.mergeSort(arr, start, mid);
            await this.mergeSort(arr, mid + 1, end);
            await this.unMerge(arr, start, mid, end);
        }

    }
    async unMerge(arr, start, mid, end) {
        this.color[start] = 1;
        this.color[end] = 1;
        const L = arr.slice(start, mid + 1);
        const R = arr.slice(mid + 1, end + 1);
        let k = start;
        while (L.length && R.length) {
            if (L[0] <= R[0]) {
                arr[k] = L.shift();
            } else {
                arr[k] = R.shift();
            }
            this.color[k] = 2;
            this.color[k - 1] = 0;
            await this.sleep(5)
            k++;

        }
        while (L.length) {
            arr[k] = L.shift();
            this.color[k] = 2;
            this.color[k - 1] = 0;
            await this.sleep(5)
            k++;
        }
        while (R.length) {
            arr[k] = R.shift();
            this.color[k] = 2;
            this.color[k - 1] = 0;
            await this.sleep(5)
            k++;

        }
        this.color[start] = 0;
        this.color[end] = 0;
        await this.sleep(5);
    }
    loop() {
            this.draw();
            setTimeout(() => this.loop(), 10) // cứ 10fps gọi lại hàm draw vẽ lại
        }
        //xóa màn hình
    clearScreen() {
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, 1200, 1000);
    }
    draw() {
        this.clearScreen();
        for (let i = 0; i < this.arr.length; i++) {
            this.context.beginPath();
            if (this.color[i] == 1)
                this.context.fillStyle = "#ff0000";
            else if (this.color[i] == 2)
                this.context.fillStyle = "#ff00ff";
            else this.context.fillStyle = "#ffffff";
            this.context.fillRect(i * 1, 1000, 1, -this.arr[i])
            this.context.stroke();
        }
    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const Demo = new demo();