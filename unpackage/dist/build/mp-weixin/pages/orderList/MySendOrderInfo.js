(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/MySendOrderInfo"],{"4fd9":function(e,t,r){"use strict";(function(e){r("334b");n(r("66fd"));var t=n(r("742c"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])},"6cb8":function(e,t,r){"use strict";r.r(t);var n=r("edc5"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},"6ecf":function(e,t,r){"use strict";var n=r("70c9"),o=r.n(n);o.a},"70c9":function(e,t,r){},"742c":function(e,t,r){"use strict";r.r(t);var n=r("e4ab"),o=r("6cb8");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);r("6ecf");var i,u=r("f0c5"),d=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);t["default"]=d.exports},e4ab:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var n={uniCountdown:function(){return Promise.all([r.e("common/vendor"),r.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(r.bind(null,"3440"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},edc5:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{value:"",nav:"20",ordernumber:"",orderSendInfo:"",countdown:"",teamEnd:!1,isSystemInfo:!1}},onLoad:function(t){var r=this;this.ordernumber=t.ordernumber,e.getSystemInfo({success:function(e){r.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo()},onShow:function(){var t=this,r="get_order_giftgiving_info",n="order",o=e.getStorageSync("id"),a=JSON.stringify({memberid:o,ordernumber:this.ordernumber});this.$utils.postNew(r,a,n).then((function(e){1==e.sta&&(t.orderSendInfo=e.rs,5==t.orderSendInfo.orderinfo.status?e.rs.wait_pay_time&&t.getCountdown(e.rs.wait_pay_time):2==t.orderSendInfo.orderinfo.status&&e.rs.wait_pay_time&&t.getCountdown(e.rs.wait_pay_time))}))},methods:{goToDetails:function(t){e.navigateTo({url:"../details/details?keynum="+t})},getCountdown:function(e){var t=this;e<=0||t.setTime(e)},setTime:function(e){var t=this;if(!(e<=0)){var r=0,n=0,o=0,a=0;r=Math.floor(e/86400),n=Math.floor(e/3600)-24*r,o=Math.floor(e/60)-24*r*60-60*n,a=Math.floor(e)-24*r*60*60-60*n*60-60*o,r<=9&&(r="0"+r),n<=9&&(n="0"+n),o<=9&&(o="0"+o),a<=9&&(a="0"+a);var i={day:r,hour:n,minute:o,second:a};t.countdown=i}},backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var r=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:r,success:function(t){e.showToast({title:"复制成功"})}})},goConversionDetails:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../index-coupon/ConversionDetails?cardbag="+r+"&cardbag_detail_id=0&cardbag_number="+r})},cancel:function(t){var r=this,n=e.getStorageSync("id"),o=t.currentTarget.dataset.ordernumber,a=JSON.stringify({memberid:n,ordernumber:o}),i="cancel_buy_order";this.$utils.post(i,a).then((function(t){if(console.log("取消订单",t),1==t.sta){e.showToast({title:"取消成功"});var n="get_order_giftgiving_info",o="order",a=e.getStorageSync("id"),i=JSON.stringify({memberid:a,ordernumber:r.ordernumber});r.$utils.postNew(n,i,o).then((function(e){1==e.sta&&(r.orderSendInfo=e.rs,5==r.orderSendInfo.orderinfo.status?e.rs.wait_pay_time&&r.getCountdown(e.rs.wait_pay_time):2==r.orderSendInfo.orderinfo.status&&e.rs.wait_pay_time&&r.getCountdown(e.rs.wait_pay_time))}))}else e.showToast({title:"操作失败",icon:"none"})}))},submit:function(e){var t=this,r=e.currentTarget.dataset.ordernumber,n="get_buy_order_pay_info",o=JSON.stringify({ordernumber:r});console.log(o),this.$utils.post(n,o).then((function(e){t.$utils.wxPay(e.rs.serial_number,"buy_order")}))},RefundInfo:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.typerefund,o=(t.currentTarget.dataset.detailid,[]);for(var a in this.orderSendInfo.orderdetail)o.push(this.orderSendInfo.orderdetail[a].id);var i=o.join(",");e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(i)})},ApplyRefund:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.typerefund,o=(t.currentTarget.dataset.goodslength,t.currentTarget.dataset.detailid,t.currentTarget.dataset.orderdetail),a=t.currentTarget.dataset.isrefundprice,i=[];for(var u in o)i.push(o[u].id);var d=i.join(",");0==a?e.navigateTo({url:"../../pagesub/Refund/ApplyRefund?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(d)}):e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(r,"&typerefund=").concat(n,"&detailid=").concat(d)})},PresentNow:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/succes?cardbag_number="+r})},GiveitAgain:function(t){var r=t.currentTarget.dataset.ordernumber,n="order_add_shopping_cart",o=e.getStorageSync("id"),a="order",i=JSON.stringify({ordernumber:r,memberid:o});this.$utils.postNew(n,i,a).then((function(t){1==t.sta&&e.reLaunch({url:"../shopping/shopping?type=0"})}))},ApplyInvoice:function(t){var r=t.currentTarget.dataset.ordernumber,n=t.currentTarget.dataset.payprice;r&&n&&parseFloat(n)>0?e.navigateTo({url:"../Apply/ApplyInvoice?ordernumber="+r}):e.showToast({title:"订单实付款大于0才能开具发票！",icon:"none",mask:"true"})},ApplyInfo:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../Apply/ApplySuccess?ordernumber=".concat(r,"&types=1")})}}};t.default=r}).call(this,r("543d")["default"])}},[["4fd9","common/runtime","common/vendor"]]]);