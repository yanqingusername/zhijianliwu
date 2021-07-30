<template>
	<view class="">
         <image class="home_icon" @click="shouye"  src="/static/icon_home_page_m.png" mode=""></image>
		<view class="font">
			<text class="packages-font-title">支付成功，赶快去送礼吧</text>
			<text class="packages-font-ltitle">记得提醒对方填写地址哦</text>
		</view>
		<view class="box">
			<view class="jie">
			<view class="gift1" v-if="com==1" v-for="item in gift" :key="item.id">
				<image class="flowers" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png" mode=""></image>
				<image class="gift-img1" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				<view class="gift-xq1">
					<text class="gift-xq-title1">{{$utils.cut_str(item.goodsname,6)}}</text>
				</view>
			</view>

			<view v-else="com==2" v-for="item in gift" :key="item.id">
				<view class="gift">
					<image class="gift-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<view class="gift-xq">
						<text class="gift-xq-title">{{$utils.cut_str(item.goodsname,11)}}</text>
						<text class="gift-xq-num">共{{item.goodsnum}}件</text>
					</view>
				</view>
			</view>
		</view>
			<view class="bot" v-if="com==2">
				<image @click="hidden" class="jiequ" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/expand_button.png"
					mode=""></image>
				<text class="zong">共{{length}}份</text>
			</view>
			
			<text class="font-hours"   @click="test_tz">24小时内无人领取将自动退款</text>
			<view class="btn">
				<button type="warn" class="firend-btn" @click="firend">保存图片发朋友圈</button>
				<!-- 文字 -->
				<button type="warn" class="firend-btn" open-type="share" >发送给朋友</button>
			</view>
			<button class="btn-one" type="warn" plain="true" @click="resend">再送一份</button>


		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				com: 1,
				gift: [],
				length: 0,
				index: 0,
				current: 0,
				dataList: [],
				cardbag_theme: {},
				cardbag: {}
			}
		},
		onLoad: function(e) {
			let cardbag_number = e.cardbag_number;
			let data = '{"cardbag_number":"' + cardbag_number + '","cardbag_detail_id":"0"}';
			var action = 'get_cardbag_detail';
			this.$utils.post(action, data).then(res => {

				this.cardbag_theme = res.cardbag_theme
				this.cardbag = res.cardbag
				console.log('礼包详情', res)
				if (res.goods_list.length == 1) {
					this.gift = res.goods_list
					this.cardbag_number = res.cardbag.cardbag_number
					console.log("cardbag_number")
					console.log(this.cardbag_number)
					uni.setStorageSync("cardbag_number", res.cardbag.cardbag_number)
					this.com = 1
				} else {
					if (res.cardbag.type == 1) {
						this.gift = res.type1_goodslist[0]
						this.length = res.type1_goodslist.length
						this.com = 2
					} else {
						this.gift = res.goods_list
						this.length = res.goods_list.length
						this.com = 2
					}

				}
			})

		},
		methods: {
			shouye(){
				uni.reLaunch({
					url:'../index/index'
				})
			},
			test_tz: function() {
				console.log(666)
				uni.navigateTo({
					url: "../shopping/receive?cardbag_number=" + this.cardbag.cardbag_number
				})
			},
			hidden:function(e){
				var action = 'get_cardbag_detail';
				var data = JSON.stringify({
					cardbag_number: this.cardbag.cardbag_number,
					cardbag_detail_id: 0
				})
				this.$utils.post(action, data).then(res => {
					console.log('商品信息', res)
					this.gift = res.type1_goodslist[0]
				})
			},	
			firend: function(e) {
				let cardbag_number = uni.getStorageSync("cardbag_number")
				this.cardbag_number = cardbag_number
				var action = 'get_cardbag_detail';
				var data = JSON.stringify({
					cardbag_number: this.cardbag.cardbag_number,
					cardbag_detail_id: 0
				})
				this.$utils.post(action, data).then(res => {
					console.log('商品信息', res)
					// this.gift=res.rs.goodslist
					this.background = res.cardbag_theme.background
					this.send_talk_msg = res.cardbag_theme.send_talk_msg
					uni.setStorageSync("background", res.cardbag_theme.background)
					uni.setStorageSync("send_talk_msg", res.cardbag_theme.send_talk_msg)
					uni.navigateTo({
						url: '../shopping/share?cardbag_number=' + this.cardbag.cardbag_number
					})
				})
			},

			resend() {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			shou: function(e) {
				let cardbag_number = uni.getStorageSync("cardbag_number")
				this.cardbag_number = cardbag_number
				console.log("cardbag_number")
				console.log(this.cardbag_number)
				var action = 'get_cardbag_detail';
				var data = JSON.stringify({
					cardbag_number: this.cardbag_number,
					cardbag_detail_id: 0
				})
				this.$utils.post(action, data).then(res => {
					console.log('商品信息', res)
					// this.gift=res.rs.goodslist
					this.background = res.cardbag_theme.background
					this.send_talk_msg = res.cardbag_theme.send_talk_msg
					uni.setStorageSync("background", res.cardbag_theme.background)
					uni.setStorageSync("send_talk_msg", res.cardbag_theme.send_talk_msg)
					uni.navigateTo({
						url: '../shopping/receive?cardbag_number=' + this.cardbag_number
					})
				})
			}
		},
		onShareAppMessage(res) {
			let cardbag_number = this.cardbag.cardbag_number
			this.cardbag_number = cardbag_number
			let send_talk_msg = uni.getStorageSync("send_talk_msg")
			this.send_talk_msg = send_talk_msg
			
			
					//分享成功调用接口
					console.log(cardbag_number)
					var action1 = 'share_cardbag';
					var data1 = JSON.stringify({
						cardbag_number: cardbag_number,
					})
					this.$utils.post(action1, data1).then(res => {
						console.log('结果', res)

					})			
			
			
			return {
				title: this.cardbag_theme.send_talk_msg,
				provider: "weixin",
				scene: "WXSceneSession",
				path: "pages/shopping/receive?cardbag_number=" + this.cardbag.cardbag_number,
				type: 0,
				imageUrl: this.cardbag_theme.background,
				success(res) {
					console.log(456)
					
					uni.showToast({
						title: '分享成功'
					})
				
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				},
				complete(res){
					console.log(289)
					
				}
			}
		}
	}
