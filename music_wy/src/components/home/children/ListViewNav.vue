<template>
  <!-- 歌单列表 -->
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="muscilist" @click="selectIndex('muscilist')"
        >音乐列表</el-menu-item
      >
      <el-menu-item
        @click="selectIndex('comment'), getComments()"
        index="comment"
        >评论({{ playlist.commentCount }})</el-menu-item
      >
    </el-menu>
    <!-- 表格 -->
    <el-table
      v-if="selectindex == 'muscilist'"
      :data="playlist.tracks"
      stripe
      style="width: 100%"
      @row-click="plays"
      :row-class-name="tableRowClassName"
    >
      <el-table-column class="index" type="index" label=""> </el-table-column>
      <el-table-column prop="" label="" width="90px">
        <i class="iconfont love">&#xe617;</i>
        &nbsp;
        <i class="el-icon-download download"></i>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="680px">
      </el-table-column>
      <el-table-column
        class="author"
        prop="ar[0].name"
        label="歌手"
        width="330px"
      >
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="430px">
      </el-table-column>
      <el-table-column prop="dt" label="时长">
        <template slot-scope="scope">
          {{ scope.row.dt | dataFormate2 }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 评论  -->
    <div v-else-if="selectindex == 'comment'">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
        v-model="textarea2"
      >
      </el-input>

      <el-button round size="mini">评论</el-button>
      <div class="comment">
        <h5>精彩评论</h5>
        <div v-for="(item, index) in comments" :key="index" class="author">
          <img :src="item.user.avatarUrl" alt="" class="img" />
          <div class="name">
            <div class="left">
              <div class="top">
                <span class="nickname">{{ item.user.nickname }}:</span>
                <span class="contnet">{{ item.content }}</span>
              </div>
              <div class="down">
                {{ item.time | dataFormate1 }}
              </div>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  data() {
    return {
      id: "",
      commentCountL: "",
      activeIndex: "muscilist",
      textarea2: "",
      comments: [],
      selectindex: "muscilist",
      // 歌单索引号
      index: "",
    };
  },

  created() {},
  methods: {
    // 获取评论
    async getComments() {
      const { data: res } = await this.$http.get(
        `/comment/playlist?id=${this.playlist.id}&limit=${this.playlist.commentCount}`
      );
      this.comments = res.comments;
      console.log(this.playlist.commentCount);
    },
    selectIndex(index) {
      this.selectindex = index;
    },

    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    plays(row) {
      var index = row.index;
      this.index = index;
      this.$store.commit("setPlaylist", this.playlist.tracks);
      this.$store.commit("setPlayIndex", this.index);
      // this.$store.commit("setPlayPaused", true);
    },
  },
};
</script>

<style scoped>
.el-menu {
  display: flex;
  width: 100%;
}
.el-table {
  width: 100%;
  margin: auto;
}
.el-table-column {
  cursor: pointer;
}
.index {
  font-size: 12px;
}
.author {
  font-size: 12px;
}
.love,
.download {
  cursor: pointer;
  font-size: 20px;
}

.el-input {
  width: 1980px;
}
.el-button {
  margin-top: 10px;
}
.img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.author {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.name {
  margin-left: 10px;
  /* padding-bottom: 20px; */
}
.left .down {
  padding-top: 10px;
  padding-bottom: 20px;
}
.nickname {
  color: #507daf;
  font-size: 12px;
}
.contnet {
  color: #747474;
  font-size: 14px;
}
.down {
  font-size: 12px;
  color: #9f9f9f;
}
</style>