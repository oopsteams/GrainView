const axios = require('axios');
const utils = require('../utils.js');
export default {
	data(){
		return {
			tk:'',
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
			form:{
				id:0,
				name:'',
				parent:'无'
			},
			form_rules:{
				name:[{required: true, message: '请输入名称', trigger: 'blur'}]
			}
		}
	},
	methods:{
		parent_change(val){
			
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
		new_org(ref_name){
			var self = this;
			var save_item = (params)=>{
				axios.post(
				'/user/new_org?tk='+self.tk,
				params,
				{headers:{'Content-Type':'application/json'}},
				).then((res)=>{
					console.log('new_role res:',res);
					self.reload_items(0);
				});
			};
			self.$refs[ref_name].validate((valide)=>{
				if(valide){
					console.log("form:",self.form);
					self.dialogFormVisible = false;
					var parent = 0;
					if('无' != self.form.parent){
						parent = self.form.parent;
					}
					var params = {'name':self.form.name,
					'parent':parent};
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
		reload_items(){
			var self = this;
			var pg = self.currentPage - 1;
			if(pg<0)pg=0;
			var params = {page:pg}
			var load_items = ()=>{
				axios.get('/user/org_list?tk='+self.tk,{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						res.data.data.forEach((r, idx)=>{
							
							var parent_desc = '';
							if(r.p){
								parent_desc = r.p.name;
							}
							
							var item = {
								id:r.id,
								parent_desc: parent_desc,
								p:r.p,
								name: r.name
							  }
							self.$set(self.tableData,idx,item);
						});
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
		window.onresize = function(){
			self.maxHeight = document.documentElement.clientHeight - 100 - 100;
		};
		setTimeout(()=>{
			self.maxHeight = document.documentElement.clientHeight - 100 - 100;
		}, 100);
		self.tk = utils.GetQueryString('tk');
		self.reload_items();
	}
}