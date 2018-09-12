<template>
  <v-app>
    <v-toolbar
      color="primary"
      app
      scroll-off-screen
      dark
    >
      <v-toolbar-side-icon @click.stop="rightDrawer = !rightDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-container fluid  grid-list-xs text-xs-center slot="extension" align-center="true">
          <v-layout row wrap>
            <v-flex v-for="(i, key) in ['', 'А', 'Б', 'В', 'Г', 'Д']" :key="key" xs2>
              {{i}}
            </v-flex>
          </v-layout>
        </v-container>
      
      
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn href="#/shifts" flat>shifts</v-btn>
        <v-btn href="#/personal" flat>personal</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
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

  
export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      fixed: true,
      right: true,
      rightDrawer: false,
      title: 'График смен'
    }
  }
}
</script>
