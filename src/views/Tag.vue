<template>
	<div class="block">
		<el-tag
		  v-for="tag in tags"
		  :key="tag.name"
		  @click="tagSearch"
		  :type="tag.type">
		  {{tag.name}}
		</el-tag>
	</div>
</template>

<script>
import funs from './tag.js'
export default {
	data:funs.data,
	methods: funs.methods,
}
</script>

<style>
	 .el-tag + .el-tag {
		  margin-left: 10px;
		}
</style>
