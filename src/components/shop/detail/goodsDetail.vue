<template>
    <!-- CommentData是子组件传送数据的占位 -->
    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to='/goodslist'>首页</router-link>
                <router-link to="">商品详情</router-link>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover">
                                            <img :src="goodsData.goodsinfo.img_url" alt="">
                                        </div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="(item,i) in goodsData.imglist" :key="i">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number size="small" v-model="buyNum" :min="1"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <router-link class="buy" :to="{name:'pay', params: {id:id}}">立即购买</router-link>
                                                <button class="add" @click="addCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <el-tabs type="border-card">
                                <el-tab-pane label="图文信息">
                                    <div v-html="goodsData.goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="商品评论">
                                    <app-comment @CommentData="getCommentData"></app-comment>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <main-aside :data="goodsData.hotgoodslist"></main-aside>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
        <!-- 分页 -->
         <el-pagination  :current-page="1" :page-sizes="[2,4,6,8]" :page-size="4" layout="total, sizes, prev, pager, next, jumper" :total="commentData.length">
        </el-pagination>
    </div>
</template>

<script>
import mainAside from '../goods/subcom/Aside'
import appComment from './subcom/comments'
//使用imgzoom插件制作放大镜
import "@/lib/imgzoom/css/magnifier.css"
import "@/lib/imgzoom/js/magnifier.js"

import $ from "jquery"

export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsData:{
                goodsinfo:{},
                hotgoodslist:[],
                imglist:[]
            },
            buyNum:1,
            commentData:[]
        }
    },
    components: {
        mainAside,
        appComment
    },
    methods:{
        getgoodsDetail(){
            this.$axios.get(this.$api.goodsDetail+this.id).then(res=>{
                if(res.data.status == 0){
                    this.goodsData = res.data.message;
                    // console.log(this.goodsData.hotgoodslist);
                }
            })
        },
        //用来获取子组件传送数据额函数
        getCommentData(val){
            this.commentData = val;
        },

        addCart(){
            var newNum = this.buyNum + (this.$store.state.cart[this.id] || 0); // 天加的商品数量=新添加的数量 + 原来储存在本地的商品数量
            this.$store.commit('modify', { id: this.id, buyNum: newNum });
            this.buyNum = 0;  // 加完之后重置计数框
            this.$confirm('添加成功，是否到购物车看看？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.$router.push({name:'shopcart'})
            })
        }
       
    },
    created () {
        this.getgoodsDetail();
    },

    watch: {
        //实时监控id的变化，如果id变化，就将新id重新赋值到goodsData的id中，在获取数据
        $route(){
            this.id = this.$route.params.id;
            this.getgoodsDetail();
        },

        goodsData(){
            var magnifierConfig = {
                magnifier : "#magnifier1",//最外层的大容器
                width : 370,//承载容器宽
                height : 370,//承载容器高
                moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                zoom : 5//缩放比例
            };

            //因为
            setTimeout(() => {
                var _magnifier = $().imgzoon(magnifierConfig);
            }, 100);
        }
    }
};
</script>

<style scoped>

</style>