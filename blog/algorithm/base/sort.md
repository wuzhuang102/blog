<!-- ![排序复杂度](/algorithm/sorting-complexity.png) -->
| 排序方法   | 最佳时间复杂度 | 平均时间复杂度 | 最差时间复杂度 | 空间复杂度 | 稳定性 |
|:-----------|:---------------|:---------------|:---------------|:-----------|--------|
| 冒泡排序   | n              | n^2            | n^2            | 1          | Y      |
| 插入排序   | n              | n^2            | n^2            | 1          | Y      |
| 选择排序   | n^2            | n^2            | n^2            | 1          |        |
| 二叉树排序 | nlogn          | nlogn          | nlogn          | 1          | Y      |
| 快速排序   | nlogn          | nlogn          | n^2            | logn - n   |        |
| 堆排序     | nlogn          | nlogn          | nlogn          | 1          |        |
| 希尔排序   | nlogn          | nlogn          | n^2            | 1          |        |



## 1. 冒泡排序（Bubble sort）
比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。针对所有的元素重复以上的步骤，除了最后一个。持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

``` js
// 最小的数字往前排，也可把最大的数字往后排
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length - i; j++) {
            if (arr[j] < arr[j - 1]) {
                let bigger = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = bigger
            }
        }
    }
    return arr
}
```

## 2. 选择排序（Selection sort）
依次找到剩余元素最小值，放置排好序的末尾（第一个放在开头）
``` js
function selectionSort(arr) {
    for(let i = 0; i < arr.length; i ++) {
        let min_index = i
        for(let j = i + 1; j < arr.length; j ++) {
            if(arr[j] < arr[min_index]) {
                min_index = j
            }
        }
        let tmp = arr[min_index]
        arr[min_index] = arr[i]
        arr[i] = tmp
    }
    return arr
}
```

## 3. 插入排序（Insertion sort）
插入排序假定第一项已经排序了，从第二项开始比较，插入一个前一项比它小，下一项比它大的位置
``` js
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i, tmp = arr[j]
        while (j > 0 && tmp < arr[j - 1]) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = tmp
    }
    return arr
}
```

## 4. 归并排序（Merge sort）
归并排序是一种分而治之的算法
- 将数组不断的二分直至数组长度 <= 2，
- 返回来组成更大的数组，两个已排好序的数组进行组合
``` js
function mergeSort(arr) {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
}

function merge(left, right) {
    let res = []
    while (left.length > 0 && right.length > 0) {
        left[0] < right[0] ? res.push(left.shift()) : res.push(right.shift())
    }
    return res.concat(left,right)
}
```

## 5. 快速排序（Quicksort）
- 思路
    - 通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序
- 实现
    1. 从数列中任意挑出一个元素，称为 "基准"（pivot）；
    2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
    3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

![快排](/algorithm/quick-sort.gif)
``` js
function quickSort(arr) {
    if (arr.length <= 1) return arr

    let startIndex = Math.floor(arr.length / 2),
        left = [], right = [], mid = []
    arr.map(ele => {
        if (ele === arr[startIndex]) { mid.push(ele) }
        else if (ele < arr[startIndex]) { left.push(ele) }
        else { right.push(ele) }
    });
    return quickSort(left).concat(mid).concat(quickSort(right))
}
```

## 6. 堆排序（Heapsort）
- 思路
    - 利用堆这种数据结构所设计的一种排序算法
    - 堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。
- 实现
    - 将初始待排序关键字排序构成大顶堆，此堆为初始的无序区
    - 将堆顶元素与最后一个元素交换，此时得到新的无序区和新的有序区，且满足 R[1,2,...,n-1] <= R[n]
    - 由于交换后新的堆顶 R[1] 可能违反堆的性质，因此需要对当前无序区(R1,R2,...,Rn-1)调整为新堆，然后再次将
``` js
function heapSort(array) {
    var heapSize = array.length, temp
    // 建堆
    for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapify(array, i, heapSize)
    }
    // 堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
        temp = array[0]
        array[0] = array[j];
        array[j] = temp
        heapify(array, 0, --heapSize)
    }
    return array
}

function heapify(arr, x, len) {
    var left = 2 * x + 1, right = 2 * x + 2, largest = x, temp
    if (left < len && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right
    }
    if(largest != x) {
        temp = arr[x]
        arr[x] = arr[largest]
        arr[largest] = temp
        heapify(arr, largest, len)
    }
}
```
![](/algorithm/heap-sort.gif)

## 7. 二叉树排序

## 8. 希尔排序
- 思想
    - 希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列
- 实现
    - 第一趟排序：假设 gap = 5，即相距距离为 5 的元素组成一组，分为 5 组 ，这 5 组进行一次直接插入排序
    - 第二趟排序：我们把上次的 gap 缩小一半 gap = Math.floor(gap/2) = 2,这样就分成了两组，进行直接插入排序
    - 第三趟排序：gap 再次缩小一半，gap = Math.floor(gap/2) = 1，这样距离为1的元素组成一组，一次快排
- 说明
    - 适用于数据量大，且数据分布均匀的情况
``` js
function shellSort(arr) {
    var gap = 1

    while(gap < arr.length/5) {          //动态定义间隔序列
        gap =gap * 5 + 1;
    }
    while (gap >= 1) {
        for (let i = gap; i < arr.length; i++) {
            let j
            for (j = i - gap; j >= 0 && arr[j] > arr[i]; j = j - gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = arr[i]
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
```

![](/algorithm/shell-sort.gif)

<br>
<br>

**博文参考**
- [排序](https://juejin.im/post/57dcd394a22b9d00610c5ec8)