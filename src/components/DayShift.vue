<template>
  <div :style="styleObject">{{getShift()}}</div>
</template>

<script>
  import moment from 'moment'
  import styles from '../plugins/colors.js'
export default {
  name: "DayShift",
  
  data: function () {
    let isWeekend = ( this.day.format("E") > 5 ? true : false );
    let isToday = ( moment().isSame(this.day, 'day') ? true : false );
    let isDayNumber = ((this.shift == '0') ? true : false);
    return {
      isDayNumber: isDayNumber,
      isWeekend: isWeekend,
      isToday: isToday,
      styles: styles
    }
  },
  props: {
    day: Object,
    shift: String
  },
  computed: {
    styleObject: function () {
      let itemStyle = (this.isDayNumber ? this.styles.days : this.styles.shifts)
      if (this.isToday)
        return itemStyle.today;
      if (this.isWeekend)
        return itemStyle.weekend;
        return itemStyle.default;
    }
  },
  methods: {
    getShift () {
      //day
      let countdown = this.getCountdown();
      
      if (this.isDayNumber)
        return this.day.format('D');
      
      let duration = moment.duration(this.day.diff(countdown));
      let days = duration.asDays();
      
      let shiftNumber = Math.floor( days % 15 );

      return this.getShiftContext(shiftNumber);
    },
    getCountdown () {
      const countdowns = {
        'А': moment('07/12/2013', "MM-DD-YYYY"),
        'Б': moment('07/06/2013', "MM-DD-YYYY"),
        'В': moment('07/15/2013', "MM-DD-YYYY"),
        'Г': moment('07/09/2013', "MM-DD-YYYY"),
        'Д': moment('08/02/2013', "MM-DD-YYYY")
      }
      return countdowns[this.shift];
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    border: 1px solid;
    line-height: 52px;
    padding: 0;
    border-radius: 2px;
    text-align: center;
    font-size: 25px;
  }
</style>
