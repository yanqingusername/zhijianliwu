(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"1b23":function(e,t,n){"use strict";(function(e){n("334b");o(n("66fd"));var t=o(n("d345"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"4b2f":function(e,t,n){"use strict";var o=n("ceb9"),i=n.n(o);i.a},"77b4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var o={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"f3d2"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.swiper.length>0?e.__map(e.swiper,(function(t,n){var o=e.__get_orig(t),i=e.$utils.imageUrl(t.banner);return{$orig:o,g0:i}})):null);e.$mp.data=Object.assign({},{$root:{l0:n}})},s=[]},"77d8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("e56b"));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(){n.e("components/own-components/own-product-list").then(function(){return resolve(n("599e"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("components/own-components/own-index-header").then(function(){return resolve(n("12b1"))}.bind(null,n)).catch(n.oe)},a=function(){n.e("components/own-components/own-commodity-block").then(function(){return resolve(n("1fd4"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/own-components/own-index-coupon-module").then(function(){return resolve(n("1365"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/own-components/own-grid").then(function(){return resolve(n("7c3c"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/own-image/index-jrtj").then(function(){return resolve(n("f44e"))}.bind(null,n)).catch(n.oe)},g={components:{"own-index-header":r,"own-product-list":s,"own-commodity-block":a,"own-grid":c,"own-index-coupon-module":u,"index-jrtj":l},data:function(){return{logoUrl:"",coupon_left:"",coupon_right:"",List:[{id:0,name:"全部"}],gridList:[],commodyBlockList:[],indexCommodyList:[],tabBarIndex:0,swiper:[],commody:[],state:0,pageSize:50,pageIndex_Index:1,pageIndex:1,nameTop:400,rect:0,statusBarHeight:20,poptitle:"",regCouponInfo:[],swiperCurrentIndex:0,autoplay:!0,interval:2e3,duration:500,isSystemInfo:!1}},onLoad:function(){var t=this;this.statusBarHeight=e.getSystemInfoSync().statusBarHeight,this.isSystemInfo=this.$utils.isSystemInfo();var n=e.getStorageSync("sign");n&&(this.sta="200"),e.showToast({icon:"loading",title:"加载中"});var i=JSON.stringify({}),s="get_webconfig_tiaoli";this.$utils.post(s,i).then((function(n){console.log("LOGO: ",n.rs.logo),t.coupon_left=n.rs.coupon_left,t.coupon_right=n.rs.coupon_right,t.logoUrl=n.rs.logo,e.setStorageSync("coupon_background",n.rs.coupon_background)}));i=JSON.stringify({}),s="get_gift_person_list";this.$utils.post(s,i).then((function(e){console.log("导航：",e),t.List=t.List.concat(e.rs)}));i=JSON.stringify({a:0}),s="get_banner";this.$utils.post(s,i).then((function(e){console.log("轮播图：",e),t.swiper=e.rs}));i=JSON.stringify({a:""}),s="get_plan_theme_list";this.$utils.post(s,i).then((function(e){console.log("主题商品：",e),t.gridList=e.rs}));i=JSON.stringify({a:0,member_level:e.getStorageSync("level")}),s="get_tuijian_goods";this.$utils.post(s,i).then((function(e){console.log("推荐商品：",e),t.commodyBlockList=e.rs})),this.pageIndex_Index=1;i=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:this.pageIndex_Index}),s="get_index_tuijian_goods";this.$utils.post(s,i).then((function(n){if(console.log("首页推荐商品：",n),t.indexCommodyList=n.rs,n.rs.length>0&&t.pageIndex_Index++,e.hideLoading(),t.indexCommodyList.length>0)for(var i=0;i<t.indexCommodyList.length;i++){var s=t.indexCommodyList[i];o.default.track("expose_sku_component",{sku:{sku_id:s.sku,sku_name:s.goodsname},spu:{spu_id:s.sku,spu_name:s.goodsname},primary_image_url:s.head_img})}}));var r=this,a=wx.createSelectorQuery();a.select("#scrollId").boundingClientRect(),a.exec((function(e){console.log(33333),console.log(e),console.log(44444),e&&e[0]&&(r.nameTop=e[0].top,console.log(r.nameTop))}))},onShow:function(){var t=e.getStorageSync("id");t&&(this.getMemberAuditStatus(),this.getMemberRegCoupon())},onPageScroll:function(e){this.rect=e.scrollTop,console.log(e.scrollTop)},onShareAppMessage:function(e){return o.default.track("page_share_app_message",{from_type:"menu",share_title:"指间礼物",share_path:"/pages/index/index",share_image_url:"",share_to:"friends"}),{title:"指间礼物"}},onPullDownRefresh:function(){var t=this,n=this.tabBarIndex;if(0==n){this.pageIndex_Index=1;var o="get_index_tuijian_goods"}else{this.pageIndex=1;o="get_gift_person_goods"}var i=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:n,pageSize:this.pageSize,pageIndex:0==n?this.pageIndex_Index:this.pageIndex});this.$utils.post(o,i).then((function(o){setTimeout((function(){e.stopPullDownRefresh()}),500),console.log("商品：",o),0==n?(o.rs.length>0&&t.pageIndex_Index++,t.indexCommodyList=o.rs):(o.rs.goodslist.length>0&&t.pageIndex++,t.indexCommodyList=o.rs.goodslist)}))},onReachBottom:function(){var t=this,n=this.tabBarIndex;if(0==n)var o="get_index_tuijian_goods";else o="get_gift_person_goods";var i=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:n,pageSize:this.pageSize,pageIndex:0==n?this.pageIndex_Index:this.pageIndex});this.$utils.post(o,i).then((function(e){0==n?(e.rs.length>0&&t.pageIndex_Index++,t.indexCommodyList=t.indexCommodyList.concat(e.rs)):(e.rs.goodslist.length>0&&t.pageIndex++,t.indexCommodyList=t.indexCommodyList.concat(e.rs.goodslist))}))},methods:{changeswiper:function(e){var t=e.detail,n=(t.current,t.source);"autoplay"!==n&&"touch"!==n||(this.swiperCurrentIndex=e.detail.current)},bannerJump:function(t,n){console.log(t,n),"gifts_article"==t&&e.navigateTo({url:"/pages/Post/Post?id="+n}),"goods"==t&&e.navigateTo({url:"/pages/details/details?keynum="+n}),"member"==t&&e.navigateTo({url:"/pages/Member/Member?typestring=1"})},change:function(t){var n=this;this.tabBarIndex=t;var i=t;if(0==i){this.pageIndex_Index=1;var s="get_index_tuijian_goods"}else{this.pageIndex=1;s="get_gift_person_goods"}var r=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:i,pageSize:this.pageSize,pageIndex:0==i?this.pageIndex_Index:this.pageIndex});this.$utils.post(s,r).then((function(e){console.log("商品：",e),0==i?(e.rs.length>0&&n.pageIndex_Index++,n.indexCommodyList=e.rs):(e.rs.goodslist.length>0&&n.pageIndex++,n.indexCommodyList=e.rs.goodslist)})),o.default.track("element",{type:"change",element_id:"tabBarPage-tabBar1_"+this.tabBarIndex,index:this.tabBarIndex,name:"首页页面-tabBar1_"+this.tabBarIndex})},getMemberAuditStatus:function(){var t=this,n="get_member_audit_status",o="member",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(n,s,o).then((function(e){1==e.sta&&(1==e.rs.status||2==e.rs.status)&&(t.poptitle=e.rs.msg,t.$refs["popupcenter"].open())}))},submitrefund:function(){this.$refs["popupcenter"].close()},changePop:function(){},changeClassifi:function(){e.navigateTo({url:"../classification/classification"})},getMemberRegCoupon:function(){var t=this,n="get_member_reg_coupon",o="coupon",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(n,s,o).then((function(e){1==e.sta&&(t.regCouponInfo=e.rs,t.regCouponInfo.length>0&&t.$refs["couponcenter"].open())}))},submitcoupon:function(){this.$refs["couponcenter"].close();var t=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"],success:function(n){var o="add_wx_subscribe_log",i="subscribe",s=e.getStorageSync("id"),r=JSON.stringify({memberid:s,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"});t.$utils.postNew(o,r,i).then((function(e){e.sta}))},fail:function(e){}}),e.navigateTo({url:"../Coupon/Coupon"})}},computed:{level:function(){return e.getStorageSync("level")},level_name:function(){return e.getStorageSync("level_name")}}};t.default=g}).call(this,n("543d")["default"])},ceb9:function(e,t,n){},d345:function(e,t,n){"use strict";n.r(t);var o=n("77b4"),i=n("e604");for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("4b2f");var r,a=n("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=u.exports},e604:function(e,t,n){"use strict";n.r(t);var o=n("77d8"),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=i.a}},[["1b23","common/runtime","common/vendor"]]]);