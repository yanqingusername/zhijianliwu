(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/classification/classificationSearch"],{"1cbd":function(t,e,n){"use strict";(function(t){n("334b");i(n("66fd"));var e=i(n("2000"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},2e3:function(t,e,n){"use strict";n.r(e);var i=n("9b3b"),s=n("212e");for(var o in s)"default"!==o&&function(t){n.d(e,t,(function(){return s[t]}))}(o);n("d341");var r,a=n("f0c5"),c=Object(a["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports},"212e":function(t,e,n){"use strict";n.r(e);var i=n("58c9"),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=s.a},"58c9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("e2fe")),s=o(n("e56b"));function o(t){return t&&t.__esModule?t:{default:t}}var r=function(){n.e("components/own-components/search-product").then(function(){return resolve(n("1677"))}.bind(null,n)).catch(n.oe)},a={components:{"search-product":r},data:function(){return{Key:"",hotSearchList:[],historySearchList:[],isAll:!1,pageSize:10,pageIndex:1,postNumber:0,url:"",postList:[],indexCurrent:0,items:[{id:1,name:"100以下"},{id:2,name:"200-300"},{id:3,name:"300-500"},{id:4,name:"500-1000"},{id:5,name:"1000-2000"},{id:6,name:"2000-5000"},{id:7,name:"5000以上"}]}},onLoad:function(){this.historySearchList=t.getStorageSync("historySearchList")||[],console.log(),this.url=i.default.URL;var e=this,n="get_gifts_article_list",s=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex});this.$utils.post(n,s).then((function(t){e.postList=t.rs,e.pageIndex++,e.postNumber+=t.rs.length,console.log("文章列表-首页",t.rs)}))},onPullDownRefresh:function(){this.postNumber=0,this.pageIndex=1;var e=this,n="get_gifts_article_list",i=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex});this.$utils.post(n,i).then((function(n){setTimeout((function(){t.stopPullDownRefresh()}),500),e.pageIndex++,e.postList=n.rs,e.isAll=!1,e.postNumber+=n.rs.length,console.log("文章列表-刷新",n.rs)}))},onReachBottom:function(){var t=this,e="get_gifts_article_list",n=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex});this.$utils.post(e,n).then((function(e){e.rs.length>0?(t.postList=t.postList.concat(e.rs),t.pageIndex++,t.postNumber+=e.rs.length,console.log("文章列表-下一页",e.rs)):(console.log("文章列表-全部加载"),t.isAll=!0)}))},methods:{search:function(){var e=this.Key.replace(/[ ]/g,"");e?(s.default.track("search",{keyword:e}),this.historySearchList.push(e),t.setStorageSync("historySearchList",this.historySearchList),console.log(this.historySearchList),t.navigateTo({url:"../product-list/product-list?type=search&key="+e})):t.showToast({icon:"none",title:"请输入搜索内容"})},searchKey:function(e){s.default.track("search",{keyword:e}),t.navigateTo({url:"../product-list/product-list?type=search&key="+e})},daleteHistory:function(){this.historySearchList=[],t.setStorageSync("historySearchList",this.historySearchList)},goToScrollTop:function(){t.pageScrollTo({scrollTop:0,duration:1e3})},clickHandler:function(t){var e=t.currentTarget.dataset.index;this.indexCurrent=e},clickPopUp:function(t){var e=t.currentTarget.dataset.index;this.indexCurrent=e,this.$refs["popupSearch"].open()},change:function(t){},bindPickerChange:function(t){console.log("picker发送选择改变，携带值为",t.currentTarget.dataset.index),this.indexPicker=t.currentTarget.dataset.index,this.$refs["popupSearch"].close()}},computed:{hasHot:function(){return this.hotSearchList.length>0},hasHistory:function(){return this.historySearchList.length>0}}};e.default=a}).call(this,n("543d")["default"])},"9b3b":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"f3d2"))}},s=function(){var t=this,e=t.$createElement;t._self._c},o=[]},a8f4:function(t,e,n){},d341:function(t,e,n){"use strict";var i=n("a8f4"),s=n.n(i);s.a}},[["1cbd","common/runtime","common/vendor"]]]);