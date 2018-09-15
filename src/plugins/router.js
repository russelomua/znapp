import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import ScheduleShifts from '../components/ScheduleShifts'
import SchedulePersonal from '../components/SchedulePersonal'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: function() {
      return moment().format('/MM/YY')+'/shifts';
    }
  },
  { path: '/:month/:year/shifts', component: ScheduleShifts, meta: { extendedToolbar: true } },
  { path: '/:month/:year/personal', component: SchedulePersonal, meta: { extendedToolbar: false } }
]


let router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
})

export default router;