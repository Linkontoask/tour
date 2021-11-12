'use strict';

var core = require('@popperjs/core');
var lodashEs = require('lodash-es');

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var defaultOptions = {
  footer: true,
  compulsory: true,
  maskClosable: true
};

var Tour = /*#__PURE__*/function () {
  function Tour() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tour);

    this.index = 0;
    this.steps = [];
    this.doc = document;
    this.options = lodashEs.merge(lodashEs.cloneDeep(defaultOptions), options);
    this.cache = {
      tourContainer: null,
      targetContainer: null,
      contentContainer: null
    };
  }

  _createClass(Tour, [{
    key: "isComplete",
    get: function get() {
      return this.index >= this.steps.length - 1;
    }
  }, {
    key: "isDestoryd",
    get: function get() {
      var tourContainer = this.cache.tourContainer;
      return !this.doc.contains(tourContainer);
    }
  }, {
    key: "addStep",
    value: function addStep(step) {
      this.steps.push(step);
      return this;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = lodashEs.merge(lodashEs.cloneDeep(this.options), options);
    }
  }, {
    key: "show",
    value: function show() {
      var tourContainer = this.cache.tourContainer;

      if (tourContainer) {
        tourContainer.style.display = 'block';
      } else {
        this._render();
      }

      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      var tourContainer = this.cache.tourContainer;

      if (tourContainer) {
        tourContainer.style.display = 'none';
      } else {
        this._render();
      }

      return this;
    }
  }, {
    key: "next",
    value: function next() {
      this.index++;

      this._render();

      return this;
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.index > 0) {
        this.index--;
      } else {
        // eslint-disable-next-line
        console.warn('stack top null');
      }

      this._render();

      return this;
    }
  }, {
    key: "start",
    value: function start() {
      this._render();

      return this;
    }
  }, {
    key: "complete",
    value: function complete() {
      this.clear();
      var tourContainer = this.cache.tourContainer;

      if (tourContainer) {
        tourContainer.style.display = 'none';
      }

      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.index = 0;
      this.steps = [];
      return this;
    }
  }, {
    key: "destory",
    value: function destory() {
      var tourContainer = this.cache.tourContainer;

      if (tourContainer && !this.isDestoryd) {
        this.clear();
        this.doc.body.removeChild(tourContainer);
      }
    }
  }, {
    key: "_scroll",
    value: function _scroll() {}
  }, {
    key: "_createElement",
    value: function _createElement(children, _ref) {
      var className = _ref.className,
          dataset = _ref.dataset,
          style = _ref.style,
          _ref$tag = _ref.tag,
          tag = _ref$tag === void 0 ? 'div' : _ref$tag,
          on = _ref.on;
      var div = this.doc.createElement(tag);

      if (className) {
        if (typeof className === 'string') {
          div.classList.add(className);
        }

        if (Array.isArray(className)) {
          className.forEach(function (name) {
            return div.classList.add(name);
          });
        }
      }

      if (dataset) {
        lodashEs.merge(div.dataset, dataset);
      }

      if (style && _typeof(style) === 'object') {
        lodashEs.merge(div.style, style);
      }

      if (on && _typeof(on) === 'object') {
        lodashEs.forIn(on, function (value, key) {
          if (value) {
            div.addEventListener(key, value);
          }
        });
      }

      if (typeof children === 'string') {
        div.innerHTML = children;
      } else if (Array.isArray(children)) {
        children.forEach(function (x) {
          return div.appendChild(x);
        });
      } else {
        div.appendChild(children);
      }

      return div;
    }
  }, {
    key: "_fixedPosition",
    value: function _fixedPosition(element, _ref2, _ref3) {
      var left = _ref2.left,
          top = _ref2.top,
          width = _ref2.width,
          height = _ref2.height;
      var marginTop = _ref3.marginTop,
          marginLeft = _ref3.marginLeft,
          marginBottom = _ref3.marginBottom,
          marginRight = _ref3.marginRight;
      var offset = 3;

      var _map = [marginTop, marginLeft, marginBottom, marginRight].map(function (x) {
        return +x.replace(/px$/g, '');
      }),
          _map2 = _slicedToArray(_map, 4),
          mt = _map2[0],
          ml = _map2[1],
          mb = _map2[2],
          mr = _map2[3];

      element.style.left = left - offset - ml + 'px';
      element.style.top = top - offset - mt + 'px';
      element.style.width = width + offset * 2 + ml + mr + 'px';
      element.style.height = height + offset * 2 + mt + mb + 'px';
    }
  }, {
    key: "_fixedStyle",
    value: function _fixedStyle(element, style) {
      if (style && _typeof(style) === 'object') {
        lodashEs.merge(element.style, style);
      }
    }
  }, {
    key: "_renderContent",
    value: function _renderContent(content, contentStyles) {
      var _this = this;

      var contentElement = this._createElement(this._createElement(content, {
        tag: 'span'
      }), {
        className: 'tour-content',
        style: contentStyles
      });

      var arrow = this._createElement([], {
        className: 'tour-arrow'
      });

      var btn = [];

      if (this.options.footer) {
        if (this.index > 0) {
          btn.push(this._createElement('上一步', {
            className: ['tour-footer-btn', 'tour-footer-btn--prev'],
            on: {
              click: function click(e) {
                _this.prev();
              }
            }
          }));
        }

        if (!this.isComplete) {
          btn.push(this._createElement('下一步', {
            className: ['tour-footer-btn', 'tour-footer-btn--next'],
            on: {
              click: function click() {
                _this.next();
              }
            }
          }));
        } else {
          btn.push(this._createElement('完成', {
            className: ['tour-footer-btn', 'tour-footer-btn--complete'],
            on: {
              click: function click() {
                _this.complete();
              }
            }
          }));
        }

        var footer = this._createElement(btn, {
          className: 'tour-footer'
        });

        contentElement.appendChild(footer);
      }

      contentElement.appendChild(arrow);
      return {
        contentElement: contentElement,
        arrow: arrow
      };
    }
  }, {
    key: "_renderTour",
    value: function _renderTour() {
      var _this$options = this.options,
          compulsory = _this$options.compulsory,
          maskClosable = _this$options.maskClosable;

      var tourMask = this._createElement([], {
        className: 'tour-mask'
      });

      var tourContainer = this._createElement([], {
        className: compulsory ? 'tour-container' : ''
      });

      var targetContainer = this._createElement([], {
        className: 'tour-target-container'
      });

      var contentContainer = this._createElement([], {
        className: compulsory ? ['tour-content-container', 'tour-frame'] : ['tour-content-container']
      });

      if (maskClosable) {
        tourMask.addEventListener('click', function () {
          tourContainer.style.display = 'none';
        });
      }

      if (compulsory) {
        tourContainer.appendChild(tourMask);
        contentContainer.appendChild(targetContainer);
      }

      tourContainer.appendChild(contentContainer);
      return {
        tourContainer: tourContainer,
        targetContainer: targetContainer,
        contentContainer: contentContainer
      };
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this2 = this;

      var step = this.steps[this.index];

      if (step) {
        var content = step.content,
            DOMString = step.DOMString,
            on = step.on,
            contentStyles = step.contentStyles,
            timeout = step.timeout;

        if (!this.cache.tourContainer || !this.cache.contentContainer || !this.cache.targetContainer) {
          var _this$_renderTour = this._renderTour(),
              _tourContainer = _this$_renderTour.tourContainer,
              _targetContainer = _this$_renderTour.targetContainer,
              _contentContainer = _this$_renderTour.contentContainer;

          this.cache.tourContainer = _tourContainer;
          this.cache.targetContainer = _targetContainer;
          this.cache.contentContainer = _contentContainer;
        } else {
          this.cache.contentContainer.innerHTML = '';
          this.cache.targetContainer.innerHTML = '';
          this.cache.contentContainer.appendChild(this.cache.targetContainer);
        }

        var _this$cache = this.cache,
            tourContainer = _this$cache.tourContainer,
            targetContainer = _this$cache.targetContainer,
            contentContainer = _this$cache.contentContainer;
        var el;

        if (lodashEs.isElement(DOMString)) {
          el = DOMString;
        } else {
          el = this.doc.querySelector(DOMString);
        }

        var target = el.cloneNode(true);

        if (on !== null && on !== void 0 && on.click) {
          target.addEventListener('click', on.click);
          target.addEventListener('click', function () {
            tourContainer.style.display = 'none';
          });
        }

        var _this$_renderContent = this._renderContent(content, contentStyles),
            contentElement = _this$_renderContent.contentElement,
            arrow = _this$_renderContent.arrow;

        this._fixedPosition(contentContainer, el.getBoundingClientRect(), getComputedStyle(el));

        var popper = core.createPopper(contentContainer, contentElement, lodashEs.merge({
          placement: 'auto',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          }, {
            name: 'arrow',
            options: {
              element: arrow
            }
          }]
        }, this.options.popper));
        targetContainer.appendChild(target);
        contentContainer.appendChild(contentElement);

        if (this.doc.contains(tourContainer)) {
          tourContainer.style.display = 'block';
        } else {
          this.doc.body.appendChild(tourContainer);
        }

        contentContainer.addEventListener('transitionend', function () {
          popper.update();
        });

        if (timeout) {
          setTimeout(function () {
            _this2.destory();
          }, timeout);
        }
      } else {
        // eslint-disable-next-line
        console.warn("index ".concat(this.index, " out bounds. use addStep function."));
      }
    }
  }]);

  return Tour;
}();

module.exports = Tour;
