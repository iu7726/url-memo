const getCurrentTab = async function () {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
const urlText = document.getElementById('targetUrl')

const init = async function () {
    const tab = await getCurrentTab();
    console.log(tab.url)
    urlText.innerText = tab.url.toString()
    const memo = await chrome.storage.local.get(["urlMemo"])
    JSON.parse(memo.urlMemo).forEach(item => {
        if (item.url == tab.url) {
            const noteInput = document.getElementById('noteInput')
            noteInput.value = item.note

            return false;
        }
    })
    document.getElementById('noteInput').focus()
}

init()

const save = async function () {
    const note = document.getElementById('noteInput').value
    const origin = await chrome.storage.local.get(["urlMemo"])
    let myNote = []
    if (Object.keys(origin).length > 0) {
        myNote = JSON.parse(origin.urlMemo)
    }

    const addNote = [...myNote.filter(item => item.url != urlText.innerText), { url: urlText.innerText, note: note, createdAt: (new Date()).getTime() }]
    await chrome.storage.local.set({ urlMemo: JSON.stringify(addNote) })
}

document.getElementById('save').onclick = async function () {
    await save()
    document.location.href = '../index.html'
}
