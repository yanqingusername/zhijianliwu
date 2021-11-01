<template>
	<view class="shop z-gift">
		<view class="shop-header-backgrounds-bg">
			<!-- <image @click="$buttonClick(backbutton)" class="icon-back-img" src="../../static/icon_header_back.png"></image> -->
		</view>
		<!-- <view class="shop-header">
			<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
			<button class="shop-header-btn" type="warn" @click="box_gift()">开始挑选礼物</button>
		</view> -->
		<view style="margin-top: -140rpx">
			<view class="box" v-if="statutype == 'exchange' && is_exchange_type == 1">
				<view class="box-content">
					<view class="shop-gift-buys-top">
						<img class="img shop-gift-buys-img" :src="orderInfo.cardtype_img">
						<view class="top-right">
							<view class="shop-gift-buys-title">{{$utils.cut_str(orderInfo.card_name,16)}}</view>
							<view class="shop-gift-buys-ltitle">{{orderInfo.card_type_info}}</view>
							<view class="price-bottom flex-between">
								<view>
									<text style="font-size: 24rpx; color: #FB4133;">￥<text class="shop-gift-buys-price">0.00</text></text>
									<text style="font-size: 24rpx; color: #999999;">￥<text class="shop-gift-buys-price-text">{{orderInfo.price}}</text></text>
								</view>
								<view class="flex-vertically">
									<view class="cart-count" style="background-color: #FFFFFF;text-align: right;">x1</view>
								</view>
							</view>
						</view>
					</view>
					<view class="shop-gift-buys-bottom">
						<text class="shop-gift-buys-bottom-num" v-if="show==='1'">共{{numberss}}件礼物</text>
						<text class="shop-gift-buys-bottom-num" v-else>共{{numberss}}件礼物/份</text>
						<view class="right"></view>
					</view>
				</view>
			</view>
			<view v-else class="box">
				<view class="box-content" v-if="goodsinfo.length > 0">
					<view class="shop-gift-buys-top" v-for="item in goodsinfo" :key="item.id" >
						<img class="img shop-gift-buys-img" @click="goToDetails(item.goodsinfo.keynum)" :src="$utils.imageUrl(item.goodsinfo.head_img)">
						<view class="top-right">
							<view class="shop-gift-buys-title" @click="goToDetails(item.goodsinfo.keynum)" :src="$utils.imageUrl(item.goodsinfo.head_img)">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</view>
							<view class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</view>
							<view class="price-bottom flex-between">
								<view>
									<text style="font-size: 24rpx; color: #FB4133;">￥</text>
									<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
								</view>
								<view class="flex-vertically">
									<image src="https://zhijianlw.com/static/web/img/reduce_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="reduce(item)">-</view> -->
									<view class="cart-count">{{item.goodsnum}}</view>
									<image src="https://zhijianlw.com/static/web/img/increase_2021_08_30.png" class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)"></image>
									<!-- <view class="new-reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click.stop="increase(item)">+</view> -->
									
								</view>
							</view>
						</view>
					</view>
					<view class="shop-gift-buys-bottom">
						<!-- <text class="shop-gift-buys-bottom-num">共{{goodsinfo.length}}件礼物/份</text> -->
						<text class="shop-gift-buys-bottom-num" v-if="show==='1'">共{{numberss}}件礼物</text>
						<text class="shop-gift-buys-bottom-num" v-else>共{{numberss}}件礼物/份</text>
						<view class="right">
							<text v-if="type!=1" class="shop-gift-buys-bottom-add" @click="add">继续添加</text>
							<text v-if="type!=1" class="icon icon-z-right"></text>
						</view>
						
					</view>
				</view>
				<view class="shop-header" v-else>
					<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
					<button class="shop-header-btn" type="warn" @click="box_gift()">开始挑选礼物</button>
				</view> 
			</view>
			
			<!-- 送礼方式 -->
			<view class="shop-gift">
				<!-- 立即购买 -->
				<view class="" v-if="show==='0'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">立即购买</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<!-- <view class="shop-gift-address shop-list">
						<text class="">直接填写收货地址</text>
					</view> -->
				</view>
				 
				<!-- 拼手气礼包 -->
				<view class="" v-if="show==='1'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">拼手气礼包</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">{{numberss == 1 ? '手慢无':'随机领取一件礼物'}}</text>
					</view>
					<!-- <view class="shop-gift-pin shop-list" @click="chooseGift">
						<text>选择礼物封面</text>
						<view class="right">
							<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					<view class="shop-gift-pin shop-list flex-between"  @click="wishes">
						<text>自定义“福语”</text>
						<view style="display: flex;align-items: center;">
							<text class="yixuan" style="margin-left: 0rpx;">{{setwishessuccess==1?'已选':''}}</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view> -->
				</view>
				 
				<!-- 直接送礼 -->
				<view class="" v-else-if="show==='2'">
					<view class="shop-list shop-ways" v-if="statutype != 'exchange'">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">直接送礼</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list" v-if="statutype != 'exchange'">
						<text class="">每个人最多可领取1份礼物</text>
						<view class="right">
							<text class="shop-gift-cheng">x</text>
							<input class="shop-gift-input" type="number" value="1"  v-model="fenshu"   @change="changefenshu"     />
							<text class="shop-gift-person">人</text>
						</view>
					</view>
					<view>
						<view class="shop-gift-pin shop-list"  @click="chooseGift">
							<text>定制祝福卡</text>
							<view class="right">
								<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							</view>
						</view>
						<!-- <view class="shop-gift-pin shop-list"  @click="chooseGift">
							<text>选择礼物封面</text>
							<view class="right">
								<text class="yixuan">{{setgiftssuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							</view>
						</view>
						<view class="shop-gift-pin fu shop-list"  @click="wishes">
							<text>自定义“福语”</text>
							<view class="right">
								<text class="yixuan">{{setwishessuccess==1?'已选':''}}</text>
								<text class="icon icon-z-right"></text>
							</view>
						</view> -->
					</view>
				</view>
				 
				 
				<!-- 底部送礼方式 -->
				<uni-popup ref="popup" type="bottom" :animation="false"  >
					<view class="new-shop-gift-buy-bot">
						<text class="shop-bot" @click="box1">直接送礼</text>
						<text class="shop-bot" @click="box2">拼手气礼包</text>
						<text @click="close" class="shop-bot close">取消</text>
					</view>
				</uni-popup>
			 </view> 
			 
			 <!-- 确认订单按钮 -->
			<view class="z-btn-bottom">
				<view class="shop-bottom-price"><text>￥</text><text>{{price_zhe || '0.00'}}</text></view>
				<button class="shop-botton-btn" type="warn" @click="packages">确认订单</button>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
	
		data() {
		
			return {
				price_zhe:"0.00",
				goodsinfo:[],
			   goodsid: "",
			   checknum: '1',
			   flag:true,
			   type: '',
			   show: '2',
			   gift:true,
			   zhufu_type:0,
			   chooses:1,
			   length:0,
			   fenshu:1,
			   setgiftssuccess: '2',
			   setwishessuccess: '2',
			   statutype: '',
			   ordernumber: '',
			   orderInfo:'',
			   is_exchange_type: 0,
			   numberss: 0,
			}
		
		},
		onLoad:function(e){
				let type=e.type;
				this.type=type;
				
				if(e && e.statutype && e.ordernumber){
					this.statutype = e.statutype;
					this.ordernumber = e.ordernumber;
					this.is_exchange_type = e.is_exchange_type;
				}
				
			 //    let memberid = uni.getStorageSync('id')
				// this.memberid = memberid;
				// var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
				// var action = 'get_giftbag_list';
				//  this.$utils.post(action,data).then(res=>{
				// 	 console.log('商品信息',res)
				// 	 if (res.sta ===1) {				   
				// 		uni.showToast({
				// 			icon: 'success',
				// 			title: res.msg,
				// 			duration: 1000
				// 		});
				// 	 }
				// 	this.goodsinfo = res.rs.giftbag
				// 	this.price_zhe=res.rs.price_zhe
				// })
				
				// //计算总价
				// this.caltotalmoney()
		},
		onShow: function(){
			this.setgiftssuccess = uni.getStorageSync('setgiftssuccess');
			this.setwishessuccess = uni.getStorageSync('setwishessuccess');
			
			if(this.statutype == 'exchange' && this.is_exchange_type == 1){
				let that = this;
				let action = "get_exchange_order_info";
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					ordernumber: this.ordernumber,
					memberid: memberid
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.orderInfo = res.rs;
					} 
				})
			} else {
				let type=this.type
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
				var action = 'get_giftbag_list';
				this.$utils.post(action,data).then(res=>{
					 console.log('商品信息',res)
					 if (res.sta ===1) {				   
						uni.showToast({
							icon: 'success',
							title: res.msg,
							duration: 1000
						});
					 }
					this.goodsinfo = res.rs.giftbag
					this.price_zhe=res.rs.price_zhe
					let numberss = 0
					for (let i in res.rs.giftbag) {
						numberss += Number(res.rs.giftbag[i].goodsnum)
					}
					this.numberss = numberss
				})
				//计算总价
				this.caltotalmoney()
			}
			
			let zhufu_type = uni.getStorageSync('zhufu_type')
			this.zhufu_type=zhufu_type
			console.log("this.zhufu_type11")
			console.log(this.zhufu_type)
			if(this.zhufu_type==0){
				this.zhufu_type="福语"
			}else if(this.zhufu_type==1){
				this.zhufu_type="语音"
			}else if(this.zhufu_type==2){
				this.zhufu_type="视频"
			}
		},
		methods: {
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			backbutton(e){
				uni.navigateBack({
					delta: 1
				});
			},
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				console.log('show')
				console.log(this.show)
				
				let memberid = uni.getStorageSync('id')
				let buy_type=1
				//如果show=1是拼手气礼包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:1
				});
				this.$utils.post(action, data).then(res => {
					console.log(res)
					let icon = "success"
					if (res.sta != 1) {
						icon = "none";
						uni.showToast({
							icon: icon,
							title: res.msg,
							duration: 2000
						});
					return 
					}
					//赋值总价
					this.price_zhe=res.rs.price_zhe

				})					
				
			},
			changefenshu:function (e){
				console.log("获取价格接口")
				this.caltotalmoney()
				
			},						
			add: function(e) {
				// uni.reLaunch({
				// 	url:'../index/index'
				// })
				uni.redirectTo({
					url: "./shoppingList"
				});
			},						
		 box_gift(){
			uni.redirectTo({
				url: './shoppingList'
			})
			// ({
			// 	url:'../index/index'
			// })
		 },
		 // 加法
		 increase: function(e) {
		 	console.log(e)
		 	let goodsid = e.goodsid;
		 	this.goodsid = goodsid;
		 	let acount=e.goodsnum+1
			this.numberss +=1;
		 	this.give(e,acount);
		 },
		 reduce(e) {
			 let goodsid = e.goodsid;
			 let acount=e.goodsnum-1
			 this.goodsid = goodsid;
			 this.numberss -= 1;
			 this.give(e,acount);
			 
		 	// this.checknum = parseInt(num) + parseInt(type);
		 	// return
		 },
		 // 加减数量
		 give: function(e,acount) {
		 	let memberid = uni.getStorageSync('id')
		 	this.memberid = memberid;
		 	let type = this.type;
		 	var data = '{"memberid":"' + this.memberid + '","goodsid":"' + this.goodsid + '","num":"' + acount + '","buy_type":"' +type+'","goods_model":"' +e.goods_model+'","goods_spec":"' +e.goods_spec+'","goods_item":"' +e.goods_spec_item+'"}';
		 	var action = 'op_buy_shopping_cart';
		 	console.log(data)
		 	
		 	this.$utils.post(action, data).then(res => {
		 		console.log('添加购物车', res)
		 		   //更改为下面的重新获取
		 		var data = '{"memberid":"' + this.memberid + '","buy_type":"' +type+'"}';
		 		var action = 'get_giftbag_list';
		 
		 		this.$utils.post(action, data).then(res => {
		 			console.log('更改价格', res)
		 			this.goodsinfo = res.rs.giftbag
					//计算总价
					this.caltotalmoney()
		 		})
		 	})
		 },
		   open() {
		      this.$refs.popup.open('')
		   },
		   toggle:function(e) {
			   if(this.statutype == 'exchange'){
				   
			   }else{
				   this.$refs.popup.open('')
			   }
		   	},
		   	close:function(e) {
		   		this.$refs.popup.close()
		   	},
			chooseGift:function(e){
				uni.navigateTo({
					url:'../shopping/CBlessingCard'
			    })
				// let action = "get_giftbag_list";
				// let memberid = uni.getStorageSync('id')
				// this.memberid=memberid
				// let data = JSON.stringify({
				// 	memberid:this.memberid,
				// 	buy_type:1
				// });
				// this.$utils.post(action, data).then(res => {
				// 	console.log("直接赠送")
				// 	console.log(res)
				// 	let icon="success"
				// 	   if (res.sta !=1) {
				// 	   	icon = "none";
				// 	   	uni.showToast({
				// 	   		icon: icon,
				// 	   		title: res.msg,
				// 	   		duration: 2000
				// 	   	});
				// 	}
				// 	   uni.navigateTo({
				// 	   	url:'../shopping/gifts?type=1'
				// 	   })
				// 	})
			},
			wishes:function(e){
				let zhufu_type = uni.getStorageSync('zhufu_type')
				this.zhufu_type=zhufu_type
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				if(this.zhufu_type==this.zhufu_type){
					let action = "get_giftbag_list";
					let data = JSON.stringify({
						memberid:this.memberid,
						buy_type:1
					});
					this.$utils.post(action, data).then(res => {
						console.log("直接赠送")
						console.log(res)
						let icon="success"
						   if (res.sta !=1) {
						   	icon = "none";
						   	uni.showToast({
						   		icon: icon,
						   		title: res.msg,
						   		duration: 2000
						   	});
						}
						   uni.navigateTo({
						   	url:'../shopping/wishes?type=1'
						   })
						})
				}
				
			},
			box1(){
				this.show='2'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box2(){
				this.show='1'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			packages:function(e){
				if(this.statutype == 'exchange' && this.is_exchange_type == 1){
					uni.navigateTo({
						url:'../index-coupon/ExchangePackages?ordernumber='+this.ordernumber
					})
				} else {
					if(this.show==='2'){
						this.setgiftssuccess =  uni.getStorageSync('setgiftssuccess') || 2;
						if(this.setgiftssuccess == 2){
							uni.showToast({
								icon: "none",
								title: "请先定制祝福卡！"
							});
							return
						}
						
						let type=e.type
						let memberid = uni.getStorageSync('id')
						this.memberid = memberid;
						var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
						var action = 'get_buy_shopping_cart';
						this.$utils.post(action, data).then(res => {
							console.log(res)
								if(this.zhufu_type!=null && this.chooses!=null){
									uni.navigateTo({
										url:'../shopping/packages?type=1&fenshu='+this.fenshu+'&wanfa=1' 
									})
								}
						})
					}else if(this.show==='1'){
						let type=e.type
						let memberid = uni.getStorageSync('id')
						this.memberid = memberid;
						var data = '{"memberid":"'+memberid+'","buy_type":"'+type+'"}';
						var action = 'get_buy_shopping_cart';
						this.$utils.post(action, data).then(res => {
							console.log(res)
								if(this.zhufu_type!=null && this.chooses!=null){
									uni.navigateTo({
										url:'../shopping/packages?type=1&fenshu=1&wanfa=4' 
									})
								}
						})
					}
				}
			}
		}
	}
