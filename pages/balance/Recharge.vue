<template>
	<view>
		<!-- 兑换码 -->
		<view class="recharge-exchange flex-center">
			<input type="text" @input="input" placeholder="请输入礼品卡兑换码">
		</view>
		<!-- 说明 -->
		<view class="recharge-explain">输入礼品卡背面的兑换码后点击充值,兑换码不区分大小写</view>
		<!-- 按钮 -->
		<button class="recharge-button" @click="$buttonClick(button)">立即充值</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
			}
		},
		methods:{
			input(e){
				this.value = e.detail.value;
			},
			button:function(e){
				
				var value = this.value;
				var id = uni.getStorageSync('id');
				var data = '{"memberid":"'+id+'","exchange_code":"'+value+'"}';
				var action = 'exchange_code';
				
				this.$utils.post(action,data).then(res=>{ 
					if(res.sta == 1){
						if(res.type == 0){
						   uni.showToast({
						    	title:'余额充值成功',
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
						}else if(res.type ==1){
							uni.showToast({
							 	title:'礼包领取成功',
							 	icon:"success",
							 	mask:'true',  
							 	success: (res) => {
							 		setTimeout(function(e){
							 			uni.reLaunch({
							 				url:'../order/order'
							 			})
							 		}
							 		,1500) 
							 	}
							})
						}   
					}else{
						uni.showToast({
						 	title:res.msg,
						 	icon:"none",
						 	mask:'true',
						})	
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F4F5F7;
	}
</style>
