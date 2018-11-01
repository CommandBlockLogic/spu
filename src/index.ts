import Updater18To19 from './bad_practice/18to19/updater'
import Updater19To111 from './bad_practice/19to111/updater'
import Updater111To112 from './bad_practice/111to112/updater'
import Updater112To113 from './bad_practice/112to113/updater'
import Updater113To114 from './113to114/updater'

function $(id: string) {
    return <HTMLElement>document.getElementById(id)
}

let from_18 = $('from-18')
let from_19 = $('from-19')
let from_111 = $('from-111')
let from_112 = $('from-112')
let from_113 = $('from-113')
let to_18 = $('to-18')
let to_19 = $('to-19')
let to_111 = $('to-111')
let to_112 = $('to-112')
let to_113 = $('to-113')
let to_114 = $('to-114')
let info = $('info')
let from: '18' | '19' | '111' | '112' | '113' = '113'
let to: '18' | '19' | '111' | '112' | '113' | '114' = '114'

info.style.display = 'none'

$('button').onclick = () => {
    info.style.display = ''
    let number = 1
    let frame: 'success' | 'warning' | 'danger' = 'success'
    let msg = ""
    let result = ''
    try {
        let timeBefore = (new Date()).getTime()
        let content = (<HTMLInputElement>$('input')).value
        if (content) {
            let lines = content.toString().split('\n')

            for (let line of lines) {
                number = lines.indexOf(line)

                if (from === '18' && to === '19') {
                    line = Updater18To19.upLine(line)
                } else if (from === '18' && to === '111') {
                    line = Updater19To111.upLine(
                        Updater18To19.upLine(line)
                    )
                } else if (from === '18' && to === '112') {
                    line = Updater111To112.upLine(
                        Updater19To111.upLine(
                            Updater18To19.upLine(line)
                        )
                    )
                } else if (from === '18' && to === '113') {
                    line = Updater112To113.upLine(
                        Updater111To112.upLine(
                            Updater19To111.upLine(
                                Updater18To19.upLine(line)
                            )
                        )
                    )
                } else if (from === '18' && to === '114') {
                    line = Updater113To114.upCommand(
                        Updater112To113.upLine(
                            Updater111To112.upLine(
                                Updater19To111.upLine(
                                    Updater18To19.upLine(line)
                                )
                            )
                        )
                    )
                } else if (from === '19' && to === '111') {
                    line = Updater19To111.upLine(line)
                } else if (from === '19' && to === '112') {
                    line = Updater111To112.upLine(
                        Updater19To111.upLine(line)
                    )
                } else if (from === '19' && to === '113') {
                    line = Updater112To113.upLine(
                        Updater111To112.upLine(
                            Updater19To111.upLine(line)
                        )
                    )
                } else if (from === '19' && to === '114') {
                    line = Updater113To114.upCommand(
                        Updater112To113.upLine(
                            Updater111To112.upLine(
                                Updater19To111.upLine(line)
                            )
                        )
                    )
                } else if (from === '111' && to === '112') {
                    line = Updater111To112.upLine(line)
                } else if (from === '111' && to === '113') {
                    line = Updater112To113.upLine(
                        Updater111To112.upLine(line)
                    )
                } else if (from === '111' && to === '114') {
                    line = Updater113To114.upCommand(
                        Updater112To113.upLine(
                            Updater111To112.upLine(line)
                        )
                    )
                } else if (from === '112' && to === '113') {
                    line = Updater112To113.upLine(line)
                } else if (from === '112' && to === '114') {
                    line = Updater113To114.upCommand(
                        Updater112To113.upLine(line)
                    )
                } else if (from === '113' && to === '114') {
                    line = Updater113To114.upCommand(line)
                } else {
                    line = ' !> Please select the target version!'
                }

                if (line.indexOf(' !> ') !== -1) {
                    frame = 'warning'
                    msg += `Line #${number + 1}: ${line.slice(line.indexOf(' !> ') + 4).replace(/ !> /g, '<br />')}<br />`
                    line = line.slice(0, line.indexOf(' !> '))
                }
                result += line + '\n'
            }

            result = result.slice(0, -1) // Remove the last line.
            let timeAfter = (new Date()).getTime()
            let timeDelta = timeAfter - timeBefore
            msg = `Updated ${lines.length} line${lines.length === 1 ? '' : 's'} (in ${(timeDelta / 1000).toFixed(3)} seconds).<br />${msg}`
        }
    } catch (ex) {
        frame = 'danger'
        msg = `Updated error. <br />Line #${number + 1}: ${ex}`
        result = ''
    } finally {
        ; (<HTMLInputElement>$('output')).value = result
        info.innerHTML = msg
        info.classList.replace('alert-success', `alert-${frame}`)
        info.classList.replace('alert-danger', `alert-${frame}`)
        info.classList.replace('alert-warning', `alert-${frame}`)
    }
}

