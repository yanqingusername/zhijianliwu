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
		<view v-if="screenPurchase.length > 0" class="order-purchase-view" v-for="(item,index) in screenPurchase" :key="index">
			<view class="new-order-li" @click="handlerOrderInfo" :data-ordernumber="item.ordernumber"  :data-isnianka="item.is_nianka">
				<view class="new-order-li-top">
					<view class="new-order-li-top-ordersn">兑换编号：{{item.ordernumber}}</view>
					<view class="new-order-li-top-orderstatus" v-if="item.order_status_info">{{item.order_status_info}} ></view>
				</view>
				<view class="new-order-li-center">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.cardtype_img" mode=""></image>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.card_name}}</view>
							<view class="new-order-item-sku" v-if="item.card_type_info">规格：{{item.card_type_info}}</view>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item-total">共1件</view>
					</view>
				</view>
				<view class="new-order-li-bottom" v-if="item.order_status_type != 4">
					<view class="new-order-nickname"></view>
					<view class="new-order-botton-view" v-if="item.card_type == 0">
						<view class="new-order-botton-gray" v-if="item.order_status_type == 0" @click.stop="goTransfer" :data-ordernumber="item.ordernumber">转赠</view>
						<view class="new-order-botton" v-if="item.order_status_type == 0" @click.stop="goRecharge" :data-ordernumber="item.ordernumber">去充值</view>
						<!-- <view class="new-order-botton-gray" v-if="item.order_status_type == 1 || item.order_status_type == 2 || item.order_status_type == 3" @click.stop="$buttonClick(refundHandler)">换货/售后</view> -->
					</view>
					<view class="new-order-botton-view" v-if="item.card_type == 1">
						<view class="new-order-botton-view" v-if="item.is_nianka==0">
							<view class="new-order-botton-gray" v-if="item.order_status_type == 0 && item.is_exchange==0" @click.stop="goTransfer" :data-ordernumber="item.ordernumber">转赠</view>
							<view class="new-order-botton" v-if="item.order_status_type == 0" @click.stop="go_exchange" :data-cardid="item.cardid" :data-isnianka="item.is_nianka" :data-ordernumber="item.ordernumber">去兑换</view>
							<view class="new-order-botton-gray" v-if="(item.order_status_type == 1 || item.order_status_type == 2 || item.order_status_type == 3) && item.is_nianka==0" @click.stop="refundHandler" :data-ordernumber="item.ordernumber">换货/售后</view>
						</view>
						<view class="new-order-botton-view" v-else>
							<view class="new-order-botton-gray" v-if="item.is_exchange == 1" @click.stop="clickHandler" :data-ordernumber="item.ordernumber" >兑换记录</view>
							<view class="new-order-botton-gray" v-if="item.order_status_type == 0 && item.is_exchange==0" @click.stop="goTransfer" :data-ordernumber="item.ordernumber">转赠</view>
							<view class="new-order-botton" v-if="item.order_status_type == 0 && item.is_cardbag_logo == 0" @click.stop="go_exchange" :data-cardid="item.cardid" :data-isnianka="item.is_nianka" :data-ordernumber="item.ordernumber">去兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="post-bottom" v-if="isAll && screenPurchase.length > 0">
			<view class="post-bottom-line"></view>
			<view class="post-bottom-text">我是有底线的</view>
			<view class="post-bottom-line"></view>
		</view>
		<view class="apply-success-view" v-if="screenPurchase.length==0">
			<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
			<view class="apply-success-text">当前兑换订单暂无数据～</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	import uma from 'umtrack-wx';
	export default {
		components: {},
		data() {
			return {
				isAll: false,
				pageSize: 10,
				pageIndex: 1,
				screenPurchase: []
			}
		},
		onLoad: function(e) {
			
		},
		onShow() {
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			this.getProductList(1);
		},
		onPullDownRefresh:function(){
			this.getProductList(1);
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			this.getProductList(2);
		},
		methods: {
			getProductList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = "get_exchange_order_list";
				let controller = 'order';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					memberid: memberid
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.screenPurchase = res.rs;
						that.isAll = false;
					} else {
						if(res.rs.length>0){
							that.screenPurchase = that.screenPurchase.concat(res.rs);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				})
			},
			//转赠
			goTransfer: function(e) {
				uma.trackEvent('Um_Event_ExchangeTransfer', {
					Um_Key_ItemName: "兑换订单转赠"
				});
				
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: `../shopping/shop?type=1&statutype=exchange&ordernumber=${ordernumber}&is_exchange_type=1`
				})
			},
			//去兑换
			go_exchange: function(e) {
				let cardid = e.currentTarget.dataset.cardid;
				let is_nianka = e.currentTarget.dataset.isnianka;
				let ordernumber = e.currentTarget.dataset.ordernumber;
				if(is_nianka == 1){
					uma.trackEvent('Um_Event_ExchangeYearCard', {
						Um_Key_ItemName: "年卡兑换"
					});
					
					uni.navigateTo({
						url: '/pagesub/YearCard/YearCardShopList?cardid=' + cardid + '&ordernumber='+ ordernumber
					})
				}else{
					uma.trackEvent('Um_Event_ExchangeCard', {
						Um_Key_ItemName: "普通兑换"
					});
					
					uni.redirectTo({
						url: './redemption_center?cardid=' + cardid + '&ordernumber='+ ordernumber
					})
				}
			},
			//去充值
			goRecharge: function(e) {
				uma.trackEvent('Um_Event_ExchangeRecharge', {
					Um_Key_ItemName: "兑换充值"
				});
				
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let memberid = uni.getStorageSync('id')
				let controller = 'order';
				let action = 'recharge_giftcard';
				let data = JSON.stringify({
					memberid: memberid,
					ordernumber: ordernumber
				});
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						setTimeout(()=>{
							uni.navigateTo({
								url: '../balance/RechargeStatus?istype=1&ordernumber=' + ordernumber
							})
						},500)
					} else {
						uni.showToast({
						 	title:res.msg,
						 	icon:"none",
						 	mask:'true',
						});
					}
				});
			},
			// 换货/售后
			refundHandler: function(e){
				uma.trackEvent('Um_Event_ExchangeRefund', {
					Um_Key_ItemName: "兑换换货/售后"
				});
				
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.redirectTo({
					url: `../../pagesub/Refund/RefundAfterSale?ordernumber=${ordernumber}` //退换/售后
				})
			},
			// 详情
			handlerOrderInfo: function(e){
				let ordernumber = e.currentTarget.dataset.ordernumber;
				let is_nianka = e.currentTarget.dataset.isnianka;
				if(is_nianka == 1){
					uma.trackEvent('Um_Event_YearCardDetail', {
						Um_Key_ItemName: "年卡兑换订单详情"
					});
					
					uni.navigateTo({
						url: '/pagesub/YearCard/YearCardDetail?ordernumber='+ ordernumber
					})
				}else{
					uma.trackEvent('Um_Event_ExchangeOrderInfo', {
						Um_Key_ItemName: "兑换订单详情"
					});
					
					uni.navigateTo({
						url: './ExchangeOrderInfo?ordernumber=' + ordernumber
					})
				}
			},
			clickHandler: function(e){
				uma.trackEvent('Um_Event_ExchangeYearCardOrderList', {
					Um_Key_ItemName: "年卡兑换记录"
				});
				
				let ordernumber = e.currentTarget.dataset.ordernumber;
				uni.navigateTo({
					url: '/pagesub/YearCard/YearCardOrderList?ordernumber='+ordernumber
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
