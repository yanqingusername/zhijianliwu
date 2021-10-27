<template>
	<view style="display: flex;flex-direction: column;">
		
		<!--座位示例图  -->
		<view class="seatDemosBack" v-if="loadComplete">
			<view class="seatDemos">
				<block v-for="(seatTypeItem, index) in seatTypeList" :key="index">
					<view class="seatDemo" v-if="seatTypeItem.isShow==='1' && seatTypeItem.position==='up'">
						<image class="seatDemoItem" mode="widthFix" :src="seatTypeItem.icon"></image>
						<view class="seatDemoItem"> {{seatTypeItem.name}}</view>
					</view>
				</block>
			</view>
		</view>
		<!--以下是座位图区域  -->
		<!-- 这里官方有个bug https://developers.weixin.qq.com/community/develop/doc/82f5ab098a15982c89076af83e3631a1 -->
		<!-- bindscale="handleScale" bindchange="handleChange" bindtouchstart="handleMoveStart" bindtouchend='handleMoveEnd' -->
		<movable-area scale-area="true" class="defaultArea" :style="'height:'+ seatArea + 'px; width: 750rpx;margin-top:20rpx;'">
			<movable-view class='movableOne' bindscale="handleScale" :style="'height'+seatArea+'px; width: 750rpx;'"
				scale="true" direction="all" scale-max="2" scale-min="1" out-of-bounds="true">
				<view class='seatArea'
					:style="'width:'+(seatScaleHeight * maxX)+ 'px;height:'+(seatScaleHeight * maxY)+ 'px'">
					<!--中轴线  -->
					<view class='alignLine'></view>
					<view class='hallName'>
						<text>{{hallName}}</text>
					</view>
					<view v-for="(item, index) in seatList" :key="id" class='seatTap' @click.stop='clickSeat'
						:data-index='index'
						:style="'left:'+((item.gCol-1)* seatScaleHeight)+'px;top:'+((item.gRow-1) * seatScaleHeight)+'px;width:'+seatScaleHeight+'px;height:'+seatScaleHeight+'px'">
						<image :src="item.nowIcon" class='normal' />
					</view>
				</view>
			</movable-view>
		</movable-area>
		<!--下部分座位示例图  -->
		<!-- 用户选中的座位详情 -->
		<view class="css-bottom">
			<view class="css-bottom-1">
				<view class="css-bottom-1-1">
					<view class="css-bottom-1-1-1">失控玩家</view>
					<view class="css-bottom-1-1-2"><view class="css-bottom-1-1-2-1">切换场次</view><image class="css-bottom-1-1-2-2" src="https://zhijianlw.com/static/web/img/icon_css_back_2021_10_23.png"></image></view>
				</view>
				<view class="css-bottom-1-1-2" style="margin-top: 16rpx;"><view class="css-bottom-1-2">今天</view><view class="css-bottom-1-3">09月22日 17:20-19:15 英语 3D</view></view>
			</view>
			<view class='selectSeatInfo' style="padding-left: 26rpx;padding-right: 26rpx;" v-if="hidden!='hidden'">
				<scroll-view class="scrollSeat" scroll-x="true">
					<view style="display: flex;">
					<!-- 普通座位 -->
						<view class='scrollItem'v-for="(selectedSeatItem, index) in selectedSeat" :key="index" @click='clickSeat' :data-index='selectedSeatItem.orgIndex'>
							<view class='scrollTextTop'>
								{{selectedSeatItem.row}}排{{selectedSeatItem.col}}座
							</view>
							<view class='scrollTextBottom'>
								￥{{selectedSeatItem.price}}
							</view>
							<image src="https://zhijianlw.com/static/web/img/icon_css_close_2021_10_23.png"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 快速选座 -->
			<view class='selectSeatInfo' v-if="hidden=='hidden'">
				<scroll-view class="scrollSeat" scroll-x="true">
					<view class='quickItem' @click='quickSeat' data-num='1'>
						1人座
					</view>
					<view class='quickItem' @click='quickSeat' data-num='2'>
						2人座
					</view>
					<view class='quickItem' @click='quickSeat' data-num='3'>
						3人座
					</view>
					<view class='quickItem' @click='quickSeat' data-num='4'>
						4人座
					</view>
				</scroll-view>
			</view>
			<!-- 以下是确认选座 -->
			<view class='css-bottom-comfirm'>
				<view class='css-bottom-comfirm-1' @click='confirmHandle'>{{totalPrice}}元 确认选座</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seatList: [],
				selectedSeat: [],
				hallName: undefined,
				scaleValue: 1,
				hidden: "hidden",
				maxSelect: 6,
				totalPrice: 0,
				loadComplete: false,
				timer: null,
				seatArea: '',
				seatScaleHeight: '',
				maxX: '',
				maxY: '',
				seatTypeList: [],
				json: {
					"errorCode": 0,
					"errorMsg": "",
					"name": "4号厅",
					"seatList": [{
							"id": "16879097",
							"row": "1",
							"col": "1",
							"gRow": 1,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879101",
							"row": "1",
							"col": "4",
							"gRow": 1,
							"gCol": 8,
							"type": "0-2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879104",
							"row": "1",
							"col": "7",
							"gRow": 1,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879099",
							"row": "1",
							"col": "2",
							"gRow": 1,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879102",
							"row": "1",
							"col": "5",
							"gRow": 1,
							"gCol": 9,
							"type": "0-2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879105",
							"row": "1",
							"col": "8",
							"gRow": 1,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879100",
							"row": "1",
							"col": "3",
							"gRow": 1,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879103",
							"row": "1",
							"col": "6",
							"gRow": 1,
							"gCol": 10,
							"type": "0-2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879107",
							"row": "1",
							"col": "9",
							"gRow": 1,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879113",
							"row": "2",
							"col": "1",
							"gRow": 2,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879117",
							"row": "2",
							"col": "4",
							"gRow": 2,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879120",
							"row": "2",
							"col": "7",
							"gRow": 2,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879124",
							"row": "2",
							"col": "10",
							"gRow": 2,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879114",
							"row": "2",
							"col": "2",
							"gRow": 2,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879118",
							"row": "2",
							"col": "5",
							"gRow": 2,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879121",
							"row": "2",
							"col": "8",
							"gRow": 2,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879125",
							"row": "2",
							"col": "11",
							"gRow": 2,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879116",
							"row": "2",
							"col": "3",
							"gRow": 2,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879119",
							"row": "2",
							"col": "6",
							"gRow": 2,
							"gCol": 9,
							"type": "0-3",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879122",
							"row": "2",
							"col": "9",
							"gRow": 2,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879142",
							"row": "3",
							"col": "13",
							"gRow": 3,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879129",
							"row": "3",
							"col": "2",
							"gRow": 3,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879133",
							"row": "3",
							"col": "5",
							"gRow": 3,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879136",
							"row": "3",
							"col": "8",
							"gRow": 3,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879139",
							"row": "3",
							"col": "11",
							"gRow": 3,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879143",
							"row": "3",
							"col": "14",
							"gRow": 3,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879130",
							"row": "3",
							"col": "3",
							"gRow": 3,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879134",
							"row": "3",
							"col": "6",
							"gRow": 3,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879137",
							"row": "3",
							"col": "9",
							"gRow": 3,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879141",
							"row": "3",
							"col": "12",
							"gRow": 3,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879144",
							"row": "3",
							"col": "15",
							"gRow": 3,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879128",
							"row": "3",
							"col": "1",
							"gRow": 3,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879131",
							"row": "3",
							"col": "4",
							"gRow": 3,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879135",
							"row": "3",
							"col": "7",
							"gRow": 3,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879138",
							"row": "3",
							"col": "10",
							"gRow": 3,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879154",
							"row": "4",
							"col": "9",
							"gRow": 4,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879145",
							"row": "4",
							"col": "1",
							"gRow": 4,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879158",
							"row": "4",
							"col": "12",
							"gRow": 4,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879148",
							"row": "4",
							"col": "4",
							"gRow": 4,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879161",
							"row": "4",
							"col": "15",
							"gRow": 4,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879152",
							"row": "4",
							"col": "7",
							"gRow": 4,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879155",
							"row": "4",
							"col": "10",
							"gRow": 4,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879146",
							"row": "4",
							"col": "2",
							"gRow": 4,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879159",
							"row": "4",
							"col": "13",
							"gRow": 4,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879150",
							"row": "4",
							"col": "5",
							"gRow": 4,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879153",
							"row": "4",
							"col": "8",
							"gRow": 4,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879156",
							"row": "4",
							"col": "11",
							"gRow": 4,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879147",
							"row": "4",
							"col": "3",
							"gRow": 4,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879160",
							"row": "4",
							"col": "14",
							"gRow": 4,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879151",
							"row": "4",
							"col": "6",
							"gRow": 4,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879164",
							"row": "5",
							"col": "3",
							"gRow": 5,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879168",
							"row": "5",
							"col": "6",
							"gRow": 5,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879171",
							"row": "5",
							"col": "9",
							"gRow": 5,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879175",
							"row": "5",
							"col": "12",
							"gRow": 5,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879178",
							"row": "5",
							"col": "15",
							"gRow": 5,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879162",
							"row": "5",
							"col": "1",
							"gRow": 5,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879165",
							"row": "5",
							"col": "4",
							"gRow": 5,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879169",
							"row": "5",
							"col": "7",
							"gRow": 5,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879172",
							"row": "5",
							"col": "10",
							"gRow": 5,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879176",
							"row": "5",
							"col": "13",
							"gRow": 5,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879163",
							"row": "5",
							"col": "2",
							"gRow": 5,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879167",
							"row": "5",
							"col": "5",
							"gRow": 5,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879170",
							"row": "5",
							"col": "8",
							"gRow": 5,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879173",
							"row": "5",
							"col": "11",
							"gRow": 5,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879177",
							"row": "5",
							"col": "14",
							"gRow": 5,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879207",
							"row": "6",
							"col": "11",
							"gRow": 7,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879211",
							"row": "6",
							"col": "14",
							"gRow": 7,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879198",
							"row": "6",
							"col": "3",
							"gRow": 7,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879202",
							"row": "6",
							"col": "6",
							"gRow": 7,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879205",
							"row": "6",
							"col": "9",
							"gRow": 7,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879209",
							"row": "6",
							"col": "12",
							"gRow": 7,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879212",
							"row": "6",
							"col": "15",
							"gRow": 7,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879196",
							"row": "6",
							"col": "1",
							"gRow": 7,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879199",
							"row": "6",
							"col": "4",
							"gRow": 7,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879203",
							"row": "6",
							"col": "7",
							"gRow": 7,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879206",
							"row": "6",
							"col": "10",
							"gRow": 7,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879210",
							"row": "6",
							"col": "13",
							"gRow": 7,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879197",
							"row": "6",
							"col": "2",
							"gRow": 7,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879201",
							"row": "6",
							"col": "5",
							"gRow": 7,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879204",
							"row": "6",
							"col": "8",
							"gRow": 7,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879220",
							"row": "7",
							"col": "7",
							"gRow": 8,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879223",
							"row": "7",
							"col": "10",
							"gRow": 8,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879214",
							"row": "7",
							"col": "2",
							"gRow": 8,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879227",
							"row": "7",
							"col": "13",
							"gRow": 8,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879218",
							"row": "7",
							"col": "5",
							"gRow": 8,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879221",
							"row": "7",
							"col": "8",
							"gRow": 8,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879224",
							"row": "7",
							"col": "11",
							"gRow": 8,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879215",
							"row": "7",
							"col": "3",
							"gRow": 8,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879228",
							"row": "7",
							"col": "14",
							"gRow": 8,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879219",
							"row": "7",
							"col": "6",
							"gRow": 8,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879222",
							"row": "7",
							"col": "9",
							"gRow": 8,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879213",
							"row": "7",
							"col": "1",
							"gRow": 8,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879226",
							"row": "7",
							"col": "12",
							"gRow": 8,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879216",
							"row": "7",
							"col": "4",
							"gRow": 8,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879229",
							"row": "7",
							"col": "15",
							"gRow": 8,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879230",
							"row": "8",
							"col": "1",
							"gRow": 9,
							"gCol": 1,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879233",
							"row": "8",
							"col": "4",
							"gRow": 9,
							"gCol": 4,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879237",
							"row": "8",
							"col": "7",
							"gRow": 9,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879240",
							"row": "8",
							"col": "10",
							"gRow": 9,
							"gCol": 11,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879244",
							"row": "8",
							"col": "13",
							"gRow": 9,
							"gCol": 15,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879231",
							"row": "8",
							"col": "2",
							"gRow": 9,
							"gCol": 2,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879235",
							"row": "8",
							"col": "5",
							"gRow": 9,
							"gCol": 6,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879238",
							"row": "8",
							"col": "8",
							"gRow": 9,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879241",
							"row": "8",
							"col": "11",
							"gRow": 9,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879245",
							"row": "8",
							"col": "14",
							"gRow": 9,
							"gCol": 16,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879232",
							"row": "8",
							"col": "3",
							"gRow": 9,
							"gCol": 3,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879236",
							"row": "8",
							"col": "6",
							"gRow": 9,
							"gCol": 7,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879239",
							"row": "8",
							"col": "9",
							"gRow": 9,
							"gCol": 10,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879243",
							"row": "8",
							"col": "12",
							"gRow": 9,
							"gCol": 14,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879246",
							"row": "8",
							"col": "15",
							"gRow": 9,
							"gCol": 17,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879256",
							"row": "9",
							"col": "9",
							"gRow": 10,
							"gCol": 10,
							"type": "1",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879260",
							"row": "9",
							"col": "12",
							"gRow": 10,
							"gCol": 14,
							"type": "1",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879263",
							"row": "9",
							"col": "15",
							"gRow": 10,
							"gCol": 17,
							"type": "2-3",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879247",
							"row": "9",
							"col": "1",
							"gRow": 10,
							"gCol": 1,
							"type": "1-2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879250",
							"row": "9",
							"col": "4",
							"gRow": 10,
							"gCol": 4,
							"type": "2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879254",
							"row": "9",
							"col": "7",
							"gRow": 10,
							"gCol": 8,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879257",
							"row": "9",
							"col": "10",
							"gRow": 10,
							"gCol": 11,
							"type": "2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879261",
							"row": "9",
							"col": "13",
							"gRow": 10,
							"gCol": 15,
							"type": "2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879248",
							"row": "9",
							"col": "2",
							"gRow": 10,
							"gCol": 2,
							"type": "2-2",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879252",
							"row": "9",
							"col": "5",
							"gRow": 10,
							"gCol": 6,
							"type": "1",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879255",
							"row": "9",
							"col": "8",
							"gRow": 10,
							"gCol": 9,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879258",
							"row": "9",
							"col": "11",
							"gRow": 10,
							"gCol": 12,
							"type": "0",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879262",
							"row": "9",
							"col": "14",
							"gRow": 10,
							"gCol": 16,
							"type": "1-3",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879249",
							"row": "9",
							"col": "3",
							"gRow": 10,
							"gCol": 3,
							"type": "1",
							"flag": "0",
							"price": "69"
						},
						{
							"id": "16879253",
							"row": "9",
							"col": "6",
							"gRow": 10,
							"gCol": 7,
							"type": "2",
							"flag": "0",
							"price": "69"
						}
					],
					"seatTypeList": [{
							"name": "可选",
							"type": "0",
							"seats": 1,
							"icon": "https://i.postimg.cc/BbbWyY5D/image.png",
							"isShow": "1",
							"position": "up"
						},
						{
							"name": "已选",
							"type": "0-1",
							"seats": 1,
							"icon": "https://i.postimg.cc/1X2dd93h/image.png",
							"isShow": "1",
							"position": "up"
						},
						{
							"name": "已售",
							"type": "0-2",
							"seats": 1,
							"icon": "https://i.postimg.cc/LXywzkds/image.png",
							"isShow": "1",
							"position": "up"
						},
						{
							"name": "维修",
							"type": "0-3",
							"seats": 1,
							"icon": "https://i.postimg.cc/BZVRbCcY/image.png",
							"isShow": "1",
							"position": "up"
						},
						{
							"name": "情侣首座可选",
							"type": "1",
							"seats": 1,
							"icon": "https://i.postimg.cc/bYVfbP8R/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣首座已选",
							"type": "1-1",
							"seats": 1,
							"icon": "https://i.postimg.cc/nrC5TsZG/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣首座已售",
							"type": "1-2",
							"seats": 1,
							"icon": "https://i.postimg.cc/8CS2DPBT/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣首座维修",
							"type": "1-3",
							"seats": 1,
							"icon": "https://i.postimg.cc/QMJRMG01/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣次座可选",
							"type": "2",
							"seats": 1,
							"icon": "https://i.postimg.cc/sxLFRYKL/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣次座已选",
							"type": "2-1",
							"seats": 1,
							"icon": "https://i.postimg.cc/nc68R1Xj/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣次座已售",
							"type": "2-2",
							"seats": 1,
							"icon": "https://i.postimg.cc/P5ZgB8D6/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣次座维修",
							"type": "2-3",
							"seats": 1,
							"icon": "https://i.postimg.cc/3Jy5FqxQ/image.png",
							"isShow": "0",
							"position": "up"
						},
						{
							"name": "情侣座",
							"type": "5",
							"seats": 2,
							"icon": "https://i.postimg.cc/85kxJK03/image.png",
							"isShow": "1",
							"position": "up"
						}
					]
				},
				showId: '',
				cinemaName: ''
			}
		},
		onLoad: function(options) {
			let that = this;
			that.showId = options.showId;
			that.cinemaName = options.cinemaName;
			uni.setNavigationBarTitle({
				title: that.cinemaName
			});
			
			uni.getSystemInfo({
				success: (res) => {
					that.seatArea = res.screenHeight - (500 * res.screenWidth / 750)
					that.rpxToPx = res.screenWidth / 750
				},
			})
			
			this.getFilmShowSeats();
		},
		onShow() {
			uni.showLoading({
				title: '加载中'
			})
			var that = this;
			//---这此替换成自己的接口请求成功后--start--
			let result = this.json;
			wx.hideLoading();
			if (result.errorCode == 0) {
				let seatList = that.prosessSeatList(result);
				that.hallName = result.name;
				that.seatList = seatList;
				that.seatTypeList = result.seatTypeList;
				that.selectedSeat = [];
				that.totalPrice = 0;
				that.hidden = "hidden";
				that.seatArea = that.seatArea;

				console.log(that.seatTypeList)

				setTimeout(function() {
					uni.hideLoading()
				}, 1000)
				//计算X和Y坐标最大值
				that.prosessMaxSeat(seatList);
				//计算左侧座位栏的数组
				that.seatToolArr()
				//按每排生成座位数组对象
				that.creatSeatMap()
				//确认最佳坐标座位
				that.creatBestSeat()
			} else {
				uni.hideLoading()
				uni.showToast({
					title: '获取座位图失败',
					icon: 'none',
					duration: 2000
				})
				setTimeout(function() {
					uni.navigateBack({
						delta: 1, // 回退前 delta(默认为1) 页面
					})
				}, 1000)
			}
			//---这此替换成自己的接口请求成功后--end--
		},
		methods: {
			getFilmShowSeats() {
				let that = this;
				let action = 'get_film_show_seats';
				let controller = 'films';
				let data = JSON.stringify({
					showId: that.showId
				})
				this.$utils.postNew(action, data, controller).then(res => {
					if (res.sta == 1) {
						
					}
				})
			},
			//解决官方bug
			handleScale: function(e) {
				if (this.timer) {
					clearTimeout(this.timer)
				}
				let timer = setTimeout(() => {
					this.seatArea = this.seatArea
				}, 200)
			},
			/**
			 * 顶级顶部返回按钮时候
			 */
			prosessSeatList: function(response) {
				let resSeatList = response.seatList
				resSeatList.forEach(element => {
					// 获取座位的类型的首字母
					let firstNumber = element.type.substr(0, 1)
					// 在原来的对象中加入两个属性  otherLoveSeatIndex 对应情侣座位的原数组下标 otherLoveSeatId  对应情侣座位的Id
					element.otherLoveSeatIndex = null
					element.otherLoveSeatId = null
					// 座位的类型的首字母为 '1' 是情侣首座 处理情侣首座位
					if (firstNumber === '1') {
						for (const index in resSeatList) {
							if (resSeatList[index].gRow === element.gRow &&
								resSeatList[index].gCol === element.gCol + 1) {
								element.otherLoveSeatIndex = index
								element.otherLoveSeatId = resSeatList[index].id
							}
						}
					}
					// 座位的类型的首字母为 '2' 是情侣次座 处理情侣次座位
					if (firstNumber === '2') {
						for (const index in resSeatList) {
							if (resSeatList[index].gRow === element.gRow &&
								resSeatList[index].gCol === element.gCol - 1) {
								element.otherLoveSeatIndex = index
								element.otherLoveSeatId = resSeatList[index].id
							}
						}
					}
					// 加载座位的图标
					let seatType = response.seatTypeList;
					for (const key in seatType) {
						// 加载每个座位的初始图标defautIcon 和 当前图标 nowIcon
						if (element.type === seatType[key].type) {
							element.nowIcon = seatType[key].icon
							element.defautIcon = seatType[key].icon
						}
						// 根据首字母找到对应的被选中图标
						if (firstNumber + '-1' === seatType[key].type) {
							element.selectedIcon = seatType[key].icon
						}
						// 根据首字母找到对应的被选中图标
						if (firstNumber + '-2' === seatType[key].type) {
							element.soldedIcon = seatType[key].icon
						}
						// 根据首字母找到对应的被选中图标
						if (firstNumber + '-3' === seatType[key].type) {
							element.fixIcon = seatType[key].icon
						}
					}
					// 如果座位是已经售出 和 维修座位 加入属性canClick 判断座位是否可以点击
					if (element.defautIcon === element.soldedIcon || element.defautIcon === element.fixIcon) {
						element.canClick = false
					} else {
						element.canClick = true
					}
				})
				return resSeatList
			},
			//计算最大座位数,生成影厅图大小
			prosessMaxSeat: function(value) {
				let seatList = value
				let maxY = 0;
				for (let i = 0; i < seatList.length; i++) {
					let tempY = seatList[i].gRow;
					if (parseInt(tempY) > parseInt(maxY)) {
						maxY = tempY;
					}
				}
				let maxX = 0;
				for (var i = 0; i < seatList.length; i++) {
					var tempX = seatList[i].gCol;
					if (parseInt(tempX) > parseInt(maxX)) {
						maxX = tempX;
					}
				}
				let seatRealWidth = parseInt(maxX) * 70 * this.rpxToPx
				let seatRealheight = parseInt(maxY) * 70 * this.rpxToPx
				let seatScale = 1;
				let seatScaleX = 1;
				let seatScaleY = 1;
				let seatAreaWidth = 630 * this.rpxToPx
				let seatAreaHeight = this.seatArea - 200 * this.rpxToPx
				if (seatRealWidth > seatAreaWidth) {
					seatScaleX = seatAreaWidth / seatRealWidth
				}
				if (seatRealheight > seatAreaHeight) {
					seatScaleY = seatAreaHeight / seatRealheight
				}
				if (seatScaleX < 1 || seatScaleY < 1) {
					seatScale = seatScaleX < seatScaleY ? seatScaleX : seatScaleY
				}
				this.maxY = parseInt(maxY)
				this.maxX = parseInt(maxX)
				this.seatScale = seatScale
				this.seatScaleHeight = seatScale * 70 * this.rpxToPx

			},
			// 座位左边栏的数组
			seatToolArr: function() {
				let seatToolArr = []
				let yMax = this.maxY
				let seatList = this.seatList
				for (let i = 1; i <= yMax; i++) {
					let el = ''
					for (let j = 0; j < seatList.length; j++) {
						if (parseInt(seatList[j].gRow) === i) {
							el = seatList[j].row
						}
					}
					seatToolArr.push(el)
				}
				this.seatToolArr = seatToolArr
			},
			back: function() {
				wx.navigateBack({
					delta: 1, // 回退前 delta(默认为1) 页面
				})
			},
			// 点击每个座位触发的函数
			clickSeat: function(event) {
				let index = event.currentTarget.dataset.index;
				if (this.seatList[index].canClick) {
					if (this.seatList[index].nowIcon === this.seatList[index].selectedIcon) {
						this.processSelected(index)
					} else {
						this.processUnSelected(index)
					}
				}
				if (this.selectedSeat.length == 0) {
					this.hidden = "hidden"
				}

				let _selectedSeatList = this.selectedSeat
				let totalPrice = 0
				for (const key in _selectedSeatList) {
					let price = parseInt(_selectedSeatList[key].price);
					totalPrice += price;
				}
				this.totalPrice = totalPrice
			},
			// 处理已选的座位
			processSelected: function(index) {
				let _selectedSeatList = this.selectedSeat
				let seatList = this.seatList
				let otherLoveSeatIndex = seatList[index].otherLoveSeatIndex
				if (otherLoveSeatIndex !== null) {
					// 如果是情侣座位
					// 改变这些座位的图标为初始图标
					seatList[index].nowIcon = seatList[index].defautIcon
					seatList[otherLoveSeatIndex].nowIcon = seatList[otherLoveSeatIndex].defautIcon
					for (const key in _selectedSeatList) {
						// 移除id一样的座位
						if (_selectedSeatList[key].id === seatList[index].id) {
							_selectedSeatList.splice(key, 1)
						}
					}
					// 移除对应情侣座位
					for (const key in _selectedSeatList) {
						if (_selectedSeatList[key].id === seatList[otherLoveSeatIndex].id) {
							_selectedSeatList.splice(key, 1)
						}
					}
				} else {
					// 改变这些座位的图标为初始图标 并 移除id一样的座位
					seatList[index].nowIcon = seatList[index].defautIcon
					for (const key in _selectedSeatList) {
						if (_selectedSeatList[key].id === seatList[index].id) {
							_selectedSeatList.splice(key, 1)
						}
					}
				}
				this.selectedSeat = _selectedSeatList,
					this.seatList = seatList
			},
			// 处理未选择的座位
			processUnSelected: function(index) {
				let _selectedSeatList = this.selectedSeat
				let seatList = this.seatList
				let otherLoveSeatIndex = seatList[index].otherLoveSeatIndex
				if (otherLoveSeatIndex !== null) {
					// 如果选中的是情侣座位 判断选择个数不大于 maxSelect
					if (_selectedSeatList.length >= this.maxSelect - 1) {
						uni.showToast({
							title: '最多只能选择' + this.maxSelect + '个座位哦~',
							icon: 'none',
							duration: 2000
						})
						return
					}
					// 改变这些座位的图标为已选择图标
					seatList[index].nowIcon = seatList[index].selectedIcon
					seatList[otherLoveSeatIndex].nowIcon = seatList[otherLoveSeatIndex].selectedIcon
					// 记录 orgIndex属性 是原seatList数组中的下标值
					seatList[index].orgIndex = index
					seatList[otherLoveSeatIndex].orgIndex = otherLoveSeatIndex
					// 把选择的座位放入到已选座位数组中
					let temp = {
						...seatList[index]
					}
					let tempLove = {
						...seatList[otherLoveSeatIndex]
					}
					_selectedSeatList.push(temp)
					_selectedSeatList.push(tempLove)
				} else {
					// 如果选中的是非情侣座位 判断选择个数不大于 maxSelect
					if (_selectedSeatList.length >= this.maxSelect) {
						uni.showToast({
							title: '最多只能选择' + this.maxSelect + '个座位哦~',
							icon: 'none',
							duration: 2000
						})
						return
					}
					// 改变这些座位的图标为已选择图标
					seatList[index].nowIcon = seatList[index].selectedIcon
					// 记录 orgIndex属性 是原seatList数组中的下标值
					seatList[index].orgIndex = index
					// 把选择的座位放入到已选座位数组中
					let temp = {
						...seatList[index]
					}
					_selectedSeatList.push(temp)
				}
				this.selectedSeat = _selectedSeatList
				this.seatList = seatList
				this.hidden = ""
			},
			confirmHandle: function() {
				let that = this
				if (that.selectedSeat.length === 0) {
					uni.showToast({
						title: '请至少选择一个座位~',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 开始计算是否留下空位 ------------ 开始
				let result = that.selectedSeat.every(function(element, index, array) {
					return that.checkSeat(element, that.selectedSeat)
				})
				// 开始计算是否留下空位 ------------ 结束
				if (!result) {
					// 如果 result 为false
					uni.showToast({
						title: '请不要留下空位~',
						icon: 'none',
						duration: 2000
					})
				} else {
					if (that.totalPrice === 0) {
						uni.showToast({
							title: '锁座失败了~,金额为0',
							icon: 'none',
							duration: 2000
						})
						return
					}
					// 允许锁座
					uni.showLoading({
						title: '加载中',
					})
					that.createOrder()
				}
			},
			// 检查每个座位是否会留下空位
			checkSeat: function(element, selectedSeat) {
				// 标准为 1.左右侧都必须保留 两格座位 + 最大顺延座位(也就是已选座位减去自身)
				// 2.靠墙和靠已售的座位一律直接通过
				const checkNum = 2 + selectedSeat.length - 1
				const gRowBasic = element.gRow
				const gColBasic = element.gCol
				let otherLoveSeatIndex = element.otherLoveSeatIndex
				if (otherLoveSeatIndex != null) {
					// 如果是情侣座 不检测
					return true
				}
				// 检查座位左侧
				let left = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '-', selectedSeat)
				// 如果左侧已经检查出是靠着过道直接 返回true
				if (left === 'special') {
					return true
				}
				// 检查座位右侧
				let right = this.checkSeatDirection(gRowBasic, gColBasic, checkNum, '+', selectedSeat)
				if (right === 'special') {
					// 无论左侧是否是什么状态 检查出右侧靠着过道直接 返回true
					return true
				} else if (right === 'normal' && left === 'normal') {
					// 如果左右两侧都有富裕的座位 返回true
					return true
				} else if (right === 'fail' || left === 'fail') {
					// 如果左右两侧都是不通过检测 返回false
					return false
				}
				return true
			},
			// 检查左右侧座位满足规则状态
			checkSeatDirection: function(gRowBasic, gColBasic, checkNum, direction, selectedSeat) {
				// 空位个数
				let emptySeat = 0
				let x = 1 // 检查位置 只允许在x的位置出现过道,已售,维修
				for (let i = 1; i <= checkNum; i++) {
					let iter // 根据 gRow gCol direction 找出检查座位左边按顺序排列的checkNum
					if (direction === '-') {
						iter = this.seatList.find(function(el) {
							return el.gRow === gRowBasic && el.gCol === gColBasic - i
						})
					} else if (direction === '+') {
						iter = this.seatList.find(function(el) {
							return el.gRow === gRowBasic && el.gCol === gColBasic + i
						})
					}
					if (x === i) {
						if (iter === undefined) {
							// 过道
							return 'special'
						}
						if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
							// 已售或者维修
							return 'special'
						}
						let checkSelect = false
						for (const index in selectedSeat) {
							if (selectedSeat[index].id === iter.id) {
								// 已选 顺延一位
								x++
								checkSelect = true
								break;
							}
						}
						if (checkSelect) {
							continue
						}
					} else {
						if (iter === undefined) {
							// 过道
							return 'fail'
						}
						if (iter.nowIcon === iter.soldedIcon ||
							iter.nowIcon === iter.fixIcon) {
							// 已售或者维修
							return 'fail'
						}
						let checkSelect = false
						for (const index in selectedSeat) {
							if (selectedSeat[index].id === iter.id) {
								return 'fail'
							}
						}
					}
					emptySeat++
					if (emptySeat >= 2) {
						return 'normal'
					}
				}
			},
			/**
			 * 点击确认选择开始生成订单
			 */
			createOrder: function() {
				let _this = this
				var seatIds = [];
				let selectSeatInfo = _this.selectedSeat;
				if (selectSeatInfo) {
					for (var i = 0; i < selectSeatInfo.length; i++) {
						seatIds.push(selectSeatInfo[i].id);
					}
				}
				//这里编写开始创建订单逻辑
				uni.showToast({
					title: '这里编写开始创建订单逻辑~',
					icon: 'none',
					duration: 2000
				})
				return
			},
			//生成最佳座位
			creatBestSeat: function() {
				// 优先左侧
				var bestX = parseInt(this.maxX / 2) + 1
				// 四舍五入  0.618为黄金分割比例
				var bestY = Math.round(this.maxY * 0.618)
				this.bestX = bestX
				this.bestY = bestY
				this.loadComplete = true
			},
			// 根据seatList 生成一个类map的对象 key值为gRow坐标 value值为gRow为key值的数组
			creatSeatMap: function() {
				let seatList = this.seatList
				var obj = {}
				for (let index in seatList) {
					let seatRowList = seatList[index].gRow
					if (seatRowList in obj) {
						// 原本数组下标
						seatList[index].orgIndex = index
						obj[seatRowList].push(seatList[index])
					} else {
						let seatArr = []
						// 原本数组下标
						seatList[index].orgIndex = index
						seatArr.push(seatList[index])
						obj[seatRowList] = seatArr
					}
				}
				this.seatMap = obj
			},
			// 快速选择座位函数
			quickSeat: function(event) {
				let value = parseInt(event.currentTarget.dataset.num);
				let _self = this
				let that = this
				// 最优座位数组 里面包含了每排的最佳座位组
				let bestSeatList = []
				let bestRowSeat
				for (let i = _self.maxY; i > 0; i--) {
					// bestRowSeat为 gRow 为 i 的的所有座位对象
					bestRowSeat = _self.seatMap[i]
					if (bestRowSeat === undefined) {
						continue
					} else {
						// 找到每排的最佳座位
						let bestSeat = that.seachBestSeatByRow(bestRowSeat, value)
						if (bestSeat != null) {
							bestSeatList.push(bestSeat)
						}
					}
				}
				if (bestSeatList.length <= 0) {
					uni.showToast({
						title: '没有合适的座位~',
						icon: 'none',
						duration: 2000
					})
					return
				}
				let bestSeatListIndex = 0
				// 递归每排的最优座位组 找出离中心点最近的最优座位组
				bestSeatList.reduce(function(prev, cur, index, arr) {
					if (Array.isArray(prev)) {
						// 取中心点离 最好坐标 绝对值
						let n = Math.abs((prev[0].gCol + prev[value - 1].gCol) / 2 - _self.bestX)
						let m = Math.abs(prev[0].gRow - _self.bestY)
						// 勾股定理
						prev = Math.sqrt(Math.pow(n, 2) + Math.pow(m, 2))
					}
					// 取中心点离 最好坐标 绝对值
					let x = Math.abs((cur[0].gCol + cur[value - 1].gCol) / 2 - _self.bestX)
					let y = Math.abs(cur[0].gRow - _self.bestY)
					// 勾股定理
					let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
					if (z >= prev) {
						return prev
					} else {
						bestSeatListIndex = index
						return z
					}
				})
				// 最佳座位中包含情侣座位
				let notEmitSeatArr = []
				// 发送选择事件
				for (const iterator of bestSeatList[bestSeatListIndex]) {
					if (iterator.otherLoveSeatId !== null) {
						let checkFor = false
						for (const item of notEmitSeatArr) {
							if (iterator.id === item) {
								// 情侣座的另外一半不发送事件
								checkFor = true
								break
							}
						}
						if (checkFor) {
							continue
						}
						notEmitSeatArr.push(iterator.otherLoveSeatId)
					}
					that.processUnSelected(iterator.orgIndex)
				}
				let _selectedSeatList = _self.selectedSeat
				let totalPrice = 0
				for (const key in _selectedSeatList) {
					let price = parseInt(_selectedSeatList[key].price);
					totalPrice += price;
				}
				this.totalPrice = totalPrice
			},
			// 找寻每排的最佳座位数组
			seachBestSeatByRow: function(rowSeatList, value) {
				let effectiveSeatLeft = []
				let effectiveSeatRight = []
				let effectiveSeatMiddle = []
				// 检查居中对齐包含最佳座位的
				effectiveSeatMiddle = this.checkSeatMiddle(rowSeatList, value)
				// 左边检查开始
				effectiveSeatLeft = this.checkSeatWithDirection(rowSeatList, value, '-')
				// 右边检查开始
				effectiveSeatRight = this.checkSeatWithDirection(rowSeatList, value, '+')
				// 如果这排中 包含最佳坐标有座位数满足 返回这批座位数组
				if (effectiveSeatMiddle.length === value) {
					return effectiveSeatMiddle
				}
				// 如果这排中 不包含最佳座位 但是左右两侧都有满足座位数 取离中心点近的方向座位数组
				if (effectiveSeatLeft.length === value && effectiveSeatRight.length === value) {
					return Math.abs(effectiveSeatLeft[0].gCol - this.bestX) > Math.abs(effectiveSeatRight[0].gCol -
						this.bestX) ? effectiveSeatRight : effectiveSeatLeft
				} else {
					// 否则 返回 左右两侧 某一侧满足的座位数组
					if (effectiveSeatLeft.length === value) {
						return effectiveSeatLeft
					}
					if (effectiveSeatRight.length === value) {
						return effectiveSeatRight
					}
					return null
				}
			},
			// 找到次排是否有快速选择座位数有效的数组 寻找的坐标为 最佳座位根据快速选择座位数 取左右两边正负座位数
			checkSeatMiddle: function(rowSeatList, value) {
				let effectiveSeat = []
				let existLoveSeat = false
				// 从负到整的值动态值
				let activeValue = value > 2 ? value - 2 : value - 1
				if (value === this.maxX) {
					activeValue = activeValue - 1
				} else if (value > this.maxX) {
					// 快速选择座位数 大于影厅横向左边值 直接返回没有有效座位
					return effectiveSeat
				}
				// 最佳座位根据快速选择座位数 取左右两边正负座位数
				for (let j = -activeValue; j <= activeValue; j++) {
					// 确认最佳座位状态
					let iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX + j))
					// 最佳座位
					if (iter === undefined) {
						break
					}
					if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
						effectiveSeat = []
						existLoveSeat = false
						continue
					} else {
						if (iter.otherLoveSeatId !== null) {
							existLoveSeat = true
						}
						effectiveSeat.push(iter)
					}
				}
				if (effectiveSeat.length > value) {
					// 最后找出居中座位数组后 由于会有已售和维修和过道的影响 在数组中 先删除后面的位置值 再删除前面位置值 直到值为value(快速选择座位数)
					for (let i = 0; i < activeValue; i++) {
						effectiveSeat.pop()
						if (effectiveSeat.length === value) {
							break
						}
						effectiveSeat.shift()
						if (effectiveSeat.length === value) {
							break
						}
					}
					//预检
					if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
						return []
					}
				} else if (effectiveSeat.length < value) {
					return []
				} else {
					//预检
					if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
						return []
					}
				}
				// 如果最近座位组中存在情侣座
				// 检查数组内情侣座必须成对出现 否则舍弃
				if (existLoveSeat) {
					if (!this.checkLoveSeatIsDouble(effectiveSeat)) {
						return []
					}
				}
				return effectiveSeat
			},
			// 找到次排是否有快速选择座位数有效的数组
			checkSeatWithDirection: function(rowSeatList, value, direction) {
				let activeValue = value
				// 最多允许过道等于3 由于某些影厅 居中的位置不是座位 存在大部分的过道 导致无法选择到最佳座位
				let roadDistance = 3
				let effectiveSeat = []
				let existLoveSeat = false
				for (let j = 0; j < activeValue; j++) {
					let iter
					if (direction === '-') {
						iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX - j))
					} else if (direction === '+') {
						iter = rowSeatList.find((el) => (parseInt(el.gCol) === this.bestX + j))
					}
					if (iter === undefined) {
						activeValue++
						roadDistance--
						if (roadDistance <= 0) {
							break
						} else {
							continue
						}
					}
					if (iter.nowIcon === iter.soldedIcon || iter.nowIcon === iter.fixIcon) {
						activeValue++
						effectiveSeat = []
						existLoveSeat = false
						continue
					} else {
						if (iter.otherLoveSeatId !== null) {
							existLoveSeat = true
						}
						effectiveSeat.push(iter)
					}
					if (effectiveSeat.length === value) {
						//预检
						if (this.preCheckSeatMakeEmpty(effectiveSeat)) {
							activeValue++
							effectiveSeat.shift()
							continue
						}
					}
				}
				// 如果最近座位组中存在情侣座
				// 检查数组内情侣座必须成对出现 否则舍弃
				if (existLoveSeat) {
					if (!this.checkLoveSeatIsDouble(effectiveSeat)) {
						return []
					}
				}
				return effectiveSeat
			},
			checkLoveSeatIsDouble: function(arr) {
				// 检查数组内必须情侣座是否对出现 否则舍弃
				var orgSet = new Set()
				var loveSeatSet = new Set()
				for (const iterator of arr) {
					orgSet.add(iterator.id)
				}
				for (const iterator of arr) {
					if (iterator.otherLoveSeatId !== null) {
						loveSeatSet.add(iterator.otherLoveSeatId)
					}
				}
				let beforelen = orgSet.size
				let afterlen = new Set([...orgSet, ...loveSeatSet]).size
				return beforelen === afterlen
			},
			//预检座位
			preCheckSeatMakeEmpty(arr) {
				let that = this
				// 开始计算是否留下空位 ------------ 开始
				let result = arr.every(function(element, index, array) {
					return that.checkSeat(element, arr)
				})
				// 开始计算是否留下空位 ------------ 结束
				return !result
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F6F6;
	}

	/*
	*上方影片名称样式
	*/

	.movieName {
		font-size: 35rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	/*
	*上方排期信息样式
	*/

	.planDetail {
		color: #aaa;
		font-size: 27rpx;
	}

	/*
	*上方影片,排期信息的父级
	*/

	.info {
		width: 100%;
		height: 80rpx;
		background: #fff;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
		padding: 30rpx 30rpx;
		position: relative;
	}

	.seatDemosBack {
		background: #F6F6F6;
		margin-top: 20rpx;
	}

	/*
	*座位样式的父级
	*/

	.seatDemos {
		color: #aaa;
		background: #F6F6F6;
		position: relative;
		margin: 0 auto;
		width: 80%;
		box-sizing: border-box;
		font-size: 25rpx;
		height: 70rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.areaSeatDemos {
		width: 100%;
		height: 80rpx;
		position: fixed;
		bottom: 100rpx;
	}

	.seatDemosScroll {
		color: #aaa;
		background: #fff;
		width: 100%;
		height: 100%;
		font-size: 25rpx;
		white-space: nowrap;
	}

	.seatDemosScrollItem {
		height: 90rpx;
		white-space: nowrap;
		overflow: hidden;
		margin-left: 15px;
		display: inline-block;
		align-items: center;
		margin-top: 25rpx;
	}

	.seatDemosScrollItem.Itemnormal image {
		margin-right: 10rpx;
		width: 40rpx;
		height: 40rpx;
		vertical-align: -30%;
	}

	/*
	*情侣座位的图片样式
	*/

	.seatDemosScrollItem.Itemlove image {
		margin: 0;
		width: 40rpx;
		height: 40rpx;
		vertical-align: -30%;
	}

	/*
	*情侣座位的字体样式
	*/

	.seatDemosScrollItem.Itemlove text {
		margin-left: 10rpx;
	}

	.seatDemo image {
		width: 45rpx;
		height: 45rpx;
	}

	/*
	*普通座位的图片样式
	*/

	.seatDemoItem {
		white-space: nowrap;
		width: 45rpx;
		display: block;
	}

	/*
	*情侣座位的图片样式
	*/

	.seatDemo {
		display: flex;
		align-items: center;
	}

	/*
	*情侣座位的字体样式
	*/

	.loveSeatDemo text {
		margin-left: 10rpx;
	}

	/*
	*影厅图上方显示影厅名字区域
	*/

	.hallName {
		width: 200rpx;
		height: 0;
		border-top: 40rpx solid #ccc;
		border-right: 20rpx solid transparent;
		border-left: 20rpx solid transparent;
		line-height: 30rpx;
		color: white;
		position: absolute;
		top: -70rpx;
		z-index: 2;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
	}

	/*
	*影厅图上方显示影厅名字区域字体样式
	*/

	.hallName text {
		font-size: 20rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -35rpx;
	}

	/*
	*所有座位的区域
	*/

	.seatArea {
		margin: 0 auto;
		font-size: 10rpx;
		position: relative;
	}

	/*
	*中轴线
	*/

	.alignLine {
		position: absolute;
		left: 50%;
		height: 100%;
		border-left: 1px dashed #aaa;
		transform: translateX(-100%);
	}

	/*
	*选座区域普通座位的图片样式
	*/

	.normal {
		position: relative;
		/* margin: 10rpx; */
		width: 100%;
		height: 100%;
	}

	/*
	*选座区域情侣座位的图片样式
	*/

	.LoveSeat {
		position: relative;
		/* margin: 10rpx 0;  */
		width: 70rpx;
		height: 70rpx;
	}

	/*
	*所有座位的图片样式下方透明可点击区域
	*/

	.seatTap {
		position: absolute;
	}

	/*
	*情侣座位的图片样式下方透明可点击区域
	*/

	.LoveSeatTap {
		position: absolute;
		top: 0;
		width: 70rpx;
		height: 70rpx;
	}

	/*
	* 座位图限制区域
	*/

	movable-area {
		background: #F6F6F6;
		overflow: hidden;
	}

	/*
	* 座位图可移动区域(座位图)
	*/

	.movableOne {
		box-sizing: border-box;
		padding: 70rpx 60rpx 100rpx;
		color: #F6F6F6;
	}

	/*
	* 座位图可移动区域(左边座位排号栏)
	*/

	.movableTwo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 1400rpx;
		width: 30rpx;
		padding: 100rpx 0;
		color: #fff;
	}

	/*
	* (左边座位排号栏整体)
	*/

	.seatTool {
		width: 30rpx;
		padding: 100rpx 0;
		opacity: 0.5;
	}

	.seatToolArea {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 50rpx;
	}

	/*
	* (左边座位排号栏每一个块)
	*/

	.seatTag {
		text-align: center;
		color: rgba(0, 0, 0, 0.5);
	}

	/*
	*页面最下方确认选座区域
	*/

	.orderComfirm {
		background: #fff;
		/* position: fixed; */
		display: flex;
		/* bottom: 0rpx; */
		width: 100%;
		line-height: 100rpx;
		/* z-index: 3; */
	}

	/*
	*页面最下方价格区域
	*/

	.orderPrice {
		text-indent: 30rpx;
		color: black;
		height: 100rpx;
		width: 60%;
	}

	/*
	*页面最下方价格字体样式
	*/

	.orderPrice text {
		color: red;
	}

	/*
	*页面最下方确认选座区域渐变色
	*/

	.comfirm {
		font-weight: 900;
		text-align: center;
		color: white;
		width: 100%;
		background: linear-gradient(to right, #C26DFE, #6F50F5);
		height: 100rpx;
	}

	/*
	*用户选中的座位区域
	*/

	.selectSeatInfo {
		background: #fff;
		/* position: fixed;
		bottom: 100rpx; */
		/* height: 80rpx; */
		/* width: 100%; */
		padding: 10rpx 0;
	}

	/*
	*用户选中的座位详情滑块
	*/

	.scrollSeat {
		height: 100rpx;
		/* white-space: nowrap; */
	}

	/*
	*每块用户选中的座位详情
	*/

	.scrollItem {
		/* border: 1rpx solid #bbb; */
		    min-width: 180rpx;
		    display: flex;
		    margin-right: 20rpx;
		    position: relative;
		    height: 100rpx;
		    background: #F6F6F6;
		    border-radius: 10rpx;
		    justify-content: center;
		    /* align-items: center; */
		    flex-direction: column;
		    padding-left: 20rpx;
	}

	/*
	* 快速选座模块
	*/

	.quickItem {
		border: 1rpx solid #bbb;
		color: #aaa;
		font-size: 28rpx;
		border-radius: 10rpx;
		width: 160rpx;
		height: 75rpx;
		line-height: 75rpx;
		text-align: center;
		display: inline-block;
		margin-left: 20rpx;
		position: relative;
	}

	/*
	*每块用户选中的座位详情上方文字
	*/

	.scrollTextTop {
		font-size: 24rpx;
		font-weight: bold;
		color: #333333;
	}

	/*
	*每块用户选中的座位详情下方文字
	*/

	.scrollTextBottom {
		font-size: 24rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 10rpx;
	}

	/*
	*每块用户选中的座位详情关闭按钮
	*/

	.scrollItem image {
		position: absolute;
		z-index: 2;
		width: 20rpx;
		height: 20rpx;
		right: 15rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.seatAreaTip {
		position: relative;
		width: 750rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 16rpx;
		color: rgba(0, 0, 0, 0.1);
		border-top: 1rpx dashed rgba(0, 0, 0, 0.1);
	}
	
	/* ==================
	          按钮
	 ==================== */
	
	.cu-btn {
	  position: relative;
	  border: 0rpx;
	  display: inline-flex;
	  align-items: center;
	  justify-content: center;
	  box-sizing: border-box;
	  padding: 0 30rpx;
	  font-size: 28rpx;
	  height: 64rpx;
	  line-height: 1;
	  text-align: center;
	  text-decoration: none;
	  overflow: visible;
	  margin-left: initial;
	  transform: translate(0rpx, 0rpx);
	  margin-right: initial;
	}
	
	.cu-btn::after {
	  display: none;
	}
	
	.cu-btn:not([class*="bg-"]) {
	  background-color: #f0f0f0;
	}
	
	.cu-btn[class*="line"] {
	  background-color: transparent;
	}
	
	.cu-btn[class*="line"]::after {
	  content: " ";
	  display: block;
	  width: 200%;
	  height: 200%;
	  position: absolute;
	  top: 0;
	  left: 0;
	  border: 1rpx solid currentColor;
	  transform: scale(0.5);
	  transform-origin: 0 0;
	  box-sizing: border-box;
	  border-radius: 12rpx;
	  z-index: 1;
	  pointer-events: none;
	}
	
	.cu-btn.round[class*="line"]::after {
	  border-radius: 1000rpx;
	}
	
	.cu-btn[class*="lines"]::after {
	  border: 6rpx solid currentColor;
	}
	
	.cu-btn[class*="bg-"]::after {
	  display: none;
	}
	
	.cu-btn.sm {
	  padding: 0 20rpx;
	  font-size: 20rpx;
	  height: 48rpx;
	}
	
	.cu-btn.lg {
	  padding: 0 40rpx;
	  font-size: 32rpx;
	  height: 80rpx;
	}
	
	.cu-btn.icon.sm {
	  width: 48rpx;
	  height: 48rpx;
	}
	
	.cu-btn.icon {
	  width: 64rpx;
	  height: 64rpx;
	  border-radius: 500rpx;
	  padding: 0;
	}
	
	.cu-btn.shadow-blur::before {
	  top: 4rpx;
	  left: 4rpx;
	  filter: blur(6rpx);
	  opacity: 0.6;
	}
	
	.cu-btn.button-hover {
	  transform: translate(1rpx, 1rpx);
	}
	
	.cu-btn.block {
	  display: flex;
	}
	
	.cu-btn[disabled] {
	  opacity: 0.6;
	  color: var(--white);
	}
	
	.bg-gradual-orange {
	  background-image: var(--gradualOrange);
	  color: var(--white);
	}
	
	.bg-gradual-pinks {
	  background-image: var(--gradualPinks);
	  color: var(--white);
	}
	
	.shadow-blur {
	  position: relative;
	}
	
	.shadow-blur::before {
	  content: "";
	  display: block;
	  background: inherit;
	  filter: blur(10rpx);
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  top: 10rpx;
	  left: 10rpx;
	  z-index: -1;
	  opacity: 0.4;
	  transform-origin: 0 0;
	  border-radius: inherit;
	  transform: scale(1, 1);
	}
	
	.round {
	  border-radius: 5000rpx;
	}
	
	.bg-red {
	  background-color: var(--red);
	  color: var(--white);
	}
	/* ==================
	          文本
	 ==================== */
	
	.text-xs {
		font-size: 20rpx;
	}
	
	.text-sm {
		font-size: 24rpx;
	}
	
	.text-df {
		font-size: 28rpx;
	}
	
	.text-lg {
		font-size: 32rpx;
	}
	
	.text-xl {
		font-size: 36rpx;
	}
	
	.text-xxl {
		font-size: 44rpx;
	}
	
	.text-sl {
		font-size: 80rpx;
	}
	
	.text-xsl {
		font-size: 120rpx;
	}
	
	.text-Abc {
		text-transform: Capitalize;
	}
	
	.text-ABC {
		text-transform: Uppercase;
	}
	
	.text-abc {
		text-transform: Lowercase;
	}
	
	.text-price::before {
		content: "¥";
		font-size: 80%;
		margin-right: 4rpx;
	}
	
	.text-cut {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.text-bold {
		font-weight: bold;
	}
	
	.text-center {
		text-align: center;
	}
	
	.text-content {
		line-height: 1.6;
	}
	
	.text-left {
		text-align: left;
	}
	
	.text-right {
		text-align: right;
	}
	
	.text-red,
	.line-red,
	.lines-red {
		color: var(--red);
	}
	
	.text-orange,
	.line-orange,
	.lines-orange {
		color: var(--orange);
	}
	
	.text-yellow,
	.line-yellow,
	.lines-yellow {
		color: var(--yellow);
	}
	
	.text-olive,
	.line-olive,
	.lines-olive {
		color: var(--olive);
	}
	
	.text-green,
	.line-green,
	.lines-green {
		color: var(--green);
	}
	
	.text-cyan,
	.line-cyan,
	.lines-cyan {
		color: var(--cyan);
	}
	
	.text-blue,
	.line-blue,
	.lines-blue {
		color: var(--blue);
	}
	
	.text-purple,
	.line-purple,
	.lines-purple {
		color: var(--purple);
	}
	
	.text-mauve,
	.line-mauve,
	.lines-mauve {
		color: var(--mauve);
	}
	
	.text-pink,
	.line-pink,
	.lines-pink {
		color: var(--pink);
	}
	
	.text-brown,
	.line-brown,
	.lines-brown {
		color: var(--brown);
	}
	
	.text-grey,
	.line-grey,
	.lines-grey {
		color: var(--grey);
	}
	
	.text-gray,
	.line-gray,
	.lines-gray {
		color: var(--gray);
	}
	
	.text-black,
	.line-black,
	.lines-black {
		color: var(--black);
	}
	
	.text-white,
	.line-white,
	.lines-white {
		color: var(--white);
	}
	/* -- 阴影 -- */
	
	.shadow[class*='white'] {
		--ShadowSize: 0 1rpx 6rpx;
	}
	
	.shadow-lg {
		--ShadowSize: 0rpx 40rpx 100rpx 0rpx;
	}
	
	.shadow-warp {
		position: relative;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
	}
	
	.shadow-warp:before,
	.shadow-warp:after {
		position: absolute;
		content: "";
		top: 20rpx;
		bottom: 30rpx;
		left: 20rpx;
		width: 50%;
		box-shadow: 0 30rpx 20rpx rgba(0, 0, 0, 0.2);
		transform: rotate(-3deg);
		z-index: -1;
	}
	
	.shadow-warp:after {
		right: 20rpx;
		left: auto;
		transform: rotate(3deg);
	}
	.text-indent{
	  text-indent: 20rpx;
	}
	.margin-left-xs {
		margin-left: 10rpx;
	}
	.about{
	  position: absolute;
	  right:80rpx;
	  top:50%;
	  transform: translateY(-50%)
	}
	
	.css-bottom{
		width: 750rpx;
		height: 394rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		position: fixed;
		display: flex;
		bottom: 0rpx;
		width: 100%;
		z-index: 3;
		flex-direction: column;
	}
	.css-bottom-1{
		padding: 26rpx 30rpx 30rpx 36rpx;
		display: flex;
		/* align-items: center; */
		flex-direction: column;
	}
	.css-bottom-1-1{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.css-bottom-1-1-1{
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
	}
	.css-bottom-1-1-2{
		display: flex;
		align-items: center;
	}
	.css-bottom-1-1-2-1{
		font-size: 24rpx;
		color: #427DE5;
	}
	.css-bottom-1-1-2-2{
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	.css-bottom-1-2{
		font-size: 24rpx;
		color: #DB3C3A;
	}
	.css-bottom-1-3{
		font-size: 24rpx;
		color: #666666;
		margin-left: 12rpx;
	}
	
	.css-bottom-comfirm{
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 18rpx;
		left: 25rpx;
	}
	.css-bottom-comfirm-1{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 700rpx;
		height: 88rpx;
		background: linear-gradient(61deg, #E96C56 0%, #ED2430 100%);
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	
</style>
