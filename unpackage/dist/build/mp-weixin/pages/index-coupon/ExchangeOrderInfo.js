(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index-coupon/ExchangeOrderInfo"],{"1fa3":function(e,t,r){"use strict";var n=r("d57d"),a=r.n(n);a.a},3113:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"677f":function(e,t,r){"use strict";r.r(t);var n=r("3113"),a=r("88a5");for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r("1fa3");var u,i=r("f0c5"),c=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=c.exports},"744f":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{ordernumber:"",orderInfo:""}},onLoad:function(t){this.ordernumber=t.ordernumber;var r=this,n="get_exchange_order_info",a="order",o=e.getStorageSync("id"),u=JSON.stringify({ordernumber:this.ordernumber,memberid:o});this.$utils.postNew(n,u,a).then((function(e){1==e.sta&&(r.orderInfo=e.rs)}))},methods:{backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var r=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:r,success:function(t){e.showToast({title:"复制成功"})}})},goTransfer:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber="+r})},go_exchange:function(t){console.log(t);var r=t.currentTarget.dataset.cardid;e.navigateTo({url:"./redemption_center?cardid="+r})},goConversionDetails:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"./ConversionDetails?cardbag="+r+"&cardbag_detail_id=0&cardbag_number="+r})},logisticInfo:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/LogisticsInfo?ordernumber="+r})},goRecharge:function(t){var r=t.currentTarget.dataset.ordernumber,n=e.getStorageSync("id"),a="order",o="recharge_giftcard",u=JSON.stringify({memberid:n,ordernumber:r});this.$utils.postNew(o,u,a).then((function(t){1==t.sta?setTimeout((function(){e.navigateTo({url:"../balance/RechargeStatus?istype=1&ordernumber="+r})}),500):e.showToast({title:t.msg,icon:"none",mask:"true"})}))}}};t.default=r}).call(this,r("543d")["default"])},"88a5":function(e,t,r){"use strict";r.r(t);var n=r("744f"),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},d57d:function(e,t,r){},e736:function(e,t,r){"use strict";(function(e){r("334b");n(r("66fd"));var t=n(r("677f"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])}},[["e736","common/runtime","common/vendor"]]]);