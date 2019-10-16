export default {
	state: {
		breadCrumb: []
	},
	getters: {
		getBreadCrumb(state) {
			return state.breadCrumb;
		}
	},
	mutations: {
		pushCrumb(state, crumb) {
			const pos = state.breadCrumb.indexOf(crumb);
			if (pos >= 0) {
				state.breadCrumb = state.breadCrumb.slice(0, pos);
				console.log("state.breadCrumb:", state.breadCrumb);
				return;
			}
			state.breadCrumb.push(crumb);
			console.log("state.breadCrumb:", state.breadCrumb);
		},
		removeCrumbs(state, crumb) {
			console.log("crumb:", crumb);
		}
	},
	actions: {
		addCrumb(context, crumb) {
			context.commit("pushCrumb", crumb)
		},
		removeCrumbs(context, crumb) {
			context.commit("removeCrumbs", crumb)
		}
	}
}