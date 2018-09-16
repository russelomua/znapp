<template>
  <v-container fluid  grid-list-xs  text-xs-center>
    <v-layout>
      <v-flex v-for="(shift, index) in settings.shiftsArray" :key="shift" xs2 :class="rowClassName(index)">
        <v-flex wrap v-for="(day, key) in days" :key="key">
          <DayShift :day="day" :shift="shift" :class="isToday(day)" />
        </v-flex>
        <div class="total">
          {{total[index]}}
        </div>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
import moment from 'moment'
import Settings from '../plugins/settings'
import DayShift from './DayShift.vue'
import PathToMonth from '../plugins/PathToMonth'

export default {
  name: 'ScheduleShifts',
  data: function() {
    return {
      days: [],
      total: []
    }
  },
  components: {
    DayShift
  },
  mixins: [PathToMonth, Settings],
  watch: {
    currentMonth: function (val) {
      this.days = this.generateDays(val);
    }
  },
  updated() {
    this.$nextTick(function () {
      this.scrollToday();
      
      
      
    });
    for (let i=1;i<=5;i++) {
        this.total[i] = document.querySelectorAll('.shiftRow-'+i+' .isShift').length;
      }
  },
  methods: {
    generateDays (month) {
      if (typeof month == 'undefined')
        return;
      let daysInMonth = month.daysInMonth();
      let data = [];
      let currentDay = 1;
      
      while(currentDay <= daysInMonth) {
        var current = moment(month).date(currentDay);
        data.push(current);
        currentDay++;
      }
      
      return data;
    },
    scrollToday() {
      if (this.isCurrentMonth)
        this.$vuetify.goTo('.'+this.settings.scrollToday.class, this.settings.scrollToday.params);
      else
        this.$vuetify.goTo(0, this.settings.scrollToday.params);
    },
    isToday(day) {
      return (moment().isSame(day, 'day') ? this.settings.scrollToday.class : '')
    },
    rowClassName(index) {
      return "shiftRow-"+index;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .total {
    line-height: 52px;
    height: 100px;
    font-size: 25px;
  }
</style>
