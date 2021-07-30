<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#EC1815" @clickItem="onClickItem" />
			<view v-show="current === 0">



				<view class="no-btm" v-if="cardlist1.length<=0">
					暂无数据！
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>


				<view v-for="item in cardlist1" :key="item.id" class="not">

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
			<view v-show="current === 1">


				<view class="no-btm" v-if="cardlist2.length<=0">
					暂无数据！
					<image class="img" src="../../static/nobtm.jpg" mode=""></image>
				</view>

				<view v-for="item in cardlist2" :key="item.id" class="not">


					<uni-card :title="item.cardnum" :extra="good.extra">
						<view class="img-background">
							<img class="pers" :src="item.cardtype_img">
						</view>
						<h4 class="title">{{item.name}}</h4>
						<text class="specs"></text>
						<text class="num">共1件</text>
					</uni-card>


				</view>
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
</style>