</script>

<style>
	@import '@/common/succes.css';
     .home_icon{
		 width: 50rpx;
		 height: 50rpx;
		 margin-top: 40px;
		 margin-left: 20px;
	 }
	.gift1 {
		width: 300rpx;
		height: 385rpx;
		border: 1px solid #CCB586;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		margin-left: 3rpx;
	}

	.gift-img1 {
		width: 85%;
		height: 70%;
		margin-top: 50rpx;
	}

	.gift-xq1 {
		width: 50%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		position: absolute;
		top: 260rpx;
	}

	.gift-xq-title1 {
		font-weight: bold;
		font-size: 14px;
		display: flex;
		padding-top: 129rpx;
		font-family: "苹方 中等";
		color: #333333;
	}

	.duo {
		width: 580rpx;
		height: 500rpx;
		/* border: 1px solid #000; */
		display: flex;
		justify-content: center;
		overflow: hidden;
		flex-wrap: wrap;
	}

	.bot {
		width: 100%;
		height: 150rpx;
		line-height: 200rpx;
		/* border: 1px solid #000; */
		margin-top: 25rpx;
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}

	.jiequ {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: -10rpx;
		left: 313rpx;
	}

	.zong {
		position: absolute;
		top: -10rpx;
		left: 300rpx;
	}
	.jie{
		width: 100%;
		height: 500rpx;
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.flowers{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 30rpx;
	}
</style>
