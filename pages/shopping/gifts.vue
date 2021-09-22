<template>
	<view class="gift">
		<view class="gift-header">
			<text class="gift-header-title">发送页模板</text>
			<text class="gift-header-ltitle">(文字可编辑)</text>
		</view>
		<view class="gift-small">
			 <view class="gift-small-con">
			 	<view class="gift-small-head">
			 		<image class="gift-small-head-img" :src="sign.head_img" mode="widthFix"></image>
			 	</view>
				<view class="gift-small-content">
					<view class="gift-small-content-card">
					    <view class="gift-small-content-card-top">
					    	<view style="margin-bottom: 14rpx;">
								<image class="gift-card-img" src="https://zhijianlw.com/static/web/img/icon_xm_09_15_01.png" mode=""></image>
								<text class="gift-card-title">指间礼物|送礼有温度</text>
							</view>
							<view class="gift-card-con">
								<view><textarea  @input='txt' :placeholder="text" maxlength="35" :value="text" :focus="isFocus" @blur="isFocus = false"></textarea></view>
								<text class="icon icon-edit gift-card-edit" @click="showTxt"></text>
								<!-- <image class="gift-card-edit" :src="$utils.osspath_url('/xcx-static/gift/edit_icon.png')" mode=""></image> -->
							</view>
							<view class="gift-card-btn">
								<image class="gift-card" :src="theme_background!=''?theme_background:background" mode="widthFix"></image>
								<!-- <button type="warn" size="mini" plain="true" style="margin-top: 20rpx;">立即领取</button> -->
							</view>
					    </view>
						<view class="gift-small-bottom">
							<text class="gift-small-bottom-img icon icon-xcx"></text>
							<text class="gift-small-bottom-font">小程序</text>
						</view>
					</view>
				</view>
			 </view>
			 <view class="" style="margin-top: 60rpx;">
			 	<!-- 照片 -->
			 	<view class="">
					<!-- <view class="my-regs" @click="choose" v-for="(item,index) in template" :key="index" :data-id="item.id"
					 :data-background="item.background">
					   <image class="reg-img" :src="$utils.imageUrl(item.background)" mode=""></image>
					 </view> -->
					 <swiper class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay" :previous-margin="previousMargin"
					  :next-margin="nextMargin" :circular="circular" @change="change" :current="swiperCurrentIndex">
					 	<swiper-item class="swiper-container" v-for="(item,index) in template" :key="index">
					 	 
					 	<image class="swiper-item"
					 	  :src="$utils.imageUrl(item.background)"
					 	   :animation="swiperCurrentIndex == index ? animationData : animationDataDefault">
					 	</image>
					 	</swiper-item>
					 </swiper>
			 	</view>
				<view class="gift-img" style="margin-top: 30rpx;"><text @click="$buttonClick(allCovers)">全部封面</text></view>
			 </view>
		</view>
		<button class="gift-btn" type="warn" @click="getgift">使用该封面</button>
		
		
		<!-- 修改文字 -->
		<view class="success-pop" v-if="showPop">
			<view class="pop-center clearfix">
				<image @click="close" class="close" src="../../static/z-close.png" mode="widthFix"></image>
				<view class="p"><textarea  @input='txt' :placeholder="text" maxlength="35" :value="text"></textarea></view>
				<view class="n" @click="close">完成</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default{
		data(){
			return{
				background: '',
				edit:'',
				text: '我精选挑选了一份礼物送给您,望收下,一点心意,不成敬意!',
				theme_background: '',
				img:1,
				template:[],
				content:'',
				send_talk_msg:'',
				sign: '',
				showPop: false,
				Inv: 0,
				indicatorDots: false,
				autoplay: false,
				previousMargin: '80px',
				nextMargin: '80px',
				circular: true,
				zoomParam: 1.25,
				swiperCurrentIndex: 0,
				animationData: "",
				animationDataDefault: "",
				isFocus: false
			}
		},
		computed:{
			
		},
		onShow() {
			let background = uni.getStorageSync('all_cover_bg');
			let id = uni.getStorageSync('all_cover_id');
			if(background && id){
				this.theme_background = "";
				this.background =background;
				this.id = id;
			}
		},
		onLoad: function(e) {
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			this.animationData = this.animation.export();
			
			this.animation.scale(1.0).step();
			this.animationDataDefault = this.animation.export();
			
			this.url = config.URL;
			let that = this;
			this.sign = uni.getStorageSync('sign');
			var memberid = uni.getStorageSync('id');
			this.memberid = memberid;
			if (e.edit == 'on') {
				// 订单模板过来修改模板的
				this.edit = e.edit;
			
				// 礼包绑定的模板信息
				let res = uni.getStorageSync('cardbag_theme')
			
				// 选择的背景图  显示
				this.background = res.background;
				// 选择背景图id 接口用
				this.id = res.theme_type;
			
				var data = '{}';
				var action = 'get_zhufu_theme_type';
			
				this.$utils.post(action, data).then(res => {
					this.template = res.rs;
				})
			
				// 模板Id
				this.zhufu_theme_id = e.id; 
				this.content = res;
				this.send_talk_msg = res.send_talk_msg
				this.theme_type = res.id;
				this.text = res.send_talk_msg;
			
			
				// if (res.zhufu_type == 0) {
				// 	this.Inv = 0;
				// 	this.img = 0;
				// }else if (res.zhufu_type == 1) {
				// 	this.Inv = 1;
				// 	this.img = 1;
				// } else if (res.zhufu_type == 2) {
				// 	this.Inv = 2;
				// 	this.img = 2;
				// } 
			} else {
			
				var data = '{}';
				var action = 'get_zhufu_theme_type';
			
				this.$utils.post(action, data).then(res => {
					// 可选模板
					this.template = res.rs;
					var data = '{"memberid":"' + memberid + '"}';
					var action = 'get_zhufu_theme';
			
					this.$utils.post(action, data).then(res => {
						// 页面渲染
						this.content = res.rs;
						// 发送模板 文字可编辑
						this.send_talk_msg = res.rs.send_talk_msg
						this.text = res.rs.send_talk_msg;
						this.theme_background  = res.rs.theme_background;
			            
						// 可选模板id  
						this.theme_type = res.rs.theme_type;
						this.id = res.rs.theme_type
						// 根据可选模板id遍历可选模板,拿到默认模板
						this.imgs();
			
						// 模板id
						this.zhufu_theme_id = res.rs.id;
						
						// uni.setStorageSync('theme_type', res.rs.theme_type)
						// uni.setStorageSync('zhufu_theme_id', res.rs.id)
						// uni.setStorageSync('send_talk_msg', res.rs.send_talk_msg)
					})
			
				})
			}
		},
		methods:{
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.theme_background = "";
				if(this.template.length > 0){
					this.background = this.template[this.swiperCurrentIndex].background;
					this.id = this.template[this.swiperCurrentIndex].id;
				}
			},
			allCovers(){
				// 跳转全部封面
				uni.navigateTo({
					url:`../../pagesub/AllCovers/AllCovers?id=${this.id}`
				});
			},
			close: function(){
				this.showPop = false;
			},
			showTxt: function(){
				setTimeout(()=>{
					this.isFocus = true;
				},0);
				// this.isFocus = true
				// this.showPop = true;
			},
			txt: function(e) {
				if (e.detail.cursor == 0) {
					// 接口用到的
					this.text = '';
					// 显示的
					this.send_talk_msg = ''
				} else {
					this.text = e.detail.value;
				}
			},
			imgs: function(e) {
				// 默认背景
				for (let i in this.template) {
					if (this.template[i].id == this.theme_type) {
						this.background = this.template[i].background;
						this.id = this.template[i].id;
						this.swiperCurrentIndex = i;
					}
				}
			},
		   // 选择模板
		   choose: function(e) {
		   	this.theme_background = "";
		   	this.background = e.currentTarget.dataset.background;
		   	this.id = e.currentTarget.dataset.id
		   },
		   getgift:function(e){
			   var that = this;
			   var data = {
			   	zhufu_theme_id: this.zhufu_theme_id,
			   	memberid: this.memberid,
			   	theme_type: this.id,
			   	send_talk_msg: this.text,
			   	zhufu_type: 0,
			   	theme_background: this.theme_background,
				update_type:0
			   };
			   // if (this.Inv == 0) {
			   // 	data['zhufu_type']=0;
			   // 	data['zhufu_msg'] = this.text;
			   // } 
			   
			   var action = 'save_zhufu_theme';
			   
			   this.$utils.post(action, JSON.stringify(data)).then(res => {
				
				  let icon="success"
				  if (res.sta !=1) {
				  	icon = "none";
				  	uni.showToast({
				  		icon: icon,
				  		title: res.msg,
				  		duration: 2000
				  	});
				  	return
				 
			   
					
			   	} else {
			   		if (that.edit == 'on') {
			   			uni.showToast({
			   				title: '修改成功',
			   				icon: "success",
			   				mask: 'true',
			   				success: (res) => {
			   					setTimeout(function(e) {
			   						uni.setStorageSync('cardbag_theme', '')
			   						uni.navigateBack({
			   							delta: 1
			   						})
			   					}, 1500)
			   				}
			   			})
			   		}
			   	}
				/**
				 * 之前跳转自定义福语页面
				 */
				// uni.navigateTo({
				// 	 url:'../shopping/wishes'
				// })
				uni.setStorageSync('setgiftssuccess', '1');
				uni.navigateBack({
				   delta: 1
				});	
			   })
		   },
		   gift:function(e){
				   let type=e.type
				   var memberid = uni.getStorageSync('id');
				   this.memberid = memberid;
				   var data = '{"memberid":"' + memberid +"buy_type:"+type+ '"}';
				   var action = 'get_zhufu_theme';
				   			
				   this.$utils.post(action, data).then(res => {
				   					// 页面渲染
				   					this.content = res.rs;
									this.zhufu_type=res.rs.zhufu_type
									uni.setStorageSync('zhufu_type', res.rs.zhufu_type);
				   	uni.setStorageSync('text', res.rs.send_talk_msg);
					uni.setStorageSync('zhufu_msg', res.rs.zhufu_msg);			
					uni.navigateBack({
					   delta: 1
					});					
			})
				  
		   }
		}
	}
