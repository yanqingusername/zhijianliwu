(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/MySendOrderInfo"],{"4fd9":function(e,t,n){"use strict";(function(e){n("334b");r(n("66fd"));var t=r(n("742c"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6cb8":function(e,t,n){"use strict";n.r(t);var r=n("edc5"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},"6ecf":function(e,t,n){"use strict";var r=n("70c9"),o=n.n(r);o.a},"70c9":function(e,t,n){},"742c":function(e,t,n){"use strict";n.r(t);var r=n("aab2"),o=n("6cb8");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("6ecf");var i,u=n("f0c5"),d=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=d.exports},aab2:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniCountdown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(n.bind(null,"3440"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},edc5:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{value:"",nav:"20",ordernumber:"",orderSendInfo:"",countdown:"",teamEnd:!1,isSystemInfo:!1}},onLoad:function(t){var n=this;this.ordernumber=t.ordernumber,e.getSystemInfo({success:function(e){n.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo()},onShow:function(){var t=this,n="get_order_giftgiving_info",r="order",o=e.getStorageSync("id"),a=JSON.stringify({memberid:o,ordernumber:this.ordernumber});this.$utils.postNew(n,a,r).then((function(e){1==e.sta&&(t.orderSendInfo=e.rs,5==t.orderSendInfo.orderinfo.status?e.rs.wait_pay_time&&t.getCountdown(e.rs.wait_pay_time):2==t.orderSendInfo.orderinfo.status&&e.rs.wait_pay_time&&t.getCountdown(e.rs.wait_pay_time))}))},methods:{goToDetails:function(t){e.navigateTo({url:"../details/details?keynum="+t})},getCountdown:function(e){var t=this;e<=0||t.setTime(e)},setTime:function(e){var t=this;if(!(e<=0)){var n=0,r=0,o=0,a=0;n=Math.floor(e/86400),r=Math.floor(e/3600)-24*n,o=Math.floor(e/60)-24*n*60-60*r,a=Math.floor(e)-24*n*60*60-60*r*60-60*o,n<=9&&(n="0"+n),r<=9&&(r="0"+r),o<=9&&(o="0"+o),a<=9&&(a="0"+a);var i={day:n,hour:r,minute:o,second:a};t.countdown=i}},backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var n=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:n,success:function(t){e.showToast({title:"复制成功"})}})},goConversionDetails:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../index-coupon/ConversionDetails?cardbag="+n+"&cardbag_detail_id=0&cardbag_number="+n})},cancel:function(t){var n=this,r=e.getStorageSync("id"),o=t.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:r,ordernumber:o}),i="cancel_buy_order";this.$utils.post(i,a).then((function(t){if(console.log("取消订单",t),1==t.sta){e.showToast({title:"取消成功"});var r="get_order_giftgiving_info",o="order",a=e.getStorageSync("id"),i=JSON.stringify({memberid:a,ordernumber:n.ordernumber});n.$utils.postNew(r,i,o).then((function(e){1==e.sta&&(n.orderSendInfo=e.rs,5==n.orderSendInfo.orderinfo.status?e.rs.wait_pay_time&&n.getCountdown(e.rs.wait_pay_time):2==n.orderSendInfo.orderinfo.status&&e.rs.wait_pay_time&&n.getCountdown(e.rs.wait_pay_time))}))}else e.showToast({title:"操作失败",icon:"none"})}))},submit:function(t){var n=this,r=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE","hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(t){var n="add_wx_subscribe_log",o="subscribe",a=e.getStorageSync("id"),i=JSON.stringify({memberid:a,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});r.$utils.postNew(n,i,o).then((function(e){e.sta}))},fail:function(e){}});var o=t.currentTarget.dataset.ordernumber,a="get_buy_order_pay_info",i=JSON.stringify({ordernumber:o});console.log(i),this.$utils.post(a,i).then((function(e){n.$utils.wxPay(e.rs.serial_number,"buy_order")}))},RefundInfo:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,o=(t.currentTarget.dataset.detailid,[]);for(var a in this.orderSendInfo.orderdetail)o.push(this.orderSendInfo.orderdetail[a].id);var i=o.join(",");e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(i)})},ApplyRefund:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,o=(t.currentTarget.dataset.goodslength,t.currentTarget.dataset.detailid,t.currentTarget.dataset.orderdetail),a=t.currentTarget.dataset.isrefundprice,i=[];for(var u in o)i.push(o[u].id);var d=i.join(",");0==a?e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(d)}):e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(d)})},PresentNow:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/succes?cardbag_number="+n})},GiveitAgain:function(t){var n=t.currentTarget.dataset.ordernumber,r="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",i=JSON.stringify({ordernumber:n,memberid:o});this.$utils.postNew(r,i,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},ApplyInvoice:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+n})},ApplyInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(n,"&types=1")})}}};t.default=n}).call(this,n("543d")["default"])}},[["4fd9","common/runtime","common/vendor"]]]);