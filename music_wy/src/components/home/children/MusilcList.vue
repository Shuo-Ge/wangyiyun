<template>
  <div>
    <div class="tj_music">
      <h3 class="title">推荐歌单></h3>
      <ul class="tj-ul">
        <li class="tj-li">
          <img src="@/assets/img/day.png" alt="" />
          <div class="name">每日歌曲推荐</div>
        </li>
        <router-link
          :to="{ path: '/listview', query: { id: item.id } }"
          v-for="(item, i) in listImgUrl"
          :key="i"
          class="tj-li"
        >
          <img :src="item.picUrl" alt="item.name" />
          <div class="name">{{ item.name }}</div>
          <div class="const">
            <i class="el-icon-caret-right"></i
            >{{ item.playCount | changeValue }}
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存歌曲列表
      listImgUrl: [],
    };
  },
  created() {
    this.getMUsic();
  },
  methods: {
    async getMUsic(limit = 9) {
      const { data: res } = await this.$http.get(`personalized?limit=${limit}`);
      // this.$store
      this.listImgUrl = res.result;
      console.log(this.listImgUrl);
    },
  },
};
</script>

<style scoped>
.title {
  color: #373737;
}

.tj-ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tj-ul .tj-li {
  position: relative;
  width: 205px;
  height: 205px;
  border-radius: 5px;
  margin: 25px 17px 25px 0;
  cursor: pointer;
}
.tj-ul .tj-li img {
  width: 100%;
  border-radius: 5px;
}
.const {
  position: absolute;
  right: 10px;
  top: 0px;
  color: #fff;
}
.name {
  font-size: 14px;
}
</style>