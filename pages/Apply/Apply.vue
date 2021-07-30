<template>
	<view>
		<form @submit="forsubmit">
			<view class="apply-content">
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
		
		<button  form-type="submit" class="apply-bottom">完成确认</button>
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
</style>
