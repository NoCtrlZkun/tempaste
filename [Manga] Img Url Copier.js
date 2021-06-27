((orig, t) => {
	let loca = orig.replace(/https?:\/\//g, ""),
		selector = {
			"blogtruyen.com": "#content > img",
			"blogtruyen.vn": "#content > img",
			"mangakakalot.com": "#vungdoc > img",
			"mangakakalots.com": "#vungdoc > img",
			"manganelo.com": "#vungdoc > img",
			"hocvientruyentranh.net": ".img-responsive.page",
			"we-never-learn.com": "div.separator > a > img"
		},
		urls = document.querySelectorAll(selector[loca] || null);
	if (urls) {
		t.id = "imgUrls";
		document.body.appendChild(t);
		let tArea = document.querySelector("#imgUrls");
		tArea.value = Array.from(urls).map((a) => a.src).join("\n");
		tArea.select();
		document.execCommand("copy");
		tArea.remove();
		alert(`Copied ${urls.length} Img(s) URL.`);
	}
})(document.location.origin, document.createElement("textarea"));