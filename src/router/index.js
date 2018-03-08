import Vue from 'vue'
import Router from 'vue-router'


//导入登陆页面
import Login from "../components/account/Login.vue"

//导入相关页面
import Shop from '../components/shop/Shop.vue'
import GoodsList from '../components/shop/goods/Goods.vue'
import GoodsDetail from '../components/shop/detail/goodsDetail.vue'
import Shopcart from '../components/shop/shopcart/Shopcart.vue'
import Site from '../components/shop/order/Site.vue'
import Pay from '../components/shop/order/Pay.vue'
import OrderComplete from '../components/shop/order/OrderComplete.vue'


Vue.use(Router)

let goods=[
    { name: 'goodsList', path: 'goodslist', component: GoodsList},
    { name: 'goodsdetail', path: 'goodsdetail/:id', component: GoodsDetail}
]

let shopcart = [
    { name: 'shopcart', path: 'shopcart', component: Shopcart }
]

let order = [
//   { name: 'adress', path: 'address', component: Address },
    { name: 'site', path: 'site/:ids', component: Site },
  { name: 'orderComplete', path: 'orderComplete', component: OrderComplete },
]

let router =  new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'shop', component: Shop, children: [...goods, ...order, ...shopcart] },
      { path: '/login', name: 'login', component: Login},
    ]
})

//创建全局路由，判断是否登陆
router.beforeEach((to, from, next)=>{
    Vue.prototype.$axios.get(Vue.prototype.$api.isLogin).then((res) => {
        // console.log(res.data);
        if (to.name == 'login') {
            if (res.data.code == 'logined') {
                next()
            }else{
                next();
            }
        }

        if (to.name != 'login' && to.name != 'shopcart' && to.name != 'pay') {
            next();
        }

        if (to.name == 'shopcart' || to.name == 'pay') {
            if (res.data.code == 'logined') {
                next();
            }else{
                next({ name: 'login', query: { next: to.fullPath } }); 
            }
        }
    })
})

export default router;
