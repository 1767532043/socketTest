import Vue from 'vue'
import VueRouter from 'vue-router'
//页面跳转时出现在浏览器顶部的进度条NProgress

Vue.use(VueRouter)
export const constantRouterMap = [
	{
		path: '/',
		// component: Layout,
		meta: { title: '礼包中心' },
        name: 'gift',
        component: () =>import('./pages/test.vue'),

		// children: [{
        //     path: '/gift',
        //     name: '礼包管理',
        //     component: import('./pages/test.vue'),
        //     meta: { title: '礼包管理'},
        // }]
    }	       
];
const router = new VueRouter({
    mode: 'hash',
    history: true,
    saveScrollPosition: true,
    routes: constantRouterMap
})
export default router
