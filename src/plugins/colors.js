import colors from 'vuetify/es5/util/colors';

export default {
  days: {
    default: {
      borderColor: colors.blueGrey.lighten4,
      backgroundColor: "#fff"
    },
    today: {
      borderColor: colors.deepOrange.base,
      backgroundColor: colors.deepOrange.base,
      color: "#fff"
    },
    weekend: {
      borderColor: colors.blueGrey.lighten1,
      backgroundColor: colors.blueGrey.lighten1,
      color: "#fff"
    }
  },
  shifts: {
    default: {
      borderColor: colors.blueGrey.lighten4,
      backgroundColor: "#fff"
    },
    today: {
      borderColor: colors.deepOrange.base,
      backgroundColor: colors.deepOrange.lighten5
    },
    weekend: {
      borderColor: colors.blueGrey.lighten1,
      backgroundColor: colors.blueGrey.lighten5
    }
  }
}