(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/MyBuyOrderInfo"],{"16b0":function(e,t,r){"use strict";(function(e){r("334b");n(r("66fd"));var t=n(r("e7b8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},"4df1":function(e,t,r){},6199:function(e,t,r){"use strict";var n=r("4df1"),o=r.n(n);o.a},add4:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var n={uniCountdown:function(){return Promise.all([r.e("common/vendor"),r.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(r.bind(null,"3440"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},e7b8:function(e,t,r){"use strict";r.r(t);var n=r("add4"),o=r("f756");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);r("6199");var u,i=r("f0c5"),d=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=d.exports},f756:function(e,t,r){"use strict";r.r(t);var n=r("fc1c"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},fc1c:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{value:"",nav:"20",ordernumber:"",orderBuyInfo:"",countdown:"",isSystemInfo:!1}},onLoad:function(t){var r=this;this.ordernumber=t.ordernumber,e.getSystemInfo({success:function(e){r.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo()},onShow:function(){var t=this,r="get_order_buy_info",n="order",o=e.getStorageSync("id"),a=JSON.stringify({memberid:o,ordernumber:this.ordernumber});this.$utils.postNew(r,a,n).then((function(e){1==e.sta&&(t.orderBuyInfo=e.rs,5==t.orderBuyInfo.orderinfo.status&&e.rs.orderinfo.wait_pay_time&&t.getCountdown(e.rs.orderinfo.wait_pay_time))}))},methods:{goToDetails:function(t){e.navigateTo({url:"../details/details?keynum="+t})},getCountdown:function(e){var t=this;e<=0||t.setTime(e)},setTime:function(e){var t=this;if(!(e<=0)){var r=0,n=0,o=0,a=0;r=Math.floor(e/86400),n=Math.floor(e/3600)-24*r,o=Math.floor(e/60)-24*r*60-60*n,a=Math.floor(e)-24*r*60*60-60*n*60-60*o,r<=9&&(r="0"+r),n<=9&&(n="0"+n),o<=9&&(o="0"+o),a<=9&&(a="0"+a);var u={day:r,hour:n,minute:o,second:a};t.countdown=u}},backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var r=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:r,success:function(t){e.showToast({title:"复制成功"})}})},logisticInfo:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/LogisticsInfo?ordernumber="+r})},ApplyRefund:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.typerefund,o=t.currentTarget.dataset.goodslength,a=t.currentTarget.dataset.detailid;o>1?e.navigateTo({url:"../../pagesub/Refund/ExchangeGoods?ordernumber=".concat(r,"&typerefund=").concat(n)}):e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(a)})},RefundInfo:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.typerefund,o=t.currentTarget.dataset.detailid;e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(o)})},cancel:function(t){var r=this,n=e.getStorageSync("id"),o=t.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:n,ordernumber:o}),u="cancel_buy_order";this.$utils.post(u,a).then((function(t){if(console.log("取消订单",t),1==t.sta){e.showToast({title:"取消成功"});var n="get_order_buy_info",o="order",a=e.getStorageSync("id"),u=JSON.stringify({memberid:a,ordernumber:r.ordernumber});r.$utils.postNew(n,u,o).then((function(e){1==e.sta&&(r.orderBuyInfo=e.rs,5==r.orderBuyInfo.orderinfo.status&&e.rs.orderinfo.wait_pay_time&&r.getCountdown(e.rs.orderinfo.wait_pay_time))}))}else e.showToast({title:"操作失败",icon:"none"})}))},submit:function(e){var t=this,r=e.currentTarget.dataset.ordernumber,n="get_buy_order_pay_info",o=JSON.stringify({ordernumber:r});console.log(o),this.$utils.post(n,o).then((function(e){t.$utils.wxPay(e.rs.serial_number,"buy_order")}))},ApplyInvoice:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+r})},ApplyInfo:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(r,"&types=1")})},RefundAfterSale:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(r,"&isreception=0")})},againProduct:function(t){var r=t.currentTarget.dataset.ordernumber,n="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",u=JSON.stringify({ordernumber:r,memberid:o});this.$utils.postNew(n,u,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))}}};t.default=r}).call(this,r("543d")["default"])}},[["16b0","common/runtime","common/vendor"]]]);