import colors from 'vuetify/es5/util/colors';

const settings = {
  shiftsArray: ['0', 'А', 'Б', 'В', 'Г', 'Д'],
  scrollToday: {
    class: 'scrollToday',
    params: { 
      offset: -60, 
      easing: "easeInOutCubic", 
      duration: 800
    }
  },
  fab: colors.blueGrey.lighten1,
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

export default {
  data() {
    return {
      settings: settings
    }
  }
}