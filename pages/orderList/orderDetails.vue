<template>
	<view>
		<!-- 多份子礼包选项卡切换 -->
		<scroll-view scroll-x="true" class="logistics-number-scroll" v-if="title_length>1">
			<view class="flex">
				<view class="flex">
					<view class="logistics-number-scroll-li" v-for="(item,index) in title" :key="index">
						<view class="logistics-number-top" @click="choo" :class="[navv==index?'activee':'']" :data-id="item.id"
						 :data-index="index">礼包{{item.index}}</view>
						<view class="logistics-number-commodity margin-auto">
							<image class="img" :src="$utils.imageUrl(item.goodsinfo[0].head_img)" v-if="item.goodsinfo[0].head_img"
							 mode=""></image>
							<image class="img" src="../../static/nono.jpg" v-else mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="order-add flex-vertically" @click="goToLoistics" v-if="wuliu_info.length>0">
			<!-- 图标 -->
			<view class="order-add-img">
				<image class="img" src="../../static/add.png" mode="" style="width: 32rpx;"></image>
			</view>
			<!-- 住址信息 -->
			<view class="order-add-information" style="width: auto;">
				<view class="order-name">{{wuliu_info[0].context}}</view>
				<view class="order-address">{{wuliu_info[0].time}}</view>
			</view>
			<!-- 修改时间 -->
			<!-- 					<view class="order-time">
						<view class="order-add-edit">修改地址</view>
						<view class="order-add-time">{{timese}}</view>
					</view> -->
		</view>
		 <!-- @click="add"修改地址 -->
		<view class="order-add flex-vertically">
			<!-- 图标 -->
			<view class="order-add-img">
				<image class="img" src="../../static/add.png" mode="" style="width: 32rpx;"></image>
			</view>
			<!-- 住址信息 -->
			<view class="order-add-information" style="width: auto;">
				<view class="order-name">{{orderinfo.linkman}} {{orderinfo.linktel}}</view>
				<view class="order-address">{{orderinfo.province}} {{orderinfo.city}} {{orderinfo.county}} {{orderinfo.address}}
				</view>
			</view>
			<!-- 修改时间 -->
			<!-- 					<view class="order-time">
				<view class="order-add-edit">修改地址</view>
				<view class="order-add-time">{{timese}}</view>
			</view> -->
		</view>

		<!-- 填写地址之后状态 -->
		<view v-if="orderinfo.show==1">
			<!-- <view  v-if="orderinfo.status==0 || orderinfo.status==1 || orderinfo.status==2 || orderinfo.status==3"> -->
			<!-- 待发货  已发货 已完成 -->
			<view style="margin-bottom: 20rpx;">
				<!-- 地址 -->
				<view class="order-add flex-vertically" @click="add">
					<!-- 图标 -->
					<view class="order-add-img">
						<image class="img" src="../../static/add.png" mode="" style="width: 32rpx;"></image>
					</view>
					<!-- 住址信息 -->
					<view class="order-add-information" style="width: auto;">
						<view class="order-name">{{orderinfo.linkman}} {{orderinfo.linktel}}</view>
						<view class="order-address">{{orderinfo.province}} {{orderinfo.city}} {{orderinfo.county}} {{orderinfo.address}}
						</view>
					</view>
					<!-- 修改时间 -->
					<view class="order-time">
						<view class="order-add-edit">修改地址</view>
						<view class="order-add-time">{{timese}}</view>
					</view>
				</view>


				<!-- 包裹 -->

				<!-- 送礼人信息 -->
				<view class="order-giver-information flex-between flex-vertically">
					<!-- 头像昵称 -->
					<view class="order-giver flex">
						<image :src="$utils.imageUrl(cardbag.present_memberid_headimg)" mode=""></image>
						<view class="order-giver-name">{{cardbag.present_memberid_name}}</view>
						<view class="order-giver-text">送您的礼物</view>
					</view>
					<!-- 状态 -->
					<view class="order-giver-right" style="color:#E7A87C;" v-if="orderinfo.status ==0">未审核</view>
					<view class="order-giver-right" style="color:#E7A87C;" v-else-if="orderinfo.status ==1">待发货</view>
					<view class="order-giver-right" style="color:#E7A87C;" v-else-if="orderinfo.status ==2">已发货</view>
					<view class="order-giver-right" style="color:#E7A87C;" v-else-if="orderinfo.status ==3">已签收</view>
					<view class="order-giver-right" style="color:#E7A87C;" v-else-if="orderinfo.status ==4">异常订单</view>
					<view class="order-giver-right" style="color:#E7A87C;" v-else-if="orderinfo.status ==99">已取消</view>

				</view>

				<!-- 商品 -->
				<view class="order-stay-li flex" v-for="(item,index) in listt" :key="index" @click="details" :data-index="item.keynum">
					<view class="order-stay-img">
						<image class="img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img" mode=""></image>
						<image class="img" src="../../static/nono.jpg" v-else mode=""></image>
					</view>
					<view class="order-stay-information">
						<view class="order-stay-name">{{item.goodsname}}</view>
						<!-- <view class="order-stay-spec">规格:{{item.goodsnum}}</view> -->
						<view class="order-stay-number">数量:<span>x</span>{{item.goodsnum}}</view>
					</view>
				</view>


			</view>


			<!-- 我赠送的订单信息 -->
			<view class="order-rdetails-information  order-rdetails-information-over">
				<view class="order-rdetails-information-content">
					<view class="order-rdetails-information-title">订单信息</view>
					<view class="order-rdetails-information-li flex-vertically" v-if="orderinfo.status==0 || orderinfo.status==1 || orderinfo.status==2 || orderinfo.status==3">流水号:<span>{{cardbag.cardbag_number}}</span>
						<view class="order-rdetails-information-copy" :data-index="cardbag.cardbag_number" @click="ctrlc">复制</view>
					</view>
					<view class="order-rdetails-information-li flex-vertically" v-else>礼包号:<span>{{cardbag.cardbag_number}}</span>
						<view class="order-rdetails-information-copy" :data-index="cardbag.cardbag_number" @click="ctrlc">复制</view>
					</view>
					<view class="order-rdetails-information-li flex-vertically">创建时间:<span>{{cardbag.create_time}}</span></view>
					<view class="order-rdetails-information-li flex-vertically" v-if="status==3">有效日期:<span>{{cardbag.exchange_time}}</span></view>
					<!-- <view class="order-rdetails-information-li flex-vertically" v-if="status==3">领取说明:<span>{{cardbag.present_memberid_name}}</span></view> -->



					<view class="order-rdetails-information-li-button  flex-between" v-if="orderinfo.status==0 || orderinfo.status==1 || orderinfo.status==2 || orderinfo.status==3">
						<button style="background-color: #FFF;" class="order-rdetails-information-li-btn" open-type="contact">联系客服</button>
						<view class="order-rdetails-information-li-btn" :data-cardbag_number="orderinfo.cardbag_number" @click="logistics">查看物流</view>
					</view>

					<view class="order-rdetails-information-li-button flex-center" v-else-if="status==3">
						<button style="background-color: #FFF;" class="order-rdetails-information-li-btn" open-type="contact">联系客服</button>
					</view>


				</view>
			</view>



		</view>



		<!-- 未填写地址状态 -->
		<view v-else>
			<!-- 商品信息 -->
			<view class="order-rdetails-commodity">

				<view class="order-rdetails-commodity-content">


					<!-- 批量,定时商品 -->
					<view class="order-rdetails-commodity-li flex" v-if="title_length>1" v-for="(item,index) in listt" :key="index"
					 @click="details" :data-index="item.keynum">

						<view class="order-rdetails-commodity-img">
							<image class="img" :src="$utils.imageUrl(item.head_img)" v-if="item.head_img" mode=""></image>
							<image class="img" src="../../static/nono.jpg" v-else mode=""></image>
						</view>
						<view class="order-rdetails-commodity-introduce">
							<view class="order-rdetails-commodity-alt">{{item.goodsname}}</view>
							<view class="order-rdetails-commodity-size"></view>
							<view class="order-rdetails-commodity-number">数量:<span>x</span>{{item.goodsnum}}</view>
						</view>
						<view class="order-rdetails-commodity-right flex-wrap flex-vertically">
							<view class="order-rdetails-commodity-circular" :data-index="index" v-if="right==index">
								<view class="order-rdetails-commodity-nav" v-if="orderinfo.status ==0">待支付</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==1">待赠送</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==2">赠送中</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==3">已领取</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==4">已退款</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==5">已关闭</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==6">待发货</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==7">已发货</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==8">已完成</view>
							</view>
							<view class="order-rdetails-commodity-price" v-if="level_name =='普通会员'">¥{{item.goods_price}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='指间会员'">¥{{item.goods_price}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='plus会员'">¥{{item.goods_price}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='企业会员'">¥{{item.goods_price}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='合作伙伴'">¥{{item.goods_price}}</view>
							<view class="order-rdetails-commodity-price" v-else>¥{{item.goods_price}}</view>

						</view>
					</view>



					<!-- 直接,即时商品 -->
					<view class="order-rdetails-commodity-li flex" v-if="title_length<=1" v-for="(item,index) in list" :key="index"
					 @click="details" :data-index="item.goodsinfo.keynum">
						<view class="order-rdetails-commodity-img">
							<image class="img" :src="$utils.imageUrl(item.goodsinfo.head_img)" v-if="item.goodsinfo.head_img" mode=""></image>
							<image class="img" src="../../static/nono.jpg" v-else mode=""></image>
						</view>
						<view class="order-rdetails-commodity-introduce">
							<view class="order-rdetails-commodity-alt">{{item.goodsinfo.goodsname}}</view>
							<view class="order-rdetails-commodity-size"></view>
							<view class="order-rdetails-commodity-number">数量:<span>x</span>{{item.goodsnum}}</view>
						</view>
						<view class="order-rdetails-commodity-right flex-wrap flex-vertically">
							<view class="order-rdetails-commodity-circular" :data-index="index" v-if="right==index">
								<view class="order-rdetails-commodity-nav" v-if="orderinfo.status ==0">待审核</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==1">待发货</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==2">待收货</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==3">已签收</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==4">异常</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==5">未支付</view>
								<view class="order-rdetails-commodity-nav" v-else-if="orderinfo.status ==99">已取消</view>
							</view>
							<view class="order-rdetails-commodity-price" v-if="level_name =='普通会员'">¥{{item.goodsinfo.price_level0}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='指间会员'">¥{{item.goodsinfo.price_level1}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='plus会员'">¥{{item.goodsinfo.price_level2}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='企业会员'">¥{{item.goodsinfo.price_level3}}</view>
							<view class="order-rdetails-commodity-price" v-else-if="level_name =='合作伙伴'">¥{{item.goodsinfo.price_level4}}</view>
							<view class="order-rdetails-commodity-price" v-else>¥{{item.goods_price}}</view>

						</view>
					</view>
				</view>

			</view>

			<!-- 我赠送的订单信息 -->
			<view class="order-rdetails-information">
				<view class="order-rdetails-information-content">
					<view class="order-rdetails-information-title">订单信息</view>
					<view class="order-rdetails-information-li flex-vertically">订单号:<span>{{orderinfo.ordernumber}}</span>
						<view class="order-rdetails-information-copy" :data-index="orderinfo.ordernumber" @click="ctrlc">复制</view>
					</view>
					<view class="order-rdetails-information-li flex-vertically" v-if="orderinfo.express_num!=null">快递单号:<span>{{orderinfo.express_num}}</span>
						<view class="order-rdetails-information-copy" :data-index="orderinfo.express_num" @click="ctrlc">复制</view>
					</view>
					<view class="order-rdetails-information-li flex-vertically">配送方式:<span>{{orderinfo.delivery_type}}
							{{ orderinfo.express_name==null?"":orderinfo.express_name }}</span></view>
					<view class="order-rdetails-information-li flex-vertically">支付方式:<span>{{payinfo.paymethod}}</span></view>
					<view class="order-rdetails-information-li flex-vertically" v-if="payinfo.paybalance_zj>0">指尖币:<span>{{payinfo.paybalance_zj}}</span></view>
					<view class="order-rdetails-information-li flex-vertically" v-if="payinfo.paybalance>0">余额:<span>{{payinfo.paybalance}}</span></view>
					<view class="order-rdetails-information-li flex-vertically" v-if="payinfo.paymoney>0">微信支付:<span>{{payinfo.paymoney}}</span></view>
					<view class="order-rdetails-information-li flex-vertically" v-if="payinfo.paycoupon>0">优惠券抵扣:<span>{{payinfo.paycoupon}}</span></view>
					<view class="order-rdetails-information-li flex-vertically">创建时间:<span>{{orderinfo.add_time}}</span></view>
					<view class="order-rdetails-information-li flex-vertically">支付时间:<span>{{payinfo.paytime}}</span></view>
				</view>
			</view>
			<view class="order-add-box">
				<view class="order-add-item" v-if="orderinfo.status ==0">
					<!-- 待审核 -->
				</view>
				<view class="order-add-item" v-if="orderinfo.status ==1">
					<!-- 待发货 -->
				</view>
				<view class="order-add-item" v-if="orderinfo.status ==2">
					<!-- 待收货 -->
					<view class="order-add-item-button">
						查看物流
					</view>
				</view>
				<view class="order-add-item" v-if="">
					<!-- 已签收 -->
				</view>
				<view class="order-add-item" v-if="orderinfo.status ==4||orderinfo.status ==99||orderinfo.status ==3">
					<!-- 异常 -->
					<view class="order-add-item-button">
						重新下单
					</view>
				</view>
				<view class="order-add-item" v-else-if="orderinfo.status ==5">
					<!-- 未支付 -->
					<view class="order-add-item-button" @click="cancel">
						取消订单
					</view>
					<view class="order-add-item-button" @click="submit">
						立即支付
					</view>
				</view>
			</view>
			
			<!-- 参与人 -->
			<view class="gift-partake" v-if="status>1">
				<view class="gift-partake-content">
					<view class="gift-partake-infotmation">{{alt}}</view>
					<view class="gift-partake-li flex-between" v-for="(item,index) in partake" :key="index">
						<view class="flex gift-partake-li-left">
							<view class="gift-partake-li-portrait flex">
								<image :src="$utils.imageUrl(item.head_img)" mode=""></image>{{item.member_name}}
							</view>
						</view>
						<view class="gift-partake-li-right">{{item.goods_name}}</view>
					</view>
				</view>
			</view>

			<!-- 我购买的 待赠送时模板状态 -->
			<view v-if="status==0||status==1||status==3">
				<!-- 文字 -->
				<view class="gift-template-text" v-if="cardbag_theme.zhufu_type==0">{{cardbag_theme.zhufu_msg}}</view>
				<!-- 录音 zhufu_mp3 -->
				<!-- <view class="template-btm-information-voice" v-else-if="cardbag_theme.zhufu_type==1" @tap="mp3"><image class="img" src="../../static/luyin.jpg" mode=""></image></view> -->
				<!-- 测试 -->
				<!-- v-else-if="cardbag_theme.zhufu_type==1" -->
				<view class="template-btm-information-voice" v-else-if="cardbag_theme.zhufu_type==1">
					<!-- 小喇叭 -->
					<view class="img" @click="audioPlay" v-if="click==0">
						<image class="img" src="https://zhijianlw.com/static/web/img/luyinn.png"></image>
					</view>
					<view class="img flex" @click="audioPause" v-if="click==1">
						<image style="width:22rpx ;height:47rpx ;" src="https://zhijianlw.com/static/web/img/luyinn-left.png"></image>
						<image class="first" style="width:11rpx ;height:47rpx ;" src="https://zhijianlw.com/static/web/img/luyinn1.png"></image>
						<image class="second" style="width:8rpx ;height:47rpx ;" src="https://zhijianlw.com/static/web/img/luyinn2.png"></image>
						<image class="third" style="width:11rpx ;height:47rpx ;" src="https://zhijianlw.com/static/web/img/luyinn3.png"></image>
					</view>
					<view class="box" @click="audioPlay"></view>
					<!-- 可滑动	区域 -->
					<movable-area class="progress" :style="'width:'+w+'px'">
						<!-- 按钮 -->
						<movable-view direction="horizontal" damping="1000" @change="scroll" @touchstart="star" @touchend="to" class="progress-one"
						 :x="movable_x">
							<view class="progress-view">
								<view class="progress-circular"></view>
							</view>
						</movable-view>
					</movable-area>
					<!-- 进度条 -->
					<progress :style="'width:'+w+'px'" :percent="schedule" class="b" data-index="index" activeColor='#BABABA'
					 backgroundColor='#4E4E4E' border-radius="10" stroke-width="8" />
				</view>
				<!-- 视频 zhufu_mp4 -->
				<view style="margin: 0 auto;width:537rpx;" v-else-if="cardbag_theme.zhufu_type==2"><video class="gift-template-video"
					 :src="cardbag_theme.zhufu_mp4" controls></video></view>
			</view>


			<!-- 未支付和待赠送才可以更改模板 -->
			<view class="gift-partake-video-button flex-center" v-if="status==0||status==1">
				<!-- <view class="gift-partake-video-li">删除文件</view> -->
				<!-- <view class="gift-partake-video-li gift-partake-video-li-right" @click="again">重新编辑</view> -->
			</view>

		</view>




		<!-- 最下方按钮 -->
		<!-- 		<view class="gift-partake-index" v-if="orderinfo.status==0 || orderinfo.status==1 || orderinfo.status==2 || orderinfo.status==3">
			<view class="gift-partake-index-text" @click="$buttonClick(index)">返回首页</view>
		</view> -->

		<view class="gift-button" style="background-color:#F4F5F7;position: unset;"></view>



		<!-- 		<view class="gift-button" v-if="orderinfo.status==0 || orderinfo.status==1 || orderinfo.status==2 || orderinfo.status==3 || status == 8 || status == 4 || status == 5">
			<view class="gift-button-give-top"></view>
			<view class="gift-button-give" @click="copy">再送一份</view>
		</view>
 -->
		<view class="gift-button" v-if="status == 2">
			<!-- <view class="gift-button" v-else-if="status == 1 || status == 2 || status == 0"> -->
			<view class="gift-button-give-top"></view>
			<view class="gift-received-button flex-between">
				<view class="gift-button-give gift-received-button-give" :data-cardbag_number="cardbag.cardbag_number" :data-price="cardbag.price_discount"
				 @click="give">立即转赠</view>
			</view>
		</view>

		<view class="gift-button" v-else-if="status == 5">
			<!-- <view class="gift-button" v-else-if="status == 1 || status == 2 || status == 0"> -->
			<view class="gift-button-give-top"></view>
			<view class="flex-between">
				<view class="gift-button-give" @click="immediately" :data-index="index" :data-cardbag_number="cardbag_number">
					<form @submit="forsubmit">
						<button :data-index="index" class="order-add-item-button" :data-cardbag_number="cardbag_number"
						 form-type="submit">立即支付</button>
						 </form>
				</view>
			</view>
		</view>


		<!-- 赠送的按钮 -->
		<!-- 		<view class="gift-button" v-else>
			<view class="gift-button-give-top"></view>
			<view class="gift-received-button flex-between">
				<view class="gift-button-give gift-received-button-give" style="background-color: #E27F8C;" :data-cardbag_number="cardbag.cardbag_number"
				 @click="address">填写收货地址</view>
				<view class="gift-button-give gift-received-button-give" :data-cardbag_number="cardbag.cardbag_number" :data-price="cardbag.price_discount"
				 @click="give">立即转赠</view>
			</view>
		</view> -->

	</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	const audioCtx = uni.createAudioContext('')
	import btn from "@/common/btn.js";
	import MD5 from "../../common/md5.js";
	import drawQrcode from "../../common/weapp.qrcode.min.js";
	export default {

		data() {
			return {
				partake: [],
				list: [],
				partake: [],
				right: 0,
				// 礼包信息
				cardbag: '',
				// 参与人信息
				cardbag_in_people: '',
				// 会员等级
				level_name: '',
				price_discount: '',
				// 订单状态
				status: '',
				type: '',
				// 我购买的还是我收到的
				pay_type: '',
				// 几件礼物
				piece: '',
				alt: '',
				cardbag_theme: '',
				cardbag_number: '',
				// 进度条位置
				schedule: '0',
				// 按钮位置
				movable_x: '0',
				// 按钮移动距离
				distance: '0',
				// 总时长
				duration: '',
				// 1播放  0不播放
				stop: '1',
				// 页面宽度
				width: '',
				// 播放暂停切换
				click: 0,
				w: '',
				orderinfo: '',
				listt: [],
				timese: '无法更改',
				choose: true,
				ordernumber: '',
				Interval: '',
				showa: '',
				add_time: '',
				title_length: '0',
				title: "",
				navv: '0',
				paylog: {
					paycoupon: ''
				},
				memberid: '',
				orderinfo: {},
				wuliu_info: [],
				payinfo: {}
			}
		},
		onHide: function(e) {
			clearInterval(this.Interval);
		},
		onLoad: function(e) {
			let type=e.type
			let that = this;
			setTimeout(function(e) {
				that.showa = 1
			}, 200)

			clearInterval(this.Interval);
			console.log(e)
			let memberid = uni.getStorageSync('id')
			this.memberid = memberid;


			// 音频用到的宽度
			uni.getSystemInfo({
				success: (res) => {
					this.width = res.screenWidth,
						this.w = res.screenWidth * 0.57
				},
			})


			let arr = [];
			let title = [];
			this.level_name = uni.getStorageSync('level_name')
			let ordernumber = e.ordernumber;
			this.ordernumber = e.ordernumber;

			let data = JSON.stringify({
				memberid: memberid,
				ordernumber: ordernumber
			});
			let action = 'get_order_info';

			this.$utils.post(action, data).then(res => {
				console.log('订单详情', res)
				this.paylog = res.paylog
				this.payinfo = res.payinfo
				this.payinfo.paytime = this.$utils.formatTime(res.payinfo.paytime*1000);
				this.list = res.orderdetail;
				this.orderinfo = res.orderinfo;
				// this.orderinfo.add_time = new Date(this.orderinfo.add_time * 1000).toLocaleString();
				console.log(this.orderinfo.add_time * 1000);
				this.orderinfo.add_time = this.$utils.formatTime(this.orderinfo.add_time * 1000);
				this.wuliu_info = JSON.parse(res.orderinfo.wuliu_info);
				console.log(this.wuliu_info);
				
				var dateTime = new Date(parseInt(res.cardbag.create_time) * 1000)
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = Date.parse(now.toDateString());
				var milliseconds = now_new - dateTime;
				// 创建时间
				res.cardbag.create_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

				var dateTime = new Date(parseInt(res.cardbag.exchange_time) * 1000)
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = Date.parse(now.toDateString());
				var milliseconds = now_new - dateTime;
				// 有效时间
				res.cardbag.exchange_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;



				// 份数
				let fenshu = res.cardbag.all_details_num;
				// 商品数量
				let number = res.goods_list.length;
				// 直接玩法1  批量玩法2   定时3   即时4
				if (res.cardbag.type == 1 || res.cardbag.type == 2) {
					for (let i = 0; i < number / fenshu; i++) {
						arr.push(res.goods_list[i])
					}
					// 商品显示
					res.goods_list = arr;
					// 几个商品显示
					this.piece = arr.length;
				}


				let dataa = '{"cardbag_number":"' + e.cardbag_number + '"}';
				console.log('份数', dataa)
				let actio = 'get_cardbag_fenshu';
				this.$utils.post(actio, dataa).then(ress => {
					console.log('礼包子份数', ress.rs)




					if (ress.rs && ress.rs.length > 0) {

						// 给礼包子份数加个参数
						for (let i in ress.rs) {
							ress.rs[i].index = Number(i) + 1;
						}

						// 子礼包份数
						this.title_length = ress.rs.length;

						// 礼包商品  选项卡默认取第一个
						for (let i in ress.rs) {
							if (ress.rs[i].goodsid) {
								title.push(ress.rs[i])
							}
						}
						this.title = title;



						let merberid = uni.getStorageSync('id')
						let data = JSON.stringify({
							cardbag_number: this.cardbag_number,
							cardbag_detail_id: ress.rs[0].id,
							merberid: merberid
						})
						console.log(data)
						let action = 'get_cardbag_detail';
						this.$utils.post(action, data).then(re => {
							console.log('子礼包详情', re)




							res.goods_list[0].cardbag_number = this.cardbag_number;
							// 商品信息  批量,定时
							this.listt = re.goods_list;

							// 物流信息存在
							if (re.orderinfo) {
								// 物流单号吧  用来30分钟内修改地址
								this.ordernumber = re.orderinfo.ordernumber
								// 和礼包号绑定
								re.orderinfo.cardbag_number = this.cardbag_number;


								if (re.orderinfo.memberid != memberid) {
									re.orderinfo.memberid == ''
								}

								// 判断是不是自己领取的  物流的id和自己的id一直 显示地址
								if (re.orderinfo.memberid == re.cardbag.pay_memberid) {
									// 显示地址
									re.orderinfo.show = 1;
								} else {
									// 不显示地址
									re.orderinfo.show = 0;
								}

								// 物流信息  主要渲染地址
								console.log("最后一个物流信", re.orderinfo.wuliu_info[re.orderinfo.wuliu_info.length - 1]);
								this.orderinfo = re.orderinfo;

								// 子礼包状态码
								console.log(re.orderinfo.status)
								res.goods_list[0].status = re.orderinfo.status;
								// 创建时间
								this.add_time = re.orderinfo.add_time;
								// 如果大于30分钟不能更改,小于30分钟可以更改 
								this.down();
							}


						})
					}



				})



				// 商品信息  直接,即时
				this.list = res.goods_list;
				// 订单状态
				this.status = res.cardbag.status;
				this.type = res.cardbag.type;
				// 订单信息
				this.cardbag = res.cardbag;

				// 还剩多少份礼物         全部商品            已领取商品
				let num = res.cardbag.all_details_num - res.cardbag.receive_details_num
				if (num == 0) {
					this.alt = res.cardbag.all_details_num + '份礼物/已被领取' + res.cardbag.receive_details_num + '份/还有' + num + '份待领取'
				} else {
					this.alt = res.cardbag.all_details_num + '份礼物/已被领取' + res.cardbag.receive_details_num + '份/还有' + num + '份待领取'
				}

				// 参与人信息
				this.partake = res.cardbag_in_people;

				// 模板信息
				this.cardbag_theme = res.cardbag_theme;

				// 我购买的 0   我收到的 1
				this.pay_type = res.cardbag.pay_type;


			});

			data = '{}';
			action = 'get_payconfig';

			this.$utils.post(action, data).then(res => {
				console.log('第三方参数', res)
				this.appid = res.rs.appid;
				this.key = res.rs.key;
				this.merchantCode = res.rs.merchantCode;
				this.openid = uni.getStorageSync('openid');

				// this.appid = 'EW_N0810019757'; 
				// this.key = 'a7f802950ad9b174839391048b770253';
				// this.merchantCode = 'EW_N7058517273';
			})


		},

		onShow: function() {

			if (this.showa == 1) {
				console.log('????????????????/')
				let arr = []
				let cardbag_number = this.cardbag_number;



				console.log('刷新')


				let merberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					cardbag_number: cardbag_number,
					cardbag_detail_id: "0",
					merberid: merberid
				})
				let action = 'get_cardbag_detail';

				this.$utils.post(action, data).then(res => {
					console.log('订单详情', res)

					var dateTime = new Date(parseInt(res.cardbag.create_time) * 1000)
					var year = dateTime.getFullYear();
					var month = dateTime.getMonth() + 1;
					var day = dateTime.getDate();
					var hour = dateTime.getHours();
					var minute = dateTime.getMinutes();
					var second = dateTime.getSeconds();
					var now = new Date();
					var now_new = Date.parse(now.toDateString());
					var milliseconds = now_new - dateTime;
					res.cardbag.create_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

					var dateTime = new Date(parseInt(res.cardbag.exchange_time) * 1000)
					var year = dateTime.getFullYear();
					var month = dateTime.getMonth() + 1;
					var day = dateTime.getDate();
					var hour = dateTime.getHours();
					var minute = dateTime.getMinutes();
					var second = dateTime.getSeconds();
					var now = new Date();
					var now_new = Date.parse(now.toDateString());
					var milliseconds = now_new - dateTime;
					res.cardbag.exchange_time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;



					// 份数
					let fenshu = res.cardbag.all_details_num;
					// 商品数量
					let number = res.goods_list.length;

					// 直接玩法  批量玩法
					if (res.cardbag.type == 1 || res.cardbag.type == 2) {
						for (let i = 0; i < number / fenshu; i++) {
							arr.push(res.goods_list[i])
						}
						res.goods_list = arr;
						this.piece = arr.length;
					}


					let dataa = '{"cardbag_number":"' + this.cardbag_number + '"}';
					let actio = 'get_cardbag_fenshu';
					this.$utils.post(actio, dataa).then(ress => {
						console.log('礼包子份数', ress.rs)

						if (ress.rs.length > 0) {
							let merberid = uni.getStorageSync('id')
							let data = JSON.stringify({
								cardbag_number: this.cardbag_number,
								cardbag_detail_id: ress.rs[this.navv].id,
								merberid: merberid
							})
							console.log(data)
							let action = 'get_cardbag_detail';
							this.$utils.post(action, data).then(re => {
								console.log('子礼包详情', re)

								res.goods_list[0].cardbag_number = this.cardbag_number;
								// 商品信息
								this.listt = re.goods_list;


								if (re.orderinfo) {



									this.ordernumber = re.orderinfo.ordernumber


									re.orderinfo.cardbag_number = this.cardbag_number;

									if (re.orderinfo.memberid != this.memberid) {
										re.orderinfo.memberid == ''
									}
									if (re.orderinfo.memberid == re.cardbag.pay_memberid) {
										// 显示地址
										re.orderinfo.show = 1;
									} else {
										// 不显示地址
										re.orderinfo.show = 0;
									}
									this.orderinfo = re.orderinfo;
									console.log(re.orderinfo.status)
									res.goods_list[0].status = re.orderinfo.status;

									this.add_time = re.orderinfo.add_time;

									this.down();


								}
							})
						}






					})


					this.list = res.goods_list;

					// 订单状态
					this.status = res.cardbag.status;
					this.type = res.cardbag.type;

					// 订单信息
					this.cardbag = res.cardbag;

					let num = res.cardbag.all_details_num - res.cardbag.receive_details_num
					if (num == 0) {
						this.alt = res.cardbag.all_details_num + '份礼物/已被领取' + res.cardbag.receive_details_num + '份/还有' + num + '份待领取'
					} else {
						this.alt = res.cardbag.all_details_num + '份礼物/已被领取' + res.cardbag.receive_details_num + '份/还有' + num + '份待领取'
					}

					// 参与人信息
					this.partake = res.cardbag_in_people;

					// 模板信息
					this.cardbag_theme = res.cardbag_theme;

					// 我购买的 0   我收到的 1
					this.pay_type = res.cardbag.pay_type;


				})
			}



		},
		methods: {
			// 顶部选项卡切换
			choo: function(e) {

				this.navv = e.currentTarget.dataset.index;
				this.cardbag_detail_id = e.currentTarget.dataset.id;

				this.clear()
				let merberid = uni.getStorageSync('id')
				let data = JSON.stringify({
					cardbag_number: this.cardbag_number,
					cardbag_detail_id: e.currentTarget.dataset.id,
					merberid: merberid
				})
				console.log(data)
				let action = 'get_cardbag_detail';
				this.$utils.post(action, data).then(re => {
					console.log('子礼包详情', re)



					this.list[0].cardbag_number = this.cardbag_number;
					// 商品信息
					this.listt = re.goods_list;


					if (re.orderinfo.memberid == re.cardbag.pay_memberid) {
						// 显示地址
						re.orderinfo.show = 1;
					} else {
						// 不显示地址
						re.orderinfo.show = 0;
					}
					// 物流信息  主要渲染地址
					this.orderinfo = re.orderinfo

					if (re.orderinfo) {


						//  物流单号吧  用来30分钟内修改地址
						this.ordernumber = re.orderinfo.ordernumber

						// 子礼包上加个大礼包参数
						re.orderinfo.cardbag_number = this.cardbag_number;

						if (re.orderinfo.memberid != this.memberid) {
							re.orderinfo.memberid == ''
						}
						if (re.orderinfo.memberid == re.cardbag.pay_memberid) {
							// 显示地址
							re.orderinfo.show = 1;
						} else {
							// 不显示地址
							re.orderinfo.show = 0;
						}
						// 物流信息  主要渲染地址
						this.orderinfo = re.orderinfo;

						// 子礼包状态码
						console.log(re.orderinfo.status)
						this.list[0].status = re.orderinfo.status;

						// 创建时间
						this.add_time = re.orderinfo.add_time;
						// 如果大于30分钟不能更改,小于30分钟可以更改 
						this.down();
					}
				})
			},
			// 商品详情跳转
			details: function(e) {
				let index = e.currentTarget.dataset.index;

				uni.navigateTo({
					url: '/pages/details/details?keynum=' + index,
				})
			},
			// 礼包号复制
			ctrlc: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.setClipboardData({
					data: index,
					success: function() {
						uni.showToast({
							title: '复制成功'
						})
					}
				});
			},
			// 查看物流
			logistics: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				uni.navigateTo({
					url: '../logistics/logistics?cardbag_number=' + cardbag_number
				})
			},
			// 编辑模板	
			again: function(e) {
				uni.setStorageSync('cardbag_theme', this.cardbag_theme)

				uni.navigateTo({
					url: '../template/template?edit=' + 'on'
				})
			},
			// 赠送好友
			give: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				let price = e.currentTarget.dataset.price;
				let status = this.status;

				var data = '{"cardbag_number":"' + cardbag_number + '"}';
				var action = 'share_cardbag';
				console.log(data)
				// if(status == 2){
				//  uni.navigateTo({
				//  	url:'../success/success?cardbag_number=' + cardbag_number +'&price=' + price
				//  })
				// }else{
				this.$utils.post(action, data).then(res => {
					console.log('赠送好友', res)
					if (res.sta == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'success',
							mask: true,
							success: (res) => {
								setTimeout(function(e) {
									uni.navigateTo({
										url: '../success/success?cardbag_number=' + cardbag_number + '&price=' + price
									})
								}, 1500)
							}
						})
					}
				})
				// }

			},
			// 我收到的赠送好友
			givee: function(e) {


				var data = '{"cardbag_number":"' + this.cardbag_number + '","zhufu_theme_id":"' + this.cardbag_theme.id +
					'","memberid":"' + this.cardbag_theme.memberid + '"}';
				console.log(data)
				var action = 'save_shoudao_zhufu_theme';
				this.$utils.post(action, data).then(res => {
					console.log(res)
					if (res.sta == 1) {
						let cardbag_number = e.currentTarget.dataset.cardbag_number;
						let price = e.currentTarget.dataset.price;
						let status = this.status;

						var data = '{"cardbag_number":"' + cardbag_number + '"}';
						var action = 'share_cardbag';
						console.log(data)
						// if(status == 2){
						// 			  		  uni.navigateTo({
						// 			  		  	url:'../success/success?cardbag_number=' + cardbag_number +'&price=' + price
						// 			  		  })
						// }else{
						this.$utils.post(action, data).then(res => {
							console.log('赠送好友', res)
							if (res.sta == 1) {
								uni.showToast({
									title: res.msg,
									icon: 'success',
									mask: true,
									success: (res) => {
										setTimeout(function(e) {
											uni.navigateTo({
												url: '../success/success?cardbag_number=' + cardbag_number + '&price=' + price
											})
										}, 1500)
									}
								})
							}
						})
						// }  
					}

				})



			},
			// 填写地址
			address: function(e) {
				let cardbag_number = e.currentTarget.dataset.cardbag_number;
				uni.navigateTo({
					url: '../ordeDetails/ordeDetails?cardbag_number=' + cardbag_number
				})
			},
			// 再来一份
			copy: function(e) {
				let z = 0;
				// 礼包信息
				let cardbag = this.cardbag;
				// 商品列表
				let list = this.list;
				// 玩法 1直接 2批量 3定时 4即时
				let type = cardbag.type
				// 份数
				let fenshu = cardbag.all_details_num;


				if (type == 4) {
					fenshu = fenshu / list.length - 1;
				}


				for (let i in list) {

					z++
					this.sleep(100, list[i].id, list[i].goodsnum, fenshu, type, z, list.length)

				}

			},
			sleep: function(e, id, num, fenshu, type, z, length) {

				let memberid = uni.getStorageSync('id');
				var now = new Date();
				var exitTime = now.getTime() + e;
				while (true) {

					now = new Date();

					if (now.getTime() > exitTime) {

						var data = '{"memberid":"' + memberid + '","goodsid":"' + id + '","goodsnum":"' + num + '"}';
						var action = 'add_goods_to_giftbag';
						this.$utils.post(action, data).then(res => {
							console.log('添加购物车', res)
							if (z == length) {
								uni.navigateTo({
									url: '../shopping/shop?fenshu=' + fenshu + '&type=' + type
								})
								// uni.reLaunch({
								// 	  url:'../shopping/shop?fenshu=' + fenshu + '&type=' + type
								//  })
							}
						})
						return;
						break;
					}
				}

			},
			// 剩余时间计算
			num: function(e) {


				let that = this;

				let time = this.countdown.split(':');

				this.Interval = setInterval(function(e) {
					// console.log('执行')

					time[1]--;
					if (time[1] == -1) {
						if (time[0] != 0) {
							time[1] = 59;
							time[0]--;
						} else {
							time[1] = 0;
							time[0] = 0;
							that.choose = false;
							that.clear();

						}
					}

					let minute = time[0];
					let second = time[1];

					// 前面加个0
					if (time[0] < 10) {
						minute = '0' + time[0];
					}

					if (time[1] < 10) {
						second = '0' + time[1];
					}

					// 渲染一下
					that.timese = minute + ':' + second;

					// console.log(that.timese)

				}, 1000)



			},
			clear: function(e) {
				clearInterval(this.Interval);
			},
			down: function(e) {
				var dateTimes = new Date()
				var nowyear = dateTimes.getFullYear();
				var nowmonth = dateTimes.getMonth() + 1;
				var nowday = dateTimes.getDate();
				var nowhour = dateTimes.getHours();
				var nowminute = dateTimes.getMinutes();
				var nowsecond = dateTimes.getSeconds();




				var dateTime = new Date(parseInt(this.add_time) * 1000)
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();



				console.log(nowyear + '-' + nowmonth + '-' + nowday + ' ' + nowhour + ':' + nowminute + ':' + nowsecond)
				console.log(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second)


				// 同年
				if (nowyear - year >= 0) {
					// 同月
					if (nowmonth - month >= 0) {

						// 同日
						if (nowday - day == 0) {
							// 同时
							if (nowhour - hour == 0) {
								console.log('同日,同时', nowminute - minute)
								// 30分钟之内
								if (nowminute - minute < 30) {
									this.choose = true;
									// 秒数大
									if (nowsecond > second) {

										let now1 = (nowminute - minute) + ':' + (nowsecond - second);
										console.log('已过时间秒数大', now1);
										// 60秒-(当前秒数-创建秒数)
										let sec = 60 - (nowsecond - second)

										// 30分钟-(当前分钟-创建分钟)
										if (sec == 0) {
											this.countdown = (30 - (nowminute - minute)) + ':' + sec;
											console.log((30 - (nowminute - minute)) + ':' + sec);
											this.num();
										} else {
											this.countdown = (29 - (nowminute - minute)) + ':' + sec;
											console.log((29 - (nowminute - minute)) + ':' + sec);
											this.num();
										}

										// 秒数小
									} else if (nowsecond < second) {
										let now2 = (nowminute - minute) + ':' + (60 - second + nowsecond);
										console.log('已过时间秒数小', now2);
										// 当前秒数+(60秒-创建秒数)
										let sec1 = nowsecond + (60 - second)

										// 30分钟-(当前分钟-创建分钟)
										if (sec1 == 60) {
											this.countdown = (30 - (nowminute - minute)) + ':' + 0;
											console.log((30 - (nowminute - minute)) + ':' + 0);
											this.num();
										} else {

											this.countdown = (29 - (nowminute - minute)) + ':' + (60 - sec1);
											console.log((29 - (nowminute - minute)) + ':' + (60 - sec1))
											this.num();
										}
									} else {
										this.choose = false;
										this.timese = '无法更改'
									}
								} else {
									this.choose = false;
									this.timese = '无法更改'
								}
								// 隔一时
							} else if (nowhour - hour == 1) {
								console.log('同日,隔一时', 60 - minute + nowminute)
								if (60 - minute + nowminute < 30) {
									this.choose = true;
									// 秒数大
									if (nowsecond > second) {
										let now3 = (60 - minute + nowminute) + ':' + (nowsecond - second);
										console.log('已过时间秒数大', now3);

										// 60秒-(当前秒数-创建秒数)
										let sec2 = 60 - (nowsecond - second)

										// 30分钟-(60分钟-当前分钟+创建分钟)
										if (sec2 == 0) {

											this.countdown = (30 - (60 - minute + nowminut)) + ':' + sec2;
											console.log((30 - (60 - minute + nowminute)) + ':' + sec2);
											this.num();

										} else {

											this.countdown = (29 - (60 - minute + nowminut)) + ':' + sec2;
											console.log((29 - (60 - minute + nowminute)) + ':' + sec2);
											this.num();

										}

										// 秒数小
									} else if (nowsecond < second) {
										let now4 = (60 - minute + nowminute) + ':' + (60 - second + nowsecond);
										console.log('已过时间秒数小', now4);

										// 当前秒数+(60秒-创建秒数)
										let sec3 = nowsecond + (60 - second)

										// 30分钟-(60分钟-当前分钟+创建分钟)
										if (sec3 == 60) {

											this.countdown = (30 - (60 - minute + nowminute)) + ':' + 0;
											console.log((30 - (60 - minute + nowminute)) + ':' + 0);
											this.num();

										} else {

											this.countdown = (29 - (60 - minute + nowminute)) + ':' + (60 - sec3);
											console.log((29 - (60 - minute + nowminute)) + ':' + (60 - sec3))
											this.num();
										}

									} else {
										this.choose = false;
										this.timese = '无法更改'
									}
								} else {
									this.choose = false;
									this.timese = '无法更改'
								}
							} else {
								this.choose = false;
								this.timese = '无法更改'
							}
							// 隔一日
						} else if (nowday - day == 1) {

							console.log('同日,隔一时', 60 - minute + nowminute)
							if (60 - minute + nowminute < 30) {
								this.choose = true;
								// 秒数大
								if (nowsecond > second) {
									let now3 = (60 - minute + nowminute) + ':' + (nowsecond - second);
									console.log('已过时间秒数大', now3);

									// 60秒-(当前秒数-创建秒数)
									let sec2 = 60 - (nowsecond - second)

									// 30分钟-(60分钟-当前分钟+创建分钟)
									if (sec2 == 0) {

										this.countdown = (30 - (60 - minute + nowminut)) + ':' + sec2;
										console.log((30 - (60 - minute + nowminute)) + ':' + sec2);
										this.num();

									} else {

										this.countdown = (29 - (60 - minute + nowminut)) + ':' + sec2;
										console.log((29 - (60 - minute + nowminute)) + ':' + sec2);
										this.num();

									}

									// 秒数小
								} else if (nowsecond < second) {
									let now4 = (60 - minute + nowminute) + ':' + (60 - second + nowsecond);
									console.log('已过时间秒数小', now4);

									// 当前秒数+(60秒-创建秒数)
									let sec3 = nowsecond + (60 - second)

									// 30分钟-(60分钟-当前分钟+创建分钟)
									if (sec3 == 60) {

										this.countdown = (30 - (60 - minute + nowminute)) + ':' + 0;
										console.log((30 - (60 - minute + nowminute)) + ':' + 0);
										this.num();

									} else {

										this.countdown = (29 - (60 - minute + nowminute)) + ':' + (60 - sec3);
										console.log((29 - (60 - minute + nowminute)) + ':' + (60 - sec3))
										this.num();
									}

								} else {
									this.choose = false;
									this.timese = '无法更改'
								}
							} else {
								this.choose = false;
								this.timese = '无法更改'
							}

						} else {
							this.choose = false;
							this.timese = '无法更改'
						}
					} else {
						this.choose = false;
						this.timese = '无法更改'
					}
				} else {
					console.log('无法更改')
					this.choose = false;
					this.timese = '无法更改'
				}


			},
			// 跟改地址
			add: function(e) {
				clearInterval(this.Interval);
				console.log(this.choose)
				if (this.choose == true) {
					uni.navigateTo({
						url: '../Add/Add?ordernumber=' + this.ordernumber
					})
				} else {
					uni.showToast({
						title: '超时,无法更改',
						icon: 'none'
					})
				}
			},
			// 小程序支付
			submit: function(e) {
				let that = this;
				var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
					'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
					'g',
					'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
				];
			
				var nums = "";
			
				for (var i = 0; i < 32; i++) {
					0.
			
			
					var id = parseInt(Math.random() * 61);
			
					nums += chars[id];
			
				}
			
				this.nums = nums;
			
				this.timeStamp = new Date().getTime();
				// ordernumber = ;
				let action = 'get_buy_order_pay_info';
				let data = JSON.stringify({
					ordernumber: this.orderinfo.ordernumber
				});
				this.$utils.post(action, data).then(res => {
					console.log("获取流水号", res);
					let serial_number = res.rs.serial_number;
					// 获取ip
					uni.request({
						url: 'https://zhijianlw.com/api.php/index/getip',
						success: (res) => {
							console.log(res.data);
							let action = 'add_paylog_to_wx';
							let data = JSON.stringify({
								serial_number: serial_number,
								ip: res.data.ip,
								openid: uni.getStorageSync('openid'),
								type: 'buy_order',
							});
							this.$utils.post(action, data).then(res => {
								console.log('获取参数', res)
								var serial_number = res.rs.serial_number;
								let arr = [];
			
								const date = {
									// 合作方标识
									appId: 'appId=wx9c53a99b078435f5',
									timeStamp: 'timeStamp=' + this.timeStamp,
									nonceStr: 'nonceStr=' + this.nums,
									package: 'package=prepay_id=' + res.rs.prepay_id,
									signType: 'signType=MD5',
								}
			
								console.log('拼接前', date)
			
								for (let i in date) {
									arr.push(date[i])
								}
			
								arr.sort();
			
								let stringA = '';
			
								// 拼接字符串
								for (let i in arr) {
									if (i == arr.length - 1) {
										stringA += arr[i];
									} else {
										stringA += arr[i] + '&';
									}
								}
								// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
								let stringSignTemp = stringA + '&key=dEEHizJM4cZtBy3Dlj4gVKwHMlM32IPv';
			
								console.log('拼接后', stringSignTemp)
								let sign = MD5.hexMD5(stringSignTemp);
								console.log(sign)
			
			
								uni.hideLoading();
			
								uni.requestPayment({
									timeStamp: String(this.timeStamp),
									nonceStr: this.nums,
									package: 'prepay_id=' + res.rs.prepay_id,
									signType: 'MD5',
									paySign: sign.toUpperCase(),
									success(res) {
										uni.hideLoading();
										uni.request({
											url: 'https://zhijianlw.com/api.php/index/set_agent_cardbag',
											data: {
												serial_number: that.outTradeNo
											},
											header: {
												'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
											},
											method: 'GET',
											// 成功回调
											success: (res) => {
												console.log('微信成功回调', res)
												uni.showToast({
													title: '支付成功',
													icon: 'none'
												})
												uni.navigateTo({
													url: '../orderList/orderList'
												})
											},
										})
									},
									fail(res) {
										uni.hideLoading();
										console.log(res)
										uni.showToast({
											title: '支付失败',
											icon: 'none'
										})
										that.commodity = ''
									}
								})
							})
						}
					});
				})
			},
			xiaochengxu: function(e) {

				let index = this.index
				let that = this;
				let arr = [];

				const date = {
					// 合作方标识
					// appId: 'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}

				console.log(date)

				for (let i in date) {
					arr.push(date[i])
				}

				arr.sort();

				let stringA = '';

				// 拼接字符串
				for (let i in arr) {
					if (i == arr.length - 1) {
						stringA += arr[i];
					} else {
						stringA += arr[i] + '&';
					}

				}
				// let stringSignTemp = stringA + '&key='  + '730ed24645b1a54e82a3d2bcff63db37';
				let stringSignTemp = stringA + '&key=' + this.key;


				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)

				const datt = {

					// 合作方标识
					// appId:'appId=' + 'EW_N3213842400',
					appId: 'appId=' + this.appid,
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号   
					// merchantCode:'merchantCode=' + 'EW_N5247492162',
					merchantCode: 'merchantCode=' + this.merchantCode,
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
					notifyUrl: 'notifyUrl=' + this.notifyUrl
				}
				console.log(datt)
				let arrr = [];

				for (let i in datt) {
					arrr.push(datt[i])
				}

				arrr.sort();

				let string = '';

				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}

				}
				console.log('字符串', string)
				uni.request({
					url: 'https://api.liantuofu.com/open/precreate',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log(res.data)
						uni.hideLoading();
						wx.requestPayment({
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.payPackage,
							signType: res.data.signType,
							paySign: res.data.paySign,
							success(res) {
								// 一级页面用switchTab   二级页面用redirectTo
								wx.showModal({
									title: '微信支付',
									content: '支付成功',
									cancelText: '查看详情',
									confirmText: '立即赠送',
									success(res) {
										if (res.confirm) {
											console.log('点击立即赠送')
											that.zengsong()
										} else if (res.cancel) {
											console.log(that.cardbag_number)
											console.log('点击查看详情')
											uni.navigateTo({
												url: '../orderDetails/orderDetails?cardbag_number=' + that.cardbag_number
											})

										}

									}
								})
							},
							fail(res) {
								console.log(res)
							}
						})


					},
				})

			},
			// 播放录音
			audioPlay: function() {
				this.stop = 1;
				this.click = 1;

				let that = this;
				console.log('播放')
				innerAudioContext.src = this.cardbag_theme.zhufu_mp3
				innerAudioContext.play();

				setTimeout(() => {

					innerAudioContext.currentTime

					innerAudioContext.onTimeUpdate((res) => {
						console.log('总时长', innerAudioContext.duration)
						console.log('当前播放进度', innerAudioContext.currentTime)

						let schedule = innerAudioContext.currentTime / innerAudioContext.duration * 100;
						let x = (that.width * 0.57 - that.width * 0.57 * 0.07) * schedule / 100;
						if (this.stop == 0) {

						} else {
							this.movable_x = x;
							this.schedule = schedule;
							this.duration = innerAudioContext.duration
						}
						innerAudioContext.onEnded((res) => {
							console.log('结束', res)
							that.click = 0;
							// 按钮
							this.movable_x = that.width * 0.57;
							// 进度条
							this.schedule = 100
						})

					})
				})
			},
			// 暂停录音
			audioPause: function(e) {
				this.stop = 0;
				this.click = 0;
				console.log('暂停')
				innerAudioContext.pause()
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
			},
			// 滑动
			scroll: function(e) {
				console.log(e)
				this.distance = e.detail.x
			},
			// 按住
			star: function(e) {
				this.stop = 0;
				this.click = 0;
				console.log('暂停')
				innerAudioContext.pause()
				innerAudioContext.offTimeUpdate((res) => {
					console.log('取消监听进度条', res)
				})
			},
			// 停止
			to: function(e) {
				let that = this;
				let s = this.distance;
				let time = s / (that.width * 0.57 - that.width * 0.57 * 0.07) * 100;
				console.log('跳转位置', this.duration * time / 100)
				innerAudioContext.seek(this.duration * time / 100)
				this.schedule = time;
				this.movable_x = s;

			},
			// 返回首页 
			index: function(e) {
				clearInterval(this.Interval);
				uni.reLaunch({
					url: '../index/index'
				})
			},
			goToLoistics: function() {
				uni.navigateTo({
					url: './logistics/logistics?ordernumber=' + this.ordernumber
				})
			},
			cancel: function(){
				let data = JSON.stringify({
					memberid: this.memberid,
					ordernumber: this.ordernumber
				});
				let action = 'cancel_buy_order';
				
				this.$utils.post(action, data).then(res => {
					console.log("取消订单", res);
					if(res.sta==1){
						uni.showToast({
							title: "取消成功"
						});
						orderinfo.status = 99;
					}else{
						uni.showToast({
							title: "操作失败",
							icon: 'none'
						})
					}
				})
			},
			forsubmit: function(e) {
			
				let arr = [];
			
			
				const date = {
					// 合作方标识
					appId: 'appId=' + 'EW_N3213842400',
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + 'EW_N5247492162',
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5',
				}
			
				console.log(date)
			
				for (let i in date) {
					arr.push(date[i])
				}
			
				arr.sort();
			
				let stringA = '';
			
				// 拼接字符串
				for (let i in arr) {
					if (i == arr.length - 1) {
						stringA += arr[i];
					} else {
						stringA += arr[i] + '&';
					}
			
				}
				let stringSignTemp = stringA + '&key=' + '730ed24645b1a54e82a3d2bcff63db37';
			
			
				console.log(stringSignTemp)
				// 小写
				let sign = MD5.hexMD5(stringSignTemp);
				console.log(sign)
			
				const datt = {
					// 合作方标识
					appId: 'appId=' + 'EW_N3213842400',
					//  签名
					sign: 'sign=' + sign,
					// 随机数
					random: 'random=' + this.nums,
					// 门店编号
					merchantCode: 'merchantCode=' + 'EW_N5247492162',
					// 商户订单号
					outTradeNo: 'outTradeNo=' + this.outTradeNo,
					// 订单总金额
					totalAmount: 'totalAmount=' + this.totalAmount,
					// 支付渠道  活的
					channel: 'channel=' + 'WXPAY',
					// 支付交易类型
					tradeType: 'tradeType=' + 'MINIAPP',
					// 消费者用户标识
					openId: 'openId=' + this.openid,
					// 小程序appid
					subAppId: 'subAppId=' + 'wx9c53a99b078435f5'
				}
				console.log(datt)
				let arrr = [];
			
				for (let i in datt) {
					arrr.push(datt[i])
				}
			
				arrr.sort();
			
				let string = '';
			
				// 拼接字符串
				for (let i in arrr) {
					if (i == arrr.length - 1) {
						string += arrr[i];
					} else {
						string += arrr[i] + '&';
					}
			
				}
				console.log('字符串', string)
			
			
				uni.request({
					url: 'https://api.liantuofu.com/open/precreate',
					data: string,
					header: {
						'content-type': "application/x-www-form-urlencoded" //自定义请求头信息
					},
					method: 'POST',
					// 成功回调
					success: (res) => {
						console.log(res.data)
					},
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F4F5F7;
	}

	.gift-partake {
		border-radius: 20rpx;
		margin: 49rpx auto 53rpx auto;
	}

	.gift-button {
		height: 164rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.gift-button-give-top {
		height: 41rpx;
	}

	.order-rdetails-information-li-button {
		margin: 0 auto;
	}

	.order-rdetails-commodity-alt{
		padding: 0rpx;
		margin: 18rpx 0 20rpx 0;
	}
	.gift-partake-li-portrait image {
		border-radius: 50%;
	}

	.template-btm-information-voice {
		width: 491rpx;
		height: 47rpx;
		margin: 117rpx auto 185rpx auto;
		display: flex;
		position: relative;
	}

	.template-btm-information-voice .img {
		width: 51rpx;
		height: 47rpx;
		margin-right: 10rpx;
	}

	.progress {
		height: 47rpx;
		position: absolute;
		right: 5rpx;
	}

	.progress-one {
		width: 34rpx;
		height: 47rpx;
	}

	.progress-view {
		margin-top: 7rpx;
		width: 34rpx;
		height: 34rpx;
		background: #CAD1D2;
		border-radius: 50%;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.progress-circular {
		width: 24rpx;
		height: 24rpx;
		border: 2rpx solid #BDBDBD;
		border-radius: 50%;
		background-image: linear-gradient(#EFEFEF, #E6E6E6, #C6C6C6, #A1A1A1);
	}

	.activee {
		border-bottom: 5rpx solid #DB2528;
	}

	.box {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: -48rpx;
		top: -23rpx;

	}

	.first {

		animation: fadeInOut 1s infinite 0.2s;
	}

	.second {

		animation: fadeInOut 1s infinite 0.4s;
	}

	.third {

		animation: fadeInOut 1s infinite 0.6s;
	}

	.order-add-item {
		display: flex;
		justify-content: center;
		height: 56rpx;
	}

	.order-add-item-button {
		width: 143rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		border-radius: 26rpx;
		border: #FF0137 1rpx solid;
		color: #FF0137;
		margin: 0rpx 28rpx;
	}
	
	.order-name {
		line-height: 1.5em;
	}
	@keyframes fadeInOut {
		0% {
			opacity: 0;
			/*初始状态 透明度为0*/
		}

		100% {
			opacity: 1;
			/*结尾状态 透明度为1*/
		}
	}
</style>
