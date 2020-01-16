const axios = require('axios');
export default {
	data(){
		return {
			currentPage:1,
			pageSize:15,
			total:100,
			fullscreenLoading: false,
			tableData: []
		}
	},
	methods:{
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