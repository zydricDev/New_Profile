// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/canvasHome.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

var Pop_Words = /*#__PURE__*/function () {
  function Pop_Words(ltr, x, y, opac, isLast, size, doResize, drawn, mouseX, mouseY) {
    _classCallCheck(this, Pop_Words);

    this.ltr = ltr;
    this.x = x;
    this.y = y;
    this.opac = opac;
    this.isLast = isLast;
    this.size = size;
    this.doResize = doResize;
    this.drawn = drawn;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  _createClass(Pop_Words, [{
    key: "draw",
    value: function draw() {
      //&& this.opacDelay >= 0
      if (this.opac < 1) {
        this.opac += 0.2;
      }

      if (this.opac >= 1 && this.drawn == false) {
        this.doResize = false;
        this.drawn = true;
      }

      c.globalAlpha = this.opac;
      c.font = this.size + 'px Bungee';

      if (this.drawn == false && this.opac < 0.5) {
        this.size += 4;
      }

      if (this.drawn == false && this.opac >= 0.5) {
        this.size -= 4;
      }

      if (this.mouseX >= this.x && this.mouseX <= this.x + 20 && this.mouseY >= this.y - 20 && this.mouseY <= this.y && this.drawn == true && this.size < 40) {
        this.size += 10;
      }

      if ((this.mouseX < this.x || this.mouseX > this.x + 20) &&
      /*
      (this.mouseY < this.y-20 ||
      this.mouseY > this.y) &&*/
      this.drawn == true && this.size > 30) {
        this.size -= 2;
      }
      /*if(this.size >= 32){
        this.size -=2
      }*/


      if (this.size >= 40) {
        c.fillStyle = "red";
      }

      c.fillText(this.ltr, this.x, this.y);
      c.fillStyle = "black";
    }
  }, {
    key: "update",
    value: function update() {
      if (this.doResize == true || this.drawn == true) {
        this.draw();
      }
    }
  }]);

  return Pop_Words;
}();

var Fade_Words = /*#__PURE__*/function () {
  function Fade_Words(ltr, x, y, opac, size, drawn) {
    _classCallCheck(this, Fade_Words);

    this.ltr = ltr;
    this.x = x;
    this.y = y;
    this.opac = opac;
    this.size = size;
    this.drawn = drawn;
  }

  _createClass(Fade_Words, [{
    key: "draw",
    value: function draw() {
      if (this.opac < 1 && this.drawn == false) {
        this.opac += 0.03;
      }

      if (this.opac >= 1 && this.drawn == false) {
        this.drawn = true;
      }

      c.globalAlpha = this.opac;
      c.font = this.size + 'px Bungee';
      c.fillText(this.ltr, this.x, this.y, 500);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
    }
  }]);

  return Fade_Words;
}();

var Star = /*#__PURE__*/function () {
  function Star(x, y, radians, radius, color, size, opac, delay) {
    _classCallCheck(this, Star);

    this.x = x;
    this.y = y;
    this.radians = Math.round(radians, 5);
    this.radius = radius;
    this.color = color;
    this.size = size;
    this.opac = opac;
    this.delay = delay;
  }

  _createClass(Star, [{
    key: "draw",
    value: function draw() {
      c.globalAlpha = this.opac;

      if (this.opac < 1) {
        this.opac += 0.01;
      }

      this.x = this.x + Math.cos(this.radians) * this.radius;
      this.y = this.y + Math.sin(this.radians) * this.radius;
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();

      if (this.radians >= 62.83) {
        this.radians = 0;
      }

      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.radians += 0.01745;
      c.fillStyle = "black";
    }
  }, {
    key: "update",
    value: function update() {
      if (this.delay <= 0) {
        this.draw();
      } else {
        this.delay -= 0.055;
      }
    }
  }]);

  return Star;
}(); //


var sentenceAry = [];
var words = "Hi,I'm Zydric,web developer";
var lastLtr = false;
var sub = 0;
var starAry;

function setup() {
  for (var i = 0; i < words.length; i++) {
    if (i == words.length - 1) {
      lastLtr = true;
    }

    if (i == 0) {
      sentenceAry.push(new Pop_Words(words.charAt(i), i * 10, 0, 0, lastLtr, 30, true, false));
    } else {
      if (i < 3) {
        if (i == 2) {
          sentenceAry.push(new Pop_Words(words.charAt(i), i * 19, 0, 0, lastLtr, 30, false, false));
        } else {
          sentenceAry.push(new Pop_Words(words.charAt(i), i * 20, 0, 0, lastLtr, 30, false, false));
        }
      }

      if (i >= 3 && i < 14) {
        if (i == 4) {
          sentenceAry.push(new Pop_Words(words.charAt(i), sub - 5, 50, 0, lastLtr, 30, false, false));
        } else {
          if (i == 5) {
            sentenceAry.push(new Pop_Words(words.charAt(i), sub + 3, 50, 0, lastLtr, 30, false, false));
            sub += 20;
          } else {
            if (i == 12) {
              sentenceAry.push(new Pop_Words(words.charAt(i), sub - 3, 50, 0, lastLtr, 30, false, false));
              sub += 15;
            } else {
              sentenceAry.push(new Pop_Words(words.charAt(i), sub, 50, 0, lastLtr, 30, false, false));
              sub += 20;
            }
          }
        }
      }

      if (i >= 14) {
        if (sub > 0 && i == 14) {
          sub = 0;
        }

        if (i == 15) {
          sentenceAry.push(new Pop_Words(words.charAt(i), sub + 3, 100, 0, lastLtr, 30, false, false));
          sub += 21;
        } else {
          sentenceAry.push(new Pop_Words(words.charAt(i), sub, 100, 0, lastLtr, 30, false, false));
          sub += 20;
        }
      }
    }
  }

  starAry = [];
  starAry.push(new Star(innerWidth / 2, innerHeight / 2 - 400, 0, 8, 'red', 200, 0, 0));
  starAry.push(new Star(innerWidth / 2, innerHeight / 2 - 400, 0, 8, 'green', 200, 0, 10));
}

setup();
var desc = "Megamind was a great movie";
var description = new Fade_Words(desc, 0, 150, 0, 15, false);
var currentLtr = 0; //words.charAt()

var active = true; //

var mousex, mousey;
c.canvas.addEventListener('mousemove', function (event) {
  mousex = event.clientX - c.canvas.offsetLeft - 100, mousey = event.clientY - c.canvas.offsetTop - 100;
  
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.save();
  c.translate(100, 100);

  if (sentenceAry[sentenceAry.length - 1].drawn == true) {
    starAry.forEach(function (stars) {
      stars.update();
    });
  }

  for (var i = 0; i < sentenceAry.length; i++) {
    sentenceAry[i].mouseX = mousex;
    sentenceAry[i].mouseY = mousey;

    if (sentenceAry[i].doResize == false && currentLtr == i) {
      currentLtr = i + 1;

      if (currentLtr < sentenceAry.length) {
        sentenceAry[currentLtr].doResize = true;
      }
    }

    sentenceAry[i].update();
  }

  if (sentenceAry[sentenceAry.length - 1].drawn == true) {
    description.update();
  }

  c.restore();
}

animate();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61279" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/canvasHome.js"], null)
//# sourceMappingURL=/canvasHome.40cfd92c.js.map
