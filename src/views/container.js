const axios = require('axios');
export default {
	data(){
		return {
			currentPage:1,
			pageSize:15,
			total:100,
			fullscreenLoading: false,
			sub_dir:'',
			pid: '',
			qr:'',
			tableData: []
		}
	},
	methods:{
		reset_base_vars(){
			var self = this;
			self.currentPage = 1;
			self.sub_dir = '';
			self.pid = '';
		},
		doCopy(msg){
			this.$copyText(msg).then(function (e) {
				
			}, function (e) {
				
			})
		},
		click_sub_dir(tag, row){
			var self = this;
			if(tag.length>0 && self.sub_dir != tag){
				self.sub_dir = tag;
				self.currentPage = 1;
				self.pid = '';
				this.$refs.mytags.tosearch();
			}
			console.log('sub_dir:', tag);
		},
		clear_sub_dir(){
			var self = this;
			if(self.sub_dir.length>0){
				self.sub_dir = '';
				self.currentPage = 1;
				this.$refs.mytags.tosearch()
			}
		},
		open_alert(msg, iserr, _t, txt){
			var self = this;
			var _msg = msg;
			var use_html = false;
			if(this.qr){
				_msg = '<span class="common-font">'+msg+'</span><br><span>联系方式:</span><br><span><img width="256px" height="256px" src="'+this.qr+'"/></span>';
				use_html = true;
			}
			var re_copy_msg = false;
			
			if(!_t){
				_t = '请复制信息';
				re_copy_msg = true;
			}
			self.doCopy(txt);
			this.$alert(_msg, iserr?'注意':_t, 
			{
				dangerouslyUseHTMLString:use_html,
				confirmButtonText: '复制',
				callback: action => {
			            this.$message({
			              type: 'info',
			              message: `注意: 禁止随意传播!`
			            });
						//if(re_copy_msg){self.doCopy(txt);}
						self.doCopy(txt);
			          }
			});
		},
		showcontact(item){
			var self = this;
			if(item){
				var info = '['+item.app_name+']'+item.path+item.name
				self.open_alert("<span>"+info + "</span><br>请联系资源管理员:张老师", false, "获取方式", info);
				// self.doCopy(info);
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
						self.open_alert(res.data.info, false, "请复制信息", res.data.info)
						
					}
				}
			},()=>{console.log('请求失败!');})
		},
		handleCurrentChange(val){
			console.log('handleCurrentChange val:', val);
			this.$refs.mytags.tosearch()
		},
		click_parent(row){
			var self = this;
			if(row.fs_id && self.pid != row.fs_id){
				self.reset_base_vars();
				self.pid = row.fs_id;
				this.$refs.mytags.tosearch();
			}
			// console.log("click_parent parent row:", row);
			// console.log("row:", row, ",column:", column, ",cell:", cell, ",event:", event);
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