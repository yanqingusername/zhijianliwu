<template>
	<view class="simple-address" v-if="showPopup" @touchmove.stop.prevent="clear">
		<!-- 遮罩层 -->
		<view
			class="simple-address-mask"
			@touchmove.stop.prevent="clear"
			v-if="maskClick"
			:class="[ani + '-mask', animation ? 'mask-ani' : '']"
			:style="{
				'background-color': maskBgColor
			}"
			@tap="hideMask(true)"
		></view>

		<view class="simple-address-content simple-address--fixed" :class="[type, ani + '-content', animation ? 'content-ani' : '']">
			<view class="simple-address__header">
				<view class="simple-address__header-btn-box" @click="pickerCancel">
					<text class="simple-address__header-text" :style="{ color: cancelColor, fontSize: btnFontSize }">取消</text>
				</view>
				<view class="simple-address__header-btn-box" @click="pickerConfirm">
					<text class="simple-address__header-text" :style="{ color: confirmColor || themeColor, fontSize: btnFontSize }">确定</text>
				</view>
			</view>
			<view class="simple-address__box">
				<picker-view indicator-style="height: 70rpx;" class="simple-address-view" :value="pickerValue" @change="pickerChange">
					<picker-view-column>
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in provinceDataList" :key="index">{{ item.name }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in provinceDataList" :key="index">{{ item.name }}</text>
						<!-- #endif -->
					</picker-view-column>
					<picker-view-column>
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in cityDataList" :key="index">{{ item.name }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in cityDataList" :key="index">{{ item.name }}</text>
						<!-- #endif -->
					</picker-view-column>
					<picker-view-column>
						<!-- #ifndef APP-NVUE -->
						<view class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in areaDataList" :key="index">{{ item.name }}</view>
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<text class="picker-item" :style="{ fontSize: fontSize }" v-for="(item, index) in areaDataList" :key="index">{{ item.name }}</text>
						<!-- #endif -->
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * Simple-addres  地址联动组件
 * @description 三级地址联动，支持（app）nvue、小程序、H5
 * @tutorial https://ext.dcloud.net.cn/plugin?id=1084
 * @property {String} animation 是否开启动画
 * @property {String} type = [bottom] 弹出层类型，暂时只支持底部弹出
 * @property {Boolean} maskClick = [true | false] 是否允许点击遮罩层关闭
 * @property {Boolean} show = [true | false]  显示或隐藏地址组件
 * @property {String} maskBgColor 遮罩层背景颜色
 * @property {String} cancelColor 取消按钮颜色，默认为：#1aad19
 * @property {String} confirmColor 确认按钮颜色，默认为：themeColor
 * @property {String} themeColor 主题颜色，后续会废弃该配置，建议使用`cancelColor`或`confirmColor`
 * @property {String} btnFontSize 取消、确认按钮字体大小，默认为`uni.scss里的 $uni-font-size-base `
 * @property {String} fontSize picker-item字体大小，默认为：28rpx
 * @property {Array} pickerValueDefault 默认值，可以通过function queryIndex 获取
 * @property {Function} queryIndex 根据自定义信息返回对应的index
 * @property {Function} open 打开
 * @example  <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor='#007AFF'></simple-address>
 */

