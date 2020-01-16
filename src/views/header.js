const axios = require('axios');
export default {
	data(){
		return{
			headerHeight:'240px',
			fr:8000,
			items:[]
		}
	},
	methods:{
		handleClick(id){
			var self = this;
			console.log('handle item id:', id);
			console.log('self:', self);
		}
	},
	mounted(){
		var self = this;
		var orderHight = document.documentElement.clientHeight;
		var new_hh = Math.round(orderHight/3);
		if(new_hh<240){new_hh=240;}
		this.headerHeight = new_hh+'px';
		var load_datas = ()=>{
			axios.get('/open/loops').then((res)=>{
				if(res.data && res.data.hasOwnProperty('sources')){
					var _fr = res.data.fr;
					if(_fr>0){
						self.fr = _fr * 1000;
					}
					var sources = res.data.sources;
					for(var i=0;i<sources.length;i++){
						var item = sources[i];
						var pos_item = {src: item.srcurl, type:item.type, id:item.id, idx:item.idx}
						self.$set(self.items, i, pos_item);
					}
				}
			},()=>{
				console.log('请求失败!');
			});
		};
		load_datas();
	}
}