<template>
	<view style="border-top: 1px solid #F5F5F5;">
		<view v-if="screenPurchase.length > 0" class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="new-order-li" @click="handlerOrderInfo" :data-keynum="item.keynum">
					<view class="new-order-img">
						<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
					</view>
					<view class="new-order-item">
						<view class="new-order-item-title">{{item.goodsname}}</view>
						<view class="new-order-item-sku">{{item.goodstitle}}</view>
						<view class="new-order-right">
							<view class="new-order-item-sku">
								<!-- <view class="new-order-item-sku-time" v-if="item.effective_s_time || item.effective_s_time">兑换时间：</view> -->
								<view class="new-order-item-sku-time" v-if="item.effective_e_time || item.effective_e_time">兑换时间：{{item.effective_s_time}}～{{item.effective_e_time}}</view>
							</view>
							<view v-if="item.effective_status == 1" class="new-order-item-total" @click.stop="go_exchange" :data-keynum="item.keynum" :data-cliid="item.client_card_type_goods_id">立即兑换</view>
							<view v-if="item.effective_status == 2" class="new-order-item-total" style="opacity: 0.5;">未生效</view>
							<view v-if="item.effective_status == 3" class="new-order-item-total" style="background: #CCCCCC;color: #FFFFFF;">已过期</view>
						</view>
					</view>
			</view>
			<view style="height: 1px;width: 100%;background: #F1F1F1;margin-top: 20rpx;"></view>
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
				cardid: '',
				ordernumber: '',
				isOrder: 0
			}
		},
		onLoad: function(e) {
			this.cardid= e.cardid;
			this.ordernumber= e.ordernumber;
			uni.setStorageSync("dh_cardid",this.cardid)
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
				let action = "get_cardbag_goods_list";
				let controller = 'goods';
				let data = JSON.stringify({
					cardid: this.cardid,
					ordernumber: this.ordernumber
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					that.screenPurchase = res.rs.goods_list;
				})
			},
			handlerOrderInfo: function(e) {
				let keynum = e.currentTarget.dataset.keynum;
				uni.navigateTo({
					url:'/pages/details/details?keynum=' + keynum 
				})
			},
			//去兑换
			go_exchange: function(e) {
				let keynum = e.currentTarget.dataset.keynum;
				let cliid = e.currentTarget.dataset.cliid;
				uni.navigateTo({
					url: '/pages/index-coupon/index-address?good_keynum=' + keynum + '&isOrder=' + this.isOrder + '&isYear=1'+ '&ordernumber=' + this.ordernumber + '&cliid=' + cliid
				})
			},
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	
	.new-order-li{
		display: flex;
		padding: 20rpx 34rpx 0rpx 26rpx;
	}
	
	.new-order-img{
		width: 160rpx;
		height: 160rpx;
	}
	.new-order-commodity-img{
		width: 160rpx;
		height: 160rpx;
	}
	.new-order-item{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		width: 510rpx;
		position: relative;
		/* justify-content: center; */
	}
	.new-order-item-title{
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		width: 510rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 12rpx;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 12rpx;
	}
	.new-order-item-sku-time{
		font-size: 21rpx;
		color: #666666;
		margin-top: 10rpx;
	}
	.new-order-right{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		bottom: 0px;
		width: 510rpx;
	}
	
	.new-order-item-total{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 140rpx;
		height: 50rpx;
		background: #EC1815;
		border-radius: 28rpx;
		font-size: 22rpx;
		color: #FFFFFF;
		margin-top: 18rpx;
	}
	
</style>
