<template>
	<view>
		<rich-text style="line-height: 20px;font-size: 16px;" :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'' 
			}
		},
		onLoad:function(e){
			var data = '{}';
			var action = 'get_webconfig_songli';
			this.$utils.post(action,data).then(res=>{
				// console.log('送礼页面配置',res)
				if(res.sta == 1){
					if(e.index==0){
						this.content = res.rs.czzn.replace(/<img /g, '<img class="rich_img" ');
					}else if(e.index==1){
						this.content = res.rs.sysm.replace(/<img /g, '<img class="rich_img" ');
					}else if(e.index==2){
						this.content = res.rs.yhxy.replace(/<img /g, '<img class="rich_img" ');
					}
				}
			})

		},
		methods: {
             			
		}
	}
	
	// export default {
	// 	data() {
	// 		return {
				
	// 		}
	// 	},
	// 	methods: {
			
	// 	}
	// }
</script>

<style>
 .rich_img{
	  width: 100% !important;
  }
</style>
