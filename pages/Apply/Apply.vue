<template>
	<view style="padding: 26rpx 0rpx;border-top: 1px solid #EDEDED;">
		<form @submit="forsubmit">
			<view class="now-apply-content">
				<view class="apply-content-ul" style="width: 609rpx;">
					<view class="apply-title"><span>*</span>您的公司名称</view>
					<view class="apply-input flex-vertically" style="width: 609rpx;"><input name="company_name" placeholder="请输入公司名称" type="text"></view>
					<view class="apply-title"><span>*</span>联系人姓名</view>
					<view class="apply-input flex-vertically" style="width: 609rpx;"><input name="linkman" placeholder="请输入联系人姓名" type="text"></view>
					<view class="apply-title"><span>*</span>联系人手机号</view>
					<view class="apply-input flex-vertically" style="width: 609rpx;margin-bottom: 15rpx;"><input name="linkphone" placeholder="请输入联系人手机号" v-model="linkphone" type="text"></view>
					<!-- <view class="apply-title">输入串码</view> -->
					<view class="apply-input flex-vertically" style="width: 609rpx;">
						<input name="smscode" placeholder="请输入验证码" type="text" class="code-input">
						<view class="verification-code" @click="$buttonClick(getCode)">{{isSend ? "获取验证码" : sendTime + "秒后再次发送"}}</view>
					</view>
					<view class="apply-title"><!-- <span>*</span> -->采购意向简述</view>
					<view class="apply-text" style="width: 609rpx;"><textarea value="" name="remark" maxlength='100' placeholder="请描述采购意向，以便我们为您提供更优质的服务(选填)" /></view>				
				</view>
				<button  form-type="submit" class="now-apply-bottom">立即申请</button>
			</view>
		
		
		</form>
		
		<!-- 提交成功 -->
		<uni-popup ref="popupcenter" type="center" :animation="false" :maskClick="true" @change="change">
			<view class="popup-center-view">
				<image class="picker-center-view-img" src="https://zhijianlw.com/static/web/img/icon_adopt_apply_in.png"></image>
				<view class="popup-center-view-text">您已成功提交申请，请等待审核，我们将于1-3个工作日内处理完成。</view>
				<view class="popup-center-view-bottom" @click="$buttonClick(submitrefund)">
					<view class="popup-center-view-button">确定</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				apply_level:'',
				linkphone: '',
				isSend: true, // 是否允许发送验证码
				sendTime: 60, // 发送验证码倒计时
			} 
		},
		onLoad:function(e){
			this.id = uni.getStorageSync('id');
			let level = uni.getStorageSync('level');
			if(this.id==""||this.id==null||this.id==undefined){
				uni.navigateTo({
					url: '../signin/signin'
				})
			}
			this.apply_level = 4
			
		},
		methods: {
			getCode(){
				if (!this.isSend) return;
				// 手机号
				let linkphone = this.linkphone;
				if(linkphone==''||linkphone==undefined){
					uni.showToast({
						title:'手机号不能为空',
						 mask:true,
						 icon:'none'
					})	
				// 长度等于11位	
				}else if(linkphone.lenght < 11){
					uni.showToast({
						title:'手机号有误',
						 mask:true,
						 icon:'none'
					})	
				}else if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(linkphone))){
					uni.showToast({
						title:'手机号有误',
						 mask:true,
						 icon:'none'
					})
				}else{
					let that = this;
					let action = "send_out_sms";
					let controller = 'sms';
					let data = JSON.stringify({
						phone: linkphone,
						send_type: "1",
						member_id: this.id
					});
					
					this.$utils.postNew(action,data,controller).then(res=>{
						if(res.sta == 1){
							that.isSend = false;
							// 是否允许发送验证码倒计时开始 -- 60
							that.keyid && clearInterval(that.keyid)
							that.keyid = setInterval(() => {
							    that.sendTime = that.sendTime - 1
							    if (that.sendTime == 0) {
							        clearInterval(that.keyid);
							        that.isSend = true;
							        that.sendTime = 60;
							    }
							}, 1000)
						}
					})
				}
			},
			forsubmit(e){
				console.log("点击按钮")
				const apply_level = this.apply_level;
				// 企业名称
				const company_name = e.detail.value.company_name;
				// 联系人姓名
				const linkman = e.detail.value.linkman;
				// 手机号
				const linkphone = e.detail.value.linkphone;
				// 验证码
				const smscode = e.detail.value.smscode;
				// 意见简述
				const remark = e.detail.value.remark;
				
				// 企业名称不能为空
				if(company_name==''||company_name==undefined){
				   uni.showToast({
					   title:'企业名称不能为空',
					   mask:true,
					   icon:'none'
				   })	
				// 联系人不能为空
				}else if(linkman==''||linkman==undefined){
					uni.showToast({
						title:'联系人不能为空',
						 mask:true,
						 icon:'none'
					})	
			    //  手机号不能为空 
				}else if(linkphone==''||linkphone==undefined){
					uni.showToast({
						title:'手机号不能为空',
						 mask:true,
						 icon:'none'
					})	
				// 长度等于11位	
				}else if(linkphone.lenght < 11){
					uni.showToast({
						title:'手机号有误',
						 mask:true,
						 icon:'none'
					})	
				}else if(!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(linkphone))){
					uni.showToast({
						title:'手机号有误',
						 mask:true,
						 icon:'none'
					})
				}else if(smscode==''||smscode==undefined){
					uni.showToast({
						title:'验证码不能为空',
						 mask:true,
						 icon:'none'
					})	
				}else{
					let that = this;
					let action = "apply_for_member";
					let controller = 'member';
					let data = JSON.stringify({
						company_name: company_name,
						memberid: this.id,
						linkman: linkman,
						linkphone: linkphone,
						sms_code: smscode,
						apply_level: apply_level,
						remark: remark
				     });
				  
					this.$utils.postNew(action,data,controller).then(res=>{
						if(res.sta!='1'){
							uni.showToast({
								title:res.msg,
								icon:'none',
								mask:true,
							})		
						}else{
							that.$refs['popupcenter'].open();
							// uni.showToast({
							// 	title:'提交成功!',
							// 	icon:'success',
							// 	mask:true,
							// 	success: (res) =>{
							// 		setTimeout(function(e){
							// 			uni.reLaunch({
							// 				url:'../personal/personal'
							// 			})
							// 		},1500)
							// 	}
							// })								
						}	 
					})
				}
			 
			},
			togglecenter(type) {
				this.$refs['popupcenter'].open();
			},
			submitrefund(){
				this.$refs['popupcenter'].close();
				uni.reLaunch({
					url:'../personal/personal'
				})
			},
			change(){
				
			}
		},
		onUnload() {
			this.keyid && clearInterval(this.keyid)
		}
	}
