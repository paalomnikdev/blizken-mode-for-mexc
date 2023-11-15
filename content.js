function makeWhite(el) {
    el.style.color = 'white';
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const pnlTotal = document.getElementsByClassName('pages-contract-assets-up pages-contract-assets-pnl');
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

observer.observe(document, {
    childList: true,
    subtree:   true
});