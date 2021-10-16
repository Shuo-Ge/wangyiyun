<template>
  <!-- 歌手 -->
  <div>
    <div class="tag">
      <div class="language">
        <label for="">语种:</label>
        <el-button round size="mini">全部</el-button>
        <el-button round size="mini">华语</el-button>
        <el-button round size="mini">欧美</el-button>
        <el-button round size="mini">日本</el-button>
        <el-button round size="mini">韩国</el-button>
        <el-button round size="mini">其他</el-button>
      </div>
      <div class="classfiy">
        <label for="">分类:</label>
        <el-button round size="mini">全部</el-button>
        <el-button round size="mini">男歌手</el-button>
        <el-button round size="mini">女歌手</el-button>
        <el-button round size="mini">乐队组合</el-button>
      </div>
      <div class="select">
        <label for="">筛选:</label>
        <el-button v-for="(item, i) in list" :key="i" round size="mini">{{
          item
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 筛选分类
      list: [],
    };
  },
  created() {
    this.letter();
  },
  methods: {
    //   获取歌手分类列表
    async getSingerList() {
      const { data: res } = await this.$http.get(``);
    },
  },
  computed: {
    letter() {
      for (let i = 0; i < 26; i++) {
        this.list.push(String.fromCharCode(65 + i));
      }
      console.log(this.list);
    },
  },
};
</script>

<style >
.tag label {
  padding-right: 10px;
}
</style>