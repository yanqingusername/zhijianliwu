(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/gifts"],{"414b":function(t,e,n){"use strict";(function(t){n("334b");i(n("66fd"));var e=i(n("d66f"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"68d1":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var s=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$utils.osspath_url("/xcx-static/gift/ICON-xm.png")),i=t.__map(t.template,(function(e,n){var i=t.__get_orig(e),s=t.$utils.imageUrl(e.background);return{$orig:i,g1:s}}));t.$mp.data=Object.assign({},{$root:{g0:n,l0:i}})},u=[]},"73cd":function(t,e,n){"use strict";var i=n("a85f"),s=n.n(i);s.a},a85f:function(t,e,n){},cf46:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(n("e2fe"));function s(t){return t&&t.__esModule?t:{default:t}}t.getRecorderManager();var u=t.createInnerAudioContext();u.autoplay=!0;var a={data:function(){return{background:"",edit:"",text:"我精选挑选了一份礼物送给您,望收下,一点心意,不成敬意!",theme_background:"",img:1,template:[],content:"",send_talk_msg:"",sign:"",showPop:!1,Inv:0}},onShow:function(){var e=t.getStorageSync("all_cover_bg"),n=t.getStorageSync("all_cover_id");e&&n&&(this.theme_background="",this.background=e,this.id=n)},onLoad:function(e){var n=this;this.url=i.default.URL;this.sign=t.getStorageSync("sign");var s=t.getStorageSync("id");if(this.memberid=s,"on"==e.edit){this.edit=e.edit;var u=t.getStorageSync("cardbag_theme");this.background=u.background,this.id=u.theme_type;var a="{}",r="get_zhufu_theme_type";this.$utils.post(r,a).then((function(t){n.template=t.rs})),this.zhufu_theme_id=e.id,this.content=u,this.send_talk_msg=u.send_talk_msg,this.theme_type=u.id,this.text=u.send_talk_msg,0==u.zhufu_type?(this.Inv=0,this.img=0):1==u.zhufu_type?(this.Inv=1,this.img=1):2==u.zhufu_type&&(this.Inv=2,this.img=2)}else{a="{}",r="get_zhufu_theme_type";this.$utils.post(r,a).then((function(t){n.template=t.rs;var e='{"memberid":"'+s+'"}',i="get_zhufu_theme";n.$utils.post(i,e).then((function(t){n.content=t.rs,n.send_talk_msg=t.rs.send_talk_msg,n.text=t.rs.send_talk_msg,n.theme_background=t.rs.theme_background,n.theme_type=t.rs.theme_type,n.id=t.rs.theme_type,n.imgs(),n.zhufu_theme_id=t.rs.id}))}))}},methods:{allCovers:function(){t.navigateTo({url:"../../pagesub/AllCovers/AllCovers?id=".concat(this.id)})},close:function(){this.showPop=!1},showTxt:function(){},txt:function(t){0==t.detail.cursor?(this.text="",this.send_talk_msg=""):this.text=t.detail.value},imgs:function(t){for(var e in this.template)this.template[e].id==this.theme_type&&(this.background=this.template[e].background)},choose:function(t){this.theme_background="",this.background=t.currentTarget.dataset.background,this.id=t.currentTarget.dataset.id},getgift:function(e){var n=this,i={zhufu_theme_id:this.zhufu_theme_id,memberid:this.memberid,theme_type:this.id,send_talk_msg:this.text,zhufu_type:0,theme_background:this.theme_background,update_type:0};0==this.Inv&&(i["zhufu_type"]=0,i["zhufu_msg"]=this.text);var s="save_zhufu_theme";this.$utils.post(s,JSON.stringify(i)).then((function(e){var i="success";if(1!=e.sta)return i="none",void t.showToast({icon:i,title:e.msg,duration:2e3});"on"==n.edit&&t.showToast({title:"修改成功",icon:"success",mask:"true",success:function(e){setTimeout((function(e){t.setStorageSync("cardbag_theme",""),t.navigateBack({delta:1})}),1500)}}),t.setStorageSync("setgiftssuccess","1"),t.navigateBack({delta:1})}))},gift:function(e){var n=this,i=e.type,s=t.getStorageSync("id");this.memberid=s;var u='{"memberid":"'+s+"buy_type:"+i+'"}',a="get_zhufu_theme";this.$utils.post(a,u).then((function(e){n.content=e.rs,n.zhufu_type=e.rs.zhufu_type,t.setStorageSync("zhufu_type",e.rs.zhufu_type),t.setStorageSync("text",e.rs.send_talk_msg),t.setStorageSync("zhufu_msg",e.rs.zhufu_msg),t.navigateBack({delta:1})}))}}};e.default=a}).call(this,n("543d")["default"])},d19d:function(t,e,n){"use strict";n.r(e);var i=n("cf46"),s=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=s.a},d66f:function(t,e,n){"use strict";n.r(e);var i=n("68d1"),s=n("d19d");for(var u in s)"default"!==u&&function(t){n.d(e,t,(function(){return s[t]}))}(u);n("73cd");var a,r=n("f0c5"),o=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);e["default"]=o.exports}},[["414b","common/runtime","common/vendor"]]]);