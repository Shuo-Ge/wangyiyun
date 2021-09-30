<template>
  <div>
    <!-- 表格 -->
    <el-table :data="playlist.tracks" stripe style="width: 100%">
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
  </div>
</template>

<script>
export default {
  props: ["playlist"],
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped>
.el-table {
  width: 100%;
  margin: auto;
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
</style>