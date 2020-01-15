<template>
	<div class="block">
		<el-tag
		  v-for="tag in tags"
		  :key="tag.id"
		  :data-id="tag.id"
		  :data-idx="tag.idx"
		  @click="tagclick"
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
	mounted: funs.mounted
}
</script>

<style>
	 .el-tag + .el-tag {
		  margin-left: 10px;
		}
</style>
