<template>
	<view class="sale-view">
		<view class="new-order-li-center" v-for="(item,index) in goods_list" :key="index" @click="bindPickerChange" :data-index="index" :data-detailsid="item.id">
			<view class="exchange-view-item">
				<view class="exchange-view exchange-view-width">
					<view class="new-order-left">
						<view class="new-order-img">
							<image lazy-load="true" class="new-order-commodity-img" :src="item.head_img" mode=""></image>
						</view>
					</view>
					<view class="new-order-right">
						<view class="new-order-item">
							<view class="new-order-item-title">{{item.goodsname}}</view>
							<view class="new-order-item-money"></view>
						</view>
						<view class="new-order-item">
							<view class="new-order-item-sku">规格：{{item.goods_spec_item}}</view>
							<view class="new-order-item-total">x{{item.goodsnum}}</view>
						</view>
					</view>
				</view>
				<view class="exchange-view-right">
					<image class="picker-view-img" :src="[item.isShow ? '../../static/icon_reason_d.png' : '../../static/icon_reason_m.png']"></image>
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
				ordernumber: '',
				typerefund: 1,
				orderGood:'',
				goods_list: [],
				detailIdsList:[]
			}
		},
		onShow:function(e){
			
			 
		},
		onLoad:function(options){	
			this.ordernumber=options.ordernumber;
			this.typerefund=options.typerefund;
			
			let action = 'get_refund_order_goods_list';
			let controller = 'order';
			let memberid = uni.getStorageSync('id')
			let data = JSON.stringify({
				type: this.typerefund,
				ordernumber: this.ordernumber,
				memberid: memberid
			})
			this.$utils.postNew(action, data, controller).then(res => {
			    if(res.sta == 1){
			        this.orderGood = res.rs;
					this.goods_list= res.rs.goods_list;
					for(let i in this.goods_list){
						this.goods_list[i].isShow = false;
					}
					console.log('this.goods_list---->:',this.goods_list)
			    }
			})
		},
		methods: { 
			bindPickerChange: function(e) {
				let index = e.currentTarget.dataset.index;
				this.indexPicker = e.currentTarget.dataset.index;
				let detailId = e.currentTarget.dataset.detailsid;
				console.log('---->:',)
				
				let selectedData = this.detailIdsList || [];
				let item = this.goods_list[index];
				if(item.isShow){
				    item.isShow = false;
				    for (let i = 0; i < selectedData.length; i++) {
				        if(selectedData[i] == detailId){
				          selectedData.splice(i, 1);
				        }
				    }
				} else {
				    item.isShow = true;
				    selectedData.push(detailId);
				}
				this.detailIdsList = selectedData
				
			},
			routeHandler: function(e) {
				let detailid = this.detailIdsList.join(",");
				console.log('--detailid-->:',detailid)
				uni.redirectTo({
					url: `../../pagesub/Refund/ApplyRefund?ordernumber=${this.ordernumber}&typerefund=${this.typerefund}&detailid=${detailid}`
				});
				// uni.navigateTo({
				// 	url: './ApplyRefund'
				// })
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
