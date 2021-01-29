import axios from "axios";

export default {
  install: function (Vue) {
    let newObj = axios.create({
      baseURL: 'http://192.168.105.132:8001/api'
    })
    Vue.prototype.$http = newObj;
  }
}
