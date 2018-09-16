<template>
  <div :style="styleObject" :class="{'isShift': isShift}">{{(isDayNumber ? day.format('D') : shift)}}</div>
</template>

<script>
  import moment from 'moment'
  import Settings from '../plugins/settings'
export default {
  name: "DayShift",
  
  data: function () {
    let isDayNumber = ((typeof this.shift == 'undefined') ? true : false);
    return {
      isDayNumber: isDayNumber,
      isShift: false
    }
  },
  props: {
    day: Object,
    shift: String
  },
  mixins: [Settings],
  computed: {
    styleObject() {
      let itemStyle = (this.isDayNumber ? this.settings.days : this.settings.shifts)
      if (this.isToday)
        return itemStyle.today;
      if (this.isWeekend)
        return itemStyle.weekend;
        return itemStyle.default;
    },
    isWeekend() {
      return (this.day.format("E") > 5)
    },
    isToday() {
      return moment().isSame(this.day, 'day')
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
    font-size: 24px;
  }
</style>
