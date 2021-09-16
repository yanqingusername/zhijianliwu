<template>
	<view>
	    <view class="balance-header">
			<!-- 总金额 -->
			<view class="balance-top">
				<view class="balance-top-company">总金额(元)</view>
				<view class="balance-top-price">{{balanc}}</view>
			</view>
			<view class="balance-query">
			<!-- 充值查询  充值卡查询 -->
				<view class="balance-query-content flex-between margin-auto flex-vertically">
					<view class="balance-query-li flex-vertically" @click="$buttonClick(left)"><image src="https://zhijianlw.com/static/web/img/balance-left.png" mode=""></image>收支明细</view>
					<view class="balance-query-line"></view>
					<view class="balance-query-li flex-vertically" @click="$buttonClick(right)"><image src="https://zhijianlw.com/static/web/img/balance-right.png" mode=""></image>充值卡充值</view>
				</view>
			</view> 
		</view>	
		<view class="balance-page">
			<!-- 充值 -->
			<view class="balance-content flex-between-wrap">
				 
				<view class="balance-content-li"  :class="[number==index?'balance-content-li-active':'']" v-for="(item,index) in balance" :key="index" :data-id="item.id" :data-index="index+1" @click="bala">
					<!-- 充 --> 
					<view class="balance-content-price">{{item.recharge_money}}元</view>
					<!-- 送 -->
					<view class="balance-content-give">送{{item.give_money}}</view>
					<!-- 圆圈 -->
					<view class="balance-content-circular" :class="[number==index?'balance-content-circular-active':'']"></view>
				</view>
			</view>
			<!-- 自定义充值 -->
			<view class="balance-bottom flex-vertically">
				<view class="balance-bottom-left">¥</view>
				<input class="balance-bottom-input" @input="price" type="text" placeholder="请输入自定义充值金额">
			</view>
			<!-- 说明 -->
			<view class="balance-explain">说明:自定义充值金额不享受充值赠送活动</view>
			<!-- 立即充值 -->
		</view>
		
		
		<button class="balance-button" @click="button">立即充值</button>
		
		
		
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
				nums:''
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
			if(this.outTradeNo){
				this.chaxun();
			}
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
					  this.notifyUrl  = config.URL+'api.php/index/set_agent_recharge?serial_number=' + res.serial_number
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
			  	  var serial_number = res.rs.serial_number;
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
			  	  let stringSignTemp = stringA + '&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv';
			  	    
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
			  	          url: config.URL+'api.php/index/set_agent_recharge', 
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
							uni.showToast({
								title:'充值成功',
							})
							that.login();
			  	          },
			  	      })
					  	
			  	    },
			  	    fail (res) {
			  			uni.hideLoading(); 
			  	  	  console.log(res)
			  	  	  uni.showToast({
			  	  	  	title:'支付失败',
			  	  		icon:'none'
			  	  	  })
			  		  that.commodity = ''
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
				 this.number = index;
				 this.money = 0;
			   },
			  // 选择框
			 price:function(e){
				 this.number = '1000'
				 this.money = e.detail.value;
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
			 
		}
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
.right{
	margin-right: 0;
}
</style>
