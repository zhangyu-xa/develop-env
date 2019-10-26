<template>
    <comps-filter :options="filterOptions" class="filter" @trigger="filterChange"></comps-filter>
</template>

<script>
    export default {
	    name: "conditions",
	    data() {
		    return {
			    filterOptions: {
				    params: {
					    timeRange: [
						    $tools.getCurDate().startTime,
						    $tools.getCurDate().endTime
					    ]
				    },
				    fields: [{
					    prop: 'timeRange',
					    type: 'el-date-picker',
					    placeholder: ''
				    }]
			    }
		    };
	    },
	    mounted() {
		    this.$emit("input", [
			    $tools.getCurDate().startTime,
			    $tools.getCurDate().endTime
		    ]);
	    },
	    methods: {
		    filterChange(timer) {
			    console.log("timeRange:", timer.timeRange);
			    this.$emit("input", timer.timeRange !== "" ? [].concat(timer.timeRange) : "");
		    }
	    }
    }
</script>

<style lang="less">

</style>