<template>
	<span style="float: left;">
	<el-input ref="sinput" placeholder="请输入关键词" v-model="input" clearable class="common-input" style="width: 540px;">
	    <el-button slot="append" icon="el-icon-search" @click="startHacking"></el-button>
	</el-input>
	</span>
	
</template>

<script>
	import funs from './searchInput.js'
	export default {
		data:funs.data,
		methods: funs.methods,
		mounted: funs.mounted
	}
</script>

<style>
</style>
