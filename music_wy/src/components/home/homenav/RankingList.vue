<template>
  <div>
    <div class="official">
      <h3>官方榜</h3>
      <div class="ranking">
        <div class="divranking">
          <div class="rankingimg" v-for="(item, index) in lists" :key="index">
            <router-link :to="{ path: '/listview', query: { id: item.id } }">
              <img :src="item.coverImgUrl" alt="" />
            </router-link>
            <span>{{ item.updateTime | dataFormate3 }}更新</span>
          </div>
        </div>
        <div class="rankingtable">
          <ul v-for="(item, index) in 4" :key="index">
            <li
              @click="getMusicDetail(item2.id)"
              v-for="(item2, index2) in musiclist[index + 1]"
              :key="index2"
            >
              <div class="rankingtableleft">
                <span class="index"> {{ index2 + 1 }}</span>
                <span class="percent"></span>
                <span class="musicname">{{ item2.name }}</span>
              </div>
              <div>
                <span class="rankingtableright">{{ item2.ar[0].name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ranking2">
        <h3>全球榜</h3>
        <div class="rangkingList">
          <ul>
            <li v-for="(item, index) in listsother" :key="index">
              <router-link :to="{ path: '/listview', query: { id: item.id } }">
                <img :src="item.coverImgUrl" alt="" />
                <p>{{ item.name }}</p>
              </router-link>

              <i class="el-icon-caret-right">{{
                item.playCount | changeValue
              }}</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["rankinglist", "lists"],
  data() {
    return {
      // 保存歌单列表数据
      musiclist: [
        {
          al: {},
        },
      ],
      // 保存排行榜信息
      rankinglist: {
        coverImgUrl: "",
      },
      lists: [],
      listsother: [],
    };
  },
  created() {
    this.getRankingList();
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    // 获取歌单详情
    async getMusicList(id) {
      const { data: res } = await this.$http.get(`/playlist/detail?id=${id}`);
      if (res.code == 200) {
        // this.musiclist = res.playlist.tracks;
        this.musiclist.push(res.playlist.tracks.slice(0, 5));
        console.log(this.musiclist);
      }
    },
    // 获取排行榜
    async getRankingList() {
      const { data: res } = await this.$http.get(`/toplist/detail`);
      if (res.code == 200) {
        console.log(res);
        this.rankinglist = res;
        this.lists = this.rankinglist.list.slice(0, 4);
        this.listsother = this.rankinglist.list.slice(4);
        console.log(this.lists);
        this.getMusicList(this.lists[0].id);
        this.getMusicList(this.lists[1].id);
        this.getMusicList(this.lists[2].id);
        this.getMusicList(this.lists[3].id);
      }
    },
    // 获取歌曲详细信息
    async getMusicDetail(id) {
      const { data: res } = await this.$http.get(`/song/detail?ids=${id}`);
      this.MusicDetail = res;
      this.$store.commit("setPlaylist", this.MusicDetail.songs);
      this.$store.commit("setPlayIndex", 0);
      console.log(res);
    },
  },
  computed: {},
};
</script>

<style scoped>
.ranking {
  display: flex;
  margin-top: 50px;
}
.divranking div:nth-child(n + 2),
.rankingtable ul:nth-child(n + 2) {
  margin-top: 40px;
}
.rankingimg {
  position: relative;
  width: 175px;
  height: 175px;
}
.rankingimg span {
  position: absolute;
  top: 111px;
  left: 36px;
  color: #fff;
  font-size: 14px;
}
.rankingimg img {
  width: 175px;
  height: 175px;
  border-radius: 5px;
}

.rankingtable ul {
  height: 175px;
  padding: 0;
  margin: 0 40px;
}

.rankingtable ul li {
  width: 900px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 0 10px;
  border-radius: 5px;
  line-height: 30px;
  margin-top: 5px;
  cursor: pointer;
}
.rankingtable ul li:nth-child(even) {
  background: #fff;
}
.rankingtable ul li:nth-child(1) .index {
  color: #f85524;
}
.rankingtable ul li:nth-child(2) .index {
  color: #f88d6c;
}
.rankingtable ul li:nth-child(3) .index {
  color: #d4313f;
}
.rankingtable ul li:nth-child(n + 4) .index {
  color: #ccc;
}
.rankingtable ul li:hover {
  background: #f4f4f4;
}
.rankingtableleft span {
  margin-left: 5px;
  font-size: 14px;
}
.rankingtableleft .index {
  color: #ef6941;
}
.rankingtableleft .percent {
  color: #9b9b9b;
}
.rankingtableright {
  font-size: 14px;
  color: #9b9b9b;
}
.rangkingList ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.rangkingList ul li {
  position: relative;
  width: 205px;
  height: 205px;
  background: pink;
  border-radius: 5px;
  margin: 25px 17px 25px 0;
  cursor: pointer;
  /* margin-left: 10px; */
}
.rangkingList ul li img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.rangkingList ul li p {
  font-size: 14px;
}
.rangkingList ul li i {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  font-size: 12px;
}
</style>