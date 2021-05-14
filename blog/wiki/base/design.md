# 设计模式
设计模式：在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案

## 1. 单例模式
**意图**：保证一个类只有一个实例，并提供一个全局访问点
### 1.1 代码实现
``` ts
class Singleton {
    constructor() { }
    private static instance: Singleton = null;
    public static getInstance() {
        if(this.instance == null) {
            this.instance = new Singleton()
        }
        return this.instance
    }
    test() {
        console.log('单例模式')
    }
}
```

## 2. 工厂模式
- **意图**：将有大量共同接口的类实例化
- **优点**：
    1. 隐藏了具体实现
    2. 客户端只需要直接使用对象就好，不需要关心对象怎么 new 出来的
    3. 解耦：没有硬编码
- **缺点**：
    1. 扩展麻烦，需要改动现有代码
    2. 所有逻辑全放在工厂类，多了就很难阅读和维护
### 2.1 代码实现
``` ts
abstract class INooles {
    public abstract desc(): void;
}

class LzNoodles extends INooles {
    public desc(): void {
        console.log('兰州拉面')
    }
}

class PaoNoodles extends INooles {
    public desc(): void {
        console.log('泡面')
    }
}

class GankouNoodles extends INooles {
    public desc(): void {
        console.log('武汉热干面')
    }
}

class SimpleNoodlesFactory {
    public static TYPE_LZ: number = 1;
    public static TYPE_PM: number = 2;
    public static TYPE_GK: number = 3;
    public static createNoodles(type: number) {
        switch(type) {
            case SimpleNoodlesFactory.TYPE_LZ:
                    return new LzNoodles();
            case SimpleNoodlesFactory.TYPE_PM:
                return new PaoNoodles();
            case SimpleNoodlesFactory.TYPE_GK:
            default:
                return new GankouNoodles();
        }
    }
}

const noodle: INooles = SimpleNoodlesFactory.createNoodles(SimpleNoodlesFactory.TYPE_GK)

noodle.desc()
```

## 3. 代理模式
- **意图**：为一个对象提供一个代替品或占位符，以便控制对它的访问
### 3.1 代码实现
``` ts
interface IUserDao {
    save(): void;
}

class UserDao implements IUserDao {
    public save(): void {
        console.log('数据已保存')
    }
}

class UserDaoProxy implements IUserDao {
    private target: IUserDao;
    constructor(target: IUserDao) {
        this.target = target
    }
    public save(): void {
        console.log('代理开始...')
        this.target.save()
        console.log('代理结束...')
    }
}

const target = new UserDao()
const targetProxy = new UserDaoProxy(target)

targetProxy.save()
```

## 4. 命令模式
- **意图**：将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。
### 4.1 代码实现
``` ts
class Receiver {  // 做饭大哥
    public action() {
        console.log('我是大厨，我开始秀操作了')
    }
}

interface Command {
    exec() :void
}

class ConcreateCommand implements Command {  // 客户
    private recevier : Receiver = null!;
    constructor(recevier: Receiver) {
        this.recevier = recevier
    }
    public exec() {
        console.log('点完菜了，我去通知大厨')
        this.recevier.action()
    }
}

class Invoker {   // 服务员
    private command: Command;
    constructor(command: Command) {
        this.command = command
    }
    public action():void {
        console.log('我开始点菜了')
        this.command.exec()
    }
}

const recevier: Receiver = new Receiver()
const command: Command = new ConcreateCommand(recevier)
const invoker: Invoker = new Invoker(command)

invoker.action()
```

## 5. 发布订阅模式
**意图**：观察者模式定义了对象之间一对多的依赖关系，当一个对象改变了状态，它的所有依赖会被通知，然后自动更新。

**优点**：观察者与订阅者是抽象耦合的

**缺点**：1.如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。2.存在订阅、观察的死循环的可能性，这取决于具体的代码实现。3. 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化

### 5.1 使用场景
从前的大叔们想买报纸，就去卖报大爷那里去买，但是大爷那不一定随时都有，于是就留了电话，有新报了就打电话通知看报的大叔们；这时卖报的大爷就是(Observer)，存电话的就是(Dep)，买报的就是(Watcher)

