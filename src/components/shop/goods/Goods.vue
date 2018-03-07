<template>
    <div class="section">
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to='/goodslist'>首页</router-link>
                <router-link to="">购物商城</router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="wrap-box">
                <!--类别菜单-->
                <div class="left-220" style="margin:0;">
                    <div class="banner-nav">
                        <ul>
                        <!--此处声明下面可重复循环-->
                            <li v-for="item in goodsData.catelist" :key="item.id">
                                <h3>
                                    <i class="iconfont icon-arrow-right"></i>
                                    <span>{{item.title}}</span>
                                    <p>
                                        <span v-for="subItem in item.subcates" :key="subItem.id">{{subItem.title}}&nbsp;</span>
                                    </p>
                                </h3>
                                <div class="item-box">
                                    <!--如有三级分类，此处可循环-->
                                    <dl>
                                        <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                        <dd>
                                            <a v-for="subItem in item.subcates" :key="subItem.id">{{subItem.title}}</a>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--/类别菜单-->
                
                <!--幻灯片-->
                <div class="left-705">
                    <div class="banner-img">
                        <el-carousel height="340px">
                            <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                <img style="height:100%" :src="item.img_url" :alt="item.id">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <!--/幻灯片-->
                
                <main-side :data="goodsData.toplist"></main-side>
            </div>
        </div>
        <!-- 商品列表 -->
        <goodslist></goodslist>
    </div>
</template>

<script>
    import mainSide from './subcom/Aside.vue';
    import goodslist from './subcom/Mainlist.vue'

    export default {
        data(){
            return{
                goodsData:{}
            }   
        },
        components: {
            mainSide,
            goodslist
        },
        methods:{
            getGoods(){
                this.$axios.get(this.$api.goodsTop).then(res=>{
                    if (res.data.status == 0) {
                        this.goodsData = res.data.message;
                    }
                })
            }
        },
        created () {
            this.getGoods();
        }
    }
</script>

<style scoped>
    .el-carousel__container{
    height: 343px;
    }
    
    
    .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    /* 只需要将line-height修改成50px，文字就自动定位到下面了 */
    line-height: 50px;
    margin: 0;
    }

</style>