</script>

<style>
	@import '../../common/gift.css';
	page{
		background: #FAFAFA;
	}
	
	.shop-header-backgrounds-bg{
		width: 100%;
		height: 308rpx;
	    background-image: url(https://zhijianlw.com/static/web/img/icon_lilan_bg_2021_11_01.png);
	    background-size: 100% 308rpx;
	}
	
	.icon-back-img{
		position: absolute;
		top: 60rpx;
		left: 26rpx;
		width: 50rpx;
		height: 50rpx;
	}
	
	.new-shop-gift-buy-bot {
	    width: 750rpx;
	    /* height: 338rpx; */
	    background-color: #fff;
	}
	.new-reduce {
	    font-size: 36rpx;
	    display: flex;
	    vertical-align: middle;
	    width: 42rpx;
	    height: 42rpx;
	    line-height: 42rpx;
	    text-align: center;
	    /* border: 1px solid #CCCCCC;
	    border-radius: 50rpx;
	    color: #999999; */
	    align-items: center;
	    justify-content: center;
	}
	.shop-gift-buys-price-text{
		font-size: 34rpx;
	    color: #999999;
		text-align: center;
		text-decoration-line: line-through;
	}
	
	.shop-header {
	    padding: 0 0rpx !important;
	}
	.shop-header-xiong {
	    width: 700rpx !important;
	    height: 288rpx !important;
	}
</style>