import provinceData from './city-data/province.js';
import cityData from './city-data/city.js';
import areaData from './city-data/area.js';
export default {
	name: 'simpleAddress',
	props: {
		mode: {
			// 地址类型
			// default 则代表老版本根据index索引获取数据
			//
			type: String,
			default: 'default'
		},
		// 开启动画
		animation: {
			type: Boolean,
			default: true
		},
		/* 弹出层类型，可选值；
				bottom：底部弹出层
			*/
		type: {
			type: String,
			default: 'bottom'
		},
		// maskClick
		maskClick: {
			type: Boolean,
			default: true
		},
		show: {
			type: Boolean,
			default: true
		},
		maskBgColor: {
			type: String,
			default: 'rgba(0, 0, 0, 0.4)' //背景颜色 rgba(0, 0, 0, 0.4) 为空则调用 uni.scss
		},
		themeColor: {
			type: String,
			default: '' // 确认按钮颜色（向下兼容）
		},
		cancelColor: {
			type: String,
			default: '' // 取消按钮颜色
		},
		confirmColor: {
			type: String,
			default: '' // 确认按钮颜色
		},
		fontSize: {
			type: String,
			default: '28rpx' // picker-item字体大小
		},
		btnFontSize: {
			type: String,
			default: '' // 按钮的字体大小
		},
		/* 默认值 */
		pickerValueDefault: {
			type: Array,
			default() {
				return [0, 0, 0];
			}
		}
	},
	data() {
		return {
			ani: '',
			showPopup: false,
			pickerValue: [0, 0, 0],
			provinceDataList: [],
			cityDataList: [],
			areaDataList: []
		};
	},
	watch: {
		show(newValue) {
			if (newValue) {
				this.open();
			} else {
				this.close();
			}
		},
		pickerValueDefault() {
			this.init();
		}
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
			
			// this.provinceDataList = provinceData;
			// this.cityDataList = cityData[this.pickerValueDefault[0]];
			// this.areaDataList = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]];
			
			
			var data = '{"level":"1"}';
			var action = 'get_area';
			 this.$utils.post(action,data).then(res=>{
				  // console.log('1省',res.rs)
				 this.provinceDataList = res.rs;
				 var data = '{"level":"2","parentid":"'+res.rs[0].id+'"}';
				 var action = 'get_area';
				  this.$utils.post(action,data).then(res=>{
				 	  // console.log('2市',res.rs)
				 				 this.cityDataList = res.rs
								 var data = '{"level":"3","parentid":"'+res.rs[0].id+'"}';
								 var action = 'get_area';
								  this.$utils.post(action,data).then(res=>{
								 	  // console.log('3县',res.rs)
								 				 this.areaDataList = res.rs
								  })
				  })
			 })
			 
		
			
			
			this.pickerValue = this.pickerValueDefault;
		},
		handPickValueDefault() {
			if (this.pickerValueDefault !== [0, 0, 0]) {
				if (this.pickerValueDefault[0] > provinceData.length - 1) {
					this.pickerValueDefault[0] = provinceData.length - 1;
				}
				if (this.pickerValueDefault[1] > cityData[this.pickerValueDefault[0]].length - 1) {
					this.pickerValueDefault[1] = cityData[this.pickerValueDefault[0]].length - 1;
				}
				if (this.pickerValueDefault[2] > areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1) {
					this.pickerValueDefault[2] = areaData[this.pickerValueDefault[0]][this.pickerValueDefault[1]].length - 1;
				}
			}
		},
		pickerChange(e) {
			let changePickerValue = e.detail.value;
			
			
			if (this.pickerValue[0] !== changePickerValue[0]) {
				 
				// 第一级发生滚动
				let id = this.provinceDataList[changePickerValue[0]].id;
				var data = '{"level":"2","parentid":"'+id+'"}';
				var action = 'get_area';
				 this.$utils.post(action,data).then(res=>{
					 console.log('市',res.rs.length)
					 if(res.rs.length > 0){
						 this.cityDataList = res.rs;
						 let id = this.cityDataList[changePickerValue[1]].id;
						 var data = '{"level":"3","parentid":"'+id+'"}';
						 var action = 'get_area';
						  this.$utils.post(action,data).then(res=>{
						 	  // console.log('县',res.rs)
						 	 this.areaDataList = res.rs;
						  })
					 }else{
						  this.cityDataList = '';
						  this.areaDataList = '';
					 }
						
				 })
				
				changePickerValue[1] = 0;
				changePickerValue[2] = 0;
			}
			 else if (this.pickerValue[1] !== changePickerValue[1]) {
				// 第二级滚动
				
			
				
				let id = this.provinceDataList[changePickerValue[0]].id;
				var data = '{"level":"2","parentid":"'+id+'"}';
				var action = 'get_area';
				 this.$utils.post(action,data).then(res=>{
						if(res.rs.length>0){
												 this.cityDataList = res.rs;
												 let id = this.cityDataList[changePickerValue[1]].id;
												 var data = '{"level":"3","parentid":"'+id+'"}';
												 var action = 'get_area';
												  this.$utils.post(action,data).then(res=>{
												 	  // console.log('县',res.rs)
												 	 this.areaDataList = res.rs;
												  })
						}else{
												  this.cityDataList = '';
												  this.areaDataList = '';
						}
				 })
				
				
				// this.areaDataList = areaData[changePickerValue[0]][changePickerValue[1]];
				
				
				changePickerValue[2] = 0;
			}
			this.pickerValue = changePickerValue;
			this._$emit('onChange');
		},
		_$emit(emitName) {
			let pickObj = {
				name: this._getLabel(),
				value: this.pickerValue,
				cityCode: this._getCityCode(),
				areaCode: this._getAreaCode(),
				provinceCode: this._getProvinceCode(),
				labelArr: this._getLabel().split('-')
			};
			this.$emit(emitName, pickObj);
		},
		_getLabel() {
			let pcikerLabel =
				this.provinceDataList[this.pickerValue[0]].name + '-' + this.cityDataList[this.pickerValue[1]].name + '-' + this.areaDataList[this.pickerValue[2]].name;
			return pcikerLabel;
		},
		_getCityCode() {
			return this.cityDataList[this.pickerValue[1]].id;
		},
		_getProvinceCode() {
			return this.provinceDataList[this.pickerValue[0]].id;
		},
		_getAreaCode() {
			return this.areaDataList[this.pickerValue[2]].id;
		},
		queryIndex(params = [], type = 'value') {
			// params = [ 11 ,1101,110101 ];
			// 1.获取省份的index
			let provinceIndex = provinceData.findIndex(res => res[type] == params[0]);
			let cityIndex = cityData[provinceIndex].findIndex(res => res[type] == params[1]);
			let areaIndex = areaData[provinceIndex][cityIndex].findIndex(res => res[type] == params[2]);
			return {
				index: [provinceIndex, cityIndex, areaIndex],
				data: {
					province: provinceData[provinceIndex],
					city: cityData[provinceIndex][cityIndex],
					area: areaData[provinceIndex][cityIndex][areaIndex]
				}
			};
		},
		clear() {},
		hideMask() {
			this._$emit('onCancel');
			this.close();
		},
		pickerCancel() {
			this._$emit('onCancel');
			this.close();
		},
		pickerConfirm() {
			this._$emit('onConfirm');
			this.close();
		},
		open() {
			this.showPopup = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.ani = 'simple-' + this.type;
				}, 100);
			});
		},
		close(type) {
			if (!this.maskClick && type) return;
			this.ani = '';
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPopup = false;
				}, 300);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.simple-address {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
}

