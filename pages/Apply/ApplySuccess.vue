<template>
	<view class="apply-success-view" v-if="types ==2">
		<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
		<view class="apply-success-text">您已成功提交发票申请，我们将在1-3个工作日处理并开具发票，请耐心等待。</view>
	</view>
	<view class="apply-success-view" v-else>
		<image src="https://zhijianlw.com/static/web/img/empty_page_xm.png" class="apply-success-img"></image>
		<view class="apply-success-text" v-if="billInfo.order_bill_info.type == 0">发票已开具，请查看您的邮箱"提交资料的邮箱地址"查看并下载发票。</view>
		<view class="apply-success-text" v-if="billInfo.order_bill_info.type == 1">发票已开具，并已安排寄出，请您注意查收快递。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordernumber: '',
				types: 2,
				billInfo: ''
			} 
		},
		onLoad:function(e){
			if(e && e.ordernumber && e.types){
				this.ordernumber = e.ordernumber;
				this.types = e.types;
				
				let that = this;
				let action = 'get_order_bill_info';
				let memberid = uni.getStorageSync('id')
				let controller = 'order';
				let data = JSON.stringify({
					ordernumber: this.ordernumber,
					memberid: memberid
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta == 1){
						this.billInfo = res.rs;
						
					}
				})
			}
			
			if(this.types == 1){
				uni.setNavigationBarTitle({
					title:'发票详情'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'申请成功'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #FAFAFA;
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
