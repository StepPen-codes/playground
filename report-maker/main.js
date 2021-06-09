const paper = document.querySelector('.paper')
const template = {
  time:'hh:mm nn',
  dc:`Disconnected Call:\nTime DC: tt\nCase#: cc\nRef#: rr\nACOC - aa\nCalled back tt\nResolution: note`,
  speedTest:'Speed Test:\nDownload dd\nUpload uu',
  error:'Error\n\n\n\nTime Start: t1\nTime End: t2\n\n\n\nReference# rr'
}
let replaced = false

savedReport = localStorage.getItem('savedReport')
if (localStorage.getItem('savedReport'))
  paper.value=savedReport

//PaperEvent
paper.addEventListener('keyup',function(e) {
  if (e.code == 'Space' || e.code == 'Enter' || e.code == 'Backspace'){
    let ws = e.code == 'Space'? ' ':'\n'
    let str = emmet(e.target.value,ws)
    if(replaced && (e.code == 'Space' || e.code == 'Enter')){
      let pos = 0
      pos = str.lastIndexOf('█')
      e.target.value=str.replace('█',ws)
      setCaretPosition(paper,pos+1 * (pos >= 0))
    }
    replaced=false
    
    localStorage.setItem('savedReport',e.target.value)
  }
}
) 

function toTime(str){
  let hh,mm,nn,
      hhmm=(str.match(/\d{1,4}/))[0],
      size=hhmm.length
      
  switch(true){
    case size<3:
      hh=parseInt(hhmm)
      mm=00
      break;
    case size<5:
      hh=parseInt(hhmm.substr(0,2-(size%2)))
      mm=parseInt(hhmm.substr(size-2,2))
      break;
  }

  nn=Boolean(Math.floor(hh/12)%2)||str.endsWith('p')?'pm':'am'
  hh=hh%12==0?12:hh%12
  mm=mm==0?'00':mm%60
  
  return template.time.toString().replace('hh',hh)
                                 .replace('mm',mm)
                                 .replace('nn',nn)
}

function emmet(str,ws){
  let ret = str.replace(/@dc.@12.12345.54321.51423.true/,function (x) {
      let dc = x.split('.')
      replaced = true
      return template.dc.toString().replace(/tt/g,dc[1])
                                   .replace('cc',dc[2])
                                   .replace('rr',dc[3])
                                   .replace('aa',dc[4])
                                   .replace('note',Boolean(dc[5])?'I called immediately and assisted the cx - resolved':'I called immediately and left a voice mail - unresolved')+'█'
    }).replace(/@err(@\d+(p|a)?){2}#\d+/gi,function (x) {
      let tt=x.match(/@\d+(p|a)?/gi)
      let rr=x.match(/(?<=#)\d+/)[0]
      replaced = true
      return template.error.toString().replace('t1',tt[0])
                                      .replace('t2',tt[1])
                                      .replace(/(?<=# )rr/g,rr)+'█'
    }).replace(/@\d{1,4}(p|a)?(-\d{1,4}(p|a)?)?/gi, function (x) {
      replaced = true
      let tt = x.match(/\d{1,4}(p|a)?/g)
      return `@ ${toTime(tt[0])} ${x.includes('-')? `- ${toTime(tt[1])}`:''}`.trim()+'█'
    }).replace(/@testd.+u.+/gi,function (x) {
      replaced = true
      let dd=x.match(/(?<=d).+(?=u)/gi)[0]
      let uu=x.match(/(?<=u).+/gi)[0]
      return template.speedTest.toString().replace('dd',dd.replace(',',' '))
                                        .replace('uu',dd.replace(',',' '))+'█'
    }).replace(/amazon|sfdc|omni|vpn/gi,function (x) {
      let ret=x.toUpperCase()
      if (x!=ret){
        replaced = true
        ret=x.toUpperCase()
      }
      return ret
    })
  return ret
}

function setCaretPosition(elem, caretPos) {
  if(elem != null) {
    elem.focus();
    elem.setSelectionRange(caretPos, caretPos);
  }
  else
    elem.focus();
}
