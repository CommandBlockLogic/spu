import { Tokenizer as NbtTokenizer } from './nbt/tokenizer'
import { Parser as NbtParser } from './nbt/parser'

/**
 * Return if a thing is numeric. Scientific notation IS supported.
 * @param num Any thing.
 */
export function isNumeric(num: any) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

export function isWhiteSpace(char: string) {
    return [' ', '\t', '\n', '\r'].indexOf(char) !== -1
}

/**
 * Get an NbtCompound object from a string.
 */
export function getNbt(str: string) {
    const tokenizer = new NbtTokenizer()
    const tokens = tokenizer.tokenize(str)
    const parser = new NbtParser()
    const nbt = parser.parse(tokens)
    return nbt
}

/**
 * For escape & unescape.
 *
 * @author pca006132
 */
const EscapePattern = /([\\"])/g
const UnescapePattern = /\\([\\"])/g
export const escape = (s: string) => s.replace(EscapePattern, '\\$1')
export const unescape = (s: string) => s.replace(UnescapePattern, '$1')
