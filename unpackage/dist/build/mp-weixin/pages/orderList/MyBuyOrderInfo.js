(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/MyBuyOrderInfo"],{"16b0":function(e,t,n){"use strict";(function(e){n("334b");r(n("66fd"));var t=r(n("e7b8"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"4df1":function(e,t,n){},6199:function(e,t,n){"use strict";var r=n("4df1"),o=n.n(r);o.a},db5a:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniCountdown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(n.bind(null,"3440"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},e7b8:function(e,t,n){"use strict";n.r(t);var r=n("db5a"),o=n("f756");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("6199");var u,i=n("f0c5"),s=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);t["default"]=s.exports},f756:function(e,t,n){"use strict";n.r(t);var r=n("fc1c"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},fc1c:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{value:"",nav:"20",ordernumber:"",orderBuyInfo:"",countdown:"",isSystemInfo:!1}},onLoad:function(t){var n=this;this.ordernumber=t.ordernumber,e.getSystemInfo({success:function(e){n.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo()},onShow:function(){var t=this,n="get_order_buy_info",r="order",o=e.getStorageSync("id"),a=JSON.stringify({memberid:o,ordernumber:this.ordernumber});this.$utils.postNew(n,a,r).then((function(e){1==e.sta&&(t.orderBuyInfo=e.rs,5==t.orderBuyInfo.orderinfo.status&&e.rs.orderinfo.wait_pay_time&&t.getCountdown(e.rs.orderinfo.wait_pay_time))}))},methods:{goToDetails:function(t){e.navigateTo({url:"../details/details?keynum="+t})},getCountdown:function(e){var t=this;e<=0||t.setTime(e)},setTime:function(e){var t=this;if(!(e<=0)){var n=0,r=0,o=0,a=0;n=Math.floor(e/86400),r=Math.floor(e/3600)-24*n,o=Math.floor(e/60)-24*n*60-60*r,a=Math.floor(e)-24*n*60*60-60*r*60-60*o,n<=9&&(n="0"+n),r<=9&&(r="0"+r),o<=9&&(o="0"+o),a<=9&&(a="0"+a);var u={day:n,hour:r,minute:o,second:a};t.countdown=u}},backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var n=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:n,success:function(t){e.showToast({title:"复制成功"})}})},logisticInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/LogisticsInfo?ordernumber="+n})},ApplyRefund:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,o=t.currentTarget.dataset.goodslength,a=t.currentTarget.dataset.detailid;o>1?e.navigateTo({url:"../../pagesub/Refund/ExchangeGoods?ordernumber=".concat(n,"&typerefund=").concat(r)}):e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(a)})},RefundInfo:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,o=t.currentTarget.dataset.detailid;e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(o)})},cancel:function(t){var n=this,r=e.getStorageSync("id"),o=t.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:r,ordernumber:o}),u="cancel_buy_order";this.$utils.post(u,a).then((function(t){if(console.log("取消订单",t),1==t.sta){e.showToast({title:"取消成功"});var r="get_order_buy_info",o="order",a=e.getStorageSync("id"),u=JSON.stringify({memberid:a,ordernumber:n.ordernumber});n.$utils.postNew(r,u,o).then((function(e){1==e.sta&&(n.orderBuyInfo=e.rs,5==n.orderBuyInfo.orderinfo.status&&e.rs.orderinfo.wait_pay_time&&n.getCountdown(e.rs.orderinfo.wait_pay_time))}))}else e.showToast({title:"操作失败",icon:"none"})}))},submit:function(t){var n=this,r=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"],success:function(t){var n="add_wx_subscribe_log",o="subscribe",a=e.getStorageSync("id"),u=JSON.stringify({memberid:a,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,KJaeMwRJkgFsPDzIv0zc2JCUDWyMlaIu-z5WhCVR_GE,hc4lSJBWenqNrQ5hqaRLU4n2E-mRBTvxl42aW_25yRs"});r.$utils.postNew(n,u,o).then((function(e){e.sta}))},fail:function(e){}});var o=t.currentTarget.dataset.ordernumber,a="get_buy_order_pay_info",u=JSON.stringify({ordernumber:o});console.log(u),this.$utils.post(a,u).then((function(e){n.$utils.wxPay(e.rs.serial_number,"buy_order")}))},ApplyInvoice:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+n})},ApplyInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(n,"&types=1")})},RefundAfterSale:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(n,"&isreception=0")})},againProduct:function(t){var n=t.currentTarget.dataset.ordernumber,r="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",u=JSON.stringify({ordernumber:n,memberid:o});this.$utils.postNew(r,u,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))}}};t.default=n}).call(this,n("543d")["default"])}},[["16b0","common/runtime","common/vendor"]]]);