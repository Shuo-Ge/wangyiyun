<template>
  <div>
    <template>
      <el-carousel :interval="5000" type="card" indicator-position="none">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <h3 class="medium">
            <img :src="item.imageUrl" alt="" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: "",
      playlist: [],
    };
  },
  created() {
    this.getLunBoData();
  },
  methods: {
    async getLunBoData(type = 0) {
      const { data: res } = await this.$http.get(`/banner?type=${type}`);
      this.banners = res.banners;
      console.log(this.banners);
    },
    play() {
      this.$store.commit("setPlaylist", this.banners);
    },
    // 获取歌单列表
    // async getMusiclist(id) {
    //   const { data: res } = await this.$http.get(`/playlist/detail?id=${id}`);
    //   this.playlist = res.playlist;
    //   // this.$store.commit("setPlaylist", this.playlist.tracks);
    //   console.log(this.playlist);
    // },
  },
};
</script>

<style scoped>
.medium img {
  width: 100%;
  border-radius: 10px;
}
</style>