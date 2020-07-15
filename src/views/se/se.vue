<template>
	  <el-container v-loading.fullscreen.lock="fullscreenLoading">
		<!-- <el-header class="el-special-header" style="height:auto;min-height:4rem;text-align: left; font-size: 24px">
			<selfTag ref="mytags"></selfTag>
		</el-header> -->
		<el-header class="el-special-header" style="height:auto;min-height:2px;text-align: left; font-size: 24px">
			<selfTag ref="mytags"></selfTag>
		</el-header>
	    <el-header style="height:auto;text-align: left;">
			<el-button @click="go_back" style="margin: 0.25rem 0.3125rem;" icon="el-icon-back">返回</el-button>
			<searchInput ref="searchinput"></searchInput>
			
	    </el-header>
	    
	    <el-main style="text-align: left;overflow: hidden;">
			<el-pagination style="clear: both;" 
			  background
						@current-change="handleCurrentChange"
			  layout="prev, pager, next"
						:current-page.sync="currentPage"
						:page-size="pageSize"
			  :total="total" :pager-count="pagerCount">
			</el-pagination>
	      <el-table :data="tableData" stripe ref="table" v-loading="table_loading">
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
			<el-table-column prop="name" label="描述" min-width="35%" class-name="desc">
				<template slot-scope="scope">
					<span v-if="scope.row.pin==1" v-html="showHighlight(scope.row.name)"><!-- {{scope.row.name}} --></span>
					
					<el-tag v-else @click.native="click_parent(scope.row)" :title="scope.row.name" type="success" v-html="showHighlight(scope.row.name)"><!-- {{scope.row.name}} --></el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="path" label="位置" min-width="35%" class-name="path">
			</el-table-column>
			<el-table-column fixed="right" label="操作" min-width="30%" >
				<template slot-scope="scope">
					<el-button v-if="scope.row.pin==1 && scope.row.source=='local'" @click="handleclick(scope.row)" type="text" size="small">获取</el-button>
					<el-button v-else @click="showcontact(scope.row)" type="text" size="small">获取</el-button>
				</template>
			</el-table-column>
	      </el-table>
		  <el-pagination style="clear: both;" 
		    background
			@current-change="handleCurrentChange"
		    layout="prev, pager, next"
			:current-page.sync="currentPage"
			:page-size="pageSize"
		    :total="total" :pager-count="pagerCount">
		  </el-pagination>
	    </el-main>
	  </el-container>
	
</template>

<script>
	import searchInput from '../SearchInput.vue'
	import funs from './se.js'
	import selfTag from '../Tag.vue'
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
/* .el-header .el-tag__close, .el-header .el-icon-close{
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
.path{
	font-size: 0.75rem;
}
.desc{
	font-size: 1rem;
}
.el-tag{
	font-size: 1rem;
	height: 1.6rem;
	line-height: 1.4rem;
	cursor: pointer;
	word-wrap: break-word;
	display: inline;
} */
.el-message-box{
	width: 17.5rem;
}
.el-tag{
	display: inline;
	line-height: 1.25rem;
	white-space:normal;
	cursor: pointer;
}

</style>