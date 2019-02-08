function Player() {
  this.context = new AudioContext()
  this.playing = false
  this.wave = hornTable

  var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8])
  var imag = new Float32Array(real.length)
  var hornTable = this.context.createPeriodicWave(real, imag)

  this.play = function(freq) {
    console.log("playing " + Notes.writtenNote(freq))

    if (this.playing) {
      this.o.frequency.value = freq
      return
    }

    this.o = this.context.createOscillator()
    this.g = this.context.createGain()
    this.o.connect(this.g)
    this.g.connect(this.context.destination)
    this.o.setPeriodicWave(hornTable);
    this.o.frequency.value = freq
    this.o.start(0)
    this.playing = true
  }

  this.stop = function() {
    if (this.playing) {
      this.g.gain.exponentialRampToValueAtTime(
        0.00001, this.context.currentTime + 0.04
      )
      this.o.stop()
      this.playing = false
    }
  }
}
