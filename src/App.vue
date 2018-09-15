<template>
  <v-app>
    <v-toolbar
      color="primary"
      app
      scroll-off-screen
      dark
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>{{title}} / {{currentMonth | moment().format("MMMM YYYY") | capitalize}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-container v-if="extendedToolbar" fluid  grid-list-xs text-xs-center slot="extension" :style="{padding: 0}" align-center="true">
        <v-layout row wrap>
          <v-flex v-for="(i, key) in ['0', 'А', 'Б', 'В', 'Г', 'Д']" :key="key" xs2>
            <div v-if="i != '0'" :style="{fontSize: 25+'px'}">{{i}}</div>
          </v-flex>
        </v-layout>
      </v-container>
      
      <v-toolbar-items>
        <v-btn flat fab href="#/shifts"><v-icon>calendar_today</v-icon></v-btn>
        <v-btn flat fab href="#/personal"><v-icon>person</v-icon></v-btn>
        <v-btn flat fab @click.stop="rightDrawer = !rightDrawer"><v-icon>notifications_active</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-navigation-drawer
      temporary
      v-model="rightDrawer"
      fixed
      right
      app
    >
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import moment from 'moment'
import mixins from './plugins/mixins'
moment.locale('ru');

export default {
  name: 'App',
  data () {
    let currentMonth = this.getCurrentMonth(this.$route.params);
    return {
      today: moment(),
      fixed: true,
      rightDrawer: false,
      title: 'График смен',
      currentMonth: currentMonth
    }
  },
  mixins: [mixins],
  watch: {
    '$route' () {
      this.currentMonth = this.getCurrentMonth(this.$route.params);
    }
  },
  computed: {
    extendedToolbar: function () {
      return this.$route.meta.extendedToolbar;
    }
  }
}
</script>
