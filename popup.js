const COLORS_ENABLED = 'color-enabled';
const PNL_REMOVE = 'pnl-remove';

function colorsOn(img, buttonText) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {[COLORS_ENABLED]: true});
    });
    chrome.storage.sync.set({ [COLORS_ENABLED]: true }).then(() => {
        img.src = './img/bliz.jpeg';
        buttonText.style.color = '#ffffff';
    });
}

function colorsOff(img, buttonText) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {[COLORS_ENABLED]: false});
    });
    chrome.storage.sync.set({ [COLORS_ENABLED]: false }).then(() => {
        img.src = './img/bliz.png';
        buttonText.style.color = 'green';
    });
}

function hideTotalPNL(pnlSwitch) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {[PNL_REMOVE]: true});
    });
    chrome.storage.sync.set({ [PNL_REMOVE]: true }).then(() => {
        pnlSwitch.checked = true;
    });
}

function showTotalPNL(pnlSwitch) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {[PNL_REMOVE]: false});
    });
    chrome.storage.sync.set({ [PNL_REMOVE]: false }).then(() => {
        pnlSwitch.checked = false;
    });
}

(function() {
    // colors
    chrome.storage.sync.get([COLORS_ENABLED]).then((result) => {
        const extEnabled = result[COLORS_ENABLED] || false
        const checkbox = document.getElementById('switch');
        const img = document.getElementById('bliz');
        const buttonText = document.getElementById('button-text');

        checkbox.addEventListener('change', (event) => {
            event.currentTarget.checked ? colorsOn(img, buttonText) : colorsOff(img, buttonText);
        });

        checkbox.checked = extEnabled;
        extEnabled ? colorsOn(img, buttonText) : colorsOff(img, buttonText);
    });
    // PNL block
    chrome.storage.sync.get([PNL_REMOVE]).then((result) => {
        const enabled = result[PNL_REMOVE] || false;
        checkbox = document.getElementById('totalPnlSwitch');

        enabled ? hideTotalPNL(checkbox) : showTotalPNL(checkbox);

        checkbox.addEventListener('change', (event) => {
            event.currentTarget.checked ? hideTotalPNL(checkbox) : showTotalPNL(checkbox);
        });
    });
})();