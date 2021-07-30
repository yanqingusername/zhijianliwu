<template>
	<swiper v-if="swiper.length>0" :indicator-dots="isOne" :autoplay="isOne" interval="5000" duration="1000" class="own-swiper"
	 indicator-color="#FFFFFF30" indicator-active-color="#FF0137">
		<swiper-item v-for="(item,index) in swiper" :key="index">
			<image lazy-load="true" class="own-swiper-img" :src="$utils.imageUrl(item.banner)" 
			@click="bannerJump(item.jump_action, item.jump_id)" mode="widthFix"></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		props:[
			"swiper"
		],
		data() {
			return {
				
			}
		},
		methods: {
			bannerJump:function(action, id){
				console.log(action, id);
				if(action=="gifts_article"){
					uni.navigateTo({
						url:'/pages/Post/Post?id=' + id
					})
				}
				if(action=="goods"){
					uni.navigateTo({
						url:'/pages/details/details?keynum=' + id
					})
				}
			}
		},
		computed:{
			isOne: function(){
				return this.swiper.length<=1?false:true;
			}
		}
	}
</script>

<style scope>
.own-swiper{
	width: 100%;
	margin-top: -50rpx;
	position: fixed;
	z-index: 99;
}
.own-swiper-img{
	width: 100%;
	height: 100%;
}
</style>