### 5.2 代码实现
我们基于 typescript 来实现一下观察者模式
- Observer 负责监听变化
- Dep 是 Observer 与 Watcher 的中间人， 它与 Observer 一对一， 与 Watcher 多对多
- Watcher 变化产生之后
``` ts
let uid = 0
/*  发布者，负责监听变化 */
class Observer {
    value: any;
    dep: Dep;
    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
    }

    observe(value: any) {
        // something change, notify dep
        // vue use Object.defineProperty to listen data change in function defineReactive
        this.dep.notify()
    }
}

/*  订阅，负责变化之后的处理操作  */ 
class Watcher {
    deps: Array<Dep>
    constructor() {
        this.deps = []
    }

    update() {
        //  do something after dep notify
    }
}

/*  中间管理人  */
class Dep {
    id: number;
    subs: Array<Watcher>;
    constructor() {
        this.id = uid++
        this.subs = []
    }

    notify() {
        const subs = this.subs.slice()
        for(let i =0 ; i < subs.length ; i++) {
            subs[i].update()
        }
    }
}
```


### 5.3 发布订阅 与 观察者模式
- 表面上看
    - 观察者模式只有两个角色 ---- 观察者 + 被观察者
    - 发布订阅中 ---- 观察者、被观察者、中间人
- 更深层次
    - 观察者中 ---- 松耦合关系
    - 发布订阅 ---- 完全不存在耦合
- 使用上
    - 观察者 ---- 多用于多个应用内部
    - 发布订阅中 ---- 更多是一种跨应用模式，例如消息中间件

## 6 职责链模式
- **意图**：在执行一个具体的事情时，不确定使用哪种逻辑时，进行链式的判断，直到找到符合条件的函数或者对象，然后处理。
### 6.1 代码实现
``` ts
// 抽象处理类
abstract class Handler {
    public successer: Handler;
    public abstract handlerRequest(user: string, days: number): void;
    public getNextHandler(): Handler {
        return this.successer
    }
    public setNextHandler(successor: Handler): void {
        this.successer = successor
    }
}

// 班主任处理
class HeadTeacher extends Handler {
    public handlerRequest(user: string, days: number) {
        if (days < 5) {
            console.log('班主任同意', user, '同学的请假')
        } else {
            console.log('班主任无法处理', user, '同学的请假')
        }
        if (this.getNextHandler() != null) {
            const nextHandler = this.getNextHandler()
            nextHandler.handlerRequest(user, days)
            return
        }
        return null
    }
}

// 系主任处理
class Department extends Handler {
    public handlerRequest(user: string, days: number) {
        if (days < 30) {
            console.log('系主任同意', user, '同学的请假')
        } else {
            console.log('系主任无法处理', user, '同学的请假')
        }
        if (this.getNextHandler() != null) {
            const nextHandler = this.getNextHandler()
            nextHandler.handlerRequest(user, days)
            return
        }
        return null
    }
}

// 校主任处理
class Leader extends Handler {
    public handlerRequest(user: string, days: number) {
        if (days >= 30) {
            console.log('校主任同意', user, '同学的请假')
        } else if (this.getNextHandler() != null) {
            const nextHandler = this.getNextHandler()
            nextHandler.handlerRequest(user, days)
            return
        }
        return null
    }
}

// 工厂类实现
class SimpleFactory {
    public static TYPE_HeadTeacher: number = 1;
    public static TYPE_Department: number = 2;
    public static TYPE_Leader: number = 3;
    public static createHandler(type: number):Handler {
        switch(type) {
            case SimpleFactory.TYPE_HeadTeacher:
                return new HeadTeacher();
            case SimpleFactory.TYPE_Department:
                return new Department();
            case SimpleFactory.TYPE_Leader:
            default:
                return new Leader()
        }
    }
}

// 获取三个不同的处理者对象
const h1: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_HeadTeacher);
const h2: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Department);
const h3: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Leader);
// 设置角色的处理层次
h1.setNextHandler(h2);
h2.setNextHandler(h3);

h1.handlerRequest('李四', 35);
```

## 7. 装饰者模式
- **定义**：动态的给类或对象添加职责的设计模式
