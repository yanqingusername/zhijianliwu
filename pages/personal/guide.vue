<template>
	<view>
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:''
			}
		},
		onLoad:function(res){
			var data = '{}';
			var action = 'get_webconfig_songli';
			this.$utils.post(action,data).then(res=>{
				// console.log('送礼页面配置',res)
				if(res.sta == 1){
						this.content = res.rs.czzn.replace(/<img /g, '<img class="rich_img" ');
					}
				})
			},
		methods: {
			
		}
	}
</script>

<style>
 .rich_img{
	  width: 100% !important;
  }
</style>
