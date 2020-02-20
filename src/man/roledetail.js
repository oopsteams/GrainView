const axios = require('axios');
const utils = require('../utils.js');
export default {
	data(){
		return {
			tk:'',
			role:{},
			roles:[],
			refs:[]
		}
	},
	methods:{
		commitRole(){
			var self = this;
			console.log('refs:',self.refs);
		},
		reload_items(id){
			var self = this;
			var params = {'id':id}
			var load_items = ()=>{
				
				axios.get('/user/role_detail?tk='+self.tk,{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						
						self.role = res.data.role.base.roles[0];
						self.roles = [];
						res.data.roles.forEach((r, idx)=>{
							self.roles.push({
								'key':r.id,
								'label':r.desc,
								'disabled': false
							});
						});
						self.refs = [];
						if(res.data.role.hasOwnProperty('ext')){
							res.data.role.ext.roles.forEach((r,idx)=>{
								self.refs.push(r.id);
							});
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
		self.tk = utils.GetQueryString('tk');
		self.reload_items(self.$route.params.id);
	}
}