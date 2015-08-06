'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcAlign = require('rc-align');

var _rcAlign2 = _interopRequireDefault(_rcAlign);

var _rcUtil = require('rc-util');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var Dialog = _react2['default'].createClass({
  displayName: 'Dialog',

  getDialogElement: function getDialogElement() {
    var props = this.props;
    var closable = props.closable;
    var prefixCls = props.prefixCls;
    var dest = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    var footer;
    if (props.footer) {
      footer = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer' },
        props.footer
      );
    }

    var header;
    if (props.title || props.closable) {
      header = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-header' },
        closable ? _react2['default'].createElement(
          'a',
          { tabIndex: "0", onClick: props.onRequestClose, className: prefixCls + '-close' },
          _react2['default'].createElement('span', { className: prefixCls + '-close-x' })
        ) : null,
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-title' },
          props.title
        )
      );
    }

    var style = (0, _objectAssign2['default'])({}, props.style, dest);
    var dialogProps = {
      className: [props.prefixCls, props.className].join(' '),
      tabIndex: '0',
      role: 'dialog',
      ref: 'dialog',
      style: style,
      onKeyDown: this.handleKeyDown
    };
    var transitionName = this.getTransitionName();
    var dialogElement = _react2['default'].createElement(
      'div',
      dialogProps,
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-content' },
        header,
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-body' },
          props.children
        ),
        footer
      ),
      _react2['default'].createElement(
        'div',
        { tabIndex: "0", ref: 'sentinel', style: { width: 0, height: 0, overflow: 'hidden' } },
        'sentinel'
      )
    );
    // add key for align to keep animate children stable
    return _react2['default'].createElement(
      _rcAnimate2['default'],
      { key: "dialog",
        showProp: "dialogVisible",
        onEnd: this.handleAnimateEnd,
        transitionName: transitionName,
        component: "",
        animateMount: true },
      _react2['default'].createElement(
        _rcAlign2['default'],
        { align: props.align,
          key: "dialog",
          dialogVisible: props.visible,
          monitorBufferTime: 80,
          monitorWindowResize: true,
          disabled: !props.visible },
        dialogElement
      )
    );
  },

  getMaskElement: function getMaskElement() {
    var props = this.props;
    var maskProps = {
      onClick: this.handleMaskClick,
      'data-visible': props.visible
    };

    if (props.zIndex) {
      maskProps.style = { zIndex: props.zIndex };
    }
    var maskElement;
    if (props.mask) {
      var maskTransition = this.getMaskTransitionName();
      maskElement = _react2['default'].createElement('div', _extends({}, maskProps, { className: props.prefixCls + '-mask', key: "mask" }));
      if (maskTransition) {
        maskElement = _react2['default'].createElement(
          _rcAnimate2['default'],
          { key: "mask", showProp: "data-visible", animateMount: true, component: "",
            transitionName: maskTransition },
          maskElement
        );
      }
    }
    return maskElement;
  },

  getMaskTransitionName: function getMaskTransitionName() {
    var props = this.props;
    var transitionName = props.maskTransitionName;
    var animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = props.prefixCls + '-' + animation;
    }
    return transitionName;
  },

  componentDidMount: function componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var props = this.props;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        _react2['default'].findDOMNode(this.refs.dialog).focus();
      }
    } else if (prevProps.visible) {
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          // empty
        }
        this.lastOutSideFocusNode = null;
      }
    }
  },

  handleKeyDown: function handleKeyDown(e) {
    var props = this.props;
    if (props.closable) {
      if (e.keyCode === _rcUtil.KeyCode.ESC) {
        this.props.onRequestClose();
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === _rcUtil.KeyCode.TAB) {
        var activeElement = document.activeElement;
        var dialogRoot = _react2['default'].findDOMNode(this.refs.dialog);
        var sentinel = _react2['default'].findDOMNode(this.refs.sentinel);
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === _react2['default'].findDOMNode(this.refs.sentinel)) {
          dialogRoot.focus();
        }
      }
    }
  },

  getTransitionName: function getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    var animation = props.animation;
    if (!transitionName && animation) {
      transitionName = props.prefixCls + '-' + animation;
    }
    return transitionName;
  },

  handleShow: function handleShow() {
    this.props.onShow();
  },

  handleClose: function handleClose() {
    this.props.onClose();
  },

  handleAnimateEnd: function handleAnimateEnd(key, visible) {
    if (visible) {
      this.handleShow();
    } else {
      this.handleClose();
    }
  },

  handleMaskClick: function handleMaskClick() {
    if (this.props.closable) {
      this.props.onRequestClose();
    }
    _react2['default'].findDOMNode(this.refs.dialog).focus();
  },

  render: function render() {
    var _className;

    var props = this.props;
    var prefixCls = props.prefixCls;
    var className = (_className = {}, _defineProperty(_className, prefixCls + '-wrap', 1), _defineProperty(_className, prefixCls + '-wrap-hidden', !props.visible), _className);

    return _react2['default'].createElement(
      'div',
      { className: (0, _rcUtil.classSet)(className) },
      [this.getMaskElement(), this.getDialogElement()]
    );
  }
});

exports['default'] = Dialog;
module.exports = exports['default'];