(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/CBlessingCardShare"],{"4a1d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a"));a(n("e2fe"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,a,r,c){try{var i=t[r](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(o,a)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var c=t.apply(e,n);function i(t){r(c,o,a,i,s,"next",t)}function s(t){r(c,o,a,i,s,"throw",t)}i(void 0)}))}}var i=function(){Promise.all([n.e("common/vendor"),n.e("components/r-canvas/r-canvas")]).then(function(){return resolve(n("c910"))}.bind(null,n)).catch(n.oe)},s={components:{rCanvas:i},data:function(){return{posterUrl:"",QRcodeUrl:"",bgUrl:"",flowUrl:"",imageUrl:"",text:"",content:"",title:"",bg_icon:"https://zhijianlw.com/static/web/img/icon_card_share_2021_10_09_01.png"}},onLoad:function(e){var n=this,a=e.cardbag_number||"",r="get_cardbag_detail",i=t.getStorageSync("id"),s=JSON.stringify({cardbag_number:a,cardbag_detail_id:0,merberid:i});this.$utils.post(r,s).then((function(e){n.bgUrl=e.cardbag_theme.theme_background,n.flowUrl=e.cardbag_theme.customized_head_img,n.text=e.cardbag_theme.customized_call,n.content=e.cardbag_theme.zhufu_msg,n.title=e.cardbag_theme.customized_company,wx.getImageInfo({src:n.flowUrl,success:function(t){var e=76*t.width/t.height;n.coverWidth=parseInt(e/2),n.coverWidth<38&&(n.coverWidth=38)},fail:function(t){console.log(t)}}),t.showToast({title:"生成中",icon:"loading"});var r="get_haibao",i=JSON.stringify({scene:a,page:"pages/shopping/CBlessingCardWe"});n.$utils.post(r,i).then((function(t){console.log(t),n.QRcodeUrl=t.dir,console.log("QRcodeUrl:",n.QRcodeUrl)})).then((function(e){n.$nextTick(c(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$refs.rCanvas.init({canvas_id:"rCanvas",canvas_width:375,canvas_height:638,hidden:!0,showType:1});case 2:return e.next=4,n.$refs.rCanvas.drawImage({url:n.bgUrl,x:0,y:0,w:375,h:638}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 4:return e.next=6,n.$refs.rCanvas.drawImage({url:n.flowUrl,x:42,y:170,w:n.coverWidth,h:38}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 6:return e.next=8,n.$refs.rCanvas.drawText({text:n.text,x:42,y:225,font_color:"#575D65",font_size:12,max_width:200}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 8:return e.next=10,n.$refs.rCanvas.drawText({text:n.content,x:42,y:250,font_color:"#575D65",font_size:12,max_width:295,line_clamp:4,line_height:30,is_line_break:!0}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 10:return e.next=12,n.$refs.rCanvas.drawText({text:n.title,x:335,y:370,font_color:"#575D65",font_size:12,max_width:280,text_align:"right"}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 12:return e.next=14,n.$refs.rCanvas.drawImage({url:n.bg_icon,x:0,y:497,w:375,h:141}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 14:return e.next=16,n.$refs.rCanvas.drawImage({url:n.QRcodeUrl,x:145,y:490,w:92,h:92,radius:12,border_color:"#F7E8CB",border_width:6,is_radius:!0}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 16:return e.next=18,n.$refs.rCanvas.drawText({text:"长按小程序二维码领取礼物",x:85,y:610,font_color:"#B58D3D",font_size:14}).catch((function(e){t.showToast({title:e,icon:"none"})}));case 18:return e.next=20,n.$refs.rCanvas.draw((function(e){t.hideLoading(),n.posterUrl=e.tempFilePath}));case 20:case"end":return e.stop()}}),e)}))))}))}))},methods:{down:function(e){t.saveImageToPhotosAlbum({filePath:this.posterUrl,success:function(e){t.showToast({title:"图片已保存",icon:"none"})},fail:function(e){"saveImageToPhotosAlbum:fail:auth denied"!==e.errMsg&&"saveImageToPhotosAlbum:fail auth deny"!==e.errMsg&&"saveImageToPhotosAlbum:fail authorize no response"!==e.errMsg||t.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(e){t.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]}})}})}})}}};e.default=s}).call(this,n("543d")["default"])},"63ae":function(t,e,n){},"748c":function(t,e,n){"use strict";var o=n("63ae"),a=n.n(o);a.a},8572:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={rCanvas:function(){return Promise.all([n.e("common/vendor"),n.e("components/r-canvas/r-canvas")]).then(n.bind(null,"c910"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$utils.imageUrl(t.posterUrl));t.$mp.data=Object.assign({},{$root:{g0:n}})},r=[]},bfb3:function(t,e,n){"use strict";(function(t){n("334b");o(n("66fd"));var e=o(n("ebfc"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},da43:function(t,e,n){"use strict";n.r(e);var o=n("4a1d"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},ebfc:function(t,e,n){"use strict";n.r(e);var o=n("8572"),a=n("da43");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("748c");var c,i=n("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=s.exports}},[["bfb3","common/runtime","common/vendor"]]]);