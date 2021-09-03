<template>
	<view class="" style="background-color: #EB1515; padding: 0 26rpx">
         <!-- <image class="home_icon" @click="shouye"  src="/static/icon_home_page_m.png" mode=""></image> -->
		<view class="z-font">
			<text class="packages-font-title">支付成功，赶快去送礼吧</text>
			<text class="packages-font-ltitle">记得提醒对方填写地址哦</text>
		</view>
		<view class="z-box">
			<view class="jie">
				<view class="gift1" v-if="com==1" v-for="(item, index) in gift" :key="index">
					<image class="flowers" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png" mode=""></image>
					<image class="gift-img1" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
					<view class="gift-xq1">
						<text class="gift-xq-title1">{{$utils.cut_str(item.goodsname,6)}}</text>
					</view>
				</view>
				
				<view class="gift2" v-if="com==2" v-for="(item, index) in gift" :key="index">
					<view class='gift2-list'>
						<image class="gift-img2" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
						<view class="gift-xq2">
							<view class="gift-xq-title">{{$utils.cut_str(item.goodsname,11)}}</view>
							<view class="gift-xq-num">共{{item.goodsnum}}件</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="bot" v-if="com==2">
				<image @click="hidden" class="jiequ" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/expand_button.png"
					mode="widthFix"></image>
				<text class="zong">共{{length}}份</text>
			</view>
			
			<view class="z-font-hours" @click="test_tz">24小时内无人领取将自动退款</view>
			
			<view class="btn">
				<button type="warn" class="firend-btn" @click="firend">保存图片发朋友圈</button>
				<!-- 文字 -->
				<button type="warn" class="firend-btn" open-type="share" >发送给朋友</button>
			</view>
			<button class="btn-one" type="warn" plain="true" @click="resend">再送一份</button>


		</view>
		<view style="height: 30rpx;"></view>
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
			uni.setStorageSync('all_cover_bg',"");
			uni.setStorageSync('all_cover_id',"");
			uni.setStorageSync('setgiftssuccess', '2');
			uni.setStorageSync('setwishessuccess', '2');
			
			let cardbag_number = e.cardbag_number;
			let data = '{"cardbag_number":"' + cardbag_number + '","cardbag_detail_id":"0"}';
			var action = 'get_cardbag_detail';
			this.$utils.post(action, data).then(res => {

				this.cardbag_theme = res.cardbag_theme
				this.cardbag = res.cardbag
				if (res.goods_list.length == 1) {
					this.com = 1
					this.gift = res.goods_list
					this.cardbag_number = res.cardbag.cardbag_number
					uni.setStorageSync("cardbag_number", res.cardbag.cardbag_number)
				} else {
					if (res.cardbag.type == 1) {
						this.com = 2
						this.gift = res.type1_goodslist[0]
						this.length = res.type1_goodslist.length
					} else {
						this.com = 2
						this.gift = res.goods_list
						this.length = res.goods_list.length
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
</style>
<style>
	.btn{
		padding: 0 40rpx;
	}
	.firend-btn{
		margin: 0 20rpx;;
	}
	.z-font{
		text-align: center;
		padding: 40rpx 0;
	}
	.z-font .packages-font-title{
		font-size: 40rpx;
		color: #F5F5F5;
		margin-bottom: 20rpx;
	}
	.z-font .packages-font-ltitle{
		font-size: 28rpx;
		color: #F5F5F5;
	}
	.z-box{
		padding-top: 80rpx;
		padding-bottom: 20rpx;
		width: 100%!important;
		top: 0!important;
		text-align: center;
		background-color: #fff;
		border-radius: 10rpx;
	}
	
	 .home_icon{
		 width: 50rpx;
		 height: 50rpx;
		 margin-top: 40px;
		 margin-left: 20px;
	 }
	.gift1 {
		width: 360rpx;
		border: 1px solid #CCB586;
		border-radius: 10rpx;
		margin-left: 3rpx;
		position: relative;
		padding: 72rpx 40rpx 40rpx;
		box-sizing: border-box;
		display: inline-block;
	}
	.flowers{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: -22rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.gift-img1 {
		width: 100%;
	}
	
	.gift-xq1 {
		text-align: center;
		margin-top: 55rpx;
	}
	
	.gift-xq-title1 {
		font-weight: bold;
		font-size: 14px;
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
		margin-top: 25rpx;
		text-align: center;
		flex-direction: column;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	
	.jiequ {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 10rpx;
	}
	
	.zong {
		text-align: center;
	}
	.jie{
		width: 100%;
		text-align: center;
	}
	.z-font-hours{
		margin-top: 44rpx;
		font-size: 24rpx;
		color: #999;
	}
	
	.gift2{
		padding: 0 70rpx;
	}
	.gift2-list{
		margin-bottom: 20rpx;
		border: 1rpx solid #CCB586;
		border-radius: 10rpx;
		padding: 30rpx 50rpx;
		display: flex;
		align-items: center;
	}
	.gift2-list .gift-img2{
		width: 100rpx;
	}
	.gift2-list .gift-xq2{
		text-align: left;
		flex: 1;
		padding-left: 30rpx;
	}
	.gift2-list .gift-xq2{
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #333;
	}
	.gift2-list .gift-xq2{
		font-size: 28rpx;
		color: #666;
	}
	.gift-xq-title{
		font-weight: bold;
		font-size: 14px;
	}
	.gift-xq-num{
		color: #666666;
		font-size: 14px;
		margin-top: 30rpx;
	}
	
</style>