.simple-address-mask {
	position: fixed;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;

	transition-property: opacity;
	transition-duration: 0.3s;
	opacity: 0;
	/* #ifndef APP-NVUE */
	z-index: 99;
	/* #endif */
}

.mask-ani {
	transition-property: opacity;
	transition-duration: 0.2s;
}

.simple-bottom-mask {
	opacity: 1;
}

.simple-center-mask {
	opacity: 1;
}

.simple-address--fixed {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	transition-property: transform;
	transition-duration: 0.3s;
	transform: translateY(460rpx);
	/* #ifndef APP-NVUE */
	z-index: 99;
	/* #endif */
}

.simple-address-content {
	background-color: #ffffff;
}

.simple-content-bottom {
	bottom: 0;
	left: 0;
	right: 0;
	transform: translateY(500rpx);
}

.content-ani {
	transition-property: transform, opacity;
	transition-duration: 0.2s;
}

.simple-bottom-content {
	transform: translateY(0);
}

.simple-center-content {
	transform: scale(1);
	opacity: 1;
}

.simple-address__header {
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	border-bottom-color: #f2f2f2;
	border-bottom-style: solid;
	border-bottom-width: 1rpx;
}

.simple-address--fixed-top {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: space-between;
	border-top-color: $uni-border-color;
	border-top-style: solid;
	border-top-width: 1rpx;
}

.simple-address__header-btn-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 70rpx;
}

.simple-address__header-text {
	text-align: center;
	font-size: $uni-font-size-base;
	color: #1aad19;
	line-height: 70rpx;
	padding-left: 40rpx;
	padding-right: 40rpx;
}

.simple-address__box {
	position: relative;
}

.simple-address-view {
	position: relative;
	bottom: 0;
	left: 0;
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	width: 750rpx;
	/* #endif */
	height: 408rpx;
	background-color: rgba(255, 255, 255, 1);
}

.picker-item {
	text-align: center;
	line-height: 70rpx;
	text-overflow: ellipsis;
	font-size: 28rpx;
}
</style>
