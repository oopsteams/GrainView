<template>
	<div class="container">
		<el-transfer v-model="refs" :data="roles">
			
		</el-transfer>
		<el-button  @click="commitRole">提交角色关系</el-button>
	</div>
	
	<!-- <el-button class="transfer-footer" slot="right-footer" @click="commitRole">提交角色关系</el-button> -->
</template>

<script>
import funs from './refrole.js'
export default {
	data:funs.data,
	methods: funs.methods,
	mounted: funs.mounted
}
</script>

<style>
</style>
