class demo {
    constructor() {
            this.canvas = null;
            this.context = null;
            this.arr = [];
            this.color = [];
            this.init();
        }
        //Khởi tạo
    init() {
            this.canvas = document.createElement('canvas');
            this.canvas.width = 800;
            this.canvas.height = 600;
            this.context = this.canvas.getContext('2d');
            document.body.appendChild(this.canvas);
            for (let i = 0; i < 800; i++) {
                this.arr.push(i);
                this.color.push(3); //chưa sắp
            }

            this.arr.sort(() => {
                return Math.random() - 0.5;
            })
            this.mergeSort(this.arr, 0, this.arr.length - 1);
            this.loop();
        }
        //Sort
    async mergeSort(arr, start, end) {

        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            for (let i = start; i < mid; i++)
                this.color[i] = 1; //Màu vàng tách ra merge
            await this.mergeSort(arr, start, mid);
            for (let i = mid + 1; i < end + 1; i++)
                this.color[i] = 1; //Màu vàng tách ra merge
            await this.mergeSort(arr, mid + 1, end);
            await this.unMerge(arr, start, mid, end);
            for (let i = start; i < end + 1; i++)
                this.color[i] = 0; //Màu đỏ đã unMerge
        }

    }
    async unMerge(arr, start, mid, end) {

            let n1 = mid - start + 1;
            let n2 = end - mid;
            const L = [];
            const R = [];
            for (let i = 0; i < n1; ++i) {
                await this.sleep(5)
                L.push(arr[start + i]);
                this.color[start + i] = 2;
            }

            for (let j = 0; j < n2; ++j) {
                await this.sleep(5)
                R.push(arr[mid + 1 + j]);
                this.color[mid + 1 + j] = 2;
            }


            let i = 0,
                j = 0;
            let k = start;
            while (i < n1 && j < n2) {
                while (i < n1 && j < n2) {
                    await this.sleep(5)
                    if (L[i] <= R[j]) {

                        arr[k] = L[i];
                        i++;
                    } else {
                        arr[k] = R[j];
                        j++;
                    }
                    k++;
                    this.color[i] = 0;
                }

            }
            while (i < n1) {
                await this.sleep(5)
                arr[k] = L[i];
                i++;
                k++;
                this.color[i] = 0;
            }
            while (j < n2) {
                await this.sleep(5)
                arr[k] = R[j];
                j++;
                k++;
                this.color[j] = 0;
            }
        }
        //Vòng lặp
    loop() {
            this.draw();
            setTimeout(() => this.loop(), 10) // cứ 10fps gọi lại hàm draw vẽ lại
        }
        //xóa màn hình
    clearSreen() {
        this.context.fillStyle = "#ffffff"
        this.context.fillRect(0, 0, 800, 600);
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
            this.context.fillRect(i, 800, 2, -this.arr[i]);
            this.context.stroke();
        }
    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

const Demo = new demo();