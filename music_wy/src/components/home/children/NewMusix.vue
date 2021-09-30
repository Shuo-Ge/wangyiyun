<template>
  <div>
    <h3 class="title">最新音乐></h3>
    <div>
      <ul class="listUl">
        <li
          :class="['list', { active: i == selectindex ? true : false }]"
          v-for="(item, i) in newMusicList"
          :key="i"
          @mouseover="changeIndex(i)"
          @click="getMusicDetail(item.id)"
        >
          <img :src="item.picUrl" alt="" />
          <div class="listName">
            <span class="name">{{ item.name }}</span>
            <!-- <span class="name">123</span> -->
            <span class="author">
              {{ newMusicList[i].song.artists[0].name }}
            </span>
            <i class="el-icon-video-play ico"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMusicList: {},
      artIsts: [],
      selectindex: 0, //设置选中的索引,
      // 保存歌曲详细信息
      MusicDetail: {},
    };
  },
  created() {
    this.getNewMusic();
  },
  methods: {
    async getNewMusic(count = 12) {
      const { data: res } = await this.$http.get(
        `/personalized/newsong?limit=${count}`
      );
      this.newMusicList = res.result;

      console.log(this.newMusicList);
    },
    // 获取歌曲详细信息
    async getMusicDetail(id) {
      const { data: res } = await this.$http.get(`/song/detail?ids=${id}`);
      this.MusicDetail = res;
      this.$store.commit("setPlaylist", this.MusicDetail.songs);
      this.$store.commit("setPlayIndex", 0);
      console.log(res);
    },
    changeIndex(index) {
      this.selectindex = index;
    },
    play() {
      // this.$store.commit("setPlaylist", this.newMusicList);
      console.log(123);
    },
  },
};
</script>

<style scoped>
.title {
  padding-top: 30px;
  color: #373737;
}
.listUl {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list {
  position: relative;
  display: flex;
  width: 360px;
  height: 50px;
  /* background: pink; */
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}
.listName {
  margin-left: 10px;
}
.author {
  position: absolute;
  top: 30px;
  left: 60px;
  font-size: 12px;
  white-space: nowrap;
  width: 100%;
  color: #747474;
}
.name {
  white-space: nowrap;
  width: 100%;
  color: #373737;
  font-size: 14px;
}
.list img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}
.active {
  background: #eaeaea;
}
.ico {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 25px;
  background: rgba(255, 0, 0, 0.5);
  border-radius: 15px;
  color: #fff;
}
</style>