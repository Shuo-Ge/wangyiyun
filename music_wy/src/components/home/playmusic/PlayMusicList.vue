<template>
  <!-- 播放界面 -->
  <div class="body">
    <div class="header" @click="$emit('back')">
      <i class="el-icon-arrow-down down"></i>
    </div>
    <div class="main">
      <div class="left">
        <img
          class="oneimg"
          :class="{ oneimg2: !paused }"
          src="@/assets/img/needle-ab.png"
          alt=""
        />
        <img class="twoimg" src="@/assets/img/jiaopian.png" alt="" />
        <img
          class="threeimg"
          :src="playlist[playCurrentIndex].al.picUrl"
          alt=""
        />
      </div>
      <div class="center">
        <div class="top">
          <div class="name">{{ playlist[playCurrentIndex].name }}</div>
          <div class="author">
            {{ playlist[playCurrentIndex].ar[0].name }}
          </div>
        </div>
        <div class="center-down">
          <div>
            <ul>
              <li v-for="(item, i) in lyric.lrc.lyric.split(/\s/gis)" :key="i">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">3</div>
    </div>
    <!-- 评论 -->
    <div class="footer">
      <h5>全部评论({{ comment.total }})</h5>
      <div
        v-for="(item, index) in comment.comments"
        :key="index"
        class="author2"
      >
        <img :src="item.user.avatarUrl" alt="" class="img2" />
        <div class="name2">
          <div class="left2">
            <div class="top2">
              <span class="nickname2">{{ item.user.nickname }}:</span>
              <span class="contnet2">{{ item.content }}</span>
            </div>
            <div class="down2">
              {{ item.time | dataFormate1 }}
            </div>
          </div>
          <div class="right2"></div>
        </div>
      </div>
      <el-button @click="add">加载更多</el-button>
    </div>
    <!-- 控件 -->
    <div class="centerContrall">
      <div>
        <ul class="center-top">
          <li><i class="iconfont">&#xe6a2;</i></li>
          <li><i class="iconfont">&#xe603;</i></li>
          <li @click="play">
            <i v-if="paused" class="iconfont">&#xe60c;</i>
            <i v-else class="iconfont">&#xe606;</i>
          </li>
          <li><i class="iconfont">&#xe602;</i></li>
          <li><i class="iconfont">&#xe727;</i></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Footer from "@/components/home/Footer";
export default {
  props: ["paused", "play", "comment", "lyric"],
  data() {
    return {
      // 获取所用评论用户信息

      // ric: "",

      show3: true,
    };
  },
  components: {
    Footer,
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["playlist", "playCurrentIndex"]),
    // lyricList() {
    //   let arr = this.lyric.lrc.lyric.split(/\s/gis).map((item, i) => {
    //     let min = item.slice(1, 3);
    //     let sec = item.slice(4, 5);
    //     let mill = item.slice(8, 11);
    //     console.log(min, sec, mill);
    //     return {
    //       min,
    //       sec,
    //       mill,
    //       lyric: item.slice(12, item.length),
    //       content: item,
    //       time:
    //         parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) * 60 * 1000,
    //     };
    //   });
    //   console.log(arr);
    //   return arr;
    // },
  },
  methods: {
    async getComment() {
      const { data: res } = await this.$http.get(
        `/comment/music?id=${
          this.$store.state.playlist[this.$store.state.playCurrentIndex].id
        }`
      );
      this.comment = res;
      console.log(this.comment);
    },
    add() {
      this.i++;
      console.log(this.i);
      return this.i;
    },
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  background: linear-gradient(#d6ddde, #fff);
  position: fixed;
  top: 0;
  left: 0;
}
.down {
  font-size: 30px;
  margin: 20px;
  cursor: pointer;
}
.main {
  position: relative;
  width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.oneimg {
  position: absolute;
  top: 0;
  left: 130px;
  width: 100px;
  height: 150px;
  z-index: 1;
  transform-origin: top left;
  transform: rotate(-30deg);
  z-index: 999;
  transition: all 1s;
}
.oneimg2 {
  position: absolute;
  top: 0;
  left: 130px;
  width: 100px;
  height: 150px;
  z-index: 1;
  transform-origin: top left;
  transform: rotate(0deg);
  z-index: 999;
  transition: all 1s;
}

.twoimg {
  position: absolute;
  top: 50px;
  width: 300px;
  height: 300px;
  z-index: 1;
}
.threeimg {
  position: absolute;
  top: 106px;
  left: 56px;
  z-index: 0;
  width: 190px;
  height: 190px;
}
.name {
  font-size: 30px;
  color: #303131;
  width: 500px;
  overflow: hidden;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  margin: 0 auto;
}
.author {
  font-size: 14px;
  color: #8c8f90;
}
.center .top {
  text-align: center;
}
.center-down {
  width: 600px;
  margin-top: 20px;
  text-align: center;
  height: 300px;
  overflow: auto;
  padding: 50px;
}

.img2 {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.author2 {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.name2 {
  margin-left: 10px;
  /* padding-bottom: 20px; */
}
.left2 .down2 {
  padding-top: 10px;
  padding-bottom: 20px;
}
.nickname2 {
  color: #507daf;
  font-size: 12px;
}
.contnet2 {
  color: #747474;
  font-size: 14px;
}
.down2 {
  font-size: 12px;
  color: #9f9f9f;
}
.footer {
  width: 960px;
  margin: 30px auto;
  height: 370px;
  overflow: auto;
}
.FooterMusic {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0px;
  background: #fff;
  border: 1px solid #ccc;
}
.centerContrall {
  /* display: flex; */
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  height: 100px;
  background: #fff;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 100px;
}
.centerContrall ul {
  width: 300px;
  margin: 0 auto;
}
.centerContrall ul li {
  float: left;
  margin-left: 40px;
  line-height: 100px;
}
.center-top li i {
  font-size: 20px;
}
</style>