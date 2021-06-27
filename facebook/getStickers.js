class fbSticker {
	#getData(body) {
		return fetch("https://www.facebook.com/api/graphql/", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `fb_dtsg=${(require("DTSGInitialData").token || document.querySelector('[name="fb_dtsg"]').value)}&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=${body}`
		}).then((res) => res.json());
	}

	getAllPacks() {
		return this.#getData(`StickersStoreDialogStoreQuery&variables={"count":500,"size":40}&server_timestamps=true&doc_id=2424375857610449`).then((result) => result.data.viewer.sticker_store.available_packs);
	}

	getPackInfo(packId) {
		return this.#getData(`StickersStoreDialogPackDetailQuery&variables={"packID":"${packId}","profileSize":88,"previewWidth":608}&server_timestamps=true&doc_id=2696647197015163`);
	}

	getStickers(packId) {
		return this.#getData(`StickersFlyoutPackQuery&variables={"stickerWidth":512,"stickerHeight":512,"packID":"${packId}","feedbackID":"","hasNoFeedbackID":true,"numMRUStickers":40}&server_timestamps=true&doc_id=3829078343831521`);
	}
}
// (new fbSticker()).getAllPacks();
// (new fbSticker()).getPackInfo("2353401344912532");
(new fbSticker()).getStickers("2353401344912532").then(console.log);