'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _domAlign = require('dom-align');

var _domAlign2 = _interopRequireDefault(_domAlign);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

function isWindow(obj) {
  /*eslint-disable eqeqeq */
  return obj != null && obj == obj.window;
  /*eslint-enable eqeqeq */
}

function buffer(fn, ms) {
  var timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, ms);
  };
}

var Align = (function (_React$Component) {
  _inherits(Align, _React$Component);

  function Align(props) {
    _classCallCheck(this, Align);

    _get(Object.getPrototypeOf(Align.prototype), 'constructor', this).apply(this, arguments);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  _createClass(Align, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      var props = this.props;
      // parent ref not attached ....
      if (!props.disabled) {
        this.hackRefTimer = setTimeout(function () {
          var source = _react2['default'].findDOMNode(_this);
          props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
        }, 0);
        if (props.monitorWindowResize) {
          this.startMonitorWindowResize();
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.clearHackRefTimer();
    }
  }, {
    key: 'startMonitorWindowResize',
    value: function startMonitorWindowResize() {
      if (!this.resizeHandler) {
        this.resizeHandler = _rcUtil2['default'].Dom.addEventListener(window, 'resize', buffer(this.handleWindowResize, this.props.monitorBufferTime));
      }
    }
  }, {
    key: 'stopMonitorWindowResize',
    value: function stopMonitorWindowResize() {
      if (this.resizeHandler) {
        this.resizeHandler.remove();
        this.resizeHandler = null;
      }
    }
  }, {
    key: 'clearHackRefTimer',
    value: function clearHackRefTimer() {
      if (this.hackRefTimer) {
        clearTimeout(this.hackRefTimer);
        this.hackRefTimer = null;
      }
    }
  }, {
    key: 'handleWindowResize',
    value: function handleWindowResize() {
      var props = this.props;
      if (!props.disabled) {
        var source = _react2['default'].findDOMNode(this);
        props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopMonitorWindowResize();
      this.clearHackRefTimer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var reAlign = false;
      var props = this.props;
      var currentTarget;

      this.hackRefTimer = setTimeout(function () {
        if (!props.disabled) {
          if (prevProps.disabled || prevProps.align !== props.align) {
            reAlign = true;
            currentTarget = props.target();
          } else {
            var lastTarget = prevProps.target();
            currentTarget = props.target();
            if (isWindow(lastTarget) && isWindow(currentTarget)) {
              reAlign = false;
            } else if (lastTarget !== currentTarget) {
              reAlign = true;
            }
          }
        }

        if (reAlign) {
          var source = _react2['default'].findDOMNode(_this2);
          props.onAlign(source, (0, _domAlign2['default'])(source, currentTarget, props.align));
        }
      }, 0);

      if (props.monitorWindowResize && !props.disabled) {
        this.startMonitorWindowResize();
      } else {
        this.stopMonitorWindowResize();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].Children.only(this.props.children);
    }
  }]);

  return Align;
})(_react2['default'].Component);

Align.defaultProps = {
  target: function target() {
    return window;
  },
  onAlign: function onAlign() {},
  monitorBufferTime: 50,
  monitorWindowResize: false,
  disabled: false
};

Align.PropTypes = {
  align: _react2['default'].PropTypes.object.isRequired,
  target: _react2['default'].PropTypes.func,
  onAlign: _react2['default'].PropTypes.func,
  monitorBufferTime: _react2['default'].PropTypes.number,
  monitorWindowResize: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool
};

exports['default'] = Align;
module.exports = exports['default'];