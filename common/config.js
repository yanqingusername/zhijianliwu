module.exports = {
	// Debug 正式 0|开发&测试 1
	DEBUG: 1,
	// URL
	URL: "https://zhijianlw.com/",
	// ApiUrl 接口路径
	APIURL: "https://zhijianlw.com/api.php/test/index?", //正式环境
	// APIURL: "http://8.140.132.21/api.php/index/index?", //测试环境
	// StaticUrl 静态资源地址
	STATICURL: "",
	// 微信小程序AppId
	APPID: 'wl9d8a121ce5816666',
	// 微信小程序AppKey
	APPKEY: '698d51a19d8a121ce581499d7b7066666',
	// 后台Debug模式AppId
	DEBUG_APPID: 'wl9d8a121ce5816666',
	// 后台Debug模式AppKey
	DEBUG_APPKEY: '698d51a19d8a121ce581499d7b7066666',
	// 后台Relrase模式AppId
	RELRASE_APPID: 'wx9c53a99b078435f5',
	// 后台Relrase模式AppKey
	RELRASE_APPKEY: 'eee30bd75af1dbdee76296108b27ba84',
	// 后台AppId方法
	__APPID: function(){return this.DEBUG?this.DEBUG_APPID:this.RELRASE_APPID},
	// 后台AppKey方法
	__APPKEY: function(){return this.DEBUG?this.DEBUG_APPKEY:this.RELRASE_APPKEY},
	//阿里云oss静态资源路径
	 OSS_URL: "https://slxcx.oss-cn-beijing.aliyuncs.com",
};