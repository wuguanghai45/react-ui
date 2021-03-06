"use strict"

import {RouteHandler} from 'react-router'
import React from 'react'
import classnames from 'classnames'
import NavList from '../nav-list.jsx'
const {Message} = global.uiRequire()

export default class Page extends React.Component {
  static displayName = 'Master'

  state = {
    navShow: false
  }

  navToggle (show) {
    this.setState({ navShow: show })
  }

  render () {
    return (
      <div className={classnames({ 'nav-show': this.state.navShow })}>
        <NavList onToggle={this.navToggle.bind(this)} />
        <div className="main"><RouteHandler /></div>
        <Message />
      </div>
    )
  }
}
