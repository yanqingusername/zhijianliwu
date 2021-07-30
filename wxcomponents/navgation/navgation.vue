<template>
	<view>
		
	<!-- 	<view class="navgation1">
			<view :style="{height:height + 'px'}"></view>
			<view class="navgation-header flex-vertically white" >
				<view class="navgation-logo">
				</view>
				<view class="navgation-search flex-vertically">
					<image class="navgation-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<input class="navgation-search-input"  disabled="true" type="text" value="" placeholder="搜索热门礼物" />
				</view>
			</view> 
		</view> -->
		
		<view class="navgation"  >
			<view :style="{height:height + 'px'}"></view>
			 
			<view class="navgation-header flex-vertically white">
				<view class="navgation-logo">
					<image class="navgation-logo" :src="logo" mode="widthFix"></image>
				</view>
				<view class="navgation-search flex-vertically">
					<image class="navgation-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<input class="navgation-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" />
				</view>
			</view>
		</view>
		
		<view class="navgation fixed"  :class="[fixed==1?'':'none']">
			<view :style="{height:height + 'px'}"></view>
			 
			<view class="navgation-header flex-vertically white">
				<view class="navgation-logo">
					<image class="navgation-logo" :src="logo" mode="widthFix"></image>
				</view>
				<view class="navgation-search flex-vertically">
					<image class="navgation-search-img" src="@/static/navgation-search-img.png" mode="widthFix"></image>
					<input class="navgation-search-input" disabled="true" type="text" value="" placeholder="搜索热门礼物" />
				</view>
			</view>
		</view>
		 
		
		
		
	</view>
</template>

<script>
	export default {
		props:{
		  fixed:0,
          height:'',
		  logo:'',
		},
		data() {
			return {
			}
		},
		onLoad:function(option) {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	.fixed{
		position: fixed;
		top:0;
	}
	.navgation1{
		  width: 100%;
		  background: #FFF;
		  z-index: 999;
	}
  .navgation{
	  width: 100%;
	  background: #FFF;
	  z-index: 999;
  }
  .navgation-header{
	  height: 95rpx;
	  background: #FFF;
  }
    .navgation-logo{
	    margin:0 54rpx 0 15rpx;
		width:173.61rpx;
		height: 46.52rpx !important;
	}
	.navgation-search{
		width: 275rpx;
		height: 59.72rpx;
		background: #F9F9F9;
		border-radius: 24.3rpx;	
	}
	  .navgation-search-img{
		  width: 26.38rpx;
		  height: 26.38rpx;
		  margin: 0 22.91rpx 0 17.36rpx;
	  }
	  .navgation-search-input{
		  font-size: 22.91rpx;
		  width: 184.02rpx;
		  height: 26.38rpx;
		
	  }

</style>
