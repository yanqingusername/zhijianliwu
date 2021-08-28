<template>
	<view class="sale-view">
		<view class="new-order-li-center" v-for="(item,index) in screenPurchase" :key="index" @click="bindPickerChange" :data-index="index">
			<view class="exchange-view-item">
				<view class="exchange-view exchange-view-width">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.img" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.title}}</view>
							<view class="new-order-item-money"></view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.sku}}</view>
							<view class="new-order-item-total">x{{item.number}}</view>
						</view>
					</view>
				</view>
				<view class="exchange-view-right">
					<image class="picker-view-img" :src="[indexPicker == index ? '../../static/icon_reason_d.png' : '../../static/icon_reason_m.png']"></image>
				</view>
			</view>
		</view>
		
		<view class="exchange-bottom" @click="routeHandler">
			<view class="exchange-button">确定</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				indexPicker: 0,
				screenPurchase: [
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 180,
						"sku": "礼盒装",
						"number": 3,
						"desc": "退货成功"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 980,
						"sku": "礼盒装",
						"number": 5,
						"desc": "换货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 180,
						"sku": "礼盒装",
						"number": 3,
						"desc": "退货成功"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 980,
						"sku": "礼盒装",
						"number": 5,
						"desc": "换货中"
					},
					{
						"img": "../../static/nono.jpg",
						"title": "云南古树茶叶",
						"money": 1080,
						"sku": "礼盒装",
						"number": 1,
						"desc": "退货中"
					}
				]
			}
		},
		onShow:function(e){
			
			 
		},
		onLoad:function(e){	
			
		},
		methods: { 
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.index)
				this.indexPicker = e.currentTarget.dataset.index
			},
			routeHandler: function(e) {
				uni.navigateTo({
					url: './ApplyRefund'
				})
			},
		}
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.sale-view{
		    /* background: #FFFFFF; */
		    margin-top: 22rpx;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    padding: 10rpx 0rpx 150rpx 0rpx;
	}
	.new-order-li-center{
		display: flex;
		align-items: center;
		position: relative;
		justify-content: space-between;
		padding: 25rpx 0rpx;
		border-bottom: 2rpx solid #EEEEEE;
		width: 100%;
		background: #FFFFFF;
	}
	.exchange-view-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0rpx 45rpx 0rpx 38rpx;
	}
	.exchange-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.exchange-view-width{
		/* width: 80%; */
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
		width: 380rpx;
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
		width: 380rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.new-order-item-money{
		font-size: 24rpx;
		color: #333333;
		line-height: 33rpx;
	}
	.new-order-item-sku{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.new-order-item-total{
		font-size: 24rpx;
		color: #999999;
		line-height: 33rpx;
		margin-top: 18rpx;
	}
	.exchange-view-right{
		width: 20%;
		text-align: right;
	}
	.picker-view-img{
		width: 36rpx;
		height: 36rpx;
	}
	.exchange-empty{
		height: 200rpx;
	}
	.exchange-bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 10rpx;
	    z-index: 77;
	}
	.exchange-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 660rpx;
		height: 80rpx;
		background: #EC1815;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}
</style>
