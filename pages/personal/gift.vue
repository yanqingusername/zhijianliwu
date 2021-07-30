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
			var action = 'get_webconfig_wode';
						
			this.$utils.post(action,data).then(res=>{ 
				// console.log('基本配置',res)
				this.content = res.rs.qglw.replace(/<img /g, '<img class="rich_img" ');
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
