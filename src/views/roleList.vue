<template>
	<div>
	<el-container v-loading.fullscreen.lock="fullscreenLoading">
	  <el-header style="height:4rem; text-align: right; font-size: 24px">
	    <el-dropdown @command="menuclick">
	      <i class="el-icon-setting" style="margin-right: 15px"></i>
	      <el-dropdown-menu slot="dropdown">
	        <el-dropdown-item command="new">新建角色</el-dropdown-item>
	      </el-dropdown-menu>
	    </el-dropdown>
	    <span>Tom</span>
	  </el-header>
	<el-main style="text-align: left;">
				<el-pagination
				  background
				@current-change="handleCurrentChange"
				  layout="prev, next"
							:current-page.sync="currentPage"
							:page-size="pageSize"
				  :total="total">
				</el-pagination>
	    <el-table :data="tableData" :height="maxHeight" stripe>
	      <el-table-column prop="name" label="角色" width="260">
	      </el-table-column>
		  <el-table-column prop="parent_desc" label="继承角色" width="260">
		  </el-table-column>
		<el-table-column prop="base_fun" label="功能点" width="360">
		</el-table-column>
		<el-table-column prop="ext_fun" label="扩展功能点" width="360">
		</el-table-column>
		<el-table-column prop="path" label="路径入口" width="360">
		</el-table-column>
		<el-table-column fixed="right" label="操作" width="120">
			<template slot-scope="scope">
				<el-button @click="handleclick(scope.row)" type="text" size="small">编辑</el-button>
			</template>
			<!-- <template v-if="scope.row.type==-1" slot-scope="scope">
				<el-button @click="patchclick(scope.row)" type="text" size="small">补充</el-button>
			</template> -->
		</el-table-column>
	    </el-table>
			  <el-pagination
			    background
				@current-change="handleCurrentChange"
			    layout="prev, next"
				:current-page.sync="currentPage"
				:page-size="pageSize"
			    :total="total">
			  </el-pagination>
	  </el-main>
	</el-container>
	<el-dialog title="创建新角色" :visible.sync="dialogFormVisible">
	  <el-form :model="form" :rules="form_rules" ref="roleForm">
	    <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
	      <el-input v-model="form.name" auto-complete="off"></el-input>
	    </el-form-item>
		<el-form-item label="默认入口" :label-width="formLabelWidth" prop="default_path">
		  <el-input v-model="form.default_path" auto-complete="off"></el-input>
		</el-form-item>
	    <el-form-item label="父类" :label-width="formLabelWidth">
	      <el-select v-model="form.parent" @change="parent_change" placeholder="请选择父类">
	        <el-option label="无" value="0"></el-option>
			<el-option v-for="r in tableData" :key="r.id" :value="r.id" :label="r.name"></el-option>
	      </el-select>
	    </el-form-item>
		<el-form-item label="功能点" :label-width="formLabelWidth" prop="funsref">
			<el-transfer v-model="form.funsref" :data="funs" :titles="transfer_titles">
			</el-transfer>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">关闭</el-button>
	    <el-button type="primary" @click="new_role('roleForm')">确 定</el-button>
	  </div>
	</el-dialog>
	</div>
</template>

<script>
import funs from './roleList.js'
export default {
	data:funs.data,
	methods: funs.methods,
	mounted: funs.mounted
}
</script>

