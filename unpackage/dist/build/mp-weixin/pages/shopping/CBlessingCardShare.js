(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/CBlessingCardShare"],{"4a1d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a"));a(n("e2fe"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,a,r,s){try{var c=t[r](s),i=c.value}catch(u){return void n(u)}c.done?e(i):Promise.resolve(i).then(o,a)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var s=t.apply(e,n);function c(t){r(s,o,a,c,i,"next",t)}function i(t){r(s,o,a,c,i,"throw",t)}c(void 0)}))}}var c=function(){Promise.all([n.e("common/vendor"),n.e("components/r-canvas/r-canvas")]).then(function(){return resolve(n("c910"))}.bind(null,n)).catch(n.oe)},i={components:{rCanvas:c},data:function(){return{posterUrl:"",QRcodeUrl:"",bgUrl:"",flowUrl:"",imageUrl:"",text:"",content:"",title:""}},onLoad:function(e){var n=this,a=e.cardbag_number||"",r="get_theme_type_by_customized",c="zhufu",i=t.getStorageSync("id"),u=JSON.stringify({memberid:i});this.$utils.postNew(r,u,c).then((function(e){n.bgUrl=e.rs.default_theme_background,n.flowUrl=e.rs.customized_head_img,n.text=e.rs.customized_call,n.content=e.rs.customized_zhufu,n.title=e.rs.customized_company,t.showToast({title:"生成中",icon:"loading"});var r="get_haibao",c=JSON.stringify({scene:a,page:"pages/shopping/CBlessingCardWe"});n.$utils.post(r,c).then((function(t){console.log(t),n.QRcodeUrl=t.dir,console.log("QRcodeUrl:",n.QRcodeUrl)})).then((function(e){n.$nextTick(s(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$refs.rCanvas.init({canvas_id:"rCanvas",canvas_width:375,canvas_height:650,hidden:!0,showType:1});case 2:return e.next=4,n.$refs.rCanvas.drawImage({url:n.bgUrl,x:0,y:0,w:375,h:638}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 4:return e.next=6,n.$refs.rCanvas.drawImage({url:n.flowUrl,x:42,y:170,w:38,h:38}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 6:return e.next=8,n.$refs.rCanvas.drawText({text:n.text,x:42,y:225,font_color:"#575D65",font_size:12,max_width:200}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 8:return e.next=10,n.$refs.rCanvas.drawText({text:n.content,x:42,y:250,font_color:"#575D65",font_size:12,max_width:280,line_clamp:4,line_height:30,is_line_break:!0}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 10:return e.next=12,n.$refs.rCanvas.drawText({text:n.title,x:182,y:370,font_color:"#575D65",font_size:12,max_width:280}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 12:return e.next=14,n.$refs.rCanvas.drawImage({url:n.QRcodeUrl,x:145,y:500,w:100,h:100,radius:12,is_radius:!0}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 14:return e.next=16,n.$refs.rCanvas.drawText({text:"长按小程序二维码领识别",x:120,y:620,font_color:"#000000",font_size:14}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 16:return e.next=18,n.$refs.rCanvas.draw((function(e){t.hideLoading(),n.posterUrl=e.tempFilePath}));case 18:case"end":return e.stop()}}),e)}))))}))}))},methods:{down:function(e){t.saveImageToPhotosAlbum({filePath:this.posterUrl,success:function(e){t.showToast({title:"图片已保存",icon:"none"})},fail:function(e){"saveImageToPhotosAlbum:fail:auth denied"!==e.errMsg&&"saveImageToPhotosAlbum:fail auth deny"!==e.errMsg&&"saveImageToPhotosAlbum:fail authorize no response"!==e.errMsg||t.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(e){t.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]}})}})}})}}};e.default=i}).call(this,n("543d")["default"])},"63ae":function(t,e,n){},"748c":function(t,e,n){"use strict";var o=n("63ae"),a=n.n(o);a.a},bfb3:function(t,e,n){"use strict";(function(t){n("334b");o(n("66fd"));var e=o(n("ebfc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d9dd:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={rCanvas:function(){return Promise.all([n.e("common/vendor"),n.e("components/r-canvas/r-canvas")]).then(n.bind(null,"c910"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$utils.imageUrl(t.posterUrl));t.$mp.data=Object.assign({},{$root:{g0:n}})},r=[]},da43:function(t,e,n){"use strict";n.r(e);var o=n("4a1d"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},ebfc:function(t,e,n){"use strict";n.r(e);var o=n("d9dd"),a=n("da43");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("748c");var s,c=n("f0c5"),i=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=i.exports}},[["bfb3","common/runtime","common/vendor"]]]);