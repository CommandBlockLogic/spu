/**
 * Providing a map storing old spus and new spus.
 */
export default class Spuses {
    static pairs = new Map([
        ['advancement grant %entity only %string', 'advancement grant %0 only %1'],
        ['advancement grant %entity only %string %string', 'advancement grant %0 only %1 %2'],
        ['advancement revoke %entity only %string', 'advancement revoke %0 only %1'],
        ['advancement revoke %entity only %string %string', 'advancement revoke %0 only %1 %2'],
        ['advancement grant %entity until %string', 'advancement grant %0 until %1'],
        ['advancement grant %entity from %string', 'advancement grant %0 from %1'],
        ['advancement grant %entity through %string', 'advancement grant %0 through %1'],
        ['advancement revoke %entity until %string', 'advancement revoke %0 until %1'],
        ['advancement revoke %entity from %string', 'advancement revoke %0 from %1'],
        ['advancement revoke %entity through %string', 'advancement revoke %0 through %1'],
        ['advancement grant %entity everything', 'advancement grant %0 everything'],
        ['advancement revoke %entity everything', 'advancement revoke %0 everything'],
        ['advancement test %entity %string', 'execute if entity %0$addAdvancement%1'],
        ['advancement test %entity %string %string', 'execute if entity %0$addAdvancement%1%2'],
        ['ban %entity', 'ban %0'],
        ['ban %entity %string', 'ban %0 %1'],
        ['ban-ip %entity', 'ban-ip %0'],
        ['ban-ip %entity %string', 'ban-ip %0 %1'],
        ['ban-ip %string', 'ban-ip %0'],
        ['ban-ip %string %string', 'ban-ip %0 %1'],
        ['banlist %string', 'banlist %0'],
        ['blockdata %position %nbt', 'data merge block %0 %1'],
        ['clear', 'clear'],
        ['clear %entity', 'clear %0'],
        ['clear %entity %item', 'clear %0 %1'],
        ['clear %entity %itemWithData', 'clear %0 %1'],
        ['clear %entity %itemWithData %number', 'clear %0 %1 %2 %'],
        ['clear %entity %itemWithData %number %nbt', 'clear %0$addNbt%3 %1 %2'],
        ['clone %position %position %position', 'clone %0 %1 %2'],
        ['clone %position %position %position %string', 'clone %0 %1 %2 %3'],
        ['clone %position %position %position %string %string', 'clone %0 %1 %2 %3 %4'],
        ['clone %position %position %position %string %string %block', 'clone %0 %1 %2 %3 %5 %4'],
        [
            'clone %position %position %position %string %string %blockWithData',
            'clone %0 %1 %2 %3 %5 %4'
        ],
        ['debug %string', 'debug %0'],
        ['defaultgamemode %mode', 'defaultgamemode %0'],
        ['deop %entity', 'deop %0'],
        ['difficulty %difficulty', 'difficulty %0'],
        ['effect %entity clear', 'effect clear %0'],
        ['effect %entity %string', 'effect give %0 %1'],
        ['effect %entity %string %int', 'effect give %0 %1 %2'],
        ['effect %entity %string %int %int', 'effect give %0 %1 %2 %3'],
        ['effect %entity %string %int %int %bool', 'effect give %0 %1 %2 %3 %4'],
        ['enchant %entity %string', 'enchant %0 %1'],
        ['enchant %entity %string %int', 'enchant %0 %1 %2'],
        ['entitydata %entity %nbt', 'data merge entity %0$setLimitTo1 %1'],
        ['execute %entity %position %command', 'execute as %0 at @s positioned %1 run %2'],
        [
            'execute %entity %position detect %position %blockWithData %command',
            'execute as %0 at @s positioned %1 if block %2 %3 run %4'
        ],
        [
            // TODO: fill
            '',
            ''
        ],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
        ['', '']
    ])
}
