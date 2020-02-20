var utils = {
	GetQueryString:function(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
		 console.log('r:',r);
	     if(r!=null){
	         return decodeURIComponent(r[2])
	     }
	     return null;
	}
}
module.exports = utils;