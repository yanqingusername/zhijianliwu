(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/receive"],{1138:function(e,t,a){"use strict";(function(e){a("334b");i(a("66fd"));var t=i(a("dfa8"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"78f1":function(e,t,a){"use strict";var i=a("a455"),n=a.n(i);n.a},a455:function(e,t,a){},ac5a:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=(e._self._c,0==e.isShowCheck&&"0"===e.gift?e.$utils.imageUrl(e.head_img):null),i=0!=e.isShowCheck&&1==e.isShowCheck?e.$utils.imageUrl(e.head_img):null,n=0!=e.isShowCheck&&1!=e.isShowCheck&&2==e.isShowCheck?e.$utils.imageUrl(e.head_img):null;e.$mp.data=Object.assign({},{$root:{g0:a,g1:i,g2:n}})},r=[]},c3ce:function(e,t,a){"use strict";a.r(t);var i=a("e47e"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},dfa8:function(e,t,a){"use strict";a.r(t);var i=a("ac5a"),n=a("c3ce");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("78f1");var s,o=a("f0c5"),c=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=c.exports},e47e:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("e2fe"));function n(e){return e&&e.__esModule?e:{default:e}}var r=function(){a.e("components/ar-circle-progress/ar-circle-progress").then(function(){return resolve(a("9375"))}.bind(null,a)).catch(a.oe)},s=(e.getRecorderManager(),e.createInnerAudioContext());e.createAudioContext("");s.autoplay=!0;e.getRecorderManager();var o=e.createInnerAudioContext(),c={components:{arprogress:r},data:function(){return{gift:"0",send_talk_msg:"",zhufu_msg:"",name:"",w:"",schedule:0,movable_x:"0",distance:"0",duration:"",stop:"0",width:"",zhufu_mp4:"",zhufu_mp3:"",radio:!0,present_memberid_headimg:"",present_memberid_name:"",isShowCheck:0,timecount:"00:00:00",hour:0,minute:0,second:0,timer:"",totalDuration:"00:00:00",order_zhufu_msg:""}},onLoad:function(t){var a=this;o.src="https://zhijianlw.com/static/web/img/kai_li_bao.wav",this.url=i.default.URL;var n=this,r=e.getStorageSync("id");this.sign=e.getStorageSync("sign");var s=e.getStorageSync("send_talk_msg");this.send_talk_msg=s,t.cardbag_number?this.cardbag_number=t.cardbag_number:this.cardbag_number=t.scene;var c=JSON.stringify({cardbag_number:this.cardbag_number,cardbag_detail_id:"0",merberid:r}),u="get_cardbag_detail";this.$utils.post(u,c).then((function(t){if(console.log("礼包详情",t),a.order_zhufu_msg=t.order_zhufu_msg,a.zhufu_msg=t.cardbag_theme.zhufu_msg,a.zhufu_mp3=t.cardbag_theme.zhufu_mp3,a.zhufu_mp4=t.cardbag_theme.zhufu_mp4,a.send_talk_msg=s,a.present_memberid_headimg=t.cardbag.present_memberid_headimg,a.present_memberid_name=t.cardbag.present_memberid_name,3==t.cardbag.type)var i=Date.parse(new Date)/1e3,o=t.cardbag.fixed_time;"1"==t.cardbag_theme.zhufu_type?a.gift="1":"0"==t.cardbag_theme.zhufu_type?a.gift="0":a.gift="2";var c='{"cardbag_number":"'+a.cardbag_number+'","memberid":"'+r+'"}',u="check_receive_cardbag";a.$utils.post(u,c).then((function(r){console.log("判断礼包是否领取",r),1==r.sta?i>o?(a.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag="+n.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+n.cardbag_number})):a.display="1":0==r.sta?(a.display="1",r.cardbag_number?(a.number=r.cardbag_number,a.cardbag_detail_id=r.cardbag_detail_id,a.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+r.cardbag_number+"&cardbag_detail_id="+r.cardbag_detail_id+"&cardbag="+n.cardbag_number+"&head_img="+t.cardbag.present_memberid_headimg+"&all_details_num="+t.cardbag.all_details_num+"&present_memberid_name="+t.cardbag.present_memberid_name})):i<o||(a.isShowCheck=1,a.zhufu_msg=r.msg)):101==r.sta?a.isShowCheck=2:a.display="1"})),a.template=t.cardbag_theme,a.type=t.cardbag.type,a.cardbag=t.cardbag,a.head_img=t.cardbag.present_memberid_headimg,a.name=t.cardbag.present_memberid_name,a.all_details_num=t.cardbag.all_details_num,a.id=t.cardbag.present_memberid})),e.getSystemInfo({success:function(e){n.width=e.screenWidth,n.w=.57*e.screenWidth}});var d=e.getStorageSync("id");d?(this.idd=d,this.sign="200"):this.sign="0"},onUnload:function(){o.pause()},methods:{getTimeInterval:function(){var e=this;clearInterval(this.timer),this.timer=setInterval((function(){e.second+=1,e.second>=60&&(e.minute+=1,e.second=0),e.minute>=60&&e.second>=60&&(e.minute+=0,e.hour+=1),e.timecount=e.showNum(e.hour)+":"+e.showNum(e.minute)+":"+e.showNum(e.second),console.log("this.timecount",e.timecount)}),1e3)},showNum:function(e){return e<10?"0"+e:e},format:function(e){var t=Math.floor(e/3600)>=10?Math.floor(e/3600):"0"+Math.floor(e/3600);e-=3600*t;var a=Math.floor(e/60)>=10?Math.floor(e/60):"0"+Math.floor(e/60);e-=60*a;var i=e>=10?e:"0"+e;return t+":"+a+":"+i},audioPlay:function(){var e=this;this.timecount="00:00:00",this.hour=0,this.minute=0,this.second=0,this.getTimeInterval(),this.schedule=0,this.stop=1,this.radio=!1;var t=this;console.log("播放");var a=this.zhufu_mp3;s.src=a,s.play(),setTimeout((function(){s.onTimeUpdate((function(a){console.log("总时长",s.duration),console.log("当前播放进度",s.currentTime);var i=parseInt(s.duration),n=parseInt(s.currentTime),r=n/i*1e3;t.schedule=parseInt(r),t.totalDuration=t.format(i);var o=(.57*t.width-.57*t.width*.07)*schedule/100;0==e.stop||(e.movable_x=o,e.duration=s.duration,console.log(s.duration/s.currentTime)),s.onEnded((function(e){console.log("结束",e),t.radio=!0,t.movable_x=.5*t.width,t.schedule=0,t.stop=0,s.stop(),t.schedule=0,t.timecount="00:00:00",t.hour=0,t.minute=0,t.second=0,clearInterval(t.timer)}))}))}),500)},audioStop:function(e){this.radio=!0,this.schedule=0,this.stop=0,this.click=0,clearInterval(this.timer),s.stop(),s.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},scroll:function(e){console.log(e),this.distance=e.detail.x},star:function(e){this.stop=0,this.click=0,console.log("暂停"),s.pause(),s.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},to:function(e){var t=this,a=this.distance,i=a/(.57*t.width-.57*t.width*.07)*100;console.log("跳转位置",this.duration*i/100),s.seek(this.duration*i/100),this.schedule=i,this.movable_x=a,this.stop=0},toConversionDetails:function(){e.reLaunch({url:"../index-coupon/ConversionDetails?cardbag="+this.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+this.cardbag_number})},dingyue:function(t,a){var i=this;e.getSetting({withSubscriptions:!0,success:function(n){if(n.subscriptionsSetting&&n.subscriptionsSetting.mainSwitch)if(n.subscriptionsSetting.itemSettings&&n.subscriptionsSetting.itemSettings[t]&&n.subscriptionsSetting.itemSettings[a]){var r=n.subscriptionsSetting.itemSettings[t],s=n.subscriptionsSetting.itemSettings[a];if("reject"==r&&"reject"==s)i.dingyueComfirm(t,a);else if("accept"==r&&"accept"==s){var o="add_wx_subscribe_log",c="subscribe",u=e.getStorageSync("id"),d=t+","+a,l=JSON.stringify({memberid:u,template_id:d});i.$utils.postNew(o,l,c).then((function(e){1==e.sta&&i.getHpptFunc()}))}else"ban"==item&&console.log("提示：您已经被后台封禁")}else console.log("tmplId不在范围内",t,a),i.dingyueComfirm(t,a);else console.log("mainSwitch为false"),i.dingyueComfirm(t,a)}})},dingyueComfirm:function(t,a){var i=this;e.requestSubscribeMessage({tmplIds:[t,a],success:function(n){if(console.log("----\x3e:",n),"accept"==n[t]&&"accept"==n[a]){var r="add_wx_subscribe_log",s="subscribe",o=e.getStorageSync("id"),c=t+","+a,u=JSON.stringify({memberid:o,template_id:c});i.$utils.postNew(r,u,s).then((function(e){1==e.sta&&i.getHpptFunc()}))}else i.getHpptFunc()},fail:function(e){i.getHpptFunc(),console.error(e)}})},getHpptFunc:function(){var t=this,a=this,i='{"cardbag_number":"'+this.cardbag_number+'","memberid":"'+this.idd+'"}',n="receive_cardbag";this.$utils.post(n,i).then((function(i){console.log("领取卡包",i),1==i.sta?(o.play(),setTimeout((function(e){o.stop()}),1e3),e.setStorageSync("new_cardbag_number",i),3==t.type?(e.hideLoading(),e.showToast({title:"成功参与",icon:"none",mask:!0})):4==t.type?(s.src=a.auto,s.play(),setTimeout((function(t){e.navigateTo({url:"../redEnvelopes/redEnvelopes?cardbag_number="+i.cardbag_number+"&cardbag_detail_id="+i.cardbag_detail_id+"&head_img="+a.head_img+"&all_details_num="+a.all_details_num+"&present_memberid_name="+a.name+"&old_cardbag_number="+a.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){s.stop()}),2200)):(s.src=a.auto,s.play(),setTimeout((function(t){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+i.cardbag_number+"&cardbag_detail_id="+i.cardbag_detail_id+"&head_img="+a.head_img+"&all_details_num="+a.all_details_num+"&present_memberid_name="+a.name+"&old_cardbag_number="+a.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){s.stop()}),2200))):e.hideLoading()}))},open:function(t){var a=this;if("200"==this.sign){var i="t8n_2-QRJn5md7MI7eauHnj_hMvGRc3mC7lDy3ccQJ8",n="MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk";this.dingyue(i,n)}else e.showToast({title:"请先登录",icon:"none",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../signin/signin?receive=on&cardbag_number="+a.cardbag_number})}),1500)}})}}};t.default=c}).call(this,a("543d")["default"])}},[["1138","common/runtime","common/vendor"]]]);