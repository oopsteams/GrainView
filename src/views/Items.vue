<template>
	<el-table
	    v-loading="loading"
	    :data="tableData"
	    style="width: 100%">
	    <el-table-column
	      prop="date"
	      label="Date"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="Name"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="Address">
	    </el-table-column>
	  </el-table>
</template>

<script>
import funs from './items.js'
export default {
	data:funs.data,
	methods: funs.methods,
}
</script>

<style>
</style>
