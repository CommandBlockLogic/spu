"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class BlockState {
    constructor(input) {
        this.states = {};
        let index = 0;
        index = this.parseName(input, index) + 1;
        index = this.parseStates(input, index) + 1;
        this.parseNbt(input, index);
    }
    toString() {
        let result = this.name;
        const states = JSON.stringify(this.states).replace(/"/g, '').replace(/:/g, '=').replace(/\{/g, '[').replace(/\}/g, ']');
        if (states !== '[]') {
            result += states;
        }
        if (this.nbt !== undefined) {
            result += this.nbt.toString();
        }
        return result;
    }
    /**
     * Parses the block name.
     * @returns The end of the name. (The index of the char before `[`, `{` or ``.)
     */
    parseName(input, index) {
        let name = '';
        while (input.charAt(index) !== '' && input.charAt(index) !== '[' && input.charAt(index) !== '{') {
            name += input.charAt(index);
            index += 1;
        }
        name = utils_1.completeNamespace(name);
        this.name = name;
        return index - 1;
    }
    /**
     * Parses the block states.
     * @returns The end of the states. (Can be `]`, `` or the end of the name.)
     */
    parseStates(input, index) {
        if (input.charAt(index) === '[') {
            index += 1;
            index = this.skipSpaces(input, index);
            if (input.charAt(index) !== ']') {
                index = this.parseAState(input, index);
            }
        }
        else {
            index -= 1;
        }
        return index;
    }
    /**
     * Parses a block state.
     * @returns The end of this state. (Can be `,` or `]`.)
     */
    parseAState(input, index) {
        let stateKey = '';
        // Read key
        while (input.charAt(index) !== '=') {
            if (input.charAt(index) === '') {
                throw "Expected '=' but got EOF.";
            }
            else if (input.charAt(index) === ' ') {
                index = this.skipSpaces(input, index);
                if (input.charAt(index) !== '=') {
                    throw `Expected '=' but got '${input.charAt(index)}' after several spaces.`;
                }
            }
            else if (/\w+/.test(input.charAt(index))) {
                stateKey += input.charAt(index);
                index += 1;
            }
            else {
                throw `Expected /\\w+/ but got '${input[index]}'.`;
            }
        }
        index += 1;
        // Read value
        let value = '';
        index = this.skipSpaces(input, index);
        while (input.charAt(index) !== ']' && input.charAt(index) !== ',') {
            if (input.charAt(index) === '') {
                throw "Expected ']' or ',' but got EOF.";
            }
            else if (input.charAt(index) === ' ') {
                index = this.skipSpaces(input, index);
                if (input.charAt(index) !== ']' && input.charAt(index) !== ',') {
                    throw `Expected ']' or ',' but got '${input.charAt(index)}' after several spaces.`;
                }
            }
            else if (/\w+/.test(input.charAt(index))) {
                value += input.charAt(index);
                index += 1;
            }
            else {
                throw `Expected /\\w+/ but got '${input[index]}'.`;
            }
        }
        if (input.charAt(index) === ',') {
            if (input[index + 1] !== ']') {
                index = this.parseAState(input, index + 1);
            }
            else {
                index += 1;
            }
        }
        this.states[stateKey] = value;
        return index;
    }
    /**
     * Skip spaces.
     * @returns The index of the first nonspace char.
     */
    skipSpaces(input, index) {
        while (input.charAt(index) === ' ') {
            index += 1;
        }
        return index;
    }
    /**
     * Parses the block nbt.
     * @returns The end of the nbt. (Can be `}` or ``.)
     */
    parseNbt(input, index) {
        if (input.charAt(index) === '{') {
            this.nbt = utils_1.getNbtCompound(input.slice(index));
        }
        else if (input.charAt(index) !== '') {
            throw `Expected EOF but got '${input[index]}'.`;
        }
        return index;
    }
}
exports.BlockState = BlockState;
//# sourceMappingURL=block_state.js.map