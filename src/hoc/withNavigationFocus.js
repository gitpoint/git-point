import React from 'react'

// subscribed components update functions
let subscribedComponents = []


function _getCurrentRouteName(navigationState) {
  if (!navigationState) return null
  const route = navigationState.routes[navigationState.index]
  if (route.routes) return _getCurrentRouteName(route)
  return route.routeName
}

function updateFocus(currentState) {
  const currentRoute = _getCurrentRouteName(currentState)
  subscribedComponents.forEach(f => f(currentRoute))
}

function withNavigationFocus(WrappedComponent, screenName) {

  return class extends React.Component {
    static navigationOptions = (props) => {
      if (typeof WrappedComponent.navigationOptions === 'function') {
        return WrappedComponent.navigationOptions(props)
      }
      return { ...WrappedComponent.navigationOptions }
    }

    constructor(props) {
      super(props)
      this.state = {
        isFocused: true
      }
    }

    componentDidMount() {
      subscribedComponents.push(this._handleNavigationChange)
    }

    componentWillUnmount() {
      for (var i = 0; i < subscribedComponents.length; i++) {
        if (subscribedComponents[i] === this._handleNavigationChange) {
          subscribedComponents.splice(i, 1)
          break
        }
      }
    }

    _handleNavigationChange = (routeName) => {
      this.setState({
        isFocused: screenName === routeName
      })
    }

    render() {
      return <WrappedComponent isFocused={this.state.isFocused} {...this.props} />
    }
  }
}

module.exports = {
  withNavigationFocus,
  updateFocus,
}