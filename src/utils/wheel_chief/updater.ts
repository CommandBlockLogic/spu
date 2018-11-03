import { getNbtCompound } from '../utils'
import { NbtString, NbtList, NbtCompound, NbtValue } from '../nbt/nbt'
import { TargetSelector } from '../target_selector'

export class Updater {
    public upArgument(input: string, updater: string): string {
        switch (updater) {
            case 'minecraft:component':
                return this.upMinecraftComponent(input)
            case 'minecraft:entity':
                return this.upMinecraftEntity(input)
            case 'minecraft:entity_summon':
                return this.upMinecraftEntitySummon(input)
            case 'minecraft:message':
                return this.upMinecraftMessage(input)
            case 'spgoding:command':
                return this.upSpgodingCommand(input)
            case 'spgoding:entity_nbt':
                return this.upSpgodingEntityNbt(getNbtCompound(input)).toString()
            case 'spgoding:item_nbt':
                return this.upSpgodingItemNbt(getNbtCompound(input)).toString()
            case 'spgoding:item_tag_nbt':
                return this.upSpgodingItemTagNbt(getNbtCompound(input)).toString()
            default:
                return input
        }
    }

    public static upLine(input: string, from: string) {
        return input
    }

    protected upBlockNbt(root: NbtCompound) {

        /* Command */ {
            const command = root.get('Command')
            if (command instanceof NbtString) {
                command.set(this.upSpgodingCommand(command.get()))
            }
        }
        /* Items */ {
            const items = root.get('Items')
            if (items instanceof NbtList) {
                for (let i = 0; i < items.length; i++) {
                    let item = items.get(i)
                    if (item instanceof NbtCompound) {
                        item = this.upSpgodingItemNbt(item)
                        items.set(i, item)
                    }
                }
            }
        }
        /* RecordItem */ {
            let item = root.get('RecordItem')
            if (item instanceof NbtCompound) {
                item = this.upSpgodingItemNbt(item)
            }
        }

        return root
    }

    protected upSpgodingCommand(input: string) {
        return input
    }

    protected upMinecraftEntity(input: string) {
        try {
            const selector = new TargetSelector(input)
            return this.upTargetSelector(selector)
        } catch {
            return input
        }
    }


    protected upSpgodingEntityNbt(input: NbtCompound) {
        /* id */ {
            const id = input.get('id')
            if (id instanceof NbtString) {
                id.set(this.upMinecraftEntitySummon(id.get()))
            }
        }
        /* Passengers */ {
            const passengers = input.get('Passengers')
            if (passengers instanceof NbtList) {
                for (let i = 0; i < passengers.length; i++) {
                    let passenger = passengers.get(i)
                    if (passenger instanceof NbtCompound) {
                        passenger = this.upSpgodingEntityNbt(passenger)
                        passengers.set(i, passenger)
                    }
                }
            }
        }
        /* Offers.Recipes[n].buy &
           Offers.Recipes[n].buyB & 
           Offers.Recipes[n].sell */ {
            const offers = input.get('Offers')
            if (offers instanceof NbtCompound) {
                const recipes = offers.get('Recipes')
                if (recipes instanceof NbtList) {
                    recipes.forEach((v: NbtValue) => {
                        if (v instanceof NbtCompound) {
                            let buy = v.get('buy')
                            let buyB = v.get('buyB')
                            let sell = v.get('sell')
                            if (buy instanceof NbtCompound) {
                                buy = this.upSpgodingItemNbt(buy)
                                v.set('buy', buy)
                            }
                            if (buyB instanceof NbtCompound) {
                                buyB = this.upSpgodingItemNbt(buyB)
                                v.set('buyB', buyB)
                            }
                            if (sell instanceof NbtCompound) {
                                sell = this.upSpgodingItemNbt(sell)
                                v.set('sell', sell)
                            }
                        }
                    })
                }
            }
        }
        /* HandItems */ {
            const handItems = input.get('HandItems')
            if (handItems instanceof NbtList) {
                for (let i = 0; i < handItems.length; i++) {
                    let item = handItems.get(i)
                    if (item instanceof NbtCompound) {
                        item = this.upSpgodingItemNbt(item)
                        handItems.set(i, item)
                    }
                }
            }
        }
        /* ArmorItems */ {
            const armorItems = input.get('ArmorItems')
            if (armorItems instanceof NbtList) {
                for (let i = 0; i < armorItems.length; i++) {
                    let item = armorItems.get(i)
                    if (item instanceof NbtCompound) {
                        item = this.upSpgodingItemNbt(item)
                        armorItems.set(i, item)
                    }
                }
            }
        }
        /* ArmorItem */ {
            let armorItem = input.get('ArmorItem')
            if (armorItem instanceof NbtCompound) {
                armorItem = this.upSpgodingItemNbt(armorItem)
                input.set('ArmorItem', armorItem)
            }
        }
        /* SaddleItem */ {
            let saddleItem = input.get('SaddleItem')
            if (saddleItem instanceof NbtCompound) {
                saddleItem = this.upSpgodingItemNbt(saddleItem)
                input.set('SaddleItem', saddleItem)
            }
        }
        /* Items */ {
            const items = input.get('Items')
            if (items instanceof NbtList) {
                for (let i = 0; i < items.length; i++) {
                    let item = items.get(i)
                    if (item instanceof NbtCompound) {
                        item = this.upSpgodingItemNbt(item)
                        items.set(i, item)
                    }
                }
            }
        }
        /* DecorItem */ {
            let decorItem = input.get('DecorItem')
            if (decorItem instanceof NbtCompound) {
                decorItem = this.upSpgodingItemNbt(decorItem)
                input.set('DecorItem', decorItem)
            }
        }
        /* Inventory */ {
            const inventory = input.get('Inventory')
            if (inventory instanceof NbtList) {
                for (let i = 0; i < inventory.length; i++) {
                    let item = inventory.get(i)
                    if (item instanceof NbtCompound) {
                        item = this.upSpgodingItemNbt(item)
                        inventory.set(i, item)
                    }
                }
            }
        }
        /* Item */ {
            let item = input.get('Item')
            if (item instanceof NbtCompound) {
                item = this.upSpgodingItemNbt(item)
                input.set('Item', item)
            }
        }
        /* SelectedItem */ {
            let selectedItem = input.get('SelectedItem')
            if (selectedItem instanceof NbtCompound) {
                selectedItem = this.upSpgodingItemNbt(selectedItem)
                input.set('SelectedItem', selectedItem)
            }
        }
        /* FireworksItem */ {
            let fireworksItem = input.get('FireworksItem')
            if (fireworksItem instanceof NbtCompound) {
                fireworksItem = this.upSpgodingItemNbt(fireworksItem)
                input.set('FireworksItem', fireworksItem)
            }
        }
        /* Command */ {
            const command = input.get('Command')
            if (command instanceof NbtString) {
                command.set(this.upSpgodingCommand(command.get()))
            }
        }
        /* SpawnPotentials */ {
            const spawnPotentials = input.get('SpawnPotentials')
            if (spawnPotentials instanceof NbtList) {
                for (let i = 0; i < spawnPotentials.length; i++) {
                    const potential = spawnPotentials.get(i)
                    if (potential instanceof NbtCompound) {
                        let entity = potential.get('Entity')
                        if (entity instanceof NbtCompound) {
                            entity = this.upSpgodingEntityNbt(entity)
                            potential.set('Entity', entity)
                        }
                    }
                }
            }
        }
        /* SpawnData */ {
            let spawnData = input.get('SpawnData')
            if (spawnData instanceof NbtCompound) {
                spawnData = this.upSpgodingEntityNbt(spawnData)
                input.set('SpawnData', spawnData)
            }
        }

        return input
    }

