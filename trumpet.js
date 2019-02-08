var Trumpet = {
  valves: ["j", "k", "l"],
  modifiers: ["v", "d", "f", "g", "e", "r", "t", "y"],

  note: function(keys) {
    valve1 = keys.get(this.valves[0]) == true
    valve2 = keys.get(this.valves[1]) == true
    valve3 = keys.get(this.valves[2]) == true

    var modifier = -1

    for (var i = this.modifiers.length-1; i >= 0; i--) {
      if (keys.get(this.modifiers[i])) {
        modifier = i+1
        break
      }
    }

    if (modifier == -1) {
      return 0
    }

    return this.calculateNote(modifier, valve1, valve2, valve3)
  },

  calculateNote: function(modifier, valve1, valve2, valve3) {
    var halftones = 0

    if (valve1) {
      halftones -= 2
    }
    if (valve2) {
      halftones -= 1
    }
    if (valve3) {
      halftones -= 3
    }

    return this.frequency(modifier, halftones)
  },

  frequency: function(modifier, halftones) {
    return 261.626 * (modifier/2) * Math.pow(2, halftones / 12)
  }
}
