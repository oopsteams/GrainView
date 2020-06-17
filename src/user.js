import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import user from './user.vue'
import uapp from './uapp.vue'
import index from './App.vue'
import VueClipboard from 'vue-clipboard2'
import VueRouter from 'vue-router'
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(VueRouter)

// const VueRouterPush = VueRouter.prototype.push;

// VueRouter.prototype.push = function push (to) {
// 	return VueRouterPush.call(this, to).catch(err => err)
// }

import userdetail from './views/userdetail.vue'
import refrole from './views/refrole.vue'
import rolelist from './views/roleList.vue'
import orglist from './man/orgList.vue'
const routes = [{ path: '/detail/:id', name: 'detail', component: userdetail },
{ path: '/role/:id', name: 'role', component: refrole },
{ path: '/rolelist', name: 'rolelist', component: rolelist },
{ path: '/orglist', name: 'orglist', component: orglist },
{ path: '/user', name: 'user', component: user },
{ path: '/:pid?', name: 'index', component: index }
];
const router = new VueRouter({
  routes
});
const vm = new Vue({
  router,
  el: '#app',
  render: h => h(uapp)
}).$mount('#app');