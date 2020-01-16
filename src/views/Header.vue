<template>
	<div class="block">
	    <!-- <span class="demonstration">Switch when indicator is hovered (default)</span> -->
	    <el-carousel :height="headerHeight" type="card" :interval="fr">
	      <el-carousel-item v-for="item in items" :key="item.id" @click.native="handleClick" 
		   :style="'background-image: url('+item.src+'); -moz-background-size:100% 100%; background-size:100% 100%;'">
	        <h3 class="medium"></h3>
	      </el-carousel-item>
	    </el-carousel>
	</div>
	<!-- <img src="item.src"/> -->
</template>

<script>
import funs from './header.js'
export default {
	data:funs.data,
	methods: funs.methods,
	mounted: funs.mounted
}
</script>

<style>
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}
.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
</style>
