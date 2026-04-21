// document.currentScript는 async 내부에서 null이 되므로 최상단에서 먼저 캡처
const _layoutScript = document.currentScript;

(async function () {
    // 이 스크립트 파일 경로에서 views/layout 경로를 계산
    // e.g. .../customer-front/src/js/layout.js → .../customer-front/src/views/layout
    const scriptSrc = _layoutScript
        ? _layoutScript.src
        : location.href.replace(/\/[^/]*$/, '') + '/../../src/views/layout';

    const BASE = scriptSrc.replace(/\/js\/layout\.js(\?.*)?$/, '/views/layout');

    async function loadPartial(selector, url) {
        const el = document.querySelector(selector);
        if (!el) return;
        const res = await fetch(url);
        const html = await res.text();
        el.outerHTML = html;
    }

    await loadPartial('#site-header', BASE + '/header.html');
    await loadPartial('#site-footer', BASE + '/footer.html');
})();
