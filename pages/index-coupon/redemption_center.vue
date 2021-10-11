<template>
	<view class="center">
		<img class="index-img" src="https://zhijianlw.com/static/web/img/index-coupons-2021-08-28.png" mode="widthFix">
		<view class="choose">您可以选择下列1款礼物进行兑换</view>
		
		<view class="wrapper">
			<!-- 假数据 -->
			<view v-for="item in goodslist" class="tea">
				<view>
					<view class="tea-img" :data-keynum="item.keynum" @click="confirm_order">
						<image class="img" :src="$utils.imageUrl(item.head_img)" mode="widthFix"></image>
					</view>
					<view style="padding: 16rpx 20rpx 26rpx">
						<view class="t-title">{{item.goodsname}}</view>
						<view class="l-title">{{item.goodstitle}}</view>
						<button size="mini" class="sub" :data-keynum="item.keynum"   @click="goto">去兑换</button>
					</view>
				</view>
			</view>
			
			
			<!-- <view v-for="item in goodslist" class="tea">
				<view class="tea-img">
					<image class="img" :src="$utils.imageUrl(item.head_img)" mode=""></image>
				</view>
				<view>
					<text class="t-title">{{item.goodsname}}</text>
					<text class="l-title">{{item.goodstitle}}</text>
					<button size="mini" class="sub"   :data-keynum="item.keynum"   @click="confirm_order">去兑换</button>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodslist:[]
			}
		},
		onLoad: function(e) {
			console.log(e);
			uni.showToast({
				icon: "loading",
				title: "加载中"
			})
			var cardid=e.cardid
		    uni.setStorageSync("dh_cardid",cardid)
			var memberid = uni.getStorageSync('id')
			var action = 'get_card_goods';
			var data = JSON.stringify({
				cardid: cardid,
			    memberid: memberid,
			});

			this.$utils.post(action, data).then(res => {
				console.log('获取商品列表', res)
				this.goodslist = res.rs;
			})
		},
		methods: {
			goto(e) {
				let keynum = e.currentTarget.dataset.keynum;
				uni.redirectTo({
					url: './index-address?good_keynum=' + keynum
				})
			},
			goodsItem(item, e) {
				console.log(item);
				console.log(e);
			},
			clickLoadMore(e) {
				uni.showToast({
					icon: 'none',
					title: "当前状态：" + e.detail.status
				})
			},
			confirm_order:function (e){
				console.log(e);
				let keynum = e.currentTarget.dataset.keynum;
				// uni.navigateTo({
				// 	url: './index-address?good_keynum=' + keynum
				// })
				uni.navigateTo({
					url: './ExchangeDetails?keynum=' + keynum
				})
				
			}
		}
	}
</script>

<style>
	.center{
		background: #FAFAFA;
	}
	.index-img {
		width: 100%;
		height: 350rpx;
	}

	.choose {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
	
	.wrapper{
		padding: 0 16rpx;
		box-sizing: border-box;
		font-size: 0;
	}

	.tea {
		display: inline-block;
		width: 50%;
		padding: 0 10rpx;
		box-sizing: border-box;
		margin-bottom: 40rpx;
	}
	.tea>view{
		background-color: #fff;
		box-sizing: border-box;
	}
	.tea-img {
		width: 100%;
		height: 350rpx;
		position: relative;
		/* border: 1px dashed #000; */
	}
	.tea-img .img {
		max-width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.sub {
		color: #fff;
		width: 180rpx;
		border-radius: 15px;
		height: 56rpx;
		line-height: 56rpx!important;
		margin: 0 auto;
		display: block!important;
		background-color: #EC1815;
	}

	.t-title {
		font-weight: bold;
		display: block;
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 8rpx;
	}

	.l-title {
		color: #999;
		font-weight: bold;
		font-size: 24rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: 22rpx;
	}
</style>
