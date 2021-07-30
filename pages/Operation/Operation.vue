<template>
	<view class="content">
		{{czzn}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				czzn:''
			}
		},
		onLoad:function(){
			var data = '{}';
			var action = 'get_webconfig_wode';
				  	  // console.log(data)
			  this.$utils.post(action,data).then(res=>{
				  // console.log(res)
				  this.czzn = res.rs.czzn
			  })
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	width: 690rpx;
	padding-top:20rpx;
	margin: 0 auto;
}
</style>
