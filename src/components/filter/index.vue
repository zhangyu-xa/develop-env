<template>
    <el-form :inline="true" :model="options.params" class="demo-form-inline">
        <el-form-item v-for="(field, index) in options.fields" :key="index" label="">
            <component v-if="field.type !=='el-date-picker'" :is="`${field.type}`"
                       v-show="field.isShow || field.isShow===undefined"
                       v-model="options.params[field.prop]"
                       :placeholder="field.placeholder"
                       clearable>
                <el-option v-if="field.type === 'el-select'"
                           v-for="(opt, index) in field.selOptions" :key="index"
                           :label="opt.label" :value="opt.val"></el-option>
            </component>
            <el-date-picker
                    v-if="field.type ==='el-date-picker'"
                    v-model="options.params[field.prop]"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
	export default {
		name: "filter",
        props: ['options'],
		data() {
			return {};
		},
		methods: {
			onSubmit() {
				this.$emit("trigger", this.options.params);
			}
		}
	}
</script>

<style scoped>

</style>