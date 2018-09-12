import Vue from 'vue'
import VueRouter from 'vue-router'

import ScheduleShifts from '../components/ScheduleShifts'
import SchedulePersonal from '../components/SchedulePersonal'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: SchedulePersonal },
  { path: '/shifts', component: ScheduleShifts },
  { path: '/personal', component: SchedulePersonal }
]


const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
})

export default router;