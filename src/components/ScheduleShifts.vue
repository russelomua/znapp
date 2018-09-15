<template>
  <v-container fluid  grid-list-xs  text-xs-center>
    <v-layout>
      <v-flex v-for="shift in ['0', 'А', 'Б', 'В', 'Г', 'Д']" :key="shift" xs2>
        <v-flex wrap v-for="(day, key) in days" :key="key">
          <DayShift :day="day" :shift="shift" />
        </v-flex>
      </v-flex>
    </v-layout>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      :color="colors.fab"
      :href="nextMonth"
    >
      <v-icon x-large>chevron_right</v-icon>
    </v-btn>
    <v-btn
      fixed
      dark
      fab
      bottom
      left
      :color="colors.fab"
      :href="prevMonth"
    >
      <v-icon x-large>chevron_left</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import moment from 'moment'
import colors from '../plugins/colors'
import DayShift from './DayShift.vue'
import mixins from '../plugins/mixins'

export default {
  name: 'ScheduleShifts',
  data: function() {
    let today = this.setToday();
    let currentMonth = this.getCurrentMonth(this.$route.params);
    
    return {
      today: today,
      currentMonth: currentMonth,
      days: this.generateDays(currentMonth),
      colors: colors
    }
  },
  components: {
    DayShift
  },
  mixins: [mixins],
  watch: {
    currentMonth: function (val) {
      this.days = this.generateDays(val);
    },
    '$route' () {
      this.currentMonth = this.getCurrentMonth(this.$route.params);
    }
  },
  computed: {
    nextMonth: function () {
      return '#'+moment(this.currentMonth).add(1, 'months').format('/MM/YY')+'/shifts';
    },
    prevMonth: function () {
      return '#'+moment(this.currentMonth).subtract(1, 'months').format('/MM/YY')+'/shifts';
    }
  },
  methods: {
    setToday () {
      return moment();
    },
    setMonth () {
      
    },
    generateDays (month) {
      let daysInMonth = month.daysInMonth();
      let data = [];
      let currentDay = 1;
      
      while(currentDay <= daysInMonth) {
        var current = moment(month).date(currentDay);
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
