(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!*****************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/main.js ***!
  \*****************************************************************/
/*! no static exports found */function(n,t,e){"use strict";(function(n){e(/*! uni-pages */4);var t=i(e(/*! vue */2)),r=i(e(/*! ./App */5)),o=i(e(/*! ./wxcomponents/navgation/navgation.vue */17)),u=e(/*! ./common/btn */24),c=i(e(/*! ./common/utils */8)),a=i(e(/*! sr-sdk-wxapp */25));function i(n){return n&&n.__esModule?n:{default:n}}function f(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function d(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?f(Object(e),!0).forEach((function(t){l(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):f(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function l(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var s=function(){Promise.all(/*! require.ensure | components/simple-address/simple-address */[e.e("common/vendor"),e.e("components/simple-address/simple-address")]).then(function(){return resolve(e(/*! ./components/simple-address/simple-address.vue */741))}.bind(null,e)).catch(e.oe)};t.default.prototype.$buttonClick=u.buttonClick,t.default.prototype.$utils=c.default,t.default.config.productionTip=!1,t.default.component("Navgation",o.default),t.default.component("Address",s),r.default.mpType="app",a.default.init({token:"bie68b7781dc3f49f4",appid:"wx9c53a99b078435f5",usePlugin:!1,debug:!0,proxyPage:!0,proxyComponent:!0,openSdkShareDepth:!0,autoTrack:!0,openAutoTrackOpenId:!0});var p=new t.default(d(d({},r.default),{},{sr:a.default}));n(p).$mount()}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!*****************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/App.vue ***!
  \*****************************************************************/
/*! no static exports found */,function(n,t,e){"use strict";e.r(t);var r=e(/*! ./App.vue?vue&type=script&lang=js& */6);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);e(/*! ./App.vue?vue&type=style&index=0&lang=css& */14);var u,c,a,i,f=e(/*! ../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */16),d=Object(f["default"])(r["default"],u,c,!1,null,null,null,!1,a,i);d.options.__file="App.vue",t["default"]=d.exports},
/*!******************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/App.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/user/zhjian20210728/devzhijian/zhijianliwu/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(e(/*! ./common/utils.js */8));function r(n){return n&&n.__esModule?n:{default:n}}var o={onLaunch:function(){if(n.canIUse("getUpdateManager")){var t=n.getUpdateManager();t.onCheckForUpdate((function(e){e.hasUpdate&&(t.onUpdateReady((function(){n.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(n){n.confirm&&t.applyUpdate()}})})),t.onUpdateFailed((function(){n.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else n.showModal({title:"提示",content:"当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"})},onShow:function(){},onHide:function(){}};t.default=o}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},,,,,,
/*!**************************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/App.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */,function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */15),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/user/zhjian20210728/devzhijian/zhijianliwu/App.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){},
/*!**********************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue ***!
  \**********************************************************************************************/
/*! no static exports found */,function(n,t,e){"use strict";e.r(t);var r=e(/*! ./navgation.vue?vue&type=template&id=04c0286e& */18),o=e(/*! ./navgation.vue?vue&type=script&lang=js& */20);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);e(/*! ./navgation.vue?vue&type=style&index=0&lang=css& */22);var c,a=e(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */16),i=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],c);i.options.__file="wxcomponents/navgation/navgation.vue",t["default"]=i.exports},
/*!*****************************************************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=template&id=04c0286e& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./navgation.vue?vue&type=template&id=04c0286e& */19);e.d(t,"render",(function(){return r["render"]})),e.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),e.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),e.d(t,"components",(function(){return r["components"]}))},
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=template&id=04c0286e& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(n,t,e){"use strict";var r;e.r(t),e.d(t,"render",(function(){return o})),e.d(t,"staticRenderFns",(function(){return c})),e.d(t,"recyclableRender",(function(){return u})),e.d(t,"components",(function(){return r}));var o=function(){var n=this,t=n.$createElement;n._self._c},u=!1,c=[];o._withStripped=!0},
/*!***********************************************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./navgation.vue?vue&type=script&lang=js& */21),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={props:{fixed:0,height:"",logo:""},data:function(){return{}},onLoad:function(n){},methods:{}};t.default=r},
/*!*******************************************************************************************************************************!*\
  !*** /Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */function(n,t,e){"use strict";e.r(t);var r=e(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./navgation.vue?vue&type=style&index=0&lang=css& */23),o=e.n(r);for(var u in r)"default"!==u&&function(n){e.d(t,n,(function(){return r[n]}))}(u);t["default"]=o.a},
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/user/zhjian20210728/devzhijian/zhijianliwu/wxcomponents/navgation/navgation.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(n,t,e){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map