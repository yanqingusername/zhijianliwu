(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/receive"],{1138:function(e,t,a){"use strict";(function(e){a("334b");n(a("66fd"));var t=n(a("dfa8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"78f1":function(e,t,a){"use strict";var n=a("a455"),i=a.n(n);i.a},a455:function(e,t,a){},a741:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=(e._self._c,0==e.isShowCheck&&"0"===e.gift?e.$utils.imageUrl(e.head_img):null),n=0!=e.isShowCheck&&1==e.isShowCheck?e.$utils.imageUrl(e.head_img):null,i=0!=e.isShowCheck&&1!=e.isShowCheck&&2==e.isShowCheck?e.$utils.imageUrl(e.head_img):null;e.$mp.data=Object.assign({},{$root:{g0:a,g1:n,g2:i}})},r=[]},c3ce:function(e,t,a){"use strict";a.r(t);var n=a("e47e"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},dfa8:function(e,t,a){"use strict";a.r(t);var n=a("a741"),i=a("c3ce");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);a("78f1");var o,s=a("f0c5"),d=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=d.exports},e47e:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("e2fe"));function i(e){return e&&e.__esModule?e:{default:e}}var r=function(){a.e("components/ar-circle-progress/ar-circle-progress").then(function(){return resolve(a("9375"))}.bind(null,a)).catch(a.oe)},o=(e.getRecorderManager(),e.createInnerAudioContext());e.createAudioContext("");o.autoplay=!0;e.getRecorderManager();var s=e.createInnerAudioContext(),d={components:{arprogress:r},data:function(){return{gift:"0",send_talk_msg:"",zhufu_msg:"",name:"",w:"",schedule:0,movable_x:"0",distance:"0",duration:"",stop:"0",width:"",zhufu_mp4:"",zhufu_mp3:"",radio:!0,present_memberid_headimg:"",present_memberid_name:"",isShowCheck:0,timecount:"00:00:00",hour:0,minute:0,second:0,timer:"",totalDuration:"00:00:00"}},onLoad:function(t){var a=this;s.src="https://zhijianlw.com/static/web/img/kai_li_bao.wav",this.url=n.default.URL;var i=this,r=e.getStorageSync("id");this.sign=e.getStorageSync("sign");var o=e.getStorageSync("send_talk_msg");this.send_talk_msg=o,t.cardbag_number?this.cardbag_number=t.cardbag_number:this.cardbag_number=t.scene;var d=JSON.stringify({cardbag_number:this.cardbag_number,cardbag_detail_id:"0",merberid:r}),c="get_cardbag_detail";this.$utils.post(c,d).then((function(t){if(console.log("礼包详情",t),a.zhufu_msg=t.cardbag_theme.zhufu_msg,a.zhufu_mp3=t.cardbag_theme.zhufu_mp3,a.zhufu_mp4=t.cardbag_theme.zhufu_mp4,a.send_talk_msg=o,a.present_memberid_headimg=t.cardbag.present_memberid_headimg,a.present_memberid_name=t.cardbag.present_memberid_name,3==t.cardbag.type)var n=Date.parse(new Date)/1e3,s=t.cardbag.fixed_time;"1"==t.cardbag_theme.zhufu_type?a.gift="1":"0"==t.cardbag_theme.zhufu_type?a.gift="0":a.gift="2";var d='{"cardbag_number":"'+a.cardbag_number+'","memberid":"'+r+'"}',c="check_receive_cardbag";a.$utils.post(c,d).then((function(r){console.log("判断礼包是否领取",r),1==r.sta?n>s?(a.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag="+i.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+i.cardbag_number})):a.display="1":0==r.sta?(a.display="1",r.cardbag_number?(a.number=r.cardbag_number,a.cardbag_detail_id=r.cardbag_detail_id,a.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+r.cardbag_number+"&cardbag_detail_id="+r.cardbag_detail_id+"&cardbag="+i.cardbag_number+"&head_img="+t.cardbag.present_memberid_headimg+"&all_details_num="+t.cardbag.all_details_num+"&present_memberid_name="+t.cardbag.present_memberid_name})):n<s||(a.isShowCheck=1,a.zhufu_msg=r.msg)):101==r.sta?a.isShowCheck=2:a.display="1"})),a.template=t.cardbag_theme,a.type=t.cardbag.type,a.cardbag=t.cardbag,a.head_img=t.cardbag.present_memberid_headimg,a.name=t.cardbag.present_memberid_name,a.all_details_num=t.cardbag.all_details_num,a.id=t.cardbag.present_memberid})),e.getSystemInfo({success:function(e){i.width=e.screenWidth,i.w=.57*e.screenWidth}});var u=e.getStorageSync("id");u?(this.idd=u,this.sign="200"):this.sign="0"},onUnload:function(){s.pause()},methods:{getTimeInterval:function(){var e=this;clearInterval(this.timer),this.timer=setInterval((function(){e.second+=1,e.second>=60&&(e.minute+=1,e.second=0),e.minute>=60&&e.second>=60&&(e.minute+=0,e.hour+=1),e.timecount=e.showNum(e.hour)+":"+e.showNum(e.minute)+":"+e.showNum(e.second),console.log("this.timecount",e.timecount)}),1e3)},showNum:function(e){return e<10?"0"+e:e},format:function(e){var t=Math.floor(e/3600)>=10?Math.floor(e/3600):"0"+Math.floor(e/3600);e-=3600*t;var a=Math.floor(e/60)>=10?Math.floor(e/60):"0"+Math.floor(e/60);e-=60*a;var n=e>=10?e:"0"+e;return t+":"+a+":"+n},audioPlay:function(){var e=this;this.timecount="00:00:00",this.hour=0,this.minute=0,this.second=0,this.getTimeInterval(),this.schedule=0,this.stop=1,this.radio=!1;var t=this;console.log("播放");var a=this.zhufu_mp3;o.src=a,o.play(),setTimeout((function(){o.onTimeUpdate((function(a){console.log("总时长",o.duration),console.log("当前播放进度",o.currentTime);var n=parseInt(o.duration),i=parseInt(o.currentTime),r=i/n*1e3;t.schedule=parseInt(r),t.totalDuration=t.format(n);var s=(.57*t.width-.57*t.width*.07)*schedule/100;0==e.stop||(e.movable_x=s,e.duration=o.duration,console.log(o.duration/o.currentTime)),o.onEnded((function(e){console.log("结束",e),t.radio=!0,t.movable_x=.5*t.width,t.schedule=0,t.stop=0,o.stop(),t.schedule=0,t.timecount="00:00:00",t.hour=0,t.minute=0,t.second=0,clearInterval(t.timer)}))}))}),500)},audioStop:function(e){this.radio=!0,this.schedule=0,this.stop=0,this.click=0,clearInterval(this.timer),o.stop(),o.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},scroll:function(e){console.log(e),this.distance=e.detail.x},star:function(e){this.stop=0,this.click=0,console.log("暂停"),o.pause(),o.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},to:function(e){var t=this,a=this.distance,n=a/(.57*t.width-.57*t.width*.07)*100;console.log("跳转位置",this.duration*n/100),o.seek(this.duration*n/100),this.schedule=n,this.movable_x=a,this.stop=0},toConversionDetails:function(){e.reLaunch({url:"../index-coupon/ConversionDetails?cardbag="+this.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+this.cardbag_number})},open:function(t){var a=this,n=this;if("200"==this.sign){var i='{"cardbag_number":"'+this.cardbag_number+'","memberid":"'+this.idd+'"}',r="receive_cardbag";this.$utils.post(r,i).then((function(t){console.log("领取卡包",t),1==t.sta?(s.play(),setTimeout((function(e){s.stop()}),1e3),e.setStorageSync("new_cardbag_number",t),3==a.type?(e.hideLoading(),e.showToast({title:"成功参与",icon:"none",mask:!0}),e.requestSubscribeMessage({tmplIds:["K7Go9Ex49p5hfB8qm3LhggEDJoZ1p2mKu2lyspAsqM0"],success:function(e){n.dingyue()},fail:function(e){wx.showToast({title:e.errMsg,icon:"none",mask:!0})}})):4==a.type?(o.src=n.auto,o.play(),setTimeout((function(a){e.navigateTo({url:"../redEnvelopes/redEnvelopes?cardbag_number="+t.cardbag_number+"&cardbag_detail_id="+t.cardbag_detail_id+"&head_img="+n.head_img+"&all_details_num="+n.all_details_num+"&present_memberid_name="+n.name+"&old_cardbag_number="+n.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){o.stop()}),2200)):(o.src=n.auto,o.play(),setTimeout((function(a){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+t.cardbag_number+"&cardbag_detail_id="+t.cardbag_detail_id+"&head_img="+n.head_img+"&all_details_num="+n.all_details_num+"&present_memberid_name="+n.name+"&old_cardbag_number="+n.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){o.stop()}),2200))):e.hideLoading()}))}else e.showToast({title:"请先登录",icon:"none",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../signin/signin?receive=on&cardbag_number="+n.cardbag_number})}),1500)}})}}};t.default=d}).call(this,a("543d")["default"])}},[["1138","common/runtime","common/vendor"]]]);