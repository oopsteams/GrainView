const axios = require('axios');
export default {
	data(){
		return {
			tags: [
			]
		}
	},
	methods:{
		external(){
			return this.$parent.$parent.$parent
			},
		tosearch(){
			var self = this;
			var tag = null;
			for(var i=0;i<self.tags.length;i++){
				if(self.tags[i].type == 'success'){
					tag = self.tags[i];
					break;
				}
			}
			var tagname  = tag.name;
			var keyword = self.external().$refs.searchinput.$refs.sinput.$refs.input.value;
			console.log('container:', self.external());
			var source_val = self.external().$refs.searchinput.$refs.soptions.value
			var pg = self.external().currentPage - 1;
			var sub_dir = self.external().sub_dir;
			if(pg<0)pg=0;
			var params={kw:keyword, tag:tagname, source:source_val, page:pg, path_tag:sub_dir}
			var load_items = ()=>{
				axios.get('/open/se',{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						
						self.external().tableData = [];
						res.data.data.forEach((d, idx)=>{
							var item = {
								name: d.filename,
								path: d.path,
								tags: d.path.split('/'),
								source:d.source?d.source:'local',
								dir:d.isdir,
								fs_id:d.fs_id
							  }
							 // console.log('item:', item);
							self.external().$set(self.external().tableData,idx,item);
						});
						self.external().total = res.data.total;
						self.external().pageSize = res.data.pagesize;
					}
				},()=>{
					console.log('请求失败!');
				});
			};
			load_items();
		},
		tagclick(e){
			var self = this;
			console.log(e);
			console.log('self:',self);
			console.log('this:',self.$parent);
			var idx = e.target.dataset.idx;
			if(self.tags[idx].type != 'success'){
				self.tags.forEach((t, _idx)=>{if(t.type!=''){t.type = '';self.$set(self.tags,_idx,t);}})
				self.tags[idx].type = 'success';
				self.$set(self.tags,idx,self.tags[idx]);
				self.external().reset_base_vars();
				self.tosearch();
			}
		}
	},
	mounted(){
		var self = this;
		this.$nextTick(function () {
			const point = '';
			console.log('tagSearch:', self.tagSearch);
			var load_datas = ()=>{
				axios.get(point+'/open/init').then((res)=>{
					console.log('res:', res);
					if(res.data){
						for(var i=0;i<res.data.length;i++){
							var tag_obj = res.data[i];
							var tag = {name: tag_obj.tag.name, type:'', id:tag_obj.tag_id, idx:i}
							if(i==0){
								tag.type = 'success';
							}
							self.$set(self.tags, i, tag);
						}
						self.tosearch();
					}
				},()=>{
					console.log('请求失败!');
				});
			};
			load_datas();
		});
		
	}
}