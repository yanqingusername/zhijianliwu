<template>
	<view>
		<!-- <view class="uni-padding-wrap uni-common-mt">
			<view v-show="current === 1">
				<view class="no-btm" v-if="cardlist2.length<=0">
					暂无数据！
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>
				<view v-for="item in cardlist2" :key="item.id" class="not">
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
				</view>
			</view>
		</view> -->
		<!-- <view class="empty-no-btm" v-if="sta==0">
			<image class="empty-no-img" src="https://zhijianlw.com/static/web/img/empty_page_xm.png" mode=""></image>
			<view class="empty-no-text">您还没有购买过礼物，快去挑选吧～</view>
			<view class="empty-no-view">买礼物送好友</view>
		</view> -->
		<!-- 我购买的 -->
		<view class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="no-btm" v-if="screenPurchase.length==0">
				<image class="img" src="https://zhijianlw.com/static/web/img/empty_page_xm.png" mode=""></image>
				暂无相关订单
			</view>
			<view class="new-order-li" @click="$buttonClick(receptionOrderInfo)">
				<view class="new-order-li-top">
					<view class="new-order-li-top-ordersn">{{'兑换编号：20210415615'}}</view>
					<view class="new-order-li-top-orderstatus">运输中 ></view>
				</view>
				<view class="new-order-li-center">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.cardtype_img" mode=""></image>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.name}}</view>
							<view class="new-order-item-sku">规格：礼盒装</view>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item-total">共1件</view>
					</view>
				</view>
				<view class="new-order-li-bottom">
					<view class="new-order-nickname"></view>
					<view class="new-order-botton-view">
						<view class="new-order-botton-gray" @click="$buttonClick(refundHandler)">换货/售后</view>
						<!-- <view class="new-order-botton" @click="$buttonClick(receptiondetails)">填写收货地址</view> -->
					</view>
				</view>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				current: 1,
				cardlist2: [],
				screenPurchase: [
					{
						"cardtype_img": "../../static/nono.jpg",
						"name": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					},
					{
						"cardtype_img": "../../static/nono.jpg",
						"name": "云南古树茶叶",
						"money": 180,
						"sku": "礼盒装",
						"number": 3,
						"desc": "退货成功"
					},
					{
						"cardtype_img": "../../static/nono.jpg",
						"name": "云南古树茶叶",
						"money": 980,
						"sku": "礼盒装",
						"number": 5,
						"desc": "换货中"
					},
					{
						"cardtype_img": "../../static/nono.jpg",
						"name": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					}
				]
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
			//去兑换
			go_exchange: function(e) {
				console.log(e);
				let cardid = e.currentTarget.dataset.cardid;
				uni.navigateTo({
					url: './redemption_center?cardid=' + cardid
				})
			},
			refundHandler: function(e){
				uni.navigateTo({
					url: '/pagesub/Refund/RefundAfterSale'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.not {
		width: 100%;
		margin-left: -40rpx;
	}

	.uni-card {
		width: 100%;
		margin: 20rpx auto;
		position: relative;
		left: 10rpx;
	}

	.per {
		width: 140rpx;
	}

	._img {
		height: 130rpx;
	}

	.title {
		position: absolute;
		top: 130rpx;
		left: 200rpx;
		font-weight: bold;
	}

	.specs {
		position: absolute;
		top: 200rpx;
		left: 200rpx;
		color: #999;
	}

	.num {
		color: #999;
		position: absolute;
		top: 165rpx;
		left: 560rpx;
	}

	.default {
		margin-left: 320rpx;
		background-color: unset;
		border: 1px solid #999;
		color: #999;
	}

	.warn {
		color: #EB1615;
		border: 1px solid #EB1615;
		background-color: unset;
		float: right;
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
	
	.order-purchase-view{
		background-color: #FFF;
	}
	.new-order-li{
		width: 100%;
		margin-top: 20rpx;
	}
	.new-order-li-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 45rpx 20rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-li-top-ordersn{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
	}
	.new-order-li-top-orderstatus{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 25rpx 45rpx 25rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}
	.new-order-left{
		width: 540rpx;
		display: flex;
		align-items: center;
	}
	
	.new-order-scroll {
	    width: 540rpx;
	    height: 140rpx;
	}
	
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-item{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 380rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-right{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.new-order-item-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-nickname{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
	}
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 45rpx 18rpx 38rpx;
	}
	
	.new-order-botton-view{
		display: flex;
		align-items: center;
	}
	.new-order-botton{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
		margin-left: 20rpx;
	}
	.new-order-botton-gray{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		border-radius: 3rpx;
		border: 1px solid #979797;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		padding: 0rpx 18rpx;
	}
	.empty-no-btm{
		margin-top: 184rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.empty-no-img{
		width: 255rpx;
		height: 180rpx;
	}
	.empty-no-text{
		margin-top: 56rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.empty-no-view{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 468rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		margin-top: 75rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
</style>
