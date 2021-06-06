const template = {
    time: 'hh:mm nn',
    dc: `Disconnected Call:\nTime DC: tt\nCase#: cc\nRef#: rr\nACOC - aa\nCalled back tt\nResolution: note`,
    speedTest: 'Speed Test:\nDownload dd\nUpload uu',
    error: 'Error\n\n\n\nTime Start: t1\nTime End: t2\n\n\n\nReference# rr'
}
function toTime(str) {
    let hh, mm, nn,
        hhmm = (str.match(/\d{1,4}/))[0],
        size = hhmm.length

    switch (true) {
        case size < 3:
            hh = parseInt(hhmm)
            mm = 00
            break;
        case size < 5:
            hh = parseInt(hhmm.substr(0, 2 - (size % 2)))
            mm = parseInt(hhmm.substr(size - 2, 2))
            break;
    }

    nn = Boolean(Math.floor(hh / 12) % 2) || str.endsWith('p') ? 'pm' : 'am'
    hh = hh % 12 == 0 ? 12 : hh % 12
    mm = mm == 0 ? '00' : mm % 60

    return template.time.toString().replace('hh', hh)
        .replace('mm', mm)
        .replace('nn', nn)
}
function emmet(str) {
    return str.toString().replace(/@dc\.@(\d){1,4}(\.\d+){3}\.(true|false)/gi, function (x) {
        let dc = x.split('.')
        return template.dc.toString().replace(/tt/g, dc[1])
            .replace('cc', dc[2])
            .replace('rr', dc[3])
            .replace('aa', dc[4])
            .replace('note', dc[5].toLowerCase().trim() == 'true' ? 'I called immediately and assisted the cx - resolved' : 'I called immediately and left a voice mail - unresolved')
    }).replace(/@err(@\d+(p|a)?){2}#\d+/gi, function (x) {
        let tt = x.match(/@\d+(p|a)?/gi)
        let rr = x.match(/(?<=#)\d+/)[0]
        return template.error.toString().replace('t1', tt[0])
            .replace('t2', tt[1])
            .replace(/(?<=# )rr/g, rr)
    }).replace(/@\d{1,4}(p|a)?(-\d{1,4}(p|a)?)?/gi, function (x) {
        let tt = x.match(/\d{1,4}(p|a)?/g)
        return `@ ${toTime(tt[0])} ${x.includes('-') ? `- ${toTime(tt[1])}` : ''}`.trim()
    }).replace(/@testd.+u.+/gi, function (x) {
        let dd = x.match(/(?<=d).+(?=u)/gi)[0]
        let uu = x.match(/(?<=u).+/gi)[0]
        return template.speedTest.toString().replace('dd', dd.replace(',', ' '))
            .replace('uu', dd.replace(',', ' '))
    }).replace(/amazon|sfdc|omni|vpn/gi, function (x) {
        return x.toUpperCase()
    })
}

let paper = document.querySelector('.paper')
let go = false
paper.addEventListener('keydown', function (e) {
    if (e.code == 'Enter' || e.code == 'Space') go = true
})
paper.addEventListener('input', function (e) {
    console.log(e)
    if (go) {
        e.target.value = emmet(e.target.value)
        go = false
    }
}
)
