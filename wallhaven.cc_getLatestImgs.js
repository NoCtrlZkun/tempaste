var results = [],
	lim = 15687;
function get(p) {
	fetch(`https://wallhaven.cc/latest?page=${p}`)
		.then((a) => a.text())
		.then((a) => Array.from(new DOMParser().parseFromString(a, "text/html").querySelectorAll("li > figure")).map((b) => b.children[1].href))
		.then((a) => {
			console.log(p, a);
			results = [...results, ...a];
			if (p < lim) {
				setTimeout(() => get(++p), 2000);
			} else console.log("Done", results);
		});
}
get(1);