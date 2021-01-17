class demo {
    constructor(width, height, size, delay) {
        this.canvas = null;
        this.context = null;
        this.arr = [];
        this.color = [];
        this.w = width;
        this.h = height;
        this.delay = delay;
        this.size = size;
        this.fps = null;
    }
    //Khởi tạo
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.context = this.canvas.getContext('2d');
        document.querySelector('.demo').appendChild(this.canvas);
        for (let i = 0; i < this.w / this.size; i++) {
            this.arr.push(i);
            this.color.push(3); //chưa sắp
        }

        this.arr.sort(() => {
            return Math.random() - 0.5;
        })
        this.mergeSort(this.arr, 0, this.arr.length - 1);
        this.loop();
        // this.draw();
    }
    //Sort
    async mergeSort(arr, start, end) {

        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            for (let i = start; i < mid; i++) {
                await this.sleep(this.delay)
                this.color[i] = 1; //Màu vàng tách ra merge
            }
            await this.mergeSort(arr, start, mid);
            for (let i = mid + 1; i < end + 1; i++) {
                await this.sleep(this.delay)
                this.color[i] = 1; //Màu vàng tách ra merge
            }
            await this.mergeSort(arr, mid + 1, end);
            await this.unMerge(arr, start, mid, end);
            for (let i = start; i < end + 1; i++) {
                await this.sleep(this.delay)
                this.color[i] = 0; //Màu đỏ đã unMerge
            }

        }

    }
    async checkSortArr() {
        return this.arr.every((element, index) => element === index) && this.color.every((element) => element === 0)
    }
    async unMerge(arr, start, mid, end) {

        let n1 = mid - start + 1;
        let n2 = end - mid;
        const L = [];
        const R = [];
        for (let i = 0; i < n1; ++i) {
            await this.sleep(this.delay)
            L.push(arr[start + i]);
            this.color[start + i] = 2;
        }
        for (let j = 0; j < n2; ++j) {
            await this.sleep(this.delay)
            R.push(arr[mid + 1 + j]);
            this.color[mid + 1 + j] = 2;
        }
        let i = 0,
            j = 0;
        let k = start;
        while (i < n1 && j < n2) {
            while (i < n1 && j < n2) {
                await this.sleep(this.delay)
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

        }
        while (i < n1) {
            await this.sleep(this.delay)
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            await this.sleep(this.delay)
            arr[k] = R[j];
            j++;
            k++;
        }
    }
    //Vòng lặp
    async loop() {
        this.draw();
        this.fps = setTimeout(() => this.loop(), 10) // cứ 1fps gọi lại hàm draw vẽ lại
        const result = await this.checkSortArr();
        if (result === true) {
            clearTimeout(this.fps)
        }
    }
    //xóa màn hình
    clearSreen() {
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0, 0, this.w, this.h);
    }
    draw() {
        this.clearSreen();
        for (let i = 0; i < this.arr.length; i++) {
            this.context.beginPath();
            if (this.color[i] == 1)
                this.context.fillStyle = "#ffff00";
            else if (this.color[i] == 0)
                this.context.fillStyle = "#ff0000";
            else if (this.color[i] == 2)
                this.context.fillStyle = "#0000ff";
            else this.context.fillStyle = "#000000";
            this.context.fillRect(i * this.size, this.h, this.size, -this.arr[i] * this.size);
            this.context.stroke();
        }
    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}