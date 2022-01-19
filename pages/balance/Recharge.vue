<template>
	<view>
	    <!-- 选项卡 -->
	    <view class="coupon-header">
	    	<view class="coupon-header-content flex-between">
	    		<view class="recharge-header-nav" data-index='0' @click="nav" :class="[checknum==0?'recharge-header-nav-active':'']">充值卡充值</view>
	    		<view class="recharge-header-nav" data-index='1' @click="nav" :class="[checknum==1?'recharge-header-nav-active':'']">在线充值</view>
	    	</view>
	    </view>
		<view v-if="checknum==0">
			<!-- 兑换码 -->
			<view class="new-recharge-exchange flex-center">
				<input type="text" @input="input" v-model="inputprice" placeholder="请输入储值卡密码">
			</view>
			<!-- 说明 -->
			<view class="new-recharge-explain">输入密码后点击立即充值，充值完成即余额到账</view>
			<!-- 按钮 -->
			<view >
				<view class="balance-view" @click="$buttonClick(rechargebutton)">立即充值</view>
			</view>
		</view>
		
		<view v-if="checknum==1">
			<view class="balance-page">
				<view class="balance-content flex-between-wrap">
					<view :class="[number==index?'new-balance-content-li-active':'new-balance-content-li']" v-for="(item,index) in balance" :key="index" :data-id="item.id" :data-index="index+1" @click="bala" :data-remoney="item.recharge_money" :data-gvmoney="item.give_money">
						<image class="new-balance-center-img" :src="[number==index?'https://zhijianlw.com/static/web/img/bala_decorate_bg.png':'https://zhijianlw.com/static/web/img/bala_decorate_bg_def.png']"></image>
						<view class="new-balance-content-give">{{item.discount}}</view>
						<view :class="[number==index?'new-balance-content-price-active':'new-balance-content-price']">{{item.recharge_money}}元</view>
						<image class="new-balance-img" :src="[number==index?'https://zhijianlw.com/static/web/img/bala_current_cz.png':'https://zhijianlw.com/static/web/img/bala_default_cz.png']"></image>
					</view>
				</view>
				<view class="new-balance-bottom">充值金额<text style="color: #999999;">(自定义)</text></view>
				<view class="new-balance-input flex-vertically">
					<view class="new-balance-input-left">¥</view>
					<input class="new-balance-input-input" @input="price" v-model="inputmoney" type="text" placeholder="请输入自定义充值金额">
				</view>
			</view>
			
			<view >
				<view class="balance-view" @click="$buttonClick(button)">去充值（需支付{{payMoney}}元）</view>
			</view>
		</view>
	</view>
</template> 

