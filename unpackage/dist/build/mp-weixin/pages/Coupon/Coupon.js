(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Coupon/Coupon"],{2460:function(e,o,n){"use strict";n.r(o);var t=n("6f48"),u=n("98fd");for(var c in u)"default"!==c&&function(e){n.d(o,e,(function(){return u[e]}))}(c);n("abef");var r,s=n("f0c5"),a=Object(s["a"])(u["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],r);o["default"]=a.exports},"6e06":function(e,o,n){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t=c(n("e2fe")),u=c(n("e56b"));function c(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{number:0,top:[],btm:[],top1:[],btm1:[],top2:[],btm2:[],level:"",choose:"",level_name:"",url:"",couponList:[{id:1,money:20,desc:"母亲节专享",selecttext:"满200元可用",coupontype:"（全品类类可用）",timestring:"有效期：2021/06/12~2021/06/14"},{id:21,money:50,desc:"端午节优惠券",selecttext:"满300元可用",coupontype:"（限食品类可用）",timestring:"有效期：2021/06/12~2021/06/14"},{id:12,money:20,desc:"母亲节专享",selecttext:"满200元可用",coupontype:"（全品类类可用）",timestring:"有效期：2021/06/12~2021/06/14"},{id:14,money:50,desc:"端午节优惠券",selecttext:"满500元可用",coupontype:"（全品类类可用）",timestring:"有效期：2021/06/12~2021/06/14"}]}},onLoad:function(o){var n=this;this.url=t.default.URL,o.choose&&(this.choose=o.choose),e.setStorageSync("coupon",""),e.setStorageSync("coupon_keynum",""),e.setStorageSync("coupon_number",""),e.setStorageSync("coupon_money",""),this.level_name=e.getStorageSync("level_name"),this.level=e.getStorageSync("level");var c=e.getStorageSync("id"),r='{"memberid":"'+c+'"}',s="get_coupon_number_list";this.$utils.post(s,r).then((function(e){console.log("我的优惠券",e);var o=(new Date).getTime();for(var t in e.rs){if(e.rs[t].coupon_type_info.begin_time=1e3*e.rs[t].coupon_type_info.begin_time,e.rs[t].coupon_type_info.end_time=1e3*e.rs[t].coupon_type_info.end_time,0==e.rs[t].coupon_type_info.type){if(e.rs[t].coupon_type_info.end_time-o<=0)e.rs[t].time="已过期";else if(e.rs[t].coupon_type_info.end_time-o>0){var u=new Date(parseInt(e.rs[t].coupon_type_info.begin_time)),c=u.getFullYear(),r=u.getMonth()+1,s=u.getDate(),a=u.getHours(),i=u.getMinutes(),p=u.getSeconds();a<10&&(a="0"+a),i<10&&(i="0"+i),p<10&&(p="0"+p),e.rs[t].coupon_type_info.begin_time=c+"-"+r+"-"+s+" "+a+":"+i+":"+p;u=new Date(parseInt(e.rs[t].coupon_type_info.end_time)),c=u.getFullYear(),r=u.getMonth()+1,s=u.getDate(),a=u.getHours(),i=u.getMinutes(),p=u.getSeconds();a<10&&(a="0"+a),i<10&&(i="0"+i),p<10&&(p="0"+p),e.rs[t].coupon_type_info.end_time=c+"-"+r+"-"+s+" "+a+":"+i+":"+p,e.rs[t].time=e.rs[t].coupon_type_info.begin_time+"-"+e.rs[t].coupon_type_info.end_time,e.rs[t].money=parseInt(e.rs[t].money)}}else e.rs[t].coupon_type_info.end_time-o<=0?e.rs[t].time="已过期":e.rs[t].coupon_type_info.end_time-o>0&&(e.rs[t].time=parseInt((e.rs[t].coupon_type_info.end_time-o)/864e5));0==e.rs[t].status?0==e.rs[t].coupon_type_info.type?"已过期"==e.rs[t].time?n.top2.push(e.rs[t]):n.top.push(e.rs[t]):"已过期"==e.rs[t].time?n.btm2.push(e.rs[t]):n.btm.push(e.rs[t]):1==e.rs[t].status&&(0==e.rs[t].coupon_type_info.type?n.top1.push(e.rs[t]):n.btm1.push(e.rs[t]))}})),u.default.track("expose_coupon",{coupon:{coupon_id:"48390200020058042",coupon_name:"母亲节大促10元代金券"},coupon_batch:{coupon_batch_id:"48390200020058042",coupon_batch_name:"母亲节大促"}})},methods:{downNow:function(e){u.default.track("trigger_coupon",{coupon:{coupon_id:"48390200020058042",coupon_name:"母亲节大促10元代金券"},coupon_batch:{coupon_batch_id:"48390200020058042",coupon_batch_name:"母亲节大促"}})},use:function(o){var n=o.currentTarget.dataset.keynum,t=o.currentTarget.dataset.money,u=o.currentTarget.dataset.id;console.log(n);var c=o.currentTarget.dataset.coupon_number,r=o.currentTarget.dataset.coupon_name;console.log(this.choose),"1"==this.choose?e.reLaunch({url:"../shopping/shopping?coupon_number="+c+"&coupon_name="+r}):2==this.choose?(e.setStorageSync("coupon",u),e.setStorageSync("coupon_keynum",n),e.setStorageSync("coupon_number",c),e.setStorageSync("coupon_money",t),console.log("coupon_money",t),console.log("coupon_number",c),e.navigateBack({delta:1})):(e.setStorageSync("coupon",u),e.setStorageSync("coupon_keynum",n),e.setStorageSync("coupon_number",c),e.setStorageSync("coupon_money",t),e.reLaunch({url:"../index/index"}))},Single:function(o){var n=o.currentTarget.dataset.keynum,t=o.currentTarget.dataset.money,u=o.currentTarget.dataset.id;console.log(n);var c=o.currentTarget.dataset.coupon_number,r=o.currentTarget.dataset.coupon_name;console.log(this.choose),1==this.choose?e.reLaunch({url:"../shopping/shopping?coupon_number="+c+"&coupon_name="+r}):2==this.choose?(e.setStorageSync("coupon",u),e.setStorageSync("coupon_keynum",n),e.setStorageSync("coupon_number",c),e.setStorageSync("coupon_money",t),console.log("coupon_money",t),console.log("coupon_number",c),e.navigateBack({delta:1})):(e.setStorageSync("coupon",u),e.setStorageSync("coupon_keynum",n),e.setStorageSync("coupon_number",c),e.setStorageSync("coupon_money",t),e.reLaunch({url:"../index/index"}))},nav:function(e){var o=e.currentTarget.dataset.index;this.number=o},receive:function(o){e.navigateTo({url:"../index-coupon/index-coupon"})},expiredCoupon:function(o){e.navigateTo({url:"./ExpiredCoupon"})}}};o.default=r}).call(this,n("543d")["default"])},"6f48":function(e,o,n){"use strict";var t;n.d(o,"b",(function(){return u})),n.d(o,"c",(function(){return c})),n.d(o,"a",(function(){return t}));var u=function(){var e=this,o=e.$createElement;e._self._c},c=[]},"98fd":function(e,o,n){"use strict";n.r(o);var t=n("6e06"),u=n.n(t);for(var c in t)"default"!==c&&function(e){n.d(o,e,(function(){return t[e]}))}(c);o["default"]=u.a},abef:function(e,o,n){"use strict";var t=n("e564"),u=n.n(t);u.a},e564:function(e,o,n){},fb04:function(e,o,n){"use strict";(function(e){n("334b");t(n("66fd"));var o=t(n("2460"));function t(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,n("543d")["createPage"])}},[["fb04","common/runtime","common/vendor"]]]);