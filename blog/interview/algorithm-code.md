# 算法题

## 1. 红包的平均分配问题

-   **方案一**：保证每次随机分红包的均值 等于每个人平均能分到的值

```js
function devideRedPackage(moneyAmount, peopleNum) {
    // 人数处理，最小金额处理
    const minAmount = 0.01;
    let moneyList = [],
        moneyRemain = moneyAmount;
    for (let i = 0; i < peopleNum; i++) {
        let redPackageAmount;
        if (i === peopleNum - 1) {
            redPackageAmount = moneyRemain;
        } else {
            redPackageAmount = Math.random() * ((moneyRemain / (peopleNum - i)) * 2 - 0.02) + 0.01;
        }
        redPackageAmount = redPackageAmount.toFixed(2) * 1;
        moneyList.push(redPackageAmount);
        moneyRemain = moneyRemain - redPackageAmount;
    }
    console.log(moneyList);
    return moneyList;
}
```

-   **方案二**：切割点法：将一定长度的线段随机分成 n 份，就需要切割 n-1 次；要注意的问题就是每个人都要大于 0.01 元。

```js
function devideRedPackage2(moneyAmount, peopleNum) {
    // ...
}
```

## 2. 版本号比较问题

```js
function sortVersion(versions) {
    function compare2Version(a, b) {
        let aList = a.split("."),
            bList = b.split("."),
            length = Math.max(aList.length, bList.length);
        for (let i = 0; i < length; i++) {
            if (a[i] !== b[i]) return Number(a[i] || 0) - Number(b[i] || 0);
        }
    }
    versions = versions.sort(compare2Version);
    console.log(versions);
    return versions;
}

sortVersion(["1.45.0", "1.5", "6", "1.3.3"]);
```

## 3. 大数相乘

-   [基于乘法规律的题解](https://leetcode-cn.com/problems/multiply-strings/solution/you-hua-ban-shu-shi-da-bai-994-by-breezean/)

```js
var multiply = function (num1, num2) {
    if (num1 === "0" || num2 === "0") return "0";
    let res = [];
    for (let i = num1.length - 1; i >= 0; i--) {
        let n1 = num1.charAt(i) - "0";
        for (let j = num2.length - 1; j >= 0; j--) {
            let n2 = num2.charAt(j) - "0";
            let sum = (res[i + j + 1] || 0) + n1 * n2;
            res[i + j + 1] = sum % 10;
            res[i + j] = (res[i + j] || 0) + Math.floor(sum / 10);
        }
    }
    return res.join("").replace(/^0+/, "");
};
```

## 4. 最大公约数

```js
// 两个正整数a和b(a>b)，它们的最大公约数等于a除 以b的余数c和b之间的最大公约数。
function getGreatestCommonDivisor(num1, num2) {
    let small = Math.min(num1, num2),
        big = Math.max(num1, num2);
    let a = big % small;
    if (a === 0) return small;
    else return getGreatestCommon(small, a);
}
```





<br/>
<br/>
<br/>

## --- leetcode 做题记录 ---

### 1. 链表问题

-   [141.环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)
-   [142.环形链表 -- 入环点](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
