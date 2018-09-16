<template>
  <v-container fluid>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap v-for="i in 2" :key="`2${i}`">
        <v-flex v-for="i in 6" :key="`2${i}`" xs2>
          <v-card dark color="primary">
            <v-card-text class="px-0">2</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'SchedulePersonal',
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
