/*export default*/ class CharReader {
    private str: string
    private pos: number
    private length: number

    constructor(str: string) {
        this.str = str
        this.pos = 0
        this.length = str.length
    }

    peek() {
        if (this.pos - 1 >= this.length) {
            return ''
        }

        return this.str.charAt(this.pos)
    }

    next() {
        if (!this.hasMore()) {
            return ''
        }
        return this.str.charAt(this.pos++)
    }

    back() {
        this.pos = Math.max(0, --this.pos)
    }

    hasMore() {
        return this.pos < this.length
    }
}

/*export*/ function isWhiteSpace(char: string) {
    return char === ' ' || char === '\t'
}