</script>

<style>
	page{
		flex-wrap: wrap;  
	}
	
	/* 发送页 */
	.gift-header{
		width: 100%;
		padding: 30rpx 0;
		text-align: center;
	}
	.gift-header-title{
		font-weight: bold;
		color: #333333;
		margin-right: 20rpx;
	}
	.gift-header-ltitle{
		color: #999999;
	}
	/* 信息 */
	.gift-small{
		width: 100%;
		/* height: 600rpx; */
	}
	.gift-small-con {
	    /* width: 94%; */
	    display: flex;
	    /* justify-content: space-around; */
	    padding: 0rpx 0rpx;
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
	.gift-btn{
		margin-top: 60rpx;
		width: 384rpx;
		background-color: #F55856;
		height: 80rpx;
		line-height: 80rpx;
		margin-bottom: 30rpx;
		font-size: 32rpx;
	}
	textarea{
		width: 100%;
		font-size: 30rpx;
		color: #333333;
		line-height: 1.5em;
		/* border: 1px solid #efefef;
		padding: 10rpx; */
		height: 42px;
	}
	.success-pop .pop-center .p{
		margin: 20rpx 0;
		text-align: left;
	}
	
	.swiper-container {
		display: flex;
		align-items: center;
	}
	
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		height: 272rpx;
	    width: 340rpx;
		text-align: center;
		broder-radius: 6rpx;
	}
	
	.swiper-tall {
		display: flex;
		align-items: center;
		height: 300rpx;
	}
</style>