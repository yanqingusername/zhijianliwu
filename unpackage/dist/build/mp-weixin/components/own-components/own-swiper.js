(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/own-components/own-swiper"],{"10bf":function(n,t,e){},"21b0":function(n,t,e){"use strict";e.r(t);var r=e("a5a3"),a=e("db6b");for(var u in a)"default"!==u&&function(n){e.d(t,n,(function(){return a[n]}))}(u);e("c5cd");var i,o=e("f0c5"),c=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=c.exports},a5a3:function(n,t,e){"use strict";var r;e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return r}));var a=function(){var n=this,t=n.$createElement,e=(n._self._c,n.swiper.length>0?n.__map(n.swiper,(function(t,e){var r=n.__get_orig(t),a=n.$utils.imageUrl(t.banner);return{$orig:r,g0:a}})):null);n.$mp.data=Object.assign({},{$root:{l0:e}})},u=[]},a9c6:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:["swiper"],data:function(){return{swiperCurrentIndex:0}},methods:{change:function(n){this.swiperCurrentIndex=n.detail.current},bannerJump:function(t,e){console.log(t,e),"gifts_article"==t&&n.navigateTo({url:"/pages/Post/Post?id="+e}),"goods"==t&&n.navigateTo({url:"/pages/details/details?keynum="+e})}},computed:{isOne:function(){return!(this.swiper.length<=1)}}};t.default=e}).call(this,e("543d")["default"])},c5cd:function(n,t,e){"use strict";var r=e("10bf"),a=e.n(r);a.a},db6b:function(n,t,e){"use strict";e.r(t);var r=e("a9c6"),a=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/own-components/own-swiper-create-component',
    {
        'components/own-components/own-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("21b0"))
        })
    },
    [['components/own-components/own-swiper-create-component']]
]);
