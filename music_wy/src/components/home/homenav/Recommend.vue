<template>
  <!-- 个性推荐 -->
  <div>
    <!-- 轮播图 -->
    <Swiper></Swiper>
    <!-- 推荐歌单 -->
    <MusicList class="musiclist"></MusicList>
    <!-- 独家放送 -->
    <MeSend></MeSend>
    <!-- 最新音乐 -->
    <NewMusic></NewMusic>
  </div>
</template>

<script>
// 导入轮播图插件
import Swiper from "../children/Swiper.vue";
// 导入推荐歌单
import MusicList from "../children/MusilcList.vue";
// 导入独家放送
import MeSend from "../children/MeSend.vue";
// 导入最新音乐
import NewMusic from "../children/NewMusix.vue";
export default {
  components: {
    Swiper,
    MusicList,
    MeSend,
    NewMusic,
  },
};
</script>

<style>
</style>