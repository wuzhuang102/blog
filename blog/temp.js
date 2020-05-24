function SelectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min_index = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j
            }
        }
        let tmp = arr[i]
        arr[i] = arr[min_index]
        arr[min_index] = tmp
    }
    return arr
}

function unique(arr, is_sorted) {
    var arr_res = []
    if (is_sorted) {
        for (var i = 0; i < arr.length; i++) {
            if (!i || arr[i] !== arr[i]) {
                arr_res.push(arr[i])
            }
        }
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr_res.indexOf(arr[i]) === -1) {
                arr_res.push(arr[i])
            }
        }
    }
}