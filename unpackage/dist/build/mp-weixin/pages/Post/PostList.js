(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Post/PostList"],{"21ad":function(t,e,n){"use strict";n.r(e);var i=n("34f0"),o=n("73ba");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("586d");var u,a=n("f0c5"),r=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=r.exports},"343b":function(t,e,n){},"34f0":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"586d":function(t,e,n){"use strict";var i=n("343b"),o=n.n(i);o.a},6e3:function(t,e,n){"use strict";(function(t){n("334b");i(n("66fd"));var e=i(n("21ad"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"73ba":function(t,e,n){"use strict";n.r(e);var i=n("f0a5"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},f0a5:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i(n("e2fe"));function i(t){return t&&t.__esModule?t:{default:t}}var o=function(){n.e("components/own-components/post-product").then(function(){return resolve(n("dd8b"))}.bind(null,n)).catch(n.oe)},s={components:{"post-product":o},data:function(){return{isAll:!1,pageSize:10,pageIndex:1,postList:[],statusBarHeight:"20"}},onLoad:function(){this.getProductList(1),this.statusBarHeight=t.getSystemInfoSync().statusBarHeight},onPullDownRefresh:function(){this.getProductList(1),setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){this.getProductList(2)},computed:{statusBarHeight:function(){return t.getSystemInfoSync().statusBarHeight}},methods:{goToPost:function(e){console.log(e),t.navigateTo({url:"./Post?id="+e})},goToSearch:function(){t.navigateTo({url:"./PostSearch"})},getProductList:function(e){1==e&&(this.pageIndex=1);var n=this,i="get_gifts_article_list",o="article",s=t.getStorageSync("id"),u=JSON.stringify({pageSize:this.pageSize,pageIndex:this.pageIndex,memberid:s});this.$utils.postNew(i,u,o).then((function(t){1==e?(n.pageIndex++,n.postList=t.rs,n.isAll=!1):t.rs.length>0?(n.postList=n.postList.concat(t.rs),n.pageIndex++):n.isAll=!0}))},clickLike:function(e,n,i){var o=this,s="set_article_live_number",u="article",a=t.getStorageSync("id"),r=JSON.stringify({number:1,article_id:e,memberid:a,set_status:"1"==i?"2":"1"});this.$utils.postNew(s,r,u).then((function(t){if(1==t.sta)if(1==i){var e=o.postList[n];e.live_number--,e.is_collect=2,o.postList=o.postList}else{var s=o.postList[n];s.live_number++,s.is_collect=1,o.postList=o.postList}}))}}};e.default=s}).call(this,n("543d")["default"])}},[["6000","common/runtime","common/vendor"]]]);