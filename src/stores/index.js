export default {
	state: {
		detailData: {}
	},
	getters: {
		getBreadCrumb(state) {
			return state.detailData;
		}
	},
	mutations: {
		changeDetailData(state, data) {
			state.detailData = data;
			console.log("state.breadCrumb:", state.detailData);
		}
	},
	actions: {
		updateDetailData(context, data) {
			context.commit("changeDetailData", data)
		}
	}
}