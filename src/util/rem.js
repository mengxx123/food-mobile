(function (doc, win) {
    var docEl = doc.documentElement
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var setElement = function () {
        var clientWidth = docEl.clientWidth
        var scale = clientWidth / 375

        if (scale < 1) {
            docEl.style.fontSize = Math.ceil(scale * 100) + 'px'
        } else {
            if (scale > 1.15) {
                docEl.style.fontSize = '115px'
            } else {
                docEl.style.fontSize = '100px'
            }
        }

        docEl.style.fontSize = Math.ceil(scale * 100) + 'px'
    }
    setElement()
    win.addEventListener(resizeEvt, setElement, false)
})(document, window)
