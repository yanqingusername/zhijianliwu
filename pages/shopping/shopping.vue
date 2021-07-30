<template>
	<view class="shop">
		<view class="shop-header-backgrounds">
		</view>

		<view class="shop-header" v-if="com==false">
			<image class="shop-header-xiong" :src="$utils.osspath_url('/xcx-static/xiong.png')" mode=""></image>
			<button class="shop-header-btn" type="warn" @click="box_gift">开始挑选礼物</button>
		</view>
		<view class="box" v-else>
			<view class="shop-gift-buys-top" v-for="item in goodsinfo" :key="item.id">
				<img class="img shop-gift-buys-img" :src="$utils.imageUrl(item.goodsinfo.head_img)">
				<text class="shop-gift-buys-title">{{$utils.cut_str(item.goodsinfo.goodsname,15)}}</text>
				<text class="shop-gift-buys-ltitle">{{item.goods_spec_item}}</text>
				<text class="shop-gift-buys-price">{{item.goodsinfo.price}}</text>
				<view class="shop-gift-num">
					<view class="reduce" :data-index="item.id" :data-goodsid="item.goodsid" @click="reduce(item)">-</view>
					<view class="cart-count">{{item.goodsnum}}</view>
					<view class="add" :data-index="item.id" :data-goodsid="item.goodsid" @click="increase(item)">+</view>
					
				</view>
			</view>
			<view class="shop-gift-buys-bottom">
				<text class="shop-gift-buys-bottom-num">共{{numberss}}件礼物/份</text>
				<text class="shop-gift-buys-bottom-add" @click="add">继续添加></text>
			</view>
		</view>
		<!-- 送礼方式 -->
		<view class="shop-gift">
			<!-- 立即购买 -->
			<text class="shop-gift-title">送礼方式</text>
			<view class="" v-if="show==='0'">
				<text class="shop-gift-buy" @click="toggle">立即购买></text>
				<view class="shop-gift-address">
					<text class="">直接填写收货地址</text>
				</view>
			</view>
			<!-- 拼手气红包 -->
			<view class="" v-if="show==='1'">
				<text class="shop-gift-buy" @click="toggle">拼手气红包></text>
				<view class="shop-gift-address">
					<text class="">随机领取一件礼物</text>
				</view>
				<view>
					<view class="shop-gift-pin" @click="chooseGift">
						<text>选择礼物封面</text>
						<text class="yixuan">{{chooses==1?'已选':''}}</text>
						<image  class="shop-gift-jiantou"
							:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
					</view>
					<view class="shop-gift-pin fu"  @click="wishes">
						<text>自定义“福语”</text>
						<view class="jiantou">
							<text class="">{{zhufu_type}}</text>
							<image class="shop-jiantou"
								:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 直接送礼 -->
			<view class="" v-else-if="show==='2'">
				<text class="shop-gift-buy" @click="toggle">直接送礼></text>
				<view class="shop-gift-address">
					<text class="">每个人最多可领取1份礼物</text>
					<text class="shop-gift-cheng">x</text>
					<input class="shop-gift-input" type="text" value="1"  v-model="fenshu"   @change="changefenshu"     />
					<text class="shop-gift-person">人</text>
				</view>
				<view>
					<view class="shop-gift-pin"  @click="chooseGift">
						<text>选择礼物封面</text>
						<text class="yixuan">{{chooses==1?'已选':''}}</text>
						<image class="shop-gift-jiantou"
							:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
					</view>
					<view class="shop-gift-pin fu"  @click="wishes">
						<text>自定义“福语”</text>
						<view class="jiantou">
							<text class="">{{zhufu_type}}</text>
							<image class="shop-jiantou"
								:src="$utils.osspath_url('/xcx-static/return_arrow_r_g.png')" mode=""></image>
						</view>
						
					</view>
				</view>
			</view>
			<!-- 底部送礼方式 -->
			<uni-popup ref="popup" type="bottom" :animation="false">
				<view class="shop-gift-buy-bot">
					<text class="shop-bot" @click="box1">直接送礼</text>
					<text class="shop-bot" @click="box2">拼手气红包</text>
					<text class="shop-bot" @click="box3">立即购买</text>
					<text @click="close" class="shop-bot close">取消</text>
				</view>
			</uni-popup>
		</view>
		<!-- 确认订单按钮 -->
         <view class="button">
         	<text class="shop-bottom-price"   v-model="price_zhe">￥{{price_zhe}}</text>
         	<button class="shop-botton-btn" type="warn" @click="packages">确认订单</button>
         </view>
		
	</view>
