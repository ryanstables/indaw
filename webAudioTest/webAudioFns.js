var audio = null;
var audioData = new Float64Array();

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();

window.addEventListener('load', loadSound)
window.addEventListener('load', plot([100, 200, 150, 300, 380, 100, 200]))

function loadSound() {
  var request = new XMLHttpRequest();
  request.open('GET', 'piano.wav', true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    audiocontext.decodeAudioData(request.response, function(buffer) {
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
//    var chromaFilters = xtract_init_chroma(nfft, 44100, nbins);
    // find the chroma bands...
//    var chroma = xtract_chroma(spectrum, chromaFilters);    
    return spectrum;    
}

// Canvas script...
var sales = [0, 0.1, 0.1, 0.1];

function plot(x) {        
    var canvas = document.getElementById("canvas");    
    var c = canvas.getContext("2d");        
    var canvasStyle  = window.getComputedStyle(canvas, null);        
    var width = parseInt(canvasStyle.width);
    var height= parseInt(canvasStyle.height);      
    var offset = (1 / (x.length - 1)) * width;
    var maxX = x.reduce(function(a, b) { return Math.max(a, b);});
    var minX = x.reduce(function(a, b) { return Math.min(a, b);});

    function drawToScale(input) {
        return height - ( (input-minX)*height) / (maxX-minX);        
    }
    
    // remove the previuous lines
    c.clearRect(0, 0, width, height)      
    
    // plot the new ones
    c.beginPath();
    c.moveTo(0,  drawToScale(x[0]));

    for (var i = 1; i < x.length; i++) {
        c.lineTo(i * offset, drawToScale(x[i]) );
    }
    c.stroke();
  }