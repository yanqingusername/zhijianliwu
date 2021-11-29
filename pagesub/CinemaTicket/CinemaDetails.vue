<template>
	<view>
		<view class="cd-a">
			<view class="cd-a-img">
				<view class="cd-a-item">
					<view class="cd-a-item-left">
						<view class="cd-a-item-left-title">{{cinemaInfo.cinemaName}}</view>
						<view class="cd-a-item-left-1">
							<view class="cd-a-item-left-1-1">{{cinemaInfo.cinemaAddress}}</view>
							<view class="cd-a-item-left-1-2">· {{cinemaInfo.distance}}</view>
						</view>
						<view class="cd-a-item-left-lable"><view v-for="(item, index) in cinemaInfo.services" :key="index" class="cd-a-item-left-lable-1" style="display: flex;">{{item.name}}<view v-if="index != (cinemaInfo.services.length -1)" class="cd-a-item-left-lable-1" style="margin: 0rpx 6rpx 0rpx;">·</view></view></view>
					</view>
					<view class="cd-a-item-right">
						<image class="cd-a-item-right-img" @click="clickAdress"
							src="https://zhijianlw.com/static/web/img/icon_cd_position_2021_10_21.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="" style="padding-top: 12rpx;background: #FFFFFF;">
			<view class="">
				<!-- <swiper class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay"
					:previous-margin="previousMargin" :next-margin="nextMargin" :circular="circular" @change="change"
					:current="swiperCurrentIndex">
					<swiper-item class="swiper-container" v-for="(item,index) in moviesList" :key="index">
						<image :class="swiperCurrentIndex == index ? 'swiper-item' : 'swiper-itemDefault'"
							:src="item.pic">
						</image>
					</swiper-item>
				</swiper> -->
				<ynGallery 
					 :galleryheight="150" 
					  bkstart="#FFFFFF" 
					  bkend="#FFFFFF" 
					 :imgviewwidth="85" 
					 :imgviewheight="105" 
					 :showbadge="true"
					  badegtype="trian" 
					  badegwidth="25" 
					  badegheight="25" 
					 :showdec="true" 
					 :images="moviesList" 
					 @clickimg="onclickimg">
					</ynGallery>
			</view>
			<view class="cd-b">{{movieInfo.name}}<text class="cd-b-1">评分</text><text :class="movieInfo.grade == '0' ? 'cd-b-2-1':'cd-b-2'">{{movieInfo.grade == '0' ? '暂无': movieInfo.grade}}</text></view>
			<view class="cd-c-view">
				<view class="cd-c"><text v-if="movieInfo.duration">{{movieInfo.duration}}分钟</text><text v-if="movieInfo.filmTypes"> | {{movieInfo.filmTypes}}</text><text v-if="movieInfo.cast"> | {{movieInfo.cast}}</text><text style="margin-left: 10rpx;">{{'>'}}</text></view>
			</view>
			<view style="height: 30rpx;"></view>
			
			<view class="cth-a">
				<scroll-view scroll-x="true" class="scroll-view-top">
						<view style="display: flex;padding-left: 44rpx;">
							<view class="cth-a-2" style="padding-right: 36rpx;" v-for="(item,index) in itemsTime" :key="index" @click="clickTime" :data-timeindex="index" :data-date="item.date">
								<view :class="[timeIndex == index ? 'cth-a-2-1' : 'cth-a-2-1-default']">{{item.name}}</view>
								<view :class="[timeIndex == index ? 'cth-a-2-2' : 'cth-a-2-2-default']"></view>
							</view>
						</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="cd-item-view">
			<view class="cd-item" v-for="(item,index) in showsLsit" :key="index" :style="index == 0 ? 'margin-top: 14rpx;' : 'margin-top:20rpx;'">
				<view class="cd-item-left">
					<view class="cd-item-left-1"><text class="cd-item-left-1-1">{{item.showTime}}</text><text class="cd-item-left-1-2">{{item.showVersionType}}</text></view>
					<view class="cd-item-left-2"><text class="cd-item-left-2-1">{{item.endTime}}散场</text><text class="cd-item-left-2-2">{{item.hallName}}</text></view>
				</view>
				<view class="cd-item-right">
					<view class="cd-item-right-1">¥<text class="cd-item-right-1-1">{{item.salePrice}}</text><text class="cd-item-right-1-2">起</text></view>
					<view v-if="item.isSell == 0" class="cd-item-right-2">停售</view>
					<view v-if="item.isSell == 1" class="cd-item-right-3" @click="clickBuy" :data-showid="item.showId">购票</view>
				</view>
			</view>
		</view>

		<view style="height: 40rpx;"></view>



	</view>
