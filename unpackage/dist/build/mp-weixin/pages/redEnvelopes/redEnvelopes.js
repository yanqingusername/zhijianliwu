(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/redEnvelopes/redEnvelopes"],{"2f10":function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return r})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement,o=(e._self._c,1==e.com?e.__map(e.goodslist,(function(t,o){var n=e.__get_orig(t),r=e.$utils.imageUrl(t.head_img),a=e.$utils.cut_str(t.goodsname,6);return{$orig:n,g0:r,g1:a}})):null),n=2==e.com?e.__map(e.goodslist,(function(t,o){var n=e.__get_orig(t),r=e.$utils.imageUrl(t.head_img),a=e.$utils.cut_str(t.goodsname,9);return{$orig:n,g2:r,g3:a}})):null,r=e.__map(e.cardbag_in_people,(function(t,o){var n=e.__get_orig(t),r=e.$utils.cut_str(t.goods_name,11);return{$orig:n,g4:r}}));e.$mp.data=Object.assign({},{$root:{l0:o,l1:n,l2:r}})},a=[]},5117:function(e,t,o){"use strict";o.r(t);var n=o("fa1b"),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},a22e:function(e,t,o){"use strict";var n=o("d18b"),r=o.n(n);r.a},ab56:function(e,t,o){"use strict";(function(e){o("334b");n(o("66fd"));var t=n(o("cba8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},cba8:function(e,t,o){"use strict";o.r(t);var n=o("2f10"),r=o("5117");for(var a in r)"default"!==a&&function(e){o.d(t,e,(function(){return r[e]}))}(a);o("a22e");var i,c=o("f0c5"),s=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);t["default"]=s.exports},d18b:function(e,t,o){},fa1b:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(o("e2fe"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var a=function(){o.e("components/ar-circle-progress/ar-circle-progress").then(function(){return resolve(o("9375"))}.bind(null,o)).catch(o.oe)},i=(e.getRecorderManager(),e.createInnerAudioContext());e.createAudioContext("");i.autoplay=!0;var c={components:{arprogress:a},data:function(){var e;return e={liwu:[],zhufu_msg:"",send_talk_msg:"",cardbag_number:"",cardbag:"",level_name:"",sign:"",type:"",goodslist:[],com:1,cardbag_in_people:[]},r(e,"cardbag",[]),r(e,"cardbag_theme",[]),r(e,"gift","0"),r(e,"w",""),r(e,"schedule",0),r(e,"movable_x","0"),r(e,"distance","0"),r(e,"duration",""),r(e,"stop","0"),r(e,"width",""),r(e,"zhufu_mp4",""),r(e,"zhufu_mp3",""),r(e,"radio",!0),r(e,"receive_info",""),r(e,"timecount","00:00:00"),r(e,"hour",0),r(e,"minute",0),r(e,"second",0),r(e,"timer",""),r(e,"totalDuration","00:00:00"),r(e,"is_exchange_type",0),e},onLoad:function(t){var o=this,n=t.cardbag_number;this.cardbag_number=n;var r=e.getStorageSync("id");this.memberid=r;var a='{"memberid":"'+r+'","cardbag_number":"'+n+'"}',i="get_cardbag_fenshu";this.$utils.post(i,a).then((function(e){1==e.rs[0].goodsinfo.length?(o.goodslist=e.rs[0].goodsinfo,o.com=1):(o.goodslist=e.rs[0].goodsinfo,o.com=2),console.log(e.rs[0])}));var c=t.old_cardbag_number,s=JSON.stringify({cardbag_number:c,cardbag_detail_id:"0",merberid:r}),u="get_cardbag_detail";this.$utils.post(u,s).then((function(e){1==e.sta&&(console.log("礼包信息"),console.log(e),o.cardbag_in_people=e.cardbag_in_people,o.cardbag=e.cardbag,o.cardbag_theme=e.cardbag_theme,o.zhufu_mp3=e.cardbag_theme.zhufu_mp3,o.price=e.cardbag.price,o.receive_info=e.receive_info,"1"==e.cardbag_theme.zhufu_type?o.gift="1":"0"==e.cardbag_theme.zhufu_type?o.gift="0":o.gift="2")}));var d=JSON.stringify({cardbag_number:n,cardbag_detail_id:"0",merberid:r}),l="get_cardbag_detail";this.$utils.post(l,d).then((function(e){console.log("礼包信息"),console.log(e),o.cardbag_in_people=e.cardbag_in_people,o.cardbag=e.cardbag,o.cardbag_theme=e.cardbag_theme,o.price=e.cardbag.price,o.receive_info=e.receive_info,o.zhufu_mp3=e.cardbag_theme.zhufu_mp3,o.is_exchange_type=e.is_exchange_type,"1"==e.cardbag_theme.zhufu_type?o.gift="1":"0"==e.cardbag_theme.zhufu_type?o.gift="0":o.gift="2"}));var g=this;e.getSystemInfo({success:function(e){g.width=e.screenWidth,g.w=.57*e.screenWidth}})},methods:{address:function(t){var o=this.cardbag_number;e.navigateTo({url:"../orderList/ReceptionAddress?ordernumber="+o})},givee:function(t){var o=this.cardbag_number,n=this.is_exchange_type;if(0==n){var r=this.cardbag_number,a="order_add_shopping_cart",i=e.getStorageSync("id"),c="order",s=JSON.stringify({ordernumber:r,memberid:i,buy_type:1});this.$utils.postNew(a,s,c).then((function(t){1==t.sta&&e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(r,"&is_exchange_type=").concat(n)})}))}else e.navigateTo({url:"../shopping/shop?type=1&statutype=exchange&ordernumber=".concat(o,"&is_exchange_type=").concat(n)})},getTimeInterval:function(){var e=this;clearInterval(this.timer),this.timer=setInterval((function(){e.second+=1,e.second>=60&&(e.minute+=1,e.second=0),e.minute>=60&&e.second>=60&&(e.minute+=0,e.hour+=1),e.timecount=e.showNum(e.hour)+":"+e.showNum(e.minute)+":"+e.showNum(e.second),console.log("this.timecount",e.timecount)}),1e3)},showNum:function(e){return e<10?"0"+e:e},format:function(e){var t=Math.floor(e/3600)>=10?Math.floor(e/3600):"0"+Math.floor(e/3600);e-=3600*t;var o=Math.floor(e/60)>=10?Math.floor(e/60):"0"+Math.floor(e/60);e-=60*o;var n=e>=10?e:"0"+e;return t+":"+o+":"+n},audioPlay:function(){var e=this;this.timecount="00:00:00",this.hour=0,this.minute=0,this.second=0,this.getTimeInterval(),this.schedule=0,this.stop=1,this.radio=!1;var t=this;console.log("播放");var o=this.zhufu_mp3;i.src=o,i.play(),setTimeout((function(){i.onTimeUpdate((function(o){console.log("总时长",i.duration),console.log("当前播放进度",i.currentTime);var n=parseInt(i.duration),r=parseInt(i.currentTime),a=r/n*1e3;t.schedule=parseInt(a),t.totalDuration=t.format(n);var c=(.57*t.width-.57*t.width*.07)*schedule/100;0==e.stop||(e.movable_x=c,e.duration=i.duration,console.log(i.duration/i.currentTime)),i.onEnded((function(e){console.log("结束",e),t.radio=!0,t.movable_x=.5*t.width,t.schedule=0,t.stop=0,i.stop(),t.schedule=0,t.timecount="00:00:00",t.hour=0,t.minute=0,t.second=0,clearInterval(t.timer)}))}))}),500)},audioStop:function(e){this.radio=!0,this.schedule=0,this.stop=0,this.click=0,clearInterval(this.timer),i.stop(),i.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},scroll:function(e){console.log(e),this.distance=e.detail.x},star:function(e){this.stop=0,this.click=0,console.log("暂停"),i.pause(),i.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},to:function(e){var t=this,o=this.distance,n=o/(.57*t.width-.57*t.width*.07)*100;console.log("跳转位置",this.duration*n/100),i.seek(this.duration*n/100),this.schedule=n,this.movable_x=o,this.stop=0},lockliwu:function(t){e.reLaunch({url:"../orderList/orderList?nav=3"})}}};t.default=c}).call(this,o("543d")["default"])}},[["ab56","common/runtime","common/vendor"]]]);