</template>

<script>
	export default {
		data() {

			return {
				price_zhe: 0,
				goodsinfo: [],
				goodsid: "",
				flag: true,
				type: '',
				show: '1',
				gift: true,
				chooses: 1,
				numberss: 0,
				com: '',
				fenshu:1,
				zhufu_type:0,
				id:''
			}

		},
		onShow: function(e) {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			console.log("当前页面的路由", curRoute);
			let curParam = routes[routes.length - 1].options; //获取路由参数
			console.log("当前页面的参数", curParam);
			let type = curParam.type
			if(typeof(type)=='undefined'){
				type=0
				
			}
			this.type = type;
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
			var action = 'get_giftbag_list';

			this.$utils.post(action, data).then(res => {
				console.log('商品', res)
				if (res.rs.giftbag.length >= 1) {
					this.goodsinfo = res.rs.giftbag
					this.price_zhe=res.rs.price_zhe
					let numberss = 0
					for (let i in res.rs.giftbag) {
						numberss += Number(res.rs.giftbag[i].goodsnum)
					}
					this.numberss = numberss
					uni.setStorageSync("type", type)
					this.com = true
				} else {
					this.com = false
				}
			})
			
			
			
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
			
			//计算总价
			this.caltotalmoney()
		},
		onLoad: function(e) {
           
			//计算总价			this.caltotalmoney()
		},
		methods: {
			box_gift() {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			// 加法
			increase: function(e) {
				console.log(e)
				let goodsid = e.goodsid;
				this.goodsid = goodsid;
				this.goodsnum = 1;
				let acount=e.goodsnum+1
				this.give(e,acount);
			},
			// 减法
			reduce: function(e) {
				let goodsid = e.goodsid;
				this.goodsnum=-1
				let acount=e.goodsnum-1
				this.goodsid = goodsid;
				this.give(e,acount);
			},
			// 加减数量
			give: function(e,acount) {
				let memberid = uni.getStorageSync('id')
				this.memberid = memberid;
				let type = uni.getStorageSync('type')
				this.type = type;
				var data = '{"memberid":"' + this.memberid + '","goodsid":"' + this.goodsid + '","num":"' + this.goodsnum + '","buy_type":"' +type+'","goods_model":"' +e.goods_model+'","goods_spec":"' +e.goods_spec+'","goods_item":"' +e.goods_spec_item+'"}';
				var action = 'op_buy_shopping_cart';
				console.log(data)
				
				this.$utils.post(action, data).then(res => {
					console.log('添加购物车', res)
                       //e.goodsnum=acount  
					   //更改为下面的重新获取
					var data = '{"memberid":"' + this.memberid + '","buy_type":"' +type+'"}';
					var action = 'get_giftbag_list';

					this.$utils.post(action, data).then(res => {
						console.log('更改价格', res)
						if (res.rs.giftbag.length >= 1) {
							this.goodsinfo = res.rs.giftbag
						}
						
					})
				})
				//计算总价
				this.caltotalmoney()
				console.log(this.goodsinfo)
				// this.calculation();
			},
			changefenshu:function (e){
				console.log("获取价格接口")
				this.caltotalmoney()
				
			},
			caltotalmoney:function (e){
				let fenshu=this.fenshu
				//这里要判断下类型，如果是直接送礼份数取出来实际的，如果是拼手气的话，份数是固定的1
				//console.log('show')
				//console.log(this.show)
				
				let memberid = uni.getStorageSync('id')
				let buy_type=0
				//如果show=1是拼手气红包，如果show=2是直接送礼
				if(this.show==1 ||  this.show==0){
					fenshu=1;
				}
				
				let action = "get_fenshu_price";
				let data = JSON.stringify({
					memberid: memberid,
					fenshu:fenshu,
					buy_type:0
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
			add: function(e) {
				uni.reLaunch({
					url:'../index/index'
				})
			},
			open() {
				this.$refs.popup.open('')
			},
			toggle: function(e) {
				this.$refs.popup.open('')
			},
			close: function(e) {
				this.$refs.popup.close()
			},
			chooseGift: function(e) {
				let action = "get_giftbag_list";
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
				let data = JSON.stringify({
					memberid:this.memberid,
					buy_type: 0
				});
				this.$utils.post(action, data).then(res => {
					console.log("直接赠送")
					console.log(res)
					let icon = "success"
					if (res.sta != 1) {
						icon = "none";
						uni.showToast({
							icon: icon,
							title: res.msg,
							duration: 2000
						});
					}
					uni.navigateTo({
						url: '../shopping/gifts?type=0'
					})
				})
			},
			wishes: function(e) {
				let zhufu_type = uni.getStorageSync('zhufu_type')
				this.zhufu_type=zhufu_type
				let memberid = uni.getStorageSync('id')
				this.memberid=memberid
				if (this.zhufu_type==this.zhufu_type) {
					let action = "get_giftbag_list";
					let data = JSON.stringify({
						memberid:this.memberid,
						buy_type: 0
					});
					this.$utils.post(action, data).then(res => {
						console.log("直接赠送")
						console.log(res)
						let icon = "success"
						if (res.sta != 1) {
							icon = "none";
							uni.showToast({
								icon: icon,
								title: res.msg,
								duration: 2000
							});
						}
						uni.navigateTo({
							url: '../shopping/wishes?type=0'
						})
					})
				}

			},
			box1() {
				this.show = '2'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box2() {
				this.show = '1'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			box3() {
				this.show = '0'
				this.$refs.popup.close()
				//计算总价
				this.caltotalmoney()
			},
			packages: function(e) {
				if (this.show === '2') {
					//批量送礼
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
						if (res.rs.goodslist.length == 0) {
						
							uni.showToast({
								icon: "success",
								title: "当前礼袋无商品"
							})
						}
						if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
							uni.navigateTo({
								url: '../shopping/packages?type=0&fenshu='+this.fenshu+'&wanfa=1'
							})
						}
					})
				} else if (this.show === '1') {
					//拼手气红包
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log('商品信息11', res)
						if (res.rs.goodslist.length == 0) {
						
							uni.showToast({
								icon: "success",
								title: "当前礼袋无商品"
							})
				        }
						if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
							this.$forceUpdate();
							uni.navigateTo({
								url: '../shopping/packages?type=0&fenshu=1&wanfa=4'
							})
						}
					})
				} else {
					let type = uni.getStorageSync('type')
					this.type = type;
					let memberid = uni.getStorageSync('id')
					this.memberid = memberid;
					var data = '{"memberid":"' + memberid + '","buy_type":"' + type + '"}';
					var action = 'get_buy_shopping_cart';
					this.$utils.post(action, data).then(res => {
						console.log(res)
						if (res.rs.goodslist.length == 0) {
						
							uni.showToast({
								icon: "success",
								title: "当前礼袋无商品"
							})
						}
						if (this.zhufu_type != null && this.chooses != null && res.rs.goodslist.length!=0) {
							uni.navigateTo({
								url: '../shopping/must?type=0'
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
	.shop {
		width: 100%;
	}

	.shop-header-backgrounds {
		width: 100%;
		height: 410rpx;
		background-image: url(https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/bc.png);
		background-size: 100% 410rpx;
	}

	.shop-header-xiong {
		width: 680rpx;
		height: 300rpx;
		margin-left: 36rpx;
		margin-top: -84rpx;
	}

	.shop-header-btn {
		width: 300rpx;
		height: 80rpx;
		line-height: 40px;
		position: absolute;
		top: 509rpx;
		left: 230rpx;
		background-color: #EC1815;
		font-size: 16px;
		font-family: "苹方 中等";
	}

	.shop-gift {
		width: 100%;
		height: 450rpx;
		margin-top: 35rpx;
	}

	.shop-gift-title {
		margin-left: 45rpx;
		color: #333;
	}

	.shop-gift-buy {
		float: right;
		margin-right: 60rpx;
		color: #DB3C3A;
		margin-top: -50rpx;
		font-family: "苹方-简 常规体";
		font-size: 13px;
	}

	.shop-gift-address {
		width: 90%;
		height: 100rpx;
		line-height: 50px;
		padding-left: 30rpx;
		background-color: #fff;
		margin: 20rpx auto;
		color: #999;
	}

	.shop-botton-btn {
		width: 300rpx;
		margin-top: 78rpx;
	}

	.shop-gift-pin {
		width: 90%;
		height: 100rpx;
		line-height: 50px;
		padding-left: 30rpx;
		background-color: #fff;
		margin: auto;
		color: #333333;
	}

	.shop-gift-jiantou {
		width: 50rpx;
		height: 50rpx;
		float: right;
		margin-top: 30rpx;
	}
    
	.fu {
		margin-top: 21rpx;
	}

	.shop-gift-buys {
		width: 90%;
		height: 295rpx;
		background-color: #fff;
		margin-top: 300rpx;
		margin-left: 39rpx;
		border-radius: 5px;
	}

	.shop-gift-buys-top {
		width: 100%;
		height: 220rpx;
		border-bottom: 1px solid #eee;
		position: relative;
	}

	.shop-gift-buys-img {
		width: 150rpx;
		height: 150rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
	}

	.shop-gift-buys-title {
		width: 68%;
		position: absolute;
		top: 44rpx;
		left: 190rpx;
		font-family: "苹方 中等";
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}

	.shop-gift-buys-ltitle {
		position: absolute;
		top: 104rpx;
		left: 190rpx;
		color: #999999;
	}

	.shop-gift-buys-price {
		position: absolute;
		top: 155rpx;
		left: 190rpx;
		color: #FB4133;
	}

	.shop-gift-num {
		width: 260rpx;
		height: 55rpx;
		position: absolute;
		top: 140rpx;
		right: 0rpx;
	}

	.reduce {
		width: 35rpx;
		height: 35rpx;
		line-height: 35rpx;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 50rpx;
		color: #AAAAAA;
		position: absolute;
		top: 22rpx;
		left: 38rpx;
	}

	.cart-count {
		width: 60rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #F5F5F5;
		position: absolute;
		top: 22rpx;
		left: 90rpx;
	}

	.add {
		width: 35rpx;
		height: 35rpx;
		line-height: 35rpx;
		text-align: center;
		border: 1px solid #999999;
		border-radius: 50rpx;
		color: #AAAAAA;
		position: absolute;
		top: 22rpx;
		left: 164rpx;
	}

	.shop-gift-buys-bottom {
		width: 100%;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.shop-gift-buys-bottom-num {
		margin-left: 40rpx;
		color: #666666;
	}

	.shop-gift-buys-bottom-add {
		margin-right: 23rpx;
		color: #DB3C3A;
	}

	.shop-bottom-price {
		font-size: 18px;
		font-weight: bold;
		position: absolute;
		margin-top: 25rpx;
		margin-left: -15rpx;
	}
    .button{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.shop-gift-buy-bot {
		width: 750rpx;
		height: 338rpx;
		background-color: #fff;
	}

	.shop-bot {
		width: 750rpx;
		height: 82rpx;
		line-height: 40px;
		text-align: center;
		background-color: #FFF;
		display: block;
		border-bottom: 1px solid #ccc;
	}

	.close {
		border-top: 3px solid #ccc;
	}

	.box {
		width: 675rpx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		margin-top: -100rpx;
		margin-left: 37rpx;
		border-radius: 5px;
		position: relative;
		z-index: 99;
	}

	.shop-gift-cheng {
		float: right;
		margin-right: 150rpx;
	}

	.shop-gift-input {
		width: 60rpx;
		height: 30rpx;
		background-color: #F5F5F5;
		text-align: center;
		color: #333333;
		position: relative;
		    top: -72rpx;
		    left: 540rpx;
	}

	.shop-gift-person {
		position: absolute;
		margin-top: -144rpx;
		left: 660rpx;
		color: #333333;
	}

	.yixuan {
		margin-left: 395rpx;
		color: #999999;
		font-family: "苹方 中等";
		font-size: 14px;
	}
     .jiantou{
		width: 300rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		/* border: 1px solid #000; */
		margin-top: -100rpx;
		margin-left: 370rpx;
		color: #999999;
		font-family: "苹方 中等";
		font-size: 14px;
	 }
	 .shop-jiantou{
		 width: 50rpx;
		 height: 50rpx;
		 margin-top: 5rpx;
	 }
   
	.shop-header {
		position: unset;
		z-index: -1;
		margin-left: 0rpx;
	}
</style>
