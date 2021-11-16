<template>
	<view class="address">
		<view class="addre" v-if="address.id != ''" @click="choiceAddress">
			<h3 class="phone">{{address.name}} {{address.phone}}</h3>
			<view class="text">{{address.address}}</view>
			<text class="icon icon-z-right"></text>
		</view>

		<view class="addre" v-else @click="choiceAddress">
			<view class="text-day">选择地址</view>
			<text class="icon icon-z-right"></text>
		</view>

		<view class="a-tea">
			<view class="top">
				<view class="new-order-li-center">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="$utils.imageUrl(goodsinfo.head_img)" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{goodsinfo.goodsname}}</view>
							<view class="new-order-item-money">¥{{goodsinfo.price}}</view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{goodsinfo.goods_default_spec_item}}</view>
							<view class="new-order-item-total">×1</view>
						</view>
					</view>
				</view>
				<!-- <view class="a-img">
					<img :src="$utils.imageUrl(goodsinfo.head_img)" style="width:100%;height:100%;" mode="widthFix">
				</view>
				<view class="tree flex-center">
					<view class="uni flex-between-wrap">
						<text class="title uni-ellipsis">{{goodsinfo.goodsname}}</text>
						<text class="price">￥1080</text>
					</view>
					<view>
						<text class="title1">规格：礼盒装</text>
						<text class="num">×1</text>
					</view>
				</view> -->
			</view>
			<view class="bottom">
				<view class="z-time-wrap">
					<text class="day">配送</text>
					<text class="date">{{'预计3-5天送达'}}</text>
				</view>
				<view class="apply-refund-view">
					<!-- <view class="say" style="font-weight: bold;margin-bottom: 20rpx;margin-left: 12rpx;">给商家留言</view>				 -->
					<!-- <view class="message-text"><textarea class="message" type="text" v-if="showInput" v-model="remark" placeholder="选填，可备注联系人，备用电话，订单说明等" ></textarea></view>				 -->
					<view class="apply-refund-text"><textarea maxlength="100" type="text" v-if="showInput" v-model="remark" placeholder="留言选填，可备注联系人、备用电话、订单说明等；" /></view>	
				</view>
			</view>
		</view>
		<button class="button" @click="sub">立即兑换</button>
		
		
		
		<!-- 绑定成功提示 -->
		<view class="success-pop" v-if="showPop">
			<view class="pop-center clearfix" style="padding: 52rpx;">
				<image @click="close" class="close" src="https://zhijianlw.com/static/web/img/z-close.png" mode="widthFix"></image>
				<view class="p">恭喜您，成功兑换礼品！</view>
				<!-- <navigator class="n" hover-class="none" url="./change">立即查看</navigator> -->
				<view class="n" hover-class="none" @click="clickHandler">立即查看</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				goodsinfo: [],
				address: {},
				good_keynum: "",
				remark: "",
				showInput: true,
				showPop: false,
				isOrder: 0,
				isYear: 0,
				ordernumber: ''
			}
		},
		onLoad: function(e) {

			if(e && e.isOrder){
				this.isOrder =  e.isOrder;
			}
			if(e && e.isYear){
				this.isYear =  e.isYear;
			}
			if(e && e.ordernumber){
				this.ordernumber =  e.ordernumber;
			}

			console.log(e);
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			var good_keynum = e.good_keynum;
			var memberid = uni.getStorageSync('id')
			this.memberid = memberid;
			this.good_keynum = good_keynum;
			var action = 'get_goods_detail';
			var data = JSON.stringify({
				keynum: good_keynum,
				memberid: memberid,
			});

			this.$utils.post(action, data).then(res => {
				console.log('获取商品详细信息', res)
				this.goodsinfo = res.rs.goodsinfo;
			})
		},
		onShow: function(e) {
			this.$set(this.address, 'id', uni.getStorageSync('member_area_id'));
			this.$set(this.address, 'name', uni.getStorageSync('member_area_linkman'));
			this.$set(this.address, 'phone', uni.getStorageSync('member_area_linktel'));
			this.$set(this.address, 'address', uni.getStorageSync('member_area_address'));

		},
		methods: {
			close: function(){
				this.showInput = true;
				this.showPop = false;
				uni.navigateBack({
					delta:1
				});
			},
			clickHandler(){
				this.showPop = false;
				this.showInput = true;
				if(this.isYear == 1){
					uni.redirectTo({
						url: '/pagesub/YearCard/YearCardOrderList?ordernumber='+this.ordernumber
					})
				}else{
					if(this.isOrder == 1){
						uni.navigateBack({
					        delta:1
					    })
					} else {
						uni.redirectTo({
							url:"./ExchangeOrder"
						});
					}
				}
			},
			
			sub: function(e) {
				//获取需要的数据

				let data = JSON.stringify({
					memberid: this.memberid,
					member_area_id: this.address.id,
					cardid: uni.getStorageSync('dh_cardid'),
					goodsid: this.goodsinfo.id,
					goods_model: this.goodsinfo.goods_model,
					goods_spec: this.goodsinfo['goods_spec'][0]['id'],
					goods_item: this.goodsinfo['goods_spec'][0]['goods_spec_item'][0]['item'],
					delivery_type: '快递',
					remark: this.remark

				});
				console.log(data);

				var action = 'exchange_giftcard';
				this.$utils.post(action, data).then(res => {
					console.log(res);
					if (res.sta == 1) {
						this.showInput = false;
						this.showPop = true;
						// uni.showModal({
						// 	title: '',
						// 	content: '恭喜您，兑换成功！',
						// 	success: function(res1) {
						// 		if (res1.confirm) {
						// 			uni.navigateTo({ //跳转页面
						// 				url: "./change"
						// 			})
						// 		} else if (res1.cancel) {
						// 			console.log('用户点击取消');
						// 		}
						// 	}
						// });
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})


					}
				})
			},
			choiceAddress: function() {
				uni.navigateTo({
					url: '../Add/Add?cardbag_number=5',
				});
			},
		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.address{
		padding-bottom: 110rpx;
	}
	
	.addre {
		padding: 40rpx 100rpx 30rpx 56rpx;
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
	}

	.addre .icon {
		font-size: 32rpx;
		color: #333;
		position: absolute;
		right: 32rpx;
		top: 50%;
		transform: translateY(-50%);
		margin-top: 2rpx;
	}

	.phone {
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
		line-height: 1.8em;
		margin-bottom: 10rpx;
	}

	.text {
		font-size: 26rpx;
		color: #666;
		line-height: 1.8em;
	}
	
	.text-day{
		font-weight: bold;
		color: #333;
		font-size: 30rpx;
	}

	.a-tea {
		box-sizing: border-box;
		width: 100%;
		height: 360rpx;
		background-color: #fff;
		margin-top: 20rpx;
		position: relative;
	}

	.top {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		padding: 40rpx 38rpx 30rpx 38rpx;
		border-bottom: 2rpx solid #EEEEEE;
	}

	.a-img {
		width: 140rpx;
		height: 140rpx;
		background-color: #F3F3F3;
	}

	.a-tea img {
		height: 100rpx;
	}

	.tree {
		margin-left: 20rpx;
		width: 516rpx;
		/* flex: 1;
		width: 80%;
		padding-top: 10rpx; */
	}
	.tree > view{
		display: flex;
	}
	.tree > view:first-child{  margin-bottom: 17rpx;}

	.title {
		width: 80%;
		flex: 1;
		color: #333;
		font-size: 30rpx;
		margin-right: 30rpx;
		line-height: 1.8em;
		font-weight: 500;
	}

	.title1 {
		width: 80%;
		flex: 1;
		color: #999;
		font-size: 24rpx;
		margin-right: 30rpx;
	}

	.price {
		font-size: 30rpx;
	}

	.num {
		
		color: #999;
		font-size: 24rpx;
	}

	.bottom {
		padding: 26rpx 38rpx;
		background-color: #fff;
	}
	.z-time-wrap{
		margin-bottom: 60rpx;
	}
	.day {
		font-weight: bold;
		color: #333;
		font-weight: bold;
		font-size: 30rpx;
	}

	.date {
		color: #ccc;
		font-weight: normal;
		float: right;
		font-size: 30rpx;
	}
	.liuyan{
		 display: flex;
	}
	.say {
		font-size: 24rpx;
		color: #666;
	}
	
	.message-text{
		font-size: 24rpx;
		color: #999;
		width: 80%;
		flex: 1;
		/* text-align: right; */
		display: inline-block;
		align-items: baseline;
		/* margin-left: 40rpx; */
		height: 84rpx;
	}

	.message {
		font-size: 24rpx;
		color: #999;
		width: 100%;
		flex: 1;
		/* text-align: right; */
		display: inline-block;
		align-items: baseline;
		height: 84rpx;
	}
	
	.apply-refund-view{
			
			margin-top: 0rpx;
		}
	.apply-refund-text{
		width: 700rpx;
		height: 175rpx;
		background: #FAFAFA;
		border-radius: 6rpx;
			padding: 24rpx 12rpx;
		}
		.apply-refund-text textarea{
			font-size: 26rpx;
			color: #AAAAAA;
			height: 175rpx;
		}

	.button {
		position: fixed;
		bottom: 0;
		background-color: #EC1815;
		color: #fff;
		width: 100%;
		height: 105rpx;
		line-height: 105rpx;
		border-radius: 0!important;
		
	}
	
	/**
	 * 
	 */
	.new-order-li-center{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		/* padding: 28rpx 16rpx 25rpx 18rpx;
		border-bottom: 2rpx solid #EEEEEE; */
	}
	.new-order-left{
		width: 140rpx;
		display: flex;
		align-items: center;
	}
	.new-order-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-commodity-img{
		width: 140rpx;
		height: 140rpx;
	}
	.new-order-right{
		display: flex;
		flex-direction: column;
		width: 516rpx;
		margin-left: 20rpx;
	}
	.new-order-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-order-item-title{
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		width: 500rpx;
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
	/**
	 * 
	*/
</style>
