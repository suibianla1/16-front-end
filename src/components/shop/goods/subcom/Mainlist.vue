<template>
    <div class="section">
        jidjdii
        <div v-for="item in goodsData" :key="item.level1cateid">
            <!--子类-->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <router-link to="" v-for="subItem in item.level2catelist" :key="subItem.subcateid">{{subItem.subcatetitle}}</router-link>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <router-link :to="{name: 'goodsdetail', params: {id: subitem.artID}}">
                                <div class="img-box">
                                    <img :src="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.market_price}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.stock_quantity}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            goodsData:[]
        }
    },
    methods: {
        getgoodsgroup(){
            this.$axios.get(this.$api.goodsContent).then(res=>{
                if(res.data.status == 0){
                    this.goodsData = res.data.message;
                }
            });
        }
    },
    created () {
        this.getgoodsgroup();
    }
};
</script>

<style scoped>

</style>