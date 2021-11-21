<template>
	<view>
		<view v-if="screenPurchase.length > 0" class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="new-order-li">
				<view class="new-order-li-top">
					<view class="new-order-li-top-ordersn">兑换编号：{{item.ordernumber}}</view>
					<view class="new-order-li-top-orderstatus">{{item.wulliu_status_info}}</view>
				</view>
				<view class="new-order-li-center" @click="handlerOrderInfo" :data-keynum="item.clientkeynum">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.goodsname}}</view>
							<!-- <view class="new-order-item-sku">{{item.goods_spec_item}}</view> -->
							<view class="new-order-right">
								<view class="new-order-item-sku">规格：{{item.goods_spec_item || '默认'}}</view>
								<view class="new-order-item-total">x{{item.goodsnum}}</view>
							</view>
						</view>
					</view>
					
				</view>
				<view class="new-order-li-bottom">
					<view class="new-order-nickname">兑换时间：{{item.add_time}}</view>
					<view class="new-order-botton-gray" v-if="item.wulliu_status == 2 || item.wulliu_status == 3" @click.stop="logisticInfo" :data-ordernumber="item.ordernumber">查看物流</view>
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
				screenPurchase: [],
				ordernumber: ''
			}
		},
		onLoad: function(e) {
			this.ordernumber = e.ordernumber;
			
		},
		onShow() {
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			this.getProductList();
		},
		methods: {
			getProductList(){
				let that = this;
				let action = "get_exchange_order_logo";
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					ordernumber: this.ordernumber,
					memberid: memberid
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					that.screenPurchase = res.rs;
				})
			},
			// 查看物流
			logisticInfo: function(e) {
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: "/pagesub/Refund/LogisticsInfo?ordernumber=" + ordernumber
				});
			},
			// 详情
			handlerOrderInfo: function(e){
				let keynum = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url:'/pages/details/details?keynum=' + keynum 
				})
			},
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
		width: 168rpx;
		height: 168rpx;
	}
	.new-order-commodity-img{
		width: 168rpx;
		height: 168rpx;
	}
	.new-order-item{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}
	.new-order-item-title{
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		width: 480rpx;
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
		justify-content: space-between;
	}
	.new-order-item-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-item-total{
		font-size: 26rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-nickname{
		font-size: 24rpx;
		color: #666666;
		line-height: 33rpx;
	}
	.new-order-li-bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15rpx 35rpx 18rpx 38rpx;
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
		width: 140rpx;
		border-radius: 3rpx;
		border: 1px solid #EB1615;
		font-size: 24rpx;
		color: #EB1615;
		line-height: 33rpx;
		/* padding: 0rpx 18rpx; */
		margin-left: 20rpx;
	}
	.new-order-botton-gray{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48rpx;
		width: 140rpx;
		border-radius: 3rpx;
		border: 1px solid #979797;
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		/* padding: 0rpx 18rpx; */
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
	
	.post-bottom{
		display: flex;
		align-items: center;
		color: #B3B3B3;
		text-align: center;
		padding-top: 24rpx;
		padding-bottom: 48rpx;
		justify-content: center;
	}
	.post-bottom-text{
		font-size: 24rpx;
		color: #B3B3B3;
		line-height: 33rpx;
		margin: 0rpx 18rpx;
	}
	.post-bottom-line{
		width: 240rpx;
		height: 1px;
		background: #E0E0E0;
	}
	.apply-success-view{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.apply-success-img{
		width: 255rpx;
		height: 180rpx;
		margin-top: 172rpx;
	}
	.apply-success-text{
		padding: 60rpx 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		line-height: 48rpx;
	}
</style>
