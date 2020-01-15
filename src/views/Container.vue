<template>
	  <el-container>
		<el-header style="text-align: left; font-size: 12px">
			<selfTag ref="mytags"></selfTag>
		</el-header>
	    <el-header style="text-align: right; font-size: 12px">
			<searchInput ref="searchinput"></searchInput>
	      <el-dropdown>
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item>View</el-dropdown-item>
	          <el-dropdown-item>Add</el-dropdown-item>
	          <el-dropdown-item>Delete</el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>Tom</span>
		  <el-button @click="testMenu">Test</el-button>
	    </el-header>
	    
	    <el-main>
	      <el-table :data="tableData">
	        <el-table-column prop="source" label="Src" width="140">
	        </el-table-column>
	        <el-table-column prop="path" label="Address">
	        </el-table-column>
			<el-table-column prop="name" label="Name" width="240">
			</el-table-column>
	      </el-table>
	    </el-main>
	  </el-container>
	
</template>

<script>
	import searchInput from './SearchInput.vue'
	import funs from './container.js'
	import selfTag from './Tag.vue'
	export default {
		components:{
			searchInput,
			selfTag
		},
		data:funs.data,
		methods: funs.methods,
		mounted: funs.mounted
	}
	
</script>

<style>
	.el-header {
	    background-color: #B3C0D1;
	    color: #333;
	    line-height: 60px;
	  }
	.btn_boder {
		border-bottom:1px solid;
	}
	  .el-aside {
	    color: #333;
	  }
</style>
