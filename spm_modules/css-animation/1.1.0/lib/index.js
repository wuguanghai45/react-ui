'use strict';

var Event = require('./Event');
var Css = require('./Css');

var cssAnimation = function cssAnimation(node, transitionName, callback) {
  var className = transitionName;
  var activeClassName = className + '-active';

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    Css.removeClass(node, className);
    Css.removeClass(node, activeClassName);

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  Css.addClass(node, className);

  node.rcAnimTimeout = setTimeout(function () {
    Css.addClass(node, activeClassName);
    node.rcAnimTimeout = null;
  }, 0);

  return {
    stop: function stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }
  };
};

cssAnimation.style = function (node, style, callback) {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = function (e) {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(function () {
    for (var s in style) {
      node.style[s] = style[s];
    }
    node.rcAnimTimeout = null;
  }, 0);
};

cssAnimation.setTransition = function (node, property, v) {
  property = property || '';
  ['Webkit', 'Moz', 'O',
  // ms is special .... !
  'ms'].forEach(function (prefix) {
    node.style[prefix + 'Transition' + property] = v;
  });
};

cssAnimation.addClass = Css.addClass;
cssAnimation.removeClass = Css.removeClass;
cssAnimation.isCssAnimationSupported = Event.endEvents.length !== 0;

module.exports = cssAnimation;