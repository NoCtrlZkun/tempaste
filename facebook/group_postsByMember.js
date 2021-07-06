((uid, groupid, cursor) => {
	let vari = {
		UFI2CommentsProvider_commentsKey: null,
		displayCommentsContextEnableComment: null,
		displayCommentsContextIsAdPreview: null,
		displayCommentsContextIsAggregatedShare: null,
		displayCommentsContextIsStorySet: null,
		displayCommentsFeedbackContext: null,
		feedLocation: "GROUP_MEMBER_BIO_FEED",
		feedbackSource: null,
		...(cursor) ? ({feedCursor: cursor}) : "",
		focusCommentID: null,
		memberID: uid,
		postsToLoad: 100,
		privacySelectorRenderLocation: "COMET_STREAM",
		renderLocation: "group_bio",
		scale: 1,
		useDefaultActor: true,
		id: groupid,
	}, dtsg = require("DTSGInitialData").token || document.querySelector('[name="fb_dtsg"]').value;
	fetch("https://www.facebook.com/api/graphql/", {
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body: `fb_dtsg=${dtsg}&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=ProfileCometContextualProfileGroupPostsFeedPaginationQuery&variables=${encodeURIComponent(JSON.stringify(vari))}&server_timestamps=true&doc_id=4326775947440153`,
		method: "POST",
		credentials: "include",
	})
		.then((a) => a.text())
		.then((a) => JSON.parse(a.split("\n")[0]).data.node.group_member_feed)
		.then((a) => ({
			...a.page_info,
			edges: a.edges.reduce((ar, item) => ((item.node.comet_sections) ? ar.push({
				cursor: item.cursor,
				postid: item.node.comet_sections.feedback.story.feedback_context.feedback_target_with_context.subscription_target_id,
				creation_time: (new Date(+JSON.stringify(item.node).match(/(?<=creation_time":\s?)\d+/g)[0] * 1000))
			}) : "", ar), [])
		}))
		.then(console.log)
})(100001401270561, 319914295441959);