(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* export something */
module.exports = new Kutility;

/* constructor does nothing at this point */
function Kutility() {

}

/**
 * get a random object from the array arr
 *
 * @api public
 */

Kutility.prototype.choice = function(arr) {
    var i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

/**
 * returns a random color as an 'rgb(x, y, z)' string
 *
 * @api public
 */
Kutility.prototype.randColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Kutility.prototype.randInt = function(max, min) {
  if (min)
    return Math.floor(Math.random() * (max - min)) + min;
  else
    return Math.floor(Math.random() * (max));
}

/**
 * Color wheel 1 -> 1536.
 *
 * Written by Henry Van Dusen, all attribution to the big boy.
 * Slightly modified by Kev.
 *
 * @api public
 */
 Kutility.prototype.colorWheel = function(num) {
    var text = "rgb(";
    var entry = num % 1536;
    var num = entry % 256;

    if(entry < 256 * 1)
    	return text + "0,255," + num + ")";
    else if(entry < 256 * 2)
    	return text + "0," + (255 - num) + ",255)";
    else if(entry < 256 * 3)
      return text + num + ",0,255)";
    else if(entry < 256 * 4)
      return text + "255,0," + (255 - num) + ")";
    else if(entry < 256 * 5)
      return text + "255," + num + ",0)";
    else
      return text + (255 - num) + ",255,0)";
 }

 /**
  * Make an rbg() color string an rgba() color string
  *
  * @api public
  */
Kutility.prototype.alphize = function(color, alpha) {
  color.replace('rgb', 'rgba');
  color.replace(')', ', ' + alpha + ')');
  return color;
}

/**
 * Get an array of two random contrasting colors.
 *
 * @api public
 */
Kutility.prototype.contrasters = function() {
  var num = Math.floor(Math.random() * 1536);
  var fg = this.colorWheel(num);
  var bg = this.colorWheel(num + 650);
  return [fg, bg];
}

/**
 * Add a random shadow to a jquery element
 *
 * @api public
 */
Kutility.prototype.addShadow = function(el, size) {
  var s = size + 'px';
  var shadow = '0px 0px ' + s + ' ' + s + ' ' + this.randColor();
  el.css('-webkit-box-shadow', shadow);
  el.css('-moz-box-shadow', shadow);
  el.css('box-shadow', shadow);
}

/**
 * Add transform to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addTransform = function(el, transform) {
  var curTransform = this.getTransform(el);
  curTransform = curTransform.replace('none', '');
  var newTransform = curTransform + transform;
  this.setTransform(el, newTransform);
}

/**
 * Set transform of element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.setTransform = function(el, transform) {
  el.css('-webkit-transform', transform);
  el.css('-moz-transform', transform);
  el.css('-ms-transform', transform);
  el.css('-o-transform', transform);
  el.css('transform', transform);
}

/**
 * Check an elements tansform.
 *
 * @api public
 */
Kutility.prototype.getTransform = function(el) {
  var possible = ['transform', '-webkit-transform', '-moz-transform', '-ms-transform', '-o-transform'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all transforms from element.
 *
 * @api public
 */
Kutility.prototype.clearTransforms = function(el) {
  el.css('-webkit-transform', '');
  el.css('-moz-transform', '');
  el.css('-ms-transform', '');
  el.css('-o-transform', '');
  el.css('transform', '');
}

/**
 * Rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.rotate = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct  + t);
}

/**
 * Scale an element by x (no units);
 *
 * @api public
 */
Kutility.prototype.scale = function(el, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ',' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  console.log(ct);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + t);
}

/**
 * Skew an element by x, y degrees;
 *
 * @api public
 */
Kutility.prototype.skew = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/skew\(.*?\)/, '').replace(/matrix\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el, d, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var r = ' rotate(' + d + 'deg)';
  var xd = x + 'deg';
  var yd = y + 'deg';
  var s = ' skew(' + xd + ', ' + yd + ')';

  this.setTransform(el, ct + r + s);
}

/**
 * scale by w, translate x y
 *
 * @api public
 */
Kutility.prototype.slaw = function(el, w, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var t = ' translate(' + x + ', '  + y + ')';
  this.setTransform(el, ct + s + t);
}

/**
 * scale by w, rotate by x
 *
 * @api public
 */
Kutility.prototype.straw = function(el, w, x) {
  var ct = this.getTransform(el);
  ct = ct.replace(/matrix\(.*?\)/, '').replace('none', '');

  var s = ' scale(' + w + ',' + w + ')';
  var r = ' rotate(' + x + 'deg)';
  this.setTransform(el, ct + s + r);
}

/**
 * Add filter to element with all the lame browser prefixes.
 *
 * @api public
 */
Kutility.prototype.addFilter = function(el, filter) {
  var curFilter = this.getFilter(el);
  curFilter = curFilter.replace('none', '');
  var newFilter = curFilter + ' ' + filter;
  this.setFilter(el, newFilter);
}

/**
 * Set filter to element with all lame prefixes.
 *
 * @api public
 */
Kutility.prototype.setFilter = function(el, filter) {
  el.css('-webkit-filter', filter);
  el.css('-moz-filter', filter);
  el.css('-ms-filter', filter);
  el.css('-o-filter', filter);
  el.css('filter', filter);
}

/**
 * Check an elements filter.
 *
 * @api public
 */
Kutility.prototype.getFilter = function(el) {
  var possible = ['filter', '-webkit-filter', '-moz-filter', '-ms-filter', '-o-filter'];

  for (var i = 0; i < possible.length; i++) {
    var f = el.css(possible[i]);
    if (f == 'none' && i + 1 < possible.length) {
      var pf = el.css(possible[i + 1]);
      if (pf)
        continue;
    }
    return f;
  }
}

/**
 * Remove all filters from element.
 *
 * @api public
 */
Kutility.prototype.clearFilters = function(el) {
  el.css('-webkit-filter', '');
  el.css('-moz-filter', '');
  el.css('-ms-filter', '');
  el.css('-o-filter', '');
  el.css('filter', '');
}

/**

/**
 * Grayscale an element by x percent.
 *
 * @api public
 */
Kutility.prototype.grayscale = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/grayscale\(.*?\)/, '').replace('none', '');

  var f = ' grayscale(' + x + '%)';
  this.setFilter(el, cf  + f);
}

