<template>
	<view>
		<view class="own-picker-box">
			<view class="own-picker-title">
				{{ title }}
			</view>
			<view class="own-picker-content">
				<view class="own-picker-item" v-for="item,pickerIndex in content" @click="pickerClick(pickerIndex)">
					<text class="own-picker-item-title">{{item.index==-1||index == pickerIndex?item.title:item.list[item.index]}}</text>
					<text>▾</text>
					<transition name = "own-picker">
						<view class="own-picker-item-ul" v-if="index==pickerIndex">
							<view class="own-picker-item-li" v-for="listItem,listIndex in item.list" @click="picker(listIndex,pickerIndex)">
								<text :class="[item.list[item.index]==listItem ? 'own-picker-li-active' : '']">{{listItem}}</text>
							</view>
						</view>
					</transition>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 1000rpx;background-color: #333333;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "按需求选礼",
				obj: [[1,2,3,4,5,6], [222,333,444,7777,8888]],
				// content: [
				// 	{
				// 		title: "分类",
				// 		list: ["分类0", "分类1", "分类2", "分类3"],
				// 		index: -1
				// 	},
				// 	{
				// 		title: "价位",
				// 		list: ["10 - 20", "10 - 201", "10 - 202", "800 - 3000"],
				// 		index: -1
				// 	},
				// 	{
				// 		title: "价位",
				// 		list: ["10 - 20", "10 - 201", "10 - 202", "5000 - 10000"],
				// 		index: -1
				// 	}
				// ],
				index: -1
			}
		},
		methods: {
			pickerClick:function(index){
				if(this.index == index){
					this.index = -1;
				}else{
					this.index = index;
				}
			},
			picker:function(listIndex,pickerIndex){
				this.content[pickerIndex].index= listIndex;
			}
		},
		computed:{
			content:function(){
				let content = [];
				this.obj.forEach((item, index)=>{
					content.push({
						title: item[0],
						list: item,
						index: -1
					});
				})
				return content;
			}
		}
	}
</script>

<style scope>
.own-picker-box{
	position: relative;
}
/* 标题 */
.own-picker-title{
	font-size: 1.5em;
	line-height: 2em;
	text-align: center;
	color: #333333;
}
/* 选项卡 */
.own-picker-content{
	padding: 8rpx 0rpx;
	display: flex;
	justify-content: space-around;
}
.own-picker-item{
	border-radius: 50rpx;
	padding: 16rpx 28rpx;
	background-color: #FFF;
	text-align: center;
}
.own-picker-item-title{
	display: inline-block;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	max-width: 165rpx;
	min-width: 42rpx;
}
.own-picker-item-ul{
	left: 0;
	top: 160rpx;
	width: 100%;
    position: absolute;
    background: #FFFFFF;
}
.own-picker-item-li{
	width: 100%;
	height: 1.8em;
	font-size: 1.2em;
	line-height: 1.8em;
	text-align: center;
}
.own-picker-item-li text{
	margin: 0 10%;
	width: 80%;
	display: block;
	border-bottom: 1px solid #33333330;
}
.own-picker-item-li:last-of-type text{
	border-bottom: none;
}
/* 积极地 */
.own-picker-li-active{
	color: #FF0137;
}
.own-picker-enter-active, .own-picker-leave-active {
    transition: opacity 2s;
}
.own-picker-enter, .own-picker-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
</style>
