(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/Refund/RefundInfo"],{3206:function(e,t,n){"use strict";n.r(t);var i=n("c5d6"),r=n("b2f7");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("83c6");var s,u=n("f0c5"),a=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=a.exports},"83c6":function(e,t,n){"use strict";var i=n("9923"),r=n.n(i);r.a},"88d0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{value:"",nav:"20",screenPurchase:[],ordernumber:"",typerefund:1,detailid:"",cancel_info:"",expressInfoList:[],express_name:"",company_name:"",express_num:"",isShow:!1,boxHeight:475,isShowAll:!1,bHeight:260,countdown:"",isSystemInfo:!1,cancel_list:[]}},onLoad:function(t){var n=this;e.getSystemInfo({success:function(e){n.nav=e.statusBarHeight}}),this.isSystemInfo=this.$utils.isSystemInfo(),this.ordernumber=t.ordernumber,this.typerefund=t.typerefund,this.detailid=t.detailid;var i="get_order_cancel_info",r="order",o=e.getStorageSync("id"),s=JSON.stringify({ordernumber:this.ordernumber,memberid:o,order_detail_id:this.detailid});this.$utils.postNew(i,s,r).then((function(e){1==e.sta&&(n.cancel_info=e.rs.cancel_info,n.cancel_list=e.rs.cancel_list,n.typerefund=e.rs.cancel_info.type,2!=n.typerefund&&3!=n.typerefund||2!=n.cancel_info.status||n.getCountdown(n.cancel_info.express_surplus_time))}));var u="get_express_info_list",a="order",c=JSON.stringify({});this.$utils.postNew(u,c,a).then((function(e){1==e.sta&&(n.expressInfoList=e.rs)}))},methods:{getCountdown:function(e){var t=this;e<=0||t.setTime(e)},setTime:function(e){var t=this;if(!(e<=0)){var n=0,i=0,r=0,o=0;n=Math.floor(e/86400),i=Math.floor(e/3600)-24*n,r=Math.floor(e/60)-24*n*60-60*i,o=Math.floor(e)-24*n*60*60-60*i*60-60*r,n<=9&&(n="0"+n),i<=9&&(i="0"+i),r<=9&&(r="0"+r),o<=9&&(o="0"+o);var s={day:n,hour:i,minute:r,second:o};t.countdown=s,console.log("----\x3e:",t.countdown)}},backbutton:function(t){e.navigateBack({delta:1})},copy:function(t){var n=t.currentTarget.dataset.ordernumber;e.setClipboardData({data:n,success:function(t){e.showToast({title:"复制成功"})}})},ApplyRefund:function(t){e.redirectTo({url:"./ApplyRefund?ordernumber=".concat(this.ordernumber,"&typerefund=").concat(this.typerefund,"&detailid=").concat(this.detailid)})},applyHandler:function(t){var n="revoke_refund_order",i="order",r=e.getStorageSync("id"),o=JSON.stringify({ordernumber:this.ordernumber,memberid:r,order_detail_id:this.detailid});this.$utils.postNew(n,o,i).then((function(t){1==t.sta&&(e.showToast({title:"撤销成功"}),setTimeout((function(){e.navigateBack({delta:1})}),1e3))}))},logisticInfo:function(t){var n=t.currentTarget.dataset.ordernumber;e.navigateTo({url:"./LogisticsInfo?ordernumber="+n})},logisticsHandler:function(){this.$refs["popuplogistics"].open()},expressHandler:function(){this.isShow=!this.isShow},expressClick:function(e){this.isShow=!1;var t=e.currentTarget.dataset.expressname;this.express_name=t;var n=e.currentTarget.dataset.id;0==n?(this.boxHeight=560,this.bHeight=450,this.isShowAll=!0):(this.boxHeight=475,this.bHeight=260,this.isShowAll=!1)},submitlogistics:function(){var t=this,n="set_refund_order_express",i="order",r=e.getStorageSync("id"),o=JSON.stringify({ordernumber:this.ordernumber,memberid:r,express_num:this.express_num,express_name:this.isShowAll?this.company_name:this.express_name});this.$utils.postNew(n,o,i).then((function(n){1==n.sta&&(t.$refs["popuplogistics"].close(),t.isShowAll=!1,t.isShow=!1,e.navigateBack({delta:1}),t.express_name="",t.company_name="",t.express_num="")}))},change:function(e){}}};t.default=n}).call(this,n("543d")["default"])},9923:function(e,t,n){},b2f7:function(e,t,n){"use strict";n.r(t);var i=n("88d0"),r=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},c5d6:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={uniCountdown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-countdown/components/uni-countdown/uni-countdown")]).then(n.bind(null,"3440"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"f3d2"))}},r=function(){var e=this,t=e.$createElement;e._self._c},o=[]},e180:function(e,t,n){"use strict";(function(e){n("334b");i(n("66fd"));var t=i(n("3206"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["e180","common/runtime","common/vendor"]]]);