import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playlist: [{
            name: "这城市的你我",
            id: 1838080899,
            al: {
                id: 126145071,
                name: "这城市的你我",
                pic: 109951165898808900,
                picUrl: "http://p3.music.126.net/tS9xr_DxycG0U6ty6g__mw==/109951165898808895.jpg",
                pic_str: "109951165898808895"
            },
            ar: [0],
            dt: ''
        }],
        playCurrentIndex: 0,
        lyric: "",
        paused: true,
        flag: false
    },
    // getters: {
    //     lyricList() {
    //         let arr = this.lyric.lrc.lyric.split(/\s/gis).map((item, i) => {
    //             let min = item.slice(1, 3);
    //             let sec = item.slice(4, 5);
    //             let mill = item.slice(8, 11);
    //             console.log(min, sec, mill);
    //             return {
    //                 min,
    //                 sec,
    //                 mill,
    //                 lyric: item.slice(12, item.length),
    //                 content: item,
    //                 time:
    //                     parseInt(mill) + parseInt(sec) * 1000 + parseInt(min) * 60 * 1000,
    //             };
    //         });
    //         console.log(arr);
    //         return arr;
    //     }
    // },
    mutations: {
        setPlaylist(state, value) {
            state.playlist = value
        },
        setPlayIndex(state, value) {
            state.playCurrentIndex = value
        },
        setPlayPaused(state, value) {
            state.flag = value
        },
        // setLyric(state, value) {
        //     state.lyric = value
        // }

    },
    actions: {
        // 获取歌词
        // async MusicLyric(content, payload) {
        //     console.log(payload.id);

        //     // const { data: res } = await this.$http.get(`/lyric?id=${payload.id}`);
        //     const { data: res } = await this.$http.get(`/lyric?id=${payload.id}`)
        //     this.lyric = res;
        //     console.log(this.lyric);
        // },
    },
    modules: {
    }
})
