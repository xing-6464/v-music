import axios from 'axios'

const ERR_OK = 0
console.log(import.meta.env)
const baseURL = import.meta.env.PROD ? '1.94.45.254/music/' : '/'

axios.defaults.baseURL = baseURL

export function get(url: string, params?: any) {
  return axios
    .get(url, {
      params,
    })
    .then((res) => {
      const severData = res.data
      if (severData.code === ERR_OK) {
        return severData.result
      }
    })
    .catch((e) => {
      console.info(e)
    })
}