    protected upMinecraftEntitySummon(input: string) {
        return input
    }

    protected upSpgodingItemNbt(input: NbtCompound) {
        /* tag */ {
            let tag = input.get('tag')
            if (tag instanceof NbtCompound) {
                tag = this.upSpgodingItemTagNbt(tag)
                input.set('tag', tag)
            }
        }

        return input
    }

    protected upSpgodingItemTagNbt(input: NbtCompound) {
        /* BlockEntityTag */ {
            let blockEntityTag = input.get('BlockEntityTag')
            if (blockEntityTag instanceof NbtCompound) {
                blockEntityTag = this.upBlockNbt(input)
                input.set('BlockEntityTag', blockEntityTag)
            }
        }
        /* EntityTag */ {
            let entityTag = input.get('EntityTag')
            if (entityTag instanceof NbtCompound) {
                entityTag = this.upSpgodingEntityNbt(entityTag)
                input.set('EntityTag', entityTag)
            }
        }

        return input
    }

    protected upMinecraftComponent(input: string) {
        if (input.slice(0, 1) === '"') {
            return input
        } else if (input.slice(0, 1) === '[') {
            let json = JSON.parse(input)
            let result: string[] = []
            for (const i of json) {
                result.push(this.upMinecraftComponent(JSON.stringify(i)))
            }
            return `[${result.join()}]`
        } else {
            let json = JSON.parse(input)
            if (json.selector) {
                json.selector = this.upTargetSelector(json.selector)
            }

            if (
                json.clickEvent &&
                json.clickEvent.action &&
                (json.clickEvent.action === 'run_command' || json.clickEvent.action === 'suggest_command') &&
                json.clickEvent.value &&
                json.clickEvent.value.slice(0, 1) === '/'
            ) {
                try {
                    json.clickEvent.value = this.upSpgodingCommand(json.clickEvent.value)
                } catch {
                    // That's ok. Take it easy.
                }
            }

            if (json.extra) {
                json.extra = JSON.parse(this.upMinecraftComponent(JSON.stringify(json.extra)))
            }

            return JSON.stringify(json).replace(/§/g, '\\u00a7')
        }
    }

    protected upMinecraftMessage(input: string) {
        let parts = input.split('@')
        for (let i = 1; i < parts.length; i++) {
            try {
                const selector = new TargetSelector(`@${parts[i]}`)
                parts[i] = this.upTargetSelector(selector)
            } catch {
                continue
            }
        }

        return parts.join('@')
    }

    protected upTargetSelector(input: string | TargetSelector) {
        let selector: TargetSelector
        if (typeof input === 'string') {
            selector = new TargetSelector(input)
        } else {
            selector = input
        }
        selector.nbt = this.upSpgodingEntityNbt(selector.nbt)
        return selector.toString()
    }
}
