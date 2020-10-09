/* @flow */

import { cached } from 'shared/util'
import { parseFilters } from './filter-parser'

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

const buildRegex = cached(delimiters => {
    const open = delimiters[0].replace(regexEscapeRE, '\\$&')
    const close = delimiters[1].replace(regexEscapeRE, '\\$&')
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

type TextParseResult = {
    expression: string,
    tokens: Array<string | { '@binding': string }>
}

// 匹配 text 中的 {{.*}}
export function parseText(
    text: string,
    delimiters?: [string, string]
): TextParseResult | void {
    const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
    if (!tagRE.test(text)) {
        return
    }
    const tokens = []
    const rawTokens = []
    let lastIndex = tagRE.lastIndex = 0
    let match, index, tokenValue
    // match[0] 是 {{.*}} , match[1] 是 {{.*}} 中的表达式，在正则 defaultTagRE 定义
    while ((match = tagRE.exec(text))) {
        index = match.index
        // push text token
        if (index > lastIndex) {
            rawTokens.push(tokenValue = text.slice(lastIndex, index))
            tokens.push(JSON.stringify(tokenValue))
        }
        // 这步处理模版中的 filters 
        const exp = parseFilters(match[1].trim())
        tokens.push(`_s(${exp})`)
        rawTokens.push({ '@binding': exp })
        lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
        rawTokens.push(tokenValue = text.slice(lastIndex))
        tokens.push(JSON.stringify(tokenValue))
    }
    return {
        expression: tokens.join('+'),
        tokens: rawTokens
    }
}
