// const MAX_TASK = 2;
// class Scheduler {
//     constructor() {
//         this.tasks = [];
//         this.runningTasks = [];
//     }

//     add(promiseCreator) {
//         return new Promise((resolve) => {
//             promiseCreator.resolve = resolve;
//             if (this.runningTasks.length < MAX_TASK) {
//                 this.run(promiseCreator);
//             } else {
//                 this.tasks.push(promiseCreator);
//             }
//         });
//     }

//     run(promiseCreator) {
//         this.runningTasks.push(promiseCreator);
//         promiseCreator().then((res) => {
//             promiseCreator.resolve(res);
//             this.del(promiseCreator);
//             if (this.tasks.length) this.run(this.tasks.shift());
//         });
//     }

//     del(promiseCreator) {
//         let index = this.runningTasks.indexOf(promiseCreator);
//         this.runningTasks.splice(index, 1);
//     }
// }
// const timeout = (time) =>
//     new Promise((resolve) => {
//         setTimeout(resolve, time);
//     });

// const scheduler = new Scheduler();
// const addTask = (time, order) => {
//     scheduler.add(() => timeout(time)).then(() => console.log(order));
// };

// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");

// class Event1 {
//     constructor() {
//         this.event = {};
//     }

//     add(eventName, fn) {
//         if(!this.event[eventName]) this.event[eventName] = []
//         this.event[eventName].push(fn);
//     }

//     emit(eventName, ...args) {
//         let events = this.event[eventName] || [];
//         for (let i = 0; i < events.length; i++) {
//             events[i](...args);
//         }
//     }
// }

// const event1 = new Event1();
// event1.add("click", function (...args) {
//     console.log(111,...args);
// });

// event1.emit("click",'22222');

// function flat(arr) {
//     return arr.reduce((prev, item) => prev.concat(Array.isArray(item) ? flat(item) : item), []);
// }

// // console.log(flat([1, 2, [3, 4, [5, 6], "7"], "a,b]c"]));

// function devideRed(moneyAll, peopleNum) {
//     const MIN_MONEY = 0.01;
//     const moneyList = [];
//     if (moneyAll < peopleNum * MIN_MONEY) throw new Error(`must be bigger than ${peopleNum * MIN_MONEY}元`);
//     for (let i = 0; i < peopleNum; i++) {
//         let redPackage;
//         if ((i === peopleNum - 1)) {
//             moneyList.push(moneyAll.toFixed(2));
//         } else {
//             redPackage = Math.random() * ((moneyAll / (peopleNum - i)) * 2 - 0.02) - 0.01;

//             redPackage = redPackage.toFixed(2);
//             moneyAll -= redPackage;
//             moneyList.push(redPackage);
//         }
//     }
//     return moneyList;
// }

// console.log(devideRed(10, 5));

var url = 'https://www.baidu.com';
// 第一次截取，截取?后面的内容，返回一个字符串
var params = url.split('?')[1] || ''
// 第二次截取&,返回一个数组
var paramsArr = params.split('&');
// 第三截取=
var res = {}
for(var i=0; i<paramsArr.length;i++){
	var str = paramsArr[i].split('=');
	res[str[0]] = str[1]
}
console.log(res);

module.exports = (options) => async (ctx, next) => {
    // do somthing 
    await next()
}
