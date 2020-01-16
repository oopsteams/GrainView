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
			console.log('startHacking self:', self);
			console.log('startHacking external:', self.external().$refs.mytags);
			self.external().$refs.mytags.tosearch();
		},
		handleSelect(e){
			var self = this;
			//必须异步
			setTimeout(()=>{self.external().$refs.mytags.tosearch();},300);
		}
	},
	mounted(){
		
	}
}