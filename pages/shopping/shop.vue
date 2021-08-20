<template>
	<view class="shop z-gift">
		<view class="shop-header-backgrounds"></view>
		<!-- <view class="shop-header">
			<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
			<button class="shop-header-btn" type="warn" @click="box_gift()">开始挑选礼物</button>
		</view> -->
		<view style="margin-top: -100rpx">
			<view class="box">
				<view class="box-content">
					<view class="shop-gift-buys-top" v-for="item in goodsinfo" :key="item.id">
						<img class="img shop-gift-buys-img" :src="$utils.imageUrl(item.goodsinfo.head_img)">
						<view class="top-right">
							<view class="shop-gift-buys-title">{{$utils.cut_str(item.goodsinfo.goodsname,16)}}</view>
							<view class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</view>
							<view class="price-bottom">
								<text style="font-size: 24rpx; color: #FB4133;">￥</text>
								<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
								<view class="shop-gift-num">
									<view class="reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click="reduce(item)">-</view>
									<view class="cart-count">{{item.goodsnum}}</view>
									<view class="add" :data-index="item.id" :data-goodsid="item.goodsid" @click="increase(item)">+</view>
									
								</view>
							</view>
							
						</view>
					</view>
					<view class="shop-gift-buys-bottom">
					<text class="shop-gift-buys-bottom-num">共{{goodsinfo.length}}件礼物/份</text>
					<view class="right">
						<text class="shop-gift-buys-bottom-add" @click="add">继续添加</text>
						<text class="icon icon-z-right"></text>
					</view>
					
				</view>
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
					
					<view class="shop-gift-address shop-list">
						<text class="">直接填写收货地址</text>
					</view>
				</view>
				 
				<!-- 拼手气红包 -->
				<view class="" v-if="show==='1'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">拼手气红包</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">随机领取一件礼物</text>
					</view>
					<view class="shop-gift-pin shop-list" @click="chooseGift">
						<text>选择礼物封面</text>
						<view class="right">
							<!-- <text class="yixuan">{{chooses==1?'已选':''}}</text> -->
							<text class="icon icon-z-right"></text>
						</view>
						
						<!-- <image  class="shop-gift-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
					</view>
					<view class="shop-gift-pin fu shop-list"  @click="wishes">
						<text>自定义“福语”</text>
						<view class="right">
							<!-- <text class="">{{zhufu_type}}</text> -->
							<text class="icon icon-z-right"></text>
							<!-- <image class="shop-jiantou" :src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
						</view>
					</view>
				</view>
				 
				<!-- 直接送礼 -->
				<view class="" v-else-if="show==='2'">
					<view class="shop-list shop-ways">
						<text class="shop-gift-title">送礼方式</text>
						<view class="right">
							<text class="shop-gift-buy" @click="toggle">直接送礼</text>
							<text class="icon icon-z-right"></text>
						</view>
					</view>
					
					<view class="shop-gift-address shop-list">
						<text class="">每个人最多可领取1份礼物</text>
						<view class="right">
							<text class="shop-gift-cheng">x</text>
							<input class="shop-gift-input" type="text" value="1"  v-model="fenshu"   @change="changefenshu"     />
							<text class="shop-gift-person">人</text>
						</view>
					</view>
					<view>
						<view class="shop-gift-pin shop-list"  @click="chooseGift">
							<text>选择礼物封面</text>
							<view class="right">
								<!-- <text class="yixuan">{{chooses==1?'已选':''}}</text> -->
								<text class="icon icon-z-right"></text>
							<!-- <image class="shop-gift-jiantou"
								:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
							</view>
						</view>
						<view class="shop-gift-pin fu shop-list"  @click="wishes">
							<text>自定义“福语”</text>
							<view class="right">
								<!-- <text class="">{{zhufu_type}}</text> -->
								<text class="icon icon-z-right"></text>
								<!-- <image class="shop-jiantou"
									:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image> -->
							</view>
							
						</view>
					</view>
				</view>
				 
				 
				<!-- 底部送礼方式 -->
				<uni-popup ref="popup" type="bottom" :animation="false"  >
					<view class="shop-gift-buy-bot">
						<text class="shop-bot" @click="box1">直接送礼</text>
						<text class="shop-bot" @click="box2">拼手气红包</text>
						<text @click="close" class="shop-bot close">取消</text>
					</view>
				</uni-popup>
			 </view> 
			 
			 <!-- 确认订单按钮 -->
			<view class="z-btn-bottom">
				<view class="shop-bottom-price"><text>￥</text><text>{{price_zhe}}</text></view>
				<button class="shop-botton-btn" type="warn" @click="packages">生成礼物红包</button>
			</view>
		</view>
	</view>
</template> 

<script>
	export default {
	
		data() {
		
			return {
				price_zhe:0,
				goodsinfo:[],
			   goodsid: "",
			   checknum: '1',
			   flag:true,
			   type: '',
			   show: '1',
			   gift:true,
			   zhufu_type:0,
			   chooses:1,
			   length:0,
			   fenshu:1,
			}
		
		},
		onLoad:function(e){
				let type=e.type
				this.type=type
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
				})
				
				//计算总价
				this.caltotalmoney()
		},
		onShow: function(e){
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
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				console.log('show')
				console.log(this.show)
				
				let memberid = uni.getStorageSync('id')
				let buy_type=1
				//如果show=1是拼手气红包，如果show=2是直接送礼
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
				uni.reLaunch({
					url:'../index/index'
				})
			},						
		 box_gift(){
			uni.navigateTo({
				url:'../index/index'
			})
		 },
		 
		 reduce(num, type) {
		 	this.checknum = parseInt(num) + parseInt(type);
		 	return
		 },
		   open() {
		      this.$refs.popup.open('')
		   },
		   toggle:function(e) {
		   		this.$refs.popup.open('')
		   	},
		   	close:function(e) {
		   		this.$refs.popup.close()
		   	},
			chooseGift:function(e){
				let action = "get_giftbag_list";
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
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
					   	url:'../shopping/gifts?type=1'
					   })
					})
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
				if(this.show==='2'){
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
</script>

<style>
	@import '../../common/gift.css';
</style>
