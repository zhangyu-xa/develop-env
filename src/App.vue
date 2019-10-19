<template>
    <section class="main-container" :class="{'no-crumb': !isShowCrumnb}">
        <nav-header class="header" />
        <menu-list class="menu" />
        <bread-crumb class="bread-crumb" v-show="isShowCrumnb"></bread-crumb>
        <router-view class="content"></router-view>
    </section>
</template>

<script>

    import menuList from "./modules/base/menu.vue";
    import navHeader from "./modules/base/nav.vue";
    import breadCrumb from "./modules/base/breadcrumb.vue";

	export default {
		name: "MainModule",
        components: {
			navHeader,
            menuList,
	        breadCrumb
        },
		watch: {
			$route(to, from) {
				if (to.name === "summary") {
					this.isShowCrumnb = false;
				} else {
					this.isShowCrumnb = true;
                }
			}
		},
		data() {
			return {
				isShowCrumnb: true
            }
		},
        mounted() {
			if(this.$route.name === "summary") {
				this.isShowCrumnb = false;
			} else {
				this.isShowCrumnb = true;
            }
        }
	}
</script>

<style lang="less" scoped>
    .main-container {
        /*background-color: @primary;*/

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: grid;
        grid-template-rows: 60px 40px 1fr;
        grid-template-columns: 280px 1fr;
        grid-template-areas: "header header"
                             "menu breadcrumb"
                             "menu content";

        &.no-crumb {
            grid-template-rows: 60px 1fr;
            grid-template-columns: 280px 1fr;
            grid-template-areas: "header header"
                                 "menu content";
        }

        .header {
            grid-area: header;
        }
        .menu {
            grid-area: menu;

            padding: 20px;
        }
        .bread-crumb {
            grid-area: breadcrumb;

            padding-left: 6px;
            display: flex;
            align-items: center;
            background-color: white;
        }
        .content {
            grid-area: content;
            background-color: white;

            padding: 0 6px 6px 6px;
        }
    }
</style>