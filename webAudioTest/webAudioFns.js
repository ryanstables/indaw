var audio = null;
var audioData = new Float64Array();

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

window.addEventListener('load', loadSound)

function loadSound() {
  var request = new XMLHttpRequest();
  request.open('GET', 'piano.wav', true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
     audio = buffer 
     audioData = audio.getChannelData(0);
    }, function(){alert("Error: audio not loaded");});
  }
  request.send();
}

function get_chroma(x) {
    var nfft = 1024;
    var nbins = 12;
    // break audio into frames...
    var audio = xtract_get_data_frames(x, nfft);
    // get a spectrum from the first frame of audio data...
    var spectrum = xtract_spectrum(audio[0], 44100, false, false);    
    // init chroma filters...
    var chromaFilters = xtract_init_chroma(nfft, 44100, nbins);
    // find the chroma bands...
    var chroma = xtract_chroma(spectrum, chromaFilters);    
    return chroma;    
}