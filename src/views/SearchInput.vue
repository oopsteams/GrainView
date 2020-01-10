<template>
	<span>
	<el-autocomplete
			  popper-class="my-autocomplete"
			  v-model="state"
			  :fetch-suggestions="querySearch"
			  placeholder="Please input"
			  @select="handleSelect">
			  <i
			    class="el-icon-edit el-input__icon"
			    slot="suffix"
			    @click="handleIconClick">
			  </i>
			  <template slot-scope="{ item }">
			    <div class="value">{{ item.value }}</div>
			    <span class="link">{{ item.link }}</span>
			  </template>
			  
	</el-autocomplete>
	<el-button @click="startHacking" style="margin-right:40px;">Search</el-button>
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
