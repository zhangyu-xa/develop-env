<template>
    <section class="main-container">
        <nav-header class="header" />
        <menu-list class="menu" />
        <!--<article class="content">
            <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </article>-->
        <router-view></router-view>
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
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
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