class demo{
    constructor(){
        this.canvas=null;
        this.context=null;
        this.arr=[];
        this.color=[];
        this.init();
    }
    //Khởi tạo
    init(){
        this.canvas=document.createElement('canvas');
        this.canvas.width=1200;
        this.canvas.height=1000;
        this.context=this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        for(let i=0;i<100;i++)
        {
            this.arr.push(i);
            this.color.push(3);//chưa sắp
        }
            
        this.arr.sort(()=>{
            return Math.random()-0.5;
        })
        this.mergeSort(this.arr,0,this.arr.length-1);
        this.loop();
    }
    //Sort
    async mergeSort(arr,start,end){
       
        if(start<end)
        {
            const mid=Math.floor((start+end)/2);
            await this.mergeSort(arr,start,mid);
            // for(let i=mid+1;i<end+1;i++)
            //     this.color[i]=1;//Màu vàng tách ra merge
            await this.mergeSort(arr,mid+1,end);
            await this.unMerge(arr,start,mid,end);
            // for(let i=start;i<end+1;i++)
            //     this.color[i]=0;//Màu đỏ đã unMerge
            //this.color[start]=0;
            //this.color[end]=0;
        }
      
    }
    async unMerge(arr,start,mid,end){
        this.color[start]=1;
        this.color[end]=1;
        let n1=mid-start+1;
        let n2=end-mid;
        const L=[];
        const R=[];
        for (let i = 0; i < n1; ++i) 
        {
            L.push(arr[start + i]);
        }
        for (let j = 0; j < n2; ++j) 
        {
            R.push(arr[mid+ 1 + j]);
        }
        let i = 0, j = 0; 
        let k=start;
        while (i<n1&&j<n2) {
            while (i < n1 && j < n2) { 
                //await this.sleep(100)
                if (L[i] <= R[j]) { 
                    arr[k] = L[i]; 
                    await this.sleep(100)        
                    i++; 
                } 
                else { 
                    arr[k] = R[j]; 
                    await this.sleep(100)
                    j++; 
                }                
                k++;
                await this.sleep(100) 
                this.color[k]=2;
                this.color[k-1]=0;
            } 
           
        }
        while (i < n1) { 
            await this.sleep(100)
            arr[k] = L[i]; 
            i++; 
            this.color[k]=2;
            this.color[k-1]=0;
            k++; 
        } 
        while (j < n2) { 
            await this.sleep(100)
            arr[k] = R[j]; 
            j++; 
            this.color[k]=2;
            this.color[k-1]=0;
            k++; 
            
        }
        await this.sleep(100)
        this.color[start]=0;
        this.color[end]=0;
    }
    //Vòng lặp
    loop(){
       this.draw();
        setTimeout(()=>this.loop(),10)// cứ 10fps gọi lại hàm draw vẽ lại
    }
    //xóa màn hình
    clearScreen()
    {
        this.context.fillStyle="#000000"
        this.context.fillRect(0,0,1200,1000);
    }
     draw(){
        this.clearScreen();
        for (let i = 0; i < this.arr.length; i++) {
            this.context.beginPath();
            if(this.color[i]==1)
                this.context.fillStyle ="#ff0000";
            else if(this.color[i]==2)
                this.context.fillStyle ="#ff00ff";
            else this.context.fillStyle ="#ffffff";
            this.context.fillRect(i*11,500,10,-this.arr[i]*5)
            this.context.stroke();
        }
    }
    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}
   
const Demo=new demo();



