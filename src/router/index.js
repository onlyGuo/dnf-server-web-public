import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        component: () => import('../views/Login'),
    },
    {
        path: '/register',
        component: () => import('../views/Register'),
    },
    {
        path: '/recharge',
        component: () => import('../views/Recharge'),
    },
    {
        path: '/manager',
        component: () => import('../views/Manager'),
        redirect: '/manager/account',
        children: [
            {
                path: '/manager/account',
                component: () => import('../views/manager/MgrAccount'),
            }, {
                path: '/manager/charac',
                component: () => import('../views/manager/MgrCharach'),
            }, {
                path: '/manager/notice',
                component: () => import('../views/manager/MgrNotice'),
            }, {
                path: '/manager/news',
                component: () => import('../views/manager/MgrNews'),
            }, {
                path: '/manager/action',
                component: () => import('../views/manager/MgrAction'),
            }, {
                path: '/manager/keys',
                component: () => import('../views/manager/MgrKeys'),
            }, {
                path: '/manager/k-logs',
                component: () => import('../views/manager/MgrKLogs'),
            }, {
                path: '/manager/databases',
                component: () => import('../views/manager/Databases'),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
