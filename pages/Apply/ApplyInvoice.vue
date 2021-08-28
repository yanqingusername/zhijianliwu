<template>
	<view>
		<form @submit="forsubmit1">
			<view class="apply-order-number">订单编号：20212321326</view>
			<view class="apply-order-money">开票金额：¥2160</view>
			
			<view class="apply-order-info">
				<view class="apply-type">
					<view class="apply-type-text">发票类型</view>
					<view class="apply-type-normal">增值税普通发票</view>
					<view class="apply-type-normal apply-type-normal-active">增值税专用发票</view>
				</view>
			</view>
			
			<view class="apply-order-info">
				<view class="apply-type">
					<view class="apply-type-text">发票抬头</view>
					<view class="apply-status-normal">个人</view>
					<view class="apply-status-normal apply-status-normal-active">公司</view>
				</view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>抬头名称</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入公司名称" type="text"></view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>单位税号</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入税号" type="text"></view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>开户行</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入开户行" type="text"></view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>账号</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入开户账号" type="text"></view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>地址</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入地址" type="text"></view>
			</view>
			<view class="apply-flex">
				<view class="apply-flex-title"><span>*</span>电话</view>
				<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入电话" type="text"></view>
			</view>
			<view class="apply-flex" style="height: 110rpx;">
				<view class="apply-flex-set">设置为默认抬头</view>
				<image class="apply-flex-default-img" src="../../static/icon_apply_default.png"></image>
				<!-- <image class="apply-flex-default-img" src="../../static/icon_apply_checked.png"></image> -->
			</view>
			
			<view class="apply-userinfo">
				<view style="width: 100%;">
					<view class="apply-userinfo-text">收票人信息</view>
				</view>
				<view class="line-height"></view>
				<view class="apply-flex">
					<view class="apply-flex-title"><span>*</span>手机号码</view>
					<view class="apply-flex-input flex-vertically"><input name="company_name" placeholder="请输入收票人手机号码" type="text"></view>
				</view>
				<view class="apply-flex">
					<view class="apply-flex-title"><span>*</span>收票地址</view>
					<view class="apply-flex-input flex-vertically" style="border-bottom: none;"><input name="company_name" placeholder="请输入收票地址" type="text"></view>
				</view>
			</view>
			
			<view class="apply-userinfo-content">
				<view class="apply-userinfo-item">
					<view class="apply-type-text">发票内容</view>
					<view class="apply-type-normal apply-type-normal-active">商品类别</view>
				</view>
				<view class="apply-content-bottom-text">发票内容将由客服专员与您核实确认，请保持手机通讯畅通。</view>
			</view>
			
			<view class="apply-button-view">
				<button  form-type="submit" class="apply-button">提交</button>
			</view>
			
			<view style="height: 70rpx;"></view>
			
			
			<!-- <view class="apply-content">
				<view class="apply-content-ul">
					<view class="apply-title"><span>*</span>您的企业名称</view>
					<view class="apply-input flex-vertically"><input name="company_name" placeholder="请输入您的企业名称" type="text"></view>
					<view class="apply-title"><span>*</span>联系人姓名</view>
					<view class="apply-input flex-vertically"><input name="linkman" placeholder="请输入联系人姓名" type="text"></view>
					<view class="apply-title"><span>*</span>联系人手机号</view>
					<view class="apply-input flex-vertically"><input name="linkphone" placeholder="请输入联系人手机号" type="text"></view>
					<view class="apply-title">输入串码</view>
					<view class="apply-input flex-vertically"><input name="linkcode" placeholder="无串码, 不用填写" type="text"></view>
					<view class="apply-title"><span>*</span>采购意向简述</view>
					<view class="apply-text"><textarea value="" name="remark" maxlength='100' placeholder="采购意向简述(选填)" /></view>				
			</view> 
		</view>
		
		<button  form-type="submit" class="apply-bottom">完成确认</button>-->
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				apply_level:'',
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
			forsubmit1(e){
				uni.navigateTo({
					url: "./ApplySuccess"
				});
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
				// 串码
				const linkcode = e.detail.value.linkcode;
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
				}else{
				 var data = '{"memberid":"'+this.id+'","shuihao":"1","apply_level":"'+apply_level+'","company_name":"'+company_name+'","linkman":"'+linkman+'","linkphone":"'+linkphone+'","remark":"'+remark+'"}';
				 
				 var action = 'apply_for_member';
					  	  
				  this.$utils.post(action,data).then(res=>{
					     console.log('企业会员申请请求数据',data)
						  // console.log('企业会员申请',res)					  
					  
							if(res.sta!='1'){
									   uni.showToast({
											title:res.msg,
											icon:'none',
									 	  mask:true})		
							}else{
									   uni.showToast({
										  title:'提交成功!',
										  icon:'success',
										  mask:true,
										  success: (res) =>{
											  setTimeout(function(e){
												  uni.reLaunch({
													url:'../personal/personal'
												  })
											  },1500)
										  }
									   })								
							}	 
					})
				}
			 
			},
		}
	}
