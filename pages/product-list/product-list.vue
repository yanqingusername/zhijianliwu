<template>
	<view>
		<own-product-list :commody="commody" :state="state"></own-product-list>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue";
	import sr from 'sr-sdk-wxapp';
	export default {
		components: {
			"own-product-list": ownProductList,
		},
		data() {
			return {
				pageSize: 10,
				pageIndex: 1,
				commody: [],
				state: -1
			}
		},
		onLoad(e) {
			this.e = e;
			console.log(e);
			// url: @product-list/product-list?type=module&key=
			if (e.type == "module") {
				this.module(e.key);
			}
			// url: @product-list/product-list?type=search&key=
			if (e.type == "search") {
				this.search(e.key);
				uni.setNavigationBarTitle({
					title: '搜索结果'
				});
			}
		},
		methods: {
			search: function(key) {
				if (this.state == 200) {
					return;
				}
				this.state = 0;
				let data, action, level = uni.getStorageSync("level");
				data = JSON.stringify({
					keyword: key,
					member_level: level,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex
				});
				action = 'get_index_goods';
				this.$utils.post(action, data).then(res => {
					this.state = -1;
					this.pageIndex++;
					this.commody = [...this.commody, ...res.rs];
					if (res.rs.length == 0) {
						this.state = 200;
					}
					// 腾讯有数
					if(res.rs && res.rs.length > 0){
						for (var i = 0; i < res.rs.length; i++) {
							let item = res.rs[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
				});
			},
			module: function(key) {
				if (this.state == 200) {
					return;
				}
				this.state = 0;
				let data, action, level = uni.getStorageSync("level");
				data = JSON.stringify({
					plan_theme_id: key,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex
				});
				action = 'get_plan_theme_goods';
				this.$utils.post(action, data).then(res => {
					uni.setNavigationBarTitle({
						title: res.rs.plan_theme.name
					})
					this.state = -1;
					this.pageIndex++;
					this.commody = [...this.commody, ...res.rs.goodslist];
					if (res.rs.goodslist.length == 0) {
						this.state = 200;
					}
					
					// 腾讯有数
					if(res.rs.goodslist && res.rs.goodslist.length > 0){
						for (var i = 0; i < res.rs.goodslist.length; i++) {
							let item = res.rs.goodslist[i];
							sr.track('expose_sku_component',
								{
								   "sku": {
									 "sku_id": item.sku+'', // 若商品无sku_id时，可传spu_id信息
									 "sku_name": item.goodsname // 若商品无sku_name时，可传spu_name信息
								   },
								   "spu": {
										"spu_id": item.sku+'', // 若商品无spu_id时，可传sku_id信息
										"spu_name": item.goodsname // 若商品无spu_name时，可传sku_name信息
									},
								   "primary_image_url": item.head_img
								})
						}
					}
				});
			}
		},
		onReachBottom() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			}, 500)
			let e = this.e;
			// url: @product-list/product-list?type=module&key=
			if (e.type == "module") {
				console.log("module")
				this.module(e.key);
			}
			// url: @product-list/product-list?type=search&key=
			if (e.type == "search") {
				console.log("search")
				this.search(e.key);
			}
		}
	}
</script>

<style>

</style>
