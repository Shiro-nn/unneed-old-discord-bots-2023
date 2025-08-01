
if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}
window.console = window.console || function(t) {};
(function () {
  (function (e) {"use strict";var t = function (t, n) {this._el = e(t);if (this.repeat()) return true;this._settings = n;this._powerOn = false;this._loopTimeout = 0;this._el.html(this.buildHTML());this._items = this._el.find("span.novacancy");this._blinkArr = this.arrayMake();this.bindEvent();this.writeCSS();if (this._settings.autoOn) this.blinkOn();};t.prototype.repeat = function () {var e = this._el;if (e[0].novacancy) {return true;} else {e[0].novacancy = true;return false;}};t.prototype.writeCSS = function () {var t = this.css();var n = e("<style>" + t + "</style>");e("body").append(n);};t.prototype.selector = function () {var e = this._el;var t = e[0].tagName;if (e[0].id) t += "#" + e[0].id;if (e[0].className) t += "." + e[0].className;return t;};t.prototype.css = function () {var e = this.selector();var t = this._settings;var n = "text-shadow: " + t.glow.toString() + ";";var r = "color: " + t.color + ";" + n;var i = "color: " + t.color + "; opacity: 0.3;";var s = "";s += e + " .novacancy.on { " + r + " }" + "\n";s += e + " .novacancy.off { " + i + " }" + "\n";return s;};t.prototype.rand = function (e, t) {return Math.floor(Math.random() * (t - e + 1) + e);};t.prototype.isNumber = function (e) {return !isNaN(parseFloat(e)) && isFinite(e);};t.prototype.blink = function (e) {var t = this._settings;var n = this;this.off(e);e[0].blinking = true;setTimeout(function () {n.on(e);e[0].blinking = false;n.reblink(e);}, this.rand(t.blinkMin, t.blinkMax));};t.prototype.reblink = function (e) {var t = this._settings;var n = this;setTimeout(function () {if (n.rand(1, 100) <= t.reblinkProbability) {n.blink(e);}}, this.rand(t.blinkMin, t.blinkMax));};t.prototype.on = function (e) {e.removeClass("off").addClass("on");};t.prototype.off = function (e) {e.removeClass("on").addClass("off");};t.prototype.buildHTML = function () {var t = this._el;var n = "";e.each(t.contents(), function (t, r) {if (r.nodeType == 3) {var i = r.nodeValue.split("");e.each(i, function (e, t) {n += '<span class="novacancy on">' + t + "</span>";});} else {n += r.outerHTML;}});return n;};t.prototype.arrayMake = function () {var t = this._el;var n = this._settings;var r = this._items;var i = r.length;var s = this.randomArray(i);var o;var u;var a = n.off;var f = n.blink;var l = this;a = Math.min(a, i);a = Math.max(0, a);u = s.splice(0, a);e.each(u, function (t, n) {l.off(e(r[n]));});f = f === 0 ? i : f;f = Math.min(f, i - a);f = Math.max(0, f);o = s.splice(0, f);return o;};t.prototype.randomArray = function (e) {var t = [];var n;var r;var i;for (n = 0; n < e; ++n) {if (window.CP.shouldStopExecution(0)) break;t[n] = n;}window.CP.exitedLoop(0);for (n = 0; n < e; ++n) {if (window.CP.shouldStopExecution(1)) break;r = parseInt(Math.random() * e, 10);i = t[r];t[r] = t[n];t[n] = i;}window.CP.exitedLoop(1);return t;};t.prototype.loop = function () {if (!this._powerOn) return;var t = this._el;var n = this._settings;var r = this._blinkArr;var i = this._items;if (r.length === 0) return;var s;var o;var u = this;s = r[this.rand(0, r.length - 1)];o = e(i[s]);if (!o[0].blinking) this.blink(o);this._loopTimeout = setTimeout(function () {u.loop();}, this.rand(n.loopMin, n.loopMax));};t.prototype.blinkOn = function () {if (!this._powerOn) {var e = this._settings;var t = this;this._powerOn = true;this._loopTimeout = setTimeout(function () {t.loop();}, this.rand(e.loopMin, e.loopMax));}};t.prototype.blinkOff = function () {if (this._powerOn) {this._powerOn = false;clearTimeout(this._loopTimeout);}};t.prototype.bindEvent = function () {var e = this._el;var t = this;e.on("blinkOn", function (e) {t.blinkOn();});e.on("blinkOff", function (e) {t.blinkOff();});};var n = function (t) {var n = e.extend({ reblinkProbability: 1 / 3, blinkMin: .01, blinkMax: .5, loopMin: .5, loopMax: 2, color: "ORANGE", glow: ["0 0 80px Orange", "0 0 30px Red", "0 0 6px Yellow"], off: 0, blink: 0, autoOn: true }, t);n.reblinkProbability *= 100;n.blinkMin *= 1e3;n.blinkMax *= 1e3;n.loopMin *= 1e3;n.loopMax *= 1e3;return n;};e.fn.novacancy = function (r) {return e.each(this, function (e, i) {new t(this, n(r));});};})(jQuery);
  $(function () {
    $('#error').novacancy({
      'reblinkProbability': 0.1,
      'blinkMin': 0.2,
      'blinkMax': 0.6,
      'loopMin': 8,
      'loopMax': 10,
      'color': '#ffffff',
      'glow': ['0 0 80px #ffffff', '0 0 30px #008000', '0 0 6px #0000ff'] });

    return $('#code').novacancy({
      'blink': 1,
      'off': 1,
      'color': 'Red',
      'glow': ['0 0 80px Red', '0 0 30px FireBrick', '0 0 6px DarkRed'] });

  });

}).call(this);