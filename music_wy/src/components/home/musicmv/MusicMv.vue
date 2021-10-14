<template>
  <div class="mv">
    <div class="left">
      <h3 @click="back"><i class="el-icon-arrow-left"></i>MV详情</h3>
      <div class="video">
        <video :src="mvUrl" controls loop autoplay></video>
      </div>
      <div class="detail">
        <div class="name">
          <img :src="mvList.cover" alt="" />
          <span>{{ mvList.artistName }}</span>
        </div>
        <div class="title">{{ mvList.name }}</div>
        <div class="date">
          <span>发布:{{ mvList.publishTime }}</span>
          <span>播放{{ mvList.playCount | changeValue }}次</span>
        </div>
        <div class="button">
          <el-button icon="el-icon-thumb" round
            >赞({{ getMvLikes.likedCount }})</el-button
          >
          <el-button icon="el-icon-folder-add" round
            >收藏({{ mvList.subCount }})</el-button
          >
          <el-button icon="el-icon-refresh-right" round
            >分享({{ mvList.shareCount }})</el-button
          >
          <el-button icon="el-icon-download" round>下载MV</el-button>
        </div>
      </div>
      <div class="comment">
        <div class="comtitle">
          <h3>
            评论 <span> ({{ mvList.commentCount }})</span>
          </h3>
          <textarea name="" id="" cols="30" rows="4"></textarea>
          <el-button type="mini" round>评论</el-button>
        </div>
        <div class="wonderfurComment">
          <p>精彩评论</p>
          <div
            class="wonderfurComment2"
            v-for="(item, i) in getMvCommits.hotComments"
            :key="i"
          >
            <!-- <div> -->
            <img :src="item.user.avatarUrl" alt="" />
            <!-- </div> -->
            <div class="commentDetail">
              <p>
                <span>{{ item.user.nickname }}:</span>{{ item.content }}
              </p>
              <p class="time">{{ item.time | dataFormate1 }}</p>
            </div>
          </div>
        </div>
        <div class="wonderfurComment">
          <p>更多评论({{ mvList.commentCount }})</p>
          <div
            class="wonderfurComment2"
            v-for="(item, i) in getMvCommits.comments"
            :key="i"
          >
            <!-- <div> -->
            <img :src="item.user.avatarUrl" alt="" />
            <!-- </div> -->
            <div class="commentDetail">
              <p>
                <span>{{ item.user.nickname }}:</span>{{ item.content }}
              </p>
              <p class="time">{{ item.time | dataFormate1 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <h3>相关推荐</h3>
      <div class="right-detail">
        <div class="right-divblock" v-for="(item, i) in RecommendList" :key="i">
          <!-- <router-link :to="{ path: '/musicmv', query: { id: item.id } }"> -->
          <div class="right-img" @click="newMv(item.id)">
            <img :src="item.picUrl" alt="" />
          </div>
          <!-- </router-link> -->
          <div class="right-title">
            <p class="title">{{ item.name }}</p>
            <p class="name">by {{ item.artistName }}</p>
            <i class="el-icon-caret-right">{{
              item.playCount | changeValue
            }}</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      // 获取Mv数据
      mvList: {
        cover: "",
      },
      // 获取mv地址
      mvUrl: "",
      // 获取 mv 点赞转发评论数数据
      getMvLikes: {},
      // 获取mv评论
      getMvCommits: {},
      // 保存 推荐mv
      RecommendList: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    // 获取Mv数据
    this.getMVdata(this.id);
    // 获取mv地址
    this.getMvUrl(this.id);
    // 获取 mv 点赞转发评论数数据
    this.getMvCommit(this.id);
    //获取mv评论
    this.getCommits(this.id);
    // 获取推荐mv
    this.getRecommendMv();
  },
  methods: {
    // 返回
    back() {
      this.$router.push("/find");
    },
    // 获取Mv数据
    async getMVdata(id) {
      const { data: res } = await this.$http.get(`/mv/detail?mvid=${id}`);
      if (res.code == 200) {
        this.mvList = res.data;
        console.log(res);
        return this.$message.success("获取MV成功");
      } else {
        return this.$message.error("获取mv数据失败");
      }
    },
    // 获取mv地址
    async getMvUrl(id) {
      const { data: res } = await this.$http.get(`/mv/url?id=${id}`);
      if (res.code == 200) {
        this.mvUrl = res.data.url;
        console.log(res);
        return this.$message.success("获取mv地址成功");
      }
      return this.$message.error("获取mv地址失败");
    },
    // 获取 mv 点赞转发评论数数据
    async getMvCommit(id) {
      const { data: res } = await this.$http.get(`/mv/detail/info?mvid=${id}`);
      if (res.code == 200) {
        this.getMvLikes = res;
        console.log(res);
      }
    },
    // 获取mv评论
    async getCommits(id) {
      const { data: res } = await this.$http.get(`/comment/mv?id=${id}`);
      this.getMvCommits = res;
      console.log(res);
    },
    // 获取推荐mv
    async getRecommendMv() {
      const { data: res } = await this.$http.get(`/personalized/mv`);
      if (res.code == 200) {
        this.RecommendList = res.result;
      }
      console.log(res);
    },
    // 更新mv
    newMv(id) {
      this.$router.push({
        path: "/musicmv",
        query: {
          id: id,
        },
      });
      this.getMVdata(id);
      this.getMVdata(id);
      // 获取mv地址
      this.getMvUrl(id);
      // 获取 mv 点赞转发评论数数据
      this.getMvCommit(id);
      //获取mv评论
      this.getCommits(id);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.mv {
  width: 100%;
}
.left {
  width: 624px;
  margin-left: 100px;
  float: left;
  /* background: pink; */
}
.left h3 {
  cursor: pointer;
}
.right {
  width: 300px;
  /* height: 100px; */
  float: left;
  margin-left: 50px;
  /* background: chartreuse; */
}
.video {
  width: 100%;
  height: 400px;
}
video {
  width: 100%;
  height: 400px;
}
.detail {
  margin-top: 20px;
}
.detail div {
  margin-top: 15px;
}
.detail .name img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  vertical-align: middle;
}
.detail .name span {
  margin-left: 10px;
  color: #676767;
  font-size: 14px;
}
.detail .title {
  font-size: 22px;
  font-weight: 600;
  color: #373737;
}
.detail .date {
  font-size: 12px;
  color: #cfcfcf;
}
.detail .date span:nth-child(2) {
  margin-left: 20px;
}

.comtitle h3 span {
  font-size: 13px;
  color: #cfcfcf;
  font-weight: 100;
}
.comtitle textarea {
  width: 100%;
  outline: none;
  border: 1px solid#cfcfcf;
  margin-top: 5px;
  padding-left: 5px;
}
.comtitle .el-button {
  float: right;
}
.wonderfurComment {
  clear: both;
}
.wonderfurComment div {
  /* display: flex; */
  margin-top: 10px;
}
.wonderfurComment2 div {
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 10px;
}
.wonderfurComment2 img {
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  /* vertical-align: middle; */
}
.commentDetail {
  width: 100%;
  font-size: 12px;
  color: #676767;
  padding-left: 56px;
}
.commentDetail span {
  color: #507db6;
}
.commentDetail .time {
  margin-top: 10px;
  color: #9f9f9f;
}
/* 右侧----------------------- */
.right-detail {
  margin-top: 22px;
}
.right-divblock {
  display: flex;
  /* align-items: center; */
}

.right-divblock div {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 10px;
}
.right-img {
  width: 140px;
  height: 80px;
  background: pink;
}
.right-img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.right-title {
  position: relative;
  width: 130px;
  padding: 10px;
}
.right-title .title {
  font-size: 14px;
  color: #373737;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*2行*/
  -webkit-box-orient: vertical;
}
.right-title .name {
  color: #9f9f9f;
  font-size: 12px;
}
.right-title i {
  position: absolute;
  top: 0px;
  right: 164px;
  font-size: 14px;
  color: #fff;
}
</style>