<script>
	import MD5  from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				ip:'',
				balance:[
					{price:'100',give:'5元'},
					{price:'200',give:'15元'},
					{price:'300',give:'20元'},
					{price:'500',give:'50元'},
					{price:'1000',give:'120元'},
					{price:'2000',give:'300元'},
				],
				number:0,
				// appid
				appid:'',
				// key密钥
				key:'',
				// 门店编号
				merchantCode:'',
				// 支付金额
				totalAmount:'',
				// 支付流水号
				outTradeNo:'',
				// 通知地址
				notifyUrl:'',
				money:'0',
				balanc:'',
				id:'',
				timeStamp:"",
				nums:'',
				value:'',
				checknum: 0,
				payMoney: '',
				inputmoney: '',
				inputprice: ''
			}
		},
		onLoad:function(e){
			
			this.content()
			
			
			var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			
			var nums = "";
			
			for (var i = 0; i < 32; i++) {			
			
			
			   var id = parseInt(Math.random() * 61);
			
			    nums += chars[id];
				  
			}
			
			this.nums = nums;
			
			this.timeStamp = new Date().getTime();
			
			
			var data = '{}';
			var action = 'get_payconfig';
			this.$utils.post(action,data).then(res=>{
				console.log('第三方参数',res)
				this.appid = res.rs.appid;
				this.key = res.rs.key;
				this.merchantCode = res.rs.merchantCode;
				this.openid = uni.getStorageSync('openid');
			})
			this.login();
		},
		onShow:function(){
			// if(this.outTradeNo){
			// 	this.chaxun();
			// }
		},
		methods: {
			  // 充值类
			  content:function(e){
				  var data = '{}';
				  var action = 'get_recharge_give';
				  this.$utils.post(action,data).then(res=>{
					  console.log(res.rs)
					  this.balance = res.rs;
					  this.id = res.rs[0].id;
					  if(res.rs.length > 0){
					  	  this.payMoney = res.rs[0].give_money
					  } else {
					  	  this.payMoney = 0
					  }
				  })
			  },
			  // 支付
			  button:function(e){
				  // 充值金额
				  
				  
				var id = uni.getStorageSync('id');
				// 支付方式
				var recharge_way = '微信支付';  
				
				if(this.money == 0){
					var data = '{"memberid":"'+id+'","recharge_give_id":"'+this.id+'","recharge_way":"'+recharge_way+'"}';
				}else{
					var data = '{"memberid":"'+id+'","money":"'+this.money+'","recharge_way":"'+recharge_way+'"}';
				}
				
				var action = 'create_member_recharge';
							
				this.$utils.post(action,data).then(res=>{ 
					console.log('在线充值',res)
					if(res.sta==1){
						uni.showLoading({
							title:'加载中',
							mask:true 
						})
					  // 支付金额
					  this.totalAmount = res.money;
					  // this.totalAmount = '0.01';  
					  // 充值流水号
					  this.outTradeNo = res.serial_number
					  // 通知地址
					  this.notifyUrl  = config.URL+'api.php/test/set_agent_recharge?serial_number=' + res.serial_number
					  this.ipp();
					  // this.xiaochengxu()	
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
					
					
				})  
				
			  },
			  // 微信支付
			  wx:function(e){
			    var that = this;
			    let ip = this.ip;
			    let openid = this.openid;
			    var data = '{"serial_number":"'+that.outTradeNo+'","ip":"'+ip+'","openid":"'+openid+'","type":"recharge"}';
			    var action = 'add_paylog_to_wx';
			    console.log(data)
			    this.$utils.post(action,data).then(res=>{
			  	  console.log('获取参数',res)
			  	//   var serial_number = res.rs.serial_number;
			  	  let arr=[];
			  	   
			  	  const date = {
			  	  			// 合作方标识
			  	  			   appId: 'appId=wx9c53a99b078435f5', 
			  	  			   timeStamp:'timeStamp='+ this.timeStamp,
			  	  			   nonceStr:'nonceStr=' + this.nums,
			  	  			   package:'package=prepay_id='+ res.rs.prepay_id,
			  	  			   signType:'signType=MD5',
			  
			  	  }	
			  	
			  	  	 
			  	  console.log('拼接前',date)
			  	  
			  	  	for(let i in date){
			  	  		arr.push(date[i])
			  	  	}
			  	  	
			  	      arr.sort();
			  	  
			  	  let stringA = '';
			  	  
			  	  // 拼接字符串
			  	   for(let i in arr){ 
			  	  	 if(i == arr.length-1){
			  	  		stringA += arr[i] ;
			  	  	}else{
			  	  		stringA += arr[i] + '&';
			  	  	}
			  	  				  
			  	  } 
			  	  let stringSignTemp = stringA + '&key=45579fcdb646746f02d9e041d50975b4';
			  	    
			  	  console.log('拼接后',stringSignTemp)
			  	  let sign = MD5.hexMD5(stringSignTemp);
			  	  console.log(sign)
			  	  
			  	  uni.hideLoading();
			  	  
			  	  
			  	  uni.requestPayment({
			  	    timeStamp: String(this.timeStamp),
			  	    nonceStr: this.nums,
			  	    package: 'prepay_id=' + res.rs.prepay_id,
			  	    signType: 'MD5',
			  	    paySign: sign.toUpperCase(),
			  	    success (res) {
			  	      uni.hideLoading();
			  		  
			  	      uni.request({
			  	          url: config.URL+'api.php/test/set_agent_recharge', 
			  	          data:{
			  	      			serial_number:that.outTradeNo
			  	      	  },
			  	          header: {
			  	              'content-type' : "application/x-www-form-urlencoded" //自定义请求头信息
			  	          }, 
			  	      	method:'GET',    
			  	      	// 成功回调
			  	          success: (res) => {
			  	      		console.log('微信成功回调',res)
							// uni.showToast({
							// 	title:'充值成功',
							// })
							// that.login();
							that.inputmoney = ''
							setTimeout(()=>{
								uni.navigateTo({
									url:'./RechargeStatus?istype=2&ordernumber=' + that.outTradeNo
								})
							},500)
			  	          },
			  	      })
					  	
			  	    },
			  	    fail (res) {
			  			uni.hideLoading(); 
			  	  	  console.log(res)
			  	  	 //  uni.showToast({
			  	  	 //  	title:'支付失败',
			  	  		// icon:'none'
			  	  	 //  })
			  		  that.commodity = '';
					  that.inputmoney = ''
					  setTimeout(()=>{
						  uni.navigateTo({
							  url:'./RechargeStatus?istype=2&ordernumber=' + that.outTradeNo
						  })
					  },500)
			  	    }
			  	  })
			  	  
			  	  
			    })
			  },
			  ipp:function(e){
			  	var that = this;
			  	    // 获取IP地址
			  	    uni.request({
			  	      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
			  	      success: function (e) {
			  			  console.log(e)
			  	        var aaa = e.data.split(' ');
			  	        var bbb = aaa[4]
			  	        var ccc = bbb.replace('"', '')
			  	        var ddd = ccc.replace('"', '')
			  	        var eee = ddd.replace(',', '')
			  			that.ip = eee;
			  			that.wx(); 
			  	      }
			  	    })
			  	
			  },
			  
			  
			  // 选择变色  获取金额
			   bala:function(e){
				 const index = e.currentTarget.dataset.index - 1;
				 this.id = e.currentTarget.dataset.id;
				 this.reMoney = e.currentTarget.dataset.remoney;
				 this.gvMoney = e.currentTarget.dataset.gvmoney;
				 this.payMoney = e.currentTarget.dataset.gvmoney
				 this.number = index;
				 this.money = 0;
				 this.inputmoney='';
			   },
			  // 选择框
			 price:function(e){
				 this.number = '1000'
				 this.money = e.detail.value;
				 this.inputmoney = e.detail.value;
				 this.payMoney = e.detail.value;
			 },
			// 路由
			 left:function(e){
				 uni.navigateTo({
				 	url:'./Query'
				 })
			 }, 
			 right:function(e){
				 uni.navigateTo({
				 	url:'./Recharge'
				 })
			 },
			 // 二维码
			 code:function(e){
			 	this.display = false
			 },
			 xiaochengxu:function(e){
				let that = this;
				let arr=[];
				 
				const date = {
							// 合作方标识
							  // appId: 'appId=' + 'EW_N3213842400',
							  appId: 'appId=' + this.appid,
							// 随机数
							   random:'random='+ this.nums,
							// 门店编号
							   // merchantCode:'merchantCode=' + 'EW_N5247492162',
							   merchantCode:'merchantCode=' + this.merchantCode,
							// 商户订单号
							   outTradeNo:'outTradeNo='+ this.outTradeNo,
							// 订单总金额
							   totalAmount:'totalAmount='+ this.totalAmount,
							// 支付渠道  活的
							   channel:'channel='+ 'WXPAY',
							// 支付交易类型
							   tradeType:'tradeType='+ 'MINIAPP',
							// 消费者用户标识
							   openId:'openId='+ this.openid,
							// 小程序appid
							   subAppId:'subAppId='+ 'wx9c53a99b078435f5',
							   notifyUrl:'notifyUrl=' + this.notifyUrl
				}	
					
				console.log(date)
				
					for(let i in date){
						arr.push(date[i])
					}
					
				    arr.sort();
				
				let stringA = '';
				
				// 拼接字符串
				 for(let i in arr){ 
					 if(i == arr.length-1){
						stringA += arr[i] ;
					}else{
						stringA += arr[i] + '&';
					}
								  
				} 
				let stringSignTemp = stringA + '&key='  + this.key;
				  
				
				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)
				
				const datt = {
							// 合作方标识
							  // appId:'appId=' + 'EW_N3213842400',
							  appId: 'appId=' + this.appid,
							//  签名
							   sign:'sign=' + sign,
							// 随机数
							   random:'random=' + this.nums,
							// 门店编号   
							   // merchantCode:'merchantCode=' + 'EW_N5247492162',
							   merchantCode:'merchantCode=' + this.merchantCode,
							// 商户订单号
							   outTradeNo:'outTradeNo=' + this.outTradeNo,
							// 订单总金额
							   totalAmount:'totalAmount=' + this.totalAmount,
							// 支付渠道  活的
							   channel:'channel=' + 'WXPAY',
							// 支付交易类型
							   tradeType:'tradeType=' + 'MINIAPP',
							// 消费者用户标识
							   openId:'openId=' + this.openid,
							// 小程序appid
							   subAppId:'subAppId=' + 'wx9c53a99b078435f5',
							   notifyUrl:'notifyUrl=' + this.notifyUrl
				}
				console.log(datt)
					 let arrr =[];
					 
					 for(let i in datt){
					 		arrr.push(datt[i])
					 	}
					 	
					     arrr.sort();
					 
					 let string = '';
					 
					 // 拼接字符串
					  for(let i in arrr){ 
					 	 if(i == arrr.length-1){
					 		string += arrr[i] ;
					 	}else{
					 		string += arrr[i] + '&';
					 	}
					 				  
					 }
					 console.log('字符串',string)
							uni.request({
							    url: 'https://api.liantuofu.com/open/precreate' , 
							    data:string,
							    header: {
							        'content-type' : "application/x-www-form-urlencoded" //自定义请求头信息
							    }, 
								method:'POST',    
								// 成功回调
							    success: (res) => {
									console.log(res.data)
									
									uni.hideLoading()
									
									wx.requestPayment({
									  timeStamp: res.data.timeStamp,
									  nonceStr: res.data.nonceStr,
									  package: res.data.payPackage,
									  signType: res.data.signType,
									  paySign: res.data.paySign,
									  success (res) {
										  that.login();
									   // 一级页面用switchTab   二级页面用redirectTo
									       wx.showModal({
											   title:'微信支付',
											   content:'支付成功',
											   cancelText:'个人中心',
											   confirmText:'再次充值',
											   success(res){
												   if(res.confirm){
													   console.log('再次充值')
												   }else if(res.cancel){
													   console.log('个人中心')
													   uni.switchTab({
													   	url:'../personal/personal'
													   })
												   }
												   
											   }
										   })	  
									  },
									  fail (res) {
										  console.log(res)
									  }
									})
									
									
							    },
							})
			},
			 // 基本信息
			 login:function (){
			 	
			 	var rawdata = this.Data;
			 	// openid
			 	var openid = uni.getStorageSync('openid');
			 		
			 		   //登录 
			 			var data = '{"wx_openid":"'+openid+'"}';
			 			var action = 'member_login';
			 			 this.$utils.post(action,data).then(res=>{
			 				 console.log('基本信息',res.rs)
			 
			 				  // 余额
			 				  if(res.rs.balance==null||res.rs.balance==''){}else{
								  this.balanc = res.rs.balance;
			 				  }			 					
			 			 })			 		
			 },
			 input(e){
			 	this.value = e.detail.value;
				this.inputprice = e.detail.value;
			 },
			 rechargebutton: function(e) {
			 	var mid = uni.getStorageSync('id');
			 	if (mid == '') {
			 		uni.showToast({
			 			title: "请先登录！",
			 			icon: 'none'
			 		})
			 		return false;
			 	}
			 	let cardpass = this.value;
			 	if (cardpass == '') {
			 		uni.showToast({
			 			title: "请输入礼品卡背面的兑换码！",
			 			icon: 'none'
			 		})
			 		return false;
			 	}
				let controller = 'order';
			 	let action = 'bind_client_card';
				let data = JSON.stringify({
					memberid: mid,
					cardpwd: cardpass
				});
			 	this.$utils.postNew(action, data, controller).then(res => {
			 		console.log(res)
			 		if (res.sta == 1) {
						this.inputprice = '';
						this.value = '';
						let ordernumber = res.rs
			 			setTimeout(()=>{
			 				uni.navigateTo({
			 					url:'./RechargeStatus?istype=1&ordernumber=' + ordernumber
			 				})
			 			},500)
			 		} else {
						this.inputprice = '';
						this.value = '';
			 			uni.showToast({
			 			 	title:res.msg,
			 			 	icon:"none",
			 			 	mask:'true',
			 			});
			 		}
			 	})
			 },
			 // 切换导航
			 nav: function(e) {
			 	let index = e.currentTarget.dataset.index;
			 	this.checknum = index;
			 },
			 
		}
	}
