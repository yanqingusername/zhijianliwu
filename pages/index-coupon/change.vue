<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#EC1815" @clickItem="onClickItem" />
			<view v-show="current === 0">
				<view class="no-btm" v-if="cardlist1.length<=0">
					<image class="img empty-img" src="../../static/empty_page_xm.png" mode="widthFix"></image>
				</view>
				<!-- 假数据 -->
				<view class="not" v-for="item in cardlist1" :key="item.id">
					<uni-card :title="item.cardnum" :extra="item.extra" note="true">
						<view class="list-top">
							<text class="sn">订单号：20210415615</text>
							<view class="right"><text>未兑换</text><text class="icon icon-z-right"></text></view>
						</view>
						<view class="z-list-center">
							<view class="image"><img class="per" src="../../static/empty_page_xm.png" mode="widthFix"></view>
							<view class="name">
								<h4 class="title">{{item.name}}</h4>
								<text class="specs">规格：50</text>
							</view>
							<text class="num">共1件</text>
						</view>
						<template v-slot:footer>
							<view class="footer-box clearfix">
								<text class="tui z-btn">转赠</text>
								<text class="warn z-btn" :data-cardid="item.cardid" @click="go_exchange">去兑换</text>
							</view>
						</template>
					</uni-card>
				</view>

				<!-- <view v-for="item in cardlist1" :key="item.id" class="not">
					<uni-card :title="item.cardnum" :extra="item.extra" note="true">
						<img class="per" :src="item.cardtype_img">
						<h4 class="title">{{item.name}}</h4>
						<text class="specs"></text>
						<text class="num">共1件</text>
						<template v-slot:footer>
							<view class="footer-box">
								<button class="warn" type="default" size="mini" :data-cardid="item.cardid" @click="go_exchange">去兑换</button>
							</view>
						</template>
					</uni-card>
				</view> -->
			</view>
			
			
			<view v-show="current === 1">


				<view class="no-btm" v-if="cardlist2.length<=0">
					<image class="img empty-img" src="../../static/empty_page_xm.png" mode="widthFix"></image>
				</view>
				
				<!-- 假数据 -->
				<view v-for="item in cardlist2" :key="item.id" class="not">
					<uni-card :title="item.cardnum" :extra="good.extra">
						<view class="list-top">
							<text class="sn">兑换：20210415615</text>
							<view class="right"><text>运输中</text><text class="icon icon-z-right"></text></view>
						</view>
						<view class="z-list-center">
							<view class="image">
								<img class="per" :src="item.cardtype_img" mode="widthFix">
							</view>
							<view class="name">
								<h4 class="title">{{item.name}}</h4>
								<text class="specs">规格：50</text>
							</view>
							<text class="num">共1件</text>
						</view>
						<template v-slot:footer>
							<view class="footer-box clearfix">
								<navigator class="tui z-btn" url="">退货/售后</navigator>
							</view>
						</template>
					</uni-card>
				</view>
				
				
				<!-- <view v-for="item in cardlist2" :key="item.id" class="not">
					<uni-card :title="item.cardnum" :extra="good.extra">
						<view class="img-background">
							<img class="pers" :src="item.cardtype_img">
						</view>
						<h4 class="title">{{item.name}}</h4>
						<text class="specs"></text>
						<text class="num">共1件</text>
					</uni-card>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				items: ['待兑换', '已兑换'],
				current: 0,
				cardlist1: [],
				cardlist2: []
			}
		},
		onLoad: function(e) {
			this.openid = uni.getStorageSync('openid');
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			let that = this;
			var memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			var action = 'get_bind_giftcard';
			var data = JSON.stringify({
				memberid: memberid,
				status: 3
			});

			this.$utils.post(action, data).then(res => {
				console.log('礼品卡列表', res.cardlist)
				that.cardlist1 = res.cardlist;
				that.pageIndex++;
			})

			var action1 = 'get_bind_giftcard';
			var data1 = JSON.stringify({
				memberid: memberid,
				status: 4
			});

			this.$utils.post(action1, data1).then(res => {
				console.log('礼品卡列表2', res.cardlist)
				that.cardlist2 = res.cardlist;
				that.pageIndex++;
			})



		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			//去兑换
			go_exchange: function(e) {
				console.log(e);
				let cardid = e.currentTarget.dataset.cardid;
				uni.navigateTo({
					url: './redemption_center?cardid=' + cardid
				})
			},
		}
	}
</script>

<style>
	.segmented-control{ 
		background-color: #fff;
	}
	.list-top{
		padding: 20rpx 38rpx 14rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.list-top .sn{
		color: #666;
		font-size: 24rpx;
	}
	.list-top .right{
		float: right;
		font-size: 0;
	}
	.list-top .right>text{
		display: inline-block;
		vertical-align: middle;
		color: #333;
		font-size: 24rpx;
	}
	.list-top .right .icon{
		margin-left: 6rpx
	}
	.z-list-center{
		padding: 35rpx 45rpx;
		position: relative;
	}
	.z-list-center .image{
		width: 140rpx;
		height: 140rpx;
		padding: 10rpx;
		box-sizing: border-box;
		background: #FAFAFA;
		display: inline-block;
		vertical-align: middle;
		margin-right: 27rpx;
		position: relative;
	}
	.z-list-center image{
		max-width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.z-list-center .name{
		display: inline-block;
		vertical-align: middle;
	}
	._h4{
		color: #333;
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.specs{
		color: #999;
		font-size: 24rpx;
		/* font-weight: bold; */
		/* margin-bottom: 20rpx; */
	}
	.uni-common-mt {
		margin-top: 0;
		padding: 0;
	}
	
	.not {
		width: 100%;
		margin-top: 20rpx
	}
	.uni-card__content--pd.data-v-19622063 {
		padding: 0!important;
	}
	.uni-card {
		width: 100%;
		margin: 20rpx 0 0 0!important;
		/* position: relative; */
		/* left: 10rpx; */
	}

	._img {
		height: 130rpx;
	}
/* 
	.title {
		position: absolute;
		top: 130rpx;
		left: 200rpx;
		font-weight: bold;
	} */
/* 
	.specs {
		position: absolute;
		top: 200rpx;
		left: 200rpx;
		color: #999;
	} */

	.num {
		color: #999;
		position: absolute;
		top: 50%;
		right: 35rpx;
		font-size: 24rpx;
		transform: translateY(-50%);
	}

	.default {
		margin-left: 320rpx;
		background-color: unset;
		border: 1px solid #999;
		color: #999;
	}
	.footer-box{
		text-align: right;
	}
	
	.z-btn{
		padding: 8rpx 0;
		width: 140rpx;
		text-align: center;
		border: 1rpx solid transparent;
		border-radius: 4rpx;
		display: inline-block;
	}

	.warn {
		color: #EB1615!important;
		border: 1px solid #EB1615;
		background-color: #fff!important;
		margin-left: 20rpx;
	}
	.tui{
		color: #999999!important;
		border: 1px solid #999999;
		background-color: #fff!important;
	}

	.quee {
		margin-left: -15rpx;
	}

	.img-background {
		width: 160rpx;
		height: 150rpx;
		background-color: #FAFAFA;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pers {
		width: 130rpx;
	}

	.nots {
		width: 90%;
		margin-left: -40rpx;
	}

	.yiduihuan {
		position: absolute;
		left: 39rpx;
	}

	.no-btm {
		line-height: 64rpx;
		color: #B4B4B4;
		text-align: center;
	}
	.empty-img{
		width: 256rpx;
	}
</style>
