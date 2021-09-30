import axios from 'axios'
let beaseurl = 'http://localhost:3000'
// export function getBanner(type = 0) {
//     return  axios.get(`${beaseurl}/banner?type=${type}`)
// }
// 获取歌单
export function getMusicList(limit = 9) {
    return axios.get(`${beaseurl}/personalized?limit=${limit}`)
}