</script>

<style>
page{
	background-color: #F9F9F9;
}
.right{
	margin-right: 0;
}

.recharge-header-nav {
    height: 52rpx;
    border-bottom: 4rpx solid #fff;
    color: #333333;
	font-size: 28rpx;
}

.recharge-header-nav-active {
    border-bottom: 4rpx solid #EB1615;
    color: #EB1615;
}

.new-balance-top{
	margin: 20rpx auto 0 auto;
	width: 700rpx;
	height: 208rpx;
	background: #FB503D;
	border-radius: 6rpx;
	position: relative;
}

.new-balance-top-left{
	position: absolute;
	top: 50rpx;
	left: 50rpx;
}

.new-balance-top-text{
	font-size: 24rpx;
	color: #FBE4E2;
	margin-bottom: 12rpx;
	line-height: 33rpx;
}
.new-balance-top-price{
	font-size: 48rpx;
	font-weight: bold;
	color: #FFFFFF;
	line-height: 67rpx;
}

.new-balance-top-right{
	position: absolute;
	top: 50rpx;
	right: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.new-balance-top-view{
	width: 116rpx;
	height: 46rpx;
	border-radius: 3rpx;
	border: 1px solid #FFFFFF;
	font-size: 24rpx;
	color: #FFFFFF;
	line-height: 33rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10rpx;
}

.balance-content {
    padding-top: 0rpx;
    padding-bottom: 30rpx;
}

.new-balance-content-li{
	border: 1px solid #FFFFFF;
	width: 210rpx;
	height: 272rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 10rpx 0px rgba(222, 222, 222, 0.5);
	border-radius: 6px;
	position: relative;
	overflow: hidden;
	margin-bottom: 26rpx;
}
.new-balance-content-li-active {
    border: 1px solid #EC1815;
	width: 210rpx;
	height: 272rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 10rpx 0px rgba(222, 222, 222, 0.5);
	border-radius: 6px;
	position: relative;
	overflow: hidden;
	margin-bottom: 26rpx;
}

.new-balance-content-give {
    padding-top: 50rpx;
    text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	color: #666666;
	line-height: 42rpx;
	z-index: 10;
	position: absolute;
	right: 70rpx;
}
.new-balance-content-price-active{
	color: #EC1815;
	font-size: 36rpx;
	font-weight: bold;
	line-height: 50rpx;
	z-index: 10;
	position: absolute;
	text-align: center;
	width: 208rpx;
	top: 125rpx;
}

.new-balance-content-price {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    line-height: 50rpx;
    z-index: 10;
    position: absolute;
    text-align: center;
    width: 210rpx;
    top: 125rpx;
}

.new-balance-center-img{
	position: absolute;
	text-align: center;
	top: 50rpx;
	right: 26rpx;
	z-index: 9;
	width: 86rpx;
	height: 112rpx;
}
.new-balance-img{
	position: absolute;
	text-align: center;
	bottom: 0rpx;
	right: 0rpx;
	z-index: 9;
	width: 52rpx;
	height: 50rpx;
}

.new-balance-bottom{
	height: 42rpx;
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
	line-height: 42rpx;
}

.new-balance-input{
    width: 682rpx;
    height: 60rpx;
    border-bottom: 2rpx solid #D2D2D2;
    /* background-color: #FFF; */
    margin-bottom: 16rpx;
	margin-top: 20rpx;
}

.new-balance-input-left {
    font-size: 26rpx;
    font-weight: bold;
    margin: 4rpx 10rpx 0 0rpx;
}

.new-balance-input-input {
    height: 50rpx;
    font-size: 26rpx;
    width: 592rpx;
}

.balance-view{
	width: 660rpx;
	height: 80rpx;
	background: #EC1815;
	border-radius: 40rpx;
	font-size: 30rpx;
	color: #FFFFFF;
	line-height: 42rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 80rpx auto 0 auto;
}

.new-recharge-exchange {
    margin: 80rpx auto 26rpx auto;
	width: 660rpx;
	height: 80rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
}

.new-recharge-explain {
    text-align: center;
    margin-bottom: 86rpx;
	font-size: 20rpx;
	color: #AAAAAA;
}
</style>
