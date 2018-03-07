<template>
    <div class="comment-box">
        <el-form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
            <el-form-item label="评论内容">
                <el-input type="textarea" v-model="commenttxt.commenttxt"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" style='float:right'>添加评论</el-button>
            </el-form-item>
        </el-form>

        <ul id="commentList" class="list-box">
            <p v-if="commentData.length == 0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
            <li  v-for="(item, i) in commentData" :key="i">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{item.user_name}}</span>
                        <span>{{item.add_time | time}}</span>
                    </div>
                    <p>{{item.content}}</p>
                </div>
            </li>
        </ul>
        <!-- <div>{{commenttxt.commenttxt}}</div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            commentData:[],
            commenttxt:{
                commenttxt:''
            },
            id:this.$route.params.id
        }
    },
    methods: {
        getComment(){
            var url = this.$api.commentList + 'goods/' + this.id + '?pageIndex=1&pageSize=10';
            this.$axios.get(url).then(res=>{
                if (res.data.status == 0) {
                    this.commentData = res.data.message;
                    //获取到的评论数据传到父子件
                    this.$emit('CommentData',this.commentData);
                }
            })
        },

        //添加评论
        submitForm(){
            // if (this.commenttxt.commenttxt=='') {
            //     return;
            // }
            // var url = this.$api.comment + 'goods/' + this.id;
            let url = `${this.$api.comment}goods/${this.id}`;
            this.$axios.post(url, this.commenttxt).then(res=>{
                if (res.data.status == 0) {
                    this.$alert(res.data.message);
                    this.commenttxt.commenttxt = ''; //每次发表评论后都要清空原来的评论
                    this.getComment(); //刷新评论列表
                }
            })
        }
    },
    filters: {
        time(time){
            var date = new Date(time);
            var days = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
            var hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return days + ' ' + hour; 
        }
    },
    created () {
        this.getComment();
    },

    mounted () { 
        
    },

        //商品详情页面的右侧列表, 可以点击切换不同的商品进行预览
        // 但是默认情况下当前页面切换到当前页面不会触发组件的重新渲染, 为了解决这个问题,
        // 我们可以监听$route对象的变化, 因为切换商品后, $route.params.id变化了, 我们监听它, 
        // 然后主动发起http请求, 调用接口获取新id的数据进行视图刷新
    watch:{
        //监控路由上面的id的变化
        $route(){
            this.id = this.$route.params.id;
            this.getComment();
        }
    }
};
</script>

<style scoped lang="less">
    li{
        margin-top:15px;
        padding-left: 15px;
        .avatar-box{
            width: 50px;
            height: 50px;
            text-align: center;
            float: left;
            padding: 0;
            margin-right: 15px;
            i{
                font-size: 40px;
                line-height: 50px;
            }
        }
        .inner-box{
            height: 51px;
            span{
                font-size: 12px;
                color: #ccc;
            }
        }
    }
    
</style>