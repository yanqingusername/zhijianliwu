<template>
	<view>
		<!-- 头部 -->
		<view class="shop-header member-header template-header">
			<view class="member-kong"></view>
			<!-- 背景图 -->
			<image class="shop-header-background template-header member-img" src="https://zhijianlw.com/static/web/img/my-top.jpg" mode="" lazy-load="true"></image>
			<!-- <view class="my-nav"></view> -->
			<!-- 信息 -->
		     <view class="shop-interstall margin-auto flex">
		         <view @click="$buttonClick(deta)" class="template-interstall flex-vertically "><image class="template-interstall-img member-right" src="../../static/my-right.png" mode=""></image>会员中心</view>
			</view>
		</view>
		
		<swiper :indicator-dots="false" :autoplay="false"  :duration="1000" style="height: 1500rpx;margin-top: -214rpx;" :current ="current">
			<swiper-item v-for="(item,index) in list" :key="index">
				<!-- 普通会员-->
				<view v-if="item.level == 1">
				  <!-- <view> -->  
					<!-- 内容 -->  
					<view class="member-content" >
					   <image class="member-content-background" src="https://zhijianlw.com/static/web/img/putong.jpg" mode="" lazy-load="true"></image>
					   <view class="member-content-header flex">
						   <view class="member-portrait"><image class="img" :src="$utils.imageUrl(head_img)" mode=""></image></view>
						   <view>
							   <view class="member-name">{{item.name}}</view>
							    <view class="member-grade flex-vertically">
							        <view class="member-grade-img"><image class="img" src="../../static/putong-top.png" mode=""></image></view>
							        <view class="member-grade-alt">{{item.level_name}}</view>
							    </view>
						   </view> 
					   </view>
					   <view class="member-content-btm flex-between">
						   <view class="member-content-btm-alt" style="color: #CA627D;" v-if="level>=1">已激活,长期有效</view>
						   <view class="member-content-btm-alt" style="color: #CA627D;" v-else>未激活</view>
						   <view class="member-content-btm-number">NO.{{no}}</view>
					   </view>
				   </view>
				   <!-- 描述-->
				    <view class="member-btm" style="margin: 56rpx auto 0rpx auto;height:524rpx;">
				   			   <rich-text class="member-btm-li" :nodes="ordinary.desc"></rich-text> 
				   			 <!--  <view class="member-btm-h2">普通会员权益</view>
				   			   <view class="member-btm-li flex" v-for="(item,index) in ordinary" :key="index"><view class="member-btm-number">{{item.left}}</view><view class="member-btm-alt">{{item.right}}</view></view> -->
				    </view>
					<!-- 按钮 -->
				    <view class="member-button" @click="button" :data-level_card_id = "ordinary.id"><button type="button">¥{{ordinary.money}}/元  购买会员权益</button></view>
					
				</view>
				
				<!-- 指间会员 -->
				 <view v-else-if="item.level == 2">
				 <!-- <view> -->
					 <view class="member-content" >
				 			   <image class="member-content-background" src="https://zhijianlw.com/static/web/img/zhijian.jpg" mode="" lazy-load="true"></image>
				 			   <view class="member-content-header flex">
				 				   <view class="member-portrait"><image class="img" :src="$utils.imageUrl(head_img)" mode=""></image></view>
				 				   <view>
				 					   <view class="member-name fingertip-name">{{name}}</view>
				 					    <view class="member-grade flex-vertically fingertip-grade">
				 					        <view class="member-grade-img"><image class="img" src="../../static/fingertip.png" mode=""></image></view>
				 					        <view class="member-grade-alt fingertip-alt">指间会员</view>
				 					    </view>
				 				   </view> 
				 			   </view>
				 			   <view class="member-content-btm flex-between">
				 				   <view class="member-content-btm-alt" style="color: #CA627D;" v-if="level>=2">已激活,长期有效</view>
				 				   <view class="member-content-btm-alt" style="color: #CA627D;" v-else>未激活</view>
				 				   <view class="member-content-btm-number fingertip-btm-number">NO.{{no}}</view>
				 			   </view>
				 </view>
				 <!-- 描述 -->
				 <view class="member-btm"  style="margin: 56rpx auto 0rpx auto;height:524rpx;" >
					 <rich-text class="member-btm-li" :nodes="finger.desc"></rich-text> 
				 		<!-- <view class="member-btm-h2">指间会员权益</view> -->
				 		<!-- <view class="member-btm-li flex" v-for="(item,index) in finger" :key="index"><view class="member-btm-number">{{item.left}}</view><view class="member-btm-alt">{{item.right}}</view></view> -->
				 </view>
				 <!-- 按钮 -->
				 <!-- <view class="member-button member-button-type orange"><button type="button">分享{{finger.people}}人获得会员权益</button></view> -->
				 <view class="member-button member-button-type" @click="button"   v-if="level<2" :data-level_card_id = "finger.id"><button type="button">¥{{finger.money}}/元  购买会员权益</button></view>
				</view>
				
				
				<!-- plus会员 -->
				 <view   v-else-if="item.level == 3">
				 <!-- <view> -->
					 <view class="member-content">
				 			   <image class="member-content-background" src="https://zhijianlw.com/static/web/img/plus.jpg" mode=""></image>
				 			   <view class="member-content-header flex">
				 				   <view class="member-portrait"><image class="img" :src="$utils.imageUrl(head_img)" mode=""></image></view>
				 				   <view>
				 					   <view class="member-name plus-name">{{name}}</view>
				 					    <view class="member-grade flex-vertically plus-grade">
				 					        <view class="member-grade-img"><image class="img" src="../../static/pluss.png" mode=""></image></view>
				 					        <view class="member-grade-alt plus-alt">plus会员</view>
				 					    </view>
				 		   </view> 
				 			   </view>
				 			   <view class="member-content-btm flex-between">
				 				   <view class="member-content-btm-alt" style="color: #FFF;" v-if="level>=3">已激活,长期有效</view>
				 				   <view class="member-content-btm-alt" style="color: #FFF;" v-else>未激活</view>
				 				   <view class="member-content-btm-number plus-btm-name">NO.{{no}}</view>
				 			   </view>
				 </view>
				 <!-- 描述 -->
				 <view class="member-btm" style="margin: 56rpx auto 0rpx auto;height:524rpx;" >
					 <rich-text class="member-btm-li" :nodes="plus.desc"></rich-text> 
				 		<!-- <view class="member-btm-h2">plus会员权益</view> -->
				 		<!-- <view class="member-btm-li flex" v-for="(item,index) in plus" :key="index"><view class="member-btm-number">{{item.left}}</view><view class="member-btm-alt">{{item.right}}</view></view> -->
				 </view>
				 <!-- 按钮 -->
				 <view class="member-button member-button-type" @click="button"  v-if="level<3" :data-level_card_id = "plus.id"><button type="button">¥{{plus.money}}/元  购买会员权益</button></view>
				</view>
				
				<!-- 企业会员 -->
				 <view  v-else-if="item.level == 4" >
				 <!-- <view> -->
					 <view class="member-content">
				 			   <image class="member-content-background" src="../../static/qiye.jpg" mode=""></image>
				 			   <view class="member-content-header flex">
				 				   <view class="member-portrait"><image class="img" :src="$utils.imageUrl(head_img)" mode=""></image></view>
				 				   <view>
				 					   <view class="member-name enterprise-name">{{name}}</view>
				 					    <view class="member-grade flex-vertically enterprise-grade">
				 					        <view class="member-grade-img"><image class="img" src="../../static/enterprise.png" mode=""></image></view>
				 					        <view class="member-grade-alt enterprise-alt">企业会员</view>
				 					    </view>
				 				   </view> 
				 			   </view>
				 			   <view class="member-content-btm flex-between">
				 				   <view class="member-content-btm-alt" style="color: #FFF;" v-if="level>=4">已激活,长期有效</view>
				 				   <view class="member-content-btm-alt" style="color: #FFF;" v-else>未激活</view>
				 				   <view class="member-content-btm-number enterprise-btm-number">NO.{{no}}</view>
				 			   </view>
				 </view>
				  <!-- 企业会员 -->
				  <view class="member-btm" style="margin: 56rpx auto 0rpx auto;height:524rpx;" >
					  <rich-text class="member-btm-li" :nodes="enterprise.desc"></rich-text> 
				  		<!-- <view class="member-btm-h2">企业会员权益</view> -->
				  		<!-- <view class="member-btm-li flex" v-for="(item,index) in enterprise" :key="index"><view class="member-btm-number">{{item.left}}</view><view class="member-btm-alt">{{item.right}}</view></view> -->
				  </view>
				  <!-- 企业会员 -->
				  <view class="member-button member-button-type orange"   v-if="level<4" @click="$buttonClick(apply)" ><button type="button">申请成为企业会员</button></view>
				  <view class="member-button member-button-type"  v-if="level<4" @click="button" :data-level_card_id = "enterprise.id"><button type="button">¥{{enterprise.money}}/元  购买会员权益</button></view>
				</view>
			</swiper-item>
	

		</swiper>
	   

		 
	     

		 
	</view>  
