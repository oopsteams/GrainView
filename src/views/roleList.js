const axios = require('axios');
export default {
	data(){
		return {
			currentPage:1,
			pageSize:1,
			total:1,
			fullscreenLoading: false,
			tableData: [],
			has_next:false,
			has_prev:false,
			maxHeight:600,
			dialogFormVisible:false,
			formLabelWidth:'120px',
			fun_list:[],
			funs:[],
			funsref:[],
			form:{
				id:0,
				name:'',
				parent:'无',
				default_path:'/index.html',
				funsref:[]
			},
			form_rules:{
				name:[{required: true, message: '请输入名称', trigger: 'blur'}],
				funsref:[{required: true, message: '请选择', trigger: 'change'}],
				default_path:[{required: true, message: '请输入默认地址', trigger: 'blur'}],
			},
			transfer_titles: ['所有功能点','已选择']
		}
	},
	methods:{
		parent_change(val){
			var disable_funs=(_ids)=>{
				_ids.forEach((_id, idx)=>{
					if(self.form.funsref.indexOf(_id)>=0){
						self.form.funsref.pop(_id);
					}
				});
				self.funs.forEach((f, idx)=>{
					if(_ids.indexOf(f.key)>=0){
						f.disabled = true;
					} else {
						f.disabled = false;
					}
					
				});
			};
			var self = this;
			console.log('parent_change role:', val);
			var _ids = [];
			for(var i=0;i<self.tableData.length;i++){
				var td = self.tableData[i];
				if(td.id == val){
					console.log('find role:',td);
					if(td.ext_fun_list){
						td.ext_fun_list.forEach((ef,idx)=>{_ids.push(ef.id)});
					}
					if(td.base_fun_list){
						td.base_fun_list.forEach((ef,idx)=>{_ids.push(ef.id)});
					}
					if(td.parent_fun_list){
						td.parent_fun_list.forEach((ef,idx)=>{_ids.push(ef.id)});
					}
					break;
				}
			}
			disable_funs(_ids);
		},
		handleclick(item){
			var self = this;
			console.log("item:", item);
			var params = {fuzzy_id:item.fuzzy_id}
			// self.$router.push({'path': '/detail/'+item.fuzzy_id});
		},
		show_alert(msg){
			var self = this;
			const h = self.$createElement;
			self.$notify({
				title:'提醒',
				message:h('i', {style: 'color:teal'}, msg)
			});
		},
		new_role(ref_name){
			var self = this;
			var save_item = (params)=>{
				axios.post(
				'/user/new_role',
				params,
				{headers:{'Content-Type':'application/json'}},
				).then((res)=>{
					console.log('new_role res:',res);
					self.reload_items(0);
				});
			};
			self.$refs[ref_name].validate((valide)=>{
				if(valide){
					console.log("new_role:",self.tableData);
					console.log("funsref:",self.funsref);
					console.log("form:",self.form);
					self.dialogFormVisible = false;
					var parent = 0;
					if('无' != self.form.parent){
						parent = self.form.parent;
					}
					var params = {'name':self.form.name,
					'parent':parent, 
					'fun_ids':self.form.funsref,
					'default_path': self.form.default_path};
					save_item(params);
				} else {
					self.show_alert('请完善信息!');
					return false;
				}
			});
			
		},
		menuclick(tag){
			this.dialogFormVisible = true;
		},
		reload_items(id){
			var self = this;
			var pg = self.currentPage - 1;
			if(pg<0)pg=0;
			var params = {page:pg}
			var load_items = ()=>{
				
				axios.get('/user/role_list',{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						res.data.data.forEach((r, idx)=>{
							var parent_role_detail = r.parent_role_detail;
							var base_fun_desc_arr = [];
							var parent_roles_fun_list = [];
							r.base_fun_list.forEach((bf, idx)=>{
								base_fun_desc_arr.push(bf.desc);
							});
							if(parent_role_detail.hasOwnProperty('base')){
								parent_role_detail.base.forEach((ebf, idx)=>{
									base_fun_desc_arr.push(ebf.desc)
									parent_roles_fun_list.push(ebf);
								});
							}
							var base_fun_desc = '';
							if(base_fun_desc_arr.length>0){
								base_fun_desc = base_fun_desc_arr.join(',')
							}
							var ext_fun_desc_arr = [];
							var ext_fun_desc = '';
							if(parent_role_detail.hasOwnProperty('ext')){
								parent_role_detail.ext.forEach((ebf, idx)=>{
									ext_fun_desc_arr.push(ebf.desc);
									parent_roles_fun_list.push(ebf);
								});
							}
							if(r.ext_fun_list){
								r.ext_fun_list.forEach((bf, idx)=>{
									ext_fun_desc_arr.push(bf.desc);
								});
							}
							if(ext_fun_desc_arr.length>0){
								ext_fun_desc = ext_fun_desc_arr.join(',')
							}
							var parent_desc = '';
							if(r.p){
								parent_desc = r.p.desc;
							}
							
							var item = {
								id:r.id,
								parent_desc: parent_desc,
								name: r.desc,
								path: r.default_path,
								base_fun_list: r.base_fun_list,
								ext_fun_list:r.ext_fun_list?r.ext_fun_list:[],
								parent_fun_list:parent_roles_fun_list,
								base_fun: base_fun_desc,
								ext_fun: ext_fun_desc
							  }
							self.$set(self.tableData,idx,item);
						});
						if(res.data.hasOwnProperty('fun_list')){
							self.fun_list = res.data.fun_list;
							console.log('fun_list:',self.fun_list);
							self.funs = [];
							res.data.fun_list.forEach((f, idx)=>{
								self.funs.push({
									'key':f.id,
									'label':f.desc,
									'disabled': false
								});
							});
							console.log('funs:', self.funs);
							
						}
						self.has_next = res.data.has_next;
						if(self.has_next){
							self.total = self.currentPage + 1 ;
						} else {
							self.total = self.currentPage;
						}
					}
				},()=>{
					console.log('请求失败!');
				});
			};
			load_items();
		}
	},
	mounted(){
		var self = this;
		var self = this;
		window.onresize = function(){
			self.maxHeight = document.documentElement.clientHeight - 100 - 100;
		};
		setTimeout(()=>{
			self.maxHeight = document.documentElement.clientHeight - 100 - 100;
		}, 100);
		self.reload_items(0);
	}
}