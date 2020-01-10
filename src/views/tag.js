export default {
	data(){
		return {
			tags: [
				{name: '亲子教育', type:''},
				{name: '英语学习', type:''},
				{name: '校内课程', type:''},
				{name: '大人栏目', type:''},
				{name: 'BBC纪录片', type:''},
				{name: '体美艺音', type:''},
				{name: '动漫电影', type:''}
			]
		}
	},
	methods:{
		tagSearch:e => {
			console.log(e);
		}
	}
}