</template>

<script>
	import ynGallery from '@/pagesub/YnComponents/ynGallery/ynGallery.vue'
	
	export default {
		components: {
			"ynGallery":ynGallery
		},
		data() {
			return {
				cinemaid: '',
				date: '',
				movieId:'',
				indicatorDots: false,
				autoplay: false,
				previousMargin: '148px',
				nextMargin: '148px',
				circular: true,
				swiperCurrentIndex: 0,
				itemsTime:[],
				timeIndex: 0,
				cinemaInfo:'',
				moviesList:[],
				movieInfo:'',
				showsLsit: []
			}
		},
		onLoad: function(options) {
			let that = this;
			this.cinemaid = options.cinemaid;
			this.date = options.date;
			this.movieId = options.movieId;
			
			if(this.movieId && this.date){
				this.getFilmCinemaMovies(1);
				this.getFilmShowList();
			}else{
				this.getFilmCinemaMovies(2);
			}
			
		},
		methods: {
			getFilmCinemaMovies(typeNumber) {
				let that = this;
				let action = 'get_film_cinema_movies';
				let controller = 'films';
				let data = JSON.stringify({
					cinemaId: that.cinemaid
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						that.cinemaInfo = res.rs.cinemaInfo;
						that.moviesList = res.rs.movies;
						if(typeNumber == 1){
							if(that.moviesList.length > 0){
								for (let i in that.moviesList) {
									if (that.moviesList[i].movieId == that.movieId) {
										that.movieId = that.moviesList[i].movieId;
										that.swiperCurrentIndex = i;
										that.movieInfo = that.moviesList[i];
									}
								}
							}
						}else{
							if(that.moviesList.length > 0){
								that.movieId = that.moviesList[0].movieId;
								that.swiperCurrentIndex = 0;
								that.movieInfo = that.moviesList[0];
								that.date = that.moviesList[0].publishDate;
								that.getFilmShowList();
							}
						}
					}
				})
			},
			getFilmShowList() {
				let that = this;
				let action = 'get_film_show_list';
				let controller = 'films';
				let data = JSON.stringify({
					cinemaId: that.cinemaid,
					movieId: that.movieId,
					date: that.date
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						that.itemsTime = res.rs.dates_list;
						that.showsLsit = res.rs.shows;
						for (let i in that.itemsTime) {
							if (that.itemsTime[i].date == that.date) {
								that.date = that.itemsTime[i].date;
								that.timeIndex = i;
							}
						}
					}
				})
			},
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.movieId = this.moviesList[this.swiperCurrentIndex].movieId;
				for (let i in this.moviesList) {
					if (this.moviesList[i].movieId == this.movieId) {
						this.movieId = this.moviesList[i].movieId;
						this.swiperCurrentIndex = i;
						this.movieInfo = this.moviesList[i];
					}
				}
				
				this.getFilmShowList();
				
			},
			onclickimg(e){
				this.movieId = e.movieId;
				this.movieInfo = e;
				this.getFilmShowList();
			},
			clickTime(e){
				this.timeIndex = e.currentTarget.dataset.timeindex;
				this.date = e.currentTarget.dataset.date;
				this.getFilmShowList();
			},
			clickBuy(e){
				let showid = e.currentTarget.dataset.showid;
				uni.navigateTo({
					url: `/pagesub/CinemaTicket/CinemaSeatSelect?showId=${showid}&cinemaName=${this.cinemaInfo.cinemaName}`
				})
			},
			clickAdress(){
				uni.openLocation({
					latitude: this.cinemaInfo.latitude,
					longitude: this.cinemaInfo.longitude,
					name: this.cinemaInfo.cinemaName,
					success: function () {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.cd-a {
		margin-top: 0rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 320rpx;
		background-image: url(https://zhijianlw.com/static/web/img/icon_cd_film_2021_10_21.png);
		background-size: 750rpx 320rpx;
	}

	.cd-a-img {
		position: absolute;
		bottom: -18rpx;
		/* left: 0rpx; */
		width: 730rpx;
		height: 242rpx;
		background-image: url(https://zhijianlw.com/static/web/img/icon_cd_map_2021_10_21.png);
		background-size: 730rpx 242rpx;
	}

	.cd-a-item {
		padding: 54rpx 44rpx 42rpx 46rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cd-a-item-left {
		width: 570rpx;
	}

	.cd-a-item-left-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.cd-a-item-left-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 24rpx;
	}

	.cd-a-item-left-1-1 {
		width: 430rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
		/* overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
	}

	.cd-a-item-left-1-2 {
		font-size: 24rpx;
		font-weight: bold;
		color: #666666;
		margin-left: 10rpx;
	}

	.cd-a-item-left-lable {
		display: flex;
		align-items: center;
	}
	.cd-a-item-left-lable-1 {
		font-size: 18rpx;
		color: #999999;
		margin-top: 24rpx;
	}

	.cd-a-item-right {
		width: 72rpx;
		height: 72rpx;
	}

	.cd-a-item-right-img {
		width: 72rpx;
		height: 72rpx;
	}
	
	.swiper-tall {
		display: flex;
		align-items: center;
		height: 216rpx;
	}
	.swiper-container {
		display: flex;
		align-items: flex-end;
		border-radius: 6rpx;
		/* width: 170rpx !important;
		height: 216rpx !important;
		text-align: center; */
	}
	.swiper-containerDefault {
		display: flex;
		align-items: flex-end;
		border-radius: 6rpx;
		height: 180rpx !important;
		width: 136rpx !important;
		text-align: center;
	}
	.swiper-itemDefault{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: 5px;
		margin-right: 5px;
		height: 180rpx;
		/* width: 136rpx; */
		text-align: center;
		border-radius: 6rpx;
	}
	swiper-item {
		border-radius: 6rpx;
	}
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: 5px;
		margin-right: 5px;
		/* width: 170rpx; */
	    height: 216rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	
	.cd-b{
		margin-top: 0rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		justify-content: center;
	}
	.cd-b-1{
		margin-left: 20rpx;
		font-size: 26rpx;
		color: #333333;
	}
	.cd-b-2{
		margin-left: 6rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FA9800;
	}
	.cd-b-2-1{
		margin-left: 6rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #FA9800;
	}
	.cd-c-view{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.cd-c{
		font-size: 20rpx;
		color: #999999;
		margin-top: 18rpx;
		text-align: center;
		width: 596rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.cth-a{
		/* height: 60rpx; */
		/* border-top: 1px solid #F5F5F5; */
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}
	.scroll-view-top{
		height: 48rpx !important;
	}
	.cth-a-2{
		/* width: 130rpx; */
		display: flex;
	    align-items: center;
		flex-direction: column;
		margin-top: 0rpx;
	}
	.cth-a-2-1{
		font-size: 24rpx;
		font-weight: bold;
		color: #333333;
	}
	.cth-a-2-1-default{
		font-size: 24rpx;
		color: #999999;
	}
	.cth-a-2-2{
		width: 28rpx;
		height: 4rpx;
		background: #DB3C3A;
		border-radius: 2rpx;
	    margin-top: 12rpx;
	}
	.cth-a-2-2-default{
		width: 28rpx;
		height: 4rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		margin-top: 12rpx;
	}
	
	.cd-item-view{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.cd-item{
		width: 700rpx;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 20rpx 30rpx 30rpx;
	}
	
	.cd-item-left{
		display: flex;
		/* align-items: center; */
		flex-direction: column;
		    width: 55%;
	}
	.cd-item-left-1{
		display: flex;
		align-items: baseline;
	}
	.cd-item-left-1-1{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		width: 90rpx;
	}
	.cd-item-left-1-2{
		margin-left: 24rpx;
		font-size: 22rpx;
		color: #666666;
	}
	
	.cd-item-left-2{
		display: flex;
		align-items: baseline;
		margin-top: 20rpx;
	}
	
	.cd-item-left-2-1{
		font-size: 18rpx;
		color: #999999;
		min-width: 90rpx;
	}
	.cd-item-left-2-2{
		font-size: 18rpx;
		color: #999999;
		margin-left: 24rpx;
	}
	
	.cd-item-right{
		display: flex;
		align-items: center;
	}
	.cd-item-right-1{
		font-size: 28rpx;
		color: #E02020;
	}
	.cd-item-right-1-1{
		font-size: 36rpx;
		color: #E02020;
		font-weight: bold;
	}
	.cd-item-right-1-2{
		font-size: 24rpx;
		color: #999999;
		margin-left: 4rpx;
	}
	.cd-item-right-2{
		margin-left: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 116rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 2rpx solid #AAAAAA;
		font-size: 26rpx;
		font-weight: bold;
		color: #AAAAAA;
	}
	
	.cd-item-right-3{
		margin-left: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 116rpx;
		height: 56rpx;
		border-radius: 30rpx;
		border: 2rpx solid #DB3C3A;
		font-size: 26rpx;
		font-weight: bold;
		color: #DB3C3A;
	}
	
</style>
