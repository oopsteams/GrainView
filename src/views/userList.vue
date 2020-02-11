<template>
	<div>
	<el-container v-loading.fullscreen.lock="fullscreenLoading">
	  <el-header style="height:4rem; text-align: right; font-size: 24px">
	    <el-dropdown @command="menuclick">
	      <i class="el-icon-setting" style="margin-right: 15px"></i>
	      <el-dropdown-menu slot="dropdown">
	        <el-dropdown-item command="new">新建用户</el-dropdown-item>
			<el-dropdown-item command="role">角色管理</el-dropdown-item>
			<el-dropdown-item command="org">组织管理</el-dropdown-item>
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
	      <el-table-column prop="name" label="用户名" :width="formLabel200Width">
	      </el-table-column>
	      <el-table-column prop="nickname" show-overflow-tooltip label="昵称" :width="formLabel200Width">
	      </el-table-column>
		<el-table-column prop="mobile_no" label="手机号" :width="formLabel200Width">
		</el-table-column>
		<el-table-column prop="fuzzy_id" label="fuzzy_id" :width="formLabel200Width">
		</el-table-column>
		<el-table-column prop="login_token" show-overflow-tooltip label="token" :width="formLabel360Width">
		</el-table-column>
		<el-table-column prop="login_updated_at" label="login_at" :width="formLabel260Width">
		</el-table-column>
		<el-table-column prop="type_desc" label="数据视角" :width="formLabel200Width">
		</el-table-column>
		<el-table-column prop="role_desc" label="角色" :width="formLabel200Width">
		</el-table-column>
		<el-table-column prop="org_desc" label="组织" :width="formLabel200Width">
		</el-table-column>
		<el-table-column fixed="right" label="操作" :width="formLabel100Width">
			<template slot-scope="scope">
				<!-- <el-button v-if="scope.row.type==-1" @click="patchclick(scope.row)" type="text" size="small">补充</el-button> -->
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
	<el-dialog title="创建新用户" :visible.sync="dialogFormVisible" @close="dialog_close">
	  <el-form :model="form" :rules="form_rules" ref="userForm">
	    <el-form-item label="登录名称" :label-width="formLabelWidth" prop="name">
	      <el-input v-model="form.name" auto-complete="off"></el-input>
	    </el-form-item>
		<el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile_no">
		  <el-input v-model="form.mobile_no" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
		  <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkpass">
		  <el-input type="password" v-model="form.checkpass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
		  <el-input v-model="form.nickname" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="权限类型" :label-width="formLabelWidth" prop="type">
		  <el-select v-model="form.type" @change="type_change" placeholder="请选择组织">
			<el-option v-for="r in type_list" :key="r.id" :value="r.id" :label="r.name"></el-option>
		  </el-select>
		</el-form-item>
	    <el-form-item label="所属组织" :label-width="formLabelWidth" prop="org">
	      <el-select v-model="form.org" @change="org_change" placeholder="请选择组织">
			<el-option v-for="r in org_list" :key="r.id" :value="r.id" :label="r.name"></el-option>
	      </el-select>
	    </el-form-item>
		<el-form-item label="所属角色" :label-width="formLabelWidth" prop="role">
		  <el-select v-model="form.role" @change="role_change" placeholder="请选择角色">
			<el-option v-for="r in role_list" :key="r.id" :value="r.id" :label="r.desc"></el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="外挂组织" :label-width="formLabelWidth">
			<el-transfer v-model="form.extorgs" :data="ext_org_list" :titles="org_transfer_titles">
			</el-transfer>
		</el-form-item>
		<el-form-item label="外挂角色" :label-width="formLabelWidth">
			<el-transfer v-model="form.extroles" :data="ext_role_list" :titles="role_transfer_titles">
			</el-transfer>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">关闭</el-button>
	    <el-button type="primary" @click="new_user('userForm')">确 定</el-button>
	  </div>
	</el-dialog>
	</div>
</template>

<script>
	import funs from './userList.js'
	import selfTag from './Tag.vue'
	export default {
		components:{

		},
		data:funs.data,
		methods: funs.methods,
		mounted: funs.mounted
	}
	
</script>
