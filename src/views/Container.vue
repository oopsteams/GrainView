<template>
	  <el-container v-loading.fullscreen.lock="fullscreenLoading">
		<!-- <el-header class="el-special-header" style="height:auto;min-height:4rem;text-align: left; font-size: 24px">
			<selfTag ref="mytags"></selfTag>
		</el-header> -->
		<el-header class="el-special-header" style="height:auto;min-height:2px;text-align: left; font-size: 24px">
			<selfTag ref="mytags"></selfTag>
		</el-header>
	    <el-header style="height:auto;min-height:4rem; text-align: right; font-size: 24px">
			<searchInput ref="searchinput"></searchInput>
	      <!-- <el-dropdown>
	        <i class="el-icon-setting" style="margin-right: 15px"></i>
	        <el-dropdown-menu slot="dropdown">
	          <el-dropdown-item>View</el-dropdown-item>
	          <el-dropdown-item>Add</el-dropdown-item>
	          <el-dropdown-item>Delete</el-dropdown-item>
	        </el-dropdown-menu>
	      </el-dropdown>
	      <span>Tom</span> -->
		  <!-- <el-tag v-if="sub_dir.length>0" @close="clear_sub_dir" closable type="success">{{sub_dir}}</el-tag> -->
		  
	    </el-header>
	    
	    <el-main style="text-align: left;">
			<div style="clear: both;">
						  <el-breadcrumb separator=">">
						    <el-breadcrumb-item v-for="(item, index) in parent_stack" :key="fs_id">
						  	  <span style="border-bottom:1px solid #1aad19;cursor: pointer;font-size: 2rem;" v-if="index < parent_stack.length-1" @click="navparent(item, index)" :title="item.name" type="success">
								{{item.name}}
							  </span>
						  	  <label v-else>{{item.name}}</label>
						    </el-breadcrumb-item>
						  </el-breadcrumb>
			</div>
			<el-pagination style="clear: both;" 
			  background
						@current-change="handleCurrentChange"
			  layout="prev, pager, next"
						:current-page.sync="currentPage"
						:page-size="pageSize"
			  :total="total">
			</el-pagination>
	      <el-table :data="tableData" stripe >
	        <!-- <el-table-column prop="source" label="来源" width="110">
	        </el-table-column> -->
	        <!-- <el-table-column prop="path" label="位置">
	        </el-table-column> -->
			<!-- <el-table-column label="位置">
				<template slot-scope="scope">
					<el-breadcrumb separator="">
					  <el-breadcrumb-item v-for="tag in scope.row.tags" :key="tag">
						  <el-tag v-if="tag.length > 0" @click.native="click_sub_dir(tag, row)" :title="scope.row.path" type="success">{{tag}}</el-tag>
					  </el-breadcrumb-item>
					</el-breadcrumb>
				</template>
			</el-table-column> -->
			<el-table-column prop="name" label="描述" width="380">
				<template slot-scope="scope">
					<label v-if="scope.row.pin==1" >{{scope.row.name}}</label>
					<el-tag v-else @click.native="click_parent(scope.row)" :title="scope.row.name" type="success">{{scope.row.name}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140">
				<template slot-scope="scope">
					<el-button v-if="scope.row.pin==1 && scope.row.source=='local'" @click="handleclick(scope.row)" type="text" size="small">获取</el-button>
					<el-button v-else @click="showcontact(scope.row)" type="text" size="small">获取方式</el-button>
				</template>
			</el-table-column>
	      </el-table>
		  <el-pagination style="clear: both;" 
		    background
			@current-change="handleCurrentChange"
		    layout="prev, pager, next"
			:current-page.sync="currentPage"
			:page-size="pageSize"
		    :total="total">
		  </el-pagination>
		  <div style="clear: both;">
		  			  <el-breadcrumb separator=">">
		  			    <el-breadcrumb-item v-for="(item, index) in parent_stack" :key="fs_id">
		  			  	  <span style="border-bottom:1px solid #1aad19;cursor: pointer;font-size: 2rem;" v-if="index < parent_stack.length-1" @click="navparent(item, index)" :title="item.name" type="success">
		  					{{item.name}}
		  				  </span>
		  			  	  <label v-else>{{item.name}}</label>
		  			    </el-breadcrumb-item>
		  			  </el-breadcrumb>
		  </div>
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
.el-header .el-tag__close, .el-header .el-icon-close{
	font-size: 1.6rem;
	width: 2.25rem;
	height: 2.25rem;
	line-height: 2.25rem;
}
.el-header .el-input__clear {
	font-size: 1.6rem;
	width: 2.25rem;
	height: 2.25rem;
}
</style>