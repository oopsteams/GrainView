export default {
	data(){
		return {
			links: [],
			state: ''
		};
	},
	methods:{
		startHacking:function(){
		  this.$notify({
		    title: 'It works!',
		    type: 'success',
		    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
		    duration: 5000
		  })
		},
		handleIconClick(ev) {
		  console.log(ev);
		}
	},
	mounted(){}
}