'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function noop() {}

function copy(obj, fields) {
  var ret = {};
  fields.forEach(function (f) {
    if (obj[f] !== undefined) {
      ret[f] = obj[f];
    }
  });
  return ret;
}

var DialogWrap = (function (_React$Component) {
  _inherits(DialogWrap, _React$Component);

  function DialogWrap(props) {
    var _this = this;

    _classCallCheck(this, DialogWrap);

    _get(Object.getPrototypeOf(DialogWrap.prototype), 'constructor', this).call(this, props);
    this.state = {
      visible: this.props.visible
    };
    ['cleanDialogContainer', 'requestClose', 'close', 'handleClose', 'handleShow'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(DialogWrap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.state.visible !== props.visible) {
        if (props.visible) {
          this.show();
        } else {
          this.close();
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!this.state.visible && !nextState.visible) {
        return false;
      }
      return true;
    }
  }, {
    key: 'show',
    value: function show() {
      if (!this.state.visible) {
        this.setState({
          visible: true
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.state.visible) {
        this.setState({
          visible: false
        });
      }
    }
  }, {
    key: 'requestClose',
    value: function requestClose() {
      var onBeforeClose = this.props.onBeforeClose;
      var close = this.close;
      if (onBeforeClose) {
        var ret;
        if (onBeforeClose.length) {
          ret = onBeforeClose(close);
        } else {
          ret = onBeforeClose();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }
  }, {
    key: 'getDialogContainer',
    value: function getDialogContainer() {
      if (!this.dialogContainer) {
        this.dialogContainer = document.createElement('div');
        this.dialogContainer.className = this.props.prefixCls + '-container';
        document.body.appendChild(this.dialogContainer);
      }
      return this.dialogContainer;
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.props.onClose();
    }
  }, {
    key: 'handleShow',
    value: function handleShow() {
      this.props.onShow();
    }
  }, {
    key: 'getDialogElement',
    value: function getDialogElement(extra) {
      var props = this.props;
      var dialogProps = copy(props, ['className', 'closable', 'align', 'title', 'footer', 'mask', 'animation', 'transitionName', 'maskAnimation', 'maskTransitionName', 'prefixCls', 'style', 'width', 'height', 'zIndex']);

      (0, _objectAssign2['default'])(dialogProps, {
        onClose: this.handleClose,
        onShow: this.handleShow,
        visible: this.state.visible,
        onRequestClose: this.requestClose
      }, extra);

      return _react2['default'].createElement(
        _Dialog2['default'],
        _extends({}, dialogProps, { key: "dialog" }),
        props.children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.visible) {
        this.dialogRendered = true;
      }
      return this.props.renderToBody ? null : this.dialogRendered ? this.getDialogElement() : null;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.renderToBody && this.dialogRendered) {
        _react2['default'].render(this.getDialogElement(), this.getDialogContainer());
      }
    }
  }, {
    key: 'cleanDialogContainer',
    value: function cleanDialogContainer() {
      _react2['default'].unmountComponentAtNode(this.getDialogContainer());
      document.body.removeChild(this.dialogContainer);
      this.dialogContainer = null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.dialogContainer) {
        if (this.state.visible) {
          _react2['default'].render(this.getDialogElement({
            onClose: this.cleanDialogContainer,
            visible: false
          }), this.dialogContainer);
        } else {
          this.cleanDialogContainer();
        }
      }
    }
  }]);

  return DialogWrap;
})(_react2['default'].Component);

DialogWrap.defaultProps = {
  className: '',
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100]
  },
  renderToBody: true,
  mask: true,
  closable: true,
  prefixCls: 'rc-dialog',
  visible: false,
  onShow: noop,
  onClose: noop
};

DialogWrap.PropTypes = {
  className: _react2['default'].PropTypes.string,
  align: _react2['default'].PropTypes.shape({
    align: _react2['default'].PropTypes.array,
    offset: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number)
  }),
  renderToBody: _react2['default'].PropTypes.bool,
  mask: _react2['default'].PropTypes.bool,
  closable: _react2['default'].PropTypes.bool,
  prefixCls: _react2['default'].PropTypes.string,
  visible: _react2['default'].PropTypes.bool,
  onShow: _react2['default'].PropTypes.func,
  onClose: _react2['default'].PropTypes.func
};

exports['default'] = DialogWrap;
module.exports = exports['default'];