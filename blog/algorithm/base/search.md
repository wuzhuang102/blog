
| 查找算法       | 平均时间复杂度 | 查找条件     |
|:---------------|:---------------|:-------------|
| 顺序查找       | n              | 随意         |
| 二分查找       | logn           | 有序数组     |
| 二叉排序树查找 |                | 二叉排序树   |
| 哈希表法       | 1              | 先创建哈希表 |
| 分块查找       |                |              |

## 1. 顺序查找
循环一遍


## 2. 二分查找
- 实现
    - 选择数组的中间值 mid
    - 如果选中值是待搜索值，返回，执行完毕
    - 如果搜索值小于选中值，则返回步骤1并在选中值左边的子数组中寻找
    - 如果搜索值大于选中值，则返回步骤1并在选中值的右边自数组中寻找
``` js
function binarySearch(arr, value) {
    let low = 0, high = arr.length - 1
    while (low <= high) {
        let mid = Math.floor((low + high) / 2)
        if(value === arr[mid]) {
            return mid
        }else if(value < arr[mid]) { 
            high = mid - 1  // 不相等，边界值剔除
        }else if(value > arr[mid]) {
            low = mid + 1  // 不相等，边界值剔除
        }else {
            return -1
        }
    }
}
```

## 3. 插值查找
- 思路
    - 插值查找是改良版的二分查找
    - 二分查找总是在 mid 位置上，而插值查找可能会根据要搜索的值检查数组中的不同地方
- 实现
    - 使用 position 公式选中一个值
    - 如果这个值是待搜索值，返回，执行完毕
    - 如果搜索值小于选中值，则返回步骤1并在选中值左边的子数组中寻找
    - 如果搜索值大于选中值，则返回步骤1并在选中值的右边自数组中寻找
- 说明
    - 对于表长较大，而关键字分布又比较均匀的查找表来说，插值查找算法的平均性能比二分查找要好的多
``` js
function insertionSort(arr, value) {
    let low = 0, high = arr.length - 1
    while(low <= high ) {
        let mid = low + Math.floor((value - arr[low]) / (arr[high] - arr[low]) * (high - low));
        if(value === arr[mid]) {
            return mid
        }else if(value < arr[mid]) {
            high = mid - 1
        }else if(value > arr[mid]) {
            low = mid + 1
        }else {
            return -1
        }
    }
}
```


<br>
<br>

**博文参考**
- [https://www.cnblogs.com/zhuochong/p/11641247.html](https://www.cnblogs.com/zhuochong/p/11641247.html)