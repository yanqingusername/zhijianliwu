(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Add/Add"],{"192d":function(e,t,n){"use strict";(function(e){n("334b");a(n("66fd"));var t=a(n("72f0"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"3f6a":function(e,t,n){"use strict";n.r(t);var a=n("a44b"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},6905:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return a}));var a={uniSwipeAction:function(){return n.e("uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action").then(n.bind(null,"f636"))},uniSwipeActionItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item")]).then(n.bind(null,"2593"))}},r=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"72f0":function(e,t,n){"use strict";n.r(t);var a=n("6905"),r=n("3f6a");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("b6f6");var o,d=n("f0c5"),u=Object(d["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=u.exports},a44b:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{add:"",cardbag_number:"",logistics:"",options:[{text:"删除",style:{backgroundColor:"#dd524d"}}]}},onShow:function(t){var n=this,a=e.getStorageSync("id");this.memberid=a;var r='{"memberid":"'+a+'"}',i="get_member_area";this.$utils.post(i,r).then((function(e){n.add=e.rs}))},onLoad:function(t){var n=this,a=e.getStorageSync("id");this.memberid=a;var r='{"memberid":"'+a+'"}',i="get_member_area";this.$utils.post(i,r).then((function(e){n.add=e.rs})),t.cardbag_number?this.cardbag_number=t.cardbag_number:t.ordernumber&&(this.ordernumber=t.ordernumber)},methods:{onClick:function(t,n,a){var r=this;e.showModal({title:"地址",content:"是否要删除地址",success:function(e){if(e.confirm){var t='{"member_area_id":"'+a+'"}',i="del_member_area";r.$utils.post(i,t).then((function(e){1==e.sta&&r.add.splice(n,1)}))}else e.cancel}})},swipeChange:function(e,t,n){},choose:function(t){var n=t.currentTarget.dataset.index,a=t.currentTarget.dataset.linkman,r=t.currentTarget.dataset.linktel,i=t.currentTarget.dataset.address;console.log("linktel:",r),this.cardbag_number.length>0&&(e.setStorageSync("member_area_id",n),e.setStorageSync("member_area_linkman",a),e.setStorageSync("member_area_linktel",r),e.setStorageSync("member_area_address",i),e.navigateBack({delta:1}))},del:function(t){var n=this,a=t.currentTarget.dataset.id,r=t.currentTarget.dataset.index;e.showModal({title:"地址",content:"是否要删除地址",success:function(e){if(e.confirm){var t='{"member_area_id":"'+a+'"}',i="del_member_area";n.$utils.post(i,t).then((function(e){1==e.sta&&n.add.splice(r,1)}))}else e.cancel}})},modify:function(t){var n=t.currentTarget.dataset.index,a=this.add[n];e.setStorageSync("add",a),e.navigateTo({url:"../Address/Address?modify=1&index="+n})},addto:function(t){e.navigateTo({url:"../Address/Address?addto=1"})}}};t.default=n}).call(this,n("543d")["default"])},b6f6:function(e,t,n){"use strict";var a=n("be3d"),r=n.n(a);r.a},be3d:function(e,t,n){}},[["192d","common/runtime","common/vendor"]]]);