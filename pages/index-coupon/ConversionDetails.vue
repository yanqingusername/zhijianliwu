<template>
	<view class="bag" style="position: relative;">
		<view class="" style="margin-top: 40px;display: flex;align-items: center;justify-content: center;">
			<text class="bag-title">{{cardbag.receive_status_info}}</text>
		</view>
		<image class="bag-head" :src="cardbag.present_memberid_headimg" mode=""></image>
		<view class="bag-con">
			
			<text class="bag-font">{{cardbag.present_memberid_name}}送出的礼物</text>

			<view class="many-com" v-if="com==1">
				<view class="bag-tea" v-for="item in goodslist" :key="item.id" @click="goToDetails(item.keynum)">
					<image class="flowers" src="https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png"
						mode=""></image>
					<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
					<text class="bag-tea-title">{{$utils.cut_str(item.goodsname,6)}}</text>
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll-x" v-if="com==2">
				<view class="many">
					<view class="gift2" v-for="item in goodslist" :key="item.id">
						<view class='gift2-list' >
							<image class="gift-img2" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
							<view class="gift-xq2">
								<view class="gift-xq-title">{{$utils.cut_str(item.goodsname,9)}}</view>
								<view class="gift-xq-num">共{{item.goodsnum}}件</view>
							</view>
						</view>
					</view>
					<!-- <view class="bag-tea1" v-for="item in goodslist" :key="item.id">
						<image class="bag-tea-img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
						<text class="bag-tea-title1">{{$utils.cut_str(item.goodsname,6)}}</text>
						<text class="bag-tea-fen">x{{item.goodsnum}}</text>
					</view> -->
				</view>
			</scroll-view>

			<view class="bag-gift">
				<view class="new-gray-view-dispaly">
					<view class="bag-gift-title">
						<text class="bag-gift-title-font">{{cardbag.receive_status_info_buttom}}</text>
					</view>
					<view style="display: flex;margin-right: 40rpx;" v-if="cardbag.receive_status == 0">
						<button class="new-gray-view" open-type="share">提醒好友领取</button>
					</view>
				</view>
				

				<view class="bag-gift-title" style="height: 110rpx;border-top: 1px solid #E6E6E6;" v-for="item1 in cardbag_in_people" :key="item1.id">
					<view class="flex-between flex-vertically">
						<view class="bag-gift-title-head">
							<image class="bag-gift-title-head-img" :src="item1.head_img" mode=""></image>
						</view>
						<view style="flex-direction: column;">
							<view class="flex-between flex-vertically" style="width: 450rpx;">
								<view>{{item1.member_name}}</view>
								<view class="bag-gift-title-tea" v-if="cardbag.type != 1">{{$utils.cut_str(item1.goods_name,11)}}</view>
							</view>
							<view style="font-size: 22rpx;color: #999999;margin-top: 12rpx;">{{item1.exchange_time}}</view>
						</view>
					</view>
					
					
				</view>

			</view>
			
			<!-- <view style="display: flex;margin-bottom: 60rpx;" v-if="cardbag.receive_status == 0">
				<button class="gray-view" open-type="share">提醒好友领取</button>
			</view> -->
			
			<view style="display: flex;">
				<button type="warn" class="write" @click="resend">再送一份</button>
			</view>

			<view style="height: 50rpx;width: 100%;"></view>
		</view>
		<!-- <view style="height: 30rpx;width: 100%;"></view> -->
	</view>
</template>

