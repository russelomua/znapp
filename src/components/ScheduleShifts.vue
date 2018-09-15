<template>
  <v-container fluid  grid-list-xs  text-xs-center>
    <v-layout>
      <v-flex v-for="shift in ['0', 'А', 'Б', 'В', 'Г', 'Д']" :key="shift" xs2>
        <v-flex wrap v-for="(day, key) in days" :key="key">
          <DayShift :day="day" :shift="shift" />
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment'
import DayShift from './DayShift.vue'  

export default {
  name: 'ScheduleShifts',
  data: function() {
    let today = this.setToday();
//    let currentMonth = new Date();
//    currentMonth.setDate(1);
    let data = this.generateDays();
    return {
      today: today,
//      currentMonth: currentMonth,
      days: data
    }
  },
  components: {
    DayShift
  },
  methods: {
    setToday () {
      return moment();
    },
    setMonth () {
      
    },
    generateDays () {
      const daysInMonth = moment().daysInMonth();
      let data = [];
      let currentDay = 1;
      
      while(currentDay <= daysInMonth) {
        var current = moment().date(currentDay);
        data.push(current);
        currentDay++;
      }
      
      return data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
