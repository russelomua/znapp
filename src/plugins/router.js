import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'

import ScheduleShifts from '../components/ScheduleShifts'
import SchedulePersonal from '../components/SchedulePersonal'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: function() {
      return moment().format('/YYYY/MM')+'/shifts';
    }
  },
  { name: 'shifts', path: '/:year/:month/shifts', component: ScheduleShifts, meta: { extendedToolbar: true } },
  { name: 'personal', path: '/:year/:month/personal', component: SchedulePersonal, meta: { extendedToolbar: false } }
]


let router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router;