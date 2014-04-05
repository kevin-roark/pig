$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var video = document.querySelector('#video');
  var $vid = $(video);
  var vidReady = false;

  var audio = document.querySelector('#audio');
  var $aud = $(audio);
  var audReady = false;

  var AUDIO_LENGTH = 100000;

  video.addEventListener("canplaythrough", function() {
    vidReady = true;
    if (audReady)
      start();
  });

  audio.addEventListener("canplaythrough", function() {
    audReady = true;
    if (vidReady)
      start();
  });

  function start() {
    audio.play();
    video.play();

    setTimeout(hideFooter, 1000);

    soundControl();
    speedControl();

    //setInterval(function() {
    //  $('.debug-timer').html(audio.currentTime);
    //}, 200);
  }

  function endgame() {

    function restart() {
      kt.clearTransforms($vid);
      kt.clearFilters($vid);

      audio.currentTime = 0;
      video.currentTime = 0;
      start();
    }

    function showFooter() {
      $('.footer').animate({
        opacity: 1.0
      }, 600);

      $('.footer').unbind('mouseenter');
      $('.footer').unbind('mouseleave');
    }

    showFooter();
    setTimeout(restart, 5000);
  }

  function hideFooter() {
    $('.footer').animate({
      opacity: 0.0
    }, 800);

    $('.footer').mouseenter(function() {
      $(this).animate({
        opacity: 1.0
      }, 400);
    });

    $('.footer').mouseleave(function() {
      $(this).animate({
        opacity: 0.0
      }, 400);
    });
  }

  function soundControl() {
    video.muted = true;
  }

  function speedControl() {
    function speed(rate) {
      video.playbackRate = rate;
    }
    speed(1.0);
  }

  function removeLater(el) {
    setTimeout(function() {
      el.remove();
    }, kt.randInt(6666, 2666));
  }


});