/**
 * Sepia an element by x percent.
 *
 * @api public
 */
Kutility.prototype.sepia = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/sepia\(.*?\)/, '').replace('none', '');

  var f = ' sepia(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Saturate an element by x percent.
 *
 * @api public
 */
Kutility.prototype.saturate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/saturate\(.*?\)/, '').replace('none', '');

  var f = ' saturate(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Invert an element by x percent.
 *
 * @api public
 */
Kutility.prototype.invert = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/invert\(.*?\)/, '').replace('none', '');

  var f = ' invert(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Hue-rotate an element by x degrees.
 *
 * @api public
 */
Kutility.prototype.hutate = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/hue-rotate\(.*?\)/, '').replace('none', '');

  var f = ' hue-rotate(' + x + 'deg)';
  this.setFilter(el, cf + f);
}

/**
 * Set opacity of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.opace = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/opacity\(.*?\)/, '').replace('none', '');

  var f = ' opacity(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set brightness of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.brightness = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/brightness\(.*?\)/, '').replace('none', '');

  var f = ' brightness(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Set contrast of an element to x percent.
 *
 * @api public
 */
Kutility.prototype.contrast = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/contrast\(.*?\)/, '').replace('none', '');

  var f = ' contrast(' + x + '%)';
  this.setFilter(el, cf + f);
}

/**
 * Blur an element by x pixels.
 *
 * @api public
 */
Kutility.prototype.blur = function(el, x) {
  var cf = this.getFilter(el);
  cf = cf.replace(/blur\(.*?\)/, '').replace('none', '');

  var f = ' blur(' + x + 'px)';
  this.setFilter(el, cf + f);
}

},{}],2:[function(require,module,exports){
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
  var MONEY_TIME = 80000;
  var PIG_REENTRANCE = 150000;
  var CHILLTIME = 200000;

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
    setTimeout(flickerPig1, P1_DUR - 20000);
    setTimeout(startMoney, MONEY_TIME);
    setTimeout(resurrectPigs, PIG_REENTRANCE);
    setTimeout(chillout, CHILLTIME);

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

  var flashed;
  function flash(color, cb) {
    flashed = 0;

    function doflash() {
      $('body').css('background-color', color);
      setTimeout(function() {
        $('body').css('background-color', 'black');
        flashed++;
        if (flashed < 7)
          setTimeout(doflash, 200);
        else
          cb();
      }, 200);
    }

    doflash();
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

    function startVids() {
      scroogeit();
      setTimeout(boosieit, 30000);
      setTimeout(factoryit, 30000);
    }

    stopPigs();
    flash('red', startVids);

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
          var xp = kt.randInt(20) - 10;
          var yp = kt.randInt(20) - 10;
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

      setTimeout(scroogeWarp, 12000);
      setTimeout(scroogeInvert, 12000);
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

  }

  function resurrectPigs() {
    factory.pause();
    boosie.pause();
    scrooge.pause();
    $factory.hide();
    $boosie.hide();
    $scrooge.hide();
    $scrooge.css('opacity', 0.6);
    $boosie.css('opacity', 0.5);
    $factory.css('opacity', 0.5);
    $pig2.css('opacity', 0.5);
    $spig.css('opacity', 0.5);

    flashed = 0;
    flash('yellow', bringemback);

    function bringemback() {
      $spig.show();
      $pig1.show();
      $pig2.show();
      p1active = true;
      p2active = true;
      spactive = true;
      pig1.play();
      startPig2();
      startPig3();
      $factory.show();
      $boosie.show();
      $scrooge.show();
      factory.play();
      boosie.play();
      scrooge.play();

    }
  }

  function chillout() {
    $spig.hide();
    spig.pause();
    spactive = false;

    $factory.hide();
    factory.pause();

    $boosie.hide();
    boosie.pause();

    p2active = false;
    pig2.currentTime = 1;
    pig2.playbackRate = 0.3;
    $pig2.css('height', '100%');
    $pig2.css('left', '25%');

    $scrooge.css('width', '50%');

    setTimeout(function() {
      $pig2.hide();
      pig2.pause();

      $scrooge.hide();
      scrooge.pause();
    }, 20000);



  }


});

},{"./lib/kutility":1}]},{},[2])