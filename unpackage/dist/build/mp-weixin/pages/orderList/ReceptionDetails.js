(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/ReceptionDetails"],{"352e":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return u})),r.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement;e._self._c},u=[]},"36fc":function(e,t,r){"use strict";r.r(t);var n=r("352e"),o=r("5106");for(var u in o)"default"!==u&&function(e){r.d(t,e,(function(){return o[e]}))}(u);r("d597");var a,i=r("f0c5"),c=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);t["default"]=c.exports},"3db8":function(e,t,r){},5106:function(e,t,r){"use strict";r.r(t);var n=r("d8c4"),o=r.n(n);for(var u in n)"default"!==u&&function(e){r.d(t,e,(function(){return n[e]}))}(u);t["default"]=o.a},d597:function(e,t,r){"use strict";var n=r("3db8"),o=r.n(n);o.a},d8c4:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(r("e10e"));function n(e){return e&&e.__esModule?e:{default:e}}var o={data:function(){return{ordernumber:"",orderReceptionInfo:""}},onShow:function(){},onLoad:function(t){this.ordernumber=t.ordernumber;var r=this,n="get_order_receivegifts_info",o="order",u=e.getStorageSync("id"),a=JSON.stringify({memberid:u,ordernumber:this.ordernumber});this.$utils.postNew(n,a,o).then((function(e){1==e.sta&&(r.orderReceptionInfo=e.rs)}))},computed:{},methods:{goConversionDetails:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../index-coupon/ConversionDetails?cardbag="+r+"&cardbag_detail_id=0&cardbag_number="+r})},goTransfer:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber="+r})},ReceptionAddress:function(t){var r=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"./ReceptionAddress?ordernumber="+r})},copy:function(t){var r=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:r,success:function(t){e.showToast({title:"复制成功"})}})}}};t.default=o}).call(this,r("543d")["default"])},df27:function(e,t,r){"use strict";(function(e){r("334b");n(r("66fd"));var t=n(r("36fc"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("543d")["createPage"])}},[["df27","common/runtime","common/vendor"]]]);