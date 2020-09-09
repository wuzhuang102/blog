/* @flow */

const validDivisionCharRE = /[\w).+\-_$\]]/

export function parseFilters(exp: string): string {
    let inSingle = false
    let inDouble = false
    let inTemplateString = false
    let inRegex = false
    let curly = 0
    let square = 0
    let paren = 0
    let lastFilterIndex = 0
    let c, prev, i, expression, filters

    // 1. 这个 for 循环不会将最后一个 filter 塞到 filters 中，最后一个 filter 在下一段代码中判断并 push 进去
    // 2. 第一次执行会直接进入最后 else 语句，
    // 3. 利用 ++  和 -- 判断 小、中、大括号的开始与结束
    // 4. " ' ` 中的 | 不算过滤器的管道符,属于字符串
    for (i = 0; i < exp.length; i++) {
        prev = c
        c = exp.charCodeAt(i)
        if (inSingle) { 
            // 单引号 '
            if (c === 0x27 && prev !== 0x5C) inSingle = false
        } else if (inDouble) {
            // 双引号 "
            if (c === 0x22 && prev !== 0x5C) inDouble = false
        } else if (inTemplateString) {
            // 模版字符串  `
            if (c === 0x60 && prev !== 0x5C) inTemplateString = false
        } else if (inRegex) {
            // 正则  /
            if (c === 0x2f && prev !== 0x5C) inRegex = false
        } else if (
            // 管道
            c === 0x7C && // pipe
            exp.charCodeAt(i + 1) !== 0x7C &&
            exp.charCodeAt(i - 1) !== 0x7C &&
            !curly && !square && !paren
        ) {
            if (expression === undefined) {
                // 这里的代码最多执行一次，用来取出 expression
                // first filter, end of expression
                lastFilterIndex = i + 1
                expression = exp.slice(0, i).trim()
            } else {
                pushFilter()
            }
        } else {
            
            switch (c) {
                case 0x22: inDouble = true; break         // "
                case 0x27: inSingle = true; break         // '
                case 0x60: inTemplateString = true; break // `
                case 0x28: paren++; break                 // (
                case 0x29: paren--; break                 // )
                case 0x5B: square++; break                // [
                case 0x5D: square--; break                // ]
                case 0x7B: curly++; break                 // {
                case 0x7D: curly--; break                 // }
            }
            // 判断正则开始的逻辑
            if (c === 0x2f) { 
                let j = i - 1
                let p
                // find first non-whitespace prev char
                for (; j >= 0; j--) {
                    p = exp.charAt(j)
                    if (p !== ' ') break
                }
                if (!p || !validDivisionCharRE.test(p)) {
                    inRegex = true
                }
            }
        }
    }

    if (expression === undefined) {
        // 如果 exp 中不包含 filter ,那么 exp 就是 expression
        expression = exp.slice(0, i).trim()
    } else if (lastFilterIndex !== 0) {
        // 将最后一个 filter push 进入 filters
        pushFilter()
    }

    // filter push 规则
    function pushFilter() {
        (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim())
        lastFilterIndex = i + 1
    }

    // 多过滤器整合
    if (filters) {
        for (i = 0; i < filters.length; i++) {
            expression = wrapFilter(expression, filters[i])
        }
    }

    return expression
}

// filter 可传参数，exp 为第一个参数，其它参数后面追加
function wrapFilter(exp: string, filter: string): string {
    const i = filter.indexOf('(')
    if (i < 0) {
        // _f: resolveFilter
        return `_f("${filter}")(${exp})`
    } else {
        const name = filter.slice(0, i)
        const args = filter.slice(i + 1)
        return `_f("${name}")(${exp}${args !== ')' ? ',' + args : args}`
    }
}
