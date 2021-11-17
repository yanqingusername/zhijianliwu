<template>
	<view>
		<view style="position: fixed;top: 0rpx;z-index: 1;width: 100%;">
			<view class="cth-a">
				<scroll-view scroll-x="true" class="scroll-view-top">
					<view style="display: flex;padding-left: 44rpx;">
						<view class="cth-a-2" style="padding-right: 36rpx;" v-for="(item,index) in itemsTime"
							:key="index" @click="clickTime" :data-timeindex="index" :data-timedata="item.date" >
							<view :class="[timeIndex == index ? 'cth-a-2-1' : 'cth-a-2-1-default']">{{item.name}}</view>
							<view :class="[timeIndex == index ? 'cth-a-2-2' : 'cth-a-2-2-default']"></view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view v-if="tabNumber == 2">
				<view class="cth-c-top" style="padding-right: 30rpx;height: 100rpx;" v-if="isSearch">
					<view class="cth-search-top">
						<image class="cth-search-top-1"
							src="https://zhijianlw.com/static/web/img/icon_search_10_19.png"></image>
						<input type="text" name="keywords" @input="onkeyword" :value="keywords" confirm-type="search"
							focus @confirm="search" placeholder="影院名称或地址"
							placeholder-style="color: #AAAAAA;font-size: 28rpx;" />
						<image @click="clearKeyword" class="cth-search-top-1"
							src="https://zhijianlw.com/static/web/img/icon_close_tab_10_19.png"></image>
					</view>
					<view class="cth-search-top-title" @click="clickSearch">取消</view>
				</view>
				<view class="cth-c-top-two" v-else>
					<view class="cth-c-top" style="padding-left: 30rpx;">
						<view class="cth-c-1">
							<view @click="clickDetail"
								:data-url="'/pagesub/CinemaTicket/CinemaCityList?cityname='+cityname +'&cityCode='+cityCode"
								class="cth-c-1-1">{{cityname}}
								<image class="cth-c-1-1-1"
									src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image>
							</view>
							<view @click="clickRegions" class="cth-c-1-1" style="margin-left: 10rpx;">全城<image
									class="cth-c-1-1-1"
									src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image>
							</view>
							<view @click="clickSelect" class="cth-c-1-1" style="margin-left: 10rpx;">筛选<image
									class="cth-c-1-1-1"
									src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image>
							</view>
						</view>
						<view class="cth-c-top-img" @click="clickSearch">
							<image class="cth-c-top-img"
								src="https://zhijianlw.com/static/web/img/icon_search_tab_10_19.png"></image>
						</view>
					</view>

					<view class="cth-select-view" v-if="tabNumber == 2 && isRegions" @click="clickRegions">
						<view class="cthtop-Regions">
							<scroll-view scroll-y="true" class="cthtop-Regions-src">
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in FilmRegionsList" :key="index"
										:class="indxRegion == index ? 'cthtop-view-label-active':'cthtop-view-label'"
										@click="clickRegionCode" :data-regioncode="item.regionCode" :data-index="index">
										{{item.regionName}}</view>
								</view>
							</scroll-view>
						</view>
					</view>

					<view class="cth-select-view" v-if="tabNumber == 2 && currTag" @click="clickSelect">
						<view class="cthtop-view">
							<scroll-view scroll-y="true">
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">影院品牌</view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in FilmCinemaBrands" :key="index"
										:class="indxBrands == index ? 'cthtop-view-label-active':'cthtop-view-label'"
										@click="clickBrands" :data-brands="item" :data-index="index">{{item}}</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view
			:style="'margin-top:'+ (tabNumber == 2 ? (isSearch ? '160' : '140') :'90') + 'rpx;padding-bottom:120rpx;'">
			<view class="cth-c-content">今天有场次</view>

			<view class="cth-c-item" :style="index == 0 ? 'padding-top: 0rpx;' : 'padding-top:20rpx;'"
				v-for="(item,index) in FilmCinemaList" :key="index">
				<view class="cth-c-bg" @click="clickCinemaDetails" :data-cinemaid="item.cinemaId">
					<view class="cth-c-bg-view">
						<view class="cth-c-bg-1">{{item.cinemaName}}</view>
						<view class="cth-c-bg-2"><text class="cth-c-bg-2-2">¥{{item.downPrice}}</text><text
								class="cth-c-bg-2-3">起</text></view>
					</view>
					<view class="cth-c-bg-view" style="margin-top: 20rpx;">
						<view class="cth-c-bg-3">{{item.cinemaAddress}}</view>
						<view class="cth-c-bg-4">{{item.distanceText}}</view>
					</view>
					<view style="margin-top: 18rpx;display: flex;flex-wrap: wrap;">
						<view v-for="(itemInfo,index) in item.services" :key="index" :class="index == 0 ? 'cth-c-bg-label0' : (index == 1 ? 'cth-c-bg-label1' : (index == 2 ? 'cth-c-bg-label2' : 'cth-c-bg-label3'))">{{itemInfo.name}}</view>
					</view>
					
					<view class="cth-c-bg-view" style="margin-top: 18rpx;" v-if="item.near_film_time">
						<view class="cth-c-bg-3 text-cut" style="width: 565rpx;">近期场次：{{item.near_film_time}}</view>
					</view>
				</view>
			</view>

			<view class="cthi-bottom" @click="setAddress">
				<image class="cthi-bottom-img" src="https://zhijianlw.com/static/web/img/icon_refreach_10_20.png">
				</image>
				<view class="cthi-bottom-title">我在：{{addressname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indxBrands: 0,
				FilmCinemaBrands: [],
				indxRegion: 0,
				FilmRegionsList: [],
				isRegions: false,
				cityCode: "",
				regionCode: "",
				date: "",
				keywords: "",
				longitude: "",
				latitude: "",
				FilmCinemaList: [],
				pageSize: 10,
				pageIndex: 1,
				movieId: '',
				tabNumber: 2,
				currTag: false,
				cityname: '',
				isSearch: false,
				itemsList: [{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					},
					{
						'title': 'IMAX厅',
					}
				],
				itemsTime: [],
				timeIndex: 0,
				addressname: ''
			}
		},
		onLoad: function(options) {
			this.movieId = options.movieId;

			this.getAddress();
		},
		onShow() {

			this.cityname = uni.getStorageSync('cityname')
			this.cityCode = uni.getStorageSync('cityCode')
			this.getFilmMovieDatesInfo();
			
			this.getFilmCinemaList(1);
			this.getFilmRegionsList();
			this.getFilmCinemaBrands();
		},
		methods: {
			clickTime(e) {
				this.timeIndex = e.currentTarget.dataset.timeindex;
				this.date = e.currentTarget.dataset.timedata;
				this.getFilmCinemaList(1);
			},
			onkeyword(e) {
				this.keywords = e.detail.value;
			},
			search: function() {
				let keywords = this.keywords.replace(/[ ]/g, "");
				if (!keywords) {
					uni.showToast({
						icon: "none",
						title: "请输入搜索内容"
					})
					return
				}
				this.keywords = keywords;
				this.getFilmCinemaList(1);
			},
			clearKeyword() {
				this.keywords = '';
				this.getFilmCinemaList(1);
			},
			clickSearch() {
				this.isSearch = !this.isSearch;
				this.currTag = false;
			},
			clickSelect() {
				this.currTag = !this.currTag;
				this.isRegions = false;
			},
			clickRegions() {
				this.isRegions = !this.isRegions;
				this.currTag = false;
			},
			setAddress() {
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						that.getCityAddress(2,res.latitude, res.longitude);
					}
				});
			},
			getAddress() {
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						that.getCityAddress(1,res.latitude, res.longitude);
					}
				});
			},
			getCityAddress(typeString,latitude, longitude) {
				let that = this;
				let action = 'get_city_info';
				let controller = 'filmset';
				let data = JSON.stringify({
					latitude: latitude,
					longitude: longitude
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						if(typeString ==2){
							that.cityname = res.rs.address_component.city;
							that.cityCode = res.rs.cityCode;
							that.regionCode = '';
							if(that.itemsTime.length > 0){
								that.date = that.itemsTime[0].date;
							}
							that.keywords = '';
						}
						that.addressname = res.rs.address;
						that.longitude = longitude;
						that.latitude = latitude;
						that.getFilmCinemaList(1);
					}
				})
			},
			clickCinemaDetails(e) {
				let cinemaid = e.currentTarget.dataset.cinemaid;
				uni.navigateTo({
					url: `/pagesub/CinemaTicket/CinemaDetails?cinemaid=${cinemaid}&date=${this.date}&movieId=${this.movieId}`
				})
			},
			getFilmCinemaList(typeNumber) {
				if (typeNumber == 1) {
					this.pageIndex = 1;
				}

				let that = this;
				let action = 'get_film_movie_cinema_list';
				let controller = 'films';
				let data = JSON.stringify({
					movieId: this.movieId,
					cityCode: this.cityCode,
					regionCode: this.regionCode,
					date: this.date,
					keywords: this.keywords,
					longitude: this.longitude,
					latitude: this.latitude,
					size: this.pageSize,
					page: this.pageIndex,
				});
				this.$utils.postNew(action, data, controller).then(res => {
					if (typeNumber == 1) {
						that.pageIndex++;
						that.FilmCinemaList = res.rs.list;
						that.isAll = false;
					} else {
						if (res.rs.list.length > 0) {
							that.FilmCinemaList = that.FilmCinemaList.concat(res.rs.list);
							that.pageIndex++;
						} else {
							that.isAll = true;
						}
					}
				})
			},
			getFilmRegionsList() {
				let that = this;
				let action = 'get_film_regions_list';
				let controller = 'films';
				let data = JSON.stringify({
					cityCode: this.cityCode
				});
				this.$utils.postNew(action, data, controller).then(res => {
					that.FilmRegionsList = res.rs;
					let obj = {
						regionCode: "",
						regionName: "不限区域"
					}
					that.FilmRegionsList.unshift(obj)
				})
			},
			getFilmCinemaBrands() {
				let that = this;
				let action = 'get_film_cinema_brands';
				let controller = 'films';
				let data = JSON.stringify({});
				this.$utils.postNew(action, data, controller).then(res => {
					that.FilmCinemaBrands = res.rs;
					let obj = '全部'
					that.FilmCinemaBrands.unshift(obj)
				})
			},
			clickDetail(e) {
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				})
			},
			clickRegionCode(e) {
				this.regionCode = e.currentTarget.dataset.regioncode;
				this.indxRegion = e.currentTarget.dataset.index;
				this.getFilmCinemaList(1);
			},
			clickBrands(e) {
				this.keywords = e.currentTarget.dataset.brands;
				this.indxBrands = e.currentTarget.dataset.index;
				if (this.indxBrands == 0) {
					this.keywords = '';
				}
				this.getFilmCinemaList(1);
			},
			clickClear(e) {

			},
			getFilmMovieDatesInfo(){
				let that = this;
				let data = JSON.stringify({
					cityCode: this.cityCode,
					movieId: this.movieId
					// movieId: '28746',
					// cityCode: '110000',
				}); 
				let action = 'get_film_movie_dates_info';
				let controller = 'films';
				this.$utils.postNew(action, data, controller).then(res => {
					that.itemsTime = res.rs.dates_list;
					if(that.itemsTime.length > 0){
						that.date = that.itemsTime[0].date;
					}
					uni.setNavigationBarTitle({
						title:res.rs.movieInfo.name
					})
				});
			}
		},
		onPullDownRefresh: function() {

			this.getFilmCinemaList(1);
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom: function() {

			this.getFilmCinemaList(2);
		},

	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.cth-a {
		height: 60rpx;
		border-top: 1px solid #F5F5F5;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.cth-a-2 {
		/* width: 130rpx; */
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.cth-a-2-1 {
		font-size: 24rpx;
		font-weight: bold;
		color: #333333;
	}

	.cth-a-2-1-default {
		font-size: 24rpx;
		color: #999999;
	}

	.cth-a-2-2 {
		width: 28rpx;
		height: 4rpx;
		background: #DB3C3A;
		border-radius: 2rpx;
		margin-top: 12rpx;
	}

	.cth-a-2-2-default {
		width: 28rpx;
		height: 4rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		margin-top: 12rpx;
	}

	/**
		 * 
		 */
	.own-swiper {
		box-sizing: border-box;
		width: 100%;
		height: 280rpx;
		border-radius: 10rpx;
		/* margin-top: -50rpx; */
		/* position: fixed; */
		/* z-index: 99; */
	}

	.swiper-box {
		border-radius: 10rpx;
		overflow: hidden;
		transform: translateY(0);
	}

	swiper-item {
		border-radius: 10rpx !important;
	}

	.own-swiper-img {
		width: 100%;
		height: 100% !important;
		border-radius: 10rpx;
	}

	/* 自定义轮播图的指示点 */
	.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal {
		margin-bottom: 2rpx;
	}

	.swiper-box .wx-swiper-dot {
		width: 12rpx;
		display: inline-flex;
		height: 4rpx;
		justify-content: space-between;
	}

	.swiper-box .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: #000;
		opacity: 0.2;
		border-radius: 8rpx
	}

	.swiper-box .wx-swiper-dot-active::before {
		background: #fff;
		width: 24rpx;
	}

	.indicator-view {
		position: absolute;
		bottom: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-view-item {
		width: 36rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		margin-right: 6rpx;
	}

	.indicator-view-item-default {
		width: 24rpx;
		height: 6rpx;
		background: #000000;
		border-radius: 2rpx;
		opacity: 0.2;
		margin-right: 6rpx;
	}

	.cth-b {
		padding: 0rpx 25rpx;
		padding-bottom: 20rpx;
	}

	.cth-b-bg {
		width: 700rpx;
		height: 250rpx;
		background: #FFFFFF;
		border-radius: 1px;
		padding: 20rpx 17rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cth-b-bg-1 {
		width: 150rpx;
		height: 210rpx;
		border-radius: 6rpx;
	}

	.cth-b-bg-2 {
		margin-left: 24rpx;
		width: 470rpx;
		position: relative;
	}

	.cth-b-bg-2-1 {
		display: flex;
		align-items: center;
	}

	.cth-b-bg-2-1-1 {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.cth-b-bg-2-1-2 {
		display: flex;
		margin-left: 10rpx;
		width: 76rpx;
		height: 30rpx;
		border-radius: 3rpx;
		border: 1px solid #AAAAAA;
	}

	.cth-b-bg-2-1-2-1 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30rpx;
		height: 26rpx;
		background: #AAAAAA;
		/* border-radius: 3rpx 0px 0px 3px; */
		font-size: 14rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.cth-b-bg-2-1-2-2 {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 46rpx;
		height: 26rpx;
		background: #FFFFFF;
		/* border-radius: 3rpx 0px 0px 3px; */
		font-size: 14rpx;
		font-weight: bold;
		color: #AAAAAA;
	}

	.cth-b-bg-2-2 {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 26rpx;
	}

	.cth-b-bg-2-2-1 {
		font-size: 26rpx;
		font-weight: bold;
		color: #FA6400;
		margin-left: 6rpx;
	}

	.cth-b-bg-2-3 {
		font-size: 20rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 20rpx;
	}

	.cth-b-bg-2-4 {
		font-size: 20rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 20rpx;
	}

	.cth-b-bg-2-5 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0rpx;
		top: 56rpx;
		width: 120rpx;
		height: 60rpx;
		background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
		border-radius: 30rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.cth-b-bg-2-6 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0rpx;
		top: 56rpx;
		width: 128rpx;
		height: 60rpx;
		background: linear-gradient(57deg, #5BA3EE 0%, #427DE5 100%);
		border-radius: 30rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.cth-b-bg-2-7 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0rpx;
		top: 56rpx;
		width: 128rpx;
		height: 60rpx;
		background: linear-gradient(57deg, #F7CA7F 0%, #EEAA42 100%);
		border-radius: 30rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.cth-b-bg-2-8 {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 0rpx;
		top: 56rpx;
		width: 124rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 2rpx solid #AAAAAA;
		font-size: 26rpx;
		font-weight: bold;
		color: #999999;
	}

	.cth-positon {
		position: fixed;
		bottom: 206rpx;
		right: 0rpx;
		width: 210rpx;
		height: 90rpx;
		background-image: url(https://zhijianlw.com/static/web/img/icon_2021_10_19_03.png);
		background-size: 210rpx 90rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cth-c {
		padding-bottom: 120rpx;
	}

	.cth-c-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		background: #FFFFFF;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}

	.cth-c-top-two {
		display: flex;
		/* align-items: center; */
		background: #FFFFFF;
		flex-direction: column;
	}

	.cth-c-1 {
		display: flex;
		align-items: center;
	}

	.cth-c-1-1 {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		width: 110rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cth-c-1-1-1 {
		width: 16rpx;
		height: 16rpx;
		margin-left: 4rpx;
	}

	.cth-c-top-img {
		width: 40rpx;
		height: 40rpx;
	}

	.cth-c-item {
		padding: 20rpx 25rpx 0rpx;
	}

	.cth-c-bg {
		/* width: 700px; */
		/* height: 200px; */
		background: #FFFFFF;
		border-radius: 6px;
		padding: 30rpx 18rpx 20rpx 30rpx;
		display: flex;
		/* align-items: center; */
		justify-content: space-between;
		flex-direction: column;
	}

	.cth-c-bg-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
	}

	.cth-c-bg-1 {
		width: 420rpx;
		word-wrap: break-word;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.cth-c-bg-2 {}

	.cth-c-bg-2-1 {
		font-size: 24rpx;
		color: #999999;
	}

	.cth-c-bg-2-2 {
		font-size: 30rpx;
		font-weight: bold;
		color: #E02020;
		margin-left: 10rpx;
	}

	.cth-c-bg-2-3 {
		font-size: 24rpx;
		font-weight: bold;
		color: #999999;
		margin-left: 4rpx;
	}

	.cth-c-bg-3 {
		width: 460rpx;
		word-wrap: break-word;
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}

	.cth-c-bg-4 {
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}

	.cth-c-bg-label0{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rpx;
		opacity: 0.7;
		border: 1px solid #39B498;
		font-size: 18rpx;
		color: #39B498;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
	}
	.cth-c-bg-label1{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rpx;
		opacity: 0.7;
		border: 1px solid #FF5B40;
		font-size: 18rpx;
		color: #FF5B40;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
	}
	.cth-c-bg-label2{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rpx;
		opacity: 0.7;
		border: 1px solid #427DE5;
		font-size: 18rpx;
		color: #427DE5;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
	}
	.cth-c-bg-label3{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2rpx;
		opacity: 0.7;
		border: 1px solid #DDDDDD;
		font-size: 18rpx;
		color: #DDDDDD;
		padding: 2rpx 8rpx;
		margin-right: 10rpx;
	}


	.cth-search-top {
		width: 600rpx;
		height: 66rpx;
		background: #F2F2F2;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
	}

	.cth-search-top-1 {
		width: 32rpx;
		height: 32rpx;
		margin-left: 24rpx;
	}

	.cth-search-top input {
		width: 460rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #333333;
		margin-left: 8rpx;
	}

	.cth-search-top-title {
		width: 70rpx;
		height: 40rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 20rpx;
	}

	.cth-select-view {
		width: 750rpx;
		height: 100%;
		border-radius: 0px 0px 20rpx 20rpx;
		position: fixed;
		z-index: 99;
		background: rgba(0, 0, 0, .34);
		/* opacity: 0.34; */
		margin-top: 80rpx;
	}

	.cthtop-Regions {
		width: 750rpx;
		height: 320rpx;
		background: #FFFFFF;
		border-radius: 0px 0px 20rpx 20rpx;
		position: relative;
	}

	.cthtop-Regions-src {
		height: 272rpx !important;
	}

	.cthtop-view {
		width: 750rpx;
		height: 450rpx;
		background: #FFFFFF;
		border-radius: 0px 0px 20rpx 20rpx;
		position: relative;
	}

	.cthtop-view-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50rpx;
		background: #FFFFFF;
		padding-left: 44rpx;
		padding-right: 40rpx;
	}

	.cthtop-view-left {
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
	}

	.cthtop-view-right {
		font-size: 23rpx;
		color: #999999;
		display: flex;
		align-items: center;
	}

	.cthtop-view-right-img {
		width: 18rpx;
		height: 18rpx;
		margin-left: 6rpx;
	}

	.cthtop-view-label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 202rpx;
		height: 66rpx;
		background: #F6F6F6;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
		margin: 0rpx 10rpx 20rpx;
		border: 2rpx solid #F6F6F6;
	}

	.cthtop-view-label-active {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 202rpx;
		height: 66rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin: 0rpx 10rpx 20rpx;
		border: 2rpx solid #DF5250;
		background: #DF5250;
	}

	.cth-select-bottom {
		position: absolute;
		bottom: 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 0px 0px 20rpx 20rpx;
	}

	.cth-select-bottom-left {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 318rpx;
		height: 78rpx;
		border-radius: 44rpx;
		border: 2rpx solid #CCCCCC;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}

	.cth-select-bottom-right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 318rpx;
		height: 78rpx;
		border-radius: 44rpx;
		border: 2rpx solid #DF5250;
		background: #DF5250;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: 20rpx;
	}

	scroll-view {
		height: 420rpx !important;
	}

	.scroll-view-top {
		height: 60rpx !important;
	}

	.cth-c-content {
		font-size: 24rpx;
		font-weight: bold;
		color: #999999;
		padding: 28rpx 55rpx 9rpx;
	}

	.cthi-bottom {
		display: flex;
		align-items: center;
		/* justify-content: center; */
		width: 750rpx;
		height: 80rpx;
		/* background: rgb(0,0,0,.09); */
		background: #EEEEEE;
		position: fixed;
		bottom: 0rpx;
	}

	.cthi-bottom-img {
		width: 30rpx;
		height: 30rpx;
		margin-left: 43rpx;
	}

	.cthi-bottom-title {
		font-size: 24rpx;
		color: #666666;
		margin-left: 4rpx;
	}
	
	.text-cut {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
</style>
