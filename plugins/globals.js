import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import VueMarkdown from 'vue-markdown'
import DateFilter from '../common/date.filter'

Vue.use(Element, { locale })
Vue.component('vue-markdown', VueMarkdown)
Vue.filter('date', DateFilter)
