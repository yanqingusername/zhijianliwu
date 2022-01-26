<template>
	<view class="gift">
		<view class="gift-small">
			<view class="gift-small-con-view">
				 <view class="gift-small-con">
					<!-- <image src="https://zhijianlw.com/static/web/img/icon-card-letter-bg-09-27.png" class="icon-card-letter"></image> -->
					<view style="position: relative;padding: 18px;width: 100%;box-sizing: border-box;">
						<view class="icon-card-morenlogo-view">
							<image :src="IMG_DATA" class="icon-card-morenlogo"></image>
							<view class="icon-card-morenlogo-view-bg" @click="clickLogo">
								<view class="icon-card-morenlogo-view-title">更换</view>
								<view class="icon-card-morenlogo-view-title">LOGO</view>
							</view>
						</view>
						<image @click="clickEdit" src="https://zhijianlw.com/static/web/img/icon-card-edit-09-27.png" class="icon-card-edit"></image>
						<view class="input-view">
							<input @input='txt' :value="text" :focus="isFocus" @blur="isFocus = false" type="text" placeholder-style="color:#575D65;font-size: 24rpx;"/>
						</view>
						<view class="icon-card-title-view" style="height: 200rpx;">
							<!-- <input @input='txttitle' :value="txttitle" style="border-bottom: 1px solid #EEEEEE;height: 50rpx;" placeholder="某某集团股份有限公司 敬贺" type="text" placeholder-style="color:#575D65;font-size: 24rpx;"/>
							<textarea class="icon-card-title" style="border-bottom: 1px solid #EEEEEE;height: 150rpx;" type="text"v-model="remark" placeholder="某某集团股份有限公司 敬贺某某集团股份有限公司 敬贺某某集团股份有限公司 敬贺某某集团股份有限公司 敬贺某某集团股份有限公司 敬贺" ></textarea> -->
							<view class="section" >
							   <textarea class="text" maxlength="84" @input='txtcontent' :value="content" cursor="5"/>
							 </view>
							<!-- <image src="https://zhijianlw.com/static/web/img/icon-card-edit-title-09-27.png" class="icon-card-title"></image> -->
							<view class="icon-card-click" style="bottom: 5px;" @click.stop="clickHandler">换一换</view>
						</view>
						<!-- <view class="new-icon-card-click" @click.stop="clickHandler">换一换</view> -->
						
						<view class="input-view-bottom">
							<input @input='txttitle' :value="title" type="text" placeholder-style="color:#575D65;font-size: 24rpx;"/>
						</view>
					</view>
				 </view>
			 </view>
			 <view class="" style="margin-top: 60rpx;">
			 	<view class="">
					 <swiper class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay" :previous-margin="previousMargin"
					  :next-margin="nextMargin" :circular="circular" @change="change" :current="swiperCurrentIndex">
					 	<swiper-item class="swiper-container" v-for="(item,index) in textList" :key="index">
						 <!-- :animation="swiperCurrentIndex == index ? animationData : animationDataDefault" -->
							<image
								:class="swiperCurrentIndex == index ? 'swiper-item' : 'swiper-itemDefault'"
								:src="$utils.imageUrl(item.background)">
							</image>
							<image v-if="swiperCurrentIndex == index" class="icon-card-select-1" :src="IMG_DATA" mode="heightFix"></image>
							<view style="position: absolute;top: 335rpx;height: 100px;left: 100rpx;box-sizing: border-box;">
								<view v-if="swiperCurrentIndex == index" class="icon-card-select-2">{{text}}</view>
								<!-- <image v-if="swiperCurrentIndex == index" class="icon-card-select-3" src="https://zhijianlw.com/static/web/img/icon-card-edit-title-09-27.png"></image> -->
								<view v-if="swiperCurrentIndex == index" class="icon-card-select-3">
									<view class="section1" style="height: 154rpx;">
									   <textarea class="text1" disabled="true" maxlength="84" :value="content" style="height: 154rpx;"/>
									 </view>
								</view>
								<view v-if="swiperCurrentIndex == index" class="icon-card-select-4">{{title}}</view>
							</view>
						</swiper-item>
					 </swiper>
			 	</view>
			 </view>
		</view>
		<view style="height: 180rpx;"></view>
		<view class="gift-btn-view">
			<button class="gift-btn" type="warn" @click="getgift">保存使用</button>
		</view>
		
		<!-- 选择照片 -->
		<uni-popup ref="popuppic" type="bottom" :animation="false" :maskClick="true" @change="changePic" background-color="#fff">
			<view class="popup-pic">
				<!-- <view class="popup-pic-text" @click="$buttonClick(cameraPic)">拍照</view> -->
				<view class="popup-pic-border" @click="$buttonClick(albumPic)">从相册选择</view>
				<view class="popup-pic-view" @click="$buttonClick(closepic)">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default{
		data(){
			return{
				indicatorDots: false,
				autoplay: false,
				previousMargin: '60px',
				nextMargin: '60px',
				circular: true,
				swiperCurrentIndex: 0,
				background: '',
				id:'',
				isFocus: false,
				text: '',
				content: '',
				title: '',
				IMG_DATA: 'https://zhijianlw.com/static/web/img/icon-card-morenlogo-09-27-01.png',
				textList: []
			}
		},
		computed:{
			
		},
		onShow() {
			
		},
		onLoad: function(e) {
			let that = this;
			var memberid = uni.getStorageSync('id');
			this.memberid = memberid;
			this.getShowZhufuList();
			this.getShowcustomized();
		},
		methods:{
			getShowZhufuList(){
				var data = JSON.stringify({});
				var action = 'show_zhufu_list';
				var controller = 'zhufu';
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						this.content = res.rs.info;
					}
				});
			},
			getShowcustomized(){
				var action = 'get_theme_type_by_customized';
				var controller = 'zhufu';
				var memberid = uni.getStorageSync('id');
				var data = JSON.stringify({
					memberid: memberid
				});
				this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						this.customizData = res.rs;
						this.IMG_DATA = res.rs.customized_head_img;
						this.text = res.rs.customized_call;
						this.content = res.rs.customized_zhufu;
						this.title = res.rs.customized_company;
						this.background = res.rs.default_theme_background;
						this.id = res.rs.default_theme_id;
						this.textList = res.rs.zhufu_list;
						
						// 根据可选模板id遍历可选模板,拿到默认模板
						this.imgs();
					}
				});
			},
			clickLogo(){
				this.$refs['popuppic'].open();
			},
			clickEdit(){
				setTimeout(()=>{
					this.isFocus = true;
				},0);
			},
			clickHandler(){
				this.getShowZhufuList();
			},
			txt: function(e) {
				if (e.detail.cursor == 0) {
					// 接口用到的
					this.text = '';
				} else {
					this.text = e.detail.value;
				}
			},
			txtcontent: function(e) {
				if (e.detail.cursor == 0) {
					// 接口用到的
					this.content = '     ';
				} else {
					this.content = e.detail.value;
				}
			},
			txttitle: function(e) {
				// if (e.detail.cursor == 0) {
				// 	// 接口用到的
				// 	this.title = '';
				// } else {
					this.title = e.detail.value;
				// }
			},
			imgs: function(e) {
				// 默认背景
				for (let i in this.textList) {
					if (this.textList[i].id == this.id) {
						this.background = this.textList[i].background;
						this.id = this.textList[i].id;
						this.swiperCurrentIndex = i;
					}
				}
			},
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.theme_background = "";
				if(this.textList.length > 0){
					this.background = this.textList[this.swiperCurrentIndex].background;
					this.id = this.textList[this.swiperCurrentIndex].id;
				}
			},
			changePic(e) {
			
			},
			cameraPic(){
				this.closepic();
				let _this = this;
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['camera'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://zhijianlw.com/api.php/index/upload_file', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								let file = JSON.parse(uploadFileRes.data)
								if (file.sta == 1) {
									uni.hideLoading()
										_this.IMG_DATA = file.filename;
								} else {
									uni.showToast({
										title: '上传失败',
										icon: 'none',
										mask: 'true',
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: '上传失败',
									icon: 'none',
									mask: true,
								})
							}
						});
				    }
				});
			},
			albumPic(){
				this.closepic();
				let _this = this;
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
						console.log(res);
						
						            uni.uploadFile({
						            	url: 'https://zhijianlw.com/api.php/index/upload_file', //仅为示例，非真实的接口地址
						            	filePath: res.tempFilePaths[0],
						            	name: 'file',
						            	formData: {
						            		'user': 'test'
						            	},
						            	success: (uploadFileRes) => {
						            						
						            		let file = JSON.parse(uploadFileRes.data)
						            		if (file.sta == 1) {
						            			uni.hideLoading()
						            				_this.IMG_DATA = file.filename;
						            				console.log('上传成功', file)
						            		} else {
						            			uni.showToast({
						            				title: '上传失败',
						            				icon: 'none',
						            				mask: 'true',
						            			})
						            		}
						            	},
						            	fail: (res) => {
						            		uni.showToast({
						            			title: '上传失败',
						            			icon: 'none',
						            			mask: true,
						            		})
						            	}
						            });
				    }
				});
			},
			closepic(){
				this.$refs['popuppic'].close();
			},
		   getgift:function(e){
			   var that = this;
			   var action = 'save_customized_zhufu_theme';
			   var controller = 'zhufu';
			   var memberid = uni.getStorageSync('id');
			   var data = JSON.stringify({
			   	memberid: memberid,
				customized_head_img: this.IMG_DATA,
				customized_call: this.text,
				zhufu_msg: this.content,
				customized_company: this.title,
				theme_type: this.id
			   });
			   this.$utils.postNew(action, data, controller).then(res => {
					if(res.sta ==1){
						uni.setStorageSync('setgiftssuccess', '1');
						uni.navigateBack({
						   delta: 1
						});	
					}
			   });
				
				
		   },
		 
		}
	}
