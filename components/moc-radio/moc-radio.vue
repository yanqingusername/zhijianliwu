<template>
	<view class="content">
		<radio-group @change="radioChange">
			<label class="checkbox" v-for="(item,index) in radioList" @click="labelBtn(item.value,index)" :key="item.value">
				<image :src="item.checked ? item.radioActiveIcon : item.defaultIcon" mode="aspectFit" class="gennelicon" />
				<radio :value="item.value" :checked="item.checked" v-show="false" />
				<text :style="{color:fontColor}">{{item.name}}</text>
			</label>
		</radio-group>
	</view>
</template>

<script>
	export default {
		props: {
			labelList: {
				type: Array,
				default: function() {
					return [{
						name: '标题',
						value: 'woman',
						defaultIcon: '',
						radioActiveIcon: '',
						checked: false,
					}]
				}
			},
			fontColor: {
				type: String,
				default: 'black'
			}
		},
		data() {
			return {
				radioList: this.labelList
			};
		},
		methods: {
			labelBtn(name, checkindex) {
				const status = this.labelList[checkindex].checked;
				this.currentIndex = checkindex
				this.$set(this.labelList[checkindex], 'checked', !status);
				this.labelList.map((item, index) => {
					if (checkindex != index) {
						this.$set(this.labelList[index], 'checked', false);
					}
				})
			},
			radioChange: function(e) {
				this.$emit('change', e)
			},
		}
	}
</script>

<style scoped>
	.checkbox {
		margin-right: 30rpx;
		font-size: inherit;
		display: inline-flex;
		align-items: center;
	}

	.gennelicon {
		width: 22rpx;
		height: 30rpx;
		margin-right: 9rpx;
	}
</style>
