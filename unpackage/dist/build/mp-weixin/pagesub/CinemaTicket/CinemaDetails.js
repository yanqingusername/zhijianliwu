(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaDetails"],{"0407":function(i,e,t){"use strict";t.r(e);var n=t("43c1"),s=t("5d4e");for(var o in s)"default"!==o&&function(i){t.d(e,i,(function(){return s[i]}))}(o);t("90c6");var a,m=t("f0c5"),c=Object(m["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=c.exports},"43c1":function(i,e,t){"use strict";var n;t.d(e,"b",(function(){return s})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return n}));var s=function(){var i=this,e=i.$createElement;i._self._c},o=[]},"5d4e":function(i,e,t){"use strict";t.r(e);var n=t("ec04"),s=t.n(n);for(var o in n)"default"!==o&&function(i){t.d(e,i,(function(){return n[i]}))}(o);e["default"]=s.a},"90c6":function(i,e,t){"use strict";var n=t("ad74"),s=t.n(n);s.a},ad74:function(i,e,t){},ec04:function(i,e,t){"use strict";(function(i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{cinemaid:"",date:"",movieId:"",indicatorDots:!1,autoplay:!1,previousMargin:"148px",nextMargin:"148px",circular:!0,swiperCurrentIndex:0,itemsTime:[],timeIndex:0,cinemaInfo:"",moviesList:[],movieInfo:"",showsLsit:[]}},onLoad:function(i){this.cinemaid=i.cinemaid,this.date=i.date,this.movieId=i.movieId,this.movieId&&this.date?(this.getFilmCinemaMovies(1),this.getFilmShowList()):this.getFilmCinemaMovies(2)},methods:{getFilmCinemaMovies:function(i){var e=this,t="get_film_cinema_movies",n="films",s=JSON.stringify({cinemaId:e.cinemaid});this.$utils.postNew(t,s,n).then((function(t){if(1==t.sta)if(e.cinemaInfo=t.rs.cinemaInfo,e.moviesList=t.rs.movies,1==i){if(e.moviesList.length>0)for(var n in e.moviesList)e.moviesList[n].movieId==e.movieId&&(e.movieId=e.moviesList[n].movieId,e.swiperCurrentIndex=n,e.movieInfo=e.moviesList[n])}else e.moviesList.length>0&&(e.movieId=e.moviesList[0].movieId,e.swiperCurrentIndex=0,e.movieInfo=e.moviesList[0],e.date=e.moviesList[0].publishDate,e.getFilmShowList())}))},getFilmShowList:function(){var i=this,e="get_film_show_list",t="films",n=JSON.stringify({cinemaId:i.cinemaid,movieId:i.movieId,date:i.date});this.$utils.postNew(e,n,t).then((function(e){if(1==e.sta)for(var t in i.itemsTime=e.rs.dates_list,i.showsLsit=e.rs.shows,i.itemsTime)i.itemsTime[t].date==i.date&&(i.date=i.itemsTime[t].date,i.timeIndex=t)}))},change:function(i){for(var e in this.swiperCurrentIndex=i.detail.current,this.movieId=this.moviesList[this.swiperCurrentIndex].movieId,this.moviesList)this.moviesList[e].movieId==this.movieId&&(this.movieId=this.moviesList[e].movieId,this.swiperCurrentIndex=e,this.movieInfo=this.moviesList[e]);this.getFilmShowList()},clickTime:function(i){this.timeIndex=i.currentTarget.dataset.timeindex,this.date=i.currentTarget.dataset.date,this.getFilmShowList()},clickBuy:function(e){var t=e.currentTarget.dataset.showid;i.navigateTo({url:"/pagesub/CinemaTicket/CinemaSeatSelect?showId=".concat(t,"&cinemaName=").concat(this.cinemaInfo.cinemaName)})},clickAdress:function(){i.openLocation({latitude:this.cinemaInfo.latitude,longitude:this.cinemaInfo.longitude,name:this.cinemaInfo.cinemaName,success:function(){console.log("success")}})}}};e.default=t}).call(this,t("543d")["default"])},ff97:function(i,e,t){"use strict";(function(i){t("334b");n(t("66fd"));var e=n(t("0407"));function n(i){return i&&i.__esModule?i:{default:i}}i(e.default)}).call(this,t("543d")["createPage"])}},[["ff97","common/runtime","common/vendor"]]]);