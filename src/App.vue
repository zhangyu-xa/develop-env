<template>
    <section class="main-container">
        <nav-header class="header" />
        <menu-list class="menu" />
        <router-view class="content"></router-view>
    </section>
</template>

<script>

    import menuList from "./modules/base/menu.vue";
    import navHeader from "./modules/base/nav.vue";

	export default {
		name: "MainModule",
        components: {
			navHeader,
            menuList
        },
		data() {
			return {}
		}
	}
</script>

<style lang="less" scoped>
    .main-container {
        background-color: @primary;

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 280px 1fr;
        grid-template-areas: "header header"
                             "menu content";

        .header {
            grid-area: header;
        }
        .menu {
            grid-area: menu;

            padding: 20px;
        }
        .content {
            grid-area: content;
            background-color: white;

            padding: 6px;
        }
    }
</style>