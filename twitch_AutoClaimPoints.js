let query = {
	observe: document.querySelector("div[data-test-selector='community-points-summary'] > .tw-full-height.tw-relative.tw-z-above"),
	headBtns: document.querySelector(".tw-align-items-center.tw-flex.tw-flex-grow-1.tw-flex-shrink-1.tw-full-width.tw-justify-content-end"),
	primeBtn: document.querySelector(".top-nav__prime")
}, create = {
	noClk: document.createElement("h5")
}, observer = new MutationObserver((list) => {
	setTimeout(() => {
		// Observe the DOM for "point" button
		let a = document.querySelector("div[data-test-selector='community-points-summary']").querySelectorAll("svg"),
			noClkLog = document.querySelector("#noClk"),
			nofclk = Number(noClkLog.getAttribute("nofclk"));
		if (a.length == 2) {
			nofclk++;
			a[1].parentElement.parentElement.parentElement.parentElement.parentElement.click();
			noClkLog.setAttribute("nofclk", nofclk);
		}
		noClkLog.innerHTML = `# Click: ${nofclk}`;
	}, 1000);
});
create.noClk.id = "noClk";
create.noClk.innerHTML = `# Click: 0`;
create.noClk.style.marginRight = "4em";
create.noClk.setAttribute("nofclk", 0);
query.headBtns.insertBefore(create.noClk, query.headBtns.childNodes[0]);
observer.observe(query.observe, { attributes: true, childList: true, subtree: true }); // Start Observe

query.primeBtn.remove();