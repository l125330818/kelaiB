/**
 * Created by luojie on 2017/12/5.
 */

const Util = {
	getTimeStr:(timeTamp,fmt)=>{
		return new Date(timeTamp).Format(fmt || "yyyy-MM-dd hh:mm:ss")
	},
	invalid:{
		mobileReg:/^1[3|4|5|7|8][0-9]\d{8}$/,  //验证手机号正则表达式
		numReg:/^[0-9]*$/,
	},
	clone:(obj)=>{
	var o;
	switch (typeof obj) {
		case "undefined":
			break;
		case "string":
			o = obj + "";
			break;
		case "number":
			o = obj - 0;
			break;
		case "boolean":
			o = obj;
			break;
		case "object": // object 分为两种情况 对象（Object）或数组（Array）
			if (obj === null) {
				o = null;
			} else {
				if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
					o = [];
					for (var i = 0; i < obj.length; i++) {
						o.push(clone(obj[i]));
					}
				} else {
					o = {};
					for (var k in obj) {
						o[k] = clone(obj[k]);
					}
				}
			}
			break;
		default:
			o = obj;
			break;
	}
	return o;
}

}


Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
export default Util