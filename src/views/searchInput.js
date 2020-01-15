export default {
	data(){
		return {
		        input:''
		      };
	},
	methods:{
		external(){
			return this.$parent.$parent.$parent
			},
		querySearch(queryString, cb) {
			var links = this.links;
			var results = queryString ? links.filter(this.createFilter(queryString)) : links;
			// call callback function to return suggestion objects
			cb(results);
		},
		createFilter(queryString) {
		  return (link) => {
		    return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		  };
		},
		loadAll() {
		  return [
		    { "value": "vue", "link": "https://github.com/vuejs/vue" },
		    { "value": "element", "link": "https://github.com/ElemeFE/element" },
		    { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
		    { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
		    { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
		    { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
		    { "value": "babel", "link": "https://github.com/babel/babel" }
		   ];
		},
		handleSelect(item) {
			var self = this;
		  console.log(item);
		  console.log('handleSelect self:', self);
		},
		handleIconClick(e){
			console.log('handleIconClick:',e);
		},
		startHacking(e){
			var self = this;
			console.log('startHacking:',e);
			console.log('startHacking self:', self);
			console.log('startHacking external:', self.external().$refs.mytags);
			self.external().$refs.mytags.tosearch();
		}
	},
	mounted(){
		this.links = this.loadAll();
	}
}