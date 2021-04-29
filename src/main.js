import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios';
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(ElementUI);
Vue.use(VueCodemirror);


Vue.config.productionTip = false
/**
 * 全局数组删除操作
 * @param val
 */
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};


Axios.defaults.baseURL = "/api/v1/"
Axios.defaults.timeout = 10000

/**
 * 请求拦截器
 */
Axios.interceptors.request.use(
    config => {
      // 允许携带cookie
      config.withCredentials = true;
      config.headers['Content-Type'] = "application/json";
      config.headers['token'] = window.localStorage.getItem("token");
      return config
    },
    error => {
      return Promise.error(error)
    }
)

/**
 * 相应拦截器
 */
Axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
      }
    },
    // 服务器状态码不是200的情况
    error => {
      console.log(error)
      try {
        if (error.response.status) {
          if (error.response.status === 401) {
            router.replace({
              path: '/login'
            })
          } else if (error.response.status === 400) {
              Message.error(error.response.data.message);
          } else {
              Message.error('网络错误，请稍后再试');
          }
          return Promise.reject(error.response)
        }
      }catch (e){
          Message.error('网络错误，请稍后再试');
          return Promise.reject(error.response)
      }
    }
)
Vue.prototype.ser = Axios
Vue.prototype.ser.ctx = Axios.defaults.baseURL

/**
 * 全局路由跳转
 * @param path
 *      跳转路径
 * @param replace
 *      是否直接更换
 */
Vue.prototype.go = (path, replace) => {
  if (replace) {
    router.replace({
      path: path
    });
  } else {
    router.push({
      path: path
    });
  }
}

Vue.prototype.jobs = () => {
    return [
        {
            name: '鬼剑士(男)',
            subs: {'0': '未转职', '17': '剑圣', '18': '鬼泣', '19': '狱血魔神', '20': '大暗黑天'}
        },{
            name: '格斗家(女)',
            subs: { '0': '未转职', '17': '百花缭乱', '18': '武神', '19': '毒王', '20': '暴风眼'}

        },{
            name: '神枪手(男)',
            subs: { '0': '未转职', '17': '枪神', '18': '狂暴者', '19': '机械战神', '20': '大将军'}
        },{
            name: '魔法师(女)',
            subs: { '0': '未转职', '17': '大魔导师', '18': '月之女皇', '19': '贝亚娜斗神', '20': '魔术师'}
        },{
            name: '圣职者(男)',
            subs: { '0': '未转职', '17': '天启者', '18': '神之手', '19': '龙斗士', '20': '末日守护者'}
        },{
            name: '神枪手(女)',
            subs: { '0': '未转职', '17': '沾血蔷薇', '18': '重炮掌控者', '19': '机械之心', '20': '战争女神'}
        },{
            name: '暗夜使者(女)',
            subs: { '0': '未转职', '17': '银月', '18': '灵魂收割者'}
        },{
            name: '格斗家(男)',
            subs: { '0': '未转职', '17': '狂虎帝', '18': '武极', '19': '千手罗汉', '20': '风林火山'}
        },{
            name: '魔法师(男)',
            subs: { '0': '未转职', '17': '元素爆破师', '18': '冰冻之心'}
        },{
            name: '黑暗武士(男)',
            subs: { '0': '未转职', '17': '自我觉醒'}
        }
    ]
}


/**
 * 全局UUID
 * @returns {string}
 */
Vue.prototype.uuid = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  return uuid.replace("-", "");
}




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
