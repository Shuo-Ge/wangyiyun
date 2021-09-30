<template>
  <div>
    <!-- 歌单详情 -->
    <!-- 头部 -->
    <ListViewTop :playlist="playlist"></ListViewTop>
    <!-- 导航 -->
    <ListViewNav :playlist="playlist"></ListViewNav>
  </div>
</template>
<script>
// 歌单列表头部
import ListViewTop from "./ListViewTop.vue";
// 歌单列表
import ListViewNav from "./ListViewNav.vue";

export default {
  data() {
    return {
      id: "",
      playlist: {
        creator: {},
        tracks: [],
      },
    };
  },
  components: {
    ListViewTop,
    ListViewNav,
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    this.getMusiclist(this.id);
  },
  methods: {
    // 获取歌单列表
    async getMusiclist(id) {
      const { data: res } = await this.$http.get(`/playlist/detail?id=${id}`);
      this.playlist = res.playlist;
      // this.$store.commit("setPlaylist", this.playlist.tracks);
      console.log(this.playlist);
    },
  },
};
</script>

<style scoped>
</style>