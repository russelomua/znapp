import moment from 'moment'

export default {
  methods: {
    getCurrentMonth: function (params) {
      return moment(params.month+params.year, "MMYY");
    }
  }
}