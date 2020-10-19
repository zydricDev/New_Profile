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
})({"js/cube.js":[function(require,module,exports) {
var Point2D = function Point2D(x, y) {
  this.x = x;
  this.y = y;
};

var Point3D = function Point3D(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

var Cube = function Cube(x, y, z, size) {
  Point3D.call(this, x, y, z); //inheritance from cube

  size *= 0.5; //this is the same

  this.vertices = [new Point3D(x - size, y - size, z - size), new Point3D(x + size, y - size, z - size), new Point3D(x + size, y + size, z - size), new Point3D(x - size, y + size, z - size), new Point3D(x - size, y - size, z + size), new Point3D(x + size, y - size, z + size), new Point3D(x + size, y + size, z + size), new Point3D(x - size, y + size, z + size)];
  this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];
}; //cube spinning V


Cube.prototype = {
  rotateX: function rotateX(radian) {
    var cosine = Math.cos(radian);
    var sine = Math.sin(radian);

    for (var index = this.vertices.length - 1; index > -1; --index) {
      var p = this.vertices[index];
      var y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
      var z = (p.y - this.y) * sine + (p.z - this.z) * cosine;
      p.y = y + this.y;
      p.z = z + this.z;
    }
  },
  rotateY: function rotateY(radian) {
    var cosine = Math.cos(radian);
    var sine = Math.sin(radian);

    for (var index = this.vertices.length - 1; index > -1; --index) {
      var p = this.vertices[index];
      var x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
      var z = (p.z - this.z) * cosine - (p.x - this.x) * sine;
      p.x = x + this.x;
      p.z = z + this.z;
    }
  }
}; //setup

var context = document.querySelector("#canvas_skill").getContext("2d");
var pointer = new Point2D(0, 0);
var cube = new Cube(0, 0, 400, 400);
var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

function project(points3d, width, height) {
  //size of the cube
  var points2d = new Array(points3d.length);
  var focal_length = 200;

  for (var index = points3d.length - 1; index > -1; --index) {
    var p = points3d[index];
    var x = p.x * (focal_length / p.z) + width * 0.5;
    var y = p.y * (focal_length / p.z) + height * 0.5;
    points2d[index] = new Point2D(x, y);
  }

  return points2d;
}

function loop() {
  if(document.getElementById('hidden').innerHTML == "Completed"){
    window.requestAnimationFrame(loop);
    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.fillStyle = "#ffffff";
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#ffffff";
    cube.rotateX(pointer.y * 0.0001);
    cube.rotateY(-pointer.x * 0.0001);
    context.fillStyle = "black";
    var vertices = project(cube.vertices, width, height);

    for (var index = cube.faces.length - 1; index > -1; --index) {
      var face = cube.faces[index];
      var p1 = cube.vertices[face[0]];
      var p2 = cube.vertices[face[1]];
      var p3 = cube.vertices[face[2]];
      var v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
      var v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
      var n = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

      if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z >= 0) {
        context.beginPath();
        context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
        context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
        context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
        context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
        context.closePath();
        context.fill();
        context.stroke();
      }
    }

    for (var _index = vertices.length - 1; _index > -1; --_index) {
      context.textAlign = "center";
      context.strokeStyle = "white";
      context.font = "25px Bungee";
      var myX = vertices[_index].x;
      var myY = vertices[_index].y;

      if (_index == 0) {
        context.strokeText("LARAVEL", myX, myY);
      }

      if (_index == 1) {
        context.strokeText("CSS", myX, myY);
      }

      if (_index == 2) {
        context.strokeText("SCSS", myX, myY);
      }

      if (_index == 3) {
        context.strokeText("REACT", myX, myY);
      }

      if (_index == 4) {
        context.strokeText("HTML", myX, myY);
      }

      if (_index == 5) {
        context.strokeText("JAVASCRIPT", myX, myY);
      }

      if (_index == 6) {
        context.strokeText("MYSQL", myX, myY);
      }

      if (_index == 7) {
        context.strokeText("PHP", myX, myY);
      }
    }
  }

}

loop();
window.addEventListener("click", function (event) {
  pointer.x = event.pageX - width * 0.5;
  pointer.y = event.pageY - height * 0.5;
});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58609" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/cube.js"], null)
//# sourceMappingURL=/cube.1c2ec62a.js.map
