const axios = require('axios');
export default {
	data(){
		var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.form.checkpass !== '') {
		            this.$refs.userForm.validateField('checkpass');
		          }
		          callback();
		        }
		      };
		var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.form.password) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
		return {
			currentPage:1,
			pageSize:1,
			total:1,
			fullscreenLoading: false,
			tableData: [],
			has_next:false,
			has_prev:false,
			maxHeight:600,
			type_list:[{'id':1,'name':'本账户范围'}, {'id':2,'name':'本组织范围'}],
			org_list: [],
			role_list: [],
			ext_org_list:[],
			ext_role_list: [],
			form:{
				nickname:'',
				name:'',
				password:'',
				checkpass:'',
				org:null,
				role:null,
				type:1,
				mobile_no:'',
				extroles:[],
				extorgs:[]
			},
			form_rules:{
				name:[{required: true, message: '请输入账户名', trigger: 'blur'},{
					message: '请输入字母,数字或_',pattern:/^[@_a-zA-Z0-9]+$/g, trigger: 'blur'
				}],
				org:[{required: true, message: '请选择组织', trigger: 'change'}],
				role:[{required: true, message: '请选择角色', trigger: 'change'}],
				type:[{required: true, message: '请选择视角', trigger: 'change'}],
				mobile_no:[{required: true, message: '请输入手机号', trigger: 'blur'},
					{ pattern: /^[0-1][0-9]+$/g, message: '非法手机号', trigger: 'blur'}
				],
				password:[{required: true, min: 6, message: '至少6个字符', trigger: 'blur'},
					{validator: validatePass, trigger: 'blur'}
				],
				checkpass:[{required: true, validator: validatePass2, trigger: 'blur'}]
			},
			dialogFormVisible:false,
			role_transfer_titles: ['所有角色','已选择'],
			org_transfer_titles: ['所有组织','已选择'],
			formLabel200Width:'200px',
			formLabel260Width:'260px',
			formLabel360Width:'360px',
			formLabel100Width:'100px'
		}
	},
	methods:{
		_disable_org_item(_ids){
			var self = this;
			_ids.forEach((_id, idx)=>{
				if(self.form.extorgs.indexOf(_id)>=0){
					self.form.extorgs.pop(_id);
				}
			});
			self.ext_org_list.forEach((o, idx)=>{
				if(_ids.indexOf(o.key)>=0){
					o.disabled = true;
				} else {
					o.disabled = false;
				}
				
			});
		},
		_disable_role_item(_ids){
			var self = this;
			_ids.forEach((_id, idx)=>{
				if(self.form.extroles.indexOf(_id)>=0){
					self.form.extroles.pop(_id);
				}
			});
			self.ext_role_list.forEach((o, idx)=>{
				if(_ids.indexOf(o.key)>=0){
					o.disabled = true;
				} else {
					o.disabled = false;
				}
				
			});
		},
		org_change(val){
			var self = this;
			self._disable_org_item([val]);
		},
		role_change(val){
			var self = this;
			self._disable_role_item([val]);
		},
		show_alert(msg){
			var self = this;
			const h = self.$createElement;
			self.$notify({
				title:'提醒',
				message:h('i', {style: 'color:teal'}, msg)
			});
		},
		new_user(ref_name){
			var self = this;
			var save_item = (params)=>{
				axios.post(
				'/user/new_user',
				params,
				{headers:{'Content-Type':'application/json'}},
				).then((res)=>{
					console.log('res:',res.data);
					if(res.data.ok){
						self.reload_items();
						self.dialogFormVisible = false;
					}
				});
			};
			self.$refs[ref_name].validate((valide)=>{
				if(valide){
					console.log("form:",self.form);
					save_item(self.form);
				} else {
					self.show_alert('请完善信息!');
					return false;
				}
			});
			
		},
		menuclick(tag){
			console.log('tag:', tag);
			var self = this;
			if('role' == tag){
				self.$router.push({'path': '/rolelist'});
			}else if('org' == tag){
				self.$router.push({'path': '/orglist'});
			}else if('new' == tag){
				this.dialogFormVisible = true;
			}
		},
		doCopy(msg){
			this.$copyText(msg).then(function (e) {
				
			}, function (e) {
				
			})
		},
		open_alert(msg, iserr){
			this.$alert(msg, iserr?'注意':'请复制信息', 
			{
				confirmButtonText: '确定',
				callback: action => {
			            this.$message({
			              type: 'info',
			              message: `注意: 禁止随意传播!`
			            });
			          }
			});
		},
		patchclick(item){
			console.log("patchclick item:", item);
		},
		dialog_close(){
			var self = this;
			console.log('dialog_close form fuzzy_id:', self.form['fuzzy_id']);
			delete self.form['fuzzy_id'];
			console.log('dialog_close form:', self.form);
		},
		handleclick(item){
			var self = this;
			console.log("item:", item);
			var params = {fuzzy_id:item.fuzzy_id}
			// self.$router.push({'path': '/detail/'+item.fuzzy_id});
			// self.$router.push({'path': '/'});
			self.form['fuzzy_id'] = item._raw.fuzzy_id;
			self.form['name'] = item.name;
			self.form['nickname'] = item.nickname;
			self.form['checkpass'] = self.form['password'] = item._raw.password;
			self.form['mobile_no'] = item.mobile_no;
			self.$set(self.form, 'extroles', []);
			self.$set(self.form, 'extorgs', []);
			if(item._raw.hasOwnProperty('extroles')){
				// self.form['extroles'] = item._raw.extroles;
				self.$set(self.form, 'extroles', item._raw.extroles);
			}
			if(item._raw.hasOwnProperty('extorgs')){
				// self.form['extorgs'] = item._raw.extorgs;
				self.$set(self.form, 'extorgs', item._raw.extorgs);
			}
			self.form['org'] = null;
			self.form['role'] = null;
			self.form['type'] = null;
			if(item._raw.auth){
				self.form['org'] = item._raw.auth.org_id;
				self.form['role'] = item._raw.auth.role_id;
				self.form['type'] = item._raw.auth.type;
				self._disable_role_item([self.form['role']]);
				self._disable_org_item([self.form['org']]);
			}
			
			this.dialogFormVisible = true;
		},
		reload_items(){
			var self = this;
			var pg = self.currentPage - 1;
			if(pg<0)pg=0;
			var params = {page:pg}
			var load_items = ()=>{
				
				axios.get('/user/user_list',{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						self.tableData = [];
						var user_dict = res.data.data;
						self.org_list = user_dict.org_list;
						self.role_list = user_dict.role_list;
						var org_list_map = {};
						var role_list_map = {};
						self.org_list.forEach((o, idx)=>{org_list_map[o.id] = o;});
						self.role_list.forEach((o, idx)=>{role_list_map[o.id] = o;});
						self.ext_org_list = [];
						self.org_list.forEach((o, idx)=>{
							var name_suffix = '';
							if(o.parent>0){
								name_suffix = '('+org_list_map[o.parent].name+')';
							}
							self.ext_org_list.push({
								'key':o.id,
								'label':o.name + name_suffix,
								'disabled': false
							});
						});
						self.ext_role_list = [];
						self.role_list.forEach((o, idx)=>{
							var name_suffix = '';
							if(o.parent>0){
								name_suffix = '('+role_list_map[o.parent].desc+')';
							}
							self.ext_role_list.push({
								'key':o.id,
								'label':o.desc + name_suffix,
								'disabled': false
							});
						});
						
						user_dict.user_list.forEach((d, idx)=>{
							var item = {
								name: d.name,
								nickname: d.nickname,
								login_token:d.login_token,
								login_updated_at:d.login_updated_at,
								last_login_at:d.last_login_at,
								fuzzy_id:d.fuzzy_id,
								mobile_no:d.mobile_no,
								type_desc:'',
								org_desc:'',
								role_desc:'',
								type:null,
								_raw:d
							  }
							  if(d.auth){
								  item['type'] = d.auth.type;
								  if(d.auth.type == 1){
									  item['type_desc'] = '本账户范围';
								  }else if(d.auth.type == 2){
									  item['type_desc'] = '所属组织范围';
								  }else if(d.auth.type == 4){
									  item['type_desc'] = '上帝视角';
								  }
								  if(org_list_map.hasOwnProperty(d.auth.org_id)){
									  item['org_desc'] = org_list_map[d.auth.org_id].name
								  }
								  if(role_list_map.hasOwnProperty(d.auth.role_id)){
									item['role_desc'] = role_list_map[d.auth.role_id].desc
								  }
							  }
							  
							// console.log('item:', item);
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
		self.reload_items();
		
	}
}