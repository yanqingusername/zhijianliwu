<template>
	<!-- <view @touchmove="handletouchmove" @touchstart="handletouchstart" @touchend="handletouchend"> -->
	<view>
		<view style="position: fixed;top: 0rpx;z-index: 1;width: 100%;">
			<view class="cth-a">
				<view class="cth-a-1">
					<view style="display: flex;align-items: center;">
						<image class="cth-a-1-1" src="https://zhijianlw.com/static/web/img/icon_2021_10_19_01.png"></image>
						<view class="cth-a-1-2">{{cityname}}</view>
					</view>
					<view class="cth-a-2-2-default"></view>
				</view>
				<view class="cth-a-2" style="margin-left: 40rpx;" @click.stop="clickTabs" data-tabnumber="0">
					<view :class="tabNumber == 0 ? 'cth-a-2-1' : 'cth-a-2-1-default'">热映</view>
					<view :class="tabNumber == 0 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
				</view>
				<view class="cth-a-2" @click.stop="clickTabs" data-tabnumber="1">
					<view :class="tabNumber == 1 ? 'cth-a-2-1' : 'cth-a-2-1-default'">待映</view>
					<view :class="tabNumber == 1 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
				</view>
				<view class="cth-a-2" @click.stop="clickTabs" data-tabnumber="2">
					<view :class="tabNumber == 2 ? 'cth-a-2-1' : 'cth-a-2-1-default'">影院</view>
					<view :class="tabNumber == 2 ? 'cth-a-2-2' : 'cth-a-2-2-default'"></view>
				</view>
			</view>
			<view v-if="tabNumber == 2">
				<view class="cth-c-top" style="padding-right: 30rpx;height: 100rpx;" v-if="isSearch">
					<view class="cth-search-top">
						<image class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_search_10_19.png"></image>
						<input type="text" name="keywords" @input="onkeyword" :value="keywords" confirm-type="search" focus @confirm="search" placeholder="影院名称或地址" placeholder-style="color: #AAAAAA;font-size: 28rpx;"/>
						<image @click.stop="clearKeyword" class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_close_tab_10_19.png"></image>
					</view>
					<view class="cth-search-top-title" @click.stop="clickSearch">取消</view>
				</view>
				<view class="cth-c-top-two" v-else>
					<view class="cth-c-top" style="padding-left: 30rpx;">
						<view class="cth-c-1">
							<view @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaCityList?cityname='+cityname +'&cityCode='+cityCode" class="cth-c-1-1">{{cityname}}<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
							<view @click.stop="clickRegions" class="cth-c-1-1" style="margin-left: 10rpx;">全城<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
							<view @click.stop="clickSelect" class="cth-c-1-1" style="margin-left: 10rpx;">筛选<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
						</view>
						<view class="cth-c-top-img" @click.stop="clickSearch"><image class="cth-c-top-img" src="https://zhijianlw.com/static/web/img/icon_search_tab_10_19.png"></image></view>
					</view>
					
					<view class="cth-select-view" v-if="tabNumber == 2 && isRegions" @click.stop="clickRegions">
						<view class="cthtop-Regions">
							<scroll-view scroll-y="true" class="cthtop-Regions-src">
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in FilmRegionsList" :key="index" :class="indxRegion == index ? 'cthtop-view-label-active':'cthtop-view-label'" @click.stop="clickRegionCode" :data-regioncode="item.regionCode" :data-index="index">{{item.regionName}}</view>
								</view>
							</scroll-view>
						</view>
					</view>
					
					<view class="cth-select-view" v-if="tabNumber == 2 && currTag" @click.stop="clickSelect">
						<view class="cthtop-view">
							<scroll-view scroll-y="true">
								<!-- <view class="cthtop-view-1">
									<view class="cthtop-view-left">放映影厅</view>
									<view class="cthtop-view-right" @click.stop="clickAll">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
								</view>
							
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">影院服务</view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
								</view> -->
								
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">影院品牌</view>
									<!-- <view class="cthtop-view-right" @click.stop="clickAll">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view> -->
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in FilmCinemaBrands" :key="index" :class="indxBrands == index ? 'cthtop-view-label-active':'cthtop-view-label'" @click="clickBrands" :data-brands="item" :data-index="index">{{item}}</view>
								</view>
							</scroll-view>
							<!-- <view class="cth-select-bottom">
								<view class="cth-select-bottom-left" @click.stop="clickClear">清空</view>
								<view class="cth-select-bottom-right">完成</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view :style="'margin-top:'+ (tabNumber == 2 ? (isSearch ? '190' : '170') :'90') + 'rpx;'">
			<view v-if="tabNumber == 0 || tabNumber == 1" style="padding: 16rpx 26rpx 20rpx 26rpx; margin-top: 0rpx;position: relative;display: flex;align-items: center;justify-content: center;">
				<swiper v-if="swiper.length>0" :autoplay="autoplay" :interval="interval" :duration="duration" circular class="own-swiper swiper-box" @change="changeswiper" :current="swiperCurrentIndex">
					<swiper-item v-for="(item,index) in swiper" :key="index">
						<image lazy-load="true" class="own-swiper-img" :src="item.img" 
						 mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="indicator-view" v-if="swiper.length>0">
					<view :class="[swiperCurrentIndex == index ? 'indicator-view-item' : 'indicator-view-item-default']" v-for="(item,index) in swiper" :key="index"></view>
				</view>
			</view>
			
			<view v-if="tabNumber == 0" class="cth-b" v-for="(item,index) in cthList" :key="index">
				<view class="cth-b-bg" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaTicketHomeDetail?cityCode=' + cityCode +'&movieId=' + item.movieId">
					<image class="cth-b-bg-1" :src="item.pic"></image>
					<view class="cth-b-bg-2">
						<view class="cth-b-bg-2-1">
							<view class="cth-b-bg-2-1-1">{{item.name}}</view>
							<view class="cth-b-bg-2-1-2" v-if="item.versionTypesStatus ==1">
								<view class="cth-b-bg-2-1-2-1">3D</view>
								<view class="cth-b-bg-2-1-2-2">IMAX</view>
							</view>
						</view>
						<view class="cth-b-bg-2-2">评分<text :class="item.grade == '暂无' ? 'cth-b-bg-2-2-2':'cth-b-bg-2-2-1'">{{item.grade}}</text></view>
						<view class="cth-b-bg-2-3">导演：{{item.director}}</view>
						<view class="cth-b-bg-2-4">主演：{{item.cast}}</view>
						
						<view class="cth-b-bg-2-5" v-if="item.publiSatus == 1" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaTicketHomeItem?movieId='+ item.movieId">购票</view>
						<view class="cth-b-bg-2-6" v-if="item.publiSatus == 2" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaTicketHomeItem?movieId='+ item.movieId">预售</view>
						
					</view>
				</view>
			</view>
			
			<view v-if="tabNumber == 1" class="cth-b" v-for="(item,index) in cthList" :key="index">
				<view class="cth-b-bg" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaTicketHomeDetail?cityCode=' + cityCode +'&movieId=' + item.movieId">
					<image class="cth-b-bg-1" :src="item.pic"></image>
					<view class="cth-b-bg-2">
						<view class="cth-b-bg-2-1">
							<view class="cth-b-bg-2-1-1">{{item.name}}</view>
							<view class="cth-b-bg-2-1-2" v-if="item.versionTypesStatus ==1">
								<view class="cth-b-bg-2-1-2-1">3D</view>
								<view class="cth-b-bg-2-1-2-2">IMAX</view>
							</view>
						</view>
						<view class="cth-b-bg-2-2"><view style="font-size: 20rpx;color: #666666;margin-right: 14rpx;">{{item.publishDate}}</view><view style="font-size: 26rpx;font-weight: bold;color: #FA6400;">4753</view><view style="font-size: 20rpx;color: #666666;">人想看</view></view>
						<view class="cth-b-bg-2-3">导演：{{item.director}}</view>
						<view class="cth-b-bg-2-4">主演：{{item.cast}}</view>
						
						<view class="cth-b-bg-2-6" v-if="item.publiSatus == 2" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaTicketHomeItem?movieId='+ item.movieId">预售</view>
						<view class="cth-b-bg-2-7" v-if="item.publiSatus == 3" @click.stop="clickLike" :data-movieid="item.movieId">想看</view>
						<view class="cth-b-bg-2-8" v-if="item.publiSatus == 4" @click.stop="clickLike" :data-movieid="item.movieId">已想看</view>
					</view>
				</view>
			</view>
			
			<view v-if="tabNumber == 2" class="cth-c">
				<!-- <view class="cth-c-top" style="padding-right: 30rpx;height: 100rpx;" v-if="isSearch">
					<view class="cth-search-top">
						<image class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_search_10_19.png"></image>
						<input type="text" name="keyword" @input="onkeyword" :value="keyword" confirm-type="search" focus @confirm="search" placeholder="影院名称或地址" placeholder-style="color: #AAAAAA;font-size: 28rpx;"/>
						<image class="cth-search-top-1" src="https://zhijianlw.com/static/web/img/icon_close_tab_10_19.png"></image>
					</view>
					<view class="cth-search-top-title" @click.stop="clickSearch">取消</view>
				</view>
				<view class="cth-c-top-two" v-else>
					<view class="cth-c-top" style="padding-left: 30rpx;">
						<view class="cth-c-1">
							<view class="cth-c-1-1">北京<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
							<view class="cth-c-1-1" style="margin-left: 10rpx;">全城<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
							<view @click.stop="clickSelect" class="cth-c-1-1" style="margin-left: 10rpx;">筛选<image class="cth-c-1-1-1" src="https://zhijianlw.com/static/web/img/icon_aroow_down_10_19.png"></image></view>
						</view>
						<view class="cth-c-top-img" @click.stop="clickSearch"><image class="cth-c-top-img" src="https://zhijianlw.com/static/web/img/icon_search_tab_10_19.png"></image></view>
					</view>
					
					<view class="cth-select-view" v-if="tabNumber == 2 && currTag" @click.stop="clickSelect">
						<view class="cthtop-view">
							<scroll-view scroll-y="true">
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">放映影厅</view>
									<view class="cthtop-view-right" @click.stop="clickAll">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
								</view>
							
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">影院服务</view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
								</view>
								
								<view class="cthtop-view-1">
									<view class="cthtop-view-left">影院品牌</view>
									<view class="cthtop-view-right" @click.stop="clickAll">展开<image class="cthtop-view-right-img" src="https://zhijianlw.com/static/web/img/icon_down_10_19.png"></image></view>
								</view>
								<view style="display: flex;padding: 20rpx 30rpx 26rpx 34rpx;flex-wrap: wrap;">
									<view v-for="(item,index) in itemsList" :key="index" class="cthtop-view-label" >{{item.title}}</view>
								</view>
							</scroll-view>
							<view class="cth-select-bottom">
								<view class="cth-select-bottom-left">清空</view>
								<view class="cth-select-bottom-right">完成</view>
							</view>
						</view>
					</view>
				</view> -->
				
				<view class="cth-c-item" v-if="FilmCinemaList.length > 0" v-for="(item,index) in FilmCinemaList" :key="index">
																								<!-- +'&date=2021-10-29'+'&movieId=28764' -->
					<view class="cth-c-bg" @click.stop="clickDetail" :data-url="'/pagesub/CinemaTicket/CinemaDetails?cinemaid=' + item.cinemaId">
						<view class="cth-c-bg-view">
							<view class="cth-c-bg-1">{{item.cinemaName}}</view>
							<view class="cth-c-bg-2">
								<!-- <text class="cth-c-bg-2-1">¥{{item.downPrice}}</text> -->
								<text class="cth-c-bg-2-2">¥{{item.downPrice}}</text>
								<text class="cth-c-bg-2-3">起</text></view>
						</view>
						<view class="cth-c-bg-view" style="margin-top: 18rpx;">
							<view class="cth-c-bg-3">{{item.cinemaAddress}}</view>
							<view class="cth-c-bg-4">{{item.distanceText}}</view>
						</view>
						<view style="margin-top: 20rpx;display: flex;flex-wrap: wrap;">
							<view v-for="(itemInfo,index) in item.services" :key="index" :class="index == 0 ? 'cth-c-bg-label0' : (index == 1 ? 'cth-c-bg-label1' : (index == 2 ? 'cth-c-bg-label2' : 'cth-c-bg-label3'))">{{itemInfo.name}}</view>
						</view>
					</view>
				</view>
				<view v-if="FilmCinemaList.length > 0" style="height: 20rpx;background: #EEEEEE;"></view>
			</view>
		</view>
		
		<view class="cth-positon" :animation="slide_up" v-if="tabNumber == 0" @click.stop="clickMyOrder"></view>
		
	</view>
