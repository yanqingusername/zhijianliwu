(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{2298:function(t,e,i){},"5ca5":function(t,e,i){"use strict";var n=i("2298"),r=i.n(n);r.a},"6b07":function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"f3d2"))}},r=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"87e4":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;r(i("e2fe"));var n=r(i("e56b"));function r(t){return t&&t.__esModule?t:{default:t}}function s(t){return u(t)||a(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return h(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?h(t,e):void 0}}function a(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return h(t)}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var d=function(){Promise.all([i.e("common/vendor"),i.e("components/own-components/search-product")]).then(function(){return resolve(i("1677"))}.bind(null,i)).catch(i.oe)},p={components:{"search-product":d},data:function(){return{Key:"",hotSearchList:[],historySearchList:[],rsdataList:[],priceData:"",salesData:"",recommendData:"",isAll:!1,pageSize:10,pageIndex:1,postNumber:0,url:"",postList:[],indexCurrent:0,conditionkey:"1",pricekey:"",keynum:"",isShowView:1,coupon_type:""}},onLoad:function(e){this.historySearchList=t.getStorageSync("historySearchList")||[],console.log(e),e&&(e.keynum&&e.name?(this.keynum=e.keynum,this.Key=e.name,this.isShowView=2,this.getProductList(1)):e.coupon_type&&e.name&&(this.coupon_type=e.coupon_type,this.Key=e.name,this.isShowView=2,this.getProductList(1)));var i=this,n="search_hot_key",r="search",s=JSON.stringify({});this.$utils.postNew(n,s,r).then((function(t){i.hotSearchList=t.rs}));var o="serach_condition",c="search",a=JSON.stringify({});this.$utils.postNew(o,a,c).then((function(t){i.rsdataList=t.rs.price.rs_data,i.priceData=t.rs.price,i.salesData=t.rs.sales,i.recommendData=t.rs.recommend}))},onPullDownRefresh:function(){this.getProductList(1),setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){this.getProductList(2)},methods:{search:function(){var e=this.Key.replace(/[ ]/g,"");e?(n.default.track("search",{keyword:e}),this.isShowView=2,this.Key=e,this.historySearchList.unshift(e),this.historySearchList=s(new Set(this.historySearchList)),t.setStorageSync("historySearchList",this.historySearchList),this.pricekey="",this.conditionkey="1",this.indexCurrent=0,this.keynum="",this.coupon_type="",this.getProductList(1)):t.showToast({icon:"none",title:"请输入搜索内容"})},searchKey:function(e){var i=e.currentTarget.dataset.itemkey;n.default.track("search",{keyword:i}),this.isShowView=2,this.Key=i,this.historySearchList.unshift(i),this.historySearchList=s(new Set(this.historySearchList)),t.setStorageSync("historySearchList",this.historySearchList),this.pricekey="",this.conditionkey="1",this.indexCurrent=0,this.keynum="",this.coupon_type="",this.getProductList(1)},daleteHistory:function(){this.historySearchList=[],t.setStorageSync("historySearchList",this.historySearchList)},goToScrollTop:function(){t.pageScrollTo({scrollTop:0,duration:1e3})},clickHandler:function(t){var e=t.currentTarget.dataset.index;this.indexCurrent=e,this.conditionkey=t.currentTarget.dataset.conditionkey,this.pricekey="",this.$refs["popupSearch"].close(),this.getProductList(1)},clickPopUp:function(t){this.conditionkey=t.currentTarget.dataset.conditionkey;var e=t.currentTarget.dataset.index;this.indexCurrent=e,this.$refs["popupSearch"].open()},change:function(t){},bindPickerChange:function(t){this.pricekey=t.currentTarget.dataset.pricekey,this.$refs["popupSearch"].close(),this.getProductList(1)},getProductList:function(e){var i=this;1==e&&(this.pageIndex=1);var r=this,s="search_list",o="search",c=t.getStorageSync("level"),a=JSON.stringify({condition_key:this.conditionkey,price_key:this.pricekey,keyword:this.Key,member_level:c,pageSize:this.pageSize,pageIndex:this.pageIndex,goodsclassify:this.keynum,coupon_type:this.coupon_type});this.$utils.postNew(s,a,o).then((function(t){if(1==e?(r.pageIndex++,r.postList=t.rs,r.isAll=!1,i.goToScrollTop()):t.rs.length>0?(r.postList=r.postList.concat(t.rs),r.pageIndex++):r.isAll=!0,t.rs&&t.rs.length>0)for(var s=0;s<t.rs.length;s++){var o=t.rs[s];n.default.track("expose_sku_component",{sku:{sku_id:o.sku+"",sku_name:o.goodsname},spu:{spu_id:o.sku+"",spu_name:o.goodsname},primary_image_url:o.head_img})}}))},clearKeword:function(){this.Key="",this.isShowView=1,this.historySearchList=t.getStorageSync("historySearchList")||[]},searchKeword:function(t){this.Key=t,this.isShowView=1},onKeyInput:function(e){this.Key=e.detail.value;var i=this.Key.replace(/[ ]/g,"");i?(this.Key=i,this.pricekey="",this.conditionkey="1",this.indexCurrent=0,this.keynum="",this.coupon_type="",this.getProductList(1)):t.showToast({icon:"none",title:"请输入搜索内容"})}},computed:{hasHot:function(){return this.hotSearchList.length>0},hasHistory:function(){return this.historySearchList.length>0},hasProduct:function(){return""==this.Key}}};e.default=p}).call(this,i("543d")["default"])},b200:function(t,e,i){"use strict";i.r(e);var n=i("6b07"),r=i("c500");for(var s in r)"default"!==s&&function(t){i.d(e,t,(function(){return r[t]}))}(s);i("5ca5");var o,c=i("f0c5"),a=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=a.exports},bd98:function(t,e,i){"use strict";(function(t){i("334b");n(i("66fd"));var e=n(i("b200"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},c500:function(t,e,i){"use strict";i.r(e);var n=i("87e4"),r=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=r.a}},[["bd98","common/runtime","common/vendor"]]]);