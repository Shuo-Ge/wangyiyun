<template>
  <div>
    <h3>推荐mv></h3>
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
          <i class="el-icon-caret-right">{{ item.playCount | changeValue }}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RecommendList: {},
    };
  },
  created() {
    this.getRecommendMv();
  },
  methods: {
    // 获取推荐mv
    async getRecommendMv() {
      const { data: res } = await this.$http.get(`/personalized/mv`);
      if (res.code == 200) {
        this.RecommendList = res.result;
      }
      console.log(res);
    },
    newMv(id) {
      this.$router.push({
        path: "/musicmv",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.right-detail {
  display: flex;
  justify-content: space-between;
}
.right-divblock {
  cursor: pointer;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.right-img {
  width: 260px;
  height: 150px;
  background: pink;
}
.right-img img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.right-title {
  position: relative;
  padding: 0;
  margin: 0;
  width: 130px;
  padding: 10px;
}
.right-title .title {
  font-size: 14px;
  color: #373737;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.right-title .name {
  color: #9f9f9f;
  font-size: 12px;
}
.right-title i {
  position: absolute;
  top: -143px;
  right: -94px;
  font-size: 14px;
  color: #fff;
}
</style>