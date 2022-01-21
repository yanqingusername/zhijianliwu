<template>
	<scroll-view class="monthDescTab" scroll-x="true" scroll-with-animation>
		<!-- <view class="own-grid-box" :style="'height:'+boxHeight+'rpx'"> -->
		<!-- <view class="own-grid-box"> -->
			<view class="own-grid-item" v-for="item, index in list" :key="index" @click="goToTheme" :data-url="item.url" :data-item="item">
				<image :src="$utils.imageUrl(item.icon)" mode="" class="own-grid-item-image"></image>
				<view class="own-grid-item-text">
					{{item.name}}
				</view>
			</view>
		<!-- </view> -->
    </scroll-view>
</template>

<script>
	import uma from 'umtrack-wx';
	export default {
		props: ["list"],
		data() {
			return {
				list: []
			}
		},
		methods: {
			goToTheme: function(e) {
				let url = e.currentTarget.dataset.url;
				let item = e.currentTarget.dataset.item;
				
				uma.trackEvent('Um_Event_ToTheme', {
					Um_Key_ItemName: item.name,
					Um_Key_ItemId: item.id
				});
				
				if(url && url != null){
					uni.navigateTo({
						url: url
					});
				}
				// id=10 为特殊值，指定为电影卡列表
				// if(id == 10){
				// 	uni.navigateTo({
				// 		url: "/pagesub/CinemaTicket/CinemaTicketHome"
				// 	});
				// }else{
				// 	uni.navigateTo({
				// 		url: "../product-list/product-list?type=module&key=" + id
				// 	});
				// }
			}
		},
		computed:{
			boxHeight: function(){
				return Math.floor(this.list.length/5)*80;
			}
		}
	}
</script>

<style>
	.monthDescTab {
	    width: 100%;
	    white-space: nowrap;
	    font-size: 30rpx;
		margin: 30rpx 0 40rpx;
	    /* height: 200upx; */
	    /* line-height: 200rpx; */
		/* margin-top: 220rpx; */
	}
/* .own-grid-box{
	width: 600px;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	overflow: hidden;
	margin-top: 30rpx;
} */
.own-grid-item{
	display: inline-block;
	/* width: 120rpx; */
	/* height: 140rpx; */
	/* display: flex;
	flex-direction: column;
	justify-content: center; */
	/* margin: 0 26rpx; */
	width: 20%;
}
.own-grid-item:first-child{
	/* margin-left: 45rpx; */
}
.own-grid-item:last-child{
	right: 45rpx;
	/* width: auto; */
}
.own-grid-item-image{
	display: block;
	margin: 0 auto;
	width: 90rpx;
	height: 90rpx;
}
.own-grid-item-text{
	/* width: 120rpx; */
	text-align: center;
	margin-top: 12rpx;
	font-size: 12px;
}
.monthDescTab ::-webkit-scrollbar {
	display: none;
}
</style>
