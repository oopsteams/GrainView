<template>
  <div id="user">
	 <commonHeader></commonHeader>
    <!-- <img src="./assets/logo.png"> -->
    
	<!-- <selfTag></selfTag> -->
	<!-- <items></items> -->
	
	
	<container></container>
  </div>
</template>

<script>
	import container from '~/views/userList.vue'
	import funs from './user.app.js'
	export default {
		components:{
			// commonHeader,
			// selfTag,
			// items,
			container
		},
		data:funs.data,
		methods: funs.methods,
		mounted: funs.mounted
	}
</script>
<style src="./assets/main.css"></style>
