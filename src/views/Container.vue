<template>
	<el-container id="data_container" style="height: 500px; border: 1px solid #eee">
	  <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
			
	    <el-menu :default-openeds="['1', '3']">
			<el-submenu v-for="m in menu_datas" :key="m.index" :index="m.index">
				<template slot="title"><i :class="m.icon"></i>{{m.title}}</template>
				
					<el-menu-item-group v-if="m.groups" v-for="mg in m.groups" :key="mg.title">
						<template slot="title">{{mg.title}}</template>
						<el-menu-item v-if="mg.items" v-for="item in mg.items" :key="item.id" :index="item.id"><span class="btn_boder">{{item.desc}}</span></el-menu-item>
					</el-menu-item-group>
					
				<el-submenu v-if="m.subs" v-for="sm in m.subs" :key="sm.index" :index="sm.index">
					<template slot="title"><i :class="sm.icon"></i>{{sm.title}}</template>
					<el-menu-item-group v-if="sm.groups" v-for="smg in sm.groups" :key="smg.title">
						<template slot="title">{{smg.title}}</template>
						<el-menu-item v-if="smg.items" v-for="item in smg.items" :key="item.id" :index="item.id">{{item.desc}}</el-menu-item>
						
					</el-menu-item-group>
					
				</el-submenu>
				
			</el-submenu>
	      <!-- <el-submenu index="1">
	        <template slot="title"><i class="el-icon-message"></i>Navigator One</template>
	        <el-menu-item-group>
	          <template slot="title">Group 1</template>
	          <el-menu-item index="1-1">Option 1</el-menu-item>
	          <el-menu-item index="1-2">Option 2</el-menu-item>
	        </el-menu-item-group>
	        <el-menu-item-group title="Group 2">
	          <el-menu-item index="1-3">Option 3</el-menu-item>
	        </el-menu-item-group>
	        <el-submenu index="1-4">
	          <template slot="title">Option4</template>
	          <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
	        </el-submenu>
	      </el-submenu>
	      <el-submenu index="2">
	        <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
	        <el-menu-item-group>
	          <template slot="title">Group 1</template>
	          <el-menu-item index="2-1">Option 1</el-menu-item>
	          <el-menu-item index="2-2">Option 2</el-menu-item>
	        </el-menu-item-group>
	        <el-menu-item-group title="Group 2">
	          <el-menu-item index="2-3">Option 3</el-menu-item>
	        </el-menu-item-group>
	        <el-submenu index="2-4">
	          <template slot="title">Option 4</template>
	          <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
	        </el-submenu>
	      </el-submenu>
	      <el-submenu index="3">
	        <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
	        <el-menu-item-group>
	          <template slot="title">Group 1</template>
	          <el-menu-item index="3-1">Option 1</el-menu-item>
	          <el-menu-item index="3-2">Option 2</el-menu-item>
	        </el-menu-item-group>
	        <el-menu-item-group title="Group 2">
	          <el-menu-item index="3-3">Option 3</el-menu-item>
	        </el-menu-item-group>
	        <el-submenu index="3-4">
	          <template slot="title">Option 4</template>
	          <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
	        </el-submenu>
	      </el-submenu> -->
	    </el-menu>
	  </el-aside>
	  
	  <el-container>
	    <el-header style="text-align: right; font-size: 12px">
			<searchInput></searchInput>
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
	        <el-table-column prop="date" label="Date" width="140">
	        </el-table-column>
	        <el-table-column prop="name" label="Name" width="120">
	        </el-table-column>
	        <el-table-column prop="address" label="Address">
	        </el-table-column>
	      </el-table>
	    </el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import searchInput from './SearchInput.vue'
	import funs from './container.js'
	export default {
		components:{
			searchInput
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
