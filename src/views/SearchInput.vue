<template>
	<span style="">
	<el-input ref="sinput" placeholder="请输入关键词" @keyup.enter.native="startHacking" v-model="input" clearable class="common-input" style="width: 160px;">
		<!-- <el-select ref="soptions" @change="handleSelect" v-model="select" slot="prepend" placeholder="海量资源" style="width: 180px;"> -->
			  <!-- <el-option label="资源1" value="local"></el-option> -->
			  <!-- <el-option label="目录内搜索" value="dir"></el-option>
			  <el-option label="全站搜索" value="all"></el-option>
		</el-select> -->
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
	.el-input__inner{
		line-height:1.75rem;
	}
</style>
