<template>
  <v-container fluid  grid-list-xs  text-xs-center>
    <v-layout>
      <v-flex xs2>
        <v-flex wrap v-for="(day, key) in days" :key="key">
          <DayShift :day="day" :class="isToday(day)" />
        </v-flex>
        <div class="total">
          <v-icon>assessment</v-icon>
        </div>
        
      </v-flex>
      <v-flex v-for="(shift, shiftIndex) in settings.shiftsArray" :key="shiftIndex" xs2>
        <v-flex wrap v-for="(day, dayIndex) in days" :key="dayIndex">
          <DayShift :day="day" :shift="schedule[shiftIndex][dayIndex]" />
        </v-flex>
        <div class="total">
          {{total[shiftIndex]}}
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
      schedule: [],
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
  },
  methods: {
    generateDays (month) {
      if (typeof month == 'undefined')
        return;
      let daysInMonth = month.daysInMonth();
      let data = [];
      this.total = [];
      this.schedule = [];
      let currentDay = 1;
      
      while(currentDay <= daysInMonth) {
        var day = moment(month).date(currentDay);
        data.push(day);
        
        let shiftIndex = 0;
        for (let shift of this.settings.shiftsArray) {
          const shiftSymbol = this.getShifts(day, shift);
          
          if (typeof this.schedule[shiftIndex] === 'undefined')
            this.schedule[shiftIndex] = [];
          
          if (shiftSymbol != '-') {
            if (typeof this.total[shiftIndex] === 'undefined')
              this.total[shiftIndex] = 0;
            this.total[shiftIndex]++;
          }
          this.schedule[shiftIndex].push(shiftSymbol);
          
          shiftIndex++;
        }
          
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
    },
    getShifts (day, shift) {
      let countdown = this.getCountdown(shift);
      
      let duration = moment.duration(day.diff(countdown));
      let days = duration.asDays();
      
      let shiftNumber = Math.floor( days % 15 );
      
      this.isShift = ([3,4, 8,9, 13,14].indexOf(shiftNumber) < 0);
      
      return this.getShiftText(shiftNumber);
    },
    getCountdown (shift) {
      const countdowns = {
        'А': moment('07/12/2013', "MM-DD-YYYY"),
        'Б': moment('07/06/2013', "MM-DD-YYYY"),
        'В': moment('07/15/2013', "MM-DD-YYYY"),
        'Г': moment('07/09/2013', "MM-DD-YYYY"),
        'Д': moment('08/02/2013', "MM-DD-YYYY")
      }
      return countdowns[shift];
    },
    getShiftText (shiftNumber) {
      if ([3,4, 8,9, 13,14].indexOf(shiftNumber)>=0)
        return '-';
      if (shiftNumber < 3)
        return '7';
      if ((shiftNumber > 4) && (shiftNumber < 8))
        return '23';
      if (shiftNumber > 9)
        return '15';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .total {
    line-height: 24px;
    height: 60px;
    font-size: 24px;
    padding: 10px 0;
  }
</style>
