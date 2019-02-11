"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class TargetSelector {
    constructor(input) {
        this.arguments = {};
        this.scores = {};
        this.parseHead(input);
        this.parseArgument(input, 3);
    }
    static tryParse(input) {
        try {
            new TargetSelector(input);
        }
        catch (thisIsMyAnswer) {
            return thisIsMyAnswer;
        }
        return 'VALID';
    }
    toString() {
        let result = `@${this.variable}[`;
        for (const key in this.arguments) {
            if (['type', 'name', 'team', 'tag', 'c', 'm', 'r', 'rm', 'x', 'y', 'z', 'dx', 'dy',
                'dz', 'l', 'lm', 'rx', 'rxm', 'ry', 'rym'].indexOf(key) !== -1) {
                const value = this.arguments[key];
                result += `${key}=${value},`;
            }
        }
        for (const objective in this.scores) {
            const value = this.scores[objective];
            result += `score_${objective}=${value},`;
        }
        result = result.slice(0, -1);
        if (result.length > 2) {
            result += ']';
        }
        return result;
    }
    parseHead(input) {
        if (input.charAt(0) !== '@') {
            throw `Expected '@' at [0] but got '${input.charAt(0)}'.`;
        }
        if (/^[aeprs]$/.test(input.charAt(1))) {
            this.variable = input.charAt(1);
        }
        else {
            throw `Expected '/^[aeprs]$/' at [1] but got '${input.charAt(1)}'.`;
        }
        if (!/^$|^\[$/.test(input.charAt(2))) {
            throw `Expected '/^$|^\[$/' at [2] but got '${input.charAt(2)}'.`;
        }
    }
    parseArgument(input, index) {
        if (/^$|^\]$/.test(input.charAt(index))) {
            return;
        }
        let key = '';
        while (input.charAt(index) !== '=' && input.charAt(index) !== ',' && input.charAt(index) !== ']') {
            key += input.charAt(index);
            index += 1;
        }
        if (utils_1.isNumeric(key)) {
            if (this.arguments.x === undefined) {
                this.arguments.x = key;
            }
            else if (this.arguments.y === undefined) {
                this.arguments.y = key;
            }
            else if (this.arguments.z === undefined) {
                this.arguments.z = key;
            }
            else if (this.arguments.r === undefined) {
                this.arguments.r = key;
            }
            else {
                throw `Expected values but got nothing.`;
            }
        }
        else {
            index += 1;
            let value = '';
            while (input.charAt(index) && !/^[\]|,]$/.test(input.charAt(index))) {
                value += input.charAt(index);
                index += 1;
            }
            if (key.slice(0, 6) === 'score_') {
                this.scores[key.slice(6)] = parseInt(value);
            }
            else {
                this.arguments[key] = value;
            }
        }
        this.parseArgument(input, index + 1);
    }
}
exports.TargetSelector = TargetSelector;