function resetButtonClasses(type: 'from' | 'to') {
    if (type === 'from') {
        from_18.classList.replace('btn-active', 'btn-default')
        from_19.classList.replace('btn-active', 'btn-default')
        from_111.classList.replace('btn-active', 'btn-default')
        from_112.classList.replace('btn-active', 'btn-default')
        from_113.classList.replace('btn-active', 'btn-default')
    } else {
        to_18.classList.replace('btn-active', 'btn-default')
        to_19.classList.replace('btn-active', 'btn-default')
        to_111.classList.replace('btn-active', 'btn-default')
        to_112.classList.replace('btn-active', 'btn-default')
        to_113.classList.replace('btn-active', 'btn-default')
        to_114.classList.replace('btn-active', 'btn-default')
    }
}

function resetButtonVisibility() {
    to_18.style.display = ''
    to_19.style.display = ''
    to_111.style.display = ''
    to_112.style.display = ''
    to_113.style.display = ''
    to_114.style.display = ''
}

from_18.onclick = () => {
    resetButtonClasses('from')
    from_18.classList.replace('btn-default', 'btn-active')

    resetButtonVisibility()
    to_18.style.display = 'none'

    from = '18'
}
from_19.onclick = () => {
    resetButtonClasses('from')
    from_19.classList.replace('btn-default', 'btn-active')

    resetButtonVisibility()
    to_18.style.display = 'none'
    to_19.style.display = 'none'

    from = '19'
}
from_111.onclick = () => {
    resetButtonClasses('from')
    from_111.classList.replace('btn-default', 'btn-active')

    resetButtonVisibility()
    to_18.style.display = 'none'
    to_19.style.display = 'none'
    to_111.style.display = 'none'

    from = '111'
}
from_112.onclick = () => {
    resetButtonClasses('from')
    from_112.classList.replace('btn-default', 'btn-active')

    resetButtonVisibility()
    to_18.style.display = 'none'
    to_19.style.display = 'none'
    to_111.style.display = 'none'
    to_112.style.display = 'none'

    from = '112'
}
from_113.onclick = () => {
    resetButtonClasses('from')
    from_113.classList.replace('btn-default', 'btn-active')

    resetButtonVisibility()
    to_18.style.display = 'none'
    to_19.style.display = 'none'
    to_111.style.display = 'none'
    to_112.style.display = 'none'
    to_113.style.display = 'none'

    from = '113'
}
to_18.onclick = () => {
    resetButtonClasses('to')
    to_18.classList.replace('btn-default', 'btn-active')
    to = '18'
}
to_19.onclick = () => {
    resetButtonClasses('to')
    to_19.classList.replace('btn-default', 'btn-active')
    to = '19'
}
to_111.onclick = () => {
    resetButtonClasses('to')
    to_111.classList.replace('btn-default', 'btn-active')
    to = '111'
}
to_112.onclick = () => {
    resetButtonClasses('to')
    to_112.classList.replace('btn-default', 'btn-active')
    to = '112'
}
to_113.onclick = () => {
    resetButtonClasses('to')
    to_113.classList.replace('btn-default', 'btn-active')
    to = '113'
}
to_114.onclick = () => {
    resetButtonClasses('to')
    to_114.classList.replace('btn-default', 'btn-active')
    to = '114'
}