<script>
	import config from '../../common/config.js';
	
	export default {
		data() {
			return {
				liwu: [],
				zhufu_msg: '',
				send_talk_msg: '',
				cardbag_number: '',
				cardbag: '',
				level_name: '',
				sign: '',
				type: '',
				goodslist: [],
				com: 1,
				cardbag_in_people: [],
				cardbag: [],
				cardbag_theme: [],
				gift: '0',
				w: '',
				// 进度条位置
				schedule: '0',
				// 按钮位置
				movable_x: '0',
				// 按钮移动距离
				distance: '0',
				// 总时长
				duration: '',
				// 1播放  0不播放
				stop: '0',
				// 页面宽度
				width: '',
				zhufu_mp4: '',
				zhufu_mp3:'',
				radio: true,
				receive_info: '',
				typestring: 1 //type: 1 直接送礼   type: 4 拼手气礼包
			}
		},
		onLoad: function(e) {
			let cardbag_number = e.cardbag_number
			this.cardbag_number = cardbag_number
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var data = '{"memberid":"' + memberid + '","cardbag_number":"' + cardbag_number + '"}';

			var action = 'get_cardbag_fenshu';
			this.$utils.post(action, data).then(res => {
				if (res.rs[0].goodsinfo.length == 1) {
					this.goodslist = res.rs[0].goodsinfo
					this.com = 1
				} else {
					this.goodslist = res.rs[0].goodsinfo
					this.com = 2
				}


				console.log(res.rs[0])
			})

			//获取旧的礼包信息，主要是获取领取人信息
			// let old_cardbag_number = e.old_cardbag_number
			// let data1 = JSON.stringify({
			// 	cardbag_number: old_cardbag_number,
			// 	cardbag_detail_id: "0",
			// 	merberid: memberid
			// })
			// var action1 = "get_cardbag_detail";
			// this.$utils.post(action1, data1).then(res => {
			// 	if(res.sta == 1){
			// 		console.log('礼包信息')
			// 		console.log(res)
			// 		this.cardbag_in_people = res.cardbag_in_people
			// 		this.cardbag = res.cardbag
			// 		this.cardbag_theme = res.cardbag_theme
			// 		this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
			// 		this.price=res.cardbag.price
			// 		this.receive_info = res.receive_info
			// 		if (res.cardbag_theme.zhufu_type == "1") {
			// 			this.gift = '1'
			// 		} else if (res.cardbag_theme.zhufu_type == "0") {
			// 			this.gift = '0'
			// 		} else {
			// 			this.gift = '2'
			// 		}
			// 	}
			// })
			
			let data2 = JSON.stringify({
				cardbag_number: cardbag_number,
				cardbag_detail_id: "0",
				merberid: memberid
			})
            var action2 = "get_cardbag_detail";
            this.$utils.post(action2, data2).then(res => {
				this.typestring = res.cardbag.type;
            	console.log('礼包信息')
            	console.log(res)
            	this.cardbag_in_people = res.cardbag_in_people
            	this.cardbag = res.cardbag
            	this.cardbag_theme = res.cardbag_theme
            	this.zhufu_mp3 = res.cardbag_theme.zhufu_mp3
            	this.price=res.cardbag.price
				this.receive_info = res.receive_info
            	if (res.cardbag_theme.zhufu_type == "1") {
            		this.gift = '1'
            	} else if (res.cardbag_theme.zhufu_type == "0") {
            		this.gift = '0'
            	} else {
            		this.gift = '2'
            	}
            })
	
	     
		},
		methods: {
			goToDetails(keynum) {
				uni.navigateTo({
					url: "../details/details?keynum="+ keynum
				});
			},
			// 滑动
			scroll: function(e) {
				console.log(e)
				this.distance = e.detail.x
			},
			resend() {
				let action = 'order_add_shopping_cart';
				let memberid = uni.getStorageSync('id')
				let controller = 'order';
				let data = JSON.stringify({
					ordernumber: this.cardbag.cardbag_number,
					memberid: memberid
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta == 1){
						uni.reLaunch({
							url:'../shopping/shopping?type=0'
						})
					}
				})
			},
		},
		onShareAppMessage(res) {
			let cardbag_number = this.cardbag.cardbag_number
			
					//分享成功调用接口
					console.log(cardbag_number)
					var action1 = 'share_cardbag';
					var data1 = JSON.stringify({
						cardbag_number: cardbag_number,
					})
					this.$utils.post(action1, data1).then(res => {
						console.log('结果', res)
		
					})			
			let path = "pages/shopping/receive?cardbag_number=" + this.cardbag.cardbag_number;
			if(this.typestring == 1){
				path = "pages/shopping/CBlessingCardWe?cardbag_number=" + this.cardbag.cardbag_number
			}
			
			return {
				title: this.cardbag_theme.send_talk_msg,
				provider: "weixin",
				scene: "WXSceneSession",
				path: path,
				type: 0,
				imageUrl: this.cardbag_theme.share_background,
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
	page {
		background-color: #F32C14;
	}

	.bag-title {
		font-size: 20px;
		color: #fff;
		/* position: relative;
		top: 50rpx;
		left: 150rpx; */
	}

	.bag-con {
	    width: 90%;
	    /* height: 2000rpx; */
	    background-color: #fff;
	    /* position: relative; */
	    /* top: 160rpx; */
	    /* left: 35rpx; */
	    border-radius: 10rpx 10rpx 0rpx 0rpx;
	    margin: 100rpx auto 0rpx ;
	    /* padding-top: 200rpx; */
	    display: flex;
	    flex-direction: column;
		align-items: center;
		min-height: 1000rpx;
		/* padding-bottom: 30rpx; */
	}

	.bag-head {
		    width: 120rpx;
		    height: 120rpx;
		    border-radius: 50%;
		    position: absolute;
		    top: 80rpx;
		    left: 310rpx;
	}

	.bag-font {
		/* position: absolute;
		top: 100rpx;
		left: 195rpx; */
		    text-align: center;
		        margin-top: 90rpx;
	}

	.bag-tea {
		width: 368rpx;
    	height: 460rpx;
		border: 3rpx solid #CCB586;
		/* position: absolute;
		top: 100px;
		left: 180rpx; */
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
		border-radius: 10rpx;
	}

	.bag-tea-img {
		height: 360rpx;
    	width: 360rpx;
		border-radius: 10rpx;
	}

	.bag-tea-title {
		/* position: absolute;
		top: 300rpx; */
		margin-top: 20rpx;
	}

	.bag-gift {
		/* width: 90%; */
		/* height: 204rpx; */
		background-color: #F8F8F8;
		margin: 80rpx 0rpx;
		    width: 90%;
		/* position: absolute;
		margin-top: 350px;
		left: 35rpx; */
	}

	.bag-gift-title {
		width: 100%;
		height: 100rpx;
		/* border-bottom: 1px solid #E6E6E6; */
		display: flex;
		align-items: center;
	}

	.bag-gift-title-font {
		margin-left: 40rpx;
	}

	.bag-gift-title-head {
		width: 78rpx;
		height: 78rpx;
		/* border-radius: 50%; */
		margin-left: 40rpx;
		margin-right: 20rpx;
	}
	
	.bag-gift-title-head-img{
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
	}

	.bag-gift-title-tea {
		/* position: absolute;
		right: 40rpx; */
	}

	.transfer {
		width: 270rpx;
		height: 80rpx;
		border-radius: 50rpx;
		background-color: #EFEFEF;
		/* position: absolute;
		margin-top: 490px;
		left: 50rpx; */
		font-size: 30rpx;
		margin-right: 30rpx;
	}

	button[type=default] {
		color: #F33E2B;
	}
	
	.gray-view{
		width: 220rpx;
		height: 60rpx;
		background: #E6E6E6;
		border-radius: 3rpx;
		font-size: 25rpx;
		color: #666666;
	}

	.new-gray-view-dispaly{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.new-gray-view{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 220rpx;
		height: 66rpx;
		background: #F3E4E4;
		border-radius: 33rpx;
		font-size: 25rpx;
font-weight: 500;
color: #DB3C3A;
line-height: 34rpx;
	}

	.write {
		width: 270rpx;
		height: 80rpx;
		border-radius: 50rpx;
		/* position: absolute;
		margin-top: 490px;
		left: 350rpx; */
		font-size: 30rpx;
	}

	.bag-red {
		width: 612rpx;
		height: 1025rpx;
		position: relative;
		margin-top: 50rpx;
		/* background-color: #00BFFF; */
		/* position: relative;
		top: 1200rpx;
		margin-left: 100rpx; */
	}

	.bag-red-img {
		width: 100%;
		height: 1025rpx;
	}

	.bag-red-head {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: absolute;
		top: 40rpx;
		left: 40rpx;
	}

	.bag-red-title {
		position: absolute;
		top: 70rpx;
		left: 150rpx;
		color: #D3A97A;
	}

	.bag-red-fu {

		color: #F6DBA5;
	}

	.bag-red-con {
		width: 380rpx;
		color: #F6DBA5;
	}

	.bag-red-con1 {
		position: absolute;
		top: 45rpx;
		left: 70rpx;
	}

	.zhufu {
		width: 468rpx;
		height: 150rpx;
	    line-height: 35rpx;
	    position: absolute;
	    top: 200rpx;
	    left: 72rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.many-com {
	    display: flex;
	    justify-content: center;
	    flex-wrap: wrap;
	        margin-top: 50rpx;
	    /* height: 370rpx; */
	    position: relative;
	}

	.many {
		/* width: 100%; */
		/* border: 1px solid #000000; */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		    margin-top: 0rpx;
		    height: 370rpx;
		/* position: absolute;
		top: 80px; */
	}

	.bag-tea1 {
		width: 80%;
		height: 240rpx;
		border: 1px solid #CCB586;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}

	.bag-tea-title1 {
		margin-top: -80rpx;
	}

	.bag-tea-fen {
		margin-top: 80rpx;
		/* margin-left: -100rpx; */
		color: #666666;
	}

	.flowers {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		top: -9px;
	}

	.sound-cd {
		width: 390rpx;
		    height: 390rpx;
		    position: absolute;
		    top: 178rpx;
		    left: 120rpx;
	}

	.sound-san {
		width: 94rpx;
		    height: 94rpx;
		    position: absolute;
		    top: 367rpx;
		    left: 269rpx;
	}

	.sound-on {
	    width: 196rpx;
	        height: 90rpx;
	        position: absolute;
	        top: 100rpx;
	        right: 110rpx;
	    
	}

	.slider {
		width: 570rpx;
		    position: absolute;
		    top: 580rpx;
		    left: 30rpx;
	}

	.progress-one {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: #fff;
		position: absolute;
		top: 130rpx;
	}

	.template-btm-information-video {
		width: 590rpx;
		    position: absolute;
		    top: 150rpx;
		    left: 10rpx;
	}
	.b{
		width: 410rpx;
		height: 50rpx;
		margin-top: -26rpx;
	}
	.template-btm-information-video video{
		width: 590rpx;
		height: 400rpx;
	}
	.sound-on-rotate{
		transform: rotate(-45deg);
		animation: 2s;
		width: 196rpx;
		    height: 90rpx;
		    position: absolute;
		    top: 142rpx;
		    right: 110rpx;
	}
	
	
	.gift2{
		padding: 0 70rpx;
		    width: 100%;
			height: 170rpx;
			margin-bottom: 20rpx;
	}
	.gift2-list{
		border: 1px solid #CCB586;
		border-radius: 10rpx;
		padding: 30rpx 30rpx;
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

.wishes-line {
		line-height: 54rpx;
		background-color: #000;
		position: absolute;
		bottom: 311rpx;
		left: 4px;
		opacity: 0.7;
		padding: 0 20rpx;
		border-radius: 0 26rpx 26rpx 0;
	}
	
	.wishes-line-font {
		color: #BD9365;
		font-size: 24rpx;
	}
	
	.scroll-x{
	  height: 370rpx;
	  margin-top: 50rpx;
	}
	
</style>
