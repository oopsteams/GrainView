const axios = require('axios');
export default {
	data(){
		return {
			currentPage:1,
			pageSize:15,
			total:100,
			fullscreenLoading: false,
			sub_dir:'',
			tableData: []
		}
	},
	methods:{
		reset_base_vars(){
			var self = this;
			self.currentPage = 1;
			self.sub_dir = '';
		},
		doCopy(msg){
			this.$copyText(msg).then(function (e) {
				
			}, function (e) {
				
			})
		},
		click_sub_dir(event){
			var self = this;
			if(self.sub_dir != event.target.innerHTML){
				self.sub_dir = event.target.innerHTML;
				self.currentPage = 1;
				this.$refs.mytags.tosearch()
			}
			// console.log('sub_dir:', event.target.innerHTML);
		},
		clear_sub_dir(){
			var self = this;
			if(self.sub_dir.length>0){
				self.sub_dir = '';
				self.currentPage = 1;
				this.$refs.mytags.tosearch()
			}
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
		showcontact(item){
			var self = this;
			if(item){
				self.open_alert("请联系资源管理员:张老师", false);
				self.doCopy(item.path+item.name);
			}
		},
		handleclick(item){
			var self = this;
			// console.log("item:", item);
			// console.log("handleclick self:", self);
			var params = {fs_id:item.fs_id}
			self.fullscreenLoading = true;
			axios.get('/open/shared',{params:params}).then((res)=>{
				if(res.data){
					self.fullscreenLoading = false;
					// console.log('data:',res.data);
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
		}
	},
	mounted(){
		var retain = 100;
		var orderHight = document.documentElement.clientHeight;
		// document.getElementById('data_container').style.height = (orderHight-151-retain) + 'px';
		// console.log('data_container:',document.getElementById('data_container'));
		// console.log('container h:',orderHight-151);
	}
}