const axios = require('axios');
export default {
	data(){
		return {
			currentPage:1,
			pageSize:1,
			total:1,
			fullscreenLoading: false,
			userData: {},
			has_next:false,
			has_prev:false
		}
	},
	methods:{
		onSubmit(){
			console.log('submit');
		},
		editRole(){
			var self = this;
			console.log('editRole:', this.userData);
			self.$router.push({'path': '/role/'+self.userData.fuzzy_id});
		},
		editOrg(){
			var self = this;
			console.log('editOrg:', this.userData);
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
		handleclick(item){
			var self = this;
			console.log("item:", item);
			console.log("handleclick self:", self);
			var params = {fs_id:item.fs_id}
			self.fullscreenLoading = true;
			axios.get('/open/shared',{params:params}).then((res)=>{
				if(res.data){
					self.fullscreenLoading = false;
					console.log('data:',res.data);
					if(res.data.hasOwnProperty('err')){
						self.open_alert(res.data.err, true)
					} else if(res.data.hasOwnProperty('info')){
						self.doCopy(res.data.info);
						self.open_alert(res.data.info, false)
					}
				}
			},()=>{console.log('请求失败!');})
		},
		handleCurrentChange(val){
			console.log('handleCurrentChange val:', val);
			this.$refs.mytags.tosearch()
		},
		reload_items(id){
			var self = this;
			var params = {'id':id}
			var load_items = ()=>{
				
				axios.get('/user/user_detail',{params:params}).then((res)=>{
					console.log('res:', res);
					if(res.data){
						console.log('data:',res.data);
						
						self.userData = res.data;
						
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
		self.reload_items(self.$route.params.id);
	}
}