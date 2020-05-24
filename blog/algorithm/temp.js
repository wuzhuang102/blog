// 数组统计
function FindNumOfArr(arr) {
    var num_appear_obj = {}
    for (let i = 0; i < arr.length; i++) {
        num_appear_obj[arr[i]] = (num_appear_obj[arr[i]] || 0) + 1
        if (num_appear_obj[arr[i]] > arr.length / 2) {
            return arr[i]
            break;
        }
    }
}