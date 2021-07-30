<template>
	<view class="gift">
		<view class="gift-header">
			<text class="gift-header-title">发送页模板</text>
			<text class="gift-header-ltitle">(文字可编辑)</text>
		</view>
		<view class="gift-small">
			 <view class="gift-small-con">
			 	<view class="gift-small-head">
			 		<image class="gift-small-head-img" :src="sign.head_img" mode=""></image>
			 	</view>
				<view class="gift-small-content">
					<view class="gift-small-content-card">
					    <view class="gift-small-content-card-top">
					    	<image class="gift-card-img" :src="$utils.osspath_url('/xcx-static/gift/ICON-xm.png')" mode=""></image>
							<text class="gift-card-title">指间礼物|送礼有温度</text>
							<view class="gift-card-con"><textarea  @input='txt' :placeholder="text" maxlength="35" :value="send_talk_msg"></textarea></view>
							<image class="gift-card-edit" :src="$utils.osspath_url('/xcx-static/gift/edit_icon.png')" mode=""></image>
							<image class="gift-card" :src="theme_background!=null?theme_background:background" mode=""></image>
							 <button class="gift-card-btn" type="warn" size="mini" @click="getgift" plain="true">立即领取</button>
					    </view>
						<view class="gift-small-bottom">
							<image class="gift-small-bottom-img" :src="$utils.osspath_url('/xcx-static/gift/xcx_icon.png')" mode=""></image>
							<text class="gift-small-bottom-font">小程序</text>
						</view>
					</view>
				</view>
			 </view>
			 <view class="">
			 	<!-- 照片 -->
			 	<view class="my-reg">
					<view class="my-regs" @click="choose" v-for="(item,index) in template" :key="index" :data-id="item.id"
					 :data-background="item.background">
					   <image class="reg-img" :src="$utils.imageUrl(item.background)" mode=""></image>
					 </view>
			 	</view>
				<text class="gift-img">全部封面</text>
			 </view>
		</view>
		<button class="gift-btn" type="warn" @click="gift">使用该封面</button>
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
			}
		},
		onLoad: function(e) {
			console.log("祝福语")
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
					console.log('可选模板', res)
					this.template = res.rs;
				})
			
				// 模板Id
				this.zhufu_theme_id = e.id; 
				this.content = res;
				this.send_talk_msg = res.send_talk_msg
				this.theme_type = res.id;
				this.text = res.send_talk_msg;
			
			
				if (res.zhufu_type == 0) {
					this.Inv = 0;
					this.img = 0;
				}else if (res.zhufu_type == 1) {
					this.Inv = 1;
					this.img = 1;
				} else if (res.zhufu_type == 2) {
					this.Inv = 2;
					this.img = 2;
				} 
			} else {
			
				var data = '{}';
				var action = 'get_zhufu_theme_type';
			
				this.$utils.post(action, data).then(res => {
					console.log('可选模板', res)
					// 可选模板
					this.template = res.rs;
					var data = '{"memberid":"' + memberid + '"}';
					var action = 'get_zhufu_theme';
			
					this.$utils.post(action, data).then(res => {
						console.log('祝福模板', res)
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
						
			            uni.setStorageSync('theme_type', res.rs.theme_type)
			            uni.setStorageSync('zhufu_theme_id', res.rs.id)
						uni.setStorageSync('send_talk_msg', res.rs.send_talk_msg)
					})
			
				})
			}
		},
		methods:{
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
					}
				}
			},
		   // 选择模板
		   choose: function(e) {
			   console.log(e)
		   	this.theme_background = null;
		   	this.background = e.currentTarget.dataset.background;
			console.log("this.background")
			console.log(this.background)
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
			   if (this.Inv == 0) {
			   	data['zhufu_type']=0;
			   	data['zhufu_msg'] = this.zhufu_msg;
			   } 
			   console.log(data)
			   
			   var action = 'save_zhufu_theme';
			   
			   this.$utils.post(action, JSON.stringify(data)).then(res => {
			   	console.log('修改祝福模板', res)
				
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
				uni.navigateTo({
					 url:'../shopping/wishes'
				})
			   })
		   },
		   gift:function(e){
				   let type=e.type
				   var memberid = uni.getStorageSync('id');
				   this.memberid = memberid;
				   var data = '{"memberid":"' + memberid +"buy_type:"+type+ '"}';
				   var action = 'get_zhufu_theme';
				   			
				   this.$utils.post(action, data).then(res => {
				   	console.log('祝福模板', res)
				   					// 页面渲染
				   					this.content = res.rs;
									this.zhufu_type=res.rs.zhufu_type
									uni.setStorageSync('zhufu_type', res.rs.zhufu_type);
									console.log("this.zhufu_type")
									console.log(this.zhufu_type)
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
	/* 发送页 */
	.gift-header{
		width: 100%;
		height: 80rpx;
		background-color: #FAFAFA;
		display: flex;
		justify-content: center;
		align-items: center;
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
		height: 600rpx;
	}
	.gift-small-con{
		width: 80%;
		height: 600rpx;
		margin-left: 40rpx;
		display: flex;
		justify-content: space-around;
	}
	.gift-small-head{
		width: 100rpx;
		height: 100rpx;
		margin-top: 10rpx;
	}
	.gift-small-content{
		width: 75%;
		height: 590rpx;
		background-color: #fff;
		margin-top: 10rpx;
		border-radius: 10rpx;
	}
	.gift-small-head-img{
		width: 100rpx;
		height: 100rpx;
	}
	.gift-small-content-card{
		width: 450rpx;
		height: 580rpx;
		position: relative;
	}
	.gift-small-content-card-top{
	    width: 450rpx;
		height: 520rpx;
		position: absolute;
		left: 1rpx;
		top: 1rpx;
	}
	.gift-card-img{
		width: 40rpx;
		height: 40rpx;
		margin-top: 25rpx;
		margin-left: 20rpx;
	}
	.gift-card-title{
		position: absolute;
		top: 30rpx;
		left: 70rpx;
		color: #999999;
		font-size: 11px
	}
	.gift-card-con{
		position: absolute;
		top: 80rpx;
		left: 20rpx;
		font-size: 14px;
		color: #333333;
	}
	.gift-card-edit{
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		left: 380rpx;
		top: 110rpx;
	}
	.gift-card{
		width: 430rpx;
		height: 260rpx;
		position: absolute;
		top: 160rpx;
		left: 10rpx;
	}
	.gift-card-btn{
		width: 260rpx;
		border-radius: 50rpx;
		position: absolute;
		top: 440rpx;
		left: 100rpx;
		color: red;
	}
	.gift-small-bottom{
		width: 225px;
		height: 65rpx;
		position: relative;
		top: 523rpx;
		left: 1rpx;
		display: flex;
		align-items: center;
	}
	.gift-small-bottom-img{
		width: 30rpx;
		height: 30rpx;
		margin-left: 30rpx;
	}
	.gift-small-bottom-font{
		margin-left: 10rpx;
		color: #999999;
		font-size: 11px;
	}
	/* 左滑动效果 */
	.reg-img {
	    width: 350rpx;
	    height: 260rpx;
	    margin-right:18rpx;
		margin-top: 30rpx;
	}
	.my-reg {
	    padding:20rpx 30rpx;
	    border-bottom: 20rpx solid #F5F6F9;
	    display: flex;
	    overflow-y: hidden;
	    overflow-x: scroll
	}
	.my-regs{
	    display: flex;
	    margin-right: 8px;
	}
	.gift-img{
		position: absolute;
		left: 323rpx;
		top: 1040rpx;
		color: #999999;
		border-bottom: 1px solid #999999;
	}
	.gift-btn{
		width: 300rpx;
		position: absolute;
		top: 1080rpx;
		left: 233rpx;
	}
	textarea{
		width: 380rpx;
		font-size: 12px;
		color: #333333;
	}
</style>