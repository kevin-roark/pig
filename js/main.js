$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var pig1 = document.querySelector('#pig1');
  var $pig1 = $(pig1);

  var pig2 = document.querySelector('#pig2');
  var $pig2 = $(pig2);

  var spig = document.querySelector('#spanpig');
  var $spig = $(spig);

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);

  var numMedia = 3;
  var mediasReady = 0;

  var AUDIO_LENGTH = 100000;
  var P1_DUR;
  var P2_ENTER = 10000;
  var P1_EFFECTS = 18000;
  var P3_ENTER = 36000;

  pig1.addEventListener('canplaythrough', mediaReady);
  pig2.addEventListener('canplaythrough', mediaReady);
  spig.addEventListener('canplaythrough', mediaReady);

  function mediaReady() {
    mediasReady++;
    if (mediasReady == numMedia) {
      start();
    }
  }

  function start() {
    P1_DUR = pig1.duration * 1000;

    //audio.play();
    pig1.play();

    setTimeout(hideFooter, 1000);
    setTimeout(startPig2, P2_ENTER);
    setTimeout(pig1Effects, P1_EFFECTS);
    setTimeout(startPig3, P3_ENTER);
    setTimeout(flickerPig1, P1_DUR);

    soundControl();
    speedControl();

    setInterval(function() {
      $('.debug-timer').html(pig1.currentTime);
    }, 200);
  }

  function endgame() {

    function restart() {
      kt.clearTransforms($vid);
      kt.clearFilters($vid);

      //audio.currentTime = 0;
      pig1.currentTime = 0;
      pig2.currentTime = 0;
      spig.currentTime = 0;
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
    pig1.muted = true;
    pig2.muted = true;
    spig.muted = true;
  }

  function speedControl() {
    function speed(vid, rate) {
      vid.playbackRate = rate;
    }
    speed(pig1, 1.0);
  }

  function removeLater(el) {
    setTimeout(function() {
      el.remove();
    }, kt.randInt(6666, 2666));
  }

  function pig1Effects() {
    var sat = 100;
    var con = 100;

    function bleed() {
      if (sat < 400) {
        sat++;
        con++;
        kt.saturate($pig1, sat);
        kt.contrast($pig1, con);
        setTimeout(bleed, kt.randInt(700, 200));
      }
    }

    bleed();
  }

  function startPig2() {
    var w = $pig2.width();
    var h = $pig2.height();
    var sat = 100;
    var con = 100;
    var bright = 100;

    function grow() {
      if (w < 350) {
        w += 5;
        h += 4;
        $pig2.css('width', w + 'px');
        $pig2.css('height', h + 'px');
        setTimeout(grow, 100);
      }
    }

    function fluctuateSize() {
      $pig2.css('width', '100%');
      $pig2.css('height', '100%');

      setTimeout(function() {
        $pig2.css('width', w + 'px');
        $pig2.css('height', h + 'px');
        setTimeout(fluctuateSize, kt.randInt(5000, 2000));
      }, kt.randInt(3700, 50));
    }

    function growStrength() {
      if (sat < 400) {
        sat += 2;
        con++;
        bright++;
        kt.saturate($pig2, sat);
        kt.contrast($pig2, con);
        kt.brightness($pig2, bright);
        setTimeout(growStrength, kt.randInt(1000, 500));
      }
    }

    function intersperseLady() {
      if (!pig2.paused) {
        var t = pig2.currentTime;
        pig2.currentTime = kt.randInt(12, 0);

        setTimeout(function() {
          pig2.currentTime = t;
          setTimeout(intersperseLady, kt.randInt(20000, 10000));
        }, kt.randInt(5000, 2000));;
      }
    }

    $pig2.show();
    pig2.play();
    pig2.loop = true;
    grow();
    setTimeout(fluctuateSize, 19000);
    setTimeout(growStrength, 30000);
    setTimeout(intersperseLady, 37000);
  }

  function startPig3() {
    var stime = 22;
    var w = $spig.width();

    function grow() {
      if (w < 999) {
        w += 2;
        $spig.css('width', w + 'px');
        setTimeout(grow, 60);
      } else {
        $spig.hide();
        setTimeout(makeFreaky, 4000);
      }
    }

    function makeFreaky() {
      $spig.fadeIn(1200, function() {
        setTimeout(function() {
          $spig.hide();
          setTimeout(makeFreaky, kt.randInt(6000, 3000));
        }, kt.randInt(5000, 3000));
      });
    }

    $spig.show();
    spig.currentTime = stime;
    spig.play();
    spig.loop = true;
    setTimeout(grow, 15000);
  }

  function flickerPig1() {
    var omap = {
      'sep': function(el, num) { kt.sepia(el, num); },
      'sat': function(el, num) { kt.saturate(el, num); },
      'inv': function(el, num) { kt.invert(el, num); },
      'hut': function(el, num) { kt.hutate(el, num); },
      'bri': function(el, num) { kt.brightness(el, num); },
      'con': function(el, num) { kt.contrast(el, num); }
    }
    var ops = ['sep', 'sat', 'inv', 'hut', 'bri', 'con'];

    function flicker() {
      var op1 = omap[kt.choice(ops)];
      var op2 = omap[kt.choice(ops)];
      kt.clearFilters($pig1);
      op1($pig1, kt.randInt(400, 20));
      op2($pig1, kt.randInt(500, 10));

      setTimeout(flicker, kt.randInt(260, 80));
    }

    flicker();
  }


});
