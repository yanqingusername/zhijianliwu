(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"1b23":function(e,n,t){"use strict";(function(e){t("334b");o(t("66fd"));var n=o(t("d345"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"475e":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}));var o={uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,"f3d2"))}},i=function(){var e=this,n=e.$createElement,t=(e._self._c,e.swiper.length>0?e.__map(e.swiper,(function(n,t){var o=e.__get_orig(n),i=e.$utils.imageUrl(n.banner);return{$orig:o,g0:i}})):null);e.$mp.data=Object.assign({},{$root:{l0:t}})},s=[]},"4b2f":function(e,n,t){"use strict";var o=t("ceb9"),i=t.n(o);i.a},"77d8":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(t("e56b"));function i(e){return e&&e.__esModule?e:{default:e}}var s=function(){t.e("components/own-components/own-product-list").then(function(){return resolve(t("599e"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/own-components/own-index-header").then(function(){return resolve(t("12b1"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/own-components/own-commodity-block").then(function(){return resolve(t("1fd4"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/own-components/own-index-coupon-module").then(function(){return resolve(t("1365"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/own-components/own-grid").then(function(){return resolve(t("7c3c"))}.bind(null,t)).catch(t.oe)},l=function(){t.e("components/own-image/index-jrtj").then(function(){return resolve(t("f44e"))}.bind(null,t)).catch(t.oe)},d={components:{"own-index-header":r,"own-product-list":s,"own-commodity-block":a,"own-grid":c,"own-index-coupon-module":u,"index-jrtj":l},data:function(){return{logoUrl:"",coupon_left:"",coupon_right:"",List:[{id:0,name:"全部"}],gridList:[],commodyBlockList:[],indexCommodyList:[],tabBarIndex:0,swiper:[],commody:[],state:0,pageSize:50,pageIndex_Index:1,pageIndex:1,nameTop:400,rect:0,statusBarHeight:20,poptitle:"",regCouponInfo:[],swiperCurrentIndex:0,autoplay:!0,interval:2e3,duration:500}},onLoad:function(){var n=this;this.statusBarHeight=e.getSystemInfoSync().statusBarHeight;var t=e.getStorageSync("sign");t?this.sta="200":e.navigateTo({url:"../signin/signin"}),e.showToast({icon:"loading",title:"加载中"});var i=JSON.stringify({}),s="get_webconfig_tiaoli";this.$utils.post(s,i).then((function(t){console.log("LOGO: ",t.rs.logo),n.coupon_left=t.rs.coupon_left,n.coupon_right=t.rs.coupon_right,n.logoUrl=t.rs.logo,e.setStorageSync("coupon_background",t.rs.coupon_background)}));i=JSON.stringify({}),s="get_gift_person_list";this.$utils.post(s,i).then((function(e){console.log("导航：",e),n.List=n.List.concat(e.rs)}));i=JSON.stringify({a:0}),s="get_banner";this.$utils.post(s,i).then((function(e){console.log("轮播图：",e),n.swiper=e.rs}));i=JSON.stringify({a:""}),s="get_plan_theme_list";this.$utils.post(s,i).then((function(e){console.log("主题商品：",e),n.gridList=e.rs}));i=JSON.stringify({a:0,member_level:e.getStorageSync("level")}),s="get_tuijian_goods";this.$utils.post(s,i).then((function(e){console.log("推荐商品：",e),n.commodyBlockList=e.rs}));i=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:this.pageIndex_Index}),s="get_index_tuijian_goods";this.$utils.post(s,i).then((function(t){if(console.log("首页推荐商品：",t),n.indexCommodyList=t.rs,e.hideLoading(),n.indexCommodyList.length>0)for(var i=0;i<n.indexCommodyList.length;i++){var s=n.indexCommodyList[i];o.default.track("expose_sku_component",{sku:{sku_id:s.sku,sku_name:s.goodsname},spu:{spu_id:s.sku,spu_name:s.goodsname},primary_image_url:s.head_img})}}));var r=this,a=wx.createSelectorQuery();a.select("#scrollId").boundingClientRect(),a.exec((function(e){console.log(33333),console.log(e),console.log(44444),e&&e[0]&&(r.nameTop=e[0].top,console.log(r.nameTop))}))},onShow:function(){var n=e.getStorageSync("id");n&&(this.getMemberAuditStatus(),this.getMemberRegCoupon())},onPageScroll:function(e){this.rect=e.scrollTop,console.log(e.scrollTop)},onShareAppMessage:function(e){return{title:"指间礼物"}},onPullDownRefresh:function(){var n=this,t=this.tabBarIndex;if(0==t){this.pageIndex_Index=1;var o="get_index_tuijian_goods"}else{this.pageIndex=1;o="get_gift_person_goods"}var i=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:t,pageSize:this.pageSize,pageIndex:0==t?this.pageIndex_Index:this.pageIndex});this.$utils.post(o,i).then((function(o){setTimeout((function(){e.stopPullDownRefresh()}),500),console.log("商品：",o),0==t?(n.pageIndex_Index++,n.indexCommodyList=o.rs):(n.pageIndex++,n.indexCommodyList=o.rs.goodslist)}))},onReachBottom:function(){var n=this,t=this.tabBarIndex;if(0==t)var o="get_index_tuijian_goods";else o="get_gift_person_goods";var i=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:t,pageSize:this.pageSize,pageIndex:0==t?this.pageIndex_Index:this.pageIndex});this.$utils.post(o,i).then((function(e){0==t?(n.pageIndex_Index++,n.indexCommodyList=n.indexCommodyList.concat(e.rs)):(n.pageIndex++,n.indexCommodyList=n.indexCommodyList.concat(e.rs.goodslist))}))},methods:{changeswiper:function(e){var n=e.detail,t=(n.current,n.source);"autoplay"!==t&&"touch"!==t||(this.swiperCurrentIndex=e.detail.current)},bannerJump:function(n,t){console.log(n,t),"gifts_article"==n&&e.navigateTo({url:"/pages/Post/Post?id="+t}),"goods"==n&&e.navigateTo({url:"/pages/details/details?keynum="+t})},change:function(n){var t=this;this.tabBarIndex=n;var i=n;if(0==i){this.pageIndex_Index=1;var s="get_index_tuijian_goods"}else{this.pageIndex=1;s="get_gift_person_goods"}var r=JSON.stringify({member_level:e.getStorageSync("level"),gift_person_id:i,pageSize:this.pageSize,pageIndex:0==i?this.pageIndex_Index:this.pageIndex});this.$utils.post(s,r).then((function(e){console.log("商品：",e),0==i?(t.pageIndex_Index++,t.indexCommodyList=e.rs):(t.pageIndex++,t.indexCommodyList=e.rs.goodslist)})),o.default.track("element",{type:"change",element_id:"tabBarPage-tabBar1_"+this.tabBarIndex,index:this.tabBarIndex,name:"首页页面-tabBar1_"+this.tabBarIndex})},getMemberAuditStatus:function(){var n=this,t="get_member_audit_status",o="member",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(t,s,o).then((function(e){1==e.sta&&(1==e.rs.status||2==e.rs.status)&&(n.poptitle=e.rs.msg,n.$refs["popupcenter"].open())}))},submitrefund:function(){this.$refs["popupcenter"].close()},changePop:function(){},changeClassifi:function(){e.navigateTo({url:"../classification/classification"})},getMemberRegCoupon:function(){var n=this,t="get_member_reg_coupon",o="coupon",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(t,s,o).then((function(e){1==e.sta&&(n.regCouponInfo=e.rs,n.regCouponInfo.length>0&&n.$refs["couponcenter"].open())}))},submitcoupon:function(){this.$refs["couponcenter"].close(),e.navigateTo({url:"../Coupon/Coupon"})}},computed:{level:function(){return e.getStorageSync("level")},level_name:function(){return e.getStorageSync("level_name")}}};n.default=d}).call(this,t("543d")["default"])},ceb9:function(e,n,t){},d345:function(e,n,t){"use strict";t.r(n);var o=t("475e"),i=t("e604");for(var s in i)"default"!==s&&function(e){t.d(n,e,(function(){return i[e]}))}(s);t("4b2f");var r,a=t("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=u.exports},e604:function(e,n,t){"use strict";t.r(n);var o=t("77d8"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=i.a}},[["1b23","common/runtime","common/vendor"]]]);