import moment from 'moment'

export default {
  data() {
    return {
      currentMonth: {},
      mixinMounted: false
    }
  },
  methods: {
    getCurrentMonth() {
      if (this.mixinMounted)
        this.currentMonth = moment(this.$route.params.month+this.$route.params.year, "MMYYYY");
    }
  },
  computed: {
    isCurrentMonth() {
      return moment().isSame(this.currentMonth, 'month')
    }
  },
  watch: {
    '$route' () {
      this.getCurrentMonth(this.$route.params);
    }
  },
  mounted(){
    this.mixinMounted = true;
    this.getCurrentMonth();
  }
}