<template>
    <el-form :inline="true" :model="options.params" class="demo-form-inline">
        <el-form-item v-for="field in options.fields" label="">
            <component :is="`${field.type}`"
                       v-show="field.isShow"
                       v-model="options.params[field.prop]"
                       :placeholder="field.placeholder"
                       clearable>
                <el-option v-if="field.type === 'el-select'"
                           v-for="opt in field.selOptions"
                           :label="opt.label" :value="opt.val"></el-option>
            </component>
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