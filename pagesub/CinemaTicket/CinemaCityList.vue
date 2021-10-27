<template>
	<view>
		<view class="ccl-view">当前选择</view>
		<view class="ccl-view-name-view">
			<view class="ccl-view-name">{{cityname}}</view>
		</view>
		<uniindexedlist :options="FilmCitiesList" :showSelect="false" @click="bindClick"></uniindexedlist>

	</view>
</template>

<script>
	import uniindexedlist from '@/components/uni-indexed-list/uni-indexed-list'
	export default {
		components:{
			uniindexedlist
		},
		data() {
			return {
				FilmCitiesList:[],
				cityname: '',
				cityCode: ''
			}
		},
		onLoad: function(options) {
			this.cityname = options.cityname;
			this.cityCode = options.cityCode;
			
			uni.setStorageSync('cityname', this.cityname)
			uni.setStorageSync('cityCode', this.cityCode)
			
			let that = this;
			this.getFilmCitiesList();

		},
		methods: {
			getFilmCitiesList(){
				let that = this;
				let action = 'get_film_cities_list';
				let controller = 'films';
				let data = JSON.stringify({
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					that.FilmCitiesList = res.rs;
				})
			},
			bindClick(e){
				this.cityname = e.item.name;
				this.cityCode = e.item.cityCode;
				
				uni.setStorageSync('cityname', this.cityname)
				uni.setStorageSync('cityCode', this.cityCode)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.ccl-view{
		height: 80rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}
	.ccl-view-name-view{
		height: 100rpx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}
	.ccl-view-name{
		height: 60rpx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-radius: 4rpx;
		border: 2rpx solid #DF5250;
		background: #FFFFFF;
		font-size: 30rpx;
		font-weight: bold;
		color: #DF5250;
		margin-left: 20rpx;
		    padding: 0rpx 30rpx;
	}
	
</style>
