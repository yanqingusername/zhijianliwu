<template>
	<view>
		<own-product-list :commody="commody" :state="state"></own-product-list>
	</view>
</template>

<script>
	import ownProductList from "@/components/own-components/own-product-list.vue";
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
