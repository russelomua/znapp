<template>
  <v-container fluid>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex hidden-xs-only v-for="(weekDay, index) in weekDays" :key="'weekday'+index" class="calendarWeekday" xs12 sm1>
          <div :style="cardStyle(weekDay, true)">
            <div class="text-xs-center pa-2">{{moment().weekday(index).format('ddd')}}</div>
          </div>
        </v-flex>
        <v-flex 
                :hidden-xs-only="!isSameMonth(day.date)" 
                v-for="(day, dayIndex) in days" 
                :key="'day'+dayIndex" 
                class="calendarDay"
                xs12
                sm1>
          <div :style="cardStyle(day.date)">
            
            <h4 class="pa-2 right">
              {{day.date | moment().format('D')}}
            </h4>
            
            <div class="grey--text pa-2 hidden-sm-and-up">{{day.date | moment().format('ddd')}}</div>
            <div class="red--text pa-2 hidden-xs-only" v-if="isFirstDay(day.date) == 1">
              {{day.date | moment().format('MMM')}}
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import moment from 'moment'
import PathToMonth from '../plugins/PathToMonth'
import Settings from '../plugins/settings'
  
export default {
  name: 'SchedulePersonal',
  data() {
    let weekDays = [];
    for (let index of [0,1,2,3,4,5,6]) {
      weekDays.push(moment(0).weekday(index));
    }
    return {
      weekDays: weekDays,
      days: [],
      moment: moment
    }
  },
  watch: {
    currentMonth: function (val) {
      
      this.fillMonth(val);
    }
  },
  mixins: [PathToMonth, Settings],
  methods: {
    fillMonth(month) {
      this.days = [];
      
      const startDay = month.clone().startOf('month').startOf('week');
      const endDay = month.clone().endOf('month').endOf('week');

      let date = startDay.clone().subtract(1, 'day');
      while (date.isBefore(endDay, 'day')) {
        this.insertDays(date.add(1, 'day').clone());
      }
	},
    insertDays(day) {
      this.days.push({date: day});
    },
    isFirstDay(date) {
      return date.format('D') == 1;
    },
    isSameMonth(date) {
      return date.isSame(this.currentMonth, 'month');
    },
    cardStyle(date, isHead = false) {
      const itemStyle = (isHead ? this.settings.days : this.settings.shifts);
      if (this.isToday(date))
        return itemStyle.today;
      if (this.isWeekend(date))
        return itemStyle.weekend;
        return itemStyle.default;
      //return moment().isSame(day, 'day');
    },
    isWeekend(date) {
      return (date.format("E") > 5)
    },
    isToday(date) {
      return moment().isSame(date, 'day')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .calendarDay {
    min-height: 130px;
  }
  
  .calendarDay > div, .calendarWeekday > div {
    height: 100%;
    border: 1px solid;
    border-radius: 5px;
  }
  
  .calendarWeekday > div {
    font-size: 25px;
  }
  
  @media (min-width: 600px) {
    .calendarDay.sm1, .calendarWeekday.sm1 {
      max-width: 14.285714285714285714285714285714%;
      flex-basis: 14.285714285714285714285714285714%;
    }
  }
</style>
