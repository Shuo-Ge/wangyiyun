<template>
  <!-- 播放控件 -->
  <div class="foot">
    <!-- 进度条 -->
    <div class="progress">
      <div class="solid" :style="{ width: curWidth }"></div>
    </div>
    <div class="left">
      <img
        @click="(show = !show), getComment(), getMusicLyric()"
        :src="playlist[playCurrentIndex].al.picUrl"
        alt=""
      />
      <div class="nameList">
        <div class="name">
          <span>{{ playlist[playCurrentIndex].name }}</span>
          <i class="iconfont love">&#xe617;</i>
        </div>
        <div class="author">{{ playlist[playCurrentIndex].ar[0].name }}</div>
      </div>
    </div>
    <div class="center">
      <div>
        <ul class="center-top">
          <li><i class="iconfont">&#xe6a2;</i></li>
          <li><i class="iconfont">&#xe603;</i></li>
          <li @click="play">
            <i v-if="$store.state.paused" class="iconfont">&#xe60c;</i>
            <i v-else class="iconfont">&#xe606;</i>
          </li>
          <li><i class="iconfont">&#xe602;</i></li>
          <li><i class="iconfont">&#xe727;</i></li>
        </ul>
      </div>
    </div>
    <div class="right">3</div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"
      @timeupdate="getMusicTime"
    ></audio>
    <PlayMusicList
      @back="show = !show"
      v-show="show"
      :play="play"
      class="playMusicList"
      :comment="comment"
      :lyric="lyric"
    ></PlayMusicList>
  </div>
</template>
<script>
import PlayMusicList from "@/components/home/playmusic/PlayMusicList";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // 播放
      // paused: true,
      show: false,
      // 获取所用评论用户信息
      comment: {},
      // 获取歌词
      lyric: {
        lrc: {
          lyric: "",
        },
      },
      // 记录当前播放的时间的宽度
      curWidth: "",
    };
  },
  components: {
    PlayMusicList,
  },
  created() {
    // console.log(
    //   this.$store.state.playlist[this.$store.state.playCurrentIndex].id
    // );
  },
  updated() {
    this.playAuto();
  },
  computed: {
    ...mapState(["playlist", "playCurrentIndex"]),
  },
  mounted() {
    console.log(this.$refs.audio);
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.state.paused = false;
        this.$store.state.flag = true;
        // this.getMusicTime();
      } else {
        this.$refs.audio.pause();
        this.$store.state.paused = true;
        this.$store.state.flag = false;
        // this.getMusicTime();
      }
    },
    // 获取当前歌曲播放的时间
    getMusicTime() {
      // let allTime = this.$refs.audio.duration;
      // let curTime = this.$refs.audio.currentTime;
      // let allWidth = 1870;
      this.curWidth =
        (1870 * this.$refs.audio.currentTime) / this.$refs.audio.duration +
        "px";
      // console.log(this.curWidth);
    },
    async getComment() {
      const { data: res } = await this.$http.get(
        `/comment/music?id=${this.playlist[this.playCurrentIndex].id}`
      );
      this.comment = res;
      console.log(this.comment);
    },
    // 获取歌词
    async getMusicLyric() {
      const { data: res } = await this.$http.get(
        `/lyric?id=${
          this.$store.state.playlist[this.$store.state.playCurrentIndex].id
        }`
      );
      this.lyric = res;
      console.log(this.lyric);
    },
    playAuto() {
      if (this.$store.state.flag) {
        this.$refs.audio.autoplay = "autoplay";
        this.$store.state.paused = false;
      } else {
        this.$store.state.paused = true;
      }
    },
  },
};
</script>

<style scoped>
.progress {
  width: 1870px;
  height: 5px;
  background: #ccc;
  position: absolute;
  top: -3px;
  height: 4px;
  cursor: pointer;
}
.solid {
  width: 0px;
  height: 4px;
  background-image: linear-gradient(to right, #ead6ee, #a0f1ea);
  box-shadow: 0px -1px 3px 1px linear-gradient(to right, #ead6ee, #a0f1ea);
  cursor: pointer;
}

.foot {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.left {
  display: flex;
}
.left img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-top: 5px;
  cursor: pointer;
}
.nameList {
  margin-left: 10px;
}
.nameList div {
  margin-top: 5px;
}
.name {
  font-size: 16px;
  color: #333333;
}
.love {
  font-size: 25px;
  cursor: pointer;
}
.author {
  font-size: 13px;
  color: #333333;
}
.center {
  margin-left: -100px;
}
.center-top {
  display: flex;
  flex-wrap: nowrap;
}
.center-top li {
  margin-left: 20px;
  cursor: pointer;
}
.center-top li i {
  font-size: 20px;
}
</style>