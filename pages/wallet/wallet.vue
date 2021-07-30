<template>
	<view>
		<!-- 指间币 -->
		  <view class="wallet-top">
			  <view class="wallet-header">
				  <view class="wallet-header-title">指间币  (个)</view>
				  <view class="wallet-header-price">{{zj_balance}}</view>
				  <view class="wallet-header-alt">1指间币=1元</view>
			  </view>
			  <!-- 选项卡 -->
			  <view class="wallet-nav flex">
				  <view class="wallet-nav-li flex" @click="$buttonClick(left)"><image src="../../static/wallet-left.png" mode=""></image><view class="wallet-nav-li-text">我的账本</view></view>
				  <view class="wallet-nav-line"></view>
				  <view class="wallet-nav-li flex" @click="$buttonClick(right)"><image src="../../static/wallet-right.png" mode=""></image><view class="wallet-nav-li-text">我的好友</view></view>
			  </view>
		  </view>
		<!-- 提现 -->
		 <view class="wallet-content">
			 <view class="wallet-input flex-vertically"><input @input="input" placeholder="输入提现金额" type="text" value="" /></view>
			 <view class="wallet-button"><button @click="$buttonClick(button)" type="default">申请提现</button></view>
		 </view>
		<!-- 说明 -->
		<view class="wallet-bottom">
			<view class="wallet-text-title">申请说明</view>
			<view class="wallet-text" v-for="(item,index) in text" :key="index">{{item.li}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:[
					{li:'1.提现金额需是10倍,指间币也可用于商品消费券使用;'},
					{li:'2.提款的账户需与您登陆的账户一致;'},
					{li:'3.提现审核为2-7个工作日,审核通过后,会在2个工作日内转入您的微信账户中;'},
					{li:'6.操作提现暂不收手续费(以后根据政策调整);'},
					{li:'5.提现将会通过微信的"通知服务"提醒,提现成功会到您的微信零钱;'}
				],
				value:'',
				zj_balance:''
			}
		},
		onLoad:function(e){
			
			this.login();
		},
		methods: {
			// 基本信息
			login:function (){
				
				var rawdata = this.Data;
				// openid
				var openid = uni.getStorageSync('openid');
					
					   //登录 
						var data = '{"wx_openid":"'+openid+'"}';
						var action = 'member_login';
						 this.$utils.post(action,data).then(res=>{
							 // console.log('基本信息',res.rs)
			
							  // 余额
							  if(res.rs.balance==null||res.rs.balance==''){}else{
											  this.zj_balance = res.rs.zj_balance;
							  }
						 })
			},
			left:function(e){
				uni.navigateTo({
					url:'../AccountBook/AccountBook'
				})
			},
			right:function(e){
				uni.navigateTo({
					url:'../Friends/Friends'
				})
			},
			input(e){
				this.value = e.detail.value;
			},
			button:function(e){
				
				var value = this.value;
				var id = uni.getStorageSync('id');
				
				var data = '{"memberid":"'+id+'","money":"'+value+'"}';
				var action = 'cash_audit';
				
				
				if(value == ''){}else{
				   this.$utils.post(action,data).then(res=>{
				   	// console.log('申请成功',res)
				   	if(res.sta == 1){
				   	  uni.showToast({
				   	   	title:'申请成功',
				   	   	icon:"success",
				   	   	mask:'true',
				   	   	success: (res) => {
				   	   		setTimeout(function(e){
				   	   			uni.reLaunch({
				   	   				url:'../personal/personal'
				   	   			})
				   	   		}
				   	   		,1500) 
				   	   	}
				   	  })	
				   	}else{
				   		uni.showToast({
				   		 	title:res.msg,
				   		 	icon:"none",
				   		 	mask:'true',
				   		
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
