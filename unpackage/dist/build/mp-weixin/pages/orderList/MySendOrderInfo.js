(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/MySendOrderInfo"],{"185e":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uniCountdown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(n.bind(null,"3440"))}},o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"4fd9":function(t,e,n){"use strict";(function(t){n("334b");r(n("66fd"));var e=r(n("742c"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"6cb8":function(t,e,n){"use strict";n.r(e);var r=n("edc5"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=o.a},"6ecf":function(t,e,n){"use strict";var r=n("70c9"),o=n.n(r);o.a},"70c9":function(t,e,n){},"742c":function(t,e,n){"use strict";n.r(e);var r=n("185e"),o=n("6cb8");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("6ecf");var i,u=n("f0c5"),d=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=d.exports},edc5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{value:"",nav:"20",ordernumber:"",orderSendInfo:"",countdown:"",teamEnd:!1,isSystemInfo:!1}},onLoad:function(e){var n=this;this.ordernumber=e.ordernumber,t.getSystemInfo({success:function(t){n.nav=t.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo();var r=this,o="get_order_giftgiving_info",a="order",i=t.getStorageSync("id"),u=JSON.stringify({memberid:i,ordernumber:this.ordernumber});this.$utils.postNew(o,u,a).then((function(t){1==t.sta&&(r.orderSendInfo=t.rs,5==r.orderSendInfo.orderinfo.status?t.rs.wait_pay_time&&r.getCountdown(t.rs.wait_pay_time):2==r.orderSendInfo.orderinfo.status&&t.rs.wait_pay_time&&r.getCountdown(t.rs.wait_pay_time))}))},methods:{goToDetails:function(e){t.navigateTo({url:"../details/details?keynum="+e})},getCountdown:function(t){var e=this;t<=0||e.setTime(t)},setTime:function(t){var e=this;if(!(t<=0)){var n=0,r=0,o=0,a=0;n=Math.floor(t/86400),r=Math.floor(t/3600)-24*n,o=Math.floor(t/60)-24*n*60-60*r,a=Math.floor(t)-24*n*60*60-60*r*60-60*o,n<=9&&(n="0"+n),r<=9&&(r="0"+r),o<=9&&(o="0"+o),a<=9&&(a="0"+a);var i={day:n,hour:r,minute:o,second:a};e.countdown=i}},backbutton:function(e){t.navigateBack({delta:1})},copy:function(e){var n=e.currentTarget.dataset.ordernumber;t.setClipboardData({data:n,success:function(e){t.showToast({title:"复制成功"})}})},goConversionDetails:function(e){var n=e.currentTarget.dataset.ordernumber;t.navigateTo({url:"../index-coupon/ConversionDetails?cardbag="+n+"&cardbag_detail_id=0&cardbag_number="+n})},cancel:function(e){var n=this,r=t.getStorageSync("id"),o=e.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:r,ordernumber:o}),i="cancel_buy_order";this.$utils.post(i,a).then((function(e){if(console.log("取消订单",e),1==e.sta){t.showToast({title:"取消成功"});var r="get_order_giftgiving_info",o="order",a=t.getStorageSync("id"),i=JSON.stringify({memberid:a,ordernumber:n.ordernumber});n.$utils.postNew(r,i,o).then((function(t){1==t.sta&&(n.orderSendInfo=t.rs,5==n.orderSendInfo.orderinfo.status?t.rs.wait_pay_time&&n.getCountdown(t.rs.wait_pay_time):2==n.orderSendInfo.orderinfo.status&&t.rs.wait_pay_time&&n.getCountdown(t.rs.wait_pay_time))}))}else t.showToast({title:"操作失败",icon:"none"})}))},submit:function(t){var e=this,n=t.currentTarget.dataset.ordernumber,r="get_buy_order_pay_info",o=JSON.stringify({ordernumber:n});console.log(o),this.$utils.post(r,o).then((function(t){e.$utils.wxPay(t.rs.serial_number,"buy_order")}))},ApplyRefund:function(e){var n=e.currentTarget.dataset.ordernumber,r=e.currentTarget.dataset.typerefund,o=e.currentTarget.dataset.goodslength,a=e.currentTarget.dataset.detailid;o>1?t.navigateTo({url:"../../pagesub/Refund/ExchangeGoods?ordernumber=".concat(n,"&typerefund=").concat(r)}):t.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(a)})},PresentNow:function(e){var n=e.currentTarget.dataset.ordernumber;t.navigateTo({url:"../shopping/succes?cardbag_number="+n})},GiveitAgain:function(e){var n=e.currentTarget.dataset.ordernumber,r="order_add_shopping_cart",o=t.getStorageSync("id"),a="order",i=JSON.stringify({ordernumber:n,memberid:o});this.$utils.postNew(r,i,a).then((function(e){1==e.sta&&t.reLaunch({url:"../shopping/shopping?type=0"})}))},ApplyInvoice:function(e){var n=e.currentTarget.dataset.ordernumber;t.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+n})},ApplyInfo:function(e){var n=e.currentTarget.dataset.ordernumber;t.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(n,"&types=1")})}}};e.default=n}).call(this,n("543d")["default"])}},[["4fd9","common/runtime","common/vendor"]]]);