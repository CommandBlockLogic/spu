import { ArgumentParser } from '../utils/wheel_chief/parser'
import { Selector112 as TargetSelector112 } from './utils/selector'

export class ArgumentParser111To112 extends ArgumentParser {
    protected parseMinecraftEntity(splited: string[], index: number): number {
        let join = splited[index]
        if (join.charAt(0) !== '@') {
            return 1
        }
        if (TargetSelector112.isValid(join)) {
            return 1
        }
        else {
            for (let i = index + 1; i < splited.length; i++) {
                join += ' ' + splited[i]
                if (TargetSelector112.isValid(join)) {
                    return i - index + 1
                }
                else {
                    continue
                }
            }
            throw 'Expected an entity selector.'
        }
    }
}
