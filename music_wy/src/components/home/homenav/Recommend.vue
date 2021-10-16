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
    <!-- 推荐mv -->
    <RecmmentMv></RecmmentMv>
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
// 导入推荐mv
import RecmmentMv from "../children/RecmmentMv";
export default {
  components: {
    Swiper,
    MusicList,
    MeSend,
    NewMusic,
    RecmmentMv,
  },
};
</script>

<style>
</style>