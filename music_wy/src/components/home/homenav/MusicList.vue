<template>
  <!-- 歌单 -->
  <div>
    <div
      class="bg"
      :style="{ backgroundImage: `url(${MusicList[0].coverImgUrl})` }"
    ></div>
    <div class="head">
      <div class="img">
        <img :src="MusicList[0].coverImgUrl" alt="" />
      </div>
      <div class="headright">
        <p class="btn"><i class="el-icon-present"></i>精品歌单</p>
        <p class="title">{{ MusicList[0].name }}</p>
        <p class="detal">{{ MusicList[0].description }}</p>
      </div>
    </div>
    <div class="nav">
      <div class="left">
        <el-button round
          >{{ changeName }}<i class="el-icon-arrow-right"></i
        ></el-button>
      </div>
      <div class="right">
        <el-button
          round
          size="mini"
          v-for="(item, index) in tag"
          :key="index"
          @click="selectTag(index)"
          >{{ item.name }}</el-button
        >
      </div>
    </div>
    <div class="musicList">
      <router-link
        :to="{ path: '/listview', query: { id: item.id } }"
        v-for="(item, i) in MusicList"
        :key="i"
        class="tj-li"
      >
        <img :src="item.coverImgUrl" alt="item.name" />
        <div class="name">{{ item.name }}</div>
        <div class="const">
          <i class="el-icon-caret-right"></i>{{ item.playCount | changeValue }}
        </div>
        <div class="user">
          <i class="el-icon-user"></i>{{ item.creator.nickname }}
        </div>
        <div class="play">
          <i class="el-icon-video-play"></i>
        </div>
      </router-link>
    </div>

    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination
        @next-click="down"
        layout="total, sizes, prev, pager, next, jumper"
        :total="MusicList.length"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["MusicList", "tag"],
  data() {
    return {
      // 改变标签
      changeName: "华语",
      // 歌单页数
      offset: "1",
    };
  },
  methods: {
    selectTag(index) {
      this.changeName = this.tag[index].name;
      // console.log(this.tag[index].name);
    },
    // down() {
    //   this.offset++;
    //   getMusicListMessage(this.offset);
    //   console.log(this.offset);
    // },
    // async getMusicListMessage(offset) {
    //   const { data: res } = await this.$http.get(
    //     `/top/playlist?offset=${offset}`
    //   );
    //   if (res.code == 200) {
    //     this.MusicList = res.playlists;
    //     console.log(this.MusicList);
    //     this.$message.success("获取歌单成功");
    //   } else {
    //     this.$message.error("获取歌单失败");
    //   }
    // },
  },
};
</script>

<style scoped>
.head {
  display: flex;
  width: 1200px;
  height: 170px;
  border-radius: 10px;
  padding-top: 15px;
  padding-left: 18px;
  box-sizing: border-box;
}
.bg {
  position: absolute;
  width: 1200px;
  height: 100px;
  background-size: 100%;
  filter: blur(50px);
  z-index: -1;
  border-radius: 10px;
}
.headright {
  margin-left: 20px;
}

.img img {
  width: 140px;
  height: 140px;
  border-radius: 10px;
}
.btn {
  width: 100px;
  height: 33px;
  border-radius: 16px;
  border: 1px solid #c59451;
  text-align: center;
  line-height: 33px;
  color: #c59451;
}
.title {
  color: #fff;
}
.detal {
  font-size: 14px;
  color: #939994;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.nav {
  display: flex;
  justify-content: space-between;
}
.musicList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tj-li {
  position: relative;
  width: 205px;
  height: 205px;
  border-radius: 5px;
  margin: 25px 17px 25px 0;
  cursor: pointer;
}
.musicList img {
  width: 205px;
  height: 205px;
  background: pink;
  border-radius: 5px;
  margin-top: 25px;
  border: 1px solid #ccc;
}
.const {
  position: absolute;
  right: 7px;
  top: 30px;
  color: #ffffde;
  font-size: 14px;
}
.name {
  font-size: 14px;
}
.user {
  position: absolute;
  left: 7px;
  bottom: -20px;
  font-size: 14px;
  color: rgb(247, 244, 244);
}
.play {
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 40px;
  color: red;
  display: none;
}
.tj-li:hover .play {
  display: block;
}
.block {
  margin-top: 50px;
  text-align: center;
}
</style>