const mergeSort = (arr) => {
    if (arr.length <= 1)
        return arr;
    const right = [...arr];
    const mid = Math.floor(arr.length / 2);
    const left = right.splice(0, mid);
    return unMerge(mergeSort(left), mergeSort(right));
}
const unMerge = (left, right) => {
    const newArr = [];
    while (left.length && right.length) {
        if (left[0] <= right[0])
            newArr.push(left.shift());
        else newArr.push(right.shift());
    }
    const result = [...newArr, ...left, ...right];
    return result;
}

const arr = [];
for (let i = 0; i < 100; i++)
    arr.push(i);
const arrTest = arr.sort(() => Math.random() - 0.5)

console.time();
mergeSort(arrTest);
console.timeEnd();
console.log(arrTest)