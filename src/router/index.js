import Vue from 'vue'
import Router from 'vue-router'


//导入登陆页面
import Login from "../components/account/Login.vue"

//导入相关页面
import Shop from '../components/shop/Shop.vue'
import GoodsList from '../components/shop/goods/Goods.vue'
import GoodsDetail from '../components/shop/detail/Detail.vue'
import Shopcart from '../components/shop/shopcart/Shopcart.vue'
import Address from '../components/shop/order/Address.vue'
import Pay from '../components/shop/order/Pay.vue'
import OrderComplete from '../components/shop/order/OrderComplete.vue'


Vue.use(Router)

let goods=[
    { name: 'goodsList', path: 'goodsList', component: GoodsList},
    { name: 'goodsdetail', path: 'goodsdetail', component: GoodsDetail}
]

let shopcart = [
    { name: 'shopcart', path: 'shopcart', component: Shopcart }
]

let order = [
  { name: 'adress', path: 'address', component: Address },
  { name: 'pay', path: 'pay', component: Pay },
  { name: 'orderComplete', path: 'orderComplete', component: OrderComplete },
]
export default new Router({
    routes: [
      { path: '/', name: 'shop', component: Shop, children: [...goods, ...shopcart, ...order] },
      { path: '/login', name: 'login', component: Login}
    ]
})
