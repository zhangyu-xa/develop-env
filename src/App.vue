<template>
    <section class="main-container" :class="{'no-crumb': !isShowCrumnb, 'no-menus': !showMenus, 'no-header': !showHeader}">
        <nav-header v-if="showHeader" class="header" :user="user" @alarmList="alarmList" />
        <menu-list v-if="showMenus && showHeader" class="menu" />
        <bread-crumb class="bread-crumb" v-show="isShowCrumnb"></bread-crumb>
        <router-view class="content" @login-success="loginSuccess" :alarmLists="alarmLists"></router-view>
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
				if (to.name !== "login") {
					if(!window.sessionStorage.getItem("user")) {
						window.sessionStorage.clear();
						this.$router.push({name: "login"});
					}
				}
				if (to.name === "summary") {
					this.isShowCrumnb = false;
					this.showHeader = true;
					this.showMenus = true;
				} else if (to.name === "index") {
					this.isShowCrumnb = false;
					this.showMenus = false;
					this.showHeader = true;
				} else if (to.name === "login") {
					this.isShowCrumnb = false;
					this.showMenus = false;
					this.showHeader = false;
				} else {
					this.isShowCrumnb = true;
					this.showHeader = true;
					this.showMenus = true;
				}
			}
		},
		data() {
			return {
				isShowCrumnb: true,
				showMenus: false,
				showHeader: false,
				user: {},
				alarmLists: []
			}
		},
        mounted() {},
        methods: {
	        loginSuccess(user) {
                this.user = user;
	        },
	        alarmList(resArr = []) {
	        	this.alarmLists = resArr;
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

        &.no-menus.no-header {
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: "content";

            .content {
                grid-area: content;
                background-color: #efefef;

                padding: 0;
                margin: 0;

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        &.no-menus {
            grid-template-rows: 60px 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: "header"
                                 "content";

            .content {
                grid-area: content;
                background-color: #efefef;

                padding: 0;
                margin: 0;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
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