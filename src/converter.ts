import CharReader from './char_reader'
import Selector from './selector'

/**
 * Provides methods to convert commands in a mcf file from minecraft 1.12 to 1.13.
 * @author SPGoding
 */
export default class Converter {
    /**
     * Returns if an command matches an format.
     * @param oldCommand An old minecraft command.
     * @param oldFormat An old format defined in formats.ts.
     */
    isMatch(oldCommand: string, oldFormat: string) {

    }

    static line(input: string) {
        let sel = new Selector()
        sel.parse112(input)
        return sel.get113()
    }

    static gamemode(input: string) {
        switch (input) {
            case 's':
            case '0':
            case 'survival':
                return 'survival'
            case 'c':
            case '1':
            case 'creative':
                return 'creative'
            case 'a':
            case '2':
            case 'adventure':
                return 'adventure'
            case 'sp':
            case '3':
            case 'spector':
                return 'spector'
            default:
                return ''
        }
    }
}

enum TokenType {
    Literal,
    Bool,
    Number,
    String,
    Position,
    Entity,
    Block,
    Item,
    Nbt,
    NbtPath,
    Vec2,
    Vec3,
    End
}

class Token {
    private tokenType: TokenType
    private value: string

    constructor(tokenType: TokenType, value: string) {
        this.tokenType = tokenType
        this.value = value
    }

    getTokenType() {
        return this.tokenType
    }

    getValue() {
        return this.value
    }
}

class Tokenizer {
    private charReader: CharReader
    private tokens: Array<Token>

    constructor(charReader: CharReader) {
        this.charReader = charReader
        this.tokens = new Array<Token>()
    }

    tokenize() {
        let token: Token
        do {
            token = this.start()
            this.tokens.push(token)
        } while (token.getTokenType() !== TokenType.End)
    }

    start() {
        let char: string
        while (true) {
            if (!this.charReader.hasMore()) {
                return new Token(TokenType.End, null)
            }

            char = this.charReader.next()
            if (!this.isWhiteSpace(char)) {
                break
            }
        }
        return null
    }

    isWhiteSpace(char: string) {
        return char === ''     
    }
}
