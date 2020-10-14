class demo{
    constructor(){
        this.canvas=null;
        this.context=null;
        this.arr=[];
        this.init();
    }
    init(){
        this.canvas=document.createElement('canvas');
        this.canvas.width=800;
        this.canvas.height=1000;
        this.context=this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        for(let i=0;i<100;i++)
            this.arr.push(i);
        this.arr.sort(()=>{
            return Math.random()-0.5;
        })
        this.mergeSort(this.arr,0,this.arr.length-1);
        this.loop();
    }
    async mergeSort(arr,start,end){
        if(start<end)
        {
            const mid=Math.floor((start+end)/2);
            await Promise.all([this.mergeSort(arr,start,mid),this.mergeSort(arr,mid+1,end)]);
            await this.unMerge(arr,start,mid,end);
        }
      
    }
    async unMerge(arr,start,mid,end){
        let n1=mid-start+1;
        let n2=end-mid;
        const L=[];
        const R=[];
        for (let i = 0; i < n1; ++i) 
            L.push(arr[start + i]); 
        for (let j = 0; j < n2; ++j) 
            R.push(arr[mid+ 1 + j]);
        let i = 0, j = 0; 
        let k=start;
        while (i<n1&&j<n2) {
            while (i < n1 && j < n2) { 
                await this.sleep(150);
                if (L[i] <= R[j]) { 
                    
                    arr[k] = L[i]; 
                    i++; 
                } 
                else { 
                    arr[k] = R[j]; 
                    j++; 
                } 
                k++; 
            } 
        }
        while (i < n1) { 
            arr[k] = L[i]; 
            i++; 
            k++; 
        } 
        while (j < n2) { 
            arr[k] = R[j]; 
            j++; 
            k++; 
        } 
    }
    loop(){
        console.log("loop")
        this.draw();
        setTimeout(()=>this.loop(),1000)
    }
    clearSreen()
    {
        this.context.fillStyle="#ffffff"
        this.context.fillRect(0,0,800,1000);
    }
    async draw(){
        //await this.sleep(2000);
        this.clearSreen();
        for (let i = 0; i < this.arr.length; i++) {
           // await this.sleep(100);
            this.context.beginPath();
            this.context.fillStyle="#ff0000";
            this.context.fillRect(i*5,500,2,-this.arr[i]*5);
            this.context.stroke();
        }
    }
    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}
   
const Demo=new demo();



