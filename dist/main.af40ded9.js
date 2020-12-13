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
})({"UFxE":[function(require,module,exports) {
module.exports = "/add.897de950.svg";
},{}],"QGU6":[function(require,module,exports) {
module.exports = "/close.72d40857.svg";
},{}],"XIz4":[function(require,module,exports) {
module.exports = "/zhihu.c9cea954.svg";
},{}],"hz8U":[function(require,module,exports) {
module.exports = {
  "add": require("./add.svg"),
  "close": require("./close.svg"),
  "zhihu": require("./zhihu.svg")
};
},{"./add.svg":"UFxE","./close.svg":"QGU6","./zhihu.svg":"XIz4"}],"FOhY":[function(require,module,exports) {
module.exports = "/juejin.f5aab1aa.png";
},{}],"MFmu":[function(require,module,exports) {
module.exports = "/sifou.6c552347.png";
},{}],"BEHv":[function(require,module,exports) {
module.exports = "/lanqiu.e9c268fb.png";
},{}],"o5FB":[function(require,module,exports) {
module.exports = {
  "juejin": require("./juejin.png"),
  "sifou": require("./sifou.png"),
  "lanqiu": require("./lanqiu.png")
};
},{"./juejin.png":"FOhY","./sifou.png":"MFmu","./lanqiu.png":"BEHv"}],"epB2":[function(require,module,exports) {
"use strict";

var _ = _interopRequireDefault(require("./publish/*.svg"));

var _2 = _interopRequireDefault(require("./publish/*.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xObject = JSON.parse(localStorage.getItem('hashMap'));
var hashMap = xObject || [{
  logo: _2.default.juejin,
  name: '掘金',
  url: 'https://juejin.cn/'
}, {
  logo: _.default.zhihu,
  name: '知乎',
  url: 'https://www.zhihu.com/signin'
}, {
  logo: _2.default.sifou,
  name: '思否',
  url: 'https://segmentfault.com/'
}];
var $siteList = $('.siteList');
var $last = $('.last');

var simplifyUrl = function simplifyUrl(url) {
  // 删除 / 后面的所有内容
  // .replace('www.', '').replace(/\/.*/, '')
  return url.replace('https://', '').replace('http://', '').replace('www.', '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n                <div class=\"site\">\n                    <div class=\"logo\">\n                        <img src=\"".concat(node.logo, "\">\n                    </div>\n                    <div class=\"link\">").concat(node.name, "</div>\n                    <div class=\"close\">\n                        <img src=\"").concat(_.default.close, "\">\n                    </div>\n                </div>\n        </li>")).insertBefore($last);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  // 点击新增按钮，获取新增的网址
  var url = window.prompt('请问您要添加的网址是？？？');
  var text = window.prompt('请问您要添加的名称是？？？');

  if (!url) {
    window.confirm('请填写一个你需要的url哦！');
    return;
  }

  if (url.indexOf('http') !== 0 || url.indexOf('https') !== 0) {
    url = 'https://' + url;
  }

  if (!text) {
    window.confirm('请填写一个可爱的text哦！');
    return;
  }

  hashMap.push({
    logo: _2.default.lanqiu,
    name: text,
    url: url
  });
  render();
}); // 页面离开的时候会存储

window.onbeforeunload = function () {
  localStorage.setItem('hashMap', JSON.stringify(hashMap));
}; // // 键盘事件
// $(document).on('keypress', (e) => {
//     // 用 input 的 focus 判断是否能用键盘事件
//     if (!$('#input').is(':focus')) {
//         const { key } = e
//         console.log(key)
//     }
// })
},{"./publish/*.svg":"hz8U","./publish/*.png":"o5FB"}]},{},["epB2"], null)
//# sourceMappingURL=/main.af40ded9.js.map