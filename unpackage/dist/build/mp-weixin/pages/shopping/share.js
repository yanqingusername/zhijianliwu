(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/share"],{4554:function(n,t,e){"use strict";e.r(t);var o=e("e75f"),a=e("ee1e");for(var s in a)"default"!==s&&function(n){e.d(t,n,(function(){return a[n]}))}(s);e("4c4d");var r,i=e("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=c.exports},"4c4d":function(n,t,e){"use strict";var o=e("ffc7"),a=e.n(o);a.a},"797a":function(n,t,e){"use strict";(function(n){e("334b");o(e("66fd"));var t=o(e("4554"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},e75f:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return o}));var o={rCanvas:function(){return Promise.all([e.e("common/vendor"),e.e("components/r-canvas/r-canvas")]).then(e.bind(null,"c910"))}},a=function(){var n=this,t=n.$createElement,e=(n._self._c,n.$utils.imageUrl(n.posterUrl));n.$mp.data=Object.assign({},{$root:{g0:e}})},s=[]},ee1e:function(n,t,e){"use strict";e.r(t);var o=e("f315"),a=e.n(o);for(var s in o)"default"!==s&&function(n){e.d(t,n,(function(){return o[n]}))}(s);t["default"]=a.a},f315:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(e("a34a")),a=s(e("e2fe"));function s(n){return n&&n.__esModule?n:{default:n}}function r(n,t,e,o,a,s,r){try{var i=n[s](r),c=i.value}catch(l){return void e(l)}i.done?t(c):Promise.resolve(c).then(o,a)}function i(n){return function(){var t=this,e=arguments;return new Promise((function(o,a){var s=n.apply(t,e);function i(n){r(s,o,a,i,c,"next",n)}function c(n){r(s,o,a,i,c,"throw",n)}i(void 0)}))}}var c=function(){Promise.all([e.e("common/vendor"),e.e("components/r-canvas/r-canvas")]).then(function(){return resolve(e("c910"))}.bind(null,e)).catch(e.oe)},l={components:{rCanvas:c},data:function(){return{gift:[],gifts:[],keynum:"keynum",QRcodeUrl:"",imageUrl:"",goodsname:"",cost_price:"",posterUrl:"",url:"",com:1,length:0,bgUrl:"https://zhijianlw.com/static/web/img/gift_hb_09_01.png",flowUrl:"https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png",goodsname1:"",imageUrl1:"",goodsnum1:"",nickname:"",goods_count_num:0}},onLoad:function(t){var e=this;this.nickname=n.getStorageSync("name"),this.url=a.default.URL;var s=t.cardbag_number,r="get_cardbag_detail",c=n.getStorageSync("id"),l=JSON.stringify({cardbag_number:s,cardbag_detail_id:"0",merberid:c});this.$utils.post(r,l).then((function(t){console.log("礼包",t),1==t.goods_list.length?(e.gift=t.goods_list,e.goodsname=t.goods_list[0].goodsname,e.goodsnum=t.goods_list[0].goodsnum,e.imageUrl=t.goods_list[0].head_img,e.length=t.goods_list.length,e.com=1):(e.gifts=t.goods_list,1==t.cardbag.type?e.length=t.type1_goodslist.length:e.length=t.goods_list.length,e.goodsname=t.goods_list[0].goodsname,e.goodsnum=t.goods_list[0].goodsnum,e.imageUrl=t.goods_list[0].head_img,e.goodsname1=t.goods_list[1].goodsname,e.goodsnum1=t.goods_list[1].goodsnum,e.imageUrl1=t.goods_list[1].head_img,e.com=2),e.goods_count_num=t.cardbag.goods_count_num,console.log(e),n.showToast({title:"生成中",icon:"loading"});var a="get_haibao",r=JSON.stringify({scene:s,page:"pages/shopping/receive"});e.$utils.post(a,r).then((function(n){console.log(n),e.QRcodeUrl=n.dir,console.log("QRcodeUrl:",e.QRcodeUrl)})).then((function(t){e.$nextTick(i(o.default.mark((function t(){return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$refs.rCanvas.init({canvas_id:"rCanvas",canvas_width:375,canvas_height:560,hidden:!0,background_color:"transparent"});case 2:return t.next=4,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.bgUrl),x:15,y:10,w:350,h:540}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 4:if(1!=e.com){t.next=17;break}return t.next=7,e.$refs.rCanvas.fillRoundRect({x:100,y:100,w:180,h:200,radius:10,fill_color:"#CCB586"});case 7:return t.next=9,e.$refs.rCanvas.fillRoundRect({x:102,y:102,w:176,h:196,radius:10,fill_color:"rgb(255, 255, 255)"});case 9:return t.next=11,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.flowUrl),x:180,y:90,w:20,h:20}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 11:return t.next=13,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl),x:125,y:130,w:130,h:120}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 13:return t.next=15,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname,9),x:130,y:280,font_color:"#333333",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 15:t.next=39;break;case 17:return t.next=19,e.$refs.rCanvas.fillRoundRect({x:65,y:100,w:255,h:80,radius:10,fill_color:"#CCB586"});case 19:return t.next=21,e.$refs.rCanvas.fillRoundRect({x:66,y:101,w:253,h:78,radius:10,fill_color:"#fff"});case 21:return t.next=23,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl),x:71,y:115,w:60,h:50}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 23:return t.next=25,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname,6),x:150,y:130,max_width:200,font_color:"#333333",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 25:return t.next=27,e.$refs.rCanvas.drawText({text:"共"+e.goodsnum+"件",x:150,y:160,font_color:"#666666",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 27:return t.next=29,e.$refs.rCanvas.fillRoundRect({x:65,y:200,w:255,h:80,radius:10,fill_color:"#CCB586"});case 29:return t.next=31,e.$refs.rCanvas.fillRoundRect({x:66,y:201,w:253,h:78,radius:10,fill_color:"#fff"});case 31:return t.next=33,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl1),x:71,y:210,w:60,h:50}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 33:return t.next=35,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname1,6),x:150,y:230,max_width:200,font_color:"#333333",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 35:return t.next=37,e.$refs.rCanvas.drawText({text:"共"+e.goodsnum1+"件",x:150,y:260,font_color:"#666666",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 37:return t.next=39,e.$refs.rCanvas.drawText({text:"•••",x:170,y:310,font_color:"#FADEA5"}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 39:return t.next=41,e.$refs.rCanvas.drawText({text:e.nickname+"为你挑选了"+e.goods_count_num+"件礼物",x:110,y:340,font_color:"#FADEA5",font_size:16}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 41:return t.next=43,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.QRcodeUrl),x:148,y:380,w:85,h:85,radius:12,is_radius:!0}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 43:return t.next=45,e.$refs.rCanvas.drawText({text:"长按小程序二维码领识别",x:120,y:510,font_color:"#FFF8F8",font_size:14}).catch((function(t){n.showToast({title:t,icon:"none"})}));case 45:return t.next=47,e.$refs.rCanvas.draw((function(t){n.hideLoading(),e.posterUrl=t.tempFilePath}));case 47:case"end":return t.stop()}}),t)}))))}))}))},methods:{down:function(t){n.saveImageToPhotosAlbum({filePath:this.posterUrl,success:function(t){n.showToast({title:"图片已保存",icon:"none"})},fail:function(t){"saveImageToPhotosAlbum:fail:auth denied"!==t.errMsg&&"saveImageToPhotosAlbum:fail auth deny"!==t.errMsg&&"saveImageToPhotosAlbum:fail authorize no response"!==t.errMsg||n.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(t){n.openSetting({success:function(n){n.authSetting["scope.writePhotosAlbum"]}})}})}})}}};t.default=l}).call(this,e("543d")["default"])},ffc7:function(n,t,e){}},[["797a","common/runtime","common/vendor"]]]);