<template>
  <!-- 主页面 -->
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="@/assets/img/logo.png" alt="" />
        <span>网易云音乐</span>
        <div class="back">
          <el-button @click="back" icon="el-icon-arrow-left" circle></el-button>
          <el-button icon="el-icon-arrow-right" circle></el-button>
        </div>
        <div class="seach">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
      </div>
      <div>
        <div class="uers">
          <div class="user_img"></div>
          <span>请登录</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu :default-active="activePath" router>
          <el-menu-item index="find">
            <span slot="title">发现音乐</span>
          </el-menu-item>
          <el-menu-item index="play">
            <span slot="title">播客</span>
          </el-menu-item>
          <el-menu-item index="videl">
            <span slot="title">视频</span>
          </el-menu-item>
          <el-menu-item index="friend">
            <span slot="title">朋友</span>
          </el-menu-item>
          <el-menu-item index="live">
            <span slot="title">直播</span>
          </el-menu-item>
          <el-menu-item index="private">
            <span slot="title">私人FM</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 右侧内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部内容 -->
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      input2: "",
      activePath: "find",
    };
  },
  components: {
    Footer,
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* 头部 */
.home-container {
  position: relative;
  height: 100%;
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  /* padding-bottom: 60px; */
  width: 100%;
  background: #ec4141;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header > div {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.back {
  margin-left: 100px;
}
.back .el-button {
  width: 20px;
  height: 20px;
  text-align: center;
  padding: 0;
  background: rgba(255, 255, 255, 0.2);
  border: 0;
  color: #fff;
}
.seach {
  margin-left: 20px;
}
.seach .el-input {
  width: 160px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}
.uers {
  font-size: 12px;
  display: flex;
  align-items: center;
}
.uers .user_img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ccc;
  margin-right: 10px;
}
.el-aside {
  position: fixed;
  top: 60px;
  left: 0;
  height: 100%;
  color: #333;
  border-right: 1px solid #ccc;
}
.el-container {
  margin-top: 20px;
  margin-bottom: 60px;
}
.el-main {
  position: absolute;
  left: 200px;
  padding-bottom: 60px;
}
.el-footer {
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 9;
}
</style>