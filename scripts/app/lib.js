// Useful Functions

lib = {
  timeDifference: function(time1, time2) {
    return Math.round(time1.getTime() / 1000) - Math.round(time2.getTime() / 1000)
  }  
}
