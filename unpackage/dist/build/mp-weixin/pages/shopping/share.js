(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/share"],{4554:function(t,n,e){"use strict";e.r(n);var o=e("e72e"),s=e("ee1e");for(var a in s)"default"!==a&&function(t){e.d(n,t,(function(){return s[t]}))}(a);e("4c4d");var r,i=e("f0c5"),c=Object(i["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=c.exports},"4c4d":function(t,n,e){"use strict";var o=e("ffc7"),s=e.n(o);s.a},"797a":function(t,n,e){"use strict";(function(t){e("334b");o(e("66fd"));var n=o(e("4554"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},e72e:function(t,n,e){"use strict";e.d(n,"b",(function(){return s})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var o={rCanvas:function(){return Promise.all([e.e("common/vendor"),e.e("components/r-canvas/r-canvas")]).then(e.bind(null,"c910"))}},s=function(){var t=this,n=t.$createElement,e=(t._self._c,t.$utils.imageUrl(t.posterUrl));t.$mp.data=Object.assign({},{$root:{g0:e}})},a=[]},ee1e:function(t,n,e){"use strict";e.r(n);var o=e("f315"),s=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=s.a},f315:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(e("a34a")),s=a(e("e2fe"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,o,s,a,r){try{var i=t[a](r),c=i.value}catch(l){return void e(l)}i.done?n(c):Promise.resolve(c).then(o,s)}function i(t){return function(){var n=this,e=arguments;return new Promise((function(o,s){var a=t.apply(n,e);function i(t){r(a,o,s,i,c,"next",t)}function c(t){r(a,o,s,i,c,"throw",t)}i(void 0)}))}}var c=function(){Promise.all([e.e("common/vendor"),e.e("components/r-canvas/r-canvas")]).then(function(){return resolve(e("c910"))}.bind(null,e)).catch(e.oe)},l={components:{rCanvas:c},data:function(){return{gift:[],gifts:[],keynum:"keynum",QRcodeUrl:"",imageUrl:"",goodsname:"",cost_price:"",posterUrl:"",url:"",com:1,length:0,bgUrl:"https://zhijianlw.com/static/web/img/gift_hb_09_01.png",flowUrl:"https://slxcx.oss-cn-beijing.aliyuncs.com/xcx-static/payment/hdj.png",goodsname1:"",imageUrl1:"",goodsnum1:"",nickname:"",goods_count_num:0}},onLoad:function(n){var e=this;this.nickname=t.getStorageSync("name"),this.url=s.default.URL;var a=n.cardbag_number,r="get_cardbag_detail",c=t.getStorageSync("id"),l=JSON.stringify({cardbag_number:a,cardbag_detail_id:"0",merberid:c});this.$utils.post(r,l).then((function(n){console.log("礼包",n),1==n.goods_list.length?(e.gift=n.goods_list,e.goodsname=n.goods_list[0].goodsname,e.goodsnum=n.goods_list[0].goodsnum,e.imageUrl=n.goods_list[0].head_img,e.length=n.goods_list.length,e.com=1):(e.gifts=n.goods_list,1==n.cardbag.type?e.length=n.type1_goodslist.length:e.length=n.goods_list.length,e.goodsname=n.goods_list[0].goodsname,e.goodsnum=n.goods_list[0].goodsnum,e.imageUrl=n.goods_list[0].head_img,e.goodsname1=n.goods_list[1].goodsname,e.goodsnum1=n.goods_list[1].goodsnum,e.imageUrl1=n.goods_list[1].head_img,e.com=2),e.goods_count_num=n.cardbag.goods_count_num,console.log(e),t.showToast({title:"生成中",icon:"loading"});var s="get_haibao",r=JSON.stringify({scene:a,page:"pages/shopping/receive"});e.$utils.post(s,r).then((function(t){console.log(t),e.QRcodeUrl=t.dir,console.log("QRcodeUrl:",e.QRcodeUrl)})).then((function(n){e.$nextTick(i(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$refs.rCanvas.init({canvas_id:"rCanvas",canvas_width:375,canvas_height:560,hidden:!0});case 2:return n.next=4,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.bgUrl),x:15,y:10,w:350,h:540}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 4:if(1!=e.com){n.next=17;break}return n.next=7,e.$refs.rCanvas.fillRoundRect({x:100,y:100,w:180,h:225,radius:10,fill_color:"#CCB586"});case 7:return n.next=9,e.$refs.rCanvas.fillRoundRect({x:102,y:102,w:176,h:221,radius:10,fill_color:"rgb(255, 255, 255)"});case 9:return n.next=11,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.flowUrl),x:180,y:90,w:20,h:20}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 11:return n.next=13,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl),x:106,y:106,w:170,h:170}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 13:return n.next=15,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname,9),x:130,y:301,font_color:"#333333",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 15:n.next=39;break;case 17:return n.next=19,e.$refs.rCanvas.fillRoundRect({x:65,y:100,w:255,h:80,radius:10,fill_color:"#CCB586"});case 19:return n.next=21,e.$refs.rCanvas.fillRoundRect({x:66,y:101,w:253,h:78,radius:10,fill_color:"#fff"});case 21:return n.next=23,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl),x:71,y:115,w:60,h:50}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 23:return n.next=25,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname,6),x:150,y:130,max_width:200,font_color:"#333333",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 25:return n.next=27,e.$refs.rCanvas.drawText({text:"共"+e.goodsnum+"件",x:150,y:160,font_color:"#666666",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 27:return n.next=29,e.$refs.rCanvas.fillRoundRect({x:65,y:200,w:255,h:80,radius:10,fill_color:"#CCB586"});case 29:return n.next=31,e.$refs.rCanvas.fillRoundRect({x:66,y:201,w:253,h:78,radius:10,fill_color:"#fff"});case 31:return n.next=33,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.imageUrl1),x:71,y:210,w:60,h:50}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 33:return n.next=35,e.$refs.rCanvas.drawText({text:e.$utils.sub_str(e.goodsname1,6),x:150,y:230,max_width:200,font_color:"#333333",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 35:return n.next=37,e.$refs.rCanvas.drawText({text:"共"+e.goodsnum1+"件",x:150,y:260,font_color:"#666666",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 37:return n.next=39,e.$refs.rCanvas.drawText({text:"•••",x:170,y:310,font_color:"#FADEA5"}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 39:return n.next=41,e.$refs.rCanvas.drawText({text:e.nickname+"为你挑选了"+e.goods_count_num+"件礼物",x:110,y:360,font_color:"#FADEA5",font_size:16}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 41:return n.next=43,e.$refs.rCanvas.drawImage({url:e.$utils.imageUrl(e.QRcodeUrl),x:148,y:380,w:85,h:85,radius:12,is_radius:!0}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 43:return n.next=45,e.$refs.rCanvas.drawText({text:"长按小程序码领取礼物",x:120,y:510,font_color:"#FFF8F8",font_size:14}).catch((function(n){t.showToast({title:n,icon:"none"})}));case 45:return n.next=47,e.$refs.rCanvas.draw((function(n){t.hideLoading(),e.posterUrl=n.tempFilePath}));case 47:case"end":return n.stop()}}),n)}))))}))}))},methods:{down:function(n){var e=this;t.requestSubscribeMessage({tmplIds:["MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk","UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"],success:function(n){var o="add_wx_subscribe_log",s="subscribe",a=t.getStorageSync("id"),r=JSON.stringify({memberid:a,template_id:"MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk,UtjUryAFGcusJYLvm-2Z0y_Op_ya2BmpS4JwGLmG9OM"});e.$utils.postNew(o,r,s).then((function(t){t.sta}))},fail:function(t){},complete:function(n){t.saveImageToPhotosAlbum({filePath:e.posterUrl,success:function(n){t.showToast({title:"图片已保存",icon:"none"})},fail:function(n){"saveImageToPhotosAlbum:fail:auth denied"!==n.errMsg&&"saveImageToPhotosAlbum:fail auth deny"!==n.errMsg&&"saveImageToPhotosAlbum:fail authorize no response"!==n.errMsg||t.showModal({title:"提示",content:"需要您授权保存相册",showCancel:!1,success:function(n){t.openSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]}})}})}})}})}}};n.default=l}).call(this,e("543d")["default"])},ffc7:function(t,n,e){}},[["797a","common/runtime","common/vendor"]]]);