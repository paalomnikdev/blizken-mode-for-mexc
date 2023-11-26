const COLORS_ENABLED = 'color-enabled';
const PNL_REMOVE = 'pnl-remove';

function makeWhite(el) {
    el.style.color = 'white';
}

function makeWhiteInBatch(elements) {
    elements.forEach((elmnts) => {
        Array.from(elmnts).forEach(function (element) {
            makeWhite(element);
        });
    });
}

function removeWhite(elements) {
    elements.forEach((elmnts) => {
        Array.from(elmnts).forEach(function (element) {
            element.style.color = null;
        });
    });
}

function removePNL(el) {
    el.style.display = 'none';
}

function returnPNL(el) {
    el.style.removeProperty('display');
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const pnlTotal = document.getElementsByClassName('pages-contract-assets-up pages-contract-assets-pnl');
    const pnlTotalNegative = document.getElementsByClassName('pages-contract-assets-less pages-contract-assets-pnl');
    const positivePnl = document.getElementsByClassName('pages-contract-handlerecord-position-index-up');
    const negativePNL = document.getElementsByClassName('pages-contract-handlerecord-position-index-less');
    const negativeRealizedPNL = document.querySelectorAll('.tooltip-dashed.pages-contract-handlerecord-component-realizedpnl-index-less');
    const positiveRealizedPNL = document.querySelectorAll('.tooltip-dashed.pages-contract-handlerecord-component-realizedpnl-index-up');

    if (negativeRealizedPNL) {
        Array.from(negativeRealizedPNL).forEach(function (element) {
            makeWhite(element);
        });
    }

    if (positiveRealizedPNL) {
        Array.from(positiveRealizedPNL).forEach(function (element) {
            makeWhite(element);
        });
    }

    if (pnlTotal) {
        Array.from(pnlTotal).forEach(function (element) {
            makeWhite(element);
        });
    }

    if (pnlTotalNegative) {
        Array.from(pnlTotalNegative).forEach(function (element) {
            makeWhite(element);
        });
    }

    if (positivePnl) {
        Array.from(positivePnl).forEach(function (element) {
            if (element.classList.length == 1) {
                makeWhite(element);
            }
        });
    }

    if (negativePNL) {
        Array.from(negativePNL).forEach(function (element) {
            if (element.classList.length == 1) {
                makeWhite(element);
            }
        });
    }
});

const totalPnlObserver = new MutationObserver(function (mutations, mutationInstance) {
    const pnlTotalBlock = document.getElementsByClassName('pages-contract-assets-pnlItem');
    
    if (pnlTotalBlock) {
        Array.from(pnlTotalBlock).forEach(function (element) {
            removePNL(element);
        });
    }
});

chrome.storage.sync.get([PNL_REMOVE]).then((result) => {
    if (result[PNL_REMOVE]) {
        totalPnlObserver.observe(document, {
            childList: true,
            subtree:   true
        });

    }
});

chrome.storage.sync.get([COLORS_ENABLED]).then((result) => {
    if (result[COLORS_ENABLED]) {
        observer.observe(document, {
            childList: true,
            subtree:   true
        });

    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request[COLORS_ENABLED] !== undefined) {
        const coloredElements = [
            document.getElementsByClassName('pages-contract-assets-up pages-contract-assets-pnl'),
            document.getElementsByClassName('pages-contract-assets-less pages-contract-assets-pnl'),
            document.getElementsByClassName('pages-contract-handlerecord-position-index-up'),
            document.getElementsByClassName('pages-contract-handlerecord-position-index-less'),
            document.querySelectorAll('.tooltip-dashed.pages-contract-handlerecord-component-realizedpnl-index-less'),
            document.querySelectorAll('.tooltip-dashed.pages-contract-handlerecord-component-realizedpnl-index-up')
        ];

        if (request[COLORS_ENABLED]) {
            makeWhiteInBatch(coloredElements);
            observer.observe(document, {
                childList: true,
                subtree:   true
            });
        } else {
            observer.disconnect();
            removeWhite(coloredElements);
        }
    }


    if (request[PNL_REMOVE] !== undefined) {
        const pnlTotalBlock = document.getElementsByClassName('pages-contract-assets-pnlItem');

        if (request[PNL_REMOVE]) {
            if (pnlTotalBlock) {
                Array.from(pnlTotalBlock).forEach(function (element) {
                    removePNL(element);
                });
            }
            totalPnlObserver.observe(document, {
                childList: true,
                subtree:   true
            });
        } else {
            if (pnlTotalBlock) {
                Array.from(pnlTotalBlock).forEach(function (element) {
                    totalPnlObserver.disconnect();
                    returnPNL(element);
                });
            }
        }
    }
});
