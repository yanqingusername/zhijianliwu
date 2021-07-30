<template>
	<view>
		<form @submit="submit">
			<view class="add-ul">
				<view class="add-li flex-vertically">
					<view class="add-left">收货人</view>
					<input type="text" name="name" :value="add.linkman" :placeholder="addr.linkman" />
					<view class="add-img">
					</view>
				</view>
				<view class="add-li flex-vertically">
					<view class="add-left">手机</view>
					<input type="text" name="phone" :value="add.linktel" :placeholder="addr.linktel" />
				</view>
				<view class="add-li flex-vertically">
					<view class="add-left">地区</view>
					<input type="text" name="add" :value="add.prov" disabled=true @tap="openAddres2" :placeholder="addr.province" />
					<view class="add-img">
						<image class="img" src="../../static/add-add.png" mode=""></image>
					</view>
				</view>
				<view class="add-li flex-vertically">
					<view class="add-left">详细地址</view>
					<input type="text" name="address" :value="add.address" :placeholder="addr.address" />
				</view>
				<view class="add-li flex-vertically">
					<view class="add-left chec">设置为默认地址</view>
					<evan-switch class="evan" v-model="checked"></evan-switch>
				</view>
				
			</view>

			<view class="content">
				<!-- // 地址选择器 -->
				<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
			</view>


			<button form-type="submit" class="apply-bottom">保存地址</button>


		</form>

	</view>
</template>

<script>
	// 地址选择器
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		data() {
			return {
				id: '',
				add: '',
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				addr: {
					linkman: '',
					linktel: '',
					province: '',
					address: '',
				},
				add: {
					linkman: '',
					linktel: '',
					province: '',
					address: '',
				},
				// 省
				province: '',
				// 市
				city: '',
				// 县
				county: '',
				index: '',
				addto: '',
				ordernumber: ''
			}
		},
		components: {
			simpleAddress
		},
		onLoad: function(e) {
			// 会员Id
			this.id = uni.getStorageSync('id');

			// 修改地址
			let addr = uni.getStorageSync('add');

			// 修改地址
			if (e.modify == 1) {
				this.index = e.index;
				addr.prov = addr.province_name + '-' + addr.city_name + '-' + addr.county_name
				this.add = addr;
				this.province = addr.province;
				this.city = addr.city;
				this.county = addr.county;
				// console.log('修改返回二层')
			} else if (e.addto == 1) {
				this.addto = e.addto;

			} else {
			}
			if (e.ordernumber) {
				this.ordernumber = e.ordernumber;
			}


		},
		onUnload: function(){
			if(this.addto==1){
				uni.setStorageSync('member_area_id',index);
				uni.setStorageSync('member_area_linkman',name);
				uni.setStorageSync('member_area_linktel',phone);
				uni.setStorageSync('member_area_address',add+" "+address);
			}
			console.log("页面卸载");
		},
		methods: {
			bindPickerChange: function(e) {
				// console.log(e.target.value)
			},
			submit: function(e) {
				// 姓名
				const name = e.detail.value.name;
				// 手机号
				const phone = e.detail.value.phone;
				// const phone = '13166538530';
				// 地区
				const add = e.detail.value.add;
				// 详细地址
				const address = e.detail.value.address;


				// 姓名
				if (name == '' || name == undefined) {
					uni.showToast({
						title: '姓名不能为空',
						mask: true,
						icon: 'none'
					})
					//  手机号不能为空 
				} else if (phone == '' || phone == undefined) {
					uni.showToast({
						title: '手机号不能为空',
						mask: true,
						icon: 'none'
					})
					//  地区不能为空 
				} else if (phone == '' || phone == undefined) {
					uni.showToast({
						title: '手机号不能为空',
						mask: true,
						icon: 'none'
					})
					// 长度等于11位	
				} else if (phone.lenght < 11) {
					uni.showToast({
						title: '手机号有误',
						mask: true,
						icon: 'none'
					})
				} else if (!(/^1[0-9]{10}$/.test(phone))) {
					uni.showToast({
						title: '手机号有误',
						mask: true,
						icon: 'none'
					})
					// 详细地址不能为空
				} else if (address == '' || address == undefined) {
					uni.showToast({
						title: '详细地址不能为空',
						mask: true,
						icon: 'none'
					})
					// 邮政编码不能为空
				} else {

					let province = this.province;
					let city = this.city;
					let county = this.county;
					
					// 如果是修改地址的话
					if (this.add.id) {
						var data = '{"memberid":"' + this.id + '","member_area_id":"' + this.add.id + '","linkman":"' + name +
							'","linktel":"' + phone + '","province":"' + province + '","city":"' + city + '","county":"' + county +
							'","address":"' + address + '"}';
					} else {
						var data = '{"memberid":"' + this.id + '","linkman":"' + name + '","linktel":"' + phone + '","province":"' +
							province + '","city":"' + city + '","county":"' + county + '","address":"' + address + '"}';
					}
					// console.log(data)
					var action = 'add_member_area';
					this.$utils.post(action, data).then(res => {
						// console.log('添加会员地址',res)
						if (res.sta == 1) {
							var data = '{"memberid":"' + this.id + '"}';
							var action = 'get_member_area';
							this.$utils.post(action, data).then(res => {
								// console.log('列表',res)
								// 匹配地址成功后
								if (res.sta == 1) {
									// 修改成功 返回两层
									if (this.add.id) {
										// console.log('修改返回二层')
										uni.setStorageSync('member_area_id', this.index)
										uni.navigateBack({
											delta: 1
										})
									}
									// 有地址添加返回两层
									else if (this.addto) {

										if (this.ordernumber) {
											// console.log('详情修改地址')
											let data = '{"memberid":"' + this.id + '","member_area_id":"' + res.rs[0].id + '","ordernumber":"' +
												this.ordernumber + '"}';
											let action = 'save_order_address';

											this.$utils.post(action, data).then(res => {
												console.log('地址修改成功',res)

												if (res.sta == 1) {
													uni.navigateBack({
														delta: 1
													})
												} else {
													uni.showToast({
														title: res.msg,
														icon: 'none'
													})
												}
											})
										} else {
											uni.setStorageSync('member_area_id', this.index)
											uni.setStorageSync('member_area_linkman',name);
											uni.setStorageSync('member_area_linktel',phone);
											uni.setStorageSync('member_area_address',add+" "+address);
											uni.navigateBack({
												delta: 1
											})
										}
									}
									// 无地址添加成功返回一层
									else {
										uni.setStorageSync('member_area_id', '0')
										uni.navigateBack({
											delta: 1
										})
									}
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
							})
						}


					})
				}
			},
			// 默认第一个
			openAddres2() {
				// 根据 label 获取
				var index = this.$refs.simpleAddress.queryIndex(['北京市', '市辖区', '东城区'], 'label');
				console.log(index);
				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
			},
			// 地址选择
			onConfirm(e) {
				console.log(e)
				this.add.prov = e.name;
				this.province = e.provinceCode;
				this.city = e.cityCode;
				this.county = e.areaCode;
			}


		}
	}
</script>

<style>
	page {
		background-color: #FFF;
	}
	.add-left{
		width: 200rpx;
		color: #333333;
		font-family: "苹方 粗体";
		font-weight: bold;
	}
	.chec{
		color: #666666;
		border-bottom: none;
	}
	.add-li input{
		margin-left: 32rpx;
	}
	.evan{
		position: absolute;
		right: 30rpx;
	}
</style>
