# 算法总结
## 1. 链表
### 1.1 双指针问题
双指针的问题本质上也可以用 `哈希表` 解决，但双指针更有效，空间复杂度为 `O(1)`，我们所需要考虑的问题就是两个指针的速度问题
- [是否有环形链表](https://leetcode-cn.com/leetbook/read/linked-list/jbex5/)
- [环形链表起始位置](https://leetcode-cn.com/leetbook/read/linked-list/jjhf6/)：考虑双指针的速度和路程问题
- [相交链表](https://leetcode-cn.com/leetbook/read/linked-list/jjbj2/)：本质上也是环形链表逻辑
- [删除倒数第N个节点](https://leetcode-cn.com/leetbook/read/linked-list/jf1cc/)
### 1.2 经典问题
- [链表反转](https://leetcode-cn.com/leetbook/read/linked-list/f58sg/)：递归和迭代都可以使用
- [奇偶链表](https://leetcode-cn.com/leetbook/read/linked-list/fe0kj/)：奇偶单独抽出再合并
- [回文链表](https://leetcode-cn.com/leetbook/read/linked-list/fov6t/)：回文可以利用数组双向遍历，也可以将链表后半部分反转再进行对比
- [两数相加](https://leetcode-cn.com/leetbook/read/linked-list/fv6w7/)：利用链表模拟加法运算

## 2. 树、二叉树
### 2.1 二叉树的遍历
前、中、后是相对于根节点访问顺序而言
- [前序遍历](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xeywh5/)：先访问根节点，再访问左子树，最后访问右子树
- [中序遍历](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xecaj6/)：先遍历左子树，再访问根节点，最后访问右子树
- [后序遍历](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xebrb2/)：先遍历右子树，再遍历右子树，最后访问根节点
- [层序遍历](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xefh1i/)：逐层遍历树结构
    - 算法思想：遍历子树时，合理利用数组，确定当前遍历的深度
### 2.2 利用递归解决问题
- [对称二叉树](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xoxzgv/)
- [最大深度](https://leetcode-cn.com/leetbook/read/data-structure-binary-tree/xoh1zg/)

## 3. 二叉搜索树
### 3.1 二叉搜索树简介
- 什么是二叉搜索树(Binary Search Tree - BST)
    - 每个节点中的值必须 `>=` 其左侧节点中的任何值
    - 每个节点中的值必须 `<=`  其右侧节点中的任何值
- [二叉搜索树验证](https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xpkc6i/)：二叉搜索树验证的主要思想就是中序遍历
### 3.2 二叉搜索树中的基本操作
- [搜索](https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xpsqtv/)
- [插入](https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xp1llt/)
- [删除](https://leetcode-cn.com/leetbook/read/introduction-to-data-structure-binary-search-tree/xpcnds/)
    - 核心思想是迭代将对应的 TreeNode 返回给前驱节点
        - 如果该节点是叶子节点，直接返回 null
        - 如果该节点有右子树，则找到右子树中最小的值（后驱节点）做替换，并删除对应节点
        - 如果该节点只有左子树，则找到左子树中最大的值（前驱节点）做替换，并删除对应节点
