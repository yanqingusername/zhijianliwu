(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHome"],{"05c9":function(t,i,e){"use strict";e.r(i);var n=e("168d"),s=e("1d44");for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("b6cc");var o,r=e("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=c.exports},"168d":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}));var s=function(){var t=this,i=t.$createElement;t._self._c},a=[]},"1d44":function(t,i,e){"use strict";e.r(i);var n=e("b422"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},b422:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{indxBrands:0,FilmCinemaBrands:[],indxRegion:0,FilmRegionsList:[],isRegions:!1,cityCode:"",regionCode:"",date:"",keywords:"",longitude:"",latitude:"",FilmCinemaList:[],pageSize:10,pageIndex:1,tabNumber:0,currTag:!1,cityname:"北京",swiper:[],swiperCurrentIndex:0,autoplay:!0,interval:2e3,duration:500,isSearch:!1,cthList:[],itemsList:[{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"}],flag:0,slide_up:""}},onLoad:function(i){var e=this,n=this,s=JSON.stringify({a:0}),a="get_film_atlas",o="filmset";this.$utils.postNew(a,s,o).then((function(t){console.log("轮播图：",t),e.swiper=t.rs})),t.getLocation({type:"gcj02",success:function(t){n.getCityAddress(t.latitude,t.longitude)}}),this.getFilmmovielist(1)},onShow:function(){0==this.tabNumber||1==this.tabNumber||(this.cityname=t.getStorageSync("cityname"),this.cityCode=t.getStorageSync("cityCode"),this.getFilmCinemaList(1)),this.getFilmCinemaBrands(),this.cityCode&&this.getFilmRegionsList()},methods:{clickTabs:function(t){this.tabNumber=t.currentTarget.dataset.tabnumber,this.currTag=!1,0==this.tabNumber||1==this.tabNumber?this.getFilmmovielist(1):this.getFilmCinemaList(1)},changeswiper:function(t){var i=t.detail,e=(i.current,i.source);"autoplay"!==e&&"touch"!==e||(this.swiperCurrentIndex=t.detail.current)},onkeyword:function(t){this.keywords=t.detail.value},search:function(){var i=this.keywords.replace(/[ ]/g,"");i?(this.keywords=i,this.getFilmCinemaList(1)):t.showToast({icon:"none",title:"请输入搜索内容"})},clearKeyword:function(){this.keywords="",this.getFilmCinemaList(1)},clickSearch:function(){this.isSearch=!this.isSearch,this.currTag=!1},clickSelect:function(){this.currTag=!this.currTag,this.isRegions=!1},clickRegions:function(){this.isRegions=!this.isRegions,this.currTag=!1},getCityAddress:function(i,e){var n=this,s="get_city_info",a="filmset",o=JSON.stringify({latitude:i,longitude:e});this.$utils.postNew(s,o,a).then((function(s){1==s.sta&&(n.cityname=s.rs.addressComponent.city,n.cityCode=s.rs.cityCode,n.longitude=e,n.latitude=i,t.setStorageSync("cityname",n.cityname),t.setStorageSync("cityCode",n.cityCode),n.getFilmRegionsList())}))},getFilmmovielist:function(t){1==t&&(this.pageIndex=1);var i=this,e="get_film_movie_list",n="films",s=JSON.stringify({type:this.tabNumber,size:this.pageSize,page:this.pageIndex});this.$utils.postNew(e,s,n).then((function(e){1==t?(i.pageIndex++,i.cthList=e.rs.list,i.isAll=!1):e.rs.list.length>0?(i.cthList=i.cthList.concat(e.rs.list),i.pageIndex++):i.isAll=!0}))},getFilmCinemaList:function(t){1==t&&(this.pageIndex=1);var i=this,e="get_film_cinema_list",n="films",s=JSON.stringify({cityCode:this.cityCode,regionCode:this.regionCode,date:this.date,keywords:this.keywords,longitude:this.longitude,latitude:this.latitude,size:this.pageSize,page:this.pageIndex});this.$utils.postNew(e,s,n).then((function(e){1==t?(i.pageIndex++,i.FilmCinemaList=e.rs.list,i.isAll=!1):e.rs.list.length>0?(i.FilmCinemaList=i.FilmCinemaList.concat(e.rs.list),i.pageIndex++):i.isAll=!0}))},getFilmRegionsList:function(){var t=this,i="get_film_regions_list",e="films",n=JSON.stringify({cityCode:this.cityCode});this.$utils.postNew(i,n,e).then((function(i){t.FilmRegionsList=i.rs;var e={regionCode:"",regionName:"不限区域"};t.FilmRegionsList.length>0&&t.FilmRegionsList.unshift(e)}))},getFilmCinemaBrands:function(){var t=this,i="get_film_cinema_brands",e="films",n=JSON.stringify({});this.$utils.postNew(i,n,e).then((function(i){t.FilmCinemaBrands=i.rs;var e="全部";t.FilmCinemaBrands.unshift(e)}))},clickDetail:function(i){var e=i.currentTarget.dataset.url;t.navigateTo({url:e})},clickRegionCode:function(t){this.regionCode=t.currentTarget.dataset.regioncode,this.indxRegion=t.currentTarget.dataset.index,this.getFilmCinemaList(1)},clickBrands:function(t){this.keywords=t.currentTarget.dataset.brands,this.indxBrands=t.currentTarget.dataset.index,0==this.indxBrands&&(this.keywords=""),this.getFilmCinemaList(1)},clickClear:function(t){},clickLike:function(i){var e=i.currentTarget.dataset.movieid,n=this,s="set_film_like",a="filmset",o=t.getStorageSync("id"),r=JSON.stringify({movieId:e,memberid:o});this.$utils.postNew(s,r,a).then((function(t){1==t.sta&&n.getFilmCinemaList(1)}))},clickMyOrder:function(){t.navigateTo({url:"/pagesub/CinemaTicket/CinemaTicketOrderList"})},handletouchmove:function(t){console.log(t),0===this.flag&&this.fadeOut()},handletouchstart:function(t){},handletouchend:function(t){this.flag=0,this.fadeIn()},fadeIn:function(){var t=wx.createAnimation({duration:400,timingType:"ease"});this.animation=t,t.opacity(1).step(),t.translateY(0).step(),this.slide_up=t.export()},fadeOut:function(){var t=wx.createAnimation({duration:400,timingType:"ease"});this.animation=t,t.translateY(40).step(),t.opacity(0).step(),this.slide_up=t.export()}},onPullDownRefresh:function(){0==this.tabNumber||1==this.tabNumber?this.getFilmmovielist(1):this.getFilmCinemaList(1),setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){0==this.tabNumber||1==this.tabNumber?this.getFilmmovielist(2):this.getFilmCinemaList(2)}};i.default=e}).call(this,e("543d")["default"])},b6cc:function(t,i,e){"use strict";var n=e("c9ca"),s=e.n(n);s.a},c28f:function(t,i,e){"use strict";(function(t){e("334b");n(e("66fd"));var i=n(e("05c9"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},c9ca:function(t,i,e){}},[["c28f","common/runtime","common/vendor"]]]);