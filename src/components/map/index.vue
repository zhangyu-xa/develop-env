<template>
    <section :id="`${container}-map`"></section>
</template>

<script>
	export default {
		name: "map",
        props: ['container'],
		mounted() {
			new AMap.Map(`${this.container}-map`);
		}
	}
</script>

<style scoped>

</style>