export default {
	data(){
		return {
		        input:'',
				select:''
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
			self.external().currentPage = 1;
			self.external().$refs.mytags.tosearch();
		},
		handleSelect(e){
			var self = this;
			//必须异步
			setTimeout(()=>{
				self.external().currentPage = 1;
				self.external().$refs.mytags.tosearch();
			},300);
		}
	},
	mounted(){
		
	}
}