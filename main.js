import Vue from 'vue'
import App from './App'
import Navgation from './wxcomponents/navgation/navgation.vue'
import Address from './components/simple-address/simple-address.vue'
import { buttonClick } from './common/btn'
import utils from './common/utils' 

Vue.prototype.$buttonClick = buttonClick;
Vue.prototype.$utils = utils;
Vue.config.productionTip = false

Vue.component('Navgation',Navgation);
Vue.component('Address',Address);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
