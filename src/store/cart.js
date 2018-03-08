import Vue from 'vue';
export default{
    //定义去全局状态
    state: {
        cart : JSON.parse(localStorage.getItem('cart')) || {} //数据结构预览: cart:{ 98:3, 103:5, ... }  key为商品id，value为购买商品的数量
    },
    
    //定义修改状态的方法，这里的方法需要通过store.commit(方法名称，参数)
    mutations: {
        //这里的第一参数固定为state，由vuex类库固定传递， 第二参数有调用者自由传递，非必需
        modify(state, data){
            let { id, buyNum} = data;
            // state.cart[id] = buyNum;
            Vue.set(state.cart, id, buyNum); //因为新添加的数据不会刷新视图，所以要用Vue.set()方法

            localStorage.setItem('cart', JSON.stringify(state.cart)); // 将添加购物车的id信息储存到localStorage里，这样每次刷新页面id是就不会丢失了

            // console.log(state.cart);
        },

        //删除
        del(state, id){
            //第一个参数为要删除属性的对象, 第二个参数为属性名
            Vue.delete(state.cart, id);
            //每次操作后都要更新一下当地储存的数据
            localStorage.setItem('cart', JSON.stringify(state.cart)); 
        }
    },


    //相当computed计算属性,
    getters: {
        total(state){
            //reduce()可以将数组所有的元素按规则归纳成一个数
            return Object.values(state.cart).reduce((sum,v) => sum+v, 0);
        }
    } 
}