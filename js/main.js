$(function() {

  var kt = require('./lib/kutility'); /* you can remove this if you don't want it */

  var pig1 = document.querySelector('#pig1');
  var $pig1 = $(pig1);

  var pig2 = document.querySelector('#pig2');
  var $pig2 = $(pig2);

  var spig = document.querySelector('#spanpig');
  var $spig = $(spig);

  var scrooge = document.querySelector('#scrooge');
  var $scrooge = $(scrooge);

  var boosie = document.querySelector('#boosie');
  var $boosie = $(boosie);

  var factory = document.querySelector('#factory');
  var $factory = $(factory);

  //var audio = document.querySelector('#audio');
  //var $aud = $(audio);

  var numMedia = 6; // number of things to load
  var mediasReady = 0;

  var p1active = false;
  var p2active = false;
  var spactive = false;

  var AUDIO_LENGTH = 100000;
  var P1_DUR;
  var P2_ENTER = 10000;
  var P1_EFFECTS = 18000;
  var P3_ENTER = 36000;
  var MONEY_TIME = 10000;

  pig1.addEventListener('canplaythrough', mediaReady);
  pig2.addEventListener('canplaythrough', mediaReady);
  spig.addEventListener('canplaythrough', mediaReady);
  scrooge.addEventListener('canplaythrough', mediaReady);
  boosie.addEventListener('canplaythrough', mediaReady);
  factory.addEventListener('canplaythrough', mediaReady);

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
    p1active = true;

    setTimeout(hideFooter, 1000);
    setTimeout(startPig2, P2_ENTER);
    setTimeout(pig1Effects, P1_EFFECTS);
    setTimeout(startPig3, P3_ENTER);
    setTimeout(flickerPig1, P1_DUR);
    setTimeout(startMoney, MONEY_TIME);

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
    scrooge.muted = true;
    boosie.muted = true;
    factory.muted = true;
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
        if (p1active)
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
        if (p2active)
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
        if (p2active)
          setTimeout(growStrength, kt.randInt(1000, 500));
      }
    }

    function intersperseLady() {
      if (!pig2.paused) {
        var t = pig2.currentTime;
        pig2.currentTime = kt.randInt(12, 0);

        setTimeout(function() {
          pig2.currentTime = t;
          if (p2active)
            setTimeout(intersperseLady, kt.randInt(20000, 10000));
        }, kt.randInt(5000, 2000));;
      }
    }

    $pig2.show();
    pig2.play();
    p2active = true;
    pig2.loop = true;
    grow();
    setTimeout(fluctuateSize, 19000);
    setTimeout(growStrength, 30000);
    setTimeout(intersperseLady, 37000);
  }

  function startPig3() {
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
      $spig.fadeIn(100, function() {
        setTimeout(function() {
          $spig.hide();
          if(spactive)
            setTimeout(makeFreaky, kt.randInt(6000, 3000));
        }, kt.randInt(5000, 3000));
      });
    }

    $spig.show();
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

      if (p1active)
        setTimeout(flicker, kt.randInt(260, 80));
    }

    flicker();
  }

  function startMoney() {
    function stopPigs() {
      pig1.pause();
      pig2.pause();
      spig.pause();
      $pig1.hide();
      $pig2.hide();
      $spig.hide();
      p1active = false;
      p2active = false;
      spactive = false;
    }

    var flashed = 0;
    function flash() {
      $('body').css('background-color', 'red');
      setTimeout(function() {
        $('body').css('background-color', 'black');
        flashed++;
        if (flashed < 7)
          setTimeout(flash, 200);
        else
          startMoney();
      }, 200);
    }

    stopPigs();
    flash();

    function scroogeit() {
      $scrooge.show();
      scrooge.play();
      scrooge.loop = true;

      function scroogeWarp() {
        // maybe add translation as well
        var p = Math.random();
        if (p < 0.05) { //small
          kt.scale($scrooge, Math.random() * 0.5);
        } else {
          var s = Math.random() * 10;
          var xp = kt.randInt(100) - 50;
          var yp = kt.randInt(100) - 50;
          kt.slaw($scrooge, s, xp + '%', yp + '%');
        }

        setTimeout(function() {
          kt.slaw($scrooge, 1.0, '0%', '0%');
          setTimeout(scroogeWarp, kt.randInt(300, 150));
        }, kt.randInt(300, 150));
      }

      function scroogeInvert() {
        kt.invert($scrooge, kt.randInt(100, 75));
        setTimeout(function() {
          kt.invert($scrooge, 0);
          setTimeout(scroogeInvert, kt.randInt(2000, 600));
        }, kt.randInt(1000, 300));
      }

      setTimeout(scroogeWarp, 18000);
      setTimeout(scroogeInvert, 18000);
    }

    function boosieit() {
      $boosie.show();
      boosie.loop = true;
      var left = 40;
      var movinleft = false;
      boosie.play();
      move();
      rotate();
      hueshift();
      kt.saturate($boosie, 150);

      function move() {
        $boosie.css('left', left + 'px');
        if(!movinleft) {
          left += 3;
          if (left >= 200)
            movinleft = true;
        } else {
          left -= 3;
          if (left <= 40)
            movinleft = false;
        }

        setTimeout(move, 30);
      }

      var deg = 0;
      function rotate() {
        deg = (deg - 45) % 360;
        kt.straw($boosie, (Math.random() * 0.9) + 1, deg);
        setTimeout(rotate, kt.randInt(600, 100));
      }

      function hueshift() {
        kt.hutate($boosie, kt.randInt(90));
        setTimeout(hueshift, kt.randInt(300, 100));
      }

      boosie.addEventListener('ended', function() {
        if (boosie.playbackRate > 0.125)
          boosie.playbackRate = boosie.playbackRate * 0.5;
        else
          boosie.playbackRate = 1;
      });

    }

    function factoryit() {
      $factory.show();
      factory.loop = true;
      factory.playbackRate = 4;
      var right = 40;
      var movinleft = true;
      factory.play();
      move();
      rotate();
      kt.saturate($factory, 150);

      function move() {
        $factory.css('right', right + 'px');
        if(movinleft) {
          right += 3;
          if (right >= 200)
            movinleft = false;
        } else {
          right -= 3;
          if (right <= 40)
            movinleft = true;
        }

        setTimeout(move, 30);
      }

      var deg = 0;
      function rotate() {
        deg = (deg + 45) % 360;
        kt.straw($factory, (Math.random() * 0.9) + 1, deg);
        setTimeout(rotate, kt.randInt(600, 100));
      }

      factory.addEventListener('ended', function() {
        if (factory.playbackRate < 32)
          factory.playbackRate = factory.playbackRate * 2;
        else
          factory.playbackRate = 4;
      });

    }

    function startMoney() {
      scroogeit();
      setTimeout(boosieit, 30000);
      setTimeout(factoryit, 30000);
    }

  }

  function resurrectPigs() {

  }


});
