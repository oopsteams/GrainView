<template>
	<el-form ref="form" :model="userData" label-width="120px">
	  <el-form-item label="登录用户名">
	    <span v-if="userData.acc">{{userData.acc.name}}</span>
	  </el-form-item>
	  <el-form-item label="昵称">
	    <el-input v-if="userData.acc" v-model="userData.acc.nickname"></el-input>
	  </el-form-item>
	  <el-form-item label="手机号码">
	    <el-input v-if="userData.acc" v-model="userData.acc.mobile_no"></el-input>
	  </el-form-item>
	  <el-form-item v-if="userData.acc" label="上次登录">
	    {{userData.acc.last_login_at}}
	  </el-form-item>
	  <fieldset>
		  <legend>所属</legend>
		  <el-button icon="el-icon-gear" @click="editOrg">编辑组织关系</el-button>
		  <el-form-item v-if="userData.org" label="组织名称">
		    {{userData.org.base.name}}
		  </el-form-item>
		  <el-form-item v-if="userData.org" label="上级组织名称">
		    {{userData.org.parent.name}}
		  </el-form-item>
	  </fieldset>
	  <fieldset>
		  <legend>角色</legend>
		  <el-button icon="el-icon-gear" @click="editRole">编辑角色关系</el-button>
		  <el-form-item v-if="userData.role" label="名称">
			{{userData.role.base.roles[0].desc}}
		  </el-form-item>
		  <fieldset v-if="userData.role && userData.role.base.fun">
			  <legend>基本功能点</legend>
			  <el-form-item v-if="userData.role.base.fun.base" label="名称">
				  <span v-for="bf in userData.role.base.fun.base" :key="bf.id">
					  {{bf.desc}}
				  </span>
			  </el-form-item>
		  </fieldset>
		  <fieldset v-if="userData.role && userData.role.base.fun && userData.role.base.fun.ext && userData.role.base.fun.ext.length>0">
			  <legend>扩展功能点</legend>
			  <el-form-item v-if="userData.role.base.fun.ext" label="名称">
				  <span v-for="bf in userData.role.base.fun.ext" :key="bf.id">
					  {{bf.desc}}
				  </span>
			  </el-form-item>
		  </fieldset>
	  </fieldset>
	  <!-- <el-form-item label="活动区域">
	    <el-select v-model="form.region" placeholder="请选择活动区域">
	      <el-option label="区域一" value="shanghai"></el-option>
	      <el-option label="区域二" value="beijing"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="活动时间">
	    <el-col :span="11">
	      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
	    </el-col>
	    <el-col class="line" :span="2">-</el-col>
	    <el-col :span="11">
	      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
	    </el-col>
	  </el-form-item>
	  <el-form-item label="即时配送">
	    <el-switch v-model="form.delivery"></el-switch>
	  </el-form-item>
	  <el-form-item label="活动性质">
	    <el-checkbox-group v-model="form.type">
	      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
	      <el-checkbox label="地推活动" name="type"></el-checkbox>
	      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
	      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="特殊资源">
	    <el-radio-group v-model="form.resource">
	      <el-radio label="线上品牌商赞助"></el-radio>
	      <el-radio label="线下场地免费"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="活动形式">
	    <el-input type="textarea" v-model="form.desc"></el-input>
	  </el-form-item> -->
	  <el-form-item>
	    <el-button type="primary" @click="onSubmit">立即创建</el-button>
	    <el-button>取消</el-button>
	  </el-form-item>
	</el-form>
</template>

<script>
	import funs from './userdetail.js'
	export default {
		components:{
		},
		data:funs.data,
		methods: funs.methods,
		mounted: funs.mounted
	}
</script>

<style>
</style>
