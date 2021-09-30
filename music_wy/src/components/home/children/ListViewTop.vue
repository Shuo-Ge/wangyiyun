<template>
  <div class="header">
    <div class="img">
      <img :src="playlist.coverImgUrl" alt="" />
    </div>
    <div class="detail">
      <div class="title">{{ playlist.name }}</div>
      <div class="author">
        <img :src="playlist.creator.avatarUrl" class="picture" />
        <span class="deaileName">{{ playlist.creator.nickname }}</span>
        <span class="date">{{ playlist.updateTime | dataFormate }}创建</span>
      </div>
      <div class="btn">
        <el-button-group>
          <el-button size="small" round icon="el-icon-caret-right"
            >播放全部</el-button
          >
          <el-button size="small" round
            ><i class="el-icon-arrow-right el-icon-plus"></i
          ></el-button>
        </el-button-group>

        <el-button class="threebtn" size="small" round icon="el-icon-folder-add"
          >收藏({{ playlist.subscribedCount | changeValue }})</el-button
        >
        <el-button
          class="threebtn"
          size="small"
          round
          icon="el-icon-refresh-right"
          >分享({{ playlist.shareCount }})</el-button
        >
        <el-button class="threebtn" size="small" round icon="el-icon-download"
          >下载全部</el-button
        >
      </div>
      <div class="introduce">
        <div class="biaoqian">
          标签：<el-tag size="mini" v-for="(item, i) in tags" :key="i">{{
            item
          }}</el-tag>
        </div>
        <div class="biaoqian">
          歌曲:<span>{{ playlist.tracks.length }}</span
          >&nbsp;&nbsp;播放:&nbsp;<span>{{
            playlist.playCount | changeValue
          }}</span>
        </div>
        <div class="biaoqian">
          简介：<span>{{ playlist.description }}</span>
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
      tags: [],
      playlist: {
        creator: {},
        tracks: [],
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getMusiclist(this.id);
  },
  methods: {
    // 格式化人数

    // 获取歌单数据
    async getMusiclist(id) {
      const { data: res } = await this.$http.get(`playlist/detail?id=${id}`);
      this.playlist = res.playlist;
      this.tags = res.playlist.tags;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  /* margin-top: 20px; */
}
.detail {
  /* display: flex; */
  margin-left: 20px;
}
.title {
  font-size: 25px;
  font-weight: bold;
  color: #373737;
}
.header img {
  width: 170px;
  height: 170px;
  border-radius: 5px;
}
.author {
  display: flex;
  align-items: center;
}
.author .deaileName {
  margin-left: 10px;
  font-size: 7px;
  color: #507daf;
}
.date {
  margin-left: 10px;
  font-size: 7px;
  color: #747474;
}
.author .picture {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
.el-button-group .el-button {
  background: red;
  color: #fff;
}
.threebtn {
  font-size: 16px;
  margin-left: 10px;
}
.btn {
  margin-top: 10px;
}
.biaoqian {
  font-size: 14px;
  color: #747474;
}
.biaoqian .el-tag {
  margin-left: 5px;
}
.introduce {
  margin-top: 5px;
}
</style>