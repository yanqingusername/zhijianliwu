(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/receive"],{"0091":function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=(e._self._c,0==e.isShowCheck&&"0"===e.gift?e.$utils.imageUrl(e.head_img):null),n=0!=e.isShowCheck&&1==e.isShowCheck?e.$utils.imageUrl(e.head_img):null,a=0!=e.isShowCheck&&1!=e.isShowCheck&&2==e.isShowCheck?e.$utils.imageUrl(e.head_img):null,r=0!=e.isShowCheck&&1!=e.isShowCheck&&2!=e.isShowCheck&&4==e.isShowCheck?e.$utils.imageUrl(e.head_img):null;e.$mp.data=Object.assign({},{$root:{g0:i,g1:n,g2:a,g3:r}})},r=[]},1138:function(e,t,i){"use strict";(function(e){i("334b");n(i("66fd"));var t=n(i("dfa8"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])},"78f1":function(e,t,i){"use strict";var n=i("a455"),a=i.n(n);a.a},a455:function(e,t,i){},c3ce:function(e,t,i){"use strict";i.r(t);var n=i("e47e"),a=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},dfa8:function(e,t,i){"use strict";i.r(t);var n=i("0091"),a=i("c3ce");for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);i("78f1");var s,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},e47e:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("e2fe"));function a(e){return e&&e.__esModule?e:{default:e}}var r=function(){i.e("components/ar-circle-progress/ar-circle-progress").then(function(){return resolve(i("9375"))}.bind(null,i)).catch(i.oe)},s=(e.getRecorderManager(),e.createInnerAudioContext());e.createAudioContext("");s.autoplay=!0;e.getRecorderManager();var o=e.createInnerAudioContext(),c={components:{arprogress:r},data:function(){return{gift:"0",send_talk_msg:"",zhufu_msg:"",name:"",w:"",schedule:0,movable_x:"0",distance:"0",duration:"",stop:"0",width:"",zhufu_mp4:"",zhufu_mp3:"",radio:!0,present_memberid_headimg:"",present_memberid_name:"",isShowCheck:0,timecount:"00:00:00",hour:0,minute:0,second:0,timer:"",totalDuration:"00:00:00",order_zhufu_msg:""}},onShow:function(){var t=this,i=this,n=e.getStorageSync("id"),a=e.getStorageSync("send_talk_msg");this.send_talk_msg=a;var r=JSON.stringify({cardbag_number:this.cardbag_number,cardbag_detail_id:"0",merberid:n}),s="get_cardbag_detail";this.$utils.post(s,r).then((function(r){if(console.log("礼包详情",r),t.order_zhufu_msg=r.order_zhufu_msg,t.zhufu_msg=r.cardbag_theme.zhufu_msg,t.zhufu_mp3=r.cardbag_theme.zhufu_mp3,t.zhufu_mp4=r.cardbag_theme.zhufu_mp4,t.send_talk_msg=a,t.present_memberid_headimg=r.cardbag.present_memberid_headimg,t.present_memberid_name=r.cardbag.present_memberid_name,3==r.cardbag.type)var s=Date.parse(new Date)/1e3,o=r.cardbag.fixed_time;"1"==r.cardbag_theme.zhufu_type?t.gift="1":"0"==r.cardbag_theme.zhufu_type?t.gift="0":t.gift="2";var c='{"cardbag_number":"'+t.cardbag_number+'","memberid":"'+n+'"}',u="check_receive_cardbag";t.$utils.post(u,c).then((function(n){console.log("判断礼包是否领取",n),1==n.sta?s>o?(t.display="0",e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag="+i.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+i.cardbag_number})):t.display="1":0==n.sta?(t.display="1",n.cardbag_number?(t.number=n.cardbag_number,t.cardbag_detail_id=n.cardbag_detail_id,t.display="0",t.isShowCheck=4):s<o||(t.isShowCheck=1,t.zhufu_msg=n.msg)):101==n.sta?t.isShowCheck=2:t.display="1"})),t.template=r.cardbag_theme,t.type=r.cardbag.type,t.cardbag=r.cardbag,t.head_img=r.cardbag.present_memberid_headimg,t.name=r.cardbag.present_memberid_name,t.all_details_num=r.cardbag.all_details_num,t.id=r.cardbag.present_memberid}))},onLoad:function(t){var i=this;o.src="https://zhijianlw.com/static/web/img/kai_li_bao.wav",this.url=n.default.URL,this.sign=e.getStorageSync("sign"),t.cardbag_number?this.cardbag_number=t.cardbag_number:this.cardbag_number=t.scene,e.getSystemInfo({success:function(e){i.width=e.screenWidth,i.w=.57*e.screenWidth}});var a=e.getStorageSync("id");a?(this.idd=a,this.sign="200"):this.sign="0"},onUnload:function(){o.pause()},methods:{getTimeInterval:function(){var e=this;clearInterval(this.timer),this.timer=setInterval((function(){e.second+=1,e.second>=60&&(e.minute+=1,e.second=0),e.minute>=60&&e.second>=60&&(e.minute+=0,e.hour+=1),e.timecount=e.showNum(e.hour)+":"+e.showNum(e.minute)+":"+e.showNum(e.second),console.log("this.timecount",e.timecount)}),1e3)},showNum:function(e){return e<10?"0"+e:e},format:function(e){var t=Math.floor(e/3600)>=10?Math.floor(e/3600):"0"+Math.floor(e/3600);e-=3600*t;var i=Math.floor(e/60)>=10?Math.floor(e/60):"0"+Math.floor(e/60);e-=60*i;var n=e>=10?e:"0"+e;return t+":"+i+":"+n},audioPlay:function(){var e=this;this.timecount="00:00:00",this.hour=0,this.minute=0,this.second=0,this.getTimeInterval(),this.schedule=0,this.stop=1,this.radio=!1;var t=this;console.log("播放");var i=this.zhufu_mp3;s.src=i,s.play(),setTimeout((function(){s.onTimeUpdate((function(i){console.log("总时长",s.duration),console.log("当前播放进度",s.currentTime);var n=parseInt(s.duration),a=parseInt(s.currentTime),r=a/n*1e3;t.schedule=parseInt(r),t.totalDuration=t.format(n);var o=(.57*t.width-.57*t.width*.07)*schedule/100;0==e.stop||(e.movable_x=o,e.duration=s.duration,console.log(s.duration/s.currentTime)),s.onEnded((function(e){console.log("结束",e),t.radio=!0,t.movable_x=.5*t.width,t.schedule=0,t.stop=0,s.stop(),t.schedule=0,t.timecount="00:00:00",t.hour=0,t.minute=0,t.second=0,clearInterval(t.timer)}))}))}),500)},audioStop:function(e){this.radio=!0,this.schedule=0,this.stop=0,this.click=0,clearInterval(this.timer),s.stop(),s.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},scroll:function(e){console.log(e),this.distance=e.detail.x},star:function(e){this.stop=0,this.click=0,console.log("暂停"),s.pause(),s.offTimeUpdate((function(e){console.log("取消监听进度条",e)}))},to:function(e){var t=this,i=this.distance,n=i/(.57*t.width-.57*t.width*.07)*100;console.log("跳转位置",this.duration*n/100),s.seek(this.duration*n/100),this.schedule=n,this.movable_x=i,this.stop=0},toredEnvelopes:function(){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+this.number+"&cardbag_detail_id="+this.cardbag_detail_id+"&cardbag="+this.cardbag_number+"&head_img="+this.present_memberid_headimg+"&all_details_num="+this.all_details_num+"&present_memberid_name="+this.present_memberid_name})},toConversionDetails:function(){1==this.isShowCheck?e.reLaunch({url:"../index-coupon/ConversionDetails?cardbag="+this.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+this.cardbag_number+"&isShowCheck=1"}):2==this.isShowCheck&&e.reLaunch({url:"../index-coupon/ConversionDetails?cardbag="+this.cardbag_number+"&cardbag_detail_id=0&cardbag_number="+this.cardbag_number+"&isShowCheck=2"})},dingyue:function(t,i){var n=this;e.getSetting({withSubscriptions:!0,success:function(a){if(a.subscriptionsSetting&&a.subscriptionsSetting.mainSwitch)if(a.subscriptionsSetting.itemSettings&&a.subscriptionsSetting.itemSettings[t]&&a.subscriptionsSetting.itemSettings[i]){var r=a.subscriptionsSetting.itemSettings[t],s=a.subscriptionsSetting.itemSettings[i];if("reject"==r&&"reject"==s)n.dingyueComfirm(t,i);else if("accept"==r&&"accept"==s){var o="add_wx_subscribe_log",c="subscribe",u=e.getStorageSync("id"),d=t+","+i,l=JSON.stringify({memberid:u,template_id:d});n.$utils.postNew(o,l,c).then((function(e){e.sta})),n.getHpptFunc()}else"ban"==item?(console.log("提示：您已经被后台封禁"),n.getHpptFunc()):n.dingyueComfirm(t,i)}else n.dingyueComfirm(t,i);else n.dingyueComfirm(t,i)}})},dingyueComfirm:function(t,i){var n=this;e.requestSubscribeMessage({tmplIds:[t,i],success:function(a){if("accept"==a[t]&&"accept"==a[i]){var r="add_wx_subscribe_log",s="subscribe",o=e.getStorageSync("id"),c=t+","+i,u=JSON.stringify({memberid:o,template_id:c});n.$utils.postNew(r,u,s).then((function(e){e.sta})),n.getHpptFunc()}else n.getHpptFunc()},fail:function(e){n.getHpptFunc(),console.error(e)}})},getHpptFunc:function(){var t=this,i=this,n='{"cardbag_number":"'+this.cardbag_number+'","memberid":"'+this.idd+'"}',a="receive_cardbag";this.$utils.post(a,n).then((function(n){console.log("领取卡包",n),1==n.sta?(o.play(),setTimeout((function(e){o.stop()}),1e3),e.setStorageSync("new_cardbag_number",n),3==t.type?(e.hideLoading(),e.showToast({title:"成功参与",icon:"none",mask:!0})):4==t.type?(s.src=i.auto,s.play(),setTimeout((function(t){e.navigateTo({url:"../redEnvelopes/redEnvelopes?cardbag_number="+n.cardbag_number+"&cardbag_detail_id="+n.cardbag_detail_id+"&head_img="+i.head_img+"&all_details_num="+i.all_details_num+"&present_memberid_name="+i.name+"&old_cardbag_number="+i.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){s.stop()}),2200)):(s.src=i.auto,s.play(),setTimeout((function(t){e.reLaunch({url:"../redEnvelopes/redEnvelopes?cardbag_number="+n.cardbag_number+"&cardbag_detail_id="+n.cardbag_detail_id+"&head_img="+i.head_img+"&all_details_num="+i.all_details_num+"&present_memberid_name="+i.name+"&old_cardbag_number="+i.cardbag_number}),e.hideLoading()}),500),setTimeout((function(e){s.stop()}),2200))):e.hideLoading()}))},open:function(t){var i=this;if("200"==this.sign){var n="t8n_2-QRJn5md7MI7eauHnj_hMvGRc3mC7lDy3ccQJ8",a="MnEl7igggF5odfal9HhcTKl99RsEK_CGwk0wpRDwPZk";this.dingyue(n,a)}else e.showToast({title:"请先登录",icon:"none",mask:"true",success:function(t){setTimeout((function(t){e.reLaunch({url:"../signin/signin?receive=on&cardbag_number="+i.cardbag_number})}),1500)}})}}};t.default=c}).call(this,i("543d")["default"])}},[["1138","common/runtime","common/vendor"]]]);