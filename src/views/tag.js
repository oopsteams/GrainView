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
		tosearch(cb){
			var self = this;
			var tag = null;
			for(var i=0;i<self.tags.length;i++){
				if(self.tags[i].type == 'success'){
					tag = self.tags[i];
					break;
				}
			}
			var tagname  = '';
			if(tag){
				tagname  = tag.r;
			}
			// var keyword = self.external().$refs.searchinput.$refs.sinput.$refs.input.value;
			var keyword = self.external().$refs.searchinput.input;
			// console.log('container:', self.external());
			var source_val = self.external().$refs.searchinput.$refs.soptions.value
			var pg = self.external().currentPage - 1;
			var sub_dir = self.external().sub_dir;
			var pid = null;
			if(self.external().pid && self.external().pid.length>0){
				if(self.external().pid.length>0){
					pid = self.external().pid;
				}
			}
			var patch_item = null;
			if(!pid && self.external().top_fix_item){
				patch_item = self.external().top_fix_item;
			}
			if(pg<0)pg=0;
			var params={kw:keyword, tag:tagname, source:source_val, page:pg, path_tag:sub_dir, pid:pid}
			var load_items = ()=>{
				axios.get('/open/se',{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						// console.log('data:',res.data);
						var pos = 0
						self.external().tableData = [];
						// console.log('patch_item:', patch_item);
						// if(patch_item){
						// 	self.external().tableData.push(patch_item);
						// 	pos + 1;
						// }
						res.data.data.forEach((d, idx)=>{
							var _name = d.filename;
							if(!pid){
								var prefix = d.path;
								if(d.path.indexOf('02.会员库')>=0){
									prefix = '[已完结]';
								}else if(d.path.indexOf('01.文件库')>=0){
									prefix = '[在更]';
								}
								_name = prefix + _name;
							}
							var item = {
								name: _name,
								path: d.path,
								tags: d.path.split('/'),
								source:d.source?d.source:'local',
								dir:d.isdir,
								fs_id:d.fs_id,
								app_name:d.app_name,
								pin:d.pin
							  }
							 // console.log('item:', item);
							self.external().$set(self.external().tableData,pos + idx,item);
						});
						self.external().total = res.data.total;
						self.external().pageSize = res.data.pagesize;
					}
					if(cb){cb(0);}
				},()=>{
					console.log('请求失败!');
					if(cb){cb(1);}
				});
			};
			load_items();
		},
		tagclick(e){
			var self = this;
			console.log("tag click:",e);
			var idx = e.target.dataset.idx;
			if(self.tags[idx].type != 'success'){
				self.tags.forEach((t, _idx)=>{if(t.type!=''){t.type = '';self.$set(self.tags,_idx,t);}})
				self.tags[idx].type = 'success';
				self.$set(self.tags,idx,self.tags[idx]);
				self.external().reset_base_vars();
				self.tosearch();
			} else {
				self.tags.forEach((t, _idx)=>{if(t.type!=''){t.type = '';self.$set(self.tags,_idx,t);}})
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
						self.external().qr = res.data.contact;
						let data_list = res.data.data;
						// for(var i=0;i<data_list.length;i++){
						// 	var tag_obj = data_list[i];
						// 	var r = tag_obj.tag.name;
						// 	if(tag_obj.tag.rule.length>0){
						// 		r = tag_obj.tag.rule;
						// 	}
						// 	var tag = {name: tag_obj.tag.name, r: r, type:'', id:tag_obj.tag_id, idx:i}
						// 	if(i==0){
						// 		//tag.type = 'success';
						// 	}
						// 	self.$set(self.tags, i, tag);
						// }
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