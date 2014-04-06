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
  ct = ct.replace(/scale\(.*?\)/, '').replace('none', '');

  var t = ' scale(' + x + ')';
  this.setTransform(el, ct + t);
}

/**
 * Translate an element by x, y (include your own units);
 *
 * @api public
 */
Kutility.prototype.translate = function(el, x, y) {
  var ct = this.getTransform(el);
  ct = ct.replace(/translate\(.*?\)/, '').replace('none', '');

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
  ct = ct.replace(/skew\(.*?\)/, '').replace('none', '');

  var xd = x + 'deg';
  var yd = y + 'deg';
  var t = ' skew(' + xd + ', ' + yd + ')';
  this.setTransform(el, ct + t);
}

/**
 * Warp an element by a random amount by rotating and skewing it.
 *
 * @api public
 */
Kutility.prototype.warp = function(el) {
  var r = Math.floor(Math.random() * 360);
  var x = Math.floor(Math.random() * 360);
  var y = Math.floor(Math.random() * 360);

  this.rotate(el, r);
  this.skew(el, x, y);
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

},{"./lib/kutility":1}]},{},[2])