</script>

<style>
	page{
		flex-wrap: wrap;  
	}
	
	
	/* 信息 */
	.gift-small{
		width: 100%;
		/* height: 600rpx; */
	}
	.gift-small-con-view{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 60rpx;
		background: #FFFFFF;
	}
	.gift-small-con {
	    /* width: 94%; */
	    display: flex;
	    /* justify-content: space-around; */
	    /* padding: 30rpx 60rpx; */
		background: #FFFFFF;
		position: relative;
		width: 614rpx;
	    height: 480rpx;
			background-image: url(https://zhijianlw.com/static/web/img/icon-card-letter-bg-09-27.png);
			background-size: 614rpx 480rpx;
	}
	.icon-card-letter{
		width: 614rpx;
		height: 480rpx;
	}
	.icon-card-morenlogo-view{
		position: absolute;
		/* top: 26rpx;
		left: 37rpx; */
		width: 76rpx;
		height: 76rpx;
		display: flex;
		    align-items: center;
		    justify-content: center;
	}
	.icon-card-morenlogo{
		width: 64rpx;
		height: 64rpx;
		/* border-radius: 50%; */
	}
	.icon-card-morenlogo-view-bg{
		width: 76rpx;
		height: 76rpx;
		background: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		    top: 0rpx;
		    left: 0rpx;
			flex-direction: column;
			opacity: 0.7;
	}
	.icon-card-morenlogo-view-title{
		font-size: 19rpx;
		color: #FFFFFF;
	}
	.icon-card-edit{
		position: absolute;
		/* top: 32rpx; */
		right: 36rpx;
		width: 86rpx;
		height: 86rpx;
	}
	.input-view{
		margin-top: 104rpx;
		/* position: absolute;
		top: 130rpx;
		left: 40rpx; */
	}
	.input-view input{
		color: #575D65;
		    font-size: 24rpx;
		        height: 26rpx;
		        width: 534rpx;
		        /* border-bottom: 1px solid #EEEEEE; */
	}
	.icon-card-title-view{
		position: absolute;
		    /* top: 184rpx;
		    left: 40rpx; */
		    width: 270px;
		    height: 200rpx;
	}
	.icon-card-title{
		width: 530rpx;
		height: 200rpx;
	}
	.new-icon-card-click{
		width: 70rpx;
		height: 35rpx;
		border-radius: 14rpx;
		border: 1px solid #E95F5D;
		font-size: 16rpx;
		color: #DB3C3A;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 40rpx;
		left: 40rpx;
	}
	
	.icon-card-click{
		width: 80rpx;
		height: 30rpx;
		border-radius: 14rpx;
		border: 1px solid #E95F5D;
		font-size: 16rpx;
		color: #DB3C3A;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 15rpx;
	    right: 0rpx;
		z-index: 9999;
	}
	.input-view-bottom{
		        position: absolute;
		        bottom: 40rpx;
		        /* right: 40rpx; */
		        width: 270px;
		        height: 40rpx;
	}
	.input-view-bottom input{
		color: #575D65;
		    font-size: 24rpx;
		        height: 40rpx;
		        width: 100%;
				text-align: right;
		        /* border-bottom: 1px solid #EEEEEE; */
	}
	.gift-small-head{
		width: 76rpx;
		height: 76rpx;
		margin-left: 30rpx
	}
	.gift-small-head image{
		width: 100%;
	}
	.gift-small-content{
		position: relative;
		    width: 500rpx;
		    background-color: #fff;
		    border-radius: 10rpx;
			    margin-left: 30rpx;
	}
	.gift-small-content::before{
		content: "";
		width: 0;
		height: 0;
		border-top: 20rpx solid transparent;
		border-right: 30rpx solid #fff;
		border-bottom: 20rpx solid transparent;
		position: absolute;
		left: -18rpx;
		top: 20rpx;
	}
	.gift-small-head-img{
		width: 100rpx;
		height: 100rpx;
	}
	.gift-small-content-card{
		padding: 24rpx;
		width: 100%;
		position: relative;
		box-sizing: border-box;
	}
	.gift-small-content-card-top{
	    width: 100%;
		padding-bottom: 0rpx;
	}
	.gift-card-img{
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.gift-card-title{
		color: #999999;
		font-size: 24rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.gift-card-con{
		position: relative;
	}
	.gift-card-con>view{
		line-height: 1.5em;
		font-size: 28rpx;
		color: #333333;
	}
	.gift-card-edit{
		font-size: 28rpx;
		color: #666;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.gift-card{
		height: 275rpx;
		    width: 450rpx;
		
		/* position: absolute;
		top: 160rpx;
		left: 10rpx; */
		box-sizing: border-box;
	}
	.gift-card-btn{
		margin-top: 20rpx;
		/* border: 1px solid #EDEDED; */
		text-align: center;
		/* padding: 20rpx; */
		box-sizing: border-box;
	}
	.gift-card-btn button{
		width: 214rpx;
		border-radius: 50rpx;
		color: red;
	}
	.gift-small-bottom{
		box-sizing: border-box;
		padding-top: 20rpx;
		border-top: 1rpx solid #E6E6E6; 
		/* position: relative; */
		/* top: 523rpx; */
		/* left: 1rpx; */
		display: flex;
		align-items: center;
	}
	.gift-small-bottom-img{
		display: inline-block;
		vertical-align: middle;
		font-size: 24rpx;
		color: #8082B0;
	}
	.gift-small-bottom-font{
		display: inline-block;
		vertical-align: middle;
		margin-left: 10rpx;
		color: #999999;
		font-size: 24rpx;
	}
	/* 左滑动效果 */
	.reg-img {
	    width: 350rpx;
	    height: 260rpx;
	    margin-right: 18rpx;
		margin-top: 10rpx;
	}
	.my-reg {
	    padding:20rpx 30rpx;
	    display: flex;
	    overflow-y: hidden;
	    overflow-x: scroll
	}
	.my-regs{
	    display: flex;
	    margin-right: 8px;
	}
	.gift-img{
		text-align: center;
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #999;
	}
	.gift-img text{
		border-bottom: 1px solid #999;
	}
	.gift-btn-view{
		    position: fixed;
		    z-index: 99;
		    bottom: 0rpx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			    background: #FFFFFF;
	}
	.gift-btn{
		margin-top: 30rpx;
		    width: 640rpx;
		    background-color: #F55856;
		    height: 80rpx;
		    line-height: 80rpx;
		    margin-bottom: 30rpx;
		    font-size: 32rpx;
		    border-radius: 50rpx;
	}
	.section textarea{
		width: 100%;
		font-size: 24rpx;
		color: #575D65;
	}
	.success-pop .pop-center .p{
		margin: 20rpx 0;
		text-align: left;
	}
	
	.swiper-container {
		display: flex;
		align-items: center;
	}
	.swiper-itemDefault{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		height: 736rpx;
		width: 460rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		height: 784rpx;
	    width: 490rpx;
		text-align: center;
		border-radius: 6rpx;
	}
	
	.swiper-tall {
		display: flex;
		align-items: center;
		height: 800rpx;
	}
	
	.icon-card-select-1{
		position: absolute;
		    top: 265rpx;
		    left: 100rpx;
		    width: 50rpx;
		    height: 50rpx;
			/* border-radius: 50%; */
	}
	.icon-card-select-2{
		   position: absolute;
		       /* top: 300rpx;
		       left: 60rpx; */
		       width: 320rpx;
		       font-size: 14rpx;
		       /* color: #575D65; */
		       height: 35rpx;
		    /* border-bottom: 1px solid #EEEEEE; */
	}
	.icon-card-select-3{
		/* position: absolute;
		    top: 324rpx;
		    left: 60rpx; */
		        width: 325rpx;
		        height: 154rpx;
		        margin-top: 20rpx;
	}
	.icon-card-select-4{
		position: absolute;
		    /* top: 476rpx; */
		    right: 0rpx;
		    width: 325rrpx;
		    height: 30rpx;
		    font-size: 14rpx;
		    /* color: #575D65; */
		    /* border-bottom: 1px solid #EEEEEE; */
	}
	
	.popup-pic{
		display: flex;
		width: 750rpx;
		/* height: 318rpx; */
		background: #FFFFFF;
		border-radius: 10rpx 10rpx 3rpx 3rpx;
		flex-direction: column;
	}
	.popup-pic-text{
		font-size: 34rpx;
		color: #333333;
		padding: 40rpx 0rpx 24rpx 0rpx;
		border-bottom: 1px solid #EDEDED;
		text-align: center;
	}
	.popup-pic-border{
		font-size: 34rpx;
		color: #333333;
		padding: 28rpx 0rpx 24rpx 0rpx;
		border-bottom: 4px solid #EDEDED;
		text-align: center;
	}
	.popup-pic-view{
		font-size: 34rpx;
		color: #333333;
		padding: 30rpx 0rpx 22rpx 0rpx;
		text-align: center;
	}
	
	/*wxss*/
	.section{
	    height: 200rpx;
	    width: 100%;
	    position: absolute;
	    line-height: 50rpx;
	    overflow: scroll;
	    font-size: 24rpx;
	    /* background: #FFF7EA; */
	  /* text-decoration-line: underline; */
	}
	.text{
		height: 200rpx;
		    -webkit-text-decoration-line: underline;
		    text-decoration-line: underline;
		    position: absolute;
		    width: 100%;
		    /* background: repeating-linear-gradient(#FFF7EA,#FFF7EA 34rpx ,#FFF7EA 50rpx);
		    background: repeating-linear-gradient(#FFF7EA,#FFF7EA 34rpx ,#FFF7EA 50rpx); */
	}
	
	.section1{
	    height: 220rpx;
	    width: 100%;
	    position: absolute;
	    line-height: 32rpx;
	    overflow: scroll;
	    font-size:16rpx;
	    /* background: #FFF7EA; */
	  /* text-decoration-line: underline; */
	}
	.text1{
		height: 220rpx;
		    -webkit-text-decoration-line: underline;
		    text-decoration-line: underline;
		    position: absolute;
		    width: 100%;
		    /* background: repeating-linear-gradient(#FFF7EA,#FFF7EA 24rpx ,#FFF7EA 32rpx);
		    background: repeating-linear-gradient(#FFF7EA,#FFF7EA 24rpx ,#FFF7EA 32rpx); */
	}
</style>