</template>

<script>
	let timer;
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
				tabNumber: 0,
				currTag: false,
				cityname: '北京',
				swiper:[],
				swiperCurrentIndex: 0,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isSearch: false,
				cthList:[],
				itemsList:[
					{
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
				flag: 0,
				slide_up:'',
			} 
		},
		onLoad:function(options){
			let that = this;
			// 轮播图
			var data = JSON.stringify({a:0}); 
			var action = 'get_film_atlas';
			let controller = 'filmset';
			this.$utils.postNew(action, data, controller).then(res => {
				console.log("轮播图：",res);
				this.swiper = res.rs;
			});
			
			this.getArea();
			
			this.getFilmmovielist(1);
			
		},
		onShow() {
			if(this.tabNumber == 0 || this.tabNumber == 1){
				// this.getFilmRegionsList();
				this.getFilmCinemaBrands();
			}else{
				this.cityname = uni.getStorageSync('cityname')
				this.cityCode = uni.getStorageSync('cityCode')
				this.getFilmCinemaList(1);
				// this.getFilmRegionsList();
				this.getFilmCinemaBrands();
			}
			
			if(this.cityCode){
				this.getFilmRegionsList();
			}
			
		},
		methods: {
			getArea(){
				let that = this;
				uni.getLocation({
				    type: 'gcj02',
				    success: function (res) {
						that.getCityAddress(res.latitude, res.longitude);
				    },
					fail:function(res){
						/* 若需要添加对话框, 就解除这段代码的注释 */
					  uni.showModal({
						title: '位置授权',
						content: '获取您的地理位置用于获取当前城市影片列表，建议允许',
						cancelText: "不允许",
						confirmText: "允许",
						success: res => {
						  if (res.confirm) {
							uni.openSetting({
							  success: res => {
								if (res['authSetting']['scope.userLocation'] == true) {
								  that.getArea()
								} else {
								  uni.showToast({
									title: '未能获得当前位置信息',
									icon: "none"
								  })
								  uni.navigateBack({
								  	delta:1
								  });
								}
							  }
							})
						  } else if (res.cancel) {
							uni.showToast({
							  title: '未能获得当前位置信息',
							  icon: "none"
							})
							uni.navigateBack({
								delta:1
							});
						  }
						}
					  })
					}
				});
			},
			clickTabs(e){
				this.tabNumber = e.currentTarget.dataset.tabnumber;
				this.currTag = false;
				if(this.tabNumber == 0 || this.tabNumber == 1){
					this.getFilmmovielist(1);
				}else{
					this.getFilmCinemaList(1);
				}
			},
			changeswiper(e) {
			    let {current, source} = e.detail
			    if(source === 'autoplay' || source === 'touch') {
			    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
			      this.swiperCurrentIndex = e.detail.current;
			    }
			},
			onkeyword(e){
				this.keywords = e.detail.value;
			},
			search:function(){
				let keywords = this.keywords.replace(/[ ]/g,"");
				if(!keywords){
					uni.showToast({
						icon:"none",
						title: "请输入搜索内容"
					})
					return
				}
				this.keywords = keywords;
				this.getFilmCinemaList(1);
			},
			clearKeyword(){
				this.keywords = '';
				this.getFilmCinemaList(1);
			},
			clickSearch(){
				this.isSearch = !this.isSearch;
				this.currTag = false;
			},
			clickSelect(){
				this.currTag = !this.currTag;
				this.isRegions = false;
			},
			clickRegions(){
				this.isRegions = !this.isRegions;
				this.currTag = false;
			},
			getCityAddress(latitude,longitude){
				let that = this;
				let action = 'get_city_info';
				let controller = 'filmset';
				let data = JSON.stringify({
					latitude: latitude,
					longitude: longitude
				})
				this.$utils.postNew(action, data, controller).then(res => {
				    if(res.sta == 1){
						that.cityname = res.rs.address_component.city
						that.cityCode = res.rs.cityCode
						that.longitude = longitude
						that.latitude = latitude
						
						uni.setStorageSync('cityname', that.cityname)
						uni.setStorageSync('cityCode', that.cityCode)
						that.getFilmRegionsList();
				    }
				})
			},
			getFilmmovielist(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = 'get_film_movie_list';
				let controller = 'films';
				let data = JSON.stringify({
					type: this.tabNumber,
					size: this.pageSize,
					page: this.pageIndex,
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.cthList = res.rs.list;
						that.isAll = false;
					} else {
						if(res.rs.list.length>0){
							that.cthList = that.cthList.concat(res.rs.list);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				})
			},
			getFilmCinemaList(typeNumber){
				if(typeNumber == 1){
					this.pageIndex = 1;
				}
				
				let that = this;
				let action = 'get_film_cinema_list';
				let controller = 'films';
				let data = JSON.stringify({
					cityCode: this.cityCode,
					regionCode: this.regionCode,
					date: this.date,
					keywords: this.keywords,
					longitude: this.longitude,
					latitude: this.latitude,
					size: this.pageSize,
					page: this.pageIndex,
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(typeNumber == 1){
						that.pageIndex++;
						that.FilmCinemaList = res.rs.list;
						that.isAll = false;
					} else {
						if(res.rs.list.length>0){
							that.FilmCinemaList = that.FilmCinemaList.concat(res.rs.list);
							that.pageIndex++;
						}else{
							that.isAll = true;
						}
					}
				})
			},
			getFilmRegionsList(){
				let that = this;
				let action = 'get_film_regions_list';
				let controller = 'films';
				let data = JSON.stringify({
					cityCode: this.cityCode
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					that.FilmRegionsList = res.rs;
					let obj = {
						regionCode: "",
						regionName: "不限区域"
					}
					if(that.FilmRegionsList.length > 0){
						that.FilmRegionsList.unshift(obj)
					}
				})
			},
			getFilmCinemaBrands(){
				let that = this;
				let action = 'get_film_cinema_brands';
				let controller = 'films';
				let data = JSON.stringify({});
				this.$utils.postNew(action,data,controller).then(res=>{
					that.FilmCinemaBrands = res.rs;
					let obj = '全部'
					that.FilmCinemaBrands.unshift(obj)
				})
			},
			clickDetail(e){
				let url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				})
			},
			clickRegionCode(e){
				this.regionCode = e.currentTarget.dataset.regioncode;
				this.indxRegion = e.currentTarget.dataset.index;
				this.getFilmCinemaList(1);
			},
			clickBrands(e){
				this.keywords = e.currentTarget.dataset.brands;
				this.indxBrands = e.currentTarget.dataset.index;
				if(this.indxBrands == 0){
					this.keywords = '';
				}
				this.getFilmCinemaList(1);
			},
			clickClear(e){
				
			},
			clickLike(e){
				let movieid = e.currentTarget.dataset.movieid;
				let that = this;
				let action = 'set_film_like';
				let controller = 'filmset';
				let memberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					movieId: movieid,
					memberid: memberid
				});
				this.$utils.postNew(action,data,controller).then(res=>{
					if(res.sta == 1){
						that.getFilmCinemaList(1);
					}
				});
			},
			clickMyOrder(){
				uni.navigateTo({
					url: '/pagesub/CinemaTicket/CinemaTicketOrderList'
				})
			},
			handletouchmove: function(event) {
				console.log(event)
				if (this.flag !== 0) {
					return;
				}
				this.fadeOut();
			},
			handletouchstart: function(event) {
				
			},
			handletouchend: function(event) {
				this.flag = 0
				this.fadeIn();
			},
			//渐显
			    fadeIn() {
			      var animation = wx.createAnimation({
			        duration: 400,
			        timingType: 'ease'
			      });
			      this.animation = animation
			      animation.opacity(1).step();
				  animation.translateY(0).step()
			      this.slide_up = animation.export()
			    },
			    //渐隐消失
			    fadeOut() {
			      var animation = wx.createAnimation({
			        duration: 400,
			        timingType: 'ease'
			      });
			      this.animation = animation
				  animation.translateY(40).step()
				  animation.opacity(0).step();
			      this.slide_up = animation.export()
			    },
		},
		
		onPageScroll:function(object){ 
			let that = this;
			clearTimeout(timer) // 每次滚动前 清除一次
			// that.canSwip = false;  
			that.fadeOut();
			timer = setTimeout(function() { 
				console.log('滚动结束了');
				// that.canSwip = true; 
				that.fadeIn();
			}, 500);
		},
		onPullDownRefresh:function(){
			if(this.tabNumber == 0 || this.tabNumber == 1){
				this.getFilmmovielist(1);
			}else{
				this.getFilmCinemaList(1);
			}
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500);
		},
		onReachBottom:function(){
			if(this.tabNumber == 0 || this.tabNumber == 1){
				this.getFilmmovielist(2);
			}else{
				this.getFilmCinemaList(2);
			}
		},
		
	}
