<template>
	<view>
		<view class="personal-header" :style="'height:' + (sign.level_name=='企业会员' ? '350': '424') + 'rpx;'">
			<!-- <image class="my-background" src="http://zhijianlw.com//static/web/img/20200904161911.png" mode=""></image> -->
			<image class="my-background" src="https://zhijianlw.com/static/web/img/icon_personal_bg.png" mode=""></image>
			<view class="my-nav" :style="'height:'+nav+'px'" v-if="fixed==0"></view>
			<view class="personal-header-interstall" v-if="fixed==0">
				<view class="personal-header-title">我的</view>
			</view>
			
			<view class="personal-header-fixed" v-if="fixed==1">
				<view class="my-nav" :style="'height:'+nav+'px'"></view>
				<view class="personal-header-interstall" >
					<view class="personal-header-title">我的</view>
				</view>
			</view>
			
			<!-- 登录状态 -->
			<view class="personal-center" :style="'margin-top:' + (fixed==1 ? '-2' : '22') +'rpx'">
				<view class="personal-center-left">
					<view v-if="sign.id">
						<view class="personal-sign-wangguan-view" v-if="sign.level_name=='企业会员'" @click="$buttonClick(openingMember)">
							<image class="personal-sign-img" :src="sign.head_img" mode=""></image>
							<image class="personal-sign-wangguan" src="https://zhijianlw.com/static/web/img/personal-sign-wangguan.png" mode=""></image>
						</view>
						<view v-else>
							<image class="personal-sign-img" :src="sign.head_img" mode=""></image>
						</view>
					</view>
					<view v-else>
						<image class="personal-sign-img" src="https://zhijianlw.com/static/web/img/my-touxiang.jpg" mode=""></image>
					</view>
					
					<view class="personal-center-name" v-if="sign.id">
						<view class="personal-sign-name">{{sign.name}}</view>
						<!-- <view class="personal-center-grap"><image class="personal-center-crown" src="../../static/wangguan.jpg" mode=""></image>{{sign.level_name}}</view> -->
					</view>
					<view class="personal-center-name" @click="$buttonClick(signIn)" v-else>
						<view class="personal-sign-name">登录/注册</view>
					</view>
				</view>
				
				<view class="personal-center-right">
					<view class="personal-center-right-li" @click="$buttonClick(balance)">
						<view class="personal-center-right-price">¥{{sign.balance}}</view>
						<view class="personal-center-right-type">余额</view>
					</view>
					<view class="personal-center-right-li" @click="$buttonClick(count)" >
						<view class="personal-center-right-price">{{topp}}</view>
						<view class="personal-center-right-type">优惠券</view>
					</view>
					<view class="personal-center-right-li" @click="$buttonClick(like)">
						<view class="personal-center-right-price">{{sign.article_collection_count || '0'}}</view>
						<view class="personal-center-right-type">喜欢</view>
					</view>
				</view>
			</view>
			
			<view class="personal-bottom" @click="$buttonClick(opening)" v-if="sign.level_name!='企业会员'">
				<image class="personal-bottom-img" src="https://zhijianlw.com/static/web/img/vip_08_03.png" mode=""></image>
			    <view class="personal-bottom-title">开通企业会员 预计省1263元/年</view>
				<view class="personal-bottom-view" v-if="numberMemberStatus == 0">立即申请</view>	
				<view class="personal-bottom-view" v-if="numberMemberStatus == 1">查看详情</view>	
			</view>
			<!-- 背景图 -->
		</view>
		
		<view class="personal-item margin-auto">
			<view class="personal-item-text">全部订单</view>
			<view class="personal-item-ul flex-between">
				<view class="personal-item-li" @click="order(1)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_01.png"  mode=""></image></view>
					<view class="personal-item-li-text">我购买的</view>
				</view>
				<view class="personal-item-li" @click="order(2)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_02.png"  mode=""></image></view>
					<view class="personal-item-li-text">我送出的</view>
				</view>
				<view class="personal-item-li" @click="order(3)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_03.png"  mode=""></image></view>
					<view class="personal-item-li-text">我收到的</view>
				</view>
				<view class="personal-item-li" @click="$buttonClick(colloection)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_04.png"  mode=""></image></view>
					<view class="personal-item-li-text">兑换订单</view>
				</view>
			</view>
		</view>
		
		<view class="personal-item margin-auto">
			<view class="personal-item-text">我的服务</view>
			<view class="personal-item-ul flex-between">
				<view class="personal-item-li" @click="$buttonClick(balanceRecharge)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_05.png"  mode=""></image></view>
					<view class="personal-item-li-text">余额充值</view>
				</view>
				<view class="personal-item-li"  @click="$buttonClick(exchange)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_06.png"  mode=""></image></view>
					<view class="personal-item-li-text">兑换中心</view>
				</view>
				<button class="personal-item-li" open-type="contact" @click="$buttonClick(trackClick)">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_07.png"  mode=""></image></view>
					<view class="personal-item-li-text">我的客服</view>
				</button>
				<view class="personal-item-li" @click="share">
					<view class="personal-item-li-img"><image class="item-li-img" src="https://zhijianlw.com/static/web/img/icon_personal_08.png"  mode=""></image></view>
					<view class="personal-item-li-text">分享推荐</view>
				</view>
			</view>
		</view>
		
		<view class="personal-product" v-if="commody.length>0">
			<view class="personal-line"></view>
			<view class="personal-product-title">专属推荐</view>
			<view class="personal-line"></view>
		</view>
		<own-product-list :commody="commody" :state="none"></own-product-list>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue";
	import btn  from "@/common/btn.js";
	import sr from 'sr-sdk-wxapp';
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
				bottom:[],
				topp:'0', 
				coll:'0',
				parent_member:'',
				dir:'',
				commody: [],
				pageIndex: 1,
				pageSize: 10,
				fixed: 0,
				numberMemberStatus: 0,
				shareInfo: ''
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
				
				this.getMemberStatus();
				
				// 优惠券
				this.coupon();
				// 海报
				this.haibao();
			 }else{
			 }
			 // 腾讯有数
			 if(this.commody && this.commody.length > 0){
			 	for (var i = 0; i < this.commody.length; i++) {
			 		let item = this.commody[i];
			 		sr.track('expose_sku_component',
			 			{
			 			   "sku": {
			 				 "sku_id": item.sku+"", // 若商品无sku_id时，可传spu_id信息
			 				 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
			 			   },
			 			   "spu": {
			 					"spu_id": item.sku+"", // 若商品无spu_id时，可传sku_id信息
			 					"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
			 				},
			 			   "primary_image_url": item.head_img
			 			})
			 	}
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
				  
				  this.getMemberStatus();
				  
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
					
					// 腾讯有数
					if(res.rs && res.rs.length > 0){
						for (var i = 0; i < res.rs.length; i++) {
							let item = res.rs[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku+"", // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.sku+"", // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
				}
			})
			
			// 分享链接
			var datashare = JSON.stringify({type:"4"});
			var actionshare = 'get_share_img';
			this.$utils.post(actionshare, datashare).then(res => {
				this.shareInfo = res.rs;
			});
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
					
					// 腾讯有数
					if(res.rs && res.rs.length > 0){
						for (var i = 0; i < res.rs.length; i++) {
							let item = res.rs[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku+"", // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.sku+"", // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
				}
			})
		},
		onPageScroll: function(e) {
			if (e.scrollTop > 70) {
				this.fixed = 1
			} else if (e.scrollTop < 70) {
				this.fixed = 0
			}
		},
		onShareAppMessage: function(e) {
		
			// 腾讯有数
			sr.track('page_share_app_message', {
			  "from_type": "menu",
			  "share_title": "指间礼物",
			  "share_path": '/pages/personal/personal',
			  "share_image_url": '',
			  "share_to": "friends",
			})
		
			return {
				// title:this.alt.goodsname,
				title: this.shareInfo.title || '我发现了一个不错的送礼平台～',
				imageUrl: this.shareInfo.share_img || 'https://zhijianlw.com/static/web/img/share_img.png',
				path: this.shareInfo.url || '/pages/index/index',
				// desc:'指间送礼',
			}
		
		},
		methods: {
			trackClick:function(e){
				//腾讯有数
				sr.track('start_consult', {
				  "action_type": "consult_online",
				})
			},
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
			  // let that = this;
			  // 	this.level = uni.getStorageSync('level')
			  // 	let id = uni.getStorageSync('id');
			  // 	var data = '{"memberid":"'+id+'"}';
			  // 	var action = 'get_coupon_number_list';
			  // 	let top = [];
			  // 	this.$utils.post(action,data).then(res=>{
			  // 		console.log('我的优惠券',res)
			  		
			  // 		let times = new Date().getTime()
			  		
					
			  // 		for(let i in res.rs){
			  			

			  // 				// 开始时间  res.rs[i].coupon_type_info.begin_time
			  // 				// 结束时间  res.rs[i].coupon_type_info.end_time  
			  // 				// 当前时间  new Date().getTime()   times
			  				
			  // 				 if(res.rs[i].coupon_type_info.end_time*1000 - times>0){
			  // 					top.push(res.rs[i])
			  // 				}
			  				 
			  				
			  // 		} 
			  		
					// 	that.topp = top.length;
					
			  // 	})
				
				let that = this;
				let action = "get_coupon_number_list";
				let controller = 'coupon';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					memberid: memberid,
					status: 1
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.topp = res.rs.length;
					}
				})
				
			  
		  },
		  getMemberStatus(){
			  let that = this;
			  let action = "get_member_audit_status";
			  let controller = 'member';
			  let memberid = uni.getStorageSync('id')
			  let data = JSON.stringify({
			  	memberid: memberid
			  });
			  
			  this.$utils.postNew(action,data,controller).then(res=>{
			  	if(res.sta == 1){
			  		if(res.rs.status == 1){
			  			
			  		} else if(res.rs.status == 2){
			  			this.numberMemberStatus = 1;
			  		} else if(res.rs.status == 3){
			  			this.numberMemberStatus = 1;
			  		} else if(res.rs.status == 4){
			  			
			  		} else {
						this.numberMemberStatus = 0;
					}
			  	}
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
			// 喜欢
			like:function(e){
				uni.navigateTo({
					url:'../Post/PostLike'
				})
			},
			// 礼物收藏
			colloection:function(e){
				uni.navigateTo({
					// url:'../Collection/Collection' // 礼物收藏
					url:"../index-coupon/ExchangeOrder" //新需求 兑换订单列表页
				})
			},
		    // 立即开通  会员中心
			opening:function(e){
				if(this.sta == '200'){
					let that = this;
					let action = "get_member_audit_status";
					let controller = 'member';
					let memberid = uni.getStorageSync('id')
					let data = JSON.stringify({
						memberid: memberid
					});
					
					this.$utils.postNew(action,data,controller).then(res=>{
						if(res.sta == 1){
							if(res.rs.status == 1){
								
							} else if(res.rs.status == 2){
								uni.showToast({
									title: res.rs.msg,
									icon: 'none'
								})
							} else if(res.rs.status == 3){
								uni.showToast({
									title: res.rs.msg,
									icon: 'none'
								})
							} else if(res.rs.status == 4){
								
							} else {
								uni.navigateTo({
									url:'../Member/Member?typestring=1'  //开通会员页面
									// url: '../Apply/Apply'  //企业会员申请
									// url: '../../pagesub/AllCovers/AllCovers' // 全部封面
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			openingMember:function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../Member/Member?typestring=2'  //开通企业会员成功页面
						// url: '../Apply/Apply'  //企业会员申请
						// url: '../../pagesub/AllCovers/AllCovers' // 全部封面
					})
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					})
				}
			},
			// 余额
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
			// 余额充值
			balanceRecharge:function(e){
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
						url:'../index-coupon/index-coupon'
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
			order: function(e){
				if(this.sta == '200'){
					uni.navigateTo({
						url:'../orderList/orderList?nav='+ e
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
			onPullDownRefresh(){
				this.pageIndex = 1;
				let that = this;
				var sign = uni.getStorageSync('sign')
				if(sign){
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
					
					this.getMemberStatus();
					// 优惠券
					this.coupon();
					// 海报
					this.haibao();
					this.sta = '200';
				}else{
					this.sta = '0';
				}
				
				var data = JSON.stringify({
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					member_level: uni.getStorageSync("level"),
				});
				var action = 'get_tuijian_goods';
				this.$utils.post(action, data).then(res => {
					if (res.sta == 1) {
						setTimeout(()=>{
							uni.stopPullDownRefresh();
						}, 500)
						this.commody = res.rs;
						this.pageIndex++;
						
						// 腾讯有数
						if(res.rs && res.rs.length > 0){
							for (var i = 0; i < res.rs.length; i++) {
								let item = res.rs[i];
								sr.track('expose_sku_component',
									{
									   "sku": {
										 "sku_id": item.sku+"", // 若商品无sku_id时，可传spu_id信息
										 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
									   },
									   "spu": {
											"spu_id": item.sku+"", // 若商品无spu_id时，可传sku_id信息
											"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
										},
									   "primary_image_url": item.head_img
									})
							}
						}
					}
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
	 right: 21rpx;
	 top: 5rpx;
	 font-size: 24rpx;
	 width: 50rpx;
	 height: 46rpx;
	 border-radius: 50%;
	 line-height: 48rpx;
	 text-align: center;
	 color: #585657;

 }
 .index-commodity-price{
	 line-height: 2em;
	 color: #E7143B;
	 font-size: 1.5em;
	 margin-left: 8rpx;
	 height: 2em;
	 overflow: hidden;
 }
 
 .personal-header{
	 height: 424rpx;
	 /* background: linear-gradient(133deg, #FFF500 0%, #EB2715 100%); */
	 width: 100%;
	 position: relative;
 }
 
 .personal-header-interstall{
 	    margin-top: 16rpx;
 	    height: 60rpx;
 	    position: relative;
 		display: flex;
 	    align-items: center;
		justify-content: center;
 }
 .personal-header-title{
 	font-size: 36rpx;
 	color: #333333;
	font-weight: bold;
 }
 
 .personal-center{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 22rpx 40rpx 0rpx 40rpx;
	position: relative;
 }
 
 .personal-center-left{
	display: flex;
	align-items: center;
	width: 50%;
 }
 
 .personal-sign-img{
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
 }
 
 .personal-center-name{
	display: flex;
	/* align-items: center; */
	flex-direction: column;
	margin-left: 12rpx;
 }
 
 .personal-sign-name{
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
 }
 
 .personal-center-grap{
	display: flex;
	margin-top: 22rpx;
 }
 
 .personal-center-crown{
	width: 20rpx;
	height: 16rpx;
	margin-left: 0rpx;
	margin-top: 8rpx;
	margin-right: 12rpx;
 }
 
 .personal-center-right{
	display: flex;
	align-items: center;
	width: 50%;
	justify-content: space-between;
 }
 
 .personal-center-right-li{
	display: flex;
	flex-direction: column;
	align-items: center;
 }
 
 .personal-center-right-price{
	 font-size: 32rpx;
	 font-weight: bold;
	 color: #333333;
 }
 
 .personal-center-right-type{
 	 font-size: 28rpx;
 	 color: #333333;
	 margin-top: 20rpx;
 }
 
 .personal-bottom{
	 position: absolute;
	 bottom: 0;
	 width: 684rpx;
	 height: 86rpx;
	 background: linear-gradient(270deg, #363A3A 0%, #151E1F 100%);
	 border-radius: 16rpx 16rpx 0px 0px;
	 display: flex;
	 align-items: center;
	 margin-left: 34rpx;
 }
 
 .personal-bottom-img{
	 width: 38rpx;
	 height: 38rpx;
	 margin-left: 20rpx;
 }
 
 .personal-bottom-title{
	 margin-left: 8rpx;
	 font-size: 30rpx;
	 font-weight: bold;
	 color: #F5E5C9;
	 background: angular-gradient(199deg, #FFE7C9 0%, #EFD298 100%);
 }
 
.personal-bottom-view{
	 display: flex;
	 align-items: center;
	 width: 132rpx;
	 height: 44rpx;
	 background: linear-gradient(90deg, #F0D399 0%, #FFE7C9 100%);
	 border-radius: 22rpx;
	 font-size: 22rpx;
	 font-weight: bold;
	 color: #333333;
	 line-height: 30rpx;
	 position: absolute;
	 right: 20rpx;
	 justify-content: center
 }
 
 .personal-item{
	 width: 700rpx;
	 height: 224rpx;
	 background: #FFFFFF;
	 border-radius: 10rpx;
	 margin-top: 20rpx;
	 display: flex;
	 flex-direction: column;
	 align-items: center;
 }
 
 .personal-item-text{
	 font-size: 32rpx;
	 font-weight: 500;
	 color: #333333;
	 line-height: 45rpx;
	 padding: 15rpx 0rpx 30rpx 20rpx;
	 text-align: left;
	 text-align: left;
	 width: 680rpx;
 }
 
 .personal-item-ul{
	width: 580rpx;
	position: relative;
 }
 
 .personal-item-li{
	width: 96rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0rpx;
	    padding: 0;
	    background: #FFFFFF;
 }
 
 .personal-item-li-img{
	width: 70rpx;
	height: 70rpx;
 }
 
 .item-li-img{
	width: 100%;
	height: 100%;
 }
 
 .personal-item-li-text{
	font-size: 24rpx;
	color: #333333;
	line-height: 33rpx;
	margin-top: 10rpx;
	text-align: center;
 }
 
 .personal-product{
	 width:694rpx;
	 height:60rpx;
	 margin:0 auto;
	 margin-top: 40rpx;
	 display: flex;
	 align-items: center;
	 justify-content: center;
 }
 
 .personal-line{
	 width: 242rpx;
	 border: 1px solid #D2B782;
 }
 
 .personal-product-title{
 	 font-size: 30rpx;
 	 font-weight: bold;
 	 color: #D2B782;
 	 line-height: 42rpx;
	 margin: 0 16rpx;
 }
 
 .personal-header-fixed{
 	background: #FFFFFF;
 	width: 100%;
 	position: fixed;
     z-index: 200;
     height: 160rpx;
 }
 
 .personal-sign-wangguan-view{
	 position: relative;
	 width: 140rpx;
	 height: 140rpx;
 }
 
 .personal-sign-wangguan{
	 width: 140rpx;
	 height: 140rpx;
	 position: absolute;
	 top: -4px;
	 left: -2px;
 }
 
</style>