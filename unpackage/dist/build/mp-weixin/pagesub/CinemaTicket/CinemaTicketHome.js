(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/CinemaTicket/CinemaTicketHome"],{"05c9":function(t,e,i){"use strict";i.r(e);var n=i("43d5"),r=i("1d44");for(var c in r)"default"!==c&&function(t){i.d(e,t,(function(){return r[t]}))}(c);i("b6cc");var o,u=i("f0c5"),a=Object(u["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=a.exports},"1d44":function(t,e,i){"use strict";i.r(e);var n=i("b422"),r=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=r.a},"43d5":function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var n={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"f3d2"))}},r=function(){var t=this,e=t.$createElement,i=(t._self._c,(0==t.tabNumber||1==t.tabNumber)&&t.swiper.length>0?t.__map(t.swiper,(function(e,i){var n=t.__get_orig(e),r=t.$utils.imageUrl(e.banner);return{$orig:n,g0:r}})):null);t.$mp.data=Object.assign({},{$root:{l0:i}})},c=[]},b422:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{tabNumber:2,currTag:!1,cityname:"北京",swiper:[],swiperCurrentIndex:0,autoplay:!0,interval:2e3,duration:500,isSearch:!1,cthList:[{id:1,title:"失控玩家",score:"9.2",name:"肖恩·维利",name1:"瑞安·雷诺兹 朱迪·科默",time:"2021-09-30上映",status:"1",itemList:[{title:"影城卡特惠¥19.9",color:"#39B498"},{title:"特惠票",color:"#FF5B40"},{title:"可改签",color:"#427DE5"},{title:"杜比影院",color:"#DDDDDD"}]},{id:1,title:"失控玩家",score:"9.2",name:"肖恩·维利",name1:"瑞安·雷诺兹 朱迪·科默",time:"2021-09-30上映",status:"2",itemList:[{title:"影城卡特惠¥19.9",color:"#39B498"},{title:"特惠票",color:"#FF5B40"},{title:"可改签",color:"#427DE5"},{title:"杜比影院",color:"#DDDDDD"}]},{id:1,title:"失控玩家",score:"9.2",name:"肖恩·维利",name1:"瑞安·雷诺兹 朱迪·科默",time:"2021-09-30上映",status:"1",itemList:[{title:"影城卡特惠¥19.9",color:"#39B498"},{title:"特惠票",color:"#FF5B40"},{title:"可改签",color:"#427DE5"},{title:"杜比影院",color:"#DDDDDD"}]},{id:1,title:"失控玩家",score:"9.2",name:"肖恩·维利",name1:"瑞安·雷诺兹 朱迪·科默",time:"2021-09-30上映",status:"3",itemList:[{title:"影城卡特惠¥19.9",color:"#39B498"},{title:"特惠票",color:"#FF5B40"},{title:"可改签",color:"#427DE5"},{title:"杜比影院",color:"#DDDDDD"}]},{id:1,title:"失控玩家",score:"9.2",name:"肖恩·维利",name1:"瑞安·雷诺兹 朱迪·科默",time:"2021-09-30上映",status:"1"}],itemsList:[{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"},{title:"IMAX厅"}]}},onLoad:function(e){var i=this,n=this,r=JSON.stringify({a:0}),c="get_banner";this.$utils.post(c,r).then((function(t){console.log("轮播图：",t),i.swiper=t.rs})),t.getLocation({type:"wgs84",success:function(t){n.getCityAddress(t.latitude,t.longitude)}})},methods:{clickTabs:function(t){this.tabNumber=t.currentTarget.dataset.tabnumber,this.currTag=!1},changeswiper:function(t){var e=t.detail,i=(e.current,e.source);"autoplay"!==i&&"touch"!==i||(this.swiperCurrentIndex=t.detail.current)},clickSearch:function(){this.isSearch=!this.isSearch,this.currTag=!1},clickSelect:function(){this.currTag=!this.currTag},getCityAddress:function(t,e){var i=this,n="get_city_info",r="sms",c=JSON.stringify({latitude:t,longitude:e});this.$utils.postNew(n,c,r).then((function(t){1==t.sta&&(console.log(t.rs),i.cityname=t.rs.addressComponent.city,console.log(i.cityname))}))}}};e.default=i}).call(this,i("543d")["default"])},b6cc:function(t,e,i){"use strict";var n=i("c9ca"),r=i.n(n);r.a},c28f:function(t,e,i){"use strict";(function(t){i("334b");n(i("66fd"));var e=n(i("05c9"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},c9ca:function(t,e,i){}},[["c28f","common/runtime","common/vendor"]]]);