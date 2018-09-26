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
export function getNbtCompound(str: string, version: 'before 1.12' | 'after 1.12' = 'after 1.12') {
    const tokenizer = new NbtTokenizer()
    const tokens = tokenizer.tokenize(str, version)
    const parser = new NbtParser()
    return parser.parseCompounds(tokens, version)
}

/**
 * Get an NbtList object from a string.
 */
export function getNbtList(str: string, version: 'before 1.12' | 'after 1.12' = 'after 1.12') {
    const tokenizer = new NbtTokenizer()
    const tokens = tokenizer.tokenize(str, version)
    const parser = new NbtParser()
    return parser.parseLists(tokens, version)
}

/**
 * Get UUIDMost and UUIDLeast froom a UUID pair.
 */
export function getUuidLeastUuidMost(uuid: string) {
    uuid = uuid.replace(/-/g, '')
    const uuidMost = parseInt(uuid.slice(0, 16), 16)
    const uuidLeast = parseInt(uuid.slice(16), 16)
    return { L: uuidLeast, M: uuidMost }
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
