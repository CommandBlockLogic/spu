import { SpuScriptExecutor, WheelChief, Argument } from '../utils/wheel_chief/wheel_chief'
import { Commands112To113 } from './commands'
import { Updater } from '../utils/wheel_chief/updater'
import { escape, completeNamespace } from '../utils/utils'
import { NbtCompound, NbtList, NbtString } from '../utils/nbt/nbt'

export class SpuScriptExecutor113To114 implements SpuScriptExecutor {
    public execute(script: string, args: Argument[]): string {
        let splited = script.split(' ')

        for (let i = 0; i < splited.length; i++) {
            if (splited[i].slice(0, 1) === '%') {
                splited[i] = args[parseInt(splited[i].slice(1))].value
            } else if (splited[i].slice(0, 1) === '$') {
                let params = splited[i].slice(1).split('%')
                switch (params[0]) {
                    case 'setBlockParam':
                    case 'setItemParams':
                    case 'setNameToItemStack':
                    case 'setNameDataToItemStack':
                    case 'setNameDataNbtToItemStack':
                    case 'setNameToBlockState':
                    case 'setNameStatesToBlockState':
                    case 'setNameStatesNbtToBlockState':
                    case 'setNbtToSelector':
                        splited[i] = `${args[parseInt(params[1])]}t`
                        break
                    default:
                        throw `Unexpected script method: '${params[0]}'.`
                }
            }
        }

        return splited.join(' ')
    }
}

export class Updater112To113 extends Updater {
    public static upLine(input: string, from: string) {
        if (from !== '113') {
            // TODO: Recursion update.
            // input = Updater112To113.upLine(input, from)
        }
        return new Updater112To113().upSpgodingCommand(input)
    }

    public upArgument(input: string, updater: string): string {
        switch (updater) {
            case 'minecraft:item_slot':// TODO: Add to base
            case 'spgoding:as_entity':
            case 'spgoding:difficulty':
            case 'spgoding:effect':
            case 'spgoding:enchantment':
            case 'spgoding:gamemode':
            case 'spgoding:particle':
            case 'spgoding:points_or_levels':
            case 'spgoding:positioned_pos':
            case 'spgoding:pre_json':
            case 'spgoding:scoreboard_criteria':
            case 'spgoding:single_selector':
            case 'spgoding:sound':
                return this.upSpgodingPreTickTime(input)
            default:
                return super.upArgument(input, updater)
        }
    }

    protected upSpgodingCommand(input: string): string {
        return WheelChief.update(input, Commands112To113.commands, new SpuScriptExecutor113To114(), this)
    }

    protected upSpgodingBlockName(input: string): string {
        input = completeNamespace(input)

        const mapping: [string, string][] = [
            ['minecraft:sign', 'minecraft:oak_sign'],
            ['minecraft:wall_sign', 'minecraft:oak_wall_sign'],
            ['minecraft:stone_slab', 'minecraft:smooth_stone_slab']
        ]

        const result = mapping.find(v => v[0] === input)

        if (result) {
            input = result[1]
        }

        return input
    }

    protected upSpgodingItemName(input: string): string {
        input = completeNamespace(input)

        const mapping: [string, string][] = [
            ['minecraft:sign', 'minecraft:oak_sign'],
            ['minecraft:stone_slab', 'minecraft:smooth_stone_slab']
        ]

        const result = mapping.find(v => v[0] === input)

        if (result) {
            input = result[1]
        }

        return input
    }

    protected upSpgodingItemTagNbt(input: NbtCompound): NbtCompound {
        input = super.upSpgodingItemTagNbt(input)

        /* display.Lore */ {
            let display = input.get('display')
            if (display instanceof NbtCompound) {
                let lore = display.get('Lore')
                if (lore instanceof NbtList) {
                    lore.forEach((line: NbtString) => {
                        line.set(`{"text":"${escape(line.get())}"}`)
                    })
                }
            }

            return input
        }
    }

    private upSpgodingPreTickTime(input: string) {
        return `${input}t`
    }
}
