<template>
  <div id="app">
	 <!-- <commonHeader></commonHeader> -->
    <!-- <img src="./assets/logo.png"> -->
    
	<!-- <selfTag></selfTag> -->
	<!-- <items></items> -->
	<container></container>
  </div>
</template>

<script>
	// import commonHeader from '~/views/Header.vue'
	// import selfTag from '~/views/Tag.vue'
	// import items from '~/views/Items.vue'
	import container from '~/views/Container.vue'
	import funs from './app.js'
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
<!-- <style scoped src="./assets/main.css"></style> -->
<style src="./assets/main.css"></style>