</script>

<style>
page{
	background-color: #EAC48A;
}

.now-apply-content {
    padding-top: 49rpx;
    padding-bottom: 56rpx;
    background-color: #FFF;
    margin: 0rpx 25rpx 0 25rpx;
    /* width: 700rpx; */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
	flex-direction: column;
}

.now-apply-bottom {
	display: flex;
	align-items: center;
	justify-content: center;
    text-align: center;
	font-size: 30rpx;
	color: #000000;
	width: 660rpx;
	height: 80rpx;
	background: #CDA66B;
	border-radius: 40rpx;
	margin-top: 100rpx;
}

.now-apply-input input {
    padding-left: 21rpx;
    font-size: 24rpx;
    height: 26rpx;
    width: 565rpx;
}

.popup-center-view{
		display: flex;
		align-items: center;
		width: 644rpx;
		height: 469rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		flex-direction: column;
	}
	.picker-center-view-img{
		width: 68rpx;
		height: 68rpx;
		margin-top: 70rpx;
	}
	.popup-center-view-text{
		font-size: 30rpx;
		color: #333333;
		line-height: 52rpx;
		margin-top: 34rpx;
		padding: 0rpx 36rpx 0rpx 66rpx;
	}
	.popup-center-view-bottom{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 54rpx;
	}
	.popup-center-view-button{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 196rpx;
		height: 72rpx;
		background: #E1B87A;
		border-radius: 36rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		line-height: 42rpx;
	}
	.verification-code{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 234rpx;
		height: 60rpx;
		background: #FFFFFF;
		border-radius: 0px 3rpx 3rpx 0px;
		border-left: 1px solid #EDEDED;
		font-size: 24rpx;
		color: #DB3C3A;
	}
	.code-input{
		width: 375rpx !important;
	}
</style>
