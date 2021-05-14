# 控制反转（IOC）

## 定义
**控制反转**（Inversion of Control）：是面向对象编程中的一种设计原则，可以降低代码之间的耦合度

最常见的方式叫作**依赖注入**（Dependency Injection，DI）：将相互依赖的对象分离，在配置中描述依赖关系，这些关系在应用时才 被建立，还有一种**依赖查找**（Dependency Lookup，DL）

通过控制反转，对象在被创建的时候，由一个调控系统所有对象的外界实体，将所依赖的对象的引用传递给它。

## 原则
1. 高层模块不应该依赖地层模块，两都应该依赖抽象
2. 抽象不应该依赖具体实现
3. 面向接口(interface)编程，而非面向实体编程


## 代码实现
### 没有IOC的版本
``` js
//球队信息 
class RTeam {
    constructor(){ 
        this.name = '⽕火箭'
    } 
}
// 球员信息 
class Player{
    constructor(){
        this.team = new Team()
    } 
    info(){
        console.log(this.team.name) 
    }
}

// 球员ym
let ym = new Player() 
ym.info() // ‘⽕箭’
```
看起来挺好的，球员player依赖于某个球队RTeam 当调用的时候主动去加载球队即可。此时的控制权在 player这里。

假如这个时候,球员发生交易了，球队信息更换了s，转换到team2了。 这时候我们就需要去修改player里的代码了了，因为球员那⾥直接写死了对RTeam的依赖，这种可扩展性是很差的。 这不是我们所想要的， 需要重新思考下依赖关系处理了。 球员和球队之间⾮得这么直接粗暴的发⽣联系吗， ⼀个球员对应⼀个球队的话，未来会发⽣变化的可能性太大了，毕竟不⽌一个球队。 如果两者之间直接发⽣联系，中 间就需要一个中间模块来负责两者关系的处理球员不关注球队从哪来，只要给到我就行了了。 这样控制权就不不是直接落在player这⾥了，这正是IOC的设计思路。
### IOC 改进版本
我们依照IOC的几条原则，进行一下改进
1. 高层模块不应依赖低层模块，都应该依赖抽象模块：这里的高层模块player直接依赖了team这个低层模块，将两者解耦，player 不再依赖 team
2. 抽象不应该依赖具体实现，具体实现应该依赖于抽象：player 不应该直接依赖具体 team ，而是通过构造函数将抽象 teaminfo 的实例传进去，这就是解耦
``` js
// 球队信息不不依赖具体实现 // ⾯面向接⼝口即⾯面向抽象编程 
class TeamInfo {
    constructor(name) { 
        this.name = name
    } 
}
class Player {
    // 此处的参数，是teamInfo的⼀一个实例例，不不直接依赖具体的实例例 // ⾯面向抽象
    constructor(team) {
        this.team = team 
    }
    info() { 
        console.log(this.team.name)
    } 
}
// 将依赖关系放到此处来管理理，控制权也放到此处
// Player和TeamInfo之间不不再有直接依赖
// 原本直接掌握teaminfo控制权的player不不再直接依赖
// 将依赖控制，落在此处(第三⽅方模块专⻔门管理理)即为控制反转 
var ym = new Player(new TeamInfo('⽕箭')) 
ym.info()
var kobe = new Player(new TeamInfo('湖⼈')) 
kobe.info()
```

具体平时写代码时，日志服务、错误处理服务等，都可以包装成一个第三方包，在创建主程序时依赖注入进来