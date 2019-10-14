<template>
    <section id="mapContainer"></section>
</template>

<script>
	export default {
		name: "map",
		mounted() {
			window.onMapLoad = () => {
				new AMap.Map("mapContainer");
            };
		}
	}
</script>

<style scoped>

</style>