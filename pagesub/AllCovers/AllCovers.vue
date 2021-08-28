<template>
	<view class="imgslist">
		<!-- <block v-for="imgData in imgsList" :key="index" > -->
			<view class="imgs" v-for="item in imgsList" :key="index" @click="submitrefund" :data-id="item.id" :data-background="item.background">
				<image :src="$utils.imageUrl(item.background)" mode=""class="imgs-head-img" ></image>
				<image class="new-balance-img" :src="[number==item.id?'../../static/bala_current_cz.png':'']"></image>
			</view>
		<!-- </block> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgsList:[],
				number: -1
			} 
		},
		onLoad:function(options){
			
			if(options && options.id){
				this.number = options.id
			}
			
			var data = '{}';
			var action = 'get_zhufu_theme_type';
						
			this.$utils.post(action, data).then(res => {
				console.log('可选模板', res)
				// 可选模板
				this.imgsList = res.rs;
						
			})
			
		},
		methods: {
			submitrefund(e){
				// uni.navigateTo({
				// 	// url:'./ExchangeDetails' //待兑换详情
				// 	url: './ExchangeOrderInfo' // 已兑换详情
				// })
				let background = e.currentTarget.dataset.background;
				let id = e.currentTarget.dataset.id
				uni.setStorageSync('all_cover_bg', background);
				uni.setStorageSync('all_cover_id', id)
				this.number= e.currentTarget.dataset.id;
				
				uni.navigateBack({
					delta:1
				});
			},
		}
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}

.imgslist {
	  padding: 30rpx 15rpx;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  background: #FFFFFF;
	}
	
	.imgs {
	    width: 340rpx;
	    background: #FFFFFF;
	    border-radius: 10rpx;
	    position: relative;
	    height: 207rpx;
		margin: 0rpx 10rpx 50rpx 10rpx;
	}
	
	.imgs-head-img{
		width: 100%;
		height: 207rpx;
		border-radius: 10rpx;
	}
	
	.new-balance-img{
		position: absolute;
		text-align: center;
		bottom: 0rpx;
		right: 0rpx;
		z-index: 9;
		width: 52rpx;
		height: 50rpx;
	}
	
</style>
