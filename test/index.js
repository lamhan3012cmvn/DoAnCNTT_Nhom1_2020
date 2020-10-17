const mergeSort=(arr)=>{
    if(arr.length<=1)
        return arr;
    const right=[...arr];
    const mid=Math.floor(arr.length/2);
    const left=right.splice(0,mid);
    return unMerge(mergeSort(left),mergeSort(right));
}
const unMerge=(left,right)=>{
    const newArr=[];
    while (left.length&&right.length) {
        if(left[0]<=right[0])
            newArr.push(left.shift());
        else newArr.push(right.shift());
    }
    const result=[...newArr,...left,...right];
    return result;
}
// const arr= [2,5,6,1];
// const mergeSort=(arr,start, end)=>{
//     if(end>start)
//     {
//         const mid = Math.floor((start + end)/2);
//         console.log(mid)
//         mergeSort(arr, start, mid);//???
//         mergeSort(arr, mid+1, end);//???
//         console.log("me")
//         unMerge(arr, start,mid, end);
//         console.table(arr)
//     }
    
// }
// const unMerge=(arr, start,mid, end)=>{
//    let i = start;
//    let j = mid;
//    while(i<=mid && j<=end)
//    {
//         if(arr[i] < arr[j])
//         {
//             swap(arr,i,j);   
//         }
//         i++;
//         j++;
//     }
// }
// const swap = (arr, a, b) => {
//     const temp = arr[a];
//     arr[a] = arr[b];
//     arr[b] = temp;
// }
// console.time();
// mergeSort(arr,0,arr.length);
// console.log(arr);
// console.timeEnd();


