<template>
  <v-app>
    <v-toolbar
      color="primary"
      app
      dark
    >
      <v-toolbar-side-icon @click="sideMenu=!sideMenu"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-container v-if="extendedToolbar" fluid  grid-list-xs text-xs-center slot="extension" :style="{padding: 0}" align-center="true">
        <v-layout row wrap>
          <v-flex xs2>
            <v-btn 
                   flat icon
                   :to="{ params: { month: todayMonth.format('MM'), year: todayMonth.format('YYYY') }}">
              <v-icon>calendar_today</v-icon>
            </v-btn>
          </v-flex>
          <v-flex v-for="(shift, shiftIndex) in settings.shiftsArray" :key="shiftIndex" xs2>
            <div class="toolbarSecondItem">{{shift}}</div>
          </v-flex>
        </v-layout>
      </v-container>
      
      <v-toolbar-items>
        <v-btn flat icon @click.stop="rightDrawer = !rightDrawer"><v-icon>notifications_active</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-navigation-drawer 
      temporary
      fixed
      left
      v-model="sideMenu"
    >
      <v-toolbar color="primary" dark flat>
        <v-btn icon flat @click="sideMenu=!sideMenu"><v-icon>arrow_back</v-icon></v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list class="pt-0">
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="{ name: item.route }"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-navigation-drawer
      temporary
      v-model="rightDrawer"
      fixed
      right
      app
    >
      <v-list dense>
        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Уведомления</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click="rightDrawer=!rightDrawer">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>
      
    </v-navigation-drawer>
    <v-footer fixed app height="48">
      <div class="footer">{{currentMonth | moment().format("MMMM YYYY") | capitalize}}</div>
    </v-footer>
    
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      :color="settings.fab"
      :to="{ params: { month: nextMonth.format('MM'), year: nextMonth.format('YYYY') }}"
    >
      <v-icon x-large>chevron_right</v-icon>
    </v-btn>
    <v-btn
      fixed
      dark
      fab
      bottom
      left
      :color="settings.fab"
      :to="{ params: { month: prevMonth.format('MM'), year: prevMonth.format('YYYY') }}"
    >
      <v-icon x-large>chevron_left</v-icon>
    </v-btn>
    
  </v-app>
</template>

<script>
import moment from 'moment'
import Settings from './plugins/settings'
import PathToMonth from './plugins/PathToMonth'
moment.locale('ru');

export default {
  name: 'App',
  data () {
    return {
      title: 'График смен',
      rightDrawer: false,
      sideMenu: false,
      todayMonth: moment(),
      menuItems: [
        {
          icon: 'view_list',
          title: 'Все смены',
          route: 'shifts'
        },
        {
          icon: 'view_module',
          title: 'Моя смена',
          route: 'personal'
        }
      ]
    }
  },
  mixins: [PathToMonth, Settings],
  computed: {
    extendedToolbar: function () {
      return this.$route.meta.extendedToolbar;
    },
    nextMonth: function () {
      return moment(this.currentMonth).add(1, 'months');
    },
    prevMonth: function () {
      return moment(this.currentMonth).subtract(1, 'months');
    }
  }
}
</script>

<style scoped>
  .toolbarSecondItem {
    font-size: 24px;
    margin: 6px 0;
  }
  .footer {
    line-height: 48px;
    font-size: 24px;
    text-align: center;
    width: 100%;
  }
</style>
