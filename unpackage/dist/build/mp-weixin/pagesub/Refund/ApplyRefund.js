(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesub/Refund/ApplyRefund"],{"65a8":function(e,t,n){"use strict";n.r(t);var i=n("f857"),o=n("efcf");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("e208");var r,a=n("f0c5"),u=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);t["default"]=u.exports},"77d9":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=[],i={data:function(){return{IMG_DATA:[],count:6,indexPicker:-1,items:[],ordernumber:"",typerefund:1,detailid:"",orderGood:"",goods_list:[],refund_reason:"",imgArr:[],title:"申请退款"}},onShow:function(e){var t=this,n="refund_reason_info",i="order",o=JSON.stringify({type:1==this.typerefund?1:2});this.$utils.postNew(n,o,i).then((function(e){1==e.sta&&(t.items=e.rs)}))},onLoad:function(t){var n=this;this.ordernumber=t.ordernumber,this.typerefund=t.typerefund,this.detailid=t.detailid,1==this.typerefund?this.title="申请退款":2==this.typerefund?this.title="换货申请":this.title="退货申请",e.setNavigationBarTitle({title:this.title});var i="get_refund_order_goods_list",o="order",s=e.getStorageSync("id"),r=JSON.stringify({type:this.typerefund,ordernumber:this.ordernumber,memberid:s,order_detail_id:this.detailid});this.$utils.postNew(i,r,o).then((function(e){1==e.sta&&(n.orderGood=e.rs,n.goods_list=e.rs.goods_list)}))},methods:{delImages:function(e){console.log("----\x3e:",e.currentTarget.dataset.id);for(var t=[],n=6,i=0;i<this.IMG_DATA.length;i++)i!=e.currentTarget.dataset.id&&t.push(this.IMG_DATA[i]);n-=t.length,this.IMG_DATA=t,this.count=n,console.log(this.IMG_DATA,this.count)},toggle:function(e){this.$refs["popup"].open()},closepopup:function(){this.$refs["popup"].close()},togglecenter:function(t){var n=this,i="refund_order",o=e.getStorageSync("id"),s="order",r=JSON.stringify({type:this.typerefund,ordernumber:this.ordernumber,memberid:o,order_detail_id:this.detailid,refund_reason:this.refund_reason,remark:this.remark,refund_img:this.IMG_DATA});console.log("----\x3e:",r),this.$utils.postNew(i,r,s).then((function(t){1==t.sta?n.$refs["popupcenter"].open():e.showToast({title:t.msg,icon:"none",mask:!0})}))},submitrefund:function(){this.$refs["popupcenter"].close(),e.navigateBack({delta:1})},uploadSub:function(){this.IMG_DATA.length>6?e.showToast({title:"最多只能上传6张图片",icon:"none",mask:!0}):this.$refs["popuppic"].open()},base:function(t){var i=this,o=i.IMG_DATA,s=wx.getFileSystemManager(),r=t.tempFiles;e.showLoading({title:"加载中"}),r.map((function(t){1048576>Number(t.size)?(n.push({img:s.readFileSync(t.path,"base64"),ext:t.path.substring(t.path.lastIndexOf(".")+1,t.path.length)}),n.length==o.length&&e.hideLoading(),o.push(t.path)):e.showToast({title:"上传图片不得超过1M",icon:"none",mask:!0})})),e.hideLoading(),i.IMG_DATA=o},cameraPic:function(){this.closepic();var t=this,n=t.IMG_DATA;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(i){console.log(i);var o=i.tempFilePaths;e.uploadFile({url:"https://zhijianlw.com/api.php/test/upload_file",filePath:o[0],name:"file",formData:{user:"test"},success:function(i){var o=JSON.parse(i.data);1==o.sta?(e.hideLoading(),n.push(o.filename),t.IMG_DATA=n,console.log("上传成功",o)):e.showToast({title:"上传失败",icon:"none",mask:"true"})},fail:function(t){e.showToast({title:"上传失败",icon:"none",mask:!0})}})}})},albumPic:function(){var t=this;this.closepic();var n=this,i=n.IMG_DATA;e.chooseImage({count:6,sizeType:["original","compressed"],sourceType:["album"],success:function(o){console.log(o);o.tempFilePaths;t.imgArr.push(o.tempFilePaths),t.imgArr.forEach((function(t){t.forEach((function(t){e.uploadFile({url:"https://zhijianlw.com/api.php/test/upload_file",filePath:t,name:"file",formData:{user:"test"},success:function(t){var o=JSON.parse(t.data);1==o.sta?(e.hideLoading(),i.push(o.filename),n.IMG_DATA=i,console.log("上传成功",o)):e.showToast({title:"上传失败",icon:"none",mask:"true"})},fail:function(t){e.showToast({title:"上传失败",icon:"none",mask:!0})}})}))}))}})},closepic:function(){this.$refs["popuppic"].close()},change:function(e){},bindPickerChange:function(e){this.indexPicker=e.currentTarget.dataset.index,this.refund_reason=e.currentTarget.dataset.refundreason,this.closepopup()}}};t.default=i}).call(this,n("543d")["default"])},bd01:function(e,t,n){"use strict";(function(e){n("334b");i(n("66fd"));var t=i(n("65a8"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c2c6:function(e,t,n){},e208:function(e,t,n){"use strict";var i=n("c2c6"),o=n.n(i);o.a},efcf:function(e,t,n){"use strict";n.r(t);var i=n("77d9"),o=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},f857:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var i={uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"f3d2"))}},o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.IMG_DATA,(function(t,n){var i=e.__get_orig(t),o=e.$utils.imageUrl(t);return{$orig:i,g0:o}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},s=[]}},[["bd01","common/runtime","common/vendor"]]]);