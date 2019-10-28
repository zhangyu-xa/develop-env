let PlaceSearch = null;
AMap.plugin('AMap.PlaceSearch', () => {
	PlaceSearch = new AMap.PlaceSearch({
		city: '全国'
	});
});

export default {
	getSearchHandler() {
		return PlaceSearch;
	}
}