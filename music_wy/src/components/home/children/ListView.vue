<template>
  <div>
    <!-- 歌单详情 -->
    <!-- 头部 -->
    <ListViewTop
      :playlist="playlist"
      :trackIdslist="trackIdslist"
    ></ListViewTop>
    <!-- 导航 -->
    <ListViewNav
      :playlist="playlist"
      :trackIdslist="trackIdslist"
    ></ListViewNav>
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

      trackIds: {},
      trackIdslist: [],
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
      this.trackIds = this.playlist.trackIds;
      for (let i = 0, length = this.trackIds.length; i < length; i++) {
        this.getSongsSetail(this.trackIds[i].id);
      }
      console.log(this.trackIdslist);
    },
    /**获取歌单歌曲信息 */
    async getSongsSetail(id) {
      const { data: res } = await this.$http.get(`/song/detail?ids=${id}`);
      this.trackIdslist.push(res.songs[0]);
      // console.log(res);
    },
  },
};
</script>

<style scoped>
</style>