(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopping/CBlessingCard"],{1842:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n(i("e2fe"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{indicatorDots:!1,autoplay:!1,previousMargin:"60px",nextMargin:"60px",circular:!0,swiperCurrentIndex:0,background:"",id:"",isFocus:!1,text:"",content:"",title:"",IMG_DATA:"https://zhijianlw.com/static/web/img/icon-card-morenlogo-09-27-01.png",textList:[]}},computed:{},onShow:function(){},onLoad:function(e){var i=t.getStorageSync("id");this.memberid=i,this.getShowZhufuList(),this.getShowcustomized()},methods:{getShowZhufuList:function(){var t=this,e=JSON.stringify({}),i="show_zhufu_list",n="zhufu";this.$utils.postNew(i,e,n).then((function(e){1==e.sta&&(t.content=e.rs.info)}))},getShowcustomized:function(){var e=this,i="get_theme_type_by_customized",n="zhufu",o=t.getStorageSync("id"),s=JSON.stringify({memberid:o});this.$utils.postNew(i,s,n).then((function(t){1==t.sta&&(e.customizData=t.rs,e.IMG_DATA=t.rs.customized_head_img,e.text=t.rs.customized_call,e.content=t.rs.customized_zhufu,e.title=t.rs.customized_company,e.background=t.rs.default_theme_background,e.id=t.rs.default_theme_id,e.textList=t.rs.zhufu_list)}))},clickLogo:function(){this.$refs["popuppic"].open()},clickEdit:function(){var t=this;setTimeout((function(){t.isFocus=!0}),0)},clickHandler:function(){this.getShowZhufuList()},txt:function(t){0==t.detail.cursor?this.text="":this.text=t.detail.value},txtcontent:function(t){0==t.detail.cursor?this.content="":this.content=t.detail.value},txttitle:function(t){this.title=t.detail.value},change:function(t){this.swiperCurrentIndex=t.detail.current,this.theme_background="",this.textList.length>0&&(this.background=this.textList[this.swiperCurrentIndex].background,this.id=this.textList[this.swiperCurrentIndex].id)},changePic:function(t){},cameraPic:function(){this.closepic();var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(i){var n=i.tempFilePaths;t.uploadFile({url:"https://zhijianlw.com/api.php/index/upload_file",filePath:n[0],name:"file",formData:{user:"test"},success:function(i){var n=JSON.parse(i.data);1==n.sta?(t.hideLoading(),e.IMG_DATA=n.filename):t.showToast({title:"上传失败",icon:"none",mask:"true"})},fail:function(e){t.showToast({title:"上传失败",icon:"none",mask:!0})}})}})},albumPic:function(){this.closepic();var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(i){console.log(i),t.uploadFile({url:"https://zhijianlw.com/api.php/index/upload_file",filePath:i.tempFilePaths[0],name:"file",formData:{user:"test"},success:function(i){var n=JSON.parse(i.data);1==n.sta?(t.hideLoading(),e.IMG_DATA=n.filename,console.log("上传成功",n)):t.showToast({title:"上传失败",icon:"none",mask:"true"})},fail:function(e){t.showToast({title:"上传失败",icon:"none",mask:!0})}})}})},closepic:function(){this.$refs["popuppic"].close()},getgift:function(e){var i="save_customized_zhufu_theme",n="zhufu",o=t.getStorageSync("id"),s=JSON.stringify({memberid:o,customized_head_img:this.IMG_DATA,customized_call:this.text,zhufu_msg:this.content,customized_company:this.title,theme_type:this.id});this.$utils.postNew(i,s,n).then((function(e){1==e.sta&&(t.setStorageSync("setgiftssuccess","1"),t.navigateBack({delta:1}))}))}}};e.default=o}).call(this,i("543d")["default"])},"3ef8":function(t,e,i){},"596c":function(t,e,i){"use strict";var n=i("3ef8"),o=i.n(n);o.a},"626c":function(t,e,i){"use strict";i.r(e);var n=i("1842"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},"9a66":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var n={uniPopup:function(){return i.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(i.bind(null,"f3d2"))}},o=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.textList,(function(e,i){var n=t.__get_orig(e),o=t.$utils.imageUrl(e.background);return{$orig:n,g0:o}})));t._isMounted||(t.e0=function(e){t.isFocus=!1}),t.$mp.data=Object.assign({},{$root:{l0:i}})},s=[]},badc:function(t,e,i){"use strict";i.r(e);var n=i("9a66"),o=i("626c");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("596c");var u,c=i("f0c5"),a=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=a.exports},ce6b:function(t,e,i){"use strict";(function(t){i("334b");n(i("66fd"));var e=n(i("badc"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["ce6b","common/runtime","common/vendor"]]]);