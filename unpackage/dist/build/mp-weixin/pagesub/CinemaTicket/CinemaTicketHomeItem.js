(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHomeItem"],{1263:function(t,i,e){"use strict";e.r(i);var n=e("379b"),s=e("4c43");for(var a in s)"default"!==a&&function(t){e.d(i,t,(function(){return s[t]}))}(a);e("bd2e");var o,r=e("f0c5"),d=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);i["default"]=d.exports},"2bdc":function(t,i,e){},"379b":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}));var s=function(){var t=this,i=t.$createElement;t._self._c},a=[]},"4c43":function(t,i,e){"use strict";e.r(i);var n=e("ffdf"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=s.a},bd2e:function(t,i,e){"use strict";var n=e("2bdc"),s=e.n(n);s.a},d2da:function(t,i,e){"use strict";(function(t){e("334b");n(e("66fd"));var i=n(e("1263"));function n(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("543d")["createPage"])},ffdf:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{indxBrands:0,FilmCinemaBrands:[],indxRegion:0,FilmRegionsList:[],isRegions:!1,cityCode:"",regionCode:"",date:"",keywords:"",longitude:"",latitude:"",FilmCinemaList:[],pageSize:10,pageIndex:1,movieId:"",tabNumber:2,currTag:!1,cityname:"",isSearch:!1,itemsList:[{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"}],itemsTime:[],timeIndex:0,addressname:""}},onLoad:function(t){this.movieId=t.movieId,this.getAddress()},onShow:function(){this.cityname=t.getStorageSync("cityname"),this.cityCode=t.getStorageSync("cityCode"),this.getFilmMovieDatesInfo(),this.getFilmCinemaList(1),this.getFilmRegionsList(),this.getFilmCinemaBrands()},methods:{clickTime:function(t){this.timeIndex=t.currentTarget.dataset.timeindex,this.date=t.currentTarget.dataset.timedata,this.getFilmCinemaList(1)},onkeyword:function(t){this.keywords=t.detail.value},search:function(){var i=this.keywords.replace(/[ ]/g,"");i?(this.keywords=i,this.getFilmCinemaList(1)):t.showToast({icon:"none",title:"请输入搜索内容"})},clearKeyword:function(){this.keywords="",this.getFilmCinemaList(1)},clickSearch:function(){this.isSearch=!this.isSearch,this.currTag=!1},clickSelect:function(){this.currTag=!this.currTag,this.isRegions=!1},clickRegions:function(){this.isRegions=!this.isRegions,this.currTag=!1},setAddress:function(){var i=this;t.getLocation({type:"gcj02",success:function(t){i.getCityAddress(2,t.latitude,t.longitude)}})},getAddress:function(){var i=this;t.getLocation({type:"gcj02",success:function(t){i.getCityAddress(1,t.latitude,t.longitude)}})},getCityAddress:function(t,i,e){var n=this,s="get_city_info",a="filmset",o=JSON.stringify({latitude:i,longitude:e});this.$utils.postNew(s,o,a).then((function(s){1==s.sta&&(2==t&&(n.cityname=s.rs.address_component.city,n.cityCode=s.rs.cityCode,n.regionCode="",n.itemsTime.length>0&&(n.date=n.itemsTime[0].date),n.keywords=""),n.addressname=s.rs.address,n.longitude=e,n.latitude=i,n.getFilmCinemaList(1))}))},clickCinemaDetails:function(i){var e=i.currentTarget.dataset.cinemaid;t.navigateTo({url:"/pagesub/CinemaTicket/CinemaDetails?cinemaid=".concat(e,"&date=").concat(this.date,"&movieId=").concat(this.movieId)})},getFilmCinemaList:function(t){1==t&&(this.pageIndex=1);var i=this,e="get_film_movie_cinema_list",n="films",s=JSON.stringify({movieId:this.movieId,cityCode:this.cityCode,regionCode:this.regionCode,date:this.date,keywords:this.keywords,longitude:this.longitude,latitude:this.latitude,size:this.pageSize,page:this.pageIndex});this.$utils.postNew(e,s,n).then((function(e){1==t?(i.pageIndex++,i.FilmCinemaList=e.rs.list,i.isAll=!1):e.rs.list.length>0?(i.FilmCinemaList=i.FilmCinemaList.concat(e.rs.list),i.pageIndex++):i.isAll=!0}))},getFilmRegionsList:function(){var t=this,i="get_film_regions_list",e="films",n=JSON.stringify({cityCode:this.cityCode});this.$utils.postNew(i,n,e).then((function(i){t.FilmRegionsList=i.rs;var e={regionCode:"",regionName:"不限区域"};t.FilmRegionsList.unshift(e)}))},getFilmCinemaBrands:function(){var t=this,i="get_film_cinema_brands",e="films",n=JSON.stringify({});this.$utils.postNew(i,n,e).then((function(i){t.FilmCinemaBrands=i.rs;var e="全部";t.FilmCinemaBrands.unshift(e)}))},clickDetail:function(i){var e=i.currentTarget.dataset.url;t.navigateTo({url:e})},clickRegionCode:function(t){this.regionCode=t.currentTarget.dataset.regioncode,this.indxRegion=t.currentTarget.dataset.index,this.getFilmCinemaList(1)},clickBrands:function(t){this.keywords=t.currentTarget.dataset.brands,this.indxBrands=t.currentTarget.dataset.index,0==this.indxBrands&&(this.keywords=""),this.getFilmCinemaList(1)},clickClear:function(t){},getFilmMovieDatesInfo:function(){var i=this,e=JSON.stringify({cityCode:this.cityCode,movieId:this.movieId}),n="get_film_movie_dates_info",s="films";this.$utils.postNew(n,e,s).then((function(e){i.itemsTime=e.rs.dates_list,i.itemsTime.length>0&&(i.date=i.itemsTime[0].date),t.setNavigationBarTitle({title:e.rs.movieInfo.name})}))}},onPullDownRefresh:function(){this.getFilmCinemaList(1),setTimeout((function(){t.stopPullDownRefresh()}),500)},onReachBottom:function(){this.getFilmCinemaList(2)}};i.default=e}).call(this,e("543d")["default"])}},[["d2da","common/runtime","common/vendor"]]]);