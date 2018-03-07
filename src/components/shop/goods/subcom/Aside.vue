<template>
    <!--推荐商品-->
        <div class="left-220">
            <ul class="side-img-list">
                <li v-for="(item, i) in data" :key="item.id">
                    <div class="img-box">
                        <label>{{i+1}}</label>
                        <img :src="item.img_url">
                    </div>
                    <div class="txt-box">
                        <router-link :to="{name:'goodsdetail', params: {id:item.id}}">{{item.title}}</router-link>
                        <span>{{item.add_time | time}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!--/推荐商品-->
</template>

<script>
    export default {
        props: ['data'],
        filters: {
            time(time){
                var data = new Date(time);
                return `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
            }
        },
        created () {
            // console.log(this.data);
        }
    }
</script>

<style scoped>

</style>