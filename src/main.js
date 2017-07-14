import Vue from 'vue'
import App from './App.vue'
import XmlTool from './components/xmltool.vue'
import login from './components/login.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import xlsxx from 'xlsx'
// import 'vue-xlsx-table/dist/style.css'
// import vueXlsxTable from 'vue-xlsx-table'
// Vue.use(xlsxx)
Vue.use(VueRouter)
Vue.use(VueResource)
//HTML5 FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为true，也就是使用readAsBinaryString
var v = new Vue({
  el: '#app',
  render: h => h(XmlTool)
  // render:h=>h(XmlTool)
})