</script>

<style>
page{
	background-color: #F4F5F7;
}
.apply-order-number{
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	padding: 40rpx 0rpx 0rpx 46rpx;
}

.apply-order-money{
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	padding: 20rpx 0rpx 24rpx 46rpx;
}

.apply-order-info{
	background: #FFFFFF;
}
.apply-type{
	display: flex;
	align-items: center;
	padding: 38rpx 0rpx 36rpx 46rpx;
	border-bottom: 1px solid #EEEEEE;
}
.apply-type-text{
	min-width: 130rpx;
	font-size: 28rpx;
	color: #333333;
	line-height: 40rpx;
	margin-right: 20rpx;
}
.apply-type-normal{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 214rpx;
	height: 48rpx;
	background: #EBEBEB;
	border: 1px solid #EBEBEB;
	border-radius: 25rpx;
	font-size: 22rpx;
	color: #555555;
	margin-right: 30rpx;
}
.apply-type-normal-active{
	background: #FFEAEA;
	border: 1px solid #EC1815;
	color: #EC1815;
}

.apply-status-normal{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 112rpx;
	height: 48rpx;
	background: #EBEBEB;
	border: 1px solid #EBEBEB;
	border-radius: 25rpx;
	font-size: 22rpx;
	color: #555555;
	margin-right: 30rpx;
}
.apply-status-normal-active{
	background: #FFEAEA;
	border: 1px solid #EC1815;
	color: #EC1815;
}
.apply-flex{
	display: flex;
	align-items: center;
	padding: 0rpx 46rpx;
	background: #FFFFFF;
}

.apply-flex-title{
	min-width: 140rpx;
	font-size: 28rpx;
	color: #999999;
	line-height: 40rpx;
	margin-right: 20rpx;
}

.apply-flex-title ._span {
    color: #D52643;
    font-size: 26rpx;
    margin-right: 10rpx;
}
.apply-flex-input{
	width: 505rpx;
	font-size: 28rpx;
	color: #666666;
	line-height: 40rpx;
	height: 110rpx;
	border-bottom: 2rpx solid #EEEEEE;
}
.apply-flex-set{
	font-size: 26rpx;
	color: #666666;
	line-height: 37rpx;
}
.apply-flex-default-img{
	width: 32rpx;
	height: 32rpx;
	margin-left: 10rpx;
}
.apply-userinfo{
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #FFFFFF;
}
.apply-userinfo-text{
	font-size: 28rpx;
	color: #333333;
	line-height: 40rpx;
	padding: 36rpx 46rpx;
}
.line-height{
	width: 698rpx;
	height: 1px;
	background: #EEEEEE;
}

.apply-content-bottom-text{
	font-size: 24rpx;
	color: #999999;
	line-height: 33rpx;
	margin-top: 30rpx;
}
.apply-userinfo-content{
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	padding: 30rpx 0rpx 30rpx 46rpx;
}

.apply-userinfo-item{
	display: flex;
	align-items: center;
}

.apply-button-view{
	margin-top: 80rpx;
}

.apply-button {
    width: 660rpx;
    height: 80rpx;
    background: #EC1815;
    border-radius: 40rpx;
    color: #FFF;
    font-size: 30rpx;
    text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
