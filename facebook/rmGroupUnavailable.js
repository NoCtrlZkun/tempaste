// How to use: Open the group you're moderator => Press F12 => Switch to Console tab => Paste => Hit Enter
var dtsg = require("DTSGInitialData").token || document.querySelector('[name="fb_dtsg"]').value,
	groupId = /\d+/.exec(document.querySelector("div[id*='headerAction_']").id)[0];

new Promise((resolve) => {
	let inactiveIds = [];
	function getUnavailable(start = 0, cursor) {
		let f = new FormData(),
			data = {
				gid: groupId,
				order: "default",
				filter: "unavailable_accounts",
				view: "list",
				limit: 500,
				sectiontype: "unavailable",
				start: start,
				"nctr[_mod]": "pagelet_group_unavailable_accounts",
				fb_dtsg: dtsg,
				__a: 1
			};
		if (cursor) data.cursor = cursor[0];
		for (let d in data) f.append(d, data[d]);
		fetch("https://www.facebook.com/ajax/browser/list/group_confirmed_members/", {
			"body": f,
			"method": "POST",
			"mode": "cors",
			"credentials": "include"
		}).then((a) => a.text()).then((a) => {
			let ids = a.match(/(?<=id=\\"unavailable_)\d+/g),
				crsor = a.match(/(?<=cursor=).*(?=&amp;start)/g);
			inactiveIds = [...inactiveIds, ...ids];
			if (ids.length !== 500) resolve(inactiveIds);
			else {
				console.log("Fetching...");
				getUnavailable(inactiveIds.length, crsor);
			}
		});
	}
	getUnavailable();
}).then((ids) => {
	console.log(`Found ${ids.length} Users.`, ids);
	return ids.reduce((cp, id, index, {length: arr}) => cp.then((a) => new Promise((resolve) => {
		let data = {
			f: new FormData(),
			params: {
				group_id: groupId,
				is_undo: 0,
				member_id: id,
				source: "profile_browser"
			}
		};
		// Turns raw data to FormData
		data.f.append("confirmed", true);
		data.f.append("block_user", false);
		data.f.append("fb_dtsg", require("DTSGInitialData").token || document.querySelector('[name="fb_dtsg"]').value);
		// It's time to kick 'em out.
		fetch(`https://www.facebook.com/ajax/groups/remove_member/?${Object.keys(data.params).map((key) => `${key}=${data.params[key]}`).join("&")}`, {
			method: "POST",
			credentials: "include",
			body: data.f
		}).then((res) => (String(res.status).match(/^[2-3]/g)) ? true : false).then((res) => {
			if (res) {
				console.log(`${index}/${arr} || Kicked: ${id}`);
				resolve();
			}
		});
	})), Promise.resolve())
}).finally(() => console.log("Done."));
