import MD5 from './md5.js';
import config from './config.js';

//  function time(){

// 	 var timestamp = Date.parse(new Date());

// 	     timestamp = timestamp / 1000;  


// 		 return timestamp;
//  }

// function  noncestr(){
// 	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// 	var nums = "";

// 	for (var i = 0; i < 32; i++) {

// 	   var id = parseInt(Math.random() * 61);

// 	    nums += chars[id];

// 	}

// 	 return nums;





// 正式 
// var appid = 'wx9c53a99b078435f5';
// var appkey = 'eee30bd75af1dbdee76296108b27ba84';
// 地址前缀
// let url = 'https://zhijianlw.com/api.php/index/index?'
// 测试
// var appid = 'wl9d8a121ce5816666';
// var appkey = '698d51a19d8a121ce581499d7b7066666';
console.log(config);
let url = config.APIURL;
let appid = config.__APPID();
// let appkey = config.__APPKEY();

/**
 * 网络请求
 *
 * @param   {String}  action  接口名称
 * @param   {String}  data  参数
 *
 * @return  {PromiseObj}	网络请求的Promise对象
 */
function post(action, data) {
	// var data =  JSON.stringify(data);
	data = URLencode(data);
	
	var timestamp = Date.parse(new Date());
	var ACTION = action;
	timestamp = timestamp / 1000;

	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];

	var nums = "";

	for (var i = 0; i < 32; i++) {
		var id = parseInt(Math.random() * 61);
		nums += chars[id];
	}

	var arr = []
	// 时间戳
	arr[0] = 'ts=' + timestamp + '';
	// appid
	arr[1] = 'appid=' + appid + '';
	// 字符串
	arr[2] = 'noncestr=' + nums + '';
	// 数据
	if (data == '' || data == null || data == undefined) {
		// arr[3] = 'body='; 
	} else {
		arr[3] = 'body=' + data + '';
	}
	// 排序
	arr.sort();

	let stringA = '';
	// 拼接字符串
	for (let i in arr) {
		if (i == arr.length - 1) {
			stringA += arr[i];
		} else {
			stringA += arr[i] + '&';
		}

	}
	// 拼接密钥

	let stringSignTemp = stringA // + '&appkey=' + config.__APPKEY();

	// md5加密转大写
	// console.log(stringSignTemp);
	let sign = MD5.hexMD5(stringSignTemp).toUpperCase();


	// appid        body                             随机字符串     时间戳                
	var action = 'action=' + action + '' + '&' + arr[0] + '&' + arr[1] + '&' + 'sign=' + sign + '&' + arr[3] + '&' + arr[
		2];

	var URL = url + action;
	console.log(URL);
	return new Promise((resolve) => {
		uni.request({
			url: URL,
			data: '',
			header: {
				'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
			},
			method: 'POST',
			// 成功回调
			success: (res) => {
				console.log(res)
				if (res.data.sta == 1) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			complete: (res, err) => {
				console.log(res,err)
				// DEBUG = 1 的话开启 调试打印
				// 蓝色(#66F)为正常答应
				// 红色(#F66)为错误请求
				if (config.DEBUG == 1) {
					let text = err ? "%c🔥 " + ACTION + " 请求信息  -  请求出错" : "%c⚫ " + ACTION + " 请求信息";
					let style = err ? "display: block;width:100%;background: #F66;color: #FFF;font-size: 24px;" :
						"display: block;width:100%;background: #66F;color: #FFF;font-size: 24px;";
					console.groupCollapsed(text, style);
					let log = [{
							key: "action",
							value: ACTION,
							type: typeof ACTION
						},
						{
							key: "data",
							value: data,
							type: typeof data
						},
						{
							key: "data",
							value: JSON.parse(data),
							type: typeof JSON.parse(data)
						},
						{
							key: "sta",
							value: res.data.sta,
							type: typeof res.data.sta
						},
						{
							key: "msg",
							value: res.data.msg,
							type: typeof res.data.msg
						},
						{
							key: "URL",
							value: URL,
							type: typeof URL
						},
						{
							key: "timestamp",
							value: timestamp,
							type: typeof timestamp
						},
						{
							key: "appid",
							value: appid,
							type: typeof appid
						},
						{
							key: "noncestr",
							value: nums,
							type: typeof nums
						}
					];
					console.table(log);
					// 以表格形式打印 data 信息
					if (data != '{}') console.table(JSON.parse(data));
					else console.warn("data为空");
					// 如果出错就返回错误信息 如果没有就返回res信息
					if (err) console.error(ACTION + " 错误信息： ", err);
					else console.info(ACTION + " 返回结果： ", res);
					console.groupEnd();
				}
			}
		})
	})
}

