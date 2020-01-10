export default {
	data(){
		const item = {
		        date: '2016-05-02',
		        name: 'Tom',
		        address: 'No. 189, Grove St, Los Angeles'
		      };
		return {
			menu_datas:[{index:'4',title:'亲子教育', icon:'el-icon-menu', groups:[{
				title:'',items:[{id:'123',desc:'凯～叔', icon:'btn_boder'},
				{id:'124',desc:'好&芳@@法课堂', icon:'btn_boder'}]
			}], subs:[
				{index:'4-1',title:'亲子教育-1', icon:'el-icon-menu',items:[], subs:[
					{index:'4-1-1',title:'亲子教育-1-1', items:[], icon:'el-icon-menu'}
				]}
			]},
				{index:'5',title:'英语学习', icon:'el-icon-menu', items:[], subs:[]},
				{index:'6',title:'校内课程', icon:'el-icon-menu', items:[], subs:[]},
				{index:'7',title:'大人栏目', icon:'el-icon-menu', items:[], subs:[]},
				{index:'8',title:'BBC纪录片', icon:'el-icon-menu', items:[], subs:[]},
				{index:'9',title:'体美艺音', icon:'el-icon-menu', items:[], subs:[]},
				{index:'10',title:'动漫电影', icon:'el-icon-menu', items:[], subs:[]},
			],
			tableData: Array(20).fill(item)
		}
	},
	methods:{
		testMenu:e => {
			console.log(e);
		}
	},
	mounted(){
		var retain = 100;
		var orderHight = document.documentElement.clientHeight;
		document.getElementById('data_container').style.height = (orderHight-151-retain) + 'px';
		// console.log('data_container:',document.getElementById('data_container'));
		// console.log('container h:',orderHight-151);
	}
}