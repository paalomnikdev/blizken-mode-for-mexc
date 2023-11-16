function on(img, buttonText) {
    chrome.storage.sync.set({ 'bliz-enabled': true }).then(() => {
        img.src = './img/bliz.jpeg';
        buttonText.textContent = 'On';
        buttonText.style.color = '#ffffff';
    });
}

function off(img, buttonText) {
    chrome.storage.sync.set({ 'bliz-enabled': false }).then(() => {
        img.src = './img/bliz.png';
        buttonText.textContent = 'Off'
        buttonText.style.color = 'green';
    });
}

(function() {
    chrome.storage.sync.get(['bliz-enabled']).then((result) => {
        const extEnabled = result['bliz-enabled'] || false
        const checkbox = document.getElementById('switch');
        const img = document.getElementById('bliz');
        const buttonText = document.getElementById('button-text');

        checkbox.addEventListener('change', (event) => {
            event.currentTarget.checked ? on(img, buttonText) : off(img, buttonText);
        });

        checkbox.checked = extEnabled;
        extEnabled ? on(img, buttonText) : off(img, buttonText);
    });
})();