(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/wishes"],{"1b05":function(t,e,o){"use strict";o.r(e);var i=o("2643"),n=o("a935");for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);o("d9df");var u,a=o("f0c5"),l=Object(a["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=l.exports},2643:function(t,e,o){"use strict";var i;o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return s})),o.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,o=(t._self._c,t.$utils.osspath_url("/xcx-static/wishes/cd.png")),i=t.$utils.osspath_url("/xcx-static/wishes/on.png"),n=t.radio?t.$utils.osspath_url("/xcx-static/wishes/piay_icon1.png"):null,s=t.radio?null:t.$utils.osspath_url("/xcx-static/wishes/piay_icon.png"),u=t.showvideoPlayBtn?t.$utils.osspath_url("/xcx-static/wishes/piay_icon1.png"):null;t.$mp.data=Object.assign({},{$root:{g0:o,g1:i,g2:n,g3:s,g4:u}})},s=[]},"3a02":function(t,e,o){},"4cf1":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(o("e2fe"));function n(t){return t&&t.__esModule?t:{default:t}}var s=t.getRecorderManager(),u=t.createInnerAudioContext();u.autoplay=!0;var a={data:function(){return{Inv:0,value:"福语",val:"福语",send_talk_msg:"",theme_background:"",zhufu_theme_id:"",zhufu_msg:"大吉大利 恭喜发财",sign:"",begin:1,radio:!0,videoShow:!1,voicePath:null,w:"",schedule:"0",movable_x:"0",distance:"0",duration:"",stop:"0",width:"",statusVideo:!1,zhufu_mp4:"",showvideoPlayBtn:!0,videoTime:0,innerVideoContext:null}},onLoad:function(e){this.sign=t.getStorageSync("sign"),this.url=i.default.URL;var o=this;console.log("份数",e),this.fenshu=e.fenshu,this.getShowZhufuList(),this.getCustomZhufuTheme(),t.getSystemInfo({success:function(t){o.width=t.screenWidth,o.w=.5*t.screenWidth}});var n=this;console.log(s),s.onStop((function(e){console.log(3333),t.showLoading({title:"上传中"}),console.log(e),console.log("recorder stop"+JSON.stringify(e)),n.voicePath=e.tempFilePath,t.uploadFile({url:"https://zhijianlw.com/api.php/index/upload_file",filePath:e.tempFilePath,name:"file",formData:{user:"test"},success:function(e){n.begin=3,console.log("上传音频",e);var i=JSON.parse(e.data);1==i.sta?(t.hideLoading(),console.log("重置"),n.schedule=0,n.movable_x=0,u.seek(0),n.zhufu_mp3=n.$utils.imageUrl(i.filename),console.log("上传成功",i),console.log(o.url+i.filename)):t.showToast({title:"上传失败",icon:"none",mask:"true"})},fail:function(t){n.begin=1}})}))},methods:{getShowZhufuList:function(){var t=this,e=JSON.stringify({}),o="show_zhufu_list",i="zhufu";this.$utils.postNew(o,e,i).then((function(e){1==e.sta&&(t.zhufu_msg=e.rs.info)}))},getCustomZhufuTheme:function(){var e=this,o=t.getStorageSync("id"),i=JSON.stringify({memberid:o}),n="get_custom_zhufu_theme",s="zhufu";this.$utils.postNew(n,i,s).then((function(t){1==t.sta&&(console.log(t.rs),e.Inv=t.rs.zhufu_type,e.zhufu_msg=t.rs.zhufu_msg,e.voicePath=t.rs.zhufu_mp3,e.zhufu_mp4=t.rs.zhufu_mp4,t.rs.zhufu_mp3?e.begin=3:e.begin=1)}))},changeInv:function(t){this.Inv=t,this.innerVideoContext&&(this.showvideoPlayBtn=!0,this.innerVideoContext.pause(),this.statusVideo=!1)},openSetting:function(e){t.showModal({title:"授权",content:"获取授权"+e+"失败,是否前往授权设置？",success:function(e){e.confirm&&t.openSetting()},fail:function(){t.showToast({title:"系统错误！",icon:"none"})}})},start:function(){var e=this;t.authorize({scope:"scope.record",success:function(){e.radio=!0,console.log("开始录音"),s.start(),t.showLoading({title:"正在录音中"})},fail:function(){e.openSetting("录音功能")}})},stopp:function(){t.hideLoading(),this.radio=!0,console.log("结束录音"),s.stop()},audioPlay:function(){if(this.voicePath){this.schedule=0,this.stop=1,this.radio=!1;var e=this;console.log("播放"),console.log(this.voicePath),u.src=this.voicePath,u.play(),setTimeout((function(){console.log("总时长",u.duration),u.onTimeUpdate((function(t){console.log("总时长",u.duration),console.log("当前播放进度",u.currentTime);var o=u.currentTime/u.duration*100,i=(.5*e.width-.5*e.width*.07)*o/100;0==e.stop||(e.movable_x=i,e.schedule=o,e.duration=u.duration,console.log(u.duration/u.currentTime)),u.onEnded((function(t){console.log("结束",t),e.radio=!0,e.movable_x=.5*e.width,e.schedule=0,e.stop=0,u.stop()}))}))}),500)}else t.showToast({title:"请先完成录音",mask:!0,icon:"none"})},audioPause:function(t){this.stop=0,this.click=0,console.log("暂停"),u.pause(),u.offTimeUpdate((function(t){console.log("取消监听进度条",t)}))},scroll:function(t){console.log(t),this.distance=t.detail.x},star:function(t){this.stop=0,this.click=0,console.log("暂停"),u.pause(),u.offTimeUpdate((function(t){console.log("取消监听进度条",t)}))},to:function(t){var e=this,o=this.distance,i=o/(.57*e.width-.57*e.width*.07)*100;console.log("跳转位置",this.duration*i/100),u.seek(this.duration*i/100),this.schedule=i,this.movable_x=o,this.stop=0},videoPlay:function(){this.zhufu_mp4&&(this.innerVideoContext.play(),this.showvideoPlayBtn=!1,this.statusVideo=!0)},videoClick:function(){this.statusVideo?(this.showvideoPlayBtn=!0,this.innerVideoContext.pause(),this.statusVideo=!1):(this.innerVideoContext.play(),this.showvideoPlayBtn=!1,this.statusVideo=!0)},videoPlay1:function(){this.isfirstClickVideo=!1},videoTimeUpdateEvent:function(t){var e=Number(t.detail.currentTime);console.log("播放进度条改变",e),e>=this.videoTime&&(this.innerVideoContext.exitFullScreen(),this.innerVideoContext.pause(),this.innerVideoContext.seek(0),this.showvideoPlayBtn=!0,this.statusVideo=!1)},alt:function(t){this.zhufu_msg=t.detail.value},onClickItem:function(t){this.current!==t.currentIndex&&(this.current=t.currentIndex)},radioChange:function(t){console.log("type:"+t.detail.value),this.sex=t.detail.value},vide:function(e){console.log(e);var o=this;t.chooseVideo({count:1,sourceType:["camera","album"],success:function(e){console.log("视频",e),o.videoTime=Math.floor(e.duration);var i=e.tempFilePath;t.showLoading({title:"上传中"}),t.uploadFile({url:"https://zhijianlw.com/api.php/index/upload_file",filePath:i,name:"file",formData:{user:"test"},success:function(e){if(console.log(e),200==e.statusCode){var i=JSON.parse(e.data);t.hideLoading(),o.zhufu_mp4=o.$utils.imageUrl(i.filename),console.log(i),t.showToast({title:"上传成功",icon:"none",mask:"true"}),o.innerVideoContext=t.createVideoContext("video1",o),o.videoShow=!0,o.showvideoPlayBtn=!1,o.statusVideo=!1}else 413==e.statusCode?(t.hideLoading(),t.showToast({title:"视频过大",icon:"none",mask:"true"})):(t.hideLoading(),t.showToast({title:"上传失败",icon:"none",mask:"true"}))},fail:function(t){console.log(t)}})},fail:function(t){console.log("失败",t)}})},radiofun:function(t){console.log(545435454),this.value=t.detail.value,this.val=t.detail.value,this.showvideoPlayBtn=!0,this.innerVideoContext.pause(),this.statusVideo=!1},wish:function(e){var o=this,i=t.getStorageSync("id"),n={memberid:i,zhufu_type:0};0==this.Inv?(n["zhufu_type"]=0,n["zhufu_msg"]=this.zhufu_msg):1==this.Inv?(n["zhufu_type"]=1,n["zhufu_mp3"]=this.zhufu_mp3):(n["zhufu_type"]=2,n["zhufu_mp4"]=this.zhufu_mp4),console.log(n);var s="save_custom_zhufu_theme",u="zhufu";this.$utils.postNew(s,JSON.stringify(n),u).then((function(e){console.log("修改祝福模板",e),0==e.sta?(t.showToast({title:e.msg,icon:"none",mask:"true",success:function(t){}}),o.send_talk_msg=send_talk_msg):t.showToast({title:"设置成功",icon:"success",mask:"true",success:function(e){t.setStorageSync("setwishessuccess","1"),setTimeout((function(e){t.navigateBack({url:1})}),1e3)}})}))}}};e.default=a}).call(this,o("543d")["default"])},a935:function(t,e,o){"use strict";o.r(e);var i=o("4cf1"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a},beb8:function(t,e,o){"use strict";(function(t){o("334b");i(o("66fd"));var e=i(o("1b05"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},d9df:function(t,e,o){"use strict";var i=o("3a02"),n=o.n(i);n.a}},[["beb8","common/runtime","common/vendor"]]]);