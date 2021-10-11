<template>
	<view>
		<view class="my-header">
			<!-- <view class="owm-index-status-bar" :style="'height:'+ statusBarHeight+'px'"></view> -->
			<image class="my-background" src="http://zhijianlw.com//static/web/img/20200904161911.png" mode=""></image>
			<!-- <view class="my-nav" :style="'height:'+nav+'px'"></view> -->
			<!-- 登录状态 -->
			<view class="my-header-interstall-sign flex margin-auto" v-if="sign.id">
				<image class="my-heade-sign-img" :src="sign.head_img" mode=""></image>
				<view>
				  <view class="flex my-header-introduce">
				  	<view class="my-hedaer-name">{{sign.name}}</view>
				  	<view class="my-header-grap"><image  class="my-crown" src="../../static/wangguan.jpg" mode=""></image>{{sign.level_name}}</view>
				  	<view class="my-header-sign my-header-sign1" @click="$buttonClick(opening)">立即开通></view>
				  </view>
				  <view class="my-header-interstall-sign-alt">开通会员可享更多会员权益</view>	
				</view>
			</view>
			<!-- 未登录状态 -->
			<view class="my-header-interstall flex margin-auto" v-else>
				<image class="my-header-img" src="https://zhijianlw.com/static/web/img/my-touxiang.jpg" mode=""></image>
				<view class="my-header-state">未登录</view>
				<view class="my-header-sign" @click="$buttonClick(signIn)">立即登录></view>
			</view>
			<!-- 钱包 -->
			<view class="my-header-wallet margin-auto  flex">
				<view class="my-header-wallet-li">
					<view class="my-header-wallet-price">¥{{sign.balance}}</view>
					<view class="my-header-wallet-type">充值余额(元)</view>
				</view>
				<view class="my-line"></view>
				<view class="my-header-wallet-li" >
					<view class="my-header-wallet-price">{{sign.zj_balance}}</view>
					<view class="my-header-wallet-type">指间币</view>
				</view>
				<view class="my-line"></view>
				<view class="my-header-wallet-li" @click="$buttonClick(count)" >
					<view class="my-header-wallet-price">{{topp}}</view>
					<view class="my-header-wallet-type">我的优惠券</view>
				</view>
			</view>
			<!-- 背景图 -->
		</view>
		
		<view style="margin-top:-76rpx;">
		
			<!-- 第一层 -->
			<view class="my-content flex-center margin-auto">
				<!-- <view class="my-content-ul flex-between"> -->
					<view class="my-content-li" @click="$buttonClick(balance)">
						<view class="my-content-li-img"><image class="img" src="../../static/my-chongzhi.png"  mode=""></image></view>
						<view class="my-content-li-text">充值中心</view>
					</view>
					<view class="my-content-li"  @click="$buttonClick(wallet)">
						<view class="my-content-li-img"><image class="img" src="../../static/my-qianbao.png"  mode=""></image></view>
						<view class="my-content-li-text">我的钱包</view>
					</view>
					<view class="my-content-li" >
						<view class="my-content-li-img"><image class="img" src="../../static/my-kefu.png"  mode=""></image></view>
						<view class="my-content-li-text">在线客服</view>
					</view>
					<view class="my-content-li" @click="$buttonClick(colloection)">
						<view class="my-content-li-img" style="position: relative">
							<image class="img" src="../../static/my-shoucang.png"  mode=""></image>
						<view class="my-number-right" @click="$buttonClick(colloection)">{{coll}}</view>
						</view>
						<view class="my-content-li-text">礼物收藏</view>
						
					</view>
					<button open-type="contact"></button>
				<!-- </view> -->
			</view>
			<!-- 下三层 -->
			
			
			<view class="my-comtent-bottom" style="margin-bottom: 28rpx;">
				
				<view class="my-comtent-bottom-ul flex-between" :class="[item.index==0?'border':'']">
					<view class="my-comtent-bottom-li" @click="$buttonClick(giftList)">
						<view class="my-comtent-bottom-img"><image  class="img" src="https://zhijianlw.com/static/web/img/liwu.png" lazy-load="true" mode=""></image></view>
						<view class="my-comtent-bottom-text">礼包</view>
					</view>
					
					<view class="my-comtent-bottom-li" @click="$buttonClick(shopList)">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-shopping-cart.png" mode=""
																	style="width: 130%;height: 130%;margin: -10%;"></image></view>
						<view class="my-comtent-bottom-text">购物车</view>
					</view>
					
					<view class="my-comtent-bottom-li"@click="$buttonClick(order)">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-caozuo.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">我的订单</view>
					</view>
					
					<view class="my-comtent-bottom-li"@click="$buttonClick(card)">
						<view class="my-comtent-bottom-img"><image  class="img" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/icon_recharge.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">兑换订单</view>
					</view>		
				</view>
			</view>	
			<view class="my-comtent-bottom">
				<view class="my-comtent-bottom-ul flex-between" :class="[item.index==0?'border':'']">
					<view class="my-comtent-bottom-li" @click="$buttonClick(exchange)">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-duihuan.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">充值卡</view>
					</view>
					
					<view class="my-comtent-bottom-li"@click="$buttonClick(opening)">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-huiyuan.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">会员中心</view>
					</view>
					
					<view class="my-comtent-bottom-li" @click="$buttonClick(friend)">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-my.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">我的好友</view>
					</view>
					<view class="my-comtent-bottom-li" @click="share">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-fenxiang.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">分享推荐</view>
					</view>
					
				</view>
				
				<view class="my-comtent-bottom-ul flex-between" :class="[item.index==0?'border':'']">
					<view class="my-comtent-bottom-li" @click="text" :data-index="0">
						<view class="my-comtent-bottom-img"><image  class="img" src="https://zhijianlw.com/static/web/img/liwu.png" lazy-load="true" mode=""></image></view>
						<view class="my-comtent-bottom-text">求个礼物</view>
					</view>
					<view class="my-comtent-bottom-li" @click="text" :data-index="1">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-caozuo.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">操作指南</view>
					</view>
					<view class="my-comtent-bottom-li" @click="text" :data-index="2">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-shangwu.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">商务合作</view>
					</view>
					<view class="my-comtent-bottom-li" @click="text" :data-index="3">
						<view class="my-comtent-bottom-img"><image  class="img" src="../../static/my-qiye.png" mode=""></image></view>
						<view class="my-comtent-bottom-text">企业服务</view>
					</view>
				</view>
			</view>
			<view style="line-height:42px;font-size:18px;width:696.52rpx;height:42px;margin:0 auto;margin-top: 20rpx;padding-left: 16rpx;" v-if="commody.length>0">专属推荐</view>
			<own-product-list :commody="commody" :state="none"></own-product-list>
		</view>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue";
	import btn  from "@/common/btn.js";
	export default {
		components:{
			"own-product-list": ownProductList
		},
		data() {
			return {
				sign:{
					balance:'0',zj_balance:'0'
				},
				sta:'',
				nav:'20',
				content:[
					{src:'../../static/my-chongzhi.png',text:'充值中心',},
					{src:'../../static/my-qianbao.png',text:'我的钱包'},
					{src:'../../static/my-kefu.png',text:'在线客服'},
					{src:'../../static/my-shoucang.png',text:'礼物收藏'},
				],
				bottom:[],
				topp:'0', 
				coll:'0',
				parent_member:'',
				dir:'',
				commody: [],
				pageIndex: 1,
				pageSize: 10
			} 
		},
		onShow:function(e){  
			 if(this.showa == 1){
				// 基本配置
				this.basic();
				// 基本信息
				this.login();
				// 收藏
				this.collection();
				// 优惠券
				this.coupon();
				// 海报
				this.haibao();
			 }else{
			 }
		},  
		onLoad:function(e){
			let that = this;
			var sign = uni.getStorageSync('sign')
			 if(sign){
				 console.log('登录状态',sign)
				 
				 let time = setTimeout(function(e){
				 	that.showa = 1;
				 	clearTimeout(time)
				 },100)
				 
				 // 基本配置
				  this.basic();
				  // 基本信息
				  this.login();
				  // 收藏
				  this.collection();
				  // 优惠券
				  this.coupon();
				  // 海报
				  this.haibao();
				 this.sta = '200';
			 }else{
				 this.sta = '0';
			 }
			 
			 uni.getSystemInfo({
			 	
			 	success: res=>{
			 		 // 导航高度
			 		this.nav = res.statusBarHeight 
			 		
			 	}
			 })
			var data = JSON.stringify({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				member_level: uni.getStorageSync("level"),
			});
			var action = 'get_tuijian_goods';
			
			this.$utils.post(action, data).then(res => {
				if (res.sta == 1) {
					uni.stopPullDownRefresh();
					console.log('4.推荐商品列表', res.rs)
					this.commody = res.rs;
					this.pageIndex++;
				}
			})
		}, 
		// 下拉加载更多
		onReachBottom (){
			console.log("下一页");
			var data = JSON.stringify({
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				member_level: uni.getStorageSync("level"),
			});
			var action = 'get_tuijian_goods';
			this.$utils.post(action, data).then(res => {
				if (res.sta == 1) {
					uni.stopPullDownRefresh();
					console.log('4.推荐商品列表', res.rs)
					this.commody = this.commody.concat(res.rs);
					this.pageIndex++;
				}
			})
		},
		methods: {
	    // 引用
		  // 海报
		  haibao:function(e){
			  let parent_member = uni.getStorageSync('id');
			  this.parent_member = parent_member;
			  let data = '{"scene":"'+parent_member+'","page":"pages/signin/signin"}';
			  console.log(data)
			  let action = 'get_haibao';
			  				 				  
			  this.$utils.post(action,data).then(res=>{
			  					    console.log('生成海报',res)
			  						this.dir = res.dir;
			  					 })
		  },
		  // 优惠券
		  coupon:function(e){ 	
			  let that = this;
			  	this.level = uni.getStorageSync('level')
			  	let id = uni.getStorageSync('id');
			  	var data = '{"memberid":"'+id+'"}';
			  	var action = 'get_coupon_number_list';
			  	let top = [];
			  	this.$utils.post(action,data).then(res=>{
			  		console.log('我的优惠券',res)
			  		
			  		let times = new Date().getTime()
			  		
					
			  		for(let i in res.rs){
			  			

			  				// 开始时间  res.rs[i].coupon_type_info.begin_time
			  				// 结束时间  res.rs[i].coupon_type_info.end_time  
			  				// 当前时间  new Date().getTime()   times
			  				
			  				 if(res.rs[i].coupon_type_info.end_time*1000 - times>0){
			  					top.push(res.rs[i])
			  				}
			  				 
			  				
			  		} 
			  		
						that.topp = top.length;
					
			  	})
				
				
			  
		  },
		  // 收藏
		  collection:function(e){
			  let id = uni.getStorageSync('id')
			  let data = '{"memberid":"'+id+'"}';
			  let action = 'get_goods_collect';
			  	  	  
			    this.$utils.post(action,data).then(res=>{
			  		console.log('收藏列表',res.rs.length)
					
						this.coll = res.rs.length		 
					  
			  		})
		  },
		    // 基本配置
			  basic:function(e){
				var data = '{}';
				var action = 'get_webconfig_wode';
							
				this.$utils.post(action,data).then(res=>{ 
					console.log('基本配置',res)
				})  
			  },
			  // 基本信息
			login:function (){
				
				var rawdata = this.Data;
				// openid
				var openid = uni.getStorageSync('openid');
					
					   //登录 
						var data = '{"wx_openid":"'+openid+'"}';
						console.log(data)
						var action = 'member_login';  
						 this.$utils.post(action,data).then(res=>{
							 console.log('基本信息',res.rs)
							 this.sign = res.rs;
							 uni.setStorageSync('NO',res.rs.NO)
							 // 全部
							 uni.setStorageSync('sign',res.rs)
							 // 会员id
							   uni.setStorageSync('id',res.rs.id)
							 // 会员昵称
							   uni.setStorageSync('name',res.rs.name)
							 // 会员唯一标识
							   uni.setStorageSync('keynum',res.rs.keynum)
							 // 会员性别
							   uni.setStorageSync('sex',res.rs.sex)
							 // 会员头像
							   uni.setStorageSync('head_img',res.rs.head_img)
							 // 会员级别
							   uni.setStorageSync('level_name',res.rs.level_name)
							   uni.setStorageSync('level',res.rs.level)
							 // 会员余额
							   uni.setStorageSync('balance',res.rs.balance)
							 // 会员指尖币余额
							   uni.setStorageSync('zj_balance',res.rs.zj_balance)
							 // 会员手机号
							  uni.setStorageSync('phone',res.rs.phone)
							  // 折扣
							  if(res.rs.discount_name==null||res.rs.discount_name==''){}else{
								uni.setStorageSync('discount_name',res.rs.discount_name)  
							  }
							  // 指间币
							  if(res.rs.zj_balance==null||res.rs.zj_balance==''){}else{
							  		uni.setStorageSync('zj_balance',res.rs.zj_balance)  
							  }
							  // 余额
							  if(res.rs.balance==null||res.rs.balance==''){}else{
							  		uni.setStorageSync('balance',res.rs.balance)  
							  }
							  
								
						 })
					
					
			},
		// 路由
			// 立即登录跳转
			signIn:function(e){
					uni.navigateTo({
						url:'../signin/signin'
					})
				
				
			},
			// 礼物收藏
			colloection:function(e){
				uni.navigateTo({
					url:'../Collection/Collection'
				})
			},
		    // 立即开通  会员中心
			opening:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../Member/Member'
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			// 充值中心
			balance:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../balance/balance'
					})
				}else{
                    uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			// 我的钱包
			wallet:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../wallet/wallet'
					})
				}else{
                   uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			// 我的优惠券
			count:function(e){ 
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../Coupon/Coupon'
					})
				}else{
                    uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			// 兑换中心
			exchange:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../balance/Recharge'
					})
				}else{
                   uni.navigateTo({
						url:'../signin/signin'  
					})
				}
			},
			// 分享推广
			share:function(e){  
				
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../Poster/Poster2?src=' + this.dir + '&parent_member=' + this.parent_member
					})
				}else{
				    uni.navigateTo({
						url:'../signin/signin'
					})
				}
				    
	
			},
			giftList: function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../order/order'
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
		    // 购物车
			shopList:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../shopList/shopList'
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			order: function(){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../orderList/orderList'
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			card: function(){
				
					uni.navigateTo({
						url:'../index-coupon/change'
						// url: '../index-coupon/ExchangeOrder' //新增需求  兑换订单列表页
					})
			},
			// 我的好友
			friend:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../Friends/Friends'
					})
				}else{
                    uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
		
			text:function(e){
				
				if(this.sta == 200){
					let index = e.currentTarget.dataset.index;
					// 求个礼物
					if(index==0){
						uni.navigateTo({
							url:'./gift'
						})
					}
					// 操作指南
					else if(index == 1){
						uni.navigateTo({
							url:'./guide'
						})
					}
					// 商务合作
					else if(index == 2){
						uni.navigateTo({
							url:'./cooperation'
						})
					}
					// 企业服务
					else if(index == 3){
						uni.navigateTo({
							url:'./service'
						})
					}
				}else if(this.sta == 0){
					wx.showToast({
						title:'请先登录',
						icon:'none'
					})
				}
			},
		   // 时间礼物 到店取货  扫一扫
			no:function(e){
				if(this.sta == '200'){
				   uni.showToast({
				    	title:'暂未开通',
				    	icon:"none",
				    	mask:'true',
				   })	
				}else{
					// uni.navigateTo({
					// 	url:'../signin/signin'
					// })
					wx.showToast({
						 title:'请先登录',
						 icon:'none'
					})
				}
			},
			// 推荐商品跳转
			details: function(e) {
				let index = e.currentTarget.dataset.index;
			
				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
		}
	}
</script>
 
<style>
 
 page{
	 background-color:#F5F5F5 ;
 }
 .my-number-right{
	 position: absolute;
	 left: 50%;
	 top: 50%;
	 font-size: 24rpx;
	 color: #585657;
	 transform: translateX(-50%) translateY(-50%);

 }
 .index-commodity-price{
	 line-height: 2em;
	 color: #E7143B;
	 font-size: 1.5em;
	 margin-left: 8rpx;
	 height: 2em;
	 overflow: hidden;
 }
</style>


