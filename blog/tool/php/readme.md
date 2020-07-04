# PHP 基本语法
## 1. 基本语法
``` php
<?php
// php代码
?>
```
## 2. 变量
- 变量以 $ 符号开始，后面跟着变量的名称
- php是若类型语言， 不必向 php 声明该变量的数据类型
- php作用域
    - local
    - global
        - 除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字
        - PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中。 index 保存变量的名称
    - static
        - 他可以在函数执行完毕时保证局部变量不被删除
        - 每次调用该函数时，该变量将会保留着函数前一次被调用时的值。
    - paramter

## 3. 输出语句
echo
- echo可以输出多个字符串
- echo 输出的速度比 print 快

print
- print 只能输出一个字符串
``` php
$car = 'car';
echo "这是一个", "字符串，", "使用了", "多个", "参数。";
echo "我车的品牌是 {$car}";
print "我车的品牌是 {$car}";
```

## 4. 数据类型
- String
    - 并置运算符：使用 `.` 连接两个字符串
    - strlen()函数：获取字符串长度
    - strpos($str,$query_str)函数：查找一个字符或一段指定的文本，找到就返回第一个字符的位置，反之返回false.
- Integer
- Float
- Boolean
- Array
    - count() 函数： 获取数组长度
    - sort() - 对数组进行升序排列
    - rsort() - 对数组进行降序排列
    - ksort() - 根据关联数组的键，对数组进行升序排列
    - krsort() - 根据关联数组的键，对数组进行降序排列
    - asort() - 根据关联数组的值，对数组进行升序排列
    - arsort() - 根据关联数组的值，对数组进行降序排列
- Object
    - 你必须使用class关键字声明类对象。类是可以包含属性和方法的结构。
- NULL
``` php
$txt = 'hello' . 'world';

$cars = array('bench','bmw','byd');

class Car
{
    var $color;
    function __construct($color="green") {
        $this->color = $color;
    }
    function what_color() {
        return $this->color;
    }
}

// 数组遍历
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
foreach($age as $x=>$x_value)
{
    echo "Key=" . $x . ", Value=" . $x_value;
    echo "<br>";
}

$x=null;
```

## 5. 类型比较
- 松散比较：使用两个等号 `==` 比较，只比较值，不比较类型。
- 严格比较：用三个等号 `===` 比较，除了比较值，也比较类型

## 6. 常量
define ( string $name , mixed $value [, bool $case_insensitive = false ] )
- **name**：必选参数，常量名称，即标志符。
- **value**：必选参数，常量的值。
- **case_insensitive**：可选参数，如果设置为 TRUE，该常量则大小写不敏感。默认是大小写敏感的。

常量是全局的
``` php
<?php
// 区分大小写的常量名
define("GREETING", "欢迎访问 Runoob.com");

// 不区分大小写的常量名
define("GREETING", "欢迎访问 Runoob.com", true);
```

## 7. 运算符
### 比较运算符
| 运算符 | 名称   | 描述 |
|:-------|:-------|:-----|
| x<>y   | 不等于 |      |
### 逻辑运算符
| 运算符   | 名称 | 描述                         |
|:---------|:-----|:-----------------------------|
| a and b  | 与   | 都为true，fanhuitrue         |
| a && b   | 与   |                              |
| a or b   | 或   | 有一个为true,返回true        |
| a ｜｜ b | 或   |                              |
| a xor b  | 异或 | 有且仅有一个为true，返回true |
| !a       | 非   |                              |
### 数组运算符
| 运算符  | 名称   | 描述                                                           |
|:--------|:-------|:---------------------------------------------------------------|
| x + y   | 集合   | x与y的集合                                                     |
| x == y  | 相等   | 如果 x 和 y 具有相同的键/值对，则返回 true                     |
| x === y | 恒等   | 如果 x 和 y 具有相同的键/值对，且顺序相同类型相同，则返回 true |
| x != y  | 不相等 |                                                                |
| x <> y  | 不相等 |                                                                |
| x !== y | 不恒等 |                                                                |
### 三元运算符
(expr1) ? (expr2) : (expr3) 
### 组合比较符(php7+)
$c = $a <=> $b;
- 如果 $a > $b, 则 $c 的值为 1。
- 如果 $a == $b, 则 $c 的值为 0。
- 如果 $a < $b, 则 $c 的值为 -1。
### 运算符优先级
自己查。。。

## 8. 条件语句
### if...elseif...else
``` php
if (条件)
{
    if 条件成立时执行的代码;
}
elseif (条件)
{
    elseif 条件成立时执行的代码;
}
else
{
    条件不成立时执行的代码;
}
```
### switch
``` php
$favcolor="red";
switch ($favcolor)
{
case "red":
    echo "你喜欢的颜色是红色!";
    break;
default:
    echo "你喜欢的颜色不是 红色!";
}
```

### 9. 超级全局变量
- $GLOBALS
    - $GLOBALS 是一个包含了全部变量的全局组合数组。变量的名字就是数组的键
- $_SERVER
    - 是一个包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组
- $_REQUEST
    - 收集HTML表单提交的数据
- $_POST
    - 收集post表单数据
- $_GET
    - 收集get表单数据
- $_FILES
- $_ENV
- $_COOKIE
- $_SESSION

### 10. 魔术常量
- \_\_LINE\_\_ : 显示当前行号
- \_\_FILE\_\_: 文件绝对路径
- \_\_DIR\_\_: 文件所在的目录
- \_\_FUNCTION\_\_: 函数名称
- \_\_TRAIT\_\_: 
- \_\_NAMESPACE\_\_: 类的命名空间

### 11. 命名空间
