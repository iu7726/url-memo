chrome.webNavigation.onCompleted.addListener(async function (e) {
    if (e.parentFrameId != -1) return false;
    if (e.url.indexOf('http://') != 0 && e.url.indexOf('https://') != 0) return false

    const origin = await chrome.storage.local.get(["urlMemo"])

    let myNote = []
    if (Object.keys(origin).length == 0) return false;
    myNote = JSON.parse(origin.urlMemo)

    const alertNote = myNote.filter(item => item.url == e.url)[0]

    if (!alertNote) {
        console.log('origin in')
        await chrome.action.setIcon({ path: "/image/logo.png", tabId: e.tabId })
        return false;
    }

    chrome.action.setIcon({ path: "/image/logo_check.png", tabId: e.tabId })
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async function (e) {
    if (e.parentFrameId != -1) return false;
    if (e.url.indexOf('http://') != 0 && e.url.indexOf('https://') != 0) return false

    const origin = await chrome.storage.local.get(["urlMemo"])

    let myNote = []
    if (Object.keys(origin).length == 0) return false;
    myNote = JSON.parse(origin.urlMemo)

    const alertNote = myNote.filter(item => item.url == e.url)[0]

    if (!alertNote) {
        console.log('origin in')
        await chrome.action.setIcon({ path: "/image/logo.png", tabId: e.tabId })
        return false;
    }

    chrome.action.setIcon({ path: "/image/logo_check.png", tabId: e.tabId })
});