<template>
	  <el-container v-loading.fullscreen.lock="fullscreenLoading">
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
	    </el-header>
	    
	    <el-main style="text-align: left;">
			<el-pagination
			  background
						@current-change="handleCurrentChange"
			  layout="prev, pager, next"
						:current-page.sync="currentPage"
						:page-size="pageSize"
			  :total="total">
			</el-pagination>
	      <el-table :data="tableData" stripe>
	        <el-table-column prop="source" label="来源" width="80">
	        </el-table-column>
	        <el-table-column prop="path" label="位置">
	        </el-table-column>
			<el-table-column prop="name" label="描述" width="240">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template v-if="scope.row.dir==0" slot-scope="scope">
					<el-button @click="handleclick(scope.row)" type="text" size="small">获取</el-button>
				</template>
			</el-table-column>
	      </el-table>
		  <el-pagination
		    background
			@current-change="handleCurrentChange"
		    layout="prev, pager, next"
			:current-page.sync="currentPage"
			:page-size="pageSize"
		    :total="total">
		  </el-pagination>
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