</template>

<script>
	import MD5  from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	export default {
		data() {
			return {
				ip:'',
				level:'',
				head_img:'',
				name:'',
				// 普通会员
				ordinary:[],
				// 指尖会员
				finger:[],
				// plus会员
				plus:[],
				// 企业会员
				enterprise:[],
				content:'',
				display:false,
				current:'',
				list:[],
				no:'',
				timeStamp:"",
				nums:'',
				outTradeNo:''
			}
		},
		onLoad:function(){
		    this.no = uni.getStorageSync('NO')
			this.level = uni.getStorageSync('level');
			this.head_img = uni.getStorageSync('head_img');
			this.name = uni.getStorageSync('name');
			
			if(uni.getStorageSync('level') > 3){
				this.current =2
			}else{
				console.log('小于3')
				this.current = uni.getStorageSync('level')-1;
			}
			console.log(this.current)
			
			const that = this;
			
			this.level = uni.getStorageSync('level');
			this.head_img = uni.getStorageSync('head_img');
			this.name = uni.getStorageSync('name');
			
			var data = '{}'; 
			var action = 'get_level_card';
								  	  
			 this.$utils.post(action,data).then(res=>{
				 console.log(res)
				 
				 for(let i in res.rs){
					 
					 // 价格
					 let float = res.rs[i].money.toString().replace(/\d+\.(\d*)/,"$1");
					  if(float == '00'){
						  res.rs[i].money =  parseInt(res.rs[i].money);
					  }
					 
					 
					 if(res.rs[i].level == 1){
						 res.rs[i].level_name = '普通会员';
					 }else if(res.rs[i].level == 2){
						 res.rs[i].level_name = '指间会员';
					 }else if(res.rs[i].level == 3){
						 res.rs[i].level_name = 'plus会员';
					 }else if(res.rs[i].level == 4){
						 res.rs[i].level_name = '企业会员';
					 }else if(res.rs[i].level == 5){
						 res.rs[i].level_name = '合作伙伴';
					 }
				 }
				 
				 
				 this.list = res.rs 
				 
				 // 普通会员
				   this.ordinary = res.rs[0];
				 // 指间会员
				   that.finger = res.rs[0];
				//  plus会员
				   that.plus =  res.rs[1];
				//  企业会员
				  that.enterprise = res.rs[2];
			 })
			 
			 
			 var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
			 
			 var nums = "";
			 
			 for (var i = 0; i < 32; i++) {			0.
			 
			 
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
							 					  
				// this.appid = 'EW_N0810019757'; 
				// this.key = 'a7f802950ad9b174839391048b770253';
				// this.merchantCode = 'EW_N7058517273';
			})
		},
		onShow:function(){
			if(this.outTradeNo){
				// this.chaxun();
			}
		},
		methods: {
			// 二维码
			code:function(e){
				this.display = false
			},
			// 支付
			button:function(e){
				
				            let level_card_id = e.currentTarget.dataset.level_card_id;
							let id = uni.getStorageSync('id');
							// 权益卡id  level_card_id
							// 支付方式
							let recharge_way = '微信';  
							let data = '{"memberid":"'+id+'","level_card_id":"'+level_card_id+'","recharge_way":"'+recharge_way+'"}';
							console.log(data)
							let action = 'buy_level_card';
										
							this.$utils.post(action,data).then(res=>{ 
								console.log('会员充值',res)
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
								  this.notifyUrl  = 'http://zhijianlw.com/api.php/index/set_agent_level_up?serial_number=' + res.serial_number
								  
								  // this.xiaochengxu()	
								  this.ipp();
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
								
								
							})  
							
			},
			// 微信支付
			wx:function(e){
			  var that = this;
			  let ip = this.ip;
			  let openid = this.openid;
			  var data = '{"serial_number":"'+that.outTradeNo+'","ip":"'+ip+'","openid":"'+openid+'","type":"member"}';
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
				  // let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
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
					  
					  // 微信支付成功回调
					  console.log(res)
					  uni.request({
					      url: 'https://zhijianlw.com/api.php/index/set_agent_level_up', 
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
					      },
					  })
										
				      
				   
				         uni.showModal({
				  		   title:'微信支付',
				  		   content:'支付成功',
				  		   cancelText:'首页',
				  		   confirmText:'个人中心',
				  		   success(res){
				  			   if(res.confirm){
				  				   console.log('个人中心')
				  				     uni.switchTab({
				  				     	url:'../personal/personal'
				  				     })
				  			   }else if(res.cancel){
				  				   console.log('首页')
				  				   
				  				   	uni.switchTab({
				  				   		url:'../index/index'
				  				   	})
				  			   }  
				  		   }
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
			xiaochengxu:function(e){
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
				// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
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
									
									
									uni.hideLoading();
									
									wx.requestPayment({
									  timeStamp: res.data.timeStamp,
									  nonceStr: res.data.nonceStr,
									  package: res.data.payPackage,
									  signType: res.data.signType,
									  paySign: res.data.paySign,
									  success (res) {
										  
									   // 一级页面用switchTab   二级页面用redirectTo
									     
										 uni.switchTab({
										 	url:'../personal/personal'
										 })
									   
									   
									   //     wx.showModal({
											 //   title:'微信支付',
											 //   content:'支付成功',
											 //   cancelText:'个人中心',
											 //   confirmText:'再次充值',
											 //   success(res){
												//    if(res.confirm){
												// 	   console.log('再次充值')
												//    }else if(res.cancel){
												// 	   console.log('个人中心')
												// 	   uni.switchTab({
												// 	   	url:'../personal/personal'
												// 	   })
												//    }
												   
											 //   }
										  //  })	  
									  },
									  fail (res) {
										  console.log(res)
									  }
									})
									
									
							    },
							})
			},
			chaxun:function(e){
							
								let arr=[];
								 
								 
								const date = {
											// 合作方标识
											  appId: 'appId=' + this.appid,
											// 随机数
											   random:'random='+ this.nums,
											// 门店编号
											   merchantCode:'merchantCode=' +  this.merchantCode,
											// 商户订单号
											   outTradeNo:'outTradeNo='+ this.outTradeNo,
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
											  appId:'appId=' + this.appid,
											//  签名
											   sign:'sign=' + sign,
											// 随机数
											   random:'random=' + this.nums,
											// 门店编号
											   merchantCode:'merchantCode=' +  this.merchantCode,
											// 商户订单号
											   outTradeNo:'outTradeNo=' + this.outTradeNo,
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
											    url: 'https://api.liantuofu.com/open/pay/query', 
											    data:string,
											    header: {
											        'content-type' : "application/x-www-form-urlencoded" //自定义请求头信息
											    }, 
												method:'POST',    
												// 成功回调
											    success: (res) => {
														console.log('订单状态',res.data)
														
														
														
														
														  if(res.data.msg == "订单已支付"){
														   
														   wx.showToast({
														   	title:'开通成功',
														   	icon:'success',
														   	success: (res) => {
														   	   uni.setTimeout(function(e){
																   uni.reLaunch({
																	   url:'../personal/personal'
																   })
															   },1500)									
														   	}
														   })
															 
														  }
														
														
													  }
																								  
												})
							  
			},
			// 路由
			  // 返回上一层
			   deta:function(e){
			 	   uni.navigateBack({
					   delta: 1
			 	   })
			   },
			   apply:function(e){
				   uni.navigateTo({
				   	url:'../Apply/Apply'
				   })
			   },
			   
			   
			   
		}
	}
</script>

<style>
.member-btm-li{
	font-size: 28rpx;
	line-height: 0rpx;
}
.member-button {
	width: 448rpx;
}
.member-button button{
	width: 448rpx;
}
.member-content{
	margin-top: 0!important;
}
</style>