/**
 * 网络请求
 *
 * @param   {String}  action  接口名称
 * @param   {String}  data  参数
 *
 * @return  {PromiseObj}	网络请求的Promise对象
 */
function postNew(action, data, controller) {
	// var data =  JSON.stringify(data);
	var timestamp = Date.parse(new Date());
	var ACTION = action;
	timestamp = timestamp / 1000;

	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];

	var nums = "";

	for (var i = 0; i < 32; i++) {
		var id = parseInt(Math.random() * 61);
		nums += chars[id];
	}

	var arr = []
	// 时间戳
	arr[0] = 'ts=' + timestamp + '';
	// appid
	arr[1] = 'appid=' + appid + '';
	// 字符串
	arr[2] = 'noncestr=' + nums + '';
	// 数据
	if (data == '' || data == null || data == undefined) {
		// arr[3] = 'body='; 
	} else {
		arr[3] = 'body=' + data + '';
	}
	// 排序
	arr.sort();

	let stringA = '';
	// 拼接字符串
	for (let i in arr) {
		if (i == arr.length - 1) {
			stringA += arr[i];
		} else {
			stringA += arr[i] + '&';
		}

	}
	// 拼接密钥

	let stringSignTemp = stringA // + '&appkey=' + config.__APPKEY();

	// md5加密转大写
	// console.log(stringSignTemp);
	let sign = MD5.hexMD5(stringSignTemp).toUpperCase();


	// appid        body                             随机字符串     时间戳                
	var action = 'action=' + action + '' +'&' + 'controller='+ controller +'&' + 'is_dev=1' +'&' + arr[0] + '&' + arr[1] + '&' + 'sign=' + sign + '&' + arr[3] + '&' + arr[
		2];

	var URL = url + action;
	console.log(URL);
	return new Promise((resolve) => {
		uni.request({
			url: URL,
			data: '',
			header: {
				'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
			},
			method: 'POST',
			// 成功回调
			success: (res) => {
				// console.log(res)
				if (res.data.sta == 1) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			complete: (res, err) => {
				// DEBUG = 1 的话开启 调试打印
				// 蓝色(#66F)为正常答应
				// 红色(#F66)为错误请求
				if (config.DEBUG == 1) {
					let text = err ? "%c🔥 " + ACTION + " 请求信息  -  请求出错" : "%c⚫ " + ACTION + " 请求信息";
					let style = err ? "display: block;width:100%;background: #F66;color: #FFF;font-size: 24px;" :
						"display: block;width:100%;background: #66F;color: #FFF;font-size: 24px;";
					console.groupCollapsed(text, style);
					let log = [{
							key: "action",
							value: ACTION,
							type: typeof ACTION
						},
						{
							key: "data",
							value: data,
							type: typeof data
						},
						{
							key: "data",
							value: JSON.parse(data),
							type: typeof JSON.parse(data)
						},
						{
							key: "sta",
							value: res.data.sta,
							type: typeof res.data.sta
						},
						{
							key: "msg",
							value: res.data.msg,
							type: typeof res.data.msg
						},
						{
							key: "URL",
							value: URL,
							type: typeof URL
						},
						{
							key: "timestamp",
							value: timestamp,
							type: typeof timestamp
						},
						{
							key: "appid",
							value: appid,
							type: typeof appid
						},
						{
							key: "noncestr",
							value: nums,
							type: typeof nums
						}
					];
					console.table(log);
					// 以表格形式打印 data 信息
					if (data != '{}') console.table(JSON.parse(data));
					else console.warn("data为空");
					// 如果出错就返回错误信息 如果没有就返回res信息
					if (err) console.error(ACTION + " 错误信息： ", err);
					else console.info(ACTION + " 返回结果： ", res);
					console.groupEnd();
				}
			}
		})
	})
}
/**
 * 网络请求
 *
 * @param   {String}  action  接口名称
 * @param   {String}  data  参数
 *
 * @return  {PromiseObj}	网络请求的Promise对象
 */