</script>

<style>
page{
	background-color: #F5F5F5;
}

.cth-a{
	height: 90rpx;
	border-top: 1px solid #F5F5F5;
	display: flex;
	align-items: center;
	background: #FFFFFF;
}
.cth-a-1{
	display: flex;
	align-items: center;
	padding-left: 32rpx;
	flex-direction: column;
	margin-top: 20rpx;
}
.cth-a-1-1{
	width: 40rpx;
	height: 40rpx;
	margin-right: 6rpx;
}
.cth-a-1-2{
	font-size: 30rpx;
	color: #666666;
}
.cth-a-2{
	width: 128rpx;
	display: flex;
    flex-direction: column;
    align-items: center;
	margin-top: 20rpx;
}
.cth-a-2-1{
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
}
.cth-a-2-1-default{
	font-size: 30rpx;
	color: #333333;
}
.cth-a-2-2{
	width: 26rpx;
    height: 5rpx;
    background: #DB3C3A;
    border-radius: 2rpx;
    margin-top: 12rpx;
}
.cth-a-2-2-default{
	width: 26rpx;
	height: 5rpx;
	background: #FFFFFF;
	border-radius: 2rpx;
	margin-top: 12rpx;
}

/**
		 * 
		 */
		.own-swiper{
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
		swiper-item{
			border-radius: 10rpx !important;
		}
		.own-swiper-img{
			width: 100%;
			height: 100%!important;
			border-radius: 10rpx;
		}
		
		/* 自定义轮播图的指示点 */
		.swiper-box .wx-swiper-dots.wx-swiper-dots-horizontal{
		  margin-bottom: 2rpx;
		}
		.swiper-box .wx-swiper-dot{
		 width: 12rpx;
		 display: inline-flex;
		 height: 4rpx;
		 justify-content:space-between;
		}
		.swiper-box .wx-swiper-dot::before{
		 content: '';
		 flex-grow: 1; 
		 background: #000;
		 opacity: 0.2;
		 border-radius: 8rpx
		}
		.swiper-box .wx-swiper-dot-active::before{
		 background: #fff;   
		 width: 24rpx;
		}
		
		.indicator-view{
			position: absolute;
			bottom: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.indicator-view-item{
			width: 36rpx;
			height: 6rpx;
			background: #FFFFFF;
			border-radius: 2rpx;
			margin-right: 6rpx;
		}
		.indicator-view-item-default{
			width: 24rpx;
			height: 6rpx;
			background: #000000;
			border-radius: 2rpx;
			opacity: 0.2;
			margin-right: 6rpx;
		}
		.cth-b{
			padding: 0rpx 25rpx;
			padding-bottom: 20rpx;
		}
		.cth-b-bg{
			width: 700rpx;
			height: 250rpx;
			background: #FFFFFF;
			border-radius: 1px;
			padding: 20rpx 17rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.cth-b-bg-1{
			width: 150rpx;
			height: 210rpx;
			border-radius: 6rpx;
		}
		.cth-b-bg-2{
			margin-left: 24rpx;
			width: 490rpx;
			position: relative;
		}
		.cth-b-bg-2-1{
			display: flex;
			align-items: center;
		}
		.cth-b-bg-2-1-1{
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-b-bg-2-1-2{
			display: flex;
			margin-left: 10rpx;
			width: 76rpx;
			height: 30rpx;
			border-radius: 3rpx;
			border: 1px solid #AAAAAA;
			background: #aaa;
		}
		.cth-b-bg-2-1-2-1{
			display: flex;
		    align-items: center;
		    justify-content: center;
			width: 30rpx;
			/* height: 26rpx; */
			background: #AAAAAA;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 14rpx;
			font-weight: bold;
			color: #FFFFFF;
		}
		.cth-b-bg-2-1-2-2{
		    display: flex;
		    align-items: center;
		    justify-content: center;
			width: 46rpx;
			/* height: 26rpx; */
			background: #FFFFFF;
			/* border-radius: 3rpx 0px 0px 3px; */
			font-size: 14rpx;
			font-weight: bold;
			color: #AAAAAA;
		}
		.cth-b-bg-2-2{
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #666666;
			margin-top: 26rpx;
		}
		.cth-b-bg-2-2-1{
			font-size: 28rpx;
			color: #FA6400;
			font-weight: bold;
			margin-left: 6rpx;
		}
		.cth-b-bg-2-2-2{
			font-size: 24rpx;
			color: #FA6400;
			margin-left: 6rpx;
		}
		.cth-b-bg-2-3{
			font-size: 24rpx;
			color: #666666;
			margin-top: 20rpx;
			width: 360rpx;
			display: -webkit-box;
			-webkit-box-orient:vertical;
			-webkit-line-clamp:2;
			overflow: hidden;
		}
		.cth-b-bg-2-4{
			font-size: 24rpx;
			color: #666666;
			margin-top: 20rpx;
			line-height: 25rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.cth-b-bg-2-5{
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
		
		.cth-b-bg-2-6{
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
		
		.cth-b-bg-2-7{
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
		
		.cth-b-bg-2-8{
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
		.cth-positon{
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
			opacity: 1;
		}
		
		.cth-c{
			
		}
		
		.cth-c-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			background: #FFFFFF;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}
		
		.cth-c-top-two{
			display: flex;
			/* align-items: center; */
			background: #FFFFFF;
			flex-direction: column;
		}
		
		.cth-c-1{
			display: flex;
			align-items: center;
		}
		
		.cth-c-1-1{
			font-size: 28rpx;
			font-weight: bold;
			color: #333333;
			width: 110rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
		}
		.cth-c-1-1-1{
			width: 16rpx;
			height: 16rpx;
			margin-left: 4rpx;
		}
		
		.cth-c-top-img{
			width: 40rpx;
			height: 40rpx;
		}
		
		.cth-c-item{
			padding: 20rpx 25rpx 0rpx;
		}
		
		.cth-c-bg{
			/* width: 700px; */
			/* height: 200px; */
			background: #FFFFFF;
			border-radius: 6px;
			padding: 30rpx 18rpx 30rpx 30rpx;
			display: flex;
			/* align-items: center; */
			justify-content: space-between;
			flex-direction: column;
		}
		.cth-c-bg-view{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #FFFFFF;
		}
		
		.cth-c-bg-1{
			width: 420rpx;
			word-wrap: break-word;
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.cth-c-bg-2{
			
		}
		.cth-c-bg-2-1{
			font-size: 24rpx;
			color: #999999;
		}
		.cth-c-bg-2-2{
			font-size: 30rpx;
			font-weight: bold;
			color: #E02020;
			margin-left: 10rpx;
		}
		.cth-c-bg-2-3{
			font-size: 24rpx;
			font-weight: bold;
			color: #999999;
			margin-left: 4rpx;
		}
		.cth-c-bg-3{
			width: 420rpx;
			word-wrap: break-word;
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
			line-height: 30rpx;
		}
		.cth-c-bg-4{
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
		
		
		.cth-search-top{
			width: 600rpx;
			height: 66rpx;
			background: #F2F2F2;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
		}
		.cth-search-top-1{
			width: 32rpx;
			height: 32rpx;
			margin-left: 24rpx;
		}
		.cth-search-top input{
			width: 460rpx;
			height: 40rpx;
			font-size: 28rpx;
			color: #333333;
			margin-left: 8rpx;
		}
		.cth-search-top-title{
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
		.cth-select-view{
			    width: 750rpx;
			        height: 100%;
			        border-radius: 0px 0px 20rpx 20rpx;
			        position: fixed;
			        z-index: 99;
			        background: rgba(0, 0, 0, .34);
			        /* opacity: 0.34; */
			        margin-top: 80rpx;
		}
		.cthtop-Regions{
			width: 750rpx;
			height: 320rpx;
			background: #FFFFFF;
			border-radius: 0px 0px 20rpx 20rpx;
			position: relative;
		}
		.cthtop-Regions-src{
			height: 272rpx !important;
		}
		.cthtop-view{
			width: 750rpx;
			height: 450rpx;
			background: #FFFFFF;
			border-radius: 0px 0px 20rpx 20rpx;
			position: relative;
		}
		
		.cthtop-view-1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 50rpx;
			background: #FFFFFF;
			padding-left: 44rpx;
			padding-right: 40rpx;
		}
		
		.cthtop-view-left{
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
		}
		
		.cthtop-view-right{
			font-size: 23rpx;
			color: #999999;
			display: flex;
			align-items: center;
		}
		.cthtop-view-right-img{
			width: 18rpx;
			height: 18rpx;
			margin-left: 6rpx;
		}
		.cthtop-view-label{
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
		.cthtop-view-label-active{
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
		.cth-select-bottom{
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
		.cth-select-bottom-left{
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
		
		.cth-select-bottom-right{
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
		
		scroll-view{
			height: 420rpx !important;
		}
</style>
