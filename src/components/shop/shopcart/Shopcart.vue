<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link to="">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center" > 
                                        <el-switch active-color="#13ce66" :value="selectedAll" @change="allSelect"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch active-color="#13ce66" v-model="item.selected"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{item.title}}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{item.sell_price}}
                                    </th>
                                    <th width="104" align="center">
                                        <el-input-number size="mini" :min="1" v-model="$store.state.cart[item.id]" @change="numChange(item.id)"></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>￥{{item.sell_price * $store.state.cart[item.id]}}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button size="mini" @click='del(item.id)'>删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.go(-1)">继续购物</button>
                            <button class="submit" @click="pay">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                goodsList:[]
            }
        },
        methods:{
            getgoodsList(){
                var ids = Object.keys(this.$store.state.cart) //获取添加到购物车的商品的id
                // console.log(ids);
                this.$axios.get(this.$api.shopcartGoods + ids).then(res=>{
                    if (res.data.status == 0) {
                        // 给每个商品统一添加一个控制开关属性selected
                        res.data.message.forEach(v => v.selected = true);
                        res.data.message.forEach(v =>{ 
                            ids.forEach(val => {
                                if(val.id == v.id ){
                                    v.buycount = this.$store.state.cart[v.id];
                                }
                            })
                        })
                        this.goodsList = res.data.message;
                        
                    }
                })
            },

            //全选按钮
            allSelect(newStatus){
                //把全选按钮的状态赋值给每一个按钮
                this.goodsList.forEach(v=>v.selected = newStatus);
            },

            //删除
            del(id){
                //先把获取商品信息列表里面的删掉
                // this.goodsList.forEach((v,i)=>{
                //     if (v.id = id) {
                //         this.goodsList.splice(i,1);
                //     }
                // })
                this.goodsList = this.goodsList.filter(v => v.id != id); 
                //再调用mutation里面del删除全局里面的数据
                this.$store.commit('del',id);
            },

            //结算
            pay(){
                //提取选中的商品的id
                var ids = [];
                this.goodsList.forEach(v => v.selected && ids.push(v.id));
                console.log(ids);
                //跳转到地址填写页面
                this.$router.push({name:'site', params:{ids:ids.join(',')}});
            },

            //改变数量
            numChange(id){
                var data = {id:id, buyNum: this.$store.state.cart[id]};
                
                console.log(data);
                this.$store.commit('modify', data);
            }
        },
        computed: {
            selectedAll(){
                 return this.goodsList.every(v=> v.selected )
            },

            //计算选择的商品的数量
            total(){
                let sum = 0;
                // this.goodsList.forEach(v => {
                //     //如果被选择了，就将他们的数量相加
                //     if (v.selected) {
                //         sum += this.$store.state.cart[v.id]
                //     }
                // });
                this.goodsList.forEach(v=> v.selected && (sum += this.$store.state.cart[v.id]));
                return sum;
            },

            //计算被选择的商品的总价格
            totalPrice(){
                let sum = 0;
                this.goodsList.forEach(v => {
                    if (v.selected) {
                        sum += this.$store.state.cart[v.id]*v.sell_price;
                    }
                });
                console.log(this.$store.state.cart)
                return sum;
            }
        },
        created () {
            this.getgoodsList();
        }
    }
</script>

<style>
</style>