function post2(action, data) {
	// var data =  JSON.stringify(data);
	// 获取时间戳
	var timestamp = Date.parse(new Date());
	var ACTION = action;
	timestamp = timestamp / 1000;
	// 生成32位随机字符串
	var nums = randomString(32);

	var dataObj = {
		appid: appid,
		body: data,
		noncestr: nums,
		ts: timestamp,
		appkey: appkey
	}
	// 字符串转换
	var stringSignTemp = obj2String(dataObj);

	let sign = MD5.hexMD5(stringSignTemp).toUpperCase();

	dataObj["action"] = action;
	// appid        body                             随机字符串     时间戳                
	// var action = 'action=' + action + '' + '&' + arr[0] + '&' + arr[1] + '&' + 'sign=' + sign + '&' + arr[3] + '&' + arr[
	// 2];

	var URL = url + obj2String(dataObj);
	return new Promise((resolve) => {
		uni.request({
			url: url,
			data: dataObj,
			header: {
				'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
			},
			method: 'GET',
			// 成功回调
			success: (res) => {
				// console.log(res)
				if (res.data.sta == 1) {
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			complete: (res, err) => {
				// DEBUG = 1 的话开启 调试打印
				// 蓝色(#66F)为正常答应
				// 红色(#F66)为错误请求
				if (config.DEBUG == 1) {
					let text = err ? "%c🔥 " + ACTION + " 请求信息  -  请求出错" : "%c⚫ " + ACTION + " 请求信息";
					let style = err ? "display: block;width:100%;background: #F66;color: #FFF;font-size: 24px;" :
						"display: block;width:100%;background: #66F;color: #FFF;font-size: 24px;";
					console.groupCollapsed(text, style);
					let log = [{
							key: "action",
							value: ACTION,
							type: typeof ACTION
						},
						{
							key: "data",
							value: data,
							type: typeof data
						},
						{
							key: "data",
							value: JSON.parse(data),
							type: typeof JSON.parse(data)
						},
						{
							key: "sta",
							value: res.data.sta,
							type: typeof res.data.sta
						},
						{
							key: "msg",
							value: res.data.msg,
							type: typeof res.data.msg
						},
						{
							key: "URL",
							value: URL,
							type: typeof URL
						},
						{
							key: "timestamp",
							value: timestamp,
							type: typeof timestamp
						},
						{
							key: "appid",
							value: appid,
							type: typeof appid
						},
						{
							key: "noncestr",
							value: nums,
							type: typeof nums
						}
					];
					console.table(log);
					// 以表格形式打印 data 信息
					if (data != '{}') console.table(JSON.parse(data));
					else console.warn("data为空");
					// 如果出错就返回错误信息 如果没有就返回res信息
					if (err) console.error(ACTION + " 错误信息： ", err);
					else console.info(ACTION + " 返回结果： ", res);
					console.groupEnd();
				}
			}
		})
	})
}
/**
 * 处理时间函数
 *
 * @param   {Number}  timestamp  时间戳
 *
 * @return  {String}	 文字类型字符串 1970年01月01日 08:00:00
 */
function formatTime(timestamp = new Date().getTime()) {
	function getLessThanTen(number) {
		return number < 10 ? '0' + number : number;
	}
	if (timestamp < 9999999999) {
		timestamp = timestamp * 1000;
	}
	let DateObj = new Date(timestamp);
	let DateText = "";
	let DateObjMap = {
		year: getLessThanTen(DateObj.getFullYear()),
		month: getLessThanTen(DateObj.getMonth() + 1),
		day: getLessThanTen(DateObj.getDate()),
		hour: getLessThanTen(DateObj.getHours()),
		minute: getLessThanTen(DateObj.getMinutes()),
		second: getLessThanTen(DateObj.getSeconds()),
		millisecond: getLessThanTen(DateObj.getMilliseconds())
	}

	DateText = DateObjMap['year'] + '/' + DateObjMap['month'] + '/' + DateObjMap['day'] + ' ' + DateObjMap['hour'] + ':' +
		DateObjMap['minute'] + ':' + DateObjMap['second'];
	return DateText
}
function formatPrice(price){
    let Price =  String(price).split('.');
    if (Price[1]>0) {
	    return price;
    } else {
	    return Price[0];
    }
}
/**
 * 出来图像url
 *
 * @param   {Number}  url  待处理的url
 *
 * @return  {String}	 处理完成的url
 */
function imageUrl(url) {
	var ossUrl = config.OSS_URL;
	if (url.indexOf('..') == -1 && url.indexOf('://') == -1) {
		return "https://zhijianlw.com" + url;
	} else {
		return url;
	}
}
/**
 * oss里面静态图片路径拼接
 */
function osspath_url(path){
 var ossUrl = config.OSS_URL;
 return  ossUrl+path; 
}



/**
 * 小程序字符串截取函数，超过指定字符截取制定，增加。。。，未超过直接返回不增加。。。
 */
function  cut_str(str,length=10){
	if(str){
		if(str.length<=10){
			return str
		}else {
			return   str.substr(0,length)+"..."
		}
	}else{
		return ""
	}
}

function  sub_str(str,length){
	if(str.length<=length){
		return str
	}else {
		return str.substr(0,length)+"..."
	}
}

function date_time(time){
	var dateTime = new Date(time*1000)
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hour = dateTime.getHours();
	var minute = dateTime.getMinutes();
	var second = dateTime.getSeconds();
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minute < 10) {
		minute = '0' + minute;
	}
	if (second < 10) {
		second = '0' + second;
	}
	return   year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' +
		second;
		
}

/**
 * 随机字符串
 *
 * @param   {Number}  e  生成字符串的位数
 *
 * @return  {String}     生成的字符串
 */
function randomString(e) {
	e = e || 32;
	var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
		a = t.length,
		n = "";
	for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n
}
/**
 * 网络参数请求为字符串
 *
 * @param   {Obj}  obj  网络参数 单层对象 不能出现嵌套 {}
 *
 * @return  {String}    拼接字符串
 */
function obj2String(obj) {
	return JSON.stringify(obj).replace(/":"/g, '=').replace(/","/g, '&').replace(/":/g, '=').replace(/,"/g, '&').replace(
		/{"/g, '').replace(/"}/g, '').replace(/{}/g, '');
}

async function wxPay(orderNumber, type) {
	let rthat = this;
	
	if (!type) {
		type = 'buy_order';
	}
	// appId
	let appId = "wx9c53a99b078435f5";
	// key 
	let key = "45579fcdb646746f02d9e041d50975b4";
	// 获取时间戳
	let timeStamp = String(Date.now());
	// 获取随机字符串
	let nonceStr = randomString();
	// 获取订单号
	let prepayId = await getPrepayId(orderNumber, type);
	console.log(prepayId);
	let tempPaySign =
		`appId=${appId}&nonceStr=${nonceStr}&package=prepay_id=${prepayId}&signType=MD5&timeStamp=${timeStamp}&key=${key}`
	let paySign = MD5.hexMD5(tempPaySign).toUpperCase();
	console.log({
		'timeStamp': timeStamp,
		'nonceStr': nonceStr,
		'package': `prepay_id=${prepayId}`,
		'signType': 'MD5',
		'paySign': paySign,
	})
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: timeStamp,
		nonceStr: nonceStr,
		package: `prepay_id=${prepayId}`,
		signType: 'MD5',
		paySign: paySign,
		success: function(res) {
			console.log(res);
			uni.showToast({
				icon: "success",
				title: "支付成功"
			})
			// 调用订阅消息
			uni.requestSubscribeMessage({
				tmplIds: ['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo','KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE'],
				success(res) {
					if (res['CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo'] == 'accept' && res['KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE'] == 'accept') {
						let action = "add_wx_subscribe_log";
						let controller = 'subscribe';
						let memberid = uni.getStorageSync('id')
						let data = JSON.stringify({
							memberid: memberid,
							template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE"
						});
						
						postNew(action,data,controller).then(res=>{
							if(res.sta == 1){
							}
						})
					}
				},
				fail(res) {
				},
				complete(res){
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},500);
				}
			});
		},
		fail: function(res) {
			console.log(res);
			// 调用订阅消息
			uni.requestSubscribeMessage({
				tmplIds: ['hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'],
				success(res) {
					if (res['hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs'] == 'accept') {
						let action = "add_wx_subscribe_log";
						let controller = 'subscribe';
						let memberid = uni.getStorageSync('id')
						let data = JSON.stringify({
							memberid: memberid,
							template_id:"hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"
						});
						
						postNew(action,data,controller).then(res=>{
							if(res.sta == 1){
							}
						})
					}
				},
				fail(res) {
				},
				complete(res){
					uni.showToast({
						icon: "none",
						title: "取消支付"
					})
				}
			});
		},
	});
	/**
	 * 获取ip
	 *
	 * @return  {string}  IP地址
	 */
	async function getIp() {
		let [error, res] = await uni.request({
			url: 'https://zhijianlw.com/api.php/index/getip'
		});
		if (error) {
			return false;
		}
		return res.data.ip;
	}

	async function getBuyOrderPayInfo(ordernumber) {
		console.log(ordernumber);
		// 接口地址
		let action = 'get_buy_order_pay_info';
		// 传入参数
		let data = JSON.stringify({
			ordernumber: ordernumber,
		});
		console.log(data);
		// 请求
		return await post(action, data);
		console.log(res);
		if (error) {
			return false;
		}
		console.log(res);
		return res.rs.serial_number;
	}

	async function getPrepayId(orderNumber, type) {
		// 获取ip地址
		let ip = await getIp();
		console.log("// 获取ip地址", orderNumber);
		// let buyOrderPayInfo = await getBuyOrderPayInfo(orderNumber);
		let serialNumber = orderNumber;
		// 接口地址
		let action = 'add_paylog_to_wx';
		// 传入参数
		let data = JSON.stringify({
			serial_number: serialNumber,
			ip: ip,
			openid: uni.getStorageSync('openid'),
			type: type,
		});
		// 请求
		console.log("获取getPrepayId");
		let res = await post(action, data);
		console.log(res);
		// if (error) {
		// 	console.log("获取getPrepayId",error);
		// 	return false;
		// }
		console.log("获取getPrepayId", res.rs.prepay_id);
		return res.rs.prepay_id;
	}
}

function isSystemInfo(){
	let isSystemInfo = false;
	uni.getSystemInfo({
		success:  (res)=> {
			// 判断是否是苹果11及以上手机  top44是苹果样式不一
			if (res.safeArea.top > 20 && res.model.indexOf("iPhone") > -1) {
				isSystemInfo =  true;
			} else{
 				isSystemInfo =  false;
 			}
 		// 	if(res.model.indexOf('iPhone X') != -1 || res.model.indexOf("iPhone XR") != -1  || res.model.indexOf("iPhone XS Max") != -1){
			// 	isSystemInfo =  true;
			// }else{
 		// 		isSystemInfo =  false;
 		// 	}
 		}
 	});
	return isSystemInfo;
}

function URLencode(sStr){
    return sStr.replace(/\+/g, '%2B').replace(/\#/g, '%23').replace(/\&/g, '%26');
}



module.exports = {
	post: post,
	formatTime: formatTime,
	imageUrl: imageUrl,
	osspath_url:osspath_url,
	cut_str:cut_str,
	date_time:date_time,
	wxPay: wxPay,
	formatPrice: formatPrice,
	postNew: postNew,
	sub_str: sub_str,
	isSystemInfo: isSystemInfo
}
