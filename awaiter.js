//使用生成器和promise模仿async/await的行为
var __awaiter = this && this.__awaiter || function (owner, args, promiseT, func) {
    return new (promiseT || (promiseT = Promise))(function (resolve, reject) {
        function execute(b) {
            try {
                executeByState(func.next(b))
            } catch (ex) {
                reject(ex)
            }
        }
        function handelException(b) {//处理内部异常
            try {
                executeByState(func["throw"](b))
            } catch (ex) {
                reject(ex)
            }
        }
        function executeByState(genR) {
            genR.done ? resolve(genR.value) : (new promiseT(function (resolve2) {
                resolve2(genR.value)
            })).then(execute, handelException)
        }

        var commandFunc = func = func.apply(owner, args || []);
        executeByState(commandFunc.next())
    })
}
var __generator = this && this.__generator || function (operator, eventFunc) {
    function g(b) {//b的值为0, 1,或 2，分别对应生成器的next、throw、return方法
        return function (c) {
            return Execute([b, c])
        }
    }

    function Execute(a) {//[label,promise/label]
        if (isExecuted)
            throw new TypeError("Generator is already executing.");
        for (; state;)
            try {
                if (isExecuted = 1,
                    b && (labelArrOrTrys = a[0] & 2 ? b["return"] : a[0] ? b["throw"] || ((labelArrOrTrys = b["return"]) && labelArrOrTrys.call(b), 0) : b.next) && !(labelArrOrTrys = labelArrOrTrys.call(b, a[1])).done)
                    return labelArrOrTrys;
                if (b = 0, labelArrOrTrys)
                    a = [a[0] & 2, labelArrOrTrys.value];
                switch (a[0]) {
                    case 0:
                    case 1:
                        labelArrOrTrys = a;
                        break;
                    case 4://生成器未完成
                        return state.label++, {
                            value: a[1],
                            done: false
                        };
                    case 5://继续下一操作
                        state.label++;
                        b = a[1];
                        a = [0];
                        continue;
                    case 7:
                        a = state.ops.pop();
                        state.trys.pop();
                        continue;
                    default:
                        labelArrOrTrys = state.trys;
                        if (!(labelArrOrTrys = 0 < labelArrOrTrys.length && labelArrOrTrys[labelArrOrTrys.length - 1])
                            && (6 === a[0] || 2 === a[0])
                        ) {
                            state = 0;//结束循环
                            continue
                        }
                        if (3 === a[0] && (!labelArrOrTrys || a[1] > labelArrOrTrys[0] && a[1] < labelArrOrTrys[3])) {
                            state.label = a[1];//执行下一label
                        }
                        else if (6 === a[0] && state.label < labelArrOrTrys[1]) {
                            state.label = labelArrOrTrys[1], labelArrOrTrys = a;
                        }
                        else if (labelArrOrTrys && state.label < labelArrOrTrys[2]) {
                            state.label = labelArrOrTrys[2], state.ops.push(a);
                        }
                        else {
                            labelArrOrTrys[2] && state.ops.pop();
                            state.trys.pop();
                            continue
                        }
                }
                //执行主体
                a = eventFunc.call(operator, state)
            } catch (n) {
                a = [6, n],
                    b = 0
            } finally {
                isExecuted = labelArrOrTrys = 0
            }
        if (a[0] & 5)
            throw a[1];
        return {
            value: a[0] ? a[1] : void 0,
            done: true
        }
    }

    var state = {
        label: 0,
        sent: function () {
            if (labelArrOrTrys[0] & 1)
                throw labelArrOrTrys[1];
            return labelArrOrTrys[1]
        },
        trys: [],//异常处理的堆栈
        ops: [] //操作的堆栈
    }

    var isExecuted, b, labelArrOrTrys, commandFunc;//执行流和状态
    commandFunc = {
        next: g(0),
        "throw": g(1),
        "return": g(2)
    },
        "function" === typeof Symbol && (commandFunc[Symbol.iterator] = function () {
            return this
        })
    return commandFunc;
};