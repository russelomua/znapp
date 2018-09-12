<template>
  <v-container fluid  grid-list-xs  text-xs-center>
    <v-layout>
      <v-flex v-for="shift in [0, 'А', 'Б', 'В', 'Г', 'Д']" :key="shift" xs2>
        <v-flex wrap v-for="(day, key) in days" :key="key">
          <v-card dark tile :color="getColor(day)" v-if="shift!=0">
            <v-card-text>
              {{getShift (day, shift)}}
            </v-card-text>
          </v-card>
          <v-card v-else>
            <v-card-text>
              {{day | moment().format("DD")}}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'  

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
//  props: {
//    today: Date,
//    currentMonth: Date,
//    data: Array
//  },
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
    },
    getShift (day, letter) {
      let countdown = this.getCountdown(letter);
      
      let duration = moment.duration(day.diff(countdown));
      let days = duration.asDays();
      
      let shiftNumber = Math.floor( days % 15 );

      return this.getShiftContext(shiftNumber);
    },
    getCountdown (letter) {
      const countdowns = {
        'А': moment('07/12/2013', "MM-DD-YYYY"),
        'Б': moment('07/06/2013', "MM-DD-YYYY"),
        'В': moment('07/15/2013', "MM-DD-YYYY"),
        'Г': moment('07/09/2013', "MM-DD-YYYY"),
        'Д': moment('08/02/2013', "MM-DD-YYYY")
      }
      return countdowns[letter];
    },
    getShiftContext (shiftNumber) {
      if ([3,4, 8,9, 13,14].indexOf(shiftNumber)>=0)
        return 'В';
      if (shiftNumber < 3)
        return '7';
      if ((shiftNumber > 4) && (shiftNumber < 8))
        return '23';
      if (shiftNumber > 9)
        return '23';
    },
    getColor (day) {
      if (day.isoWeekday() >= 6)
        return 'secondary';
      return 'primary';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  blockquote {
    height: 1000px;
  }
</style>
