(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"1b23":function(e,t,n){"use strict";(function(e){n("334b");o(n("66fd"));var t=o(n("d345"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"4b2f":function(e,t,n){"use strict";var o=n("ceb9"),i=n.n(o);i.a},"77d8":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("e56b"));function i(e){return e&&e.__esModule?e:{default:e}}var s,a=function(){n.e("components/own-components/own-product-list").then(function(){return resolve(n("599e"))}.bind(null,n)).catch(n.oe)},r=function(){n.e("components/own-components/own-index-header").then(function(){return resolve(n("12b1"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/own-components/own-commodity-block").then(function(){return resolve(n("1fd4"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/own-components/own-index-coupon-module").then(function(){return resolve(n("1365"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/own-components/own-grid").then(function(){return resolve(n("7c3c"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/own-image/index-jrtj").then(function(){return resolve(n("f44e"))}.bind(null,n)).catch(n.oe)},p={components:{"own-index-header":r,"own-product-list":a,"own-commodity-block":u,"own-grid":l,"own-index-coupon-module":c,"index-jrtj":d},data:function(){return{logoUrl:"",coupon_left:"",coupon_right:"",List:[{id:0,name:"推荐",keynum:""}],gridList:[],commodyBlockList:[],indexCommodyList:[],tabBarIndex:0,swiper:[],commody:[],state:0,pageSize:20,pageIndex_Index:1,pageIndex:1,nameTop:400,rect:0,statusBarHeight:20,poptitle:"",regCouponInfo:[],swiperCurrentIndex:0,autoplay:!0,interval:2e3,duration:500,isSystemInfo:!1,opationnumber:1,allgiftList:[],isShowScene:!0,adList:[],rsdataList:[],priceData:"",salesData:"",recommendData:"",pagePlanSize:10,pagePlanIndex:1,postList:[],indexCurrent:0,conditionkey:"1",pricekey:"",keynum1:"",coupon_type:"",Key:"",slide_up:""}},onLoad:function(){var t=this;this.statusBarHeight=e.getSystemInfoSync().statusBarHeight,this.isSystemInfo=this.$utils.isSystemInfo();var n=e.getStorageSync("sign");n&&(this.sta="200"),e.showToast({icon:"loading",title:"加载中"});var i=JSON.stringify({}),s="get_webconfig_tiaoli";this.$utils.post(s,i).then((function(n){console.log("LOGO: ",n.rs.logo),t.coupon_left=n.rs.coupon_left,t.coupon_right=n.rs.coupon_right,t.logoUrl=n.rs.logo,e.setStorageSync("coupon_background",n.rs.coupon_background)}));var a=JSON.stringify({module:"index"}),r="get_ad_list",u="ad";this.$utils.postNew(r,a,u).then((function(e){t.adList=e.data}));i=JSON.stringify({}),s="get_gift_person_list";this.$utils.post(s,i).then((function(e){console.log("导航：",e),t.List=t.List.concat(e.rs)}));i=JSON.stringify({a:0}),s="get_banner";this.$utils.post(s,i).then((function(e){console.log("轮播图：",e),t.swiper=e.rs}));i=JSON.stringify({a:""}),s="get_plan_theme_list";this.$utils.post(s,i).then((function(e){console.log("主题商品：",e),t.gridList=e.rs}));var c="serach_condition",l="search",d=JSON.stringify({});this.$utils.postNew(c,d,l).then((function(e){t.rsdataList=e.rs.price.rs_data,t.priceData=e.rs.price,t.salesData=e.rs.sales,t.recommendData=e.rs.recommend})),this.pageIndex_Index=1;i=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:this.pageIndex_Index,is_type:1}),s="get_tuijian_goods";this.$utils.post(s,i).then((function(n){if(console.log("首页推荐商品：",n),t.indexCommodyList=n.rs,n.rs.length>0&&t.pageIndex_Index++,e.hideLoading(),t.indexCommodyList.length>0)for(var i=0;i<t.indexCommodyList.length;i++){var s=t.indexCommodyList[i];o.default.track("expose_sku_component",{sku:{sku_id:s.sku,sku_name:s.goodsname},spu:{spu_id:s.sku,spu_name:s.goodsname},primary_image_url:s.head_img})}}));var p=this,g=wx.createSelectorQuery();g.select("#scrollId").boundingClientRect(),g.exec((function(e){console.log(33333),console.log(e),console.log(44444),e&&e[0]&&(p.nameTop=e[0].top,console.log(p.nameTop))}));var h=wx.getLaunchOptionsSync();1089==h?this.isShowScene=!1:setTimeout((function(){t.isShowScene=!1}),500)},onShow:function(){var t=e.getStorageSync("id");t&&(this.getMemberAuditStatus(),this.getMemberRegCoupon()),this.get_all_gift_person_goods()},onPageScroll:function(e){var t=this;clearTimeout(s),t.fadeOut(),s=setTimeout((function(){t.fadeIn()}),500),this.rect=e.scrollTop,console.log(e.scrollTop),e.scrollTop>10?this.opationnumber=.8:e.scrollTop>15?this.opationnumber=.7:e.scrollTop>20?this.opationnumber=.6:e.scrollTop>25?this.opationnumber=.5:e.scrollTop>30?this.opationnumber=.4:e.scrollTop>35?this.opationnumber=.3:e.scrollTop>40?this.opationnumber=.2:e.scrollTop>45?this.opationnumber=.1:e.scrollTop>50?this.opationnumber=0:this.opationnumber=1},onShareAppMessage:function(e){return o.default.track("page_share_app_message",{from_type:"menu",share_title:"指间礼物",share_path:"/pages/index/index",share_image_url:"",share_to:"friends"}),{title:"指间礼物"}},onPullDownRefresh:function(){var t=this,n=this.tabBarIndex;if(0==n){this.pageIndex_Index=1;var o="get_tuijian_goods",i=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:0==n?this.pageIndex_Index:this.pageIndex,is_type:1});this.$utils.post(o,i).then((function(n){setTimeout((function(){e.stopPullDownRefresh()}),500),console.log("商品：",n),n.rs.length>0&&t.pageIndex_Index++,t.indexCommodyList=n.rs}))}else this.pageIndex=1,this.getProductList(1),setTimeout((function(){e.stopPullDownRefresh()}),500);i=JSON.stringify({a:""}),o="get_plan_theme_list";this.$utils.post(o,i).then((function(e){console.log("主题商品：",e),t.gridList=e.rs}));var s=JSON.stringify({module:"index"}),a="get_ad_list",r="ad";this.$utils.postNew(a,s,r).then((function(e){t.adList=e.data}))},onReachBottom:function(){var t=this,n=this.tabBarIndex;if(0==n){var o="get_tuijian_goods",i=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:0==n?this.pageIndex_Index:this.pageIndex,is_type:1});this.$utils.post(o,i).then((function(e){e.rs.length>0&&t.pageIndex_Index++,t.indexCommodyList=t.indexCommodyList.concat(e.rs)}))}else this.getProductList(2)},methods:{fadeIn:function(){var e=wx.createAnimation({duration:400,timingType:"ease"});this.animation=e,e.opacity(1).step(),e.translateY(0).step(),this.slide_up=e.export()},fadeOut:function(){var e=wx.createAnimation({duration:400,timingType:"ease"});this.animation=e,e.translateY(-40).step(),e.opacity(0).step(),this.slide_up=e.export()},goToScrollTop:function(){e.pageScrollTo({scrollTop:0,duration:1e3})},clickHandler:function(e){var t=e.currentTarget.dataset.index;this.indexCurrent=t,this.conditionkey=e.currentTarget.dataset.conditionkey,this.pricekey="",this.getProductList(1),this.$refs["popupSearch"].close()},clickPopUp:function(e){this.conditionkey=e.currentTarget.dataset.conditionkey;var t=e.currentTarget.dataset.index;this.indexCurrent=t,this.$refs["popupSearch"].open()},change:function(e){},bindPickerChange:function(e){this.pricekey=e.currentTarget.dataset.pricekey,this.$refs["popupSearch"].close(),this.getProductList(1)},getProductList:function(t){var n=this;console.log(this.keynum1),1==t&&(this.pageIndex=1);var o=this,i="search_list",s="search",a=e.getStorageSync("level"),r=JSON.stringify({condition_key:this.conditionkey,price_key:this.pricekey,keyword:this.Key,member_level:a,pageSize:this.pageSize,pageIndex:this.pageIndex,goodsclassify:this.keynum1,coupon_type:this.coupon_type});this.$utils.postNew(i,r,s).then((function(e){1==t?(e.rs.length>0&&o.pageIndex++,o.indexCommodyList=e.rs,n.goToScrollTop()):(e.rs.length>0&&o.pageIndex++,o.indexCommodyList=o.indexCommodyList.concat(e.rs))}))},details:function(t){var n=t.currentTarget.dataset.dataitem;o.default.track("trigger_sku_component",{sku:{sku_id:n.sku,sku_name:n.goodsname},spu:{spu_id:n.sku,spu_name:n.goodsname},primary_image_url:n.head_img});var i=t.currentTarget.dataset.keynum;e.navigateTo({url:"/pages/details/details?keynum="+i})},toMore:function(t){var n=t.currentTarget.dataset.keynum,o=t.currentTarget.dataset.name;n&&o&&e.navigateTo({url:"/pages/search/search?keynum="+n+"&name="+o})},changeswiper:function(e){var t=e.detail,n=(t.current,t.source);"autoplay"!==n&&"touch"!==n||(this.swiperCurrentIndex=e.detail.current)},bannerJump:function(t,n){console.log(t,n),"gifts_article"==t&&e.navigateTo({url:"/pages/Post/Post?id="+n}),"goods"==t&&e.navigateTo({url:"/pages/details/details?keynum="+n}),"member"==t&&e.navigateTo({url:"/pages/Member/Member?typestring=1"})},changeProduct:function(t,n,i){var s=this;console.log(t,n,i),this.tabBarIndex=t;var a=t;if(0==a){this.pageIndex_Index=1;var r="get_tuijian_goods",u=JSON.stringify({member_level:e.getStorageSync("level"),pageSize:this.pageSize,pageIndex:0==a?this.pageIndex_Index:this.pageIndex,is_type:1});this.$utils.post(r,u).then((function(e){console.log("商品：",e),0==a&&(e.rs.length>0&&s.pageIndex_Index++,s.indexCommodyList=e.rs)}))}else this.pageIndex=1,this.keynum1=n,this.Key=i,this.getProductList(1);o.default.track("element",{type:"change",element_id:"tabBarPage-tabBar1_"+this.tabBarIndex,index:this.tabBarIndex,name:"首页页面-tabBar1_"+this.tabBarIndex})},getMemberAuditStatus:function(){var t=this,n="get_member_audit_status",o="member",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(n,s,o).then((function(e){1==e.sta&&(1==e.rs.status||2==e.rs.status)&&(t.poptitle=e.rs.msg,t.$refs["popupcenter"].open())}))},submitrefund:function(){this.$refs["popupcenter"].close()},changePop:function(){},changeClassifi:function(){e.navigateTo({url:"../classification/classification"})},get_all_gift_person_goods:function(){var t=this,n="get_all_gift_person_goods",o=JSON.stringify({member_level:e.getStorageSync("level")});this.$utils.post(n,o).then((function(e){1==e.sta&&(t.allgiftList=e.rs)}))},getMemberRegCoupon:function(){var t=this,n="get_member_reg_coupon",o="coupon",i=e.getStorageSync("id"),s=JSON.stringify({memberid:i});this.$utils.postNew(n,s,o).then((function(e){1==e.sta&&(t.regCouponInfo=e.rs,t.regCouponInfo.length>0&&t.$refs["couponcenter"].open())}))},submitcoupon:function(){this.$refs["couponcenter"].close();var t=this;e.requestSubscribeMessage({tmplIds:["CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo","UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"],success:function(n){var o="add_wx_subscribe_log",i="subscribe",s=e.getStorageSync("id"),a=JSON.stringify({memberid:s,template_id:"CMWMOxVzHq2eI_F-Hit5U3tvGCaENXCAUQwII4N2hYo,UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"});t.$utils.postNew(o,a,i).then((function(e){e.sta}))},fail:function(e){}}),e.navigateTo({url:"../Coupon/Coupon"})}},computed:{level:function(){return e.getStorageSync("level")},level_name:function(){return e.getStorageSync("level_name")}}};t.default=p}).call(this,n("543d")["default"])},c95d:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var o={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"f3d2"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,0==e.tabBarIndex&&e.swiper.length>0?e.__map(e.swiper,(function(t,n){var o=e.__get_orig(t),i=e.$utils.imageUrl(t.banner);return{$orig:o,g0:i}})):null);e.$mp.data=Object.assign({},{$root:{l0:n}})},s=[]},ceb9:function(e,t,n){},d345:function(e,t,n){"use strict";n.r(t);var o=n("c95d"),i=n("e604");for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);n("4b2f");var a,r=n("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=u.exports},e604:function(e,t,n){"use strict";n.r(t);var o=n("77d8"),i=n.n(o);for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=i.a}},[["1b23","common/runtime","common/vendor"]]]);