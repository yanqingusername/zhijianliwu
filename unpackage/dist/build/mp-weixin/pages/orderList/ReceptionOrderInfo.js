(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/ReceptionOrderInfo"],{"00ce":function(e,t,n){"use strict";var r=n("024b"),a=n.n(r);a.a},"024b":function(e,t,n){},"0369":function(e,t,n){"use strict";n.r(t);var r=n("7074"),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=a.a},4144:function(e,t,n){"use strict";(function(e){n("334b");r(n("66fd"));var t=r(n("8181"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},7074:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{value:"",nav:"20",ordernumber:"",orderReceptionInfo:"",isSystemInfo:!1}},onLoad:function(t){var n=this;e.getSystemInfo({success:function(e){n.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo(),this.ordernumber=t.ordernumber},onShow:function(){var t=this,n="get_order_receivegifts_info",r="order",a=e.getStorageSync("id"),u=JSON.stringify({memberid:a,ordernumber:this.ordernumber});this.$utils.postNew(n,u,r).then((function(e){1==e.sta&&(t.orderReceptionInfo=e.rs)}))},methods:{goToDetails:function(t){e.navigateTo({url:"../details/details?keynum="+t})},backbutton:function(t){e.navigateBack({delta:1})},RefundInfo:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.typerefund,a=t.currentTarget.dataset.detailid;e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(n,"&typerefund=").concat(r,"&detailid=").concat(a)})},RefundAfterSale:function(t){var n=t.currentTarget.dataset.ordernumber,r=t.currentTarget.dataset.isexchangegoods||0,a=t.currentTarget.dataset.detailid;0==r?e.navigateTo({url:"../../pagesub/Refund/RefundAfterSale?ordernumber=".concat(n,"&isreception=",1)}):e.navigateTo({url:"../../pagesub/Refund/RefundInfo?ordernumber=".concat(n,"&typerefund=2&detailid=").concat(a)})},copy:function(t){var n=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:n,success:function(t){e.showToast({title:"复制成功"})}})},logisticInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"../../pagesub/Refund/LogisticsInfo?ordernumber="+n})}}};t.default=n}).call(this,n("543d")["default"])},"75ee":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},u=[]},8181:function(e,t,n){"use strict";n.r(t);var r=n("75ee"),a=n("0369");for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);n("00ce");var o,i=n("f0c5"),c=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);t["default"]=c.exports}},[["4144","common/runtime","common/vendor"]]]);