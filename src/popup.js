const removeMemo = async function (url) {
    console.log(url)
    const memoStr = await chrome.storage.local.get(["urlMemo"])
    const memo = JSON.parse(memoStr.urlMemo)
    chrome.storage.local.set({ urlMemo: JSON.stringify(memo.filter(item => item.url != url)) })

    init()
}

const getCurrentTab = async function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const init = async function () {
    const memo = await chrome.storage.local.get(["urlMemo"])
    const tab = await getCurrentTab();
    if (Object.keys(memo).length == 0) return false;
    const urlList = document.getElementById('urlList')
    urlList.innerHTML = ''

    JSON.parse(memo.urlMemo).map(item => {
        const note = document.createElement('div')
        note.className = 'memoRaw'
        const aTag = document.createElement('a')
        aTag.innerText = item.note
        aTag.href = item.url
        aTag.title = item.url
        aTag.target = '_blank'
        aTag.style.cursor = 'pointer'
        aTag.className = 'memoText'
        const removeBtn = document.createElement('button')
        removeBtn.innerText = 'X'
        removeBtn.className = 'memoRemove'
        removeBtn.onclick = function () {
            removeMemo(item.url)
        }
        note.appendChild(aTag)
        note.appendChild(removeBtn)
        urlList.appendChild(note)

        if (item.url == tab.url) {
            const urlMemo = document.getElementById('urlMemo')
            urlMemo.innerText = item.note
            urlMemo.title = 'Created: ' + new Date(item.createdAt).toLocaleString()
        }
    })
}

init()