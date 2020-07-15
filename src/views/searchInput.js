export default {
	data(){
		return {
		        input:'',
				select:'dir'
		      };
	},
	methods:{
		external(){
			return this.$parent.$parent.$parent
		},
		startHacking(e){
			var self = this;
			console.log('startHacking:',e);
			// console.log('startHacking self:', self);
			// console.log('startHacking external:', self.external());
			// self.external().reset_base_vars();
			e.target.blur();
			self.external().currentPage = 1;
			self.external().$refs.mytags.tosearch(()=>{
				self.external().update_uri(self.input);
			});
		},
		clear_search_input(){
			this.input = '';
		},
		handleSelect(e){
			var self = this;
			//必须异步
			setTimeout(()=>{
				self.external().reset_base_vars();
				self.external().$refs.mytags.tosearch();
			},300);
		}
	},
	mounted(){
		var self = this;
		this.$nextTick(function () {
			var kw = self.external().init_keyword;
			if(kw && kw.length>0){
				self.input = kw;
			}
			if(self.external().onSeReady){
				self.external().onSeReady(self);
			}
		});
	}
}