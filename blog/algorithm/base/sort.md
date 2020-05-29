![排序复杂度](/algorithm/sorting-complexity.png)


## 冒泡排序（Bubble sort）
比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。针对所有的元素重复以上的步骤，除了最后一个。持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

``` js
// 最小的数字往前排，也可把最大的数字往后排
function BubbleSort(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i; j < arr.length - 1; j++) {
            if(arr[j] > arr[j+1]) {
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr
}
```

## 选择排序（Selection sort）
依次找到剩余元素最小值，放置排好序的末尾（第一个放在开头）
``` js
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
```


## 插入排序（Insertion sort）



## 归并排序（Merge sort）



## 原地归并排序（In-place merge sort）



## 快速排序（Quicksort）
- 思路
    - 通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序
- 实现
    1. 从数列中挑出一个元素，称为 "基准"（pivot）；
    2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
    3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

![快排](/algorithm/quick-sort.gif)



## 堆排序（Heapsort）




[排序](https://juejin.im/post/57dcd394a22b9d00610c5ec8)