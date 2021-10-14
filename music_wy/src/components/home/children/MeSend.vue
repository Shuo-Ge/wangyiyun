<template>
  <div>
    <h3 class="title">独家放送></h3>
    <div class="MeList">
      <ul>
        <li v-for="(item, i) in getMeListImg" :key="i">
          <router-link :to="{ path: '/musicmv', query: { id: item.id } }">
            <img :src="item.sPicUrl" alt="" />
          </router-link>
          <div class="name">{{ item.name }}</div>
          <i class="el-icon-video-play ico"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getMeListImg: [],
    };
  },
  created() {
    this.getMeList();
  },
  methods: {
    async getMeList() {
      const { data: res } = await this.$http.get(
        "/personalized/privatecontent"
      );
      this.getMeListImg = res.result;

      console.log(this.getMeListImg);
    },
    // meSendMv() {
    //   this.$router.push({
    //     path: "/musicmv",
    //     query: {
    //       id: this.getMeListImg.id,
    //     },
    //   });
    // },
  },
};
</script>

<style scoped>
.title {
  padding-top: 20px;
  color: #373737;
}
.MeList ul {
  display: flex;
  justify-content: space-between;
}
.MeList ul li {
  position: relative;
  width: 355px;
  height: 200px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.MeList ul li img {
  width: 100%;
}
.name {
  font-size: 14px;
  color: #373737;
}
.ico {
  position: absolute;
  top: 7px;
  left: 10px;
  font-size: 30px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 18px;
}
</style>