# 原理篇 --- JavaScript 对象、Map 实现原理

本文从 V8 角度阐释 JavaScript 中 Set、Map、Object、Array 的区别与联系

## 1. 对象

JavaScript 对象像一个字典是由一组属性和值组成的，但是字典是非线性结构，如果使用字典，读取的效率会大大降低

### 1. 排序属性（elements）和常规属性（properties）

-   V8 为了提升存储和查找效率，在对象中添加了两个隐藏属性，排序属性和常规属性，
    -   element 属性指向 elements 对象，elements 对象中会按顺序放**排序属性**
    -   properties 属性指向了 properties 对象，properties 会按创建时的顺序保存**常规属性**

```js
/*
 * 1.数字属性被最先打印出来了，并且是按照数字大小的顺序打印的
 * 2.设置的字符串属性依然是按照之前的设置顺序打印的
 * 原因:ECMAScript 规范中定义了数字属性应该按照索引值大小升序排列，字符串属性根据创建时的顺序升序排列
 */
function Foo() {
    this[100] = "test-100";
    this[1] = "test-1";
    this["B"] = "bar-B";
    this[50] = "test-50";
    this[9] = "test-9";
    this[8] = "test-8";
    this[3] = "test-3";
    this[5] = "test-5";
    this["A"] = "bar-A";
    this["C"] = "bar-C";
}
var bar = new Foo();
for (key in bar) {
    console.log(`index:${key} value:${bar[key]}`);
}
console.log(bar);
```

![](/front-end/js/object-property.jpg)

V8 内部，为了有效提升存储和访问两种属性的性能，分别使用了两个线性数据结构来分别保存排序属性和常规属性，分解成两种线性数据结构之后，
如果执行索引操作，那么 V8 会先从 elements 属性中按照顺序读取所有的元素，然后在 properties 属性中读取所有的元素，这样就完成一次索引操作

### 2. 对象内属性、快属性、慢属性

**对象内属性** (in-object properties)：这些属性直接存储在对象本身，无需任何间接访问即可使用，_对象内属性的数量由对象的初始大小预先确定_

保存在线性数据结构中的属性称之为**快属性**，因为线性数据结构中只需要通过索引即可以访问到属性，虽然访问 线性结构的速度快，但是如果从线性结构中添加或者删除大量的属性时，则执行效率会非常低，这主要因为会产生 大量时间和内存开销

如果一个对象中添加和删除了许多属性，V8 就会采取另外一种存储策略，那就是**慢属性**策略，但慢属性的对象内部会有独立的非线性数据结构 (词典) 作为属性存储容器。所有的属性元信息不再是线性存储的，而是直接保存在属性字典中。

## 2. 数组

数组这种特定的存储结构，优点是可以随机访问，缺点是对数据的删除和插入不是很友好。JavaScript 中的数组过于灵活

### 1. 数组为什么可以保存不同类型

```c
// JSArray 是继承自 JSObject 的，所以在 JavaScript 中，数组可以是一个特殊的对象，内部也是以 key-value 形式存储数据，所以 JavaScript 中的数组可以存放不同类型的值
class JSArray: public JSObject {
    public:
        DECL_ACCESSORS(length, Object)
        // ...
        // Number of element slots to pre-allocate for an empty array.
        static const int kPreallocatedArrayElements = 4;
}
```

### 2. 数组是如何存储的

#### 1. 快数组

存储结构是 FixedArray，并且数组长度 <= elements.length，push 或 pop 时可能会伴随着动态扩容或减容

FixedArray 是 V8 实现的一个类似于数组的类，它表示一段连续的内存，可以使用索引直接定位。新创建的空数组默认就是快数组

#### 2. 慢数组

存储结构是 HashTable（哈希表），并且数组下标作为 key

慢数组以哈希表的形式存储在内存空间里，它不需要开辟连续的存储空间，但需要额外维护一个哈希表，
与快数组相比，性能相对较差

#### 3. 快数组 何时变成 慢数组

```c
// src/objects/js-objects.h
static const uint32_t kMaxGap = 1024;

// src/objects/dictionary.h
static inline bool ShouldConvertToSlowElements(uint32_t used_elements,
                                               uint32_t new_capacity) {
  uint32_t size_threshold = NumberDictionary::kPreferFastElementsSizeFactor *
                            NumberDictionary::ComputeCapacity(used_elements) *
                            NumberDictionary::kEntrySize;
  return size_threshold <= new_capacity;
}

static inline bool ShouldConvertToSlowElements(JSObject object,
                                               uint32_t capacity,
                                               uint32_t index,
                                               uint32_t* new_capacity) {
  STATIC_ASSERT(JSObject::kMaxUncheckedOldFastElementsLength <=
                JSObject::kMaxUncheckedFastElementsLength);
  if (index < capacity) {
    *new_capacity = capacity;
    return false;
  }
  if (index - capacity >= JSObject::kMaxGap) return true;
  *new_capacity = JSObject::NewElementsCapacity(index + 1);
  DCHECK_LT(index, *new_capacity);
  // TODO(ulan): Check if it works with young large objects.
  if (*new_capacity <= JSObject::kMaxUncheckedOldFastElementsLength ||
      (*new_capacity <= JSObject::kMaxUncheckedFastElementsLength &&
       ObjectInYoungGeneration(object))) {
    return false;
  }
  return ShouldConvertToSlowElements(object.GetFastElementsUsage(),
                                     *new_capacity);
}
```

-   当加入的索引值 index 比当前容量 capacity 差值大于等于 1024 时(index - capacity >= 1024)
-   快数组新容量是扩容前的容量 3 倍之多时

#### 4. 慢数组 何时变成 快数组

```c
// src/objects/js-objects.cc
static bool ShouldConvertToFastElements(JSObject object,
                                        NumberDictionary dictionary,
                                        uint32_t index,
                                        uint32_t* new_capacity) {
  // If properties with non-standard attributes or accessors were added, we
  // cannot go back to fast elements.
  if (dictionary.requires_slow_elements()) return false;

  // Adding a property with this index will require slow elements.
  if (index >= static_cast<uint32_t>(Smi::kMaxValue)) return false;

  if (object.IsJSArray()) {
    Object length = JSArray::cast(object).length();
    if (!length.IsSmi()) return false;
    *new_capacity = static_cast<uint32_t>(Smi::ToInt(length));
  } else if (object.IsJSArgumentsObject()) {
    return false;
  } else {
    *new_capacity = dictionary.max_number_key() + 1;
  }
  *new_capacity = Max(index + 1, *new_capacity);

  uint32_t dictionary_size = static_cast<uint32_t>(dictionary.Capacity()) *
                             NumberDictionary::kEntrySize;

  // Turn fast if the dictionary only saves 50% space.
  return 2 * dictionary_size >= *new_capacity;
}
```

当慢数组的元素可存放在快数组中且⻓度在 smi 之间且仅节省了 50%的空间，则会转变为快数组

### 3. 数组的动态扩容与减容

```c
// 默认的数组⻓度是4
// Number of element slots to pre-allocate for an empty array.
static const int kPreallocatedArrayElements = 4;
//-----扩容后新容量计公式----
new_capacity = old_capacity / 2 + old_capacity + 16
//即老的容量的 1.5 倍加上 16 。初始化为 4 个，当 push 第 5 个的时候，容量将会变成: new_capacity = 4 / 2 + 4 + 16 = 22
//接着申请一块这么大的内存，把老的数据拷过去，把新元素放在当前 length 位置，然后将数组的 length + 1，并返回 length。
//-----判断是否进行减容----
if (2 * length <= capacity) {
    // If more than half the elements won't be used, trim the array.
    isolate->heap()->RightTrimFixedArray(*backing_store, capacity - length);
} else {
    // Otherwise, fill the unused tail with holes.
    BackingStore::cast(*backing_store)->FillWithHoles(length, old_length);
}
    //当数组 pop 后，如果数组容量大于等于 length 的 2 倍，则进行容量调整，使用 RightTrimFixedArray 函数，
    // 计算出需要释放的空间大小，做好标记，等待 GC 回收;如果数组容量小于 length 的 2 倍，则用 holes 对象填充。
```

::: tip 提示
快数组就是以空间换时间的方式，申请了大块连续内存，提高效率。 

慢数组以时间换空间，不必申请连续的空间，节省了内存，但需要付出效率变差的代价。
:::

## 3. Map（Set）

|        | Map                              | Object                                                   |
| :----- | :------------------------------- | -------------------------------------------------------- |
| 默认值 | 不包含任何值，只包含显式插入的键 | 有一个原型，原型上的键名有可能和自己对象上设置的键名冲突 |
| 类型   | 任意                             | String 或 Symbol                                         |
| 长度   | 通过 size 属性获取               | 只能手动计算                                             |
| 性能   | 频繁增删键值对表现良好           | 频繁增删会使查询变慢                                     |

Object 不同于 Map，它不仅仅是表面所看到的。Map 只包含你所定义的键值对，但是 Object 对象具有其原型中的一些内置属性

Map 是一个纯哈希结构，始终保持对⻓度的跟踪，使其能够在 O(1)复杂度中进行访问

<br>
<br>

**博文参考**

-   [https://v8.dev/blog/](https://v8.dev/blog/)
-   [https://v8.dev/blog/fast-properties](https://v8.dev/blog/fast-properties)
