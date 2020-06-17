const axios = require('axios');
const min_delay = 300;
export default {
	data() {
		return {
			trigger_timestamp: 0,
			currentPage: 1,
			pageSize: 15,
			total: 100,
			fullscreenLoading: false,
			sub_dir: '',
			pid: '',
			qr: '',
			tableData: [],
			parent_stack: [],
			top_fix_item: null,
			init_keyword: null
		}
	},
	methods: {
		reset_base_vars() {
			var self = this;
			self.currentPage = 1;
			self.sub_dir = '';
			self.pid = '';
		},
		doCopy(msg) {
			this.$copyText(msg).then(function(e) {

			}, function(e) {

			})
		},
		click_sub_dir(tag, row) {
			var self = this;
			if (tag.length > 0 && self.sub_dir != tag) {
				self.sub_dir = tag;
				self.currentPage = 1;
				if(self.pid && self.pid.length>0){
					self.$router.push({
						'path': '/',
					});
				}
				self.pid = '';
				this.$refs.mytags.tosearch();
			}
			console.log('sub_dir:', tag);
		},
		clear_sub_dir() {
			var self = this;
			if (self.sub_dir.length > 0) {
				self.sub_dir = '';
				self.currentPage = 1;
				this.$refs.mytags.tosearch()
			}
		},
		open_alert(msg, iserr, _t, txt) {
			var self = this;
			var _msg = msg;
			var use_html = false;
			if (this.qr) {
				_msg = '<span class="common-font">' + msg +
					'</span><br><span>联系方式:</span><br><span><img width="256px" height="256px" src="' + this.qr + '"/></span>';
				use_html = true;
			}
			var re_copy_msg = false;

			if (!_t) {
				_t = '请复制信息';
				re_copy_msg = true;
			}
			self.doCopy(txt);
			this.$alert(_msg, iserr ? '注意' : _t, {
				dangerouslyUseHTMLString: use_html,
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
		showcontact(item) {
			var self = this;
			if (item) {
				var info = '[' + item.app_name + ']' + item.path + item.name
				self.open_alert("<span>" + info + "</span><br>请联系资源管理员:张老师", false, "获取方式", info);
				// self.doCopy(info);
			}
		},
		handleclick(item) {
			var self = this;
			// console.log("item:", item);
			// console.log("handleclick self:", self);
			var params = {
				fs_id: item.fs_id
			}
			self.fullscreenLoading = true;
			axios.get('/open/shared', {
				params: params
			}).then((res) => {
				if (res.data) {
					self.fullscreenLoading = false;
					// console.log('data:',res.data);
					if (res.data.hasOwnProperty('err')) {
						self.open_alert(res.data.err, true)
					} else if (res.data.hasOwnProperty('info')) {
						self.open_alert(res.data.info, false, "请复制信息", res.data.info)

					}
				}
			}, () => {
				console.log('请求失败!');
			})
		},
		handleCurrentChange(val) {
			console.log('handleCurrentChange val:', val);
			this.$refs.mytags.tosearch()
		},
		check_trigger: function(){
		    var self = this;
		    if(Date.now() - self.trigger_timestamp < min_delay){
		      return false;
		    } else {
		      self.trigger_timestamp = Date.now();
		    }
		    return true;
		  },
		build_parent_params: function(){
			var self = this;
			var p_fs_id_list = [];
			var l = self.parent_stack.length;
			for(var i=0;i<l;i++){
				p_fs_id_list.push(self.parent_stack[i].fs_id);
			}
			if(p_fs_id_list.length>0){
				return p_fs_id_list.join(",");
			} else {
				return '';
			}
		},
		navparent:function(item, idx){
			var self = this;
		    if(!self.check_trigger()){
		      return;
		    }
		    var parent = item;
			// console.log('navparent item:', item, ',idx:', idx);
		    
		    // self.parent_stack = this.data.parent_stack;
		    if(idx < self.parent_stack.length - 1){
		      self.parent_stack.splice(idx + 1, self.parent_stack.length - idx - 1);
			  self.reset_base_vars();
			  self.pid = parent.fs_id;
			  self.$router.push({
			  	'path': '/' + parent.fs_id,
			  	'query':{'name': parent.name, 'source': parent.source, 'parents':self.build_parent_params()}
			  });
			  if(this.$refs.searchinput){
			  	this.$refs.searchinput.clear_search_input();
			  }
			  this.$refs.mytags.tosearch(()=>{});
		    }
		  },
		click_parent(row) {
			var self = this;
			if (row.fs_id && self.pid != row.fs_id) {
				self.reset_base_vars();
				self.pid = row.fs_id;
				self.$router.push({
					'path': '/' + row.fs_id,
					'query':{'name': row.name, 'source': row.source, 'parents':self.build_parent_params()}
				});
				if(this.$refs.searchinput){
					this.$refs.searchinput.clear_search_input();
				}
				this.$refs.mytags.tosearch((st)=>{
					if(st == 0){
						self.parent_stack.push(row);
					}
				});
			}
			// console.log("click_parent parent row:", row);
			// console.log("row:", row, ",column:", column, ",cell:", cell, ",event:", event);
		},
		update_uri(kw){
			var self = this;
			// console.log('update_uri kw:', kw);
			// var row = self.parent_stack[self.parent_stack.length-1];
			var query = {};
			if(this.$route.query){
				for(var k in this.$route.query){
					query[k] = this.$route.query[k];
				}
			}
			
			if(!kw){
				kw = '';
			}
			if(kw.length == 0 && query['kw'] && query['kw'].length>0){
				if(kw.length == 0){
					delete query['kw'];
				}
				// console.log('new query:', query);
				self.$router.push({
					'query': query
				});
			} else if(kw.length >0 && query['kw'] != kw){
				query['kw'] = kw;
				self.$router.push({
					'query': query
				});
			}
			
		}
	},
	mounted() {
		var self = this;
		var retain = 100;
		var orderHight = document.documentElement.clientHeight;
		// document.getElementById('data_container').style.height = (orderHight-151-retain) + 'px';
		// console.log('data_container:',document.getElementById('data_container'));
		// console.log('container h:',orderHight-151);
		this.parent_stack.push({
			name: "根目录",
			path: '',
			source:'shared',
			dir:1,
			fs_id:'',
			app_name:null,
			pin:0
		});
		var pid = this.$route.params.pid;
		if(this.$route.query){
			var kw = this.$route.query.kw;
			if(kw && kw.length>0){
				self.init_keyword = kw;
			}
		}
		if (pid && pid.match(/^\d+$/)) {
			console.log("pid:", pid, ",query:", this.$route.query);
			var parents_list_str = this.$route.query.parents;
			if(pid == '0'){
				pid = null;
			} else {
				this.pid = pid;
				var pname = this.$route.query.name;
				// console.log('parents_list:', parents_list_str);
				if(parents_list_str && parents_list_str.length>0){
					var parents_list = parents_list_str.split(",");
					parents_list.forEach((fs_id, idx)=>{
						if(fs_id.length>0){
							this.parent_stack.push({
								name: "上级目录",
								path: '',
								source:'shared',
								dir:1,
								fs_id:fs_id,
								app_name:null,
								pin:0
							});
						}
					});
				}
				this.parent_stack.push({
					name: pname,
					path: '',
					source:'shared',
					dir:1,
					fs_id:pid,
					app_name:null,
					pin:0
				});
			}